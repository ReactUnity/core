using ReactUnity.Styling.Converters;

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

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            var val = style.GetRawStyleValue(Property, false);

            if (val == null) val = FallbackValue ?? Property.defaultValue;

            if (val is IComputedValue d) val = d.ResolveValue(prop, style, converter);

            return converter.Convert(val);
        }
    }
}
