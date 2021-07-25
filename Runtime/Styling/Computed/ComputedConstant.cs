namespace ReactUnity.Styling.Computed
{
    public struct ComputedConstant : IComputedValue
    {
        public object Value { get; }
        public ComputedConstant(object value)
        {
            Value = value;
        }
        public object Convert(IStyleProperty prop, NodeStyle style)
        {
            return Value;
        }
    }
}
