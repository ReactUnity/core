using System.Collections.Generic;
using ReactUnity.Helpers;

namespace ReactUnity.Styling
{
    public class InlineData : WatchableObjectRecord
    {
        internal readonly string Identifier;

        public InlineData(string identifier = null) : base()
        {
            Identifier = identifier;
        }
    }

    public class InlineStyles : WatchableDictionary<IStyleProperty, object>
    {
        public object this[string key]
        {
            get
            {
                var prop = CssProperties.GetProperty(key);
                if (prop == null) return null;
                return this[prop];
            }
            set
            {
                var prop = CssProperties.GetProperty(key);
                if (prop != null) this[prop] = key;
            }
        }

        protected override object RetrieveValue(Dictionary<IStyleProperty, object> collection, IStyleProperty key)
        {
            if (collection.TryGetValue(key, out var val)) return val;
            return default;
        }

        protected override void SaveValue(Dictionary<IStyleProperty, object> collection, IStyleProperty key, object value)
        {
            var normalizedValue = key.Convert(value);
            collection[key] = normalizedValue;
            Change(key, normalizedValue);
        }

        public void Set(string key, object value) => Set(CssProperties.GetProperty(key), value);
        public void SetWithoutNotify(string key, object value) => SetWithoutNotify(CssProperties.GetProperty(key), value);
        public bool TryGetValue(string key, out object res) => TryGetValue(CssProperties.GetProperty(key), out res);
        public bool ContainsKey(string key) => ContainsKey(CssProperties.GetProperty(key));
        public object GetValueOrDefault(string key) => GetValueOrDefault(CssProperties.GetProperty(key));
    }
}
