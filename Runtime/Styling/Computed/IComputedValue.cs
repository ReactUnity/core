namespace ReactUnity.Styling.Computed
{
    public interface IComputedValue
    {
        object GetValue(IStyleProperty targetProp, NodeStyle targetStyle);
    }
}
