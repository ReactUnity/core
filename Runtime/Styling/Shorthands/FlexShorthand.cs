using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Converters;

namespace ReactUnity.Styling.Shorthands
{
    public class FlexShorthand : StyleShorthand
    {
        public override List<IStyleProperty> ModifiedProperties { get; }

        public FlexShorthand(string name) : base(name)
        {
            ModifiedProperties = new List<IStyleProperty>
            {
                LayoutProperties.FlexGrow,
                LayoutProperties.FlexShrink,
                LayoutProperties.FlexBasis,
            };
        }

        public override List<IStyleProperty> Modify(IDictionary<IStyleProperty, object> collection, object value)
        {
            if (value == null) return null;

            var str = value.ToString();
            var splits = ParserHelpers.SplitWhitespace(str);

            if (splits.Count == 0 || splits.Count > 3) return null;

            var growSet = false;
            var shrinkSet = false;
            var basisSet = false;

            var grow = 0f;
            var shrink = 0f;
            var basis = YogaValue.Undefined();

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];

                if (!growSet)
                {
                    var val = AllConverters.FloatConverter.Convert(split);

                    if (val is float v)
                    {
                        grow = v;
                        growSet = true;
                        continue;
                    }
                }

                if (!shrinkSet)
                {
                    var val = AllConverters.FloatConverter.Convert(split);

                    if (val is float v)
                    {
                        shrink = v;
                        shrinkSet = true;
                        continue;
                    }
                }

                if (!basisSet)
                {
                    var val = AllConverters.YogaValueConverter.Convert(split);

                    if (val is YogaValue v)
                    {
                        basis = v;
                        basisSet = true;
                        continue;
                    }
                }

                return null;
            }

            collection[ModifiedProperties[0]] = grow;
            collection[ModifiedProperties[1]] = shrink;
            collection[ModifiedProperties[2]] = basis;

            return ModifiedProperties;
        }
    }
}
