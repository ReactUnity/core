using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using ReactUnity.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling.Shorthands
{
    internal class XYListShorthand<T> : StyleShorthand
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

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public override bool CanHandleKeyword(CssKeyword keyword) => Converter.CanHandleKeyword(keyword);

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
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
                var vals = GetValues(comma);

                if (vals == null) return null;

                xs[ci] = vals.Item1;
                ys[ci] = vals.Item2;
            }

            collection[ModifiedProperties[0]] = new CssValueList<T>(xs);
            collection[ModifiedProperties[1]] = new CssValueList<T>(ys);
            return ModifiedProperties;
        }

        public virtual Tuple<T, T> GetValues(string val)
        {
            var splits = ParserHelpers.SplitWhitespace(val);

            if (splits.Count == 0) return null;

            var xVal = Converter.Parse(splits[0]);
            var yVal = splits.Count > 1 ? Converter.Parse(splits[1]) : xVal;

            if (xVal is T x && yVal is T y) return Tuple.Create(x, y);
            else return null;
        }

    }

    internal class BackgroundRepeatShorthand : XYListShorthand<BackgroundRepeat>
    {
        public BackgroundRepeatShorthand(string name) : base(name, StyleProperties.backgroundRepeatX, StyleProperties.backgroundRepeatY)
        {
        }

        public override Tuple<BackgroundRepeat, BackgroundRepeat> GetValues(string val)
        {
            if (val == "repeat-x") return Tuple.Create(BackgroundRepeat.Repeat, BackgroundRepeat.NoRepeat);
            if (val == "repeat-y") return Tuple.Create(BackgroundRepeat.NoRepeat, BackgroundRepeat.Repeat);
            return base.GetValues(val);
        }
    }
}
