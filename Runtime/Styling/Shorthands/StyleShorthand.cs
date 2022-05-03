using System.Collections.Generic;
using System.Runtime.CompilerServices;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Rules;

namespace ReactUnity.Styling.Shorthands
{
    internal abstract class StyleShorthand : IStyleKey
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
            if (value == null) return ClearValues(collection);

            var keyword = CssKeyword.NoKeyword;
            if (value is string s) keyword = RuleHelpers.GetCssKeyword(s);
            else if (value is CssKeyword k) keyword = k;

            if (keyword != CssKeyword.NoKeyword && !CanHandleKeyword(keyword))
                return SetAllValues(collection, new ComputedKeyword(keyword));

            return ModifyInternal(collection, value);
        }

        protected abstract List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value);
    }
}
