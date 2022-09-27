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
        private T CreateComponentWithPoolInternal<T>(string tag, string text, Func<string, string, T> creator, bool enablePooling, Dictionary<string, Stack<IPoolableComponent>> pools = null) where T : class, IReactComponent
        {
            if (enablePooling) return CreateComponentWithPool(tag, text, creator, pools);
            return creator(tag, text);
        }

        public T CreateComponentWithPool<T>(string tag, string text, Func<string, string, T> creator, Dictionary<string, Stack<IPoolableComponent>> pools = null) where T : class, IReactComponent
        {
            pools = pools ?? ComponentPool;

            if (!pools.TryGetValue(tag, out var pool)) pool = pools[tag] = new Stack<IPoolableComponent>();

            T res = null;
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

            if (res == null) res = creator(tag, text);

            if (res is IPoolableComponent rp) rp.PoolStack = pool;
            res.InstanceId = CurrentInstanceId++;
            return res;
        }

        public ITextComponent CreateText(string tag = "_text", string text = "") =>
            CreateComponentWithPoolInternal(tag, text, CreateTextInternal, options.Pooling != PoolingType.None, TextComponentPool);

        public IReactComponent CreateDefaultComponent(string tag, string text) =>
            CreateComponentWithPoolInternal(tag, text, CreateDefaultComponentInternal, options.Pooling == PoolingType.All, DefaultComponentPool);

        public IReactComponent CreateComponent(string tag, string text) =>
            CreateComponentWithPoolInternal(tag, text, CreateComponentInternal, options.Pooling == PoolingType.All);

        public IReactComponent CreatePseudoComponent(string tag) =>
            CreateComponentWithPoolInternal(tag, null, (t, r) => CreatePseudoComponentInternal(t), options.Pooling != PoolingType.None, PseudoComponentPool);

        public void PoolComponent(IPoolableComponent cmp, Stack<IPoolableComponent> pool)
        {
            cmp.RefId = -1;
            cmp.InstanceId = -1;
            if (cmp.Pool())
                pool.Push(cmp);
        }
    }
}
