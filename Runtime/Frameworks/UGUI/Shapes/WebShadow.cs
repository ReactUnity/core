using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Shapes
{
    [RequireComponent(typeof(CanvasRenderer))]
    public class WebShadow : MaskableGraphic
    {
        [SerializeField]
        private WebRoundingProperties rounding = new WebRoundingProperties()
        {
            UniformResolution = new WebRoundingResolutionProperties(10),
        };

        public WebRoundingProperties Rounding
        {
            get => rounding;
            set
            {
                rounding = value;
                SetVerticesDirty();
            }
        }

        [SerializeField]
        private WebShadowProperties shadow = new WebShadowProperties();

        public WebShadowProperties Shadow
        {
            get => shadow;
            set
            {
                shadow = value;
                maskable = shadow.Inset;
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
            maskable = false;
            SetVerticesDirty();
        }


        protected override void OnPopulateMesh(VertexHelper vh)
        {
            vh.Clear();
            Rect pixelRect = RectTransformUtility.PixelAdjustRect(rectTransform, canvas);

            var width = pixelRect.width;
            var height = pixelRect.height;

            var center = pixelRect.center;
            center = center + shadow.Offset;

            var size = new Vector2(width, height);

            Rounding.UpdateAdjusted(size, size);
            RoundedCornerUnitPositionData.SetCornerUnitPositions(Rounding, ref unitPositionData);

            if (shadow.Inset)
            {
                AddInsetShadowRect(
                    ref vh,
                    center,
                    width,
                    height,
                    Rounding,
                    color,
                    GeoUtils.ZeroV2,
                    ref unitPositionData,
                    Shadow
                );
            }
            else
            {
                AddShadowRect(
                    ref vh,
                    center,
                    width,
                    height,
                    Rounding,
                    color,
                    GeoUtils.ZeroV2,
                    ref unitPositionData,
                    Shadow
                );
            }
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

        public static void AddShadowRect(
            ref VertexHelper vh,
            Vector2 center,
            float width,
            float height,
            WebRoundingProperties rounding,
            Color32 color,
            Vector2 uv,
            ref RoundedCornerUnitPositionData cornerUnitPositions,
            WebShadowProperties shadow
        )
        {
            width = Mathf.Max(0, width + shadow.Spread * 2);
            height = Mathf.Max(0, height + shadow.Spread * 2);

            var rect = new Rect(0, 0, width, height);
            var bl2 = shadow.Blur * 2;

            var hardWidth = Mathf.Max(0, width - bl2);
            var hardHeight = Mathf.Max(0, height - bl2);
            var softWidth = Mathf.Max(0, width + bl2);
            var softHeight = Mathf.Max(0, height + bl2);

            var tl = new Vector2(
                Mathf.Max(shadow.Blur, rounding.AdjustedTLRadius.x),
                Mathf.Max(shadow.Blur, rounding.AdjustedTLRadius.y)
            );

            var tr = new Vector2(
                Mathf.Max(shadow.Blur, rounding.AdjustedTRRadius.x),
                Mathf.Max(shadow.Blur, rounding.AdjustedTRRadius.y)
            );

            var br = new Vector2(
                Mathf.Max(shadow.Blur, rounding.AdjustedBRRadius.x),
                Mathf.Max(shadow.Blur, rounding.AdjustedBRRadius.y)
            );

            var bl = new Vector2(
                Mathf.Max(shadow.Blur, rounding.AdjustedBLRadius.x),
                Mathf.Max(shadow.Blur, rounding.AdjustedBLRadius.y)
            );

            var oldRounding = rounding;
            rounding = new WebRoundingProperties(new Vector4(tl.x, tr.x, br.x, bl.x), new Vector4(tl.y, tr.y, br.y, bl.y))
            {
                UniformResolution = rounding.UniformResolution,
            };
            rounding.UpdateAdjusted(rect.size, rect.size, null, oldRounding);
            RoundedCornerUnitPositionData.SetCornerUnitPositions(rounding, ref cornerUnitPositions);


            tmpUV.x = 0.5f;
            tmpUV.y = 0.5f;
            vh.AddVert(center, color, tmpUV, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);
            var addIndicesToCenter = true;


            var hardRounding = rounding.OffsetBorder(rect, Vector4.one * -shadow.Blur);
            var hardRect = new Vector2(hardWidth, hardHeight);
            hardRounding.UpdateAdjusted(hardRect, hardRect, null, oldRounding);
            RoundedCornerUnitPositionData.SetCornerUnitPositions(hardRounding, ref cornerUnitPositions);

            var ringAdded = false;
            var numVertices = vh.currentVertCount;

            AddRoundedRectVerticesRing(
                ref vh,
                center,
                hardWidth,
                hardHeight,
                hardWidth,
                hardHeight,
                hardRounding.AdjustedTLRadius,
                hardRounding.AdjustedTLRadius,
                hardRounding.AdjustedTRRadius,
                hardRounding.AdjustedTRRadius,
                hardRounding.AdjustedBRRadius,
                hardRounding.AdjustedBRRadius,
                hardRounding.AdjustedBLRadius,
                hardRounding.AdjustedBLRadius,
                cornerUnitPositions,
                color,
                color,
                color,
                color,
                Vector2.one,
                ringAdded
            );


            if (addIndicesToCenter)
            {
                // add triangles to the center
                var numNewVertices = vh.currentVertCount - numVertices;
                for (int i = 0, j = numNewVertices - 1; i < numNewVertices; j = i++)
                {
                    vh.AddTriangle(numVertices - 1, numVertices + i, numVertices + j);
                }
            }


            var fadedColor = new Color32(color.r, color.g, color.b, 0);

            var softRounding = rounding.OffsetBorder(rect, Vector4.one * shadow.Blur);
            var softRect = new Vector2(softWidth, softHeight);
            softRounding.UpdateAdjusted(softRect, softRect, null, oldRounding);
            RoundedCornerUnitPositionData.SetCornerUnitPositions(softRounding, ref cornerUnitPositions);

            AddRoundedRectVerticesRing(
                ref vh,
                center,
                softWidth,
                softHeight,
                softWidth,
                softHeight,
                softRounding.AdjustedTLRadius,
                softRounding.AdjustedTLRadius,
                softRounding.AdjustedTRRadius,
                softRounding.AdjustedTRRadius,
                softRounding.AdjustedBRRadius,
                softRounding.AdjustedBRRadius,
                softRounding.AdjustedBLRadius,
                softRounding.AdjustedBLRadius,
                cornerUnitPositions,
                fadedColor,
                fadedColor,
                fadedColor,
                fadedColor,
                Vector2.zero,
                true
            );
        }

        public static void AddInsetShadowRect(
            ref VertexHelper vh,
            Vector2 center,
            float width,
            float height,
            WebRoundingProperties rounding,
            Color32 color,
            Vector2 uv,
            ref RoundedCornerUnitPositionData cornerUnitPositions,
            WebShadowProperties shadow
        )
        {
            width = Mathf.Max(0, width - shadow.Spread * 2);
            height = Mathf.Max(0, height - shadow.Spread * 2);

            var rect = new Rect(0, 0, width, height);
            var bl2 = shadow.Blur * 2;

            var tl = new Vector2(
                Mathf.Max(shadow.Blur, rounding.AdjustedTLRadius.x),
                Mathf.Max(shadow.Blur, rounding.AdjustedTLRadius.y)
            );

            var tr = new Vector2(
                Mathf.Max(shadow.Blur, rounding.AdjustedTRRadius.x),
                Mathf.Max(shadow.Blur, rounding.AdjustedTRRadius.y)
            );

            var br = new Vector2(
                Mathf.Max(shadow.Blur, rounding.AdjustedBRRadius.x),
                Mathf.Max(shadow.Blur, rounding.AdjustedBRRadius.y)
            );

            var bl = new Vector2(
                Mathf.Max(shadow.Blur, rounding.AdjustedBLRadius.x),
                Mathf.Max(shadow.Blur, rounding.AdjustedBLRadius.y)
            );

            var oldRounding = rounding;
            rounding = new WebRoundingProperties(new Vector4(tl.x, tr.x, br.x, bl.x), new Vector4(tl.y, tr.y, br.y, bl.y))
            {
                UniformResolution = rounding.UniformResolution,
            };
            rounding.UpdateAdjusted(rect.size, rect.size, null, oldRounding);
            RoundedCornerUnitPositionData.SetCornerUnitPositions(rounding, ref cornerUnitPositions);

            var ringAdded = false;

            var hardWidth = Mathf.Max(0, width + bl2);
            var hardHeight = Mathf.Max(0, height + bl2);
            var softWidth = Mathf.Max(0, width - bl2);
            var softHeight = Mathf.Max(0, height - bl2);

            if (shadow.Offset.sqrMagnitude > 0 || shadow.Spread > 0)
            {
                ringAdded = true;
                var ringWidth = hardWidth + Mathf.Abs(shadow.Offset.x) * 2 + Mathf.Max(0, shadow.Spread) * 2;
                var ringHeight = hardHeight + Mathf.Abs(shadow.Offset.y) * 2 + Mathf.Max(0, shadow.Spread) * 2;

                AddRoundedRectVerticesRing(
                    ref vh,
                    center,
                    ringWidth,
                    ringHeight,
                    ringWidth,
                    ringHeight,
                    tl,
                    tl,
                    tr,
                    tr,
                    br,
                    br,
                    bl,
                    bl,
                    cornerUnitPositions,
                    color,
                    color,
                    color,
                    color,
                    Vector2.one,
                    false
                );

            }

            tmpUV.x = 0.5f;
            tmpUV.y = 0.5f;

            var hardRounding = rounding.OffsetBorder(rect, Vector4.zero);
            var hardRect = new Vector2(hardWidth, hardHeight);
            hardRounding.UpdateAdjusted(hardRect, hardRect, null, oldRounding);
            RoundedCornerUnitPositionData.SetCornerUnitPositions(hardRounding, ref cornerUnitPositions);

            AddRoundedRectVerticesRing(
                ref vh,
                center,
                hardWidth,
                hardHeight,
                hardWidth,
                hardHeight,
                hardRounding.AdjustedTLRadius,
                hardRounding.AdjustedTLRadius,
                hardRounding.AdjustedTRRadius,
                hardRounding.AdjustedTRRadius,
                hardRounding.AdjustedBRRadius,
                hardRounding.AdjustedBRRadius,
                hardRounding.AdjustedBLRadius,
                hardRounding.AdjustedBLRadius,
                cornerUnitPositions,
                color,
                color,
                color,
                color,
                Vector2.one,
                ringAdded
            );

            var fadedColor = new Color32(color.r, color.g, color.b, 0);


            var softRounding = rounding.OffsetBorder(rect, Vector4.zero);
            var softRect = new Vector2(softWidth, softHeight);
            softRounding.UpdateAdjusted(softRect, softRect, null, oldRounding);
            RoundedCornerUnitPositionData.SetCornerUnitPositions(softRounding, ref cornerUnitPositions);

            AddRoundedRectVerticesRing(
                ref vh,
                center,
                softWidth,
                softHeight,
                softWidth,
                softHeight,
                softRounding.AdjustedTLRadius,
                softRounding.AdjustedTLRadius,
                softRounding.AdjustedTRRadius,
                softRounding.AdjustedTRRadius,
                softRounding.AdjustedBRRadius,
                softRounding.AdjustedBRRadius,
                softRounding.AdjustedBLRadius,
                softRounding.AdjustedBLRadius,
                cornerUnitPositions,
                fadedColor,
                fadedColor,
                fadedColor,
                fadedColor,
                Vector2.zero,
                true
            );
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
            tmpV3.x = xMax - trRadius.x;
            tmpV3.y = yMax - trRadius.y;
            tmpPos.x = tmpV3.x + cornerUnitPositions.TRUnitPositions[0].x * trOuterRadius.x;
            tmpPos.y = tmpV3.y + cornerUnitPositions.TRUnitPositions[0].y * trOuterRadius.y;
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
