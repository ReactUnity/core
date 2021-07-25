namespace ReactUnity.Styling.Computed
{
    public interface IComputedValue
    {
        object Convert(IStyleProperty prop, NodeStyle style);
    }
}
