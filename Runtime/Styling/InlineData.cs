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

    public class InlineStyles : InlineData
    {
        public InlineStyles(string identifier = null) : base(identifier) { }

        protected override object RetrieveValue(Dictionary<string, object> collection, string key)
        {
            if (collection.TryGetValue(key, out var val)) return val;
            var prop = CssProperties.GetProperty(key);
            if (prop != null && collection.TryGetValue(prop.name, out var normalVal)) return normalVal;
            return default;
        }

        protected override void SaveValue(Dictionary<string, object> collection, string key, object value)
        {
            var prop = CssProperties.GetProperty(key);
            if (prop == null) return;
            var normalizedValue = prop.Convert(value);
            collection[prop.name] = normalizedValue;
            Change(prop.name, normalizedValue);
        }
    }
}
