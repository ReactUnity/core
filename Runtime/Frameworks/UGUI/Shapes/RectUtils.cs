using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Shapes
{
    public static class RectUtils
    {
        static Vector3 tmpPos = Vector3.zero;
        static Vector2 tmpUVPos = Vector2.zero;

        public static void AddRect(
            ref VertexHelper vh,
            Vector2 center,
            float width,
            float height,
            Color32 color,
            Vector2 uv
        )
        {
            AddRectVertRing(
                ref vh,
                center,
                width,
                height,
                color,
                width,
                height
            );

            AddRectQuadIndices(ref vh);
        }

        public static void AddRectVertRing(
            ref VertexHelper vh,
            Vector2 center,
            float width,
            float height,
            Color32 color,
            float totalWidth,
            float totalHeight,
            bool addRingIndices = false
        )
        {
            float uvXInset = 0.5f - width / totalWidth * 0.5f;
            float uvYInset = 0.5f - height / totalHeight * 0.5f;

            // TL
            tmpPos.x = center.x - width * 0.5f;
            tmpPos.y = center.y + height * 0.5f;
            tmpUVPos.x = uvXInset;
            tmpUVPos.y = 1.0f - uvYInset;
            vh.AddVert(tmpPos, color, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);

            // TR
            tmpPos.x += width;
            tmpUVPos.x = 1.0f - uvXInset;
            vh.AddVert(tmpPos, color, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);

            // BR
            tmpPos.y -= height;
            tmpUVPos.y = uvYInset;
            vh.AddVert(tmpPos, color, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);

            // BL
            tmpPos.x -= width;
            tmpUVPos.x = uvXInset;
            vh.AddVert(tmpPos, color, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);

            if (addRingIndices)
            {
                int baseIndex = vh.currentVertCount - 8;

                vh.AddTriangle(baseIndex + 4, baseIndex + 5, baseIndex);
                vh.AddTriangle(baseIndex, baseIndex + 5, baseIndex + 1);

                vh.AddTriangle(baseIndex + 1, baseIndex + 5, baseIndex + 6);
                vh.AddTriangle(baseIndex + 1, baseIndex + 6, baseIndex + 2);

                vh.AddTriangle(baseIndex + 2, baseIndex + 6, baseIndex + 7);
                vh.AddTriangle(baseIndex + 7, baseIndex + 3, baseIndex + 2);

                vh.AddTriangle(baseIndex + 4, baseIndex + 3, baseIndex + 7);
                vh.AddTriangle(baseIndex + 4, baseIndex, baseIndex + 3);
            }
        }
        public static void AddRectQuadIndices(
            ref VertexHelper vh
        )
        {
            int baseIndex = vh.currentVertCount - 4;

            vh.AddTriangle(baseIndex, baseIndex + 1, baseIndex + 3);
            vh.AddTriangle(baseIndex + 3, baseIndex + 1, baseIndex + 2);
        }

        public static void AddRoundedRingIndices(
            ref VertexHelper vh,
            RoundedCornerUnitPositionData cornerUnitPositions
        )
        {
            int totalResolution =
                cornerUnitPositions.TLUnitPositions.Length +
                cornerUnitPositions.TRUnitPositions.Length +
                cornerUnitPositions.BRUnitPositions.Length +
                cornerUnitPositions.BLUnitPositions.Length;

            int numNewVertices = totalResolution + 1;

            int innerStartIndex = vh.currentVertCount - numNewVertices - numNewVertices - 1;
            int outerStartIndex = vh.currentVertCount - numNewVertices;

            for (int i = 0; i < totalResolution; i++)
            {
                vh.AddTriangle(innerStartIndex + i + 1, outerStartIndex + i, outerStartIndex + i + 1);
                vh.AddTriangle(innerStartIndex + i + 1, outerStartIndex + i + 1, innerStartIndex + i + 2);
            }

            vh.AddTriangle(innerStartIndex + 1, outerStartIndex + totalResolution, outerStartIndex);
            vh.AddTriangle(innerStartIndex + 1, outerStartIndex - 1, outerStartIndex + totalResolution);
        }
    }
}
