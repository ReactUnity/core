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
        public object Convert(IStyleProperty prop, NodeStyle style)
        {
            return prop.Convert(Value);
        }
    }
}
