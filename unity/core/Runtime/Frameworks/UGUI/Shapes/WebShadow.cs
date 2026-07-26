using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Shapes
{
#if (NET_STANDARD_2_0 && !NET_STANDARD_2_1) || (NET_4_6 && !UNITY_2021_2_OR_NEWER)
    using HashCode = ReactUnity.Helpers.HashCode;
#else
    using HashCode = System.HashCode;
#endif

    [RequireComponent(typeof(CanvasRenderer))]
    public class WebShadow : MaskableGraphic
    {
        #region Material Stuff

        private struct ShaderProps
        {
            public Material BaseMaterial;
            public bool Inset;
            public int StencilId;

            public override bool Equals(object obj)
            {
                return obj is ShaderProps props &&
                       EqualityComparer<Material>.Default.Equals(BaseMaterial, props.BaseMaterial) &&
                       Inset == props.Inset &&
                       StencilId == props.StencilId;
            }

            public override int GetHashCode()
            {
                return HashCode.Combine(BaseMaterial, Inset, StencilId);
            }

            public void SetToMaterial(Material mat)
            {
                if (Inset)
                {
                    mat.SetInt("_StencilComp", (int) CompareFunction.Equal);
                }
                else if (StencilId < 0)
                {
                    mat.SetInt("_StencilComp", (int) CompareFunction.Always);
                }
                else
                {
                    mat.SetInt("_StencilReadMask", StencilId);
                    mat.SetInt("_StencilComp", (int) CompareFunction.Greater);
                }
            }
        }

        static Dictionary<ShaderProps, Material> CachedMaterials = new Dictionary<ShaderProps, Material>();

        public Transform MaskRoot;

        public override Material materialForRendering
        {
            get
            {
                if (Shadow == null) return base.materialForRendering;

                var stencilId = -1;

                if (!Shadow.Inset)
                {
                    var depth = MaskUtilities.GetStencilDepth(MaskRoot, MaskRoot.GetComponentInParent<Canvas>()?.transform ?? MaskRoot.root);
                    var id = 0;
                    for (int i = 0; i <= depth; i++) id |= 1 << i;
                    stencilId = id;
                }

                var props = new ShaderProps
                {
                    BaseMaterial = base.materialForRendering,
                    Inset = Shadow.Inset,
                    StencilId = stencilId,
                };

                if (!CachedMaterials.TryGetValue(props, out var result) || !result)
                {
                    result = new Material(props.BaseMaterial);
                    props.SetToMaterial(result);
                    CachedMaterials[props] = result;
                }

                return result;
            }
        }

        #endregion

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
                SetVerticesDirty();
                SetMaterialDirty();
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

        RoundedCornerUnitPositionData hardCornerUnits;
        RoundedCornerUnitPositionData softCornerUnits;
        RoundedCornerUnitPositionData ringCornerUnits;

        protected override void OnEnable()
        {
            base.OnEnable();
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
                    ref hardCornerUnits,
                    ref softCornerUnits,
                    ref ringCornerUnits,
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
                    ref hardCornerUnits,
                    ref softCornerUnits,
                    ref ringCornerUnits,
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
            SetMaterialDirty();
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
            ref RoundedCornerUnitPositionData hardCornerUnits,
            ref RoundedCornerUnitPositionData softCornerUnits,
            ref RoundedCornerUnitPositionData ringCornerUnits,
            WebShadowProperties shadow
        )
        {
            var bl2 = Mathf.Max(0, shadow.Blur) * 2;
            var sp2 = shadow.Spread * 2;

            width = Mathf.Max(0, width + sp2);
            height = Mathf.Max(0, height + sp2);
            var size = new Vector2(width, height);

            var hardWidth = Mathf.Max(0, width - bl2);
            var hardHeight = Mathf.Max(0, height - bl2);
            var softWidth = Mathf.Max(0, width + bl2);
            var softHeight = Mathf.Max(0, height + bl2);

            var baseColor = new Color32(color.r, color.g, color.b, color.a);
            var fadedColor = new Color32(color.r, color.g, color.b, 0);


            var softRounding = rounding.OffsetBorder(size, Vector4.one * -shadow.Blur);
            var softRect = new Vector2(softWidth, softHeight);
            softRounding.UpdateAdjusted(softRect, softRect, null, rounding);
            RoundedCornerUnitPositionData.SetCornerUnitPositions(softRounding, ref softCornerUnits);


            var noHardEdge = hardWidth == 0 || hardHeight == 0;


            if (noHardEdge)
            {
                var ratioX = Mathf.Min(1, bl2 == 0 ? 1 : width / bl2);
                var ratioY = Mathf.Min(1, bl2 == 0 ? 1 : height / bl2);
                var minRatio = Mathf.Min(ratioX, ratioY);
                baseColor = new Color32(color.r, color.g, color.b, (byte) (color.a * minRatio * minRatio));
            }


            tmpUV.x = 0.5f;
            tmpUV.y = 0.5f;
            vh.AddVert(center, baseColor, tmpUV, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);
            var numVertices = vh.currentVertCount;

            if (!noHardEdge)
            {
                var hardRounding = rounding.OffsetBorder(size, Vector4.one * shadow.Blur);
                var hardRect = new Vector2(hardWidth, hardHeight);
                hardRounding.UpdateAdjusted(hardRect, hardRect, null, rounding);
                RoundedCornerUnitPositionData.SetCornerUnitPositions(hardRounding, ref hardCornerUnits);

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
                    hardCornerUnits,
                    color,
                    color,
                    color,
                    color,
                    Vector2.one,
                    false
                );

                var numNewVertices = vh.currentVertCount - numVertices;
                RectUtils.AddRingIndicesToCenter(ref vh, numVertices - 1, numVertices, numNewVertices);
            }

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
                softCornerUnits,
                fadedColor,
                fadedColor,
                fadedColor,
                fadedColor,
                Vector2.zero,
                !noHardEdge
            );

            if (noHardEdge)
            {
                var numNewVertices = vh.currentVertCount - numVertices;
                RectUtils.AddRingIndicesToCenter(ref vh, numVertices - 1, numVertices, numNewVertices);
            }
        }

        public static void AddInsetShadowRect(
            ref VertexHelper vh,
            Vector2 center,
            float width,
            float height,
            WebRoundingProperties rounding,
            Color32 color,
            Vector2 uv,
            ref RoundedCornerUnitPositionData hardCornerUnits,
            ref RoundedCornerUnitPositionData softCornerUnits,
            ref RoundedCornerUnitPositionData ringCornerUnits,
            WebShadowProperties shadow
        )
        {
            var bl2 = Mathf.Max(0, shadow.Blur) * 2;

            width = Mathf.Max(0, width - shadow.Spread * 2);
            height = Mathf.Max(0, height - shadow.Spread * 2);
            var size = new Vector2(width, height);

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

                var ringRounding = rounding.OffsetBorder(size, Vector4.zero);
                var ringRect = new Vector2(ringWidth, ringHeight);
                ringRounding.UpdateAdjusted(ringRect, ringRect, null, rounding);
                RoundedCornerUnitPositionData.SetCornerUnitPositions(ringRounding, ref ringCornerUnits);


                AddRoundedRectVerticesRing(
                    ref vh,
                    center,
                    ringWidth,
                    ringHeight,
                    ringWidth,
                    ringHeight,
                    rounding.AdjustedTLRadius,
                    rounding.AdjustedTLRadius,
                    rounding.AdjustedTRRadius,
                    rounding.AdjustedTRRadius,
                    rounding.AdjustedBRRadius,
                    rounding.AdjustedBRRadius,
                    rounding.AdjustedBLRadius,
                    rounding.AdjustedBLRadius,
                    ringCornerUnits,
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

            var hardRounding = rounding.OffsetBorder(size, Vector4.zero);
            var hardRect = new Vector2(hardWidth, hardHeight);
            hardRounding.UpdateAdjusted(hardRect, hardRect, null, rounding);
            RoundedCornerUnitPositionData.SetCornerUnitPositions(hardRounding, ref hardCornerUnits);

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
                hardCornerUnits,
                color,
                color,
                color,
                color,
                Vector2.one,
                ringAdded
            );

            var fadedColor = new Color32(color.r, color.g, color.b, 0);


            var softRounding = rounding.OffsetBorder(size, Vector4.zero);
            var softRect = new Vector2(softWidth, softHeight);
            softRounding.UpdateAdjusted(softRect, softRect, null, rounding);
            RoundedCornerUnitPositionData.SetCornerUnitPositions(softRounding, ref softCornerUnits);

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
                softCornerUnits,
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
            tmpUV = uv;

            float xMin = center.x - width * 0.5f;
            float yMin = center.y - height * 0.5f;

            float xMax = center.x + width * 0.5f;
            float yMax = center.y + height * 0.5f;

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

                vh.AddVert(tmpPos, i > hl ? topColor : leftColor, tmpUV, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);
            }


            // add last circle vertex
            tmpV3.x = xMax - trRadius.x;
            tmpV3.y = yMax - trRadius.y;
            tmpPos.x = tmpV3.x + cornerUnitPositions.TRUnitPositions[0].x * trOuterRadius.x;
            tmpPos.y = tmpV3.y + cornerUnitPositions.TRUnitPositions[0].y * trOuterRadius.y;
            tmpPos.z = tmpV3.z;

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
