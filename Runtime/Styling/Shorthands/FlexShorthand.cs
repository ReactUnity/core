using System.Collections.Generic;
using Yoga;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Shorthands
{
    /// <summary>
    /// The flex shorthand with the web's omitted values: a factor alone is <c>n 1 0%</c>, a basis
    /// alone is <c>1 1 basis</c>, <c>auto</c> is <c>1 1 auto</c> and <c>none</c> is <c>0 0 auto</c>.
    /// </summary>
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

        public override bool CanHandleKeyword(CssKeyword keyword) => keyword == CssKeyword.Auto || keyword == CssKeyword.None;

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var splits = ParserHelpers.SplitWhitespace(value.ToString());

            if (splits.Count == 0 || splits.Count > 3) return null;

            IComputedValue grow = null;
            IComputedValue shrink = null;
            IComputedValue basis = null;

            if (splits.Count == 1)
            {
                var keyword = splits[0].ToLowerInvariant();
                if (keyword == "none") grow = new ComputedConstant(0f);
                else if (keyword == "auto") grow = new ComputedConstant(1f);
                if (grow != null)
                {
                    shrink = grow;
                    basis = new ComputedConstant(YogaValue.Auto());
                }
            }

            if (grow == null)
            {
                for (int i = 0; i < splits.Count; i++)
                {
                    var split = splits[i];

                    // A keyword such as auto is a basis, whatever the number converter makes of it.
                    IComputedValue factor = null;
                    var isFactor = !ParserHelpers.TryParseKeyword(split, out _) && AllConverters.FloatConverter.TryParse(split, out factor);

                    if (isFactor && grow == null)
                    {
                        grow = factor;
                        continue;
                    }

                    if (isFactor && shrink == null)
                    {
                        shrink = factor;
                        continue;
                    }

                    if (basis == null && AllConverters.YogaValueConverter.TryParse(split, out var b))
                    {
                        basis = b;
                        continue;
                    }

                    return null;
                }

                // A factor with no basis takes 0%, a basis with no factor grows; either way an item shrinks.
                if (basis == null) basis = new ComputedConstant(grow == null ? YogaValue.Auto() : YogaValue.Percent(0));
                if (grow == null) grow = new ComputedConstant(1f);
                if (shrink == null) shrink = new ComputedConstant(1f);
            }

            collection[ModifiedProperties[0]] = grow;
            collection[ModifiedProperties[1]] = shrink;
            collection[ModifiedProperties[2]] = basis;

            return ModifiedProperties;
        }
    }
}
