using System;
using System.Collections.Generic;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Types;
using Yoga;

namespace ReactUnity.Styling.Converters
{
    /// <summary>
    /// <c>animation-timeline</c>: <c>auto</c>, <c>none</c>, <c>scroll(&lt;scroller&gt; &lt;axis&gt;)</c>,
    /// <c>view(&lt;axis&gt; &lt;inset&gt;)</c>, or the name of a timeline an element declared.
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
            if (name == null) return Fail(out result);

            if (name.Equals("scroll", StringComparison.OrdinalIgnoreCase)) return ParseScroll(args, out result);
            if (name.Equals("view", StringComparison.OrdinalIgnoreCase)) return ParseView(args, out result);

            return Fail(out result);
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

        // view( <axis> || <inset> ), where the inset is one or two lengths, percentages or `auto`
        // that shrink the scrollport the subject is watched in.
        private bool ParseView(string args, out IComputedValue result)
        {
            var axis = TimelineAxis.Block;
            var axisSet = false;
            var insets = new List<string>();

            foreach (var part in ParserHelpers.SplitWhitespace(args ?? ""))
            {
                var token = part.Trim();
                if (token.Length == 0) continue;

                if (!axisSet && TryParseAxis(token, out var ax))
                {
                    axis = ax;
                    axisSet = true;
                    continue;
                }

                insets.Add(token);
            }

            if (insets.Count == 0) return Constant(AnimationTimeline.View(axis, YogaValue2.Zero), out result);
            if (insets.Count > 2) return Fail(out result);

            return ComputedMapper.Create(out result, string.Join(" ", insets), AllConverters.TimelineInsetConverter,
                resolved => resolved is YogaValue2 inset ? (object) AnimationTimeline.View(axis, inset) : null);
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
                case AnimationTimelineKind.View:
                    return "view(" + value.Axis.ToString().ToLowerInvariant() + " " + value.Inset.ToCSS() + ")";
                default:
                    return "auto";
            }
        }
    }

    /// <summary>
    /// <c>scroll-timeline-name</c> and <c>view-timeline-name</c>: a dashed identifier, or
    /// <c>none</c> for no timeline of its own.
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

    /// <summary>
    /// One end of <c>animation-range</c>: <c>normal</c>, a length or percentage into the whole
    /// timeline, or a named range with an optional offset into it.
    /// </summary>
    public class AnimationRangeConverter : TypedStyleConverterBase<AnimationRangeBoundary>
    {
        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            var splits = ParserHelpers.SplitWhitespace(value.Trim());
            if (splits.Count == 0 || splits.Count > 2) return Fail(out result);

            if (TryParseRangeName(splits[0], out var name))
            {
                if (splits.Count == 1) return Constant(new AnimationRangeBoundary(name, YogaValue.Undefined()), out result);
                return ParseOffset(name, splits[1], out result);
            }

            if (splits.Count > 1) return Fail(out result);
            return ParseOffset(TimelineRangeName.Normal, splits[0], out result);
        }

        private bool ParseOffset(TimelineRangeName name, string token, out IComputedValue result)
        {
            return ComputedMapper.Create(out result, token, AllConverters.YogaValueConverter, resolved => {
                if (!(resolved is YogaValue offset)) return null;
                // Only a real distance places a boundary; `auto` has nothing to measure from here.
                if (offset.Unit != YogaUnit.Point && offset.Unit != YogaUnit.Percent) return null;
                return new AnimationRangeBoundary(name, offset);
            });
        }

        internal static bool TryParseRangeName(string token, out TimelineRangeName name)
        {
            if (token.Equals("normal", StringComparison.OrdinalIgnoreCase)) name = TimelineRangeName.Normal;
            else if (token.Equals("cover", StringComparison.OrdinalIgnoreCase)) name = TimelineRangeName.Cover;
            else if (token.Equals("contain", StringComparison.OrdinalIgnoreCase)) name = TimelineRangeName.Contain;
            else if (token.Equals("entry", StringComparison.OrdinalIgnoreCase)) name = TimelineRangeName.Entry;
            else if (token.Equals("exit", StringComparison.OrdinalIgnoreCase)) name = TimelineRangeName.Exit;
            else if (token.Equals("entry-crossing", StringComparison.OrdinalIgnoreCase)) name = TimelineRangeName.EntryCrossing;
            else if (token.Equals("exit-crossing", StringComparison.OrdinalIgnoreCase)) name = TimelineRangeName.ExitCrossing;
            else
            {
                name = TimelineRangeName.Normal;
                return false;
            }

            return true;
        }

        public override string StringifyTyped(AnimationRangeBoundary value)
        {
            var name = value.Name == TimelineRangeName.EntryCrossing ? "entry-crossing"
                : value.Name == TimelineRangeName.ExitCrossing ? "exit-crossing"
                : value.Name.ToString().ToLowerInvariant();

            if (value.Offset.Unit == YogaUnit.Percent) return name + " " + value.Offset.Value + "%";
            if (value.Offset.Unit == YogaUnit.Point) return name + " " + value.Offset.Value + "px";
            return name;
        }
    }
}
