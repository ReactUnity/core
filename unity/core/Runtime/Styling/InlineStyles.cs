using ReactUnity.Reactive;

namespace ReactUnity.Styling
{
    public class InlineStyles : ReactiveAdaptibleRecordBag<IStyleProperty, object>
    {
        protected override object RetrieveValue(IStyleProperty key)
        {
            if (collection.TryGetValue(key, out var val)) return val;
            return default;
        }

        protected override void SaveValue(IStyleProperty key, object value, bool notify)
        {
            if (value == null)
            {
                if (notify) Remove(key);
                else RemoveWithoutNotify(key);
            }
            else
            {
                var normalizedValue = key.Convert(value);
                collection[key] = normalizedValue;
                if (notify) Change(key, normalizedValue);
            }
        }

        protected override object RetrieveValueAdaptible(string key)
        {
            var prop = CssProperties.GetProperty(key);
            if (prop == null) return null;
            return this[prop];
        }

        protected override void SaveValueAdaptible(string key, object value, bool notify)
        {
            var prop = CssProperties.GetKey(key);
            if (prop == null) return;
            var mod = prop.Modify(collection, value);

            if (notify && mod != null)
            {
                if (mod.Count > 1) Change(null, value);
                else Change(mod[0], value);
            }
        }

        protected override string KeyToString(IStyleProperty key) => key.name;
        protected override IStyleProperty StringToKey(string val) => CssProperties.GetProperty(val);
    }
}
