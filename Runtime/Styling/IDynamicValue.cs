using ReactUnity.Animations;

namespace ReactUnity.Styling
{
    public interface IDynamicValue
    {
        object Convert(IStyleProperty prop, NodeStyle style);
    }

    public struct DynamicValue : IDynamicValue
    {
        public object Value { get; }
        public DynamicValue(object value)
        {
            if (value is IDynamicValue) throw new System.Exception("Dynamic value cannot wrap another dynamic value");
            Value = value;
        }
        public object Convert(IStyleProperty prop, NodeStyle style)
        {
            return prop.Convert(Value);
        }
    }

    public struct DynamicPropertyValue : IDynamicValue
    {
        public VariableProperty Property { get; }
        public object FallbackValue { get; }

        public DynamicPropertyValue(VariableProperty prop, object fallbackValue)
        {
            Property = prop;
            FallbackValue = fallbackValue;
        }

        public object Convert(IStyleProperty prop, NodeStyle style)
        {
            var val = style.GetRawStyleValue(Property, false);

            if (val == null) val = FallbackValue;

            if (val is IDynamicValue d)
                return d.Convert(prop, style);

            return prop.Convert(val);
        }
    }

    public struct DynamicInterpolatedValue : IDynamicValue
    {
        public IDynamicValue From { get; }
        public IDynamicValue To { get; }
        public float Ratio { get; }

        public DynamicInterpolatedValue(IDynamicValue from, IDynamicValue to, float ratio)
        {
            From = from;
            To = to;
            Ratio = ratio;
        }

        public object Convert(IStyleProperty prop, NodeStyle style)
        {
            var from = From.Convert(prop, style);
            var to = To.Convert(prop, style);

            return Interpolater.Interpolate(from, to, Ratio);
        }
    }
}
