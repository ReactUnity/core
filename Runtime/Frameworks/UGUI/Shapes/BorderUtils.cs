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
                case BorderStyle.Solid:
                    return new Vector2(34f / 64f, 38f / 64f);
                case BorderStyle.Dotted:
                    return new Vector2(0, 0.5f);
                case BorderStyle.Dashed:
                    return new Vector2(46f / 64f, 50f / 64f);
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



        public static void AddNonRoundedOutline(
            ref VertexHelper vh,
            WebOutlineProperties outline,
            Vector2 center,
            float width,
            float height,
            WebOutlineColors colors,
            WebOutlineStyles styles,
            Vector2 uv
        )
        {
            float fullWidth = width + outline.Sizes.Left + outline.Sizes.Right;
            float fullHeight = height + outline.Sizes.Top + outline.Sizes.Bottom;

            AddNonRoundedOutlineRing(
                ref vh,
                center,
                width,
                height,
                outline.Sizes,
                colors,
                styles,
                fullWidth,
                fullHeight,
                false,
                true
            );

            var outCenter = new Vector2(
                center.x + (outline.Sizes.Right - outline.Sizes.Left) / 2,
                center.y + (outline.Sizes.Top - outline.Sizes.Bottom) / 2
            );

            AddNonRoundedOutlineRing(
                ref vh,
                outCenter,
                fullWidth,
                fullHeight,
                outline.Sizes,
                colors,
                styles,
                fullWidth,
                fullHeight,
                true,
                false
            );
        }

        private static void AddNonRoundedOutlineRing(
            ref VertexHelper vh,
            Vector2 center,
            float width,
            float height,
            WebOutlineSizes sizes,
            WebOutlineColors colors,
            WebOutlineStyles styles,
            float totalWidth,
            float totalHeight,
            bool addRingIndices,
            bool isInner
        )
        {
            Debug.Assert(totalWidth > 0 && totalHeight > 0);

            var topUvs = GetBorderStyleTextureUVs(styles.Top, false);
            var rightUvs = GetBorderStyleTextureUVs(styles.Right, true);
            var bottomUvs = GetBorderStyleTextureUVs(styles.Bottom, true);
            var leftUvs = GetBorderStyleTextureUVs(styles.Left, false);


            // Left-Top
            tmpPos.x = center.x - width * 0.5f;
            tmpPos.y = center.y + height * 0.5f;
            tmpUVPos.x = totalHeight / sizes.Left / 4;
            tmpUVPos.y = isInner ? leftUvs.x : leftUvs.y;
            vh.AddVert(tmpPos, colors.Left, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);


            // Top 
            tmpUVPos.x = 0;
            tmpUVPos.y = isInner ? topUvs.x : topUvs.y;
            vh.AddVert(tmpPos, colors.Top, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);

            tmpPos.x += width;
            tmpUVPos.x = totalWidth / sizes.Top / 4;
            vh.AddVert(tmpPos, colors.Top, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);


            // Right
            tmpUVPos.x = 0;
            tmpUVPos.y = isInner ? rightUvs.x : rightUvs.y;
            vh.AddVert(tmpPos, colors.Right, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);

            tmpPos.y -= height;
            tmpUVPos.x = totalHeight / sizes.Right / 4;
            vh.AddVert(tmpPos, colors.Right, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);


            // Bottom
            tmpUVPos.x = 0;
            tmpUVPos.y = isInner ? bottomUvs.x : bottomUvs.y;
            vh.AddVert(tmpPos, colors.Bottom, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);

            tmpPos.x -= width;
            tmpUVPos.x = totalWidth / sizes.Bottom / 4;
            vh.AddVert(tmpPos, colors.Bottom, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);


            // Left-Bottom
            tmpUVPos.x = 0;
            tmpUVPos.y = isInner ? leftUvs.x : leftUvs.y;
            vh.AddVert(tmpPos, colors.Left, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);


            if (addRingIndices)
            {
                int baseIndex = vh.currentVertCount - 16;

                vh.AddTriangle(baseIndex + 1, baseIndex + 9, baseIndex + 10);
                vh.AddTriangle(baseIndex + 1, baseIndex + 10, baseIndex + 2);

                vh.AddTriangle(baseIndex + 3, baseIndex + 11, baseIndex + 12);
                vh.AddTriangle(baseIndex + 3, baseIndex + 12, baseIndex + 4);

                vh.AddTriangle(baseIndex + 5, baseIndex + 13, baseIndex + 14);
                vh.AddTriangle(baseIndex + 5, baseIndex + 14, baseIndex + 6);

                vh.AddTriangle(baseIndex + 7, baseIndex + 15, baseIndex + 8);
                vh.AddTriangle(baseIndex + 7, baseIndex + 8, baseIndex);
            }
        }


    }
}
