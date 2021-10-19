using System.Collections.Generic;
using System.Runtime.CompilerServices;
using ReactUnity.Styling.Rules;

namespace ReactUnity.Styling.Shorthands
{
    public abstract class StyleShorthand : IStyleKey
    {
        public string Name { get; }
        public abstract List<IStyleProperty> ModifiedProperties { get; }

        public StyleShorthand(string name)
        {
            Name = name;
        }

        public List<IStyleProperty> ClearValues(IDictionary<IStyleProperty, object> collection)
        {
            var count = ModifiedProperties.Count;
            for (int i = 0; i < count; i++)
                collection.Remove(ModifiedProperties[i]);
            return ModifiedProperties;
        }

        public List<IStyleProperty> SetAllValues(IDictionary<IStyleProperty, object> collection, object value)
        {
            var count = ModifiedProperties.Count;
            for (int i = 0; i < count; i++)
                collection[ModifiedProperties[i]] = value;
            return ModifiedProperties;
        }

        public List<IStyleProperty> SetAllValuesDefault(IDictionary<IStyleProperty, object> collection)
        {
            var count = ModifiedProperties.Count;
            for (int i = 0; i < count; i++)
            {
                var prop = ModifiedProperties[i];
                collection[prop] = prop.defaultValue;
            }
            return ModifiedProperties;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public virtual bool CanHandleKeyword(CssKeyword keyword) => false;

        public virtual List<IStyleProperty> Modify(IDictionary<IStyleProperty, object> collection, object value)
        {

            var keyword = CssKeyword.NoKeyword;
            if (value is string s) keyword = RuleHelpers.GetCssKeyword(s);
            else if (value is CssKeyword k) keyword = k;

            if (!CanHandleKeyword(keyword))
            {
                if (keyword == CssKeyword.Initial || keyword == CssKeyword.Default || keyword == CssKeyword.None || keyword == CssKeyword.Unset || keyword == CssKeyword.Auto)
                    return SetAllValuesDefault(collection);
                else if (keyword != CssKeyword.CurrentColor && keyword != CssKeyword.Invalid && keyword != CssKeyword.NoKeyword) value = keyword;

                if (value is CssKeyword) return SetAllValues(collection, value);
                if (value == null) return ClearValues(collection);
            }

            return ModifyInternal(collection, value);
        }

        protected abstract List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value);
    }
}
