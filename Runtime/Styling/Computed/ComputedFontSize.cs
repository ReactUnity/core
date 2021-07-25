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

        public object Convert(IStyleProperty prop, NodeStyle style)
        {
            var st = style;
            var fromChild = ReferenceEquals(prop, StyleProperties.fontSize);
            if (fromChild) st = style?.Parent;

            var val = st?.GetRawStyleValue(StyleProperties.fontSize, fromChild);

            if (val == null) return null;

            if (val is IComputedValue d) val = d.Convert(StyleProperties.fontSize, st);
            else val = prop.Convert(val);

            if (val is float f) return f * Ratio;
            return val;
        }
    }
}
