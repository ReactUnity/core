using System;
using System.Collections;
using System.Collections.Generic;

namespace ReactUnity.Styling
{
    public class InlineData : IDictionary<string, object>
    {
        private Dictionary<string, object> collection = new Dictionary<string, object>();

        internal event Action<string, object, InlineData> changed;

        internal readonly string Identifier;

        public object this[string key]
        {
            get
            {
                if (collection.TryGetValue(key, out var val)) return val;
                return null;
            }
            set
            {
                collection[key] = value;
                changed?.Invoke(key, value, this);
            }
        }

        public InlineData(string identifier = null)
        {
            Identifier = identifier;
        }

        public void Set(string key, object value)
        {
            this[key] = value;
        }

        public void SetWithoutNotify(string key, object value)
        {
            collection[key] = value;
        }

        public ICollection<string> Keys => collection.Keys;

        public ICollection<object> Values => collection.Values;

        public int Count => collection.Count;

        public bool IsReadOnly => false;

        public void Add(string key, object value)
        {
            collection.Add(key, value);
            changed?.Invoke(key, value, this);
        }

        public void Add(KeyValuePair<string, object> item)
        {
            collection.Add(item.Key, item.Value);
            changed?.Invoke(item.Key, item.Value, this);
        }

        public void Clear()
        {
            collection.Clear();
            changed?.Invoke(null, null, this);
        }


        public bool ContainsKey(string key)
        {
            return collection.ContainsKey(key);
        }

        public IEnumerator<KeyValuePair<string, object>> GetEnumerator()
        {
            return collection.GetEnumerator();
        }

        public bool Remove(string key)
        {
            return collection.Remove(key);
        }

        public bool TryGetValue(string key, out object value)
        {
            return collection.TryGetValue(key, out value);
        }

        void ICollection<KeyValuePair<string, object>>.CopyTo(KeyValuePair<string, object>[] array, int arrayIndex)
        {
            (collection as ICollection<KeyValuePair<string, object>>).CopyTo(array, arrayIndex);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return collection.GetEnumerator();
        }

        bool ICollection<KeyValuePair<string, object>>.Remove(KeyValuePair<string, object> item)
        {
            return (collection as ICollection<KeyValuePair<string, object>>).Remove(item);
        }

        bool ICollection<KeyValuePair<string, object>>.Contains(KeyValuePair<string, object> item)
        {
            return (collection as ICollection<KeyValuePair<string, object>>).Contains(item);
        }
    }
}
