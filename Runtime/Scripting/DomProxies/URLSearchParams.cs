using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using ReactUnity.Helpers;

namespace ReactUnity.Scripting.DomProxies
{
    // https://url.spec.whatwg.org/#urlsearchparams
    public class URLSearchParams: IEnumerable<string[]>
    {
        #region Fields

        private readonly List<KeyValuePair<String, String>> _values;
        private readonly URL _parent;

        #endregion

        #region Constructors

        public URLSearchParams() => _values = new List<KeyValuePair<String, String>>();

        internal URLSearchParams(URL parent) : this()
        {
            _parent = parent;
            ChangeTo(parent.search, true);
        }

        public URLSearchParams(String init) : this() => ChangeTo(init, false);

        #endregion

        #region Methods

        internal void Reset() => _values.Clear();

        internal void ChangeTo(String query, Boolean fromParent)
        {
            Reset();

            if (query is "") return;
            if (query.StartsWith("?")) query = query.Substring(1);

            foreach (var pair in query.Split('&'))
            {
                var kvp = pair.Split('=');

                if (kvp.Length > 1)
                {
                    AppendCore(Decode(kvp[0]), Decode(kvp[1]));
                }
                else
                {
                    AppendCore(Decode(pair), String.Empty);
                }
            }

            RaiseChanged(fromParent);
        }

        public void append(String name, String value)
        {
            AppendCore(name, value);
            RaiseChanged(false);
        }

        private void AppendCore(String name, String value)
        {
            _values.Add(new KeyValuePair<String, String>(name, value));
        }

        public void delete(String name)
        {
            DeleteCore(name);
            RaiseChanged(false);
        }

        private void DeleteCore(String name)
        {
            _values.RemoveAll(p => p.Key == name);
        }

        public String get(String name) => _values.Find(p => p.Key == name).Value;

        public String[] getAll(String name) => _values.FindAll(p => p.Key == name).Select(m => m.Value).ToArray();

        public Boolean has(String name) => _values.Any(p => p.Key == name);

        public void set(String name, String value)
        {
            if (has(name))
            {
                var index = _values.FindIndex(p => p.Key == name);
                DeleteCore(name);
                _values.Insert(index, new KeyValuePair<String, String>(name, value));
            }
            else
            {
                AppendCore(name, value);
            }

            RaiseChanged(false);
        }

        public void sort()
        {
            _values.Sort((a, b) => a.Key.CompareTo(b.Key));
            RaiseChanged(false);
        }

        public string[] keys() => _values.Select(p => p.Key).Distinct().ToArray();
        public string[] values() => _values.Select(p => p.Value).ToArray();
        public string[][] entries() => _values.Select(p => new[] { p.Key, p.Value }).ToArray();
        public IEnumerator<string[]> GetEnumerator() => ((IEnumerable<string[]>) entries()).GetEnumerator();
        IEnumerator IEnumerable.GetEnumerator() => entries().GetEnumerator();

        public override String ToString() => String.Join("&", _values.Select(p => $"{Encode(p.Key)}={Encode(p.Value)}"));

        #endregion

        #region Helpers

        private static String Encode(String value)
        {
            return EncodingHelpers.encodeURIComponent(value);
        }

        private static String Decode(String value)
        {
            return EncodingHelpers.decodeURIComponent(value);
        }

        private void RaiseChanged(Boolean fromParent)
        {
            if (!fromParent && _parent != null) _parent.search = ToString();
        }

        #endregion
    }
}
