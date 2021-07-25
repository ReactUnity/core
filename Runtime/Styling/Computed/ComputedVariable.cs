namespace ReactUnity.Styling.Computed
{
    public struct ComputedVariable : IComputedValue
    {
        public VariableProperty Property { get; }
        public object FallbackValue { get; }

        public ComputedVariable(VariableProperty prop, object fallbackValue)
        {
            Property = prop;
            FallbackValue = fallbackValue;
        }

        public object Convert(IStyleProperty prop, NodeStyle style)
        {
            var val = style.GetRawStyleValue(Property, false);

            if (val == null) val = FallbackValue ?? prop.defaultValue;

            if (val is IComputedValue d) return d.Convert(prop, style);

            return prop.Convert(val);
        }
    }
}
