using Yoga;

namespace ReactUnity.Styling.Animations
{
    /// <summary>
    /// A stretch of a view timeline, named after where the subject is relative to the scrollport.
    /// A scroll timeline has the one range, so every name means the whole of it there.
    /// </summary>
    public enum TimelineRangeName
    {
        Normal = 0,
        Cover = 1,
        Contain = 2,
        Entry = 3,
        Exit = 4,
        EntryCrossing = 5,
        ExitCrossing = 6,
    }

    /// <summary>
    /// One end of <c>animation-range</c>: a named range, an offset into it, or both. An undefined
    /// offset is the natural edge of the range, which is what <c>normal</c> parses to.
    /// </summary>
    public struct AnimationRangeBoundary
    {
        public TimelineRangeName Name;
        public YogaValue Offset;

        public AnimationRangeBoundary(TimelineRangeName name, YogaValue offset)
        {
            Name = name;
            Offset = offset;
        }
    }
}
