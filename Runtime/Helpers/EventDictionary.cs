#if (UNITY_EDITOR || UNITY_STANDALONE) && !REACT_DISABLE_CLEARSCRIPT
#define REACT_CLEARSCRIPT
#endif

using System;
using System.Collections;
using System.Collections.Generic;

namespace ReactUnity.Helpers
{
    [Serializable]
    public class EventDictionary<T> : IDictionary<string, T>
    {
        private Dictionary<string, T> collection;

        internal event Action<string, T, EventDictionary<T>> changed;

        public T this[string key]
        {
            get
            {
                if (collection.TryGetValue(key, out var val)) return val;
                return default;
            }
            set
            {
                collection[key] = value;
                Change(key, value);
            }
        }

        public EventDictionary()
        {
            collection = new Dictionary<string, T>();
        }

        public EventDictionary(IDictionary<string, T> dict)
        {
            collection = new Dictionary<string, T>(dict);
        }

        public void Set(string key, T value)
        {
            this[key] = value;
        }

        public void SetWithoutNotify(string key, T value)
        {
            collection[key] = value;
        }

        public ICollection<string> Keys => collection.Keys;

        public ICollection<T> Values => collection.Values;

        public int Count => collection.Count;

        public bool IsReadOnly => false;

        public void Add(string key, T value)
        {
            collection.Add(key, value);
            Change(key, value);
        }

        public void Add(KeyValuePair<string, T> item)
        {
            collection.Add(item.Key, item.Value);
            Change(item.Key, item.Value);
        }

        public void Clear()
        {
            collection.Clear();
            Change(null, default);
        }

        public void ClearWithoutNotify()
        {
            collection.Clear();
        }


        public bool ContainsKey(string key)
        {
            return collection.ContainsKey(key);
        }

        public IEnumerator<KeyValuePair<string, T>> GetEnumerator()
        {
            return collection.GetEnumerator();
        }

        public bool Remove(string key)
        {
            var res = collection.Remove(key);
            if (res) Change(key, default);
            return res;
        }

        public bool RemoveWithoutNotify(string key)
        {
            return collection.Remove(key);
        }

        public bool TryGetValue(string key, out T value)
        {
            return collection.TryGetValue(key, out value);
        }

        void ICollection<KeyValuePair<string, T>>.CopyTo(KeyValuePair<string, T>[] array, int arrayIndex)
        {
            (collection as ICollection<KeyValuePair<string, T>>).CopyTo(array, arrayIndex);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return collection.GetEnumerator();
        }

        bool ICollection<KeyValuePair<string, T>>.Remove(KeyValuePair<string, T> item)
        {
            return (collection as ICollection<KeyValuePair<string, T>>).Remove(item);
        }

        bool ICollection<KeyValuePair<string, T>>.Contains(KeyValuePair<string, T> item)
        {
            return (collection as ICollection<KeyValuePair<string, T>>).Contains(item);
        }

        public Action AddListener(Action<string, T, EventDictionary<T>> listener)
        {
            changed += listener;
            return () => changed -= listener;
        }

        public Action AddListener(object cb)
        {
            var callback = new Callback(cb);
            var listener = new Action<string, T, EventDictionary<T>>((key, value, dc) => callback.Call(key, value, dc));
            changed += listener;
            return () => changed -= listener;
        }

        public Action AddListener(Jint.Native.JsValue cb) => AddListener(cb as object);

        protected void Change(string key, T value)
        {
            changed?.Invoke(key, value, this);
        }
    }

    public interface IPropertyBagProvider
    {
#if REACT_CLEARSCRIPT
        Microsoft.ClearScript.IPropertyBag GetPropertyBag();
#endif
    }

    public class EventObjectDictionary : EventDictionary<object>, IPropertyBagProvider
    {
#if REACT_CLEARSCRIPT
        protected Microsoft.ClearScript.IPropertyBag propertyBag;

        public Microsoft.ClearScript.IPropertyBag GetPropertyBag()
        {
            if (propertyBag != null) return propertyBag;

            var pb = propertyBag = new Microsoft.ClearScript.PropertyBag();

            Action regenerate = () =>
            {
                pb.Clear();
                foreach (var d in this)
                {
                    pb.Add(d.Key, d.Value);
                }
            };

            regenerate();

            changed += (string key, object value, EventDictionary<object> dc) =>
            {
                if (propertyBag != null)
                {
                    if (key != null) propertyBag[key] = value;
                    else regenerate();
                }
            };

            return pb;
        }
#endif
    }
}
