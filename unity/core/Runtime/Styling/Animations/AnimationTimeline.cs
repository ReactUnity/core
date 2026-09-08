using Mathf = UnityEngine.Mathf;

namespace ReactUnity.Styling.Animations
{
    /// <summary>Where an animation reads its progress from.</summary>
    public enum AnimationTimelineKind
    {
        // Zero, so that an absent or empty value is the clock every animation ran on before
        // timelines existed.
        Auto = 0,
        None = 1,
        Scroll = 2,
        Named = 3,
    }

    /// <summary>
    /// Which axis of a scroll container a timeline reads. There are no writing modes here, so
    /// <c>block</c> is the vertical axis and <c>inline</c> the horizontal one.
    /// </summary>
    public enum TimelineAxis
    {
        Block = 0,
        Inline = 1,
        Y = 2,
        X = 3,
    }

    /// <summary>Which scroll container an anonymous <c>scroll()</c> timeline reads.</summary>
    public enum TimelineScroller
    {
        Nearest = 0,
        Root = 1,
        Self = 2,
    }

    /// <summary>
    /// An <c>animation-timeline</c> value: the clock, nothing, an anonymous <c>scroll()</c> progress
    /// timeline, or the name of one a scroll container declared with <c>scroll-timeline-name</c>.
    /// </summary>
    public struct AnimationTimeline
    {
        public static readonly AnimationTimeline Auto = new AnimationTimeline { Kind = AnimationTimelineKind.Auto };
        public static readonly AnimationTimeline None = new AnimationTimeline { Kind = AnimationTimelineKind.None };

        public AnimationTimelineKind Kind;
        public TimelineScroller Scroller;
        public TimelineAxis Axis;
        public string Name;

        /// <summary>Whether progress comes from a scroll container rather than from the clock.</summary>
        public bool IsScrollDriven => Kind != AnimationTimelineKind.Auto;

        public static AnimationTimeline Scroll(TimelineScroller scroller, TimelineAxis axis) =>
            new AnimationTimeline { Kind = AnimationTimelineKind.Scroll, Scroller = scroller, Axis = axis };

        public static AnimationTimeline Named(string name) =>
            new AnimationTimeline { Kind = AnimationTimelineKind.Named, Name = name };

        /// <summary>
        /// The scroll container this timeline reads for <paramref name="element"/>, and the axis to
        /// read it on, which a named timeline takes from the container rather than from here. Null
        /// when there is none, which makes the timeline inactive.
        /// </summary>
        public IReactComponent ResolveSource(IReactComponent element, out TimelineAxis axis)
        {
            axis = Axis;

            switch (Kind)
            {
                case AnimationTimelineKind.Scroll:
                    switch (Scroller)
                    {
                        case TimelineScroller.Self:
                            return element.IsScrollContainer ? element : null;
                        case TimelineScroller.Root:
                            var host = element.Context?.Host;
                            return host != null && host.IsScrollContainer ? host : null;
                        default:
                            // `nearest` is the nearest ancestor, so an element that scrolls itself
                            // needs `self` to read its own progress.
                            for (var candidate = element.Parent; candidate != null; candidate = candidate.Parent)
                                if (candidate.IsScrollContainer) return candidate;
                            return null;
                    }

                case AnimationTimelineKind.Named:
                    if (Name == null) return null;

                    for (IReactComponent candidate = element; candidate != null; candidate = candidate.Parent)
                    {
                        var style = candidate.ComputedStyle;
                        if (style == null || style.scrollTimelineName != Name) continue;

                        // A name declared on something that does not scroll names no timeline.
                        if (!candidate.IsScrollContainer) return null;

                        axis = style.scrollTimelineAxis;
                        return candidate;
                    }

                    return null;

                default:
                    return null;
            }
        }

        /// <summary>
        /// How far through its scrollable range the timeline's container is, from 0 to 1. False when
        /// the timeline is inactive, which is an animation that has no effect at all.
        /// </summary>
        public bool TryGetProgress(IReactComponent element, out float progress)
        {
            progress = 0;
            if (element == null) return false;

            var source = ResolveSource(element, out var axis);
            if (source == null) return false;

            var vertical = axis == TimelineAxis.Block || axis == TimelineAxis.Y;
            var range = vertical
                ? source.ScrollHeight - source.ClientHeight
                : source.ScrollWidth - source.ClientWidth;

            // A container with nothing to scroll sits at the start of its range rather than being
            // inactive, so an animation on it holds its first keyframe.
            if (range <= 0) return true;

            var offset = vertical ? source.ScrollTop : source.ScrollLeft;
            progress = Mathf.Clamp01(offset / range);
            return true;
        }
    }
}
