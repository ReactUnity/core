#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT)
#define REACT_CLEARSCRIPT
#endif

using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace ReactUnity.Helpers
{
    public class WatchableDictionary<TKey, T> : IDictionary<TKey, T>
    {

        protected Dictionary<TKey, T> collection;

        internal event Action<TKey, T, WatchableDictionary<TKey, T>> changed;

        public T this[TKey key]
        {
            get => RetrieveValue(key);
            set => SaveValue(key, value, true);
        }

        public WatchableDictionary()
        {
            collection = new Dictionary<TKey, T>();
        }

        public WatchableDictionary(IDictionary<TKey, T> dict)
        {
            collection = new Dictionary<TKey, T>(dict);
        }

        public void Set(TKey key, T value) => SaveValue(key, value, true);

        public void SetWithoutNotify(TKey key, T value) => SaveValue(key, value, false);

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
    }

    public abstract class WatchableAdaptibleRecord<TKey, T> : WatchableDictionary<TKey, T>, IDictionary<string, object>
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

    public abstract class WatchableAdaptibleRecordBag<TKey, T> : WatchableAdaptibleRecord<TKey, T>
#if REACT_CLEARSCRIPT
        , Microsoft.ClearScript.IPropertyBag
        , Microsoft.ClearScript.IScriptableObject
#endif
    {
#if REACT_CLEARSCRIPT
        ConcurrentWeakSet<Microsoft.ClearScript.ScriptEngine> exposedEngines = new ConcurrentWeakSet<Microsoft.ClearScript.ScriptEngine>();

        public void OnExposedToScriptCode(Microsoft.ClearScript.ScriptEngine engine)
        {
            if (exposedEngines.TryAdd(engine))
            {
                engine.AddHostObject("___key___", this);
                engine.AddRestrictedHostObject<WatchableAdaptibleRecord<TKey, T>>("___host___", this);
                engine.Execute(null, true,
                    $"Object.setPrototypeOf(___key___, ___host___); delete ___key___; delete ___host___;");
            }
        }
#endif
    }


    public class WatchableRecord<T> : WatchableDictionary<string, T> { }

    public class WatchableObjectRecord : WatchableRecord<object>
#if REACT_CLEARSCRIPT
        , Microsoft.ClearScript.IPropertyBag
        , Microsoft.ClearScript.IScriptableObject
#endif
    {
#if REACT_CLEARSCRIPT
        ConcurrentWeakSet<Microsoft.ClearScript.ScriptEngine> exposedEngines = new ConcurrentWeakSet<Microsoft.ClearScript.ScriptEngine>();

        public void OnExposedToScriptCode(Microsoft.ClearScript.ScriptEngine engine)
        {
            if (exposedEngines.TryAdd(engine))
            {
                engine.AddHostObject("___key___", this);
                engine.AddRestrictedHostObject<WatchableRecord<object>>("___host___", this);
                engine.Execute(null, true,
                    $"Object.setPrototypeOf(___key___, ___host___); delete ___key___; delete ___host___;");
            }
        }
#endif
    }
}
