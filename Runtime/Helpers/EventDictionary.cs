using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Helpers
{
    [Serializable]
    public class EventDictionary<T> : IDictionary<string, T>
    {
        private Dictionary<string, T> collection;

        public delegate void ChangeCallback(string key, T value, EventDictionary<T> dic);

        internal event ChangeCallback changed;

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
            Change(key, default);
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

        public Action AddListener(ChangeCallback listener)
        {
            changed += listener;
            return () => changed -= listener;
        }

        protected void Change(string key, T value)
        {
            changed?.Invoke(key, value, this);
        }
    }

    public class InlineData : EventDictionary<object>
    {
        internal readonly string Identifier;

        public InlineData(string identifier = null) : base()
        {
            Identifier = identifier;
        }
    }
}
