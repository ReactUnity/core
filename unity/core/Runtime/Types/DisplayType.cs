namespace ReactUnity.Types
{
    /// <summary>
    /// The display property. There is no block layout, so Block is a flex container that stacks its
    /// children, and Flex is one that lays them out in a row, as a browser would.
    /// </summary>
    public enum DisplayType
    {
        Block = 0,
        Flex = 1,
        None = 2,
        Contents = 3,
    }
}
