using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Shorthands
{
    internal class XYShorthand<T> : StyleShorthand
    {
        public override List<IStyleProperty> ModifiedProperties { get; }
        public StyleConverterBase Converter { get; }

        public StyleProperty<T> XProperty { get; }
        public StyleProperty<T> YProperty { get; }

        public XYShorthand(string name, StyleProperty<T> xProperty, StyleProperty<T> yProperty, StyleConverterBase converter = null) : base(name)
        {
            Converter = converter ?? xProperty.converter ?? AllConverters.Get<T>();
            ModifiedProperties = new List<IStyleProperty>
            {
                xProperty,
                yProperty,
            };

            XProperty = xProperty;
            YProperty = yProperty;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public override bool CanHandleKeyword(CssKeyword keyword) => Converter.CanHandleKeyword(keyword);

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            if (!(value is string))
            {
                if (Converter.TryConvert(value, out var converted))
                {
                    collection[ModifiedProperties[0]] = collection[ModifiedProperties[1]] = converted;
                    return ModifiedProperties;
                }
            }

            var str = value.ToString();
            var vals = GetValues(str);

            if (vals == null) return null;

            collection[ModifiedProperties[0]] = vals.Item1;
            collection[ModifiedProperties[1]] = vals.Item2;
            return ModifiedProperties;
        }

        public virtual Tuple<IComputedValue, IComputedValue> GetValues(string val)
        {
            var splits = ParserHelpers.SplitWhitespace(val);

            if (splits.Count == 0) return null;

            if (Converter.TryParse(splits[0], out var x))
            {
                if (splits.Count > 1)
                {
                    if (Converter.TryParse(splits[1], out var y)) return Tuple.Create(x, y);
                    return null;
                }
                return Tuple.Create(x, x);
            }
            return null;
        }
    }
}
