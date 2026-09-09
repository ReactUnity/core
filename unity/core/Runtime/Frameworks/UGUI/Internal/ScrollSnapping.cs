using ReactUnity.Types;
using UnityEngine;
using Yoga;

namespace ReactUnity.UGUI.Internal
{
    /// <summary>
    /// Where a scroll container with <c>scroll-snap-type</c> should come to rest: per axis, the snap
    /// point of whichever descendant declaring <c>scroll-snap-align</c> asks for the nearest one.
    /// </summary>
    internal static class ScrollSnapping
    {
        /// <summary>
        /// How far a <c>proximity</c> snap reaches, as a share of the snapport. CSS leaves the number to
        /// the implementation; half a screen is far enough to catch a scroll aimed at an item and short
        /// enough to leave a scroll aimed between two alone.
        /// </summary>
        private const float ProximityRatio = 0.5f;

        /// <summary>
        /// The offset the container should settle at, in the points <see cref="ScrollComponent.ScrollLeft"/>
        /// and <see cref="ScrollComponent.ScrollTop"/> are measured in. False when nothing snaps, or when
        /// the snap point is the one it is already at.
        /// </summary>
        internal static bool TryResolve(ScrollComponent scroller, Vector2 current, out Vector2 target)
        {
            target = current;

            var type = scroller.ComputedStyle?.scrollSnapType ?? ScrollSnapType.None;
            var port = scroller.Layout;
            var rect = scroller.ScrollRect;
            if (port == null || !rect || type.Axis == ScrollSnapAxis.None) return false;

            // The snapport is the scrollport's padding edge, which is also where a Yoga position of zero
            // lands -- so the first child of a padded container is snapped at offset zero rather than
            // scrolled until it touches the border. There is no `scroll-padding` to inset it further by.
            var left = Inset(port, YogaEdge.Left);
            var top = Inset(port, YogaEdge.Top);

            var x = new Axis
            {
                Enabled = type.Snaps(true) && rect.horizontal,
                PortStart = left,
                PortSize = scroller.ClientWidth - left - Inset(port, YogaEdge.Right),
                Current = current.x,
                Max = scroller.ScrollWidth - scroller.ClientWidth,
            };

            var y = new Axis
            {
                Enabled = type.Snaps(false) && rect.vertical,
                PortStart = top,
                PortSize = scroller.ClientHeight - top - Inset(port, YogaEdge.Bottom),
                Current = current.y,
                Max = scroller.ScrollHeight - scroller.ClientHeight,
            };

            if (!x.Enabled && !y.Enabled) return false;

            Collect(scroller, Vector2.zero, ref x, ref y);

            target = new Vector2(x.Resolve(type.Mandatory), y.Resolve(type.Mandatory));

            // Half a point is under the pixel the scroll offset is quantised to anyway, and animating
            // towards where it already is would only take the scroll away from the user.
            return Mathf.Abs(target.x - current.x) > 0.5f || Mathf.Abs(target.y - current.y) > 0.5f;
        }

        /// <summary>
        /// Every snap target under <paramref name="container"/>, at <paramref name="offset"/> from the
        /// content's own origin -- a Yoga position is relative to its parent, so the chain down sums.
        /// </summary>
        private static void Collect(IContainerComponent container, Vector2 offset, ref Axis x, ref Axis y)
        {
            var children = container.Children;
            if (children == null) return;

            for (int i = 0; i < children.Count; i++)
            {
                var child = children[i];

                // A scroll element's own scrollbars are children of it, and neither they nor a pseudo
                // have a box anyone means to snap to.
                if (child == null || child.Destroyed || child.IsPseudoElement) continue;

                var layout = child.Layout;
                if (layout == null) continue;

                var childLeft = offset.x + layout.LayoutLeft;
                var childTop = offset.y + layout.LayoutTop;
                if (float.IsNaN(childLeft) || float.IsNaN(childTop)) continue;

                var align = child.ComputedStyle?.scrollSnapAlign ?? ScrollSnapAlign.None;
                x.Consider(align.Inline, childLeft, layout.LayoutWidth);
                y.Consider(align.Block, childTop, layout.LayoutHeight);

                // A nested scroll container carries its contents with it, so those are its own snap
                // targets rather than this one's.
                if (!child.IsScrollContainer && child is IContainerComponent inner)
                    Collect(inner, new Vector2(childLeft, childTop), ref x, ref y);
            }
        }

        /// <summary>An edge's border plus padding, which Yoga reports as NaN when it never resolved one.</summary>
        private static float Inset(YogaNode node, YogaEdge edge)
        {
            var border = node.LayoutGetBorder(edge);
            var padding = node.LayoutGetPadding(edge);
            return (float.IsNaN(border) ? 0 : border) + (float.IsNaN(padding) ? 0 : padding);
        }

        /// <summary>One axis of the search: the snapport on it, and the best candidate found so far.</summary>
        private struct Axis
        {
            public bool Enabled;
            public float PortStart;
            public float PortSize;
            public float Current;
            public float Max;

            private bool found;
            private float best;
            private float distance;

            public void Consider(ScrollSnapAlignment align, float start, float size)
            {
                if (!Enabled || align == ScrollSnapAlignment.None) return;
                if (float.IsNaN(size)) return;

                float wanted;
                if (align == ScrollSnapAlignment.Start) wanted = start - PortStart;
                else if (align == ScrollSnapAlignment.End) wanted = start + size - PortStart - PortSize;
                else wanted = start + size * 0.5f - PortStart - PortSize * 0.5f;

                // An item the scroll cannot reach snaps to the closest offset that shows it, which is
                // how a `start`-aligned last item still counts as snapped at the end of the travel.
                wanted = Mathf.Clamp(wanted, 0, Mathf.Max(0, Max));

                var d = Mathf.Abs(wanted - Current);
                if (found && d >= distance) return;

                found = true;
                best = wanted;
                distance = d;
            }

            public float Resolve(bool mandatory)
            {
                if (!found) return Current;
                if (!mandatory && distance > PortSize * ProximityRatio) return Current;
                return best;
            }
        }
    }
}
