using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Computed
{
    public struct ComputedFontSize : IComputedValue
    {
        public static ComputedFontSize Default { get; } = new ComputedFontSize(1);

        public float Ratio { get; }

        public ComputedFontSize(float ratio)
        {
            Ratio = ratio;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            var st = style;
            var fromChild = ReferenceEquals(prop, StyleProperties.fontSize);
            if (fromChild) st = style?.Parent;

            var val = st?.GetResolvedValue(StyleProperties.fontSize, fromChild);
            if (val == null) return null;
            if (val is float f) val = f * Ratio;

            return converter.Convert(val);
        }
    }
}
