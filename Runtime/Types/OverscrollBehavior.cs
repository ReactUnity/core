namespace ReactUnity.Types
{
    /// <summary>
    /// The <c>overscroll-behavior</c> property: what a scroll box does with a scroll it has no room
    /// left to take. <c>Auto</c> hands it to the box above, the other two keep it here.
    /// </summary>
    public enum OverscrollBehavior
    {
        Auto = 0,
        Contain = 1,
        None = 2,
    }
}
