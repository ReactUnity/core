using System.Collections.Generic;
using ReactUnity.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling.Shorthands
{
    public class XYListShorthand<T> : StyleShorthand
    {
        public override List<IStyleProperty> ModifiedProperties { get; }
        public IStyleConverter Converter { get; }

        public XYListShorthand(string name, StyleProperty<ICssValueList<T>> xProperty, StyleProperty<ICssValueList<T>> yProperty) : base(name)
        {
            Converter = AllConverters.Get<T>();
            ModifiedProperties = new List<IStyleProperty>
            {
                xProperty,
                yProperty,
            };
        }

        public override List<IStyleProperty> Modify(IDictionary<IStyleProperty, object> collection, object value)
        {
            if (base.Modify(collection, value) != null) return ModifiedProperties;

            if (!(value is string))
            {
                var converted = Converter.Convert(value);
                if (!Equals(converted, CssKeyword.Invalid))
                {
                    collection[ModifiedProperties[0]] = collection[ModifiedProperties[1]] = converted;
                    return ModifiedProperties;
                }
            }

            var str = value.ToString();
            var commas = ParserHelpers.SplitComma(str);
            var count = commas.Count;
            var xs = new T[count];
            var ys = new T[count];

            for (int ci = 0; ci < commas.Count; ci++)
            {
                var comma = commas[ci];
                var splits = ParserHelpers.SplitWhitespace(comma);

                if (splits.Count == 0) return null;

                var xVal = Converter.Parse(splits[0]);
                var yVal = splits.Count > 1 ? Converter.Parse(splits[1]) : xVal;

                if (xVal is T x && yVal is T y)
                {
                    xs[ci] = x;
                    ys[ci] = y;
                }
                else return null;
            }

            collection[ModifiedProperties[0]] = new CssValueList<T>(xs);
            collection[ModifiedProperties[1]] = new CssValueList<T>(ys);
            return ModifiedProperties;
        }
    }
}
