using System;
using ReactUnity.Types;
using Yoga;
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
        View = 4,
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
    /// An <c>animation-timeline</c> value: the clock, nothing, an anonymous <c>scroll()</c> or
    /// <c>view()</c> progress timeline, or the name of one declared with <c>scroll-timeline-name</c>
    /// or <c>view-timeline-name</c>.
    /// </summary>
    public struct AnimationTimeline
    {
        public static readonly AnimationTimeline Auto = new AnimationTimeline { Kind = AnimationTimelineKind.Auto };
        public static readonly AnimationTimeline None = new AnimationTimeline { Kind = AnimationTimelineKind.None };

        public AnimationTimelineKind Kind;
        public TimelineScroller Scroller;
        public TimelineAxis Axis;
        public string Name;
        public YogaValue2 Inset;

        /// <summary>Whether progress comes from a scroll container rather than from the clock.</summary>
        public bool IsScrollDriven => Kind != AnimationTimelineKind.Auto;

        public static AnimationTimeline Scroll(TimelineScroller scroller, TimelineAxis axis) =>
            new AnimationTimeline { Kind = AnimationTimelineKind.Scroll, Scroller = scroller, Axis = axis };

        public static AnimationTimeline View(TimelineAxis axis, YogaValue2 inset) =>
            new AnimationTimeline { Kind = AnimationTimelineKind.View, Axis = axis, Inset = inset };

        public static AnimationTimeline Named(string name) =>
            new AnimationTimeline { Kind = AnimationTimelineKind.Named, Name = name };

        /// <summary>
        /// The container this timeline reads for <paramref name="element"/>, the subject a view
        /// timeline follows through it, and the geometry both are measured in. False when there is
        /// none, which makes the timeline inactive.
        /// </summary>
        public bool TryGetAttachment(IReactComponent element, out TimelineAttachment attachment)
        {
            attachment = default;
            if (element == null) return false;

            IReactComponent subject = null;
            IReactComponent source = null;
            var axis = Axis;
            var inset = Inset;

            switch (Kind)
            {
                case AnimationTimelineKind.Scroll:
                    source = ResolveScroller(element);
                    break;

                case AnimationTimelineKind.View:
                    subject = element;
                    source = NearestScrollContainer(element.Parent);
                    break;

                case AnimationTimelineKind.Named:
                    if (Name == null) return false;

                    for (IReactComponent candidate = element; candidate != null; candidate = candidate.Parent)
                    {
                        var style = candidate.ComputedStyle;
                        if (style == null) continue;

                        var declaring = candidate;

                        if (style.scrollTimelineName != Name && style.viewTimelineName != Name)
                        {
                            if (!ScopeContains(style.timelineScope, Name)) continue;

                            // A scope hands the name to the one timeline declared under it; none and
                            // more than one both leave it naming nothing.
                            declaring = FindScopedDeclaration(candidate, Name);
                            if (declaring == null) return false;
                        }

                        var declaringStyle = declaring.ComputedStyle;

                        if (declaringStyle.scrollTimelineName == Name)
                        {
                            // A name declared on something that does not scroll names no timeline.
                            if (!declaring.IsScrollContainer) return false;
                            source = declaring;
                            axis = declaringStyle.scrollTimelineAxis;
                        }
                        else
                        {
                            subject = declaring;
                            source = NearestScrollContainer(declaring.Parent);
                            axis = declaringStyle.viewTimelineAxis;
                            inset = declaringStyle.viewTimelineInset;
                        }

                        break;
                    }
                    break;
            }

            if (source == null) return false;

            var vertical = axis == TimelineAxis.Block || axis == TimelineAxis.Y;
            var portSize = vertical ? source.ClientHeight : source.ClientWidth;
            var content = vertical ? source.ScrollHeight : source.ScrollWidth;

            attachment = new TimelineAttachment
            {
                Source = source,
                Vertical = vertical,
                Offset = vertical ? source.ScrollTop : source.ScrollLeft,
                ScrollRange = Mathf.Max(0, content - portSize),
                PortSize = portSize,
            };

            if (subject == null) return true;

            if (!TryMeasureSubject(subject, source, vertical, out var start, out var size)) return false;

            attachment.IsView = true;
            attachment.SubjectStart = start;
            attachment.SubjectSize = size;
            attachment.InsetStart = ResolveInset(inset.X, portSize);
            attachment.InsetEnd = ResolveInset(inset.Y, portSize);
            return true;
        }

        /// <summary>
        /// How far through the given range the timeline stands, from 0 to 1. False when the timeline
        /// is inactive, which is an animation that has no effect at all.
        /// </summary>
        public bool TryGetProgress(IReactComponent element, AnimationRangeBoundary rangeStart, AnimationRangeBoundary rangeEnd, out float progress)
        {
            progress = 0;
            if (!TryGetAttachment(element, out var attachment)) return false;

            progress = attachment.GetProgress(
                attachment.ResolveBoundary(rangeStart, false),
                attachment.ResolveBoundary(rangeEnd, true));
            return true;
        }

        private IReactComponent ResolveScroller(IReactComponent element)
        {
            switch (Scroller)
            {
                case TimelineScroller.Self:
                    return element.IsScrollContainer ? element : null;
                case TimelineScroller.Root:
                    var host = element.Context?.Host;
                    return host != null && host.IsScrollContainer ? host : null;
                default:
                    // `nearest` is the nearest ancestor, so an element that scrolls itself needs
                    // `self` to read its own progress.
                    return NearestScrollContainer(element.Parent);
            }
        }

        private static IReactComponent NearestScrollContainer(IReactComponent from)
        {
            for (var candidate = from; candidate != null; candidate = candidate.Parent)
                if (candidate.IsScrollContainer) return candidate;
            return null;
        }

        /// <summary><c>timeline-scope</c> keeps its names space-separated, so a match sits on both boundaries.</summary>
        internal static bool ScopeContains(string scope, string name)
        {
            if (string.IsNullOrEmpty(scope) || string.IsNullOrEmpty(name)) return false;

            for (var i = scope.IndexOf(name, StringComparison.Ordinal); i >= 0; i = scope.IndexOf(name, i + 1, StringComparison.Ordinal))
            {
                var before = i == 0 || scope[i - 1] == ' ';
                var after = i + name.Length == scope.Length || scope[i + name.Length] == ' ';
                if (before && after) return true;
            }

            return false;
        }

        // Only one timeline may answer to a scoped name, so the whole subtree is searched rather
        // than stopped at the first match.
        private static IReactComponent FindScopedDeclaration(IReactComponent root, string name)
        {
            IReactComponent found = null;
            var ambiguous = false;
            SearchDeclarations(root, name, ref found, ref ambiguous);
            return ambiguous ? null : found;
        }

        private static void SearchDeclarations(IReactComponent node, string name, ref IReactComponent found, ref bool ambiguous)
        {
            if (ambiguous) return;

            var style = node.ComputedStyle;
            if (style != null && (style.scrollTimelineName == name || style.viewTimelineName == name))
            {
                if (found != null)
                {
                    ambiguous = true;
                    return;
                }

                found = node;
            }

            if (!(node is IContainerComponent container)) return;

            var children = container.Children;
            if (children == null) return;

            for (int i = 0; i < children.Count; i++)
                SearchDeclarations(children[i], name, ref found, ref ambiguous);
        }

        // Yoga lays a subtree out in the container's own coordinates, so the offsets on the way up
        // add to the subject's place in the scrolled content.
        private static bool TryMeasureSubject(IReactComponent subject, IReactComponent source, bool vertical, out float start, out float size)
        {
            start = 0;
            size = 0;

            var layout = subject.Layout;
            if (layout == null) return false;
            size = vertical ? layout.LayoutHeight : layout.LayoutWidth;

            IReactComponent current = subject;
            while (current != null && current != source)
            {
                var node = current.Layout;
                if (node == null) return false;
                start += vertical ? node.LayoutTop : node.LayoutLeft;
                current = current.Parent;
            }

            return current == source;
        }

        private static float ResolveInset(YogaValue value, float portSize)
        {
            if (value.Unit == YogaUnit.Percent) return portSize * value.Value / 100;
            if (value.Unit == YogaUnit.Point) return value.Value;
            return 0;
        }
    }

    /// <summary>
    /// A resolved timeline: the container that carries the progress, and for a view timeline the
    /// subject whose passage through it the named ranges are measured against. Every offset here is
    /// a scroll position of the container, which is the one space the ranges share.
    /// </summary>
    public struct TimelineAttachment
    {
        public IReactComponent Source;
        public bool Vertical;
        public bool IsView;

        public float Offset;
        public float ScrollRange;
        public float PortSize;

        public float SubjectStart;
        public float SubjectSize;
        public float InsetStart;
        public float InsetEnd;

        /// <summary>The scroll positions a named range starts and ends at.</summary>
        public void GetRange(TimelineRangeName name, out float start, out float end)
        {
            if (!IsView)
            {
                // A scroll progress timeline has the one range, so every name is the whole of it.
                start = 0;
                end = ScrollRange;
                return;
            }

            // The scrollport, less its insets, is where the subject is watched: cover runs from the
            // subject's leading edge touching the far side to its trailing edge leaving the near one.
            var coverStart = SubjectStart - PortSize + InsetEnd;
            var coverEnd = SubjectStart + SubjectSize - InsetStart;
            var filled = SubjectStart + SubjectSize - PortSize + InsetEnd;
            var cleared = SubjectStart - InsetStart;
            var containStart = Mathf.Min(filled, cleared);
            var containEnd = Mathf.Max(filled, cleared);

            switch (name)
            {
                case TimelineRangeName.Contain:
                    start = containStart;
                    end = containEnd;
                    break;
                case TimelineRangeName.Entry:
                    start = coverStart;
                    end = containStart;
                    break;
                case TimelineRangeName.Exit:
                    start = containEnd;
                    end = coverEnd;
                    break;
                case TimelineRangeName.EntryCrossing:
                    start = coverStart;
                    end = filled;
                    break;
                case TimelineRangeName.ExitCrossing:
                    start = cleared;
                    end = coverEnd;
                    break;
                default:
                    start = coverStart;
                    end = coverEnd;
                    break;
            }
        }

        /// <summary>
        /// The scroll position one end of <c>animation-range</c> names. An offset measures from the
        /// start of its range, so both ends read it the same way.
        /// </summary>
        public float ResolveBoundary(AnimationRangeBoundary boundary, bool isEnd)
        {
            GetRange(boundary.Name, out var start, out var end);

            var offset = boundary.Offset;
            if (offset.Unit == YogaUnit.Percent) return start + (end - start) * offset.Value / 100;
            if (offset.Unit == YogaUnit.Point) return start + offset.Value;
            return isEnd ? end : start;
        }

        public float GetProgress(float start, float end)
        {
            var span = end - start;
            // A range with nothing in it sits at its own beginning, so the animation holds its first
            // keyframe rather than jumping to the last.
            if (span <= 0) return 0;
            return Mathf.Clamp01((Offset - start) / span);
        }
    }
}
