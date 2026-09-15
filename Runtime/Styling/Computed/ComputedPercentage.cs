using Yoga;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Computed
{
    public struct ComputedPercentage : IComputedValue
    {
        public float Value { get; }

        public ComputedPercentage(float value)
        {
            Value = value;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            YogaValue size;

            // A percentage of the parent's size on a node that has no parent is no size at all.
            if (style == null) return null;

            if (ReferenceEquals(prop, LayoutProperties.Width) || ReferenceEquals(prop, LayoutProperties.MaxWidth) || ReferenceEquals(prop, LayoutProperties.MinWidth))
                size = style.Parent?.GetStyleValue(LayoutProperties.Width) ?? YogaValue.Undefined();
            else if (ReferenceEquals(prop, LayoutProperties.Height) || ReferenceEquals(prop, LayoutProperties.MaxHeight) || ReferenceEquals(prop, LayoutProperties.MinHeight))
                size = style.Parent?.GetStyleValue(LayoutProperties.Height) ?? YogaValue.Undefined();
            else if (
                ReferenceEquals(prop, LayoutProperties.BorderWidth) ||
                ReferenceEquals(prop, LayoutProperties.BorderLeftWidth) ||
                ReferenceEquals(prop, LayoutProperties.BorderRightWidth) ||
                ReferenceEquals(prop, LayoutProperties.BorderStartWidth) ||
                ReferenceEquals(prop, LayoutProperties.BorderEndWidth)
            )
                size = style.GetStyleValue(LayoutProperties.Width);
            else if (
                ReferenceEquals(prop, LayoutProperties.BorderTopWidth) ||
                ReferenceEquals(prop, LayoutProperties.BorderBottomWidth)
            )
                size = style.GetStyleValue(LayoutProperties.Height);
            else return null;

            if (size.Unit != YogaUnit.Point) return null;
            return size.Value * Value / 100;
        }
    }
}
