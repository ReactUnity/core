using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Shapes
{
    internal static class BorderUtils
    {
        static Vector3 tmpPos = Vector3.zero;
        static Vector2 tmpUVPos = Vector2.zero;

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

        private static (bool, BackgroundRepeat, float, float, float) GetStyleParams(BorderStyle style, float size)
        {
            // Can merge, Repeat, Size, Spacing, Initial Spacing
            switch (style)
            {
                case BorderStyle.Dotted:
                    return (false, BackgroundRepeat.Space, size, size, size);
                case BorderStyle.Dashed:
                    return (false, BackgroundRepeat.Round, Mathf.Max(6, size * 3f), Mathf.Max(4, size * 2f), 0);
                case BorderStyle.Solid:
                case BorderStyle.Double:
                case BorderStyle.Groove:
                case BorderStyle.Ridge:
                case BorderStyle.Outset:
                case BorderStyle.Inset:
                case BorderStyle.None:
                default:
                    return (true, BackgroundRepeat.Stretch, size, 0, 0);
            }
        }

        public static void AddNonRoundedOutline(
            ref VertexHelper vh,
            WebOutlineProperties outline,
            Rect rect,
            WebOutlineColors colors,
            WebOutlineStyles styles,
            Vector2 uv
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

            var y0 = center.y + size.y + topOutset + topWidth;
            var y1 = y0 - topWidth;
            var y2 = center.y - bottomOutset;
            var y3 = y2 - bottomWidth;

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
            if (topWidth > 0)
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

                    var tileArea = new Vector2(fillWidth - topParams.Item5, topWidth);
                    var tileOffset = new Vector2(x1 + topParams.Item5, y1);
                    var tileSize = new Vector2(topParams.Item3, 1);
                    var tileUv = new Rect(0, topUvs.x, 1, topUvs.y - topUvs.x);
                    var minSpacing = topParams.Item4;

                    ImageUtils.CreateTiledImageMesh(vh, tileSize, Vector2.zero, tileArea, tileOffset,
                        topParams.Item2, BackgroundRepeat.Stretch, colors.Top, tileUv, minSpacing);
                }
            }


            // Right
            if (rightWidth > 0)
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

                    var tileArea = new Vector2(rightWidth, fillHeight - rightParams.Item5);
                    var tileOffset = new Vector2(x2, y2 + rightParams.Item5);
                    var tileSize = new Vector2(1, rightParams.Item3);
                    var tileUv = new Rect(0, rightUvs.x, 1, rightUvs.y - rightUvs.x);
                    var minSpacing = rightParams.Item4;

                    ImageUtils.CreateTiledImageMesh(vh, tileSize, Vector2.zero, tileArea, tileOffset,
                        BackgroundRepeat.Stretch, rightParams.Item2, colors.Right, tileUv, minSpacing);
                }
            }


            // Bottom
            if (bottomWidth > 0)
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

                    var tileArea = new Vector2(fillWidth - bottomParams.Item5, bottomWidth);
                    var tileOffset = new Vector2(x1 + bottomParams.Item5, y3);
                    var tileSize = new Vector2(bottomParams.Item3, 1);
                    var tileUv = new Rect(0, bottomUvs.x, 1, bottomUvs.y - bottomUvs.x);
                    var minSpacing = bottomParams.Item4;

                    ImageUtils.CreateTiledImageMesh(vh, tileSize, Vector2.zero, tileArea, tileOffset,
                        bottomParams.Item2, BackgroundRepeat.Stretch, colors.Bottom, tileUv, minSpacing);
                }
            }


            // Left
            if (leftWidth > 0)
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

                    var tileArea = new Vector2(leftWidth, fillHeight - leftParams.Item5);
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
