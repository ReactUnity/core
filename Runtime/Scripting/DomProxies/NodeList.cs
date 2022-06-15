using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace ReactUnity.Scripting.DomProxies
{
    public class NodeList<T> : IDictionary<string, object> where T : class
    {
        private readonly List<T> values;

        public NodeList(List<T> values)
        {
            this.values = values;
        }

        public object this[string key]
        {
            get
            {
                if (key == "length") return Count;


                var ind = int.Parse(key);

                if (ind < 0 || ind >= this.values.Count) return null;
                return this.values[ind];
            }

            set
            {
                var ind = int.Parse(key);

                if (ind < 0) return;

                for (int i = this.values.Count; i <= ind; i++)
                {
                    this.values.Add(default);
                }

                this.values[ind] = value as T;
            }
        }

        public ICollection<string> Keys
        {
            get
            {
                return Enumerable.Range(0, this.values.Count).Select(x => x + "").ToList();
            }
        }

        public ICollection<object> Values
        {
            get
            {
                return this.values.OfType<object>().ToList();
            }
        }

        public int Count => this.values.Count;

        public bool IsReadOnly => false;

        public void Add(string key, object value)
        {
            this[key] = value;
        }

        public void Add(KeyValuePair<string, object> item)
        {
            this[item.Key] = item.Value;
        }

        public void Clear()
        {
            this.values.Clear();
        }

        public bool Contains(KeyValuePair<string, object> item)
        {
            if (item.Key == "length") return true;
            if (!int.TryParse(item.Key, out var ind)) return false;
            return ind >= 0 && ind < this.values.Count;
        }

        public bool ContainsKey(string key)
        {
            if (key == "length") return true;
            if (!int.TryParse(key, out var ind)) return false;
            return ind >= 0 && ind < this.values.Count;
        }

        public void CopyTo(KeyValuePair<string, object>[] array, int arrayIndex)
        {
        }

        public IEnumerator<KeyValuePair<string, object>> GetEnumerator()
        {
            for (int i = 0; i < values.Count; i++)
            {
                yield return new KeyValuePair<string, object>(i + "", values[i]);
            }
        }

        public bool Remove(string key)
        {
            if (!int.TryParse(key, out var ind)) return false;
            if (ind >= 0 && ind < this.values.Count) values[ind] = default;
            return true;
        }

        public bool Remove(KeyValuePair<string, object> item)
        {
            if (!int.TryParse(item.Key, out var ind)) return false;
            if (ind >= 0 && ind < this.values.Count) values[ind] = default;
            return true;
        }

        public bool TryGetValue(string key, out object value)
        {
            value = this[key];
            return true;
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            for (int i = 0; i < values.Count; i++)
            {
                yield return new KeyValuePair<string, object>(i + "", values[i]);
            }
        }
    }
}
