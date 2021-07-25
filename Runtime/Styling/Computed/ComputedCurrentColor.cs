namespace ReactUnity.Styling.Computed
{
    public struct ComputedCurrentColor : IComputedValue
    {
        public static ComputedCurrentColor Instance { get; } = new ComputedCurrentColor();

        public object Convert(IStyleProperty prop, NodeStyle style)
        {
            var st = style;
            var fromChild = ReferenceEquals(prop, StyleProperties.color);
            if (fromChild) st = style?.Parent;

            var val = st?.GetRawStyleValue(StyleProperties.color, fromChild);

            if (val == null) return null;

            if (val is IComputedValue d)
                return d.Convert(StyleProperties.color, st);

            return prop.Convert(val);
        }
    }
}
