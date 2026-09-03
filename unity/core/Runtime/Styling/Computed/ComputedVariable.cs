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
            var registered = style.Context?.Style?.GetRegisteredProperty(Property.name);

            // A registered property that does not inherit is only ever read off the element itself.
            var val = registered != null && !registered.Inherits
                ? style.GetOwnStyleValue(Property)
                : style.GetRawStyleValue(Property, false);

            // The registered initial value stands in ahead of this var()'s own fallback: a property
            // registered with one is never the guaranteed-invalid value that makes a fallback apply.
            if (val == null) val = registered?.InitialValue;

            if (val == null) val = FallbackValue ?? Property.defaultValue;

            if (val is IComputedValue d) val = d.ResolveValue(prop, style, converter);

            return converter.Convert(val);
        }
    }
}
