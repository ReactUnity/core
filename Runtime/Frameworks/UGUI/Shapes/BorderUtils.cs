using System.Collections.Generic;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Shapes
{
    internal static class BorderUtils
    {
        public static Vector2 GetBorderStyleTextureUVs(BorderStyle style, bool inverted)
        {
            switch (style)
            {
                case BorderStyle.Dashed:
                case BorderStyle.Solid:
                    return new Vector2(34f / 64f, 38f / 64f);
                case BorderStyle.Dotted:
                    return new Vector2(0, 0.5f);
                //case BorderStyle.Dashed:
                //    return new Vector2(46f / 64f, 50f / 64f);
                case BorderStyle.Double:
                    return new Vector2(52f / 64f, 55f / 64f);
                case BorderStyle.Groove:
                    return inverted ?
                        new Vector2(40f / 64f, 44f / 64f) :
                        new Vector2(44f / 64f, 40f / 64f);
                case BorderStyle.Ridge:
                    return inverted ?
                        new Vector2(44f / 64f, 40f / 64f) :
                        new Vector2(40f / 64f, 44f / 64f);
                case BorderStyle.Outset:
                    return inverted ?
                        new Vector2(58f / 64f, 62f / 64f) :
                        new Vector2(34f / 64f, 38f / 64f);
                case BorderStyle.Inset:
                    return inverted ?
                        new Vector2(34f / 64f, 38f / 64f) :
                        new Vector2(58f / 64f, 62f / 64f);
                case BorderStyle.None:
                default:
                    return new Vector2(63f / 64f, 1);
            }
        }

        /// <summary>
        /// Whether the style repeats along the edge rather than only varying across the border
        /// width. Those cannot ride a single ring - each piece needs its own geometry.
        /// </summary>
        public static bool IsTiledStyle(BorderStyle style) =>
            style == BorderStyle.Dotted || style == BorderStyle.Dashed;

        static readonly List<Vector2> sideInner = new List<Vector2>();
        static readonly List<Vector2> sideOuter = new List<Vector2>();
        static readonly List<float> sideArc = new List<float>();
        static UIVertex tmpVertex = UIVertex.simpleVert;

        /// <summary>
        /// Draws one side of a rounded border, from the mitre it starts at to the mitre it ends at,
        /// reading the path back out of the two vertex rings already in <paramref name="vh"/>.
        /// A tiled style is walked out by arc length into one strip per dot or dash; anything else
        /// is a single strip over the whole side, which is what the ring itself would have drawn.
        /// </summary>
        public static void AddRoundedSideStrip(
            ref VertexHelper vh,
            int innerBase,
            int outerBase,
            int ringCount,
            int startIndex,
            int vertexCount,
            BorderStyle style,
            Vector2 band,
            float size,
            Color32 color
        )
        {
            if (vertexCount < 2 || size == 0 || style == BorderStyle.None) return;

            sideInner.Clear();
            sideOuter.Clear();
            sideArc.Clear();

            // Arc length runs along the centreline, so a dash keeps its length through a corner
            // instead of stretching with the outer edge.
            var total = 0f;
            for (int k = 0; k < vertexCount; k++)
            {
                var index = (startIndex + k) % ringCount;

                vh.PopulateUIVertex(ref tmpVertex, innerBase + index);
                var inner = (Vector2) tmpVertex.position;

                vh.PopulateUIVertex(ref tmpVertex, outerBase + index);
                var outer = (Vector2) tmpVertex.position;

                if (k > 0)
                    total += Vector2.Distance(
                        (sideInner[k - 1] + sideOuter[k - 1]) * 0.5f,
                        (inner + outer) * 0.5f
                    );

                sideInner.Add(inner);
                sideOuter.Add(outer);
                sideArc.Add(total);
            }

            if (total <= 0) return;

            if (!IsTiledStyle(style))
            {
                AddStripSection(ref vh, 0, total, band, color);
                return;
            }

            var absSize = Mathf.Abs(size);
            float period, on;

            if (style == BorderStyle.Dotted)
            {
                // A dot is as long as the border is wide, with a gap to match, so the texture's
                // circle stays circular. Fitted to a whole number per side.
                var count = Mathf.Max(1, Mathf.RoundToInt(total / (absSize * 2f)));
                period = total / count;
                on = Mathf.Min(absSize, period);
            }
            else
            {
                // 3:2 dash to gap - the ratio the square path lands on at every width, since it
                // clamps size and spacing together.
                var desired = Mathf.Max(10f, absSize * 5f);
                var count = Mathf.Max(1, Mathf.RoundToInt(total / desired));
                period = total / count;
                on = period * 0.6f;
            }

            // Centred in each period, so a side ends with half a gap at both mitres rather than a
            // clipped dash at one of them.
            for (var start = (period - on) * 0.5f; start < total; start += period)
                AddStripSection(ref vh, start, Mathf.Min(start + on, total), band, color);
        }

        private static void AddStripSection(ref VertexHelper vh, float from, float to, Vector2 band, Color32 color)
        {
            var length = to - from;
            if (length <= 0) return;

            for (int k = 0; k + 1 < sideArc.Count; k++)
            {
                float s0 = sideArc[k], s1 = sideArc[k + 1];
                if (s1 <= from || s0 >= to || s1 <= s0) continue;

                var c0 = Mathf.Max(from, s0);
                var c1 = Mathf.Min(to, s1);
                if (c1 <= c0) continue;

                var t0 = (c0 - s0) / (s1 - s0);
                var t1 = (c1 - s0) / (s1 - s0);

                var i0 = Vector2.Lerp(sideInner[k], sideInner[k + 1], t0);
                var o0 = Vector2.Lerp(sideOuter[k], sideOuter[k + 1], t0);
                var i1 = Vector2.Lerp(sideInner[k], sideInner[k + 1], t1);
                var o1 = Vector2.Lerp(sideOuter[k], sideOuter[k + 1], t1);

                var u0 = (c0 - from) / length;
                var u1 = (c1 - from) / length;

                var baseIndex = vh.currentVertCount;
                vh.AddVert(i0, color, new Vector2(u0, band.x));
                vh.AddVert(o0, color, new Vector2(u0, band.y));
                vh.AddVert(o1, color, new Vector2(u1, band.y));
                vh.AddVert(i1, color, new Vector2(u1, band.x));
                vh.AddTriangle(baseIndex + 0, baseIndex + 1, baseIndex + 2);
                vh.AddTriangle(baseIndex + 0, baseIndex + 2, baseIndex + 3);
            }
        }

        // Tuple: <Can merge, Repeat, Size, Spacing, Initial Spacing>
        private static (bool, BackgroundRepeat, float, float, float) GetStyleParams(BorderStyle style, float size)
        {
            var absSize = Mathf.Abs(size);

            switch (style)
            {
                case BorderStyle.Dotted:
                    return (false, BackgroundRepeat.Space, absSize, absSize, absSize);
                case BorderStyle.Dashed:
                    return (false, BackgroundRepeat.Round, Mathf.Max(6, absSize * 3f), Mathf.Max(4, absSize * 2f), 0);
                case BorderStyle.Solid:
                case BorderStyle.Double:
                case BorderStyle.Groove:
                case BorderStyle.Ridge:
                case BorderStyle.Outset:
                case BorderStyle.Inset:
                case BorderStyle.None:
                default:
                    return (true, BackgroundRepeat.Stretch, absSize, 0, 0);
            }
        }

        public static void AddNonRoundedOutline(
            ref VertexHelper vh,
            WebOutlineProperties outline,
            Rect rect,
            WebOutlineColors colors,
            WebOutlineStyles styles
        )
        {
            var size = rect.size;
            var center = rect.position;

            var topWidth = outline.Sizes.Top;
            var leftWidth = outline.Sizes.Left;
            var bottomWidth = outline.Sizes.Bottom;
            var rightWidth = outline.Sizes.Right;

            var topOutset = 0;
            var leftOutset = 0;
            var bottomOutset = 0;
            var rightOutset = 0;


            // Positions
            var x0 = center.x - leftOutset - leftWidth;
            var x1 = x0 + leftWidth;
            var x2 = center.x + rightOutset + size.x;
            var x3 = x2 + rightWidth;

            if (x0 > x1) StylingHelpers.Swap(ref x0, ref x1);
            if (x2 > x3) StylingHelpers.Swap(ref x2, ref x3);

            var y0 = center.y + size.y + topOutset + topWidth;
            var y1 = y0 - topWidth;
            var y2 = center.y - bottomOutset;
            var y3 = y2 - bottomWidth;

            if (y0 < y1) StylingHelpers.Swap(ref y0, ref y1);
            if (y2 < y3) StylingHelpers.Swap(ref y2, ref y3);

            var fillWidth = x2 - x1;
            var fillHeight = y1 - y2;


            var topUvs = GetBorderStyleTextureUVs(styles.Top, false);
            var rightUvs = GetBorderStyleTextureUVs(styles.Right, true);
            var bottomUvs = GetBorderStyleTextureUVs(styles.Bottom, true);
            var leftUvs = GetBorderStyleTextureUVs(styles.Left, false);

            var topParams = GetStyleParams(styles.Top, topWidth);
            var rightParams = GetStyleParams(styles.Right, rightWidth);
            var bottomParams = GetStyleParams(styles.Bottom, bottomWidth);
            var leftParams = GetStyleParams(styles.Left, leftWidth);


            // Top
            if (topWidth != 0)
            {
                if (topParams.Item1)
                {
                    var baseIndex = vh.currentVertCount;
                    vh.AddVert(new Vector2(x0, y0), colors.Top, new Vector2(0, topUvs.y));
                    vh.AddVert(new Vector2(x1, y1), colors.Top, new Vector2(0, topUvs.x));
                    vh.AddVert(new Vector2(x2, y1), colors.Top, new Vector2(1, topUvs.x));
                    vh.AddVert(new Vector2(x3, y0), colors.Top, new Vector2(1, topUvs.y));
                    vh.AddTriangle(baseIndex + 0, baseIndex + 2, baseIndex + 1);
                    vh.AddTriangle(baseIndex + 0, baseIndex + 3, baseIndex + 2);
                }
                else
                {
                    var baseIndex = vh.currentVertCount;
                    vh.AddVert(new Vector2(x0, y0), colors.Top, new Vector2(0, topUvs.y));
                    vh.AddVert(new Vector2(x1, y1), colors.Top, new Vector2(1, topUvs.x));
                    vh.AddVert(new Vector2(x1, y0), colors.Top, new Vector2(1, topUvs.y));

                    vh.AddVert(new Vector2(x2, y1), colors.Top, new Vector2(0, topUvs.x));
                    vh.AddVert(new Vector2(x3, y0), colors.Top, new Vector2(1, topUvs.y));
                    vh.AddVert(new Vector2(x2, y0), colors.Top, new Vector2(0, topUvs.y));
                    vh.AddTriangle(baseIndex + 0, baseIndex + 1, baseIndex + 2);
                    vh.AddTriangle(baseIndex + 3, baseIndex + 4, baseIndex + 5);

                    var tileArea = new Vector2(fillWidth - topParams.Item5, Mathf.Abs(topWidth));
                    var tileOffset = new Vector2(x1 + topParams.Item5, y1);
                    var tileSize = new Vector2(topParams.Item3, 1);
                    var tileUv = new Rect(0, topUvs.x, 1, topUvs.y - topUvs.x);
                    var minSpacing = topParams.Item4;

                    ImageUtils.CreateTiledImageMesh(vh, tileSize, Vector2.zero, tileArea, tileOffset,
                        topParams.Item2, BackgroundRepeat.Stretch, colors.Top, tileUv, minSpacing);
                }
            }


            // Right
            if (rightWidth != 0)
            {
                if (rightParams.Item1)
                {
                    var baseIndex = vh.currentVertCount;
                    vh.AddVert(new Vector2(x3, y0), colors.Right, new Vector2(0, rightUvs.y));
                    vh.AddVert(new Vector2(x2, y1), colors.Right, new Vector2(0, rightUvs.x));
                    vh.AddVert(new Vector2(x2, y2), colors.Right, new Vector2(1, rightUvs.x));
                    vh.AddVert(new Vector2(x3, y3), colors.Right, new Vector2(1, rightUvs.y));
                    vh.AddTriangle(baseIndex + 0, baseIndex + 2, baseIndex + 1);
                    vh.AddTriangle(baseIndex + 0, baseIndex + 3, baseIndex + 2);
                }
                else
                {
                    var baseIndex = vh.currentVertCount;
                    vh.AddVert(new Vector2(x3, y0), colors.Right, new Vector2(1, rightUvs.y));
                    vh.AddVert(new Vector2(x2, y1), colors.Right, new Vector2(0, rightUvs.x));
                    vh.AddVert(new Vector2(x3, y1), colors.Right, new Vector2(1, rightUvs.x));

                    vh.AddVert(new Vector2(x3, y3), colors.Right, new Vector2(1, rightUvs.y));
                    vh.AddVert(new Vector2(x2, y2), colors.Right, new Vector2(0, rightUvs.x));
                    vh.AddVert(new Vector2(x3, y2), colors.Right, new Vector2(1, rightUvs.x));
                    vh.AddTriangle(baseIndex + 0, baseIndex + 1, baseIndex + 2);
                    vh.AddTriangle(baseIndex + 3, baseIndex + 4, baseIndex + 5);

                    var tileArea = new Vector2(Mathf.Abs(rightWidth), fillHeight - rightParams.Item5);
                    var tileOffset = new Vector2(x2, y2 + rightParams.Item5);
                    var tileSize = new Vector2(1, rightParams.Item3);
                    var tileUv = new Rect(0, rightUvs.x, 1, rightUvs.y - rightUvs.x);
                    var minSpacing = rightParams.Item4;

                    ImageUtils.CreateTiledImageMesh(vh, tileSize, Vector2.zero, tileArea, tileOffset,
                        BackgroundRepeat.Stretch, rightParams.Item2, colors.Right, tileUv, minSpacing);
                }
            }


            // Bottom
            if (bottomWidth != 0)
            {
                if (bottomParams.Item1)
                {
                    var baseIndex = vh.currentVertCount;
                    vh.AddVert(new Vector2(x0, y3), colors.Bottom, new Vector2(0, bottomUvs.y));
                    vh.AddVert(new Vector2(x1, y2), colors.Bottom, new Vector2(0, bottomUvs.x));
                    vh.AddVert(new Vector2(x2, y2), colors.Bottom, new Vector2(1, bottomUvs.x));
                    vh.AddVert(new Vector2(x3, y3), colors.Bottom, new Vector2(1, bottomUvs.y));
                    vh.AddTriangle(baseIndex + 0, baseIndex + 2, baseIndex + 1);
                    vh.AddTriangle(baseIndex + 0, baseIndex + 3, baseIndex + 2);
                }
                else
                {
                    var baseIndex = vh.currentVertCount;
                    vh.AddVert(new Vector2(x0, y3), colors.Bottom, new Vector2(0, bottomUvs.y));
                    vh.AddVert(new Vector2(x1, y2), colors.Bottom, new Vector2(1, bottomUvs.x));
                    vh.AddVert(new Vector2(x1, y3), colors.Bottom, new Vector2(1, bottomUvs.y));

                    vh.AddVert(new Vector2(x2, y2), colors.Bottom, new Vector2(0, bottomUvs.x));
                    vh.AddVert(new Vector2(x3, y3), colors.Bottom, new Vector2(1, bottomUvs.y));
                    vh.AddVert(new Vector2(x2, y3), colors.Bottom, new Vector2(0, bottomUvs.y));
                    vh.AddTriangle(baseIndex + 0, baseIndex + 1, baseIndex + 2);
                    vh.AddTriangle(baseIndex + 3, baseIndex + 4, baseIndex + 5);

                    var tileArea = new Vector2(fillWidth - bottomParams.Item5, Mathf.Abs(bottomWidth));
                    var tileOffset = new Vector2(x1 + bottomParams.Item5, y3);
                    var tileSize = new Vector2(bottomParams.Item3, 1);
                    var tileUv = new Rect(0, bottomUvs.x, 1, bottomUvs.y - bottomUvs.x);
                    var minSpacing = bottomParams.Item4;

                    ImageUtils.CreateTiledImageMesh(vh, tileSize, Vector2.zero, tileArea, tileOffset,
                        bottomParams.Item2, BackgroundRepeat.Stretch, colors.Bottom, tileUv, minSpacing);
                }
            }


            // Left
            if (leftWidth != 0)
            {
                if (leftParams.Item1)
                {
                    var baseIndex = vh.currentVertCount;
                    vh.AddVert(new Vector2(x0, y0), colors.Left, new Vector2(0, leftUvs.y));
                    vh.AddVert(new Vector2(x1, y1), colors.Left, new Vector2(0, leftUvs.x));
                    vh.AddVert(new Vector2(x1, y2), colors.Left, new Vector2(1, leftUvs.x));
                    vh.AddVert(new Vector2(x0, y3), colors.Left, new Vector2(1, leftUvs.y));
                    vh.AddTriangle(baseIndex + 0, baseIndex + 2, baseIndex + 1);
                    vh.AddTriangle(baseIndex + 0, baseIndex + 3, baseIndex + 2);
                }
                else
                {
                    var baseIndex = vh.currentVertCount;
                    vh.AddVert(new Vector2(x0, y0), colors.Left, new Vector2(1, leftUvs.y));
                    vh.AddVert(new Vector2(x1, y1), colors.Left, new Vector2(0, leftUvs.x));
                    vh.AddVert(new Vector2(x0, y1), colors.Left, new Vector2(1, leftUvs.x));

                    vh.AddVert(new Vector2(x0, y3), colors.Left, new Vector2(1, leftUvs.y));
                    vh.AddVert(new Vector2(x1, y2), colors.Left, new Vector2(0, leftUvs.x));
                    vh.AddVert(new Vector2(x0, y2), colors.Left, new Vector2(1, leftUvs.x));
                    vh.AddTriangle(baseIndex + 0, baseIndex + 1, baseIndex + 2);
                    vh.AddTriangle(baseIndex + 3, baseIndex + 4, baseIndex + 5);

                    var tileArea = new Vector2(Mathf.Abs(leftWidth), fillHeight - leftParams.Item5);
                    var tileOffset = new Vector2(x0, y2 + leftParams.Item5);
                    var tileSize = new Vector2(1, leftParams.Item3);
                    var tileUv = new Rect(0, leftUvs.x, 1, leftUvs.y - leftUvs.x);
                    var minSpacing = leftParams.Item4;

                    ImageUtils.CreateTiledImageMesh(vh, tileSize, Vector2.zero, tileArea, tileOffset,
                        BackgroundRepeat.Stretch, leftParams.Item2, colors.Left, tileUv, minSpacing);
                }
            }
        }
    }
}
