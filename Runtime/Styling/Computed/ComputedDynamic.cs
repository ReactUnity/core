using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Computed
{
    public struct ComputedDynamic : IComputedValue
    {
        public object Value { get; }
        public ComputedDynamic(object value)
        {
            if (value is IComputedValue) throw new System.Exception("Dynamic value cannot wrap another dynamic value");
            Value = value;
        }
        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            return converter.Convert(Value);
        }
    }
}
