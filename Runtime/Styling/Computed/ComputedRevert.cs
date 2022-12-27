using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Computed
{
    public struct ComputedRevert : IComputedValue
    {
        public static ComputedRevert Instance = new ComputedRevert();

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            return style?.RevertCalculator?.GetRevertValue(prop, style, converter);
        }
    }
}
