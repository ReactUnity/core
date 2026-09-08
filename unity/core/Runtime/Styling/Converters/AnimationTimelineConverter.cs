using System;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;

namespace ReactUnity.Styling.Converters
{
    /// <summary>
    /// <c>animation-timeline</c>: <c>auto</c>, <c>none</c>, <c>scroll(&lt;scroller&gt; &lt;axis&gt;)</c>
    /// or the name of a timeline a scroll container declared. <c>view()</c> is not read here yet.
    /// </summary>
    public class AnimationTimelineConverter : TypedStyleConverterBase<AnimationTimeline>
    {
        public override bool HandleKeyword(CssKeyword keyword, out IComputedValue result)
        {
            if (keyword == CssKeyword.Auto) return Constant(AnimationTimeline.Auto, out result);
            if (keyword == CssKeyword.None) return Constant(AnimationTimeline.None, out result);
            return base.HandleKeyword(keyword, out result);
        }

        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            var text = value.Trim();
            if (text.Length == 0) return Fail(out result);

            if (IsTimelineName(text)) return Constant(AnimationTimeline.Named(text), out result);

            var (name, _, args) = ParserHelpers.ParseFunction(text);
            if (name == null || !name.Equals("scroll", StringComparison.OrdinalIgnoreCase)) return Fail(out result);

            return ParseScroll(args, out result);
        }

        // scroll( <scroller> || <axis> ), either or both, in any order.
        private bool ParseScroll(string args, out IComputedValue result)
        {
            var scroller = TimelineScroller.Nearest;
            var axis = TimelineAxis.Block;
            var scrollerSet = false;
            var axisSet = false;

            foreach (var part in ParserHelpers.SplitWhitespace(args ?? ""))
            {
                var token = part.Trim();
                if (token.Length == 0) continue;

                if (!scrollerSet && TryParseScroller(token, out var sc))
                {
                    scroller = sc;
                    scrollerSet = true;
                    continue;
                }

                if (!axisSet && TryParseAxis(token, out var ax))
                {
                    axis = ax;
                    axisSet = true;
                    continue;
                }

                return Fail(out result);
            }

            return Constant(AnimationTimeline.Scroll(scroller, axis), out result);
        }

        private static bool TryParseScroller(string token, out TimelineScroller scroller)
        {
            if (token.Equals("nearest", StringComparison.OrdinalIgnoreCase)) scroller = TimelineScroller.Nearest;
            else if (token.Equals("root", StringComparison.OrdinalIgnoreCase)) scroller = TimelineScroller.Root;
            else if (token.Equals("self", StringComparison.OrdinalIgnoreCase)) scroller = TimelineScroller.Self;
            else
            {
                scroller = TimelineScroller.Nearest;
                return false;
            }

            return true;
        }

        private static bool TryParseAxis(string token, out TimelineAxis axis)
        {
            if (token.Equals("block", StringComparison.OrdinalIgnoreCase)) axis = TimelineAxis.Block;
            else if (token.Equals("inline", StringComparison.OrdinalIgnoreCase)) axis = TimelineAxis.Inline;
            else if (token.Equals("y", StringComparison.OrdinalIgnoreCase)) axis = TimelineAxis.Y;
            else if (token.Equals("x", StringComparison.OrdinalIgnoreCase)) axis = TimelineAxis.X;
            else
            {
                axis = TimelineAxis.Block;
                return false;
            }

            return true;
        }

        /// <summary>A timeline name is a dashed identifier, which is what keeps it apart from a keyword.</summary>
        internal static bool IsTimelineName(string value)
        {
            if (value.Length <= 2 || value[0] != '-' || value[1] != '-') return false;

            for (int i = 2; i < value.Length; i++)
            {
                var c = value[i];
                if (!char.IsLetterOrDigit(c) && c != '-' && c != '_') return false;
            }

            return true;
        }

        public override string StringifyTyped(AnimationTimeline value)
        {
            switch (value.Kind)
            {
                case AnimationTimelineKind.None:
                    return "none";
                case AnimationTimelineKind.Named:
                    return value.Name;
                case AnimationTimelineKind.Scroll:
                    return "scroll(" + value.Scroller.ToString().ToLowerInvariant() + " " + value.Axis.ToString().ToLowerInvariant() + ")";
                default:
                    return "auto";
            }
        }
    }

    /// <summary>
    /// <c>scroll-timeline-name</c>: a dashed identifier, or <c>none</c> for no timeline of its own.
    /// </summary>
    public class TimelineNameConverter : TypedStyleConverterBase<string>
    {
        public override bool HandleKeyword(CssKeyword keyword, out IComputedValue result)
        {
            if (keyword == CssKeyword.None) return Constant(null, out result);
            return base.HandleKeyword(keyword, out result);
        }

        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            var text = value.Trim();
            if (!AnimationTimelineConverter.IsTimelineName(text)) return Fail(out result);
            return Constant(text, out result);
        }
    }
}
