using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace ReactUnity
{
    public abstract partial class ReactContext
    {
        private int CurrentInstanceId { get; set; } = 1;

        protected abstract ITextComponent CreateTextInternal(string tag = "_text", string text = "");
        protected abstract IReactComponent CreateDefaultComponentInternal(string tag, string text);
        protected abstract IReactComponent CreateComponentInternal(string tag, string text);
        protected abstract IReactComponent CreatePseudoComponentInternal(string tag);

        protected Dictionary<string, Stack<IPoolableComponent>> TextComponentPool = new Dictionary<string, Stack<IPoolableComponent>>();
        protected Dictionary<string, Stack<IPoolableComponent>> PseudoComponentPool = new Dictionary<string, Stack<IPoolableComponent>>();
        protected Dictionary<string, Stack<IPoolableComponent>> DefaultComponentPool = new Dictionary<string, Stack<IPoolableComponent>>();
        protected Dictionary<string, Stack<IPoolableComponent>> ComponentPool = new Dictionary<string, Stack<IPoolableComponent>>();


        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        private T CreateComponentWithPoolInternal<T>(string tag, string text, Func<string, string, T> creator, bool enablePooling, Dictionary<string, Stack<IPoolableComponent>> pools = null, string poolKey = null) where T : class, IReactComponent
        {
            if (enablePooling) return CreateComponentWithPool(tag, text, creator, pools, poolKey);
            return creator(tag, text);
        }

        public T CreateComponentWithPool<T>(string tag, string text, Func<string, string, T> creator, Dictionary<string, Stack<IPoolableComponent>> pools = null, string poolKey = null) where T : class, IReactComponent
        {
            pools = pools ?? ComponentPool;
            poolKey = poolKey ?? (options.Pooling == PoolingType.All ? "default" : "");
            Stack<IPoolableComponent> pool = null;

            T res = null;

            if (poolKey != "")
            {
                var key = $"{tag}$_${poolKey}";

                if (!pools.TryGetValue(key, out pool)) pool = pools[key] = new Stack<IPoolableComponent>();

                if (pool.Count > 0)
                {
                    res = pool.Pop() as T;
                    if (res is ITextComponent t) t.SetText(text);
                    if (res is IPoolableComponent p)
                    {
                        if (!p.Revive())
                            res = null;
                    }
                }
            }

            if (res == null) res = creator(tag, text);

            if (res is IPoolableComponent rp) rp.PoolStack = pool;
            res.InstanceId = CurrentInstanceId++;
            return res;
        }

        public ITextComponent CreateText(string tag = "_text", string text = "", string poolKey = null) =>
            CreateComponentWithPoolInternal(tag, text,
                CreateTextInternal,
                options.Pooling != PoolingType.None, TextComponentPool,
                poolKey ?? (options.Pooling != PoolingType.None ? "default" : ""));

        /// <summary>Whether <see cref="PoolingType.All"/> reaches elements here, rather than only text and pseudo elements.</summary>
        protected virtual bool PoolsElements => true;

        public IReactComponent CreateDefaultComponent(string tag, string text, string poolKey = null) =>
            CreateComponentWithPoolInternal(tag, text, CreateDefaultComponentInternal,
                options.Pooling == PoolingType.All && PoolsElements, DefaultComponentPool,
                poolKey ?? (options.Pooling == PoolingType.All ? "default" : ""));

        public IReactComponent CreateComponent(string tag, string text, string poolKey = null) =>
            CreateComponentWithPoolInternal(tag, text,
                CreateComponentInternal,
                options.Pooling == PoolingType.All && PoolsElements, ComponentPool,
                poolKey ?? (options.Pooling == PoolingType.All ? "default" : ""));

        public IReactComponent CreatePseudoComponent(string tag, string poolKey = null) =>
            CreateComponentWithPoolInternal(tag, null,
                (t, r) => CreatePseudoComponentInternal(t),
                options.Pooling != PoolingType.None, PseudoComponentPool,
                poolKey ?? (options.Pooling != PoolingType.None ? "default" : ""));

        /// <returns>Whether the component went into the pool. One that did not still has to be destroyed.</returns>
        public bool PoolComponent(IPoolableComponent cmp, Stack<IPoolableComponent> pool)
        {
            // JS never reuses a refId, so the old one can only reach whoever gets this component next.
            if (cmp.RefId > 0 && Refs.TryGetValue(cmp.RefId, out var old) && old.TryGetTarget(out var target) && target == cmp)
                Refs.Remove(cmp.RefId);

            cmp.RefId = -1;
            cmp.InstanceId = -1;
            // A disposing context destroys its detached roots after the host, so a pool here would outlive it.
            if (IsDisposed || !cmp.Pool()) return false;
            pool.Push(cmp);
            return true;
        }
    }
}
