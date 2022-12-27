using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling
{
    public interface IRevertCalculator
    {
        public object GetRevertValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter);
    }
}
