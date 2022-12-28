using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling
{
    public interface IRevertCalculator
    {
        object GetRevertValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter);
    }
}
