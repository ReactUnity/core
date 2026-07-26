#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT || (UNITY_ANDROID && !UNITY_EDITOR)) && REACT_CLEARSCRIPT_AVAILABLE
#define REACT_CLEARSCRIPT
#endif

using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using ReactUnity.Helpers;
#if REACT_CLEARSCRIPT
using Microsoft.ClearScript;
using EnginePrototypeTable = System.Runtime.CompilerServices.ConditionalWeakTable<Microsoft.ClearScript.ScriptEngine, ReactUnity.Reactive.PrototypeEntry>;
#endif

namespace ReactUnity.Reactive
{
    [UnityEngine.Scripting.Preserve]
    public class ReactiveDictionary<TKey, T> : IDictionary<TKey, T>, IDisposable, IReactive<Dictionary<TKey, T>>
    {
        protected Dictionary<TKey, T> collection;

        internal event Action<TKey, T, ReactiveDictionary<TKey, T>> changed;

        public T this[TKey key]
        {
            get => RetrieveValue(key);
            set => SaveValue(key, value, true);
        }

        public ReactiveDictionary()
        {
            collection = new Dictionary<TKey, T>();
        }

        public ReactiveDictionary(IDictionary<TKey, T> dict)
        {
            collection = new Dictionary<TKey, T>(dict);
        }

        public void Set(TKey key, T value) => SaveValue(key, value, true);

        public void SetWithoutNotify(TKey key, T value) => SaveValue(key, value, false);

        public ICollection<TKey> Keys => collection.Keys;

        public ICollection<T> Values => collection.Values;

        public int Count => collection.Count;

        public bool IsReadOnly => false;

        Dictionary<TKey, T> IReactive<Dictionary<TKey, T>>.Value => collection;

        public void Add(TKey key, T value)
        {
            collection.Add(key, value);
            Change(key, value);
        }

        public void Add(KeyValuePair<TKey, T> item)
        {
            collection.Add(item.Key, item.Value);
            Change(item.Key, item.Value);
        }

        public void Clear()
        {
            collection.Clear();
            Change(default, default);
        }

        public void ClearWithoutNotify()
        {
            collection.Clear();
        }


        public bool ContainsKey(TKey key)
        {
            return key != null && collection.ContainsKey(key);
        }

        public IEnumerator<KeyValuePair<TKey, T>> GetEnumerator()
        {
            return collection.GetEnumerator();
        }

        public bool Remove(TKey key)
        {
            var res = collection.Remove(key);
            if (res) Change(key, default);
            return res;
        }

        public bool RemoveWithoutNotify(TKey key)
        {
            return collection.Remove(key);
        }

        public bool TryGetValue(TKey key, out T value)
        {
            return collection.TryGetValue(key, out value);
        }

        void ICollection<KeyValuePair<TKey, T>>.CopyTo(KeyValuePair<TKey, T>[] array, int arrayIndex)
        {
            (collection as ICollection<KeyValuePair<TKey, T>>).CopyTo(array, arrayIndex);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return collection.GetEnumerator();
        }

        bool ICollection<KeyValuePair<TKey, T>>.Remove(KeyValuePair<TKey, T> item)
        {
            return (collection as ICollection<KeyValuePair<TKey, T>>).Remove(item);
        }

        bool ICollection<KeyValuePair<TKey, T>>.Contains(KeyValuePair<TKey, T> item)
        {
            return (collection as ICollection<KeyValuePair<TKey, T>>).Contains(item);
        }

        public Action AddListener(object cb)
        {
            var callback = Callback.From(cb);
            var listener = new Action<Dictionary<TKey, T>>((dc) => callback.Call(dc));
            return AddListener(listener);
        }

        public Action AddListener(Action<Dictionary<TKey, T>> listener)
        {
            var cb = new Action<TKey, T, ReactiveDictionary<TKey, T>>((key, value, dc) => listener.Invoke(dc.collection));
            changed += cb;
            return () => changed -= cb;
        }

        public Action AddListener(Action<TKey, T, ReactiveDictionary<TKey, T>> listener)
        {
            changed += listener;
            return () => changed -= listener;
        }

        public T GetValueOrDefault(TKey key)
        {
            if (!TryGetValue(key, out var value)) value = default;
            return value;
        }

        protected void Change(TKey key, T value)
        {
            changed?.Invoke(key, value, this);
        }

        protected virtual T RetrieveValue(TKey key)
        {
            if (collection.TryGetValue(key, out var val)) return val;
            return default;
        }

        protected virtual void SaveValue(TKey key, T value, bool notify)
        {
            collection[key] = value;
            if (notify) Change(key, value);
        }

        public void Dispose()
        {
            changed = null;
        }

        public void Change()
        {
            changed?.Invoke(default(TKey), default(T), this);
        }
    }

    public abstract class ReactiveAdaptibleRecord<TKey, T> : ReactiveDictionary<TKey, T>, IDictionary<string, object>
    {
        public object this[string key]
        {
            get => RetrieveValueAdaptible(key);
            set => SaveValueAdaptible(key, value, true);
        }

        ICollection<string> IDictionary<string, object>.Keys => base.Keys.Select(KeyToString).ToArray();

        ICollection<object> IDictionary<string, object>.Values => base.Values.OfType<object>().ToArray();

        public void Add(string key, object value)
        {
            if (ContainsKey(key)) throw new ArgumentException("A key with this name already exists", nameof(key));
            this[key] = value;
        }

        public void Add(KeyValuePair<string, object> item)
        {
            if (ContainsKey(item.Key)) throw new ArgumentException("A key with this name already exists", nameof(item));
            this[item.Key] = item.Value;
        }

        public bool Contains(KeyValuePair<string, object> item) => base.ContainsKey(StringToKey(item.Key));

        public bool ContainsKey(string key) => base.ContainsKey(StringToKey(key));

        public void CopyTo(KeyValuePair<string, object>[] array, int arrayIndex)
        {
            var ind = arrayIndex;

            foreach (var item in this)
            {
                array[ind] = new KeyValuePair<string, object>(KeyToString(item.Key), item.Value);
                ind++;
            }
        }

        public bool Remove(string key) => base.Remove(StringToKey(key));

        public bool Remove(KeyValuePair<string, object> item) => Remove(item.Key);

        public bool TryGetValue(string key, out object value)
        {
            var val = StringToKey(key);
            if (val == null)
            {
                value = default;
                return false;
            }
            if (base.TryGetValue(val, out var outVal))
            {
                value = outVal;
                return true;
            }
            value = default;
            return false;
        }

        IEnumerator<KeyValuePair<string, object>> IEnumerable<KeyValuePair<string, object>>.GetEnumerator()
        {
            foreach (var item in collection)
            {
                yield return new KeyValuePair<string, object>(KeyToString(item.Key), item.Value);
            }
        }

        protected virtual string KeyToString(TKey key) => key?.ToString();
        protected virtual TKey StringToKey(string val) => default;
        protected virtual object RetrieveValueAdaptible(string key) => RetrieveValue(StringToKey(key));
        protected virtual void SaveValueAdaptible(string key, object value, bool notify) => SaveValue(StringToKey(key), (T) value, notify);

        public void Set(string key, object value) => SaveValueAdaptible(key, value, true);
        public void SetWithoutNotify(string key, object value) => SaveValueAdaptible(key, value, false);
        public object GetValueOrDefault(string key) => GetValueOrDefault(StringToKey(key));
    }

    public abstract class ReactiveAdaptibleRecordBag<TKey, T> : ReactiveAdaptibleRecord<TKey, T>
#if REACT_CLEARSCRIPT
        , IPropertyBag
        , IScriptableObject
#endif
    {
#if REACT_CLEARSCRIPT
        private readonly EnginePrototypeTable map = new EnginePrototypeTable();

        public void OnExposedToScriptCode(ScriptEngine engine)
        {
            var entry = map.GetOrCreateValue(engine);
            entry.ExposeObject<ReactiveAdaptibleRecord<TKey, T>>(this, engine);
        }
#endif
    }


    public class ReactiveRecord<T> : ReactiveDictionary<string, T> { }

    public class ReactiveObjectRecord : ReactiveRecord<object>
#if REACT_CLEARSCRIPT
        , IPropertyBag
        , IScriptableObject
#endif
    {
#if REACT_CLEARSCRIPT
        private readonly EnginePrototypeTable map = new EnginePrototypeTable();

        public void OnExposedToScriptCode(ScriptEngine engine)
        {
            var entry = map.GetOrCreateValue(engine);
            entry.ExposeObject<ReactiveRecord<object>>(this, engine);
        }
#endif
    }

#if REACT_CLEARSCRIPT
    /// <summary>
    /// Class required to hold the prototyped object in .NET side to prevent it from GCed in script side
    /// </summary>
    internal class PrototypeEntry
    {
        public object Prototype;
        public object ProxyHolder;

        public void ExposeObject<T>(T obj, ScriptEngine engine)
        {
            if (Prototype == null)
            {
                Prototype = obj.ToRestrictedHostObject(engine);
                Callback.From(engine.Evaluate("Object.setPrototypeOf")).Call(obj, Prototype);
                ProxyHolder = Callback.From(engine.Evaluate("Object.create")).Call(obj);
            }
        }
    }
#endif
}
