using System.Collections.Generic;
using System.Runtime.CompilerServices;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using Yoga;

namespace ReactUnity.Styling.Shorthands
{
    /// <summary>
    /// `overflow: [x] [y]` sets the two axis properties and the single value Yoga lays out with.
    /// </summary>
    internal class OverflowShorthand : StyleShorthand
    {
        private static StyleConverterBase Converter => LayoutProperties.OverflowConverter;
        public override List<IStyleProperty> ModifiedProperties { get; }

        public OverflowShorthand(string name) : base(name)
        {
            ModifiedProperties = new List<IStyleProperty>
            {
                LayoutProperties.Overflow,
                StyleProperties.overflowX,
                StyleProperties.overflowY,
            };
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public override bool CanHandleKeyword(CssKeyword keyword) => Converter.CanHandleKeyword(keyword);

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            IComputedValue x, y;

            if (value is string str)
            {
                var splits = ParserHelpers.SplitWhitespace(str);
                if (splits.Count == 0 || splits.Count > 2) return null;
                if (!Converter.TryParse(splits[0], out x)) return null;
                if (splits.Count == 1) y = x;
                else if (!Converter.TryParse(splits[1], out y)) return null;
            }
            else
            {
                if (!Converter.TryConvert(value, out x)) return null;
                y = x;
            }

            collection[LayoutProperties.Overflow] = Combine(x, y);
            collection[StyleProperties.overflowX] = x;
            collection[StyleProperties.overflowY] = y;
            return ModifiedProperties;
        }

        private static IComputedValue Combine(IComputedValue x, IComputedValue y)
        {
            if (x is IComputedConstant cx && y is IComputedConstant cy && cx.ConstantValue is YogaOverflow ox && cy.ConstantValue is YogaOverflow oy)
                return new ComputedConstant(LayoutProperties.CombineOverflow(ox, oy));

            return ComputedCompound.Create(
                new List<IComputedValue> { x, y },
                new List<StyleConverterBase> { Converter, Converter },
                (resolved) => resolved[0] is YogaOverflow a && resolved[1] is YogaOverflow b ? (object) LayoutProperties.CombineOverflow(a, b) : null);
        }
    }
}
