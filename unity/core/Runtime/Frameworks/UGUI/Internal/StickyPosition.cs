using Yoga;
using ReactUnity.Helpers;
using ReactUnity.Styling;
using ReactUnity.Styling.Rules;
using UnityEngine;

namespace ReactUnity.UGUI.Internal
{
    /// <summary>
    /// Where <c>position: sticky</c> holds a box: its in-flow position, moved the least it can be to stay
    /// inside the nearest scrollport shrunk by its own insets, then clamped to its containing block.
    /// </summary>
    /// <remarks>
    /// Layout never sees any of this. A sticky box keeps its place in flow and its siblings never move for
    /// it, so the insets are resolved here against the live scroll offset rather than handed to Yoga --
    /// which is also why this is the one position value whose insets are withheld in ApplyYogaValues.
    /// </remarks>
    internal static class StickyPosition
    {
        /// <summary>
        /// The offset to add to the in-flow position, in CSS directions (right and down positive), plus the
        /// edges the box ends up held against. False when nothing can hold it -- no scrollable ancestor, or
        /// a layout that has not run yet -- and the offset is zero.
        /// </summary>
        internal static bool TryResolve(UGUIComponent component, out Vector2 offset, out ScrollEdge stuck)
        {
            offset = Vector2.zero;
            stuck = ScrollEdge.None;

            var layout = component.Layout;
            var parent = layout?.Parent;
            var style = component.ComputedStyle;
            if (parent == null || style == null) return false;

            var scroller = ComponentHelpers.NearestScrollContainer(component.Parent) as ScrollComponent;
            var port = scroller?.Layout;
            var content = scroller?.ScrollRect?.content;
            if (port == null || !content) return false;

            // The box in the scroll content's space: a Yoga position is relative to the parent, so the
            // chain up to the scroller sums.
            float x = 0, y = 0;
            var reached = false;
            for (var node = layout; node != null; node = node.Parent)
            {
                if (node == port) { reached = true; break; }
                x += node.LayoutLeft;
                y += node.LayoutTop;
            }

            // An ancestor in between was lifted out of the tree by `position: fixed`, so the box is not in
            // that scroller's content at all.
            if (!reached) return false;

            var width = layout.LayoutWidth;
            var height = layout.LayoutHeight;
            if (float.IsNaN(x) || float.IsNaN(y) || float.IsNaN(width) || float.IsNaN(height)) return false;

            // The offset the ScrollRect has actually applied, rather than the ScrollTop it reports: that one
            // is scaled to the scroll box while the rect drives a viewport a pixel larger, so it reads up
            // to a pixel out at full travel -- which a stuck edge would show.
            var scrolledX = -content.anchoredPosition.x;
            var scrolledY = content.anchoredPosition.y;

            // The scrollport is the scroll box's padding edge, so a container with a border or padding of
            // its own holds the box below it rather than under it. Yoga folds a reserved `scrollbar-gutter`
            // into that padding, so the gutter is already out of the port on the two end edges.
            var portLeft = scrolledX + Inset(port, YogaEdge.Left);
            var portTop = scrolledY + Inset(port, YogaEdge.Top);
            var portRight = scrolledX + scroller.ClientWidth - Inset(port, YogaEdge.Right);
            var portBottom = scrolledY + scroller.ClientHeight - Inset(port, YogaEdge.Bottom);

            // The containing block is the parent's content box. Where the parent is the scroll container
            // itself that box is the whole scrollable area, not the port Yoga measured it as.
            var parentX = x - layout.LayoutLeft;
            var parentY = y - layout.LayoutTop;
            var parentWidth = parent == port ? Mathf.Max(parent.LayoutWidth, scroller.ScrollWidth) : parent.LayoutWidth;
            var parentHeight = parent == port ? Mathf.Max(parent.LayoutHeight, scroller.ScrollHeight) : parent.LayoutHeight;

            var blockLeft = parentX + Inset(parent, YogaEdge.Left);
            var blockTop = parentY + Inset(parent, YogaEdge.Top);
            var blockRight = parentX + parentWidth - Inset(parent, YogaEdge.Right);
            var blockBottom = parentY + parentHeight - Inset(parent, YogaEdge.Bottom);

            var rtl = layout.LayoutDirection == YogaDirection.RTL;

            // A logical inset beats the physical edge it lands on, the order Yoga applies them in.
            var inlineStart = StylingHelpers.GetStyleLength(style, LayoutProperties.Start);
            var inlineEnd = StylingHelpers.GetStyleLength(style, LayoutProperties.End);
            var logicalLeft = rtl ? inlineEnd : inlineStart;
            var logicalRight = rtl ? inlineStart : inlineEnd;

            var leftInset = logicalLeft.HasValue() ? logicalLeft : StylingHelpers.GetStyleLength(style, LayoutProperties.Left);
            var rightInset = logicalRight.HasValue() ? logicalRight : StylingHelpers.GetStyleLength(style, LayoutProperties.Right);
            var topInset = StylingHelpers.GetStyleLength(style, LayoutProperties.Top);
            var bottomInset = StylingHelpers.GetStyleLength(style, LayoutProperties.Bottom);

            var top = ResolveAxis(y, height, topInset, bottomInset, portTop, portBottom,
                blockTop, blockBottom, true, out var atTop, out var atBottom);
            var left = ResolveAxis(x, width, leftInset, rightInset, portLeft, portRight,
                blockLeft, blockRight, !rtl, out var atLeft, out var atRight);

            offset = new Vector2(left - x, top - y);
            if (atTop) stuck |= ScrollEdge.Top;
            if (atBottom) stuck |= ScrollEdge.Bottom;
            if (atLeft) stuck |= ScrollEdge.Left;
            if (atRight) stuck |= ScrollEdge.Right;
            return true;
        }

        /// <summary>
        /// One axis, in coordinates that grow towards the high edge. <paramref name="lowWins"/> names the
        /// side an over-constrained box follows -- <c>top</c> on the block axis, the inline start edge
        /// (so <c>right</c> under RTL) on the other.
        /// </summary>
        private static float ResolveAxis(float inflow, float size, YogaValue lowInset, YogaValue highInset,
            float portLow, float portHigh, float blockLow, float blockHigh, bool lowWins,
            out bool atLow, out bool atHigh)
        {
            atLow = false;
            atHigh = false;
            var position = inflow;
            var blockSize = blockHigh - blockLow;

            // The winning side is applied second so that it is the one left standing.
            for (var pass = 0; pass < 2; pass++)
            {
                if (lowWins == (pass == 1))
                {
                    if (!lowInset.HasValue()) continue;
                    var limit = portLow + lowInset.GetPointValue(blockSize, 0);
                    if (limit > position)
                    {
                        position = limit;
                        atLow = true;
                        atHigh = false;
                    }
                }
                else
                {
                    if (!highInset.HasValue()) continue;
                    var limit = portHigh - highInset.GetPointValue(blockSize, 0) - size;
                    if (limit < position)
                    {
                        position = limit;
                        atHigh = true;
                        atLow = false;
                    }
                }
            }

            // The containing block takes the box back off the edge before it can leave, which is also the
            // moment it stops counting as stuck.
            var clamped = Mathf.Clamp(position, blockLow, Mathf.Max(blockLow, blockHigh - size));
            if (clamped != position)
            {
                atLow = false;
                atHigh = false;
            }

            return clamped;
        }

        /// <summary>An edge's border plus padding, which Yoga reports as NaN when it never resolved one.</summary>
        private static float Inset(YogaNode node, YogaEdge edge)
        {
            var border = node.LayoutGetBorder(edge);
            var padding = node.LayoutGetPadding(edge);
            return (float.IsNaN(border) ? 0 : border) + (float.IsNaN(padding) ? 0 : padding);
        }
    }
}
