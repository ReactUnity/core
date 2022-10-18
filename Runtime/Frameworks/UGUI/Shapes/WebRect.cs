using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Shapes
{
    [RequireComponent(typeof(CanvasRenderer))]
    public class WebRect : MaskableGraphic
    {
        [SerializeField]
        private WebRoundingProperties rounding = new WebRoundingProperties();

        public WebRoundingProperties Rounding
        {
            get => rounding;
            set
            {
                rounding = value;
                SetVerticesDirty();
            }
        }

        public override Color color
        {
            get => base.color;
            set
            {
                base.color = value;
                SetVerticesDirty();
            }
        }

        RoundedCornerUnitPositionData unitPositionData;

        protected override void OnEnable()
        {
            base.OnEnable();
            SetVerticesDirty();
        }


        protected override void OnPopulateMesh(VertexHelper vh)
        {
            vh.Clear();
            Rect pixelRect = RectTransformUtility.PixelAdjustRect(rectTransform, canvas);

            Rounding.UpdateAdjusted(pixelRect.size, pixelRect.size);

            AddRoundedRect(
                ref vh,
                pixelRect.center,
                pixelRect.width,
                pixelRect.height,
                Rounding,
                color,
                GeoUtils.ZeroV2,
                ref unitPositionData
            );
        }

        protected override void OnRectTransformDimensionsChange()
        {
            base.OnRectTransformDimensionsChange();
            RefreshSize();
        }

#if UNITY_EDITOR
        protected override void OnValidate()
        {
            base.OnValidate();
            Rounding?.OnCheck();
            RefreshSize();
        }
#endif

        protected virtual void RefreshSize()
        {
            SetVerticesDirty();
        }

        static Vector3 tmpV3 = Vector3.zero;
        static Vector3 tmpPos = Vector3.zero;
        static Vector2 tmpUV = Vector2.zero;

        public static void AddRoundedRect(
            ref VertexHelper vh,
            Vector2 center,
            float width,
            float height,
            WebRoundingProperties roundedProperties,
            Color32 color,
            Vector2 uv,
            ref RoundedCornerUnitPositionData cornerUnitPositions
        )
        {
            if (roundedProperties.Type == WebRoundingProperties.RoundedType.None)
            {
                RectUtils.AddRect(
                    ref vh,
                    center,
                    width,
                    height,
                    color,
                    uv
                );

                return;
            }


            RoundedCornerUnitPositionData.SetCornerUnitPositions(
                roundedProperties,
                ref cornerUnitPositions
            );

            int numVertices = vh.currentVertCount;

            tmpUV.x = 0.5f;
            tmpUV.y = 0.5f;

            vh.AddVert(center, color, tmpUV, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);

            AddRoundedRectVerticesRing(
                ref vh,
                center,
                width,
                height,
                width,
                height,
                roundedProperties.AdjustedTLRadius,
                roundedProperties.AdjustedTLRadius,
                roundedProperties.AdjustedTRRadius,
                roundedProperties.AdjustedTRRadius,
                roundedProperties.AdjustedBRRadius,
                roundedProperties.AdjustedBRRadius,
                roundedProperties.AdjustedBLRadius,
                roundedProperties.AdjustedBLRadius,
                cornerUnitPositions,
                color,
                color,
                color,
                color,
                uv,
                false
            );


            // set indices
            int numNewVertices = vh.currentVertCount - numVertices;
            for (int i = 0; i < numNewVertices - 1; i++)
            {
                vh.AddTriangle(numVertices, numVertices + i, numVertices + i + 1);
            }

            // set last triangle
            vh.AddTriangle(numVertices, vh.currentVertCount - 1, numVertices + 1);
        }


        internal static void AddRoundedRectVerticesRing(
            ref VertexHelper vh,
            Vector2 center,
            float width,
            float height,
            float fullWidth,
            float fullHeight,
            Vector2 tlRadius,
            Vector2 tlOuterRadius,
            Vector2 trRadius,
            Vector2 trOuterRadius,
            Vector2 brRadius,
            Vector2 brOuterRadius,
            Vector2 blRadius,
            Vector2 blOuterRadius,
            RoundedCornerUnitPositionData cornerUnitPositions,
            Color32 topColor,
            Color32 rightColor,
            Color32 bottomColor,
            Color32 leftColor,
            Vector2 uv,
            bool addIndices
        )
        {
            float xMin = center.x - width * 0.5f;
            float yMin = center.y - height * 0.5f;

            float xMax = center.x + width * 0.5f;
            float yMax = center.y + height * 0.5f;

            float xMinUV = center.x - fullWidth * 0.5f;
            float yMinUV = center.y - fullHeight * 0.5f;

            // TR
            tmpV3.x = xMax - trRadius.x;
            tmpV3.y = yMax - trRadius.y;

            if (trOuterRadius.x < 0.0f) tmpV3.x += trOuterRadius.x;
            if (trOuterRadius.y < 0.0f) tmpV3.y += trOuterRadius.y;
            trOuterRadius = new Vector2(Mathf.Max(0, trOuterRadius.x), Mathf.Max(0, trOuterRadius.y));


            float len = cornerUnitPositions.TRUnitPositions.Length;
            var hl = len / 2;

            for (int i = 0; i < len; i++)
            {
                tmpPos.x = tmpV3.x + cornerUnitPositions.TRUnitPositions[i].x * trOuterRadius.x;
                tmpPos.y = tmpV3.y + cornerUnitPositions.TRUnitPositions[i].y * trOuterRadius.y;
                tmpPos.z = tmpV3.z;

                tmpUV.x = (tmpPos.x - xMinUV) / fullWidth;
                tmpUV.y = (tmpPos.y - yMinUV) / fullHeight;

                vh.AddVert(tmpPos, i > hl ? rightColor : topColor, tmpUV, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);
            }

            // BR
            tmpV3.x = xMax - brRadius.x;
            tmpV3.y = yMin + brRadius.y;

            if (brOuterRadius.x < 0.0f) tmpV3.x += brOuterRadius.x;
            if (brOuterRadius.y < 0.0f) tmpV3.y -= brOuterRadius.y;
            brOuterRadius = new Vector2(Mathf.Max(0, brOuterRadius.x), Mathf.Max(0, brOuterRadius.y));


            len = cornerUnitPositions.BRUnitPositions.Length;
            hl = len / 2;

            for (int i = 0; i < len; i++)
            {
                tmpPos.x = tmpV3.x + cornerUnitPositions.BRUnitPositions[i].x * brOuterRadius.x;
                tmpPos.y = tmpV3.y + cornerUnitPositions.BRUnitPositions[i].y * brOuterRadius.y;
                tmpPos.z = tmpV3.z;

                tmpUV.x = (tmpPos.x - xMinUV) / fullWidth;
                tmpUV.y = (tmpPos.y - yMinUV) / fullHeight;

                vh.AddVert(tmpPos, i > hl ? bottomColor : rightColor, tmpUV, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);
            }


            // BL
            tmpV3.x = xMin + blRadius.x;
            tmpV3.y = yMin + blRadius.y;

            if (blOuterRadius.x < 0.0f) tmpV3.x -= blOuterRadius.x;
            if (blOuterRadius.y < 0.0f) tmpV3.y -= blOuterRadius.y;
            blOuterRadius = new Vector2(Mathf.Max(0, blOuterRadius.x), Mathf.Max(0, blOuterRadius.y));


            len = cornerUnitPositions.BLUnitPositions.Length;
            hl = len / 2;

            for (int i = 0; i < len; i++)
            {
                tmpPos.x = tmpV3.x + cornerUnitPositions.BLUnitPositions[i].x * blOuterRadius.x;
                tmpPos.y = tmpV3.y + cornerUnitPositions.BLUnitPositions[i].y * blOuterRadius.y;
                tmpPos.z = tmpV3.z;

                tmpUV.x = (tmpPos.x - xMinUV) / fullWidth;
                tmpUV.y = (tmpPos.y - yMinUV) / fullHeight;

                vh.AddVert(tmpPos, i > hl ? leftColor : bottomColor, tmpUV, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);
            }


            // TL
            tmpV3.x = xMin + tlRadius.x;
            tmpV3.y = yMax - tlRadius.y;

            if (tlOuterRadius.x < 0.0f) tmpV3.x -= tlOuterRadius.x;
            if (tlOuterRadius.y < 0.0f) tmpV3.y += tlOuterRadius.y;
            tlOuterRadius = new Vector2(Mathf.Max(0, tlOuterRadius.x), Mathf.Max(0, tlOuterRadius.y));


            len = cornerUnitPositions.TLUnitPositions.Length;
            hl = len / 2;

            for (int i = 0; i < len; i++)
            {
                tmpPos.x = tmpV3.x + cornerUnitPositions.TLUnitPositions[i].x * tlOuterRadius.x;
                tmpPos.y = tmpV3.y + cornerUnitPositions.TLUnitPositions[i].y * tlOuterRadius.y;
                tmpPos.z = tmpV3.z;

                tmpUV.x = (tmpPos.x - xMinUV) / fullWidth;
                tmpUV.y = (tmpPos.y - yMinUV) / fullHeight;

                vh.AddVert(tmpPos, i > hl ? topColor : leftColor, tmpUV, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);
            }


            // add last circle vertex
            tmpPos.x = tmpV3.x + cornerUnitPositions.TRUnitPositions[0].x * tlOuterRadius.x;
            tmpPos.y = tmpV3.y + cornerUnitPositions.TRUnitPositions[0].y * tlOuterRadius.y;
            tmpPos.z = tmpV3.z;

            tmpUV.x = (tmpPos.x - xMinUV) / fullWidth;
            tmpUV.y = (tmpPos.y - yMinUV) / fullHeight;

            vh.AddVert(tmpPos, topColor, tmpUV, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);


            if (addIndices)
            {
                RectUtils.AddRoundedRingIndices(
                    ref vh,
                    cornerUnitPositions
                );
            }
        }

    }
}
