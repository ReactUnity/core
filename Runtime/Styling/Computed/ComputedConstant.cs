using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Computed
{
    public struct ComputedConstant : IComputedValue
    {
        public object Value { get; }
        public ComputedConstant(object value)
        {
            if (value is ComputedConstant cs) Value = cs.Value;
            else Value = value;
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

        public override bool Equals(object obj)
        {
            if (obj is ComputedConstant oc)
            {
                if (Value == null) return oc.Value == null;
                return Value.Equals(oc.Value);
            }
            return false;
        }

        public override int GetHashCode()
        {
            if (Value == null) return 0;
            return Value.GetHashCode();
        }
    }
}
