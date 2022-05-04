using Facebook.Yoga;
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

            if (ReferenceEquals(prop, LayoutProperties.Width) || ReferenceEquals(prop, LayoutProperties.MaxWidth) || ReferenceEquals(prop, LayoutProperties.MinWidth))
                size = style.Parent.GetStyleValue(LayoutProperties.Width);
            else if (ReferenceEquals(prop, LayoutProperties.Height) || ReferenceEquals(prop, LayoutProperties.MaxHeight) || ReferenceEquals(prop, LayoutProperties.MinHeight))
                size = style.Parent.GetStyleValue(LayoutProperties.Height);
            else return null;

            if (size.Unit != YogaUnit.Point) return null;
            return size.Value * Value / 100;
        }
    }
}
