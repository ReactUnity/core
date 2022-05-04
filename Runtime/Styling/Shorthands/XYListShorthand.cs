using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Facebook.Yoga;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling.Shorthands
{
    internal class XYListShorthand<T> : StyleShorthand
    {
        public override List<IStyleProperty> ModifiedProperties { get; }
        public StyleConverterBase Converter { get; }

        public ValueListStyleProperty<T> XProperty { get; }
        public ValueListStyleProperty<T> YProperty { get; }

        public XYListShorthand(string name, ValueListStyleProperty<T> xProperty, ValueListStyleProperty<T> yProperty) : base(name)
        {
            Converter = AllConverters.Get<T>();
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
            var commas = ParserHelpers.SplitComma(str);
            var count = commas.Count;
            var xs = new IComputedValue[count];
            var ys = new IComputedValue[count];

            for (int ci = 0; ci < commas.Count; ci++)
            {
                var comma = commas[ci];
                var vals = GetValues(comma);

                if (vals == null) return null;

                xs[ci] = vals.Item1;
                ys[ci] = vals.Item2;
            }

            collection[ModifiedProperties[0]] = XProperty.Converter.FromList(xs);
            collection[ModifiedProperties[1]] = YProperty.Converter.FromList(ys);
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

    internal class BackgroundRepeatShorthand : XYListShorthand<BackgroundRepeat>
    {
        public BackgroundRepeatShorthand(string name) : base(name, StyleProperties.backgroundRepeatX, StyleProperties.backgroundRepeatY)
        {
        }

        public override Tuple<IComputedValue, IComputedValue> GetValues(string val)
        {
            if (val == "repeat-x") return Tuple.Create<IComputedValue, IComputedValue>(new ComputedConstant(BackgroundRepeat.Repeat), new ComputedConstant(BackgroundRepeat.NoRepeat));
            if (val == "repeat-y") return Tuple.Create<IComputedValue, IComputedValue>(new ComputedConstant(BackgroundRepeat.NoRepeat), new ComputedConstant(BackgroundRepeat.Repeat));
            return base.GetValues(val);
        }
    }

    internal class BackgroundPositionShorthand : XYListShorthand<YogaValue>
    {
        public BackgroundPositionShorthand(string name, ValueListStyleProperty<YogaValue> xProperty, ValueListStyleProperty<YogaValue> yProperty) : base(name, xProperty, yProperty)
        {
        }

        public override Tuple<IComputedValue, IComputedValue> GetValues(string val)
        {
            if (AllConverters.YogaValue2Converter.TryParse(val, out var yv))
            {
                return Tuple.Create(
                    ComputedMapper.Create(yv, AllConverters.YogaValue2Converter, (resolved) => {
                        if (resolved is YogaValue2 t) return t.X;
                        return null;
                    }),
                    ComputedMapper.Create(yv, AllConverters.YogaValue2Converter, (resolved) => {
                        if (resolved is YogaValue2 t) return t.Y;
                        return null;
                    })
                );
            }

            return base.GetValues(val);
        }
    }
}
