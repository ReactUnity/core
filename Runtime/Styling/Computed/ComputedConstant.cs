using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Computed
{
    public struct ComputedConstant : IComputedValue
    {
        public object Value { get; }
        public ComputedConstant(object value)
        {
            Value = value;
        }
        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            return Value;
        }

        public override string ToString()
        {
            if (Value == null) return "null";
            return Value.ToString();
        }
    }
}
