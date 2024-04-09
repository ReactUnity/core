namespace Yoga
{
    [System.Flags]
    public enum YogaErrata
    {
        None = 0,
        StretchFlexBasis = 1,
        AbsolutePositioningIncorrect = 2,
        AbsolutePercentAgainstInnerSize = 4,
        All = 2147483647,
        Classic = 2147483646
    }
}
