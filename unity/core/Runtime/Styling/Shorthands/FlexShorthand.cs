using System.Collections.Generic;
using Yoga;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Shorthands
{
    internal class FlexShorthand : StyleShorthand
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

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var str = value.ToString();
            var splits = ParserHelpers.SplitWhitespace(str);

            if (splits.Count == 0 || splits.Count > 3) return null;

            var growSet = false;
            var shrinkSet = false;
            var basisSet = false;

            IComputedValue grow = new ComputedConstant(0f);
            IComputedValue shrink = new ComputedConstant(0f);
            IComputedValue basis = new ComputedConstant(YogaValue.Undefined());

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];

                if (!growSet)
                {
                    if (AllConverters.FloatConverter.TryParse(split, out var v))
                    {
                        grow = v;
                        growSet = true;
                        continue;
                    }
                }

                if (!shrinkSet)
                {
                    if (AllConverters.FloatConverter.TryParse(split, out var v))
                    {
                        shrink = v;
                        shrinkSet = true;
                        continue;
                    }
                }

                if (!basisSet)
                {
                    if (AllConverters.YogaValueConverter.TryParse(split, out var v))
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
