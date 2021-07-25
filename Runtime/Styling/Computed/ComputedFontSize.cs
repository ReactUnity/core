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

        public object GetValue(IStyleProperty prop, NodeStyle style)
        {
            var st = style;
            var fromChild = ReferenceEquals(prop, StyleProperties.fontSize);
            if (fromChild) st = style?.Parent;

            var val = st?.GetRawStyleValue(StyleProperties.fontSize, fromChild);

            if (val == null) return null;

            if (val is IComputedValue d) val = d.GetValue(StyleProperties.fontSize, st);
            if (val is float f) val = f * Ratio;

            return prop.Convert(val);
        }
    }
}
