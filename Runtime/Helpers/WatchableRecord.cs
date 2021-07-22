#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT)
#define REACT_CLEARSCRIPT
#endif

using System;
using System.Collections;
using System.Collections.Generic;

namespace ReactUnity.Helpers
{
    public class WatchableDictionary<TKey, T> : IDictionary<TKey, T>
    {

        protected Dictionary<TKey, T> collection;

        internal event Action<TKey, T, WatchableDictionary<TKey, T>> changed;

        public T this[TKey key]
        {
            get => RetrieveValue(collection, key);
            set => SaveValue(collection, key, value);
        }

        public WatchableDictionary()
        {
            collection = new Dictionary<TKey, T>();
        }

        public WatchableDictionary(IDictionary<TKey, T> dict)
        {
            collection = new Dictionary<TKey, T>(dict);
        }

        public void Set(TKey key, T value)
        {
            this[key] = value;
        }

        public void SetWithoutNotify(TKey key, T value)
        {
            collection[key] = value;
        }

        public ICollection<TKey> Keys => collection.Keys;

        public ICollection<T> Values => collection.Values;

        public int Count => collection.Count;

        public bool IsReadOnly => false;

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
            return collection.ContainsKey(key);
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

        public Action AddListener(Action<TKey, T, WatchableDictionary<TKey, T>> listener)
        {
            changed += listener;
            return () => changed -= listener;
        }

        public Action AddListener(object cb)
        {
            var callback = new Callback(cb);
            var listener = new Action<TKey, T, WatchableDictionary<TKey, T>>((key, value, dc) => callback.Call(key, value, dc));
            changed += listener;
            return () => changed -= listener;
        }

        public Action AddListener(Jint.Native.JsValue cb) => AddListener(cb as object);

        public T GetValueOrDefault(TKey key)
        {
            if (!TryGetValue(key, out var value)) value = default;
            return value;
        }

        protected void Change(TKey key, T value)
        {
            changed?.Invoke(key, value, this);
        }

        protected virtual T RetrieveValue(Dictionary<TKey, T> collection, TKey key)
        {
            if (collection.TryGetValue(key, out var val)) return val;
            return default;
        }

        protected virtual void SaveValue(Dictionary<TKey, T> collection, TKey key, T value)
        {
            collection[key] = value;
            Change(key, value);
        }
    }

    public class WatchableRecord<T> : WatchableDictionary<string, T> { }

#if REACT_CLEARSCRIPT
    public class HostPropertyBag : Microsoft.ClearScript.PropertyBag, Microsoft.ClearScript.IScriptableObject
    {
        private readonly ConcurrentWeakSet<Microsoft.ClearScript.ScriptEngine> engineSet = new ConcurrentWeakSet<Microsoft.ClearScript.ScriptEngine>();
        private readonly object BaseObject;

        public HostPropertyBag(object baseObject)
        {
            BaseObject = baseObject;
        }

        public void OnExposedToScriptCode(Microsoft.ClearScript.ScriptEngine engine)
        {
            if ((engine != null) && engineSet.TryAdd(engine))
            {
                foreach (var val in Values)
                {
                    if (val is Microsoft.ClearScript.IScriptableObject so)
                        so.OnExposedToScriptCode(engine);
                }

                engine.AddHostObject("___val___", this);
                engine.AddHostObject("___host___", BaseObject);
                engine.Execute(null, true, $"Object.setPrototypeOf(___val___, ___host___); delete ___val___; delete ___host___;");
            }
        }
    }
#endif

    public interface IPropertyBagProvider
    {
#if REACT_CLEARSCRIPT
        HostPropertyBag GetPropertyBag();
#endif
    }

    public class WatchableObjectRecord : WatchableRecord<object>, IPropertyBagProvider
    {
#if REACT_CLEARSCRIPT
        protected HostPropertyBag propertyBag;

        public HostPropertyBag GetPropertyBag()
        {
            if (propertyBag != null) return propertyBag;

            var pb = propertyBag = new HostPropertyBag(this);

            Action regenerate = () => {
                pb.ClearNoCheck();
                foreach (var d in this)
                {
                    if (d.Value is IPropertyBagProvider pbb)
                        pb.Add(d.Key, pbb.GetPropertyBag());
                    else
                        pb.Add(d.Key, d.Value);
                }
            };

            regenerate();

            changed += (string key, object value, WatchableDictionary<string, object> dc) => {
                if (propertyBag != null)
                {
                    if (key != null)
                    {
                        if (value is IPropertyBagProvider pb) propertyBag[key] = pb.GetPropertyBag();
                        else propertyBag[key] = value;
                    }
                    else regenerate();
                }
            };

            return pb;
        }
#endif
    }
}
