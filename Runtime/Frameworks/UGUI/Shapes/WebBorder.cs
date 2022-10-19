using System.Collections.Generic;
using System;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Shapes
{
    [RequireComponent(typeof(CanvasRenderer))]
    public class WebBorder : MaskableGraphic
    {
        private struct ShaderProps
        {
            public Material BaseMaterial;
            public int Stencil;

            public override bool Equals(object obj)
            {
                return obj is ShaderProps props &&
                       EqualityComparer<Material>.Default.Equals(BaseMaterial, props.BaseMaterial) &&
                       Stencil == props.Stencil;
            }

            public override int GetHashCode()
            {
                return HashCode.Combine(BaseMaterial, Stencil);
            }

            public void SetToMaterial(Material mat)
            {
                mat.SetInt("_StencilComp", (int) CompareFunction.Equal);
                mat.SetInt("_StencilOp", (int) StencilOp.Zero);
                mat.SetFloat("_Stencil", Stencil);

            }
        }

        static Dictionary<ShaderProps, Material> CachedMaterials = new Dictionary<ShaderProps, Material>();


        [SerializeField]
        private WebRoundingProperties rounding = new WebRoundingProperties();

        public WebRoundingProperties Rounding
        {
            get => rounding;
            set
            {
                rounding = value;
                RefreshInsetBorder();
                SetVerticesDirty();
            }
        }

        [SerializeField]
        private WebOutlineProperties border = new WebOutlineProperties();

        public WebOutlineProperties Border
        {
            get => border;
            set
            {
                border = value;
                RefreshInsetBorder();
                SetVerticesDirty();
            }
        }

        private WebRoundingProperties innerRounding = new WebRoundingProperties();

        public WebRoundingProperties InnerRounding
        {
            get => innerRounding;
            set
            {
                innerRounding = value;
                if (InsetBorder) InsetBorder.Rounding = innerRounding;
            }
        }

        public WebRect insetBorder;

        public WebRect InsetBorder
        {
            get => insetBorder;
            set
            {
                if (insetBorder != value)
                {
                    insetBorder = value;
                    if (insetBorder) insetBorder.Rounding = innerRounding;
                }
            }
        }


        RoundedCornerUnitPositionData unitPositionData;

        protected override void OnEnable()
        {
            base.OnEnable();
            SetVerticesDirty();
        }


        Rect GetInnerRect() => RectTransformUtility.PixelAdjustRect(rectTransform, canvas);

        Rect GetOuterRect()
        {
            var pixelRect = GetInnerRect();

            return new Rect(
                pixelRect.x - Border.LeftWidth,
                pixelRect.y - Border.BottomWidth,
                pixelRect.width + Border.LeftWidth + Border.RightWidth,
                pixelRect.height + Border.BottomWidth + Border.TopWidth
            );
        }


        protected override void OnPopulateMesh(VertexHelper vh)
        {
            vh.Clear();
            var pixelRect = GetInnerRect();
            var outerRect = GetOuterRect();

            Rounding.UpdateAdjusted(outerRect.size, pixelRect.size, Border);
            InnerRounding.UpdateAdjusted(pixelRect.size, pixelRect.size);

            AddRoundedRectLine(
                ref vh,
                pixelRect.center,
                pixelRect.width,
                pixelRect.height,
                Border,
                InnerRounding,
                Rounding,
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
            RefreshInsetBorder();
            SetVerticesDirty();
        }


        internal void RefreshInsetBorder()
        {
            var borderSizes = new Vector4(
                Border.TopWidth,
                Border.RightWidth,
                Border.BottomWidth,
                Border.LeftWidth
            );

            InnerRounding = Rounding.OffsetBorder(GetInnerRect(), borderSizes);
        }


        public override Material materialForRendering
        {
            get
            {
                Material baseMat = base.materialForRendering;
                var stencil = (int) baseMat.GetFloat("_Stencil") >> 1;

                var props = new ShaderProps
                {
                    BaseMaterial = baseMat,
                    Stencil = stencil,
                };

                if (!CachedMaterials.TryGetValue(props, out var result) || !result)
                {
                    result = new Material(baseMat);
                    props.SetToMaterial(result);
                    CachedMaterials[props] = result;
                }

                return result;
            }
        }


        static Vector3 tmpPos = Vector3.zero;
        static Vector2 tmpUVPos = Vector2.zero;

        public static void AddRoundedRectLine(
            ref VertexHelper vh,
            Vector2 center,
            float width,
            float height,
            WebOutlineProperties outline,
            WebRoundingProperties innerRounding,
            WebRoundingProperties rounding,
            Vector2 uv,
            ref RoundedCornerUnitPositionData cornerUnitPositions
        )
        {
            float fullWidth = width + outline.LeftWidth + outline.RightWidth;
            float fullHeight = height + outline.TopWidth + outline.BottomWidth;

            if (rounding.Type == WebRoundingProperties.RoundedType.None)
            {
                AddRectRing(
                    ref vh,
                    outline,
                    center,
                    width,
                    height,
                    outline.TopColor,
                    outline.RightColor,
                    outline.BottomColor,
                    outline.LeftColor,
                    uv
                );

                return;
            }

            RoundedCornerUnitPositionData.SetCornerUnitPositions(
                rounding,
                ref cornerUnitPositions
            );

            WebRect.AddRoundedRectVerticesRing(
                ref vh,
                center,
                width,
                height,
                fullWidth,
                fullHeight,
                innerRounding.AdjustedTLRadius,
                innerRounding.AdjustedTLRadius,
                innerRounding.AdjustedTRRadius,
                innerRounding.AdjustedTRRadius,
                innerRounding.AdjustedBRRadius,
                innerRounding.AdjustedBRRadius,
                innerRounding.AdjustedBLRadius,
                innerRounding.AdjustedBLRadius,
                cornerUnitPositions,
                outline.TopColor,
                outline.RightColor,
                outline.BottomColor,
                outline.LeftColor,
                uv,
                false
            );

            var outCenter = new Vector2(
                center.x + (outline.RightWidth - outline.LeftWidth) / 2,
                center.y + (outline.TopWidth - outline.BottomWidth) / 2
            );

            WebRect.AddRoundedRectVerticesRing(
                ref vh,
                outCenter,
                fullWidth,
                fullHeight,
                fullWidth,
                fullHeight,
                rounding.AdjustedTLRadius,
                rounding.AdjustedTLRadius,
                rounding.AdjustedTRRadius,
                rounding.AdjustedTRRadius,
                rounding.AdjustedBRRadius,
                rounding.AdjustedBRRadius,
                rounding.AdjustedBLRadius,
                rounding.AdjustedBLRadius,
                cornerUnitPositions,
                outline.TopColor,
                outline.RightColor,
                outline.BottomColor,
                outline.LeftColor,
                uv,
                true
            );
        }


        public static void AddRectRing(
            ref VertexHelper vh,
            WebOutlineProperties outline,
            Vector2 center,
            float width,
            float height,
            Color32 topColor,
            Color32 rightColor,
            Color32 bottomColor,
            Color32 leftColor,
            Vector2 uv
        )
        {
            byte alpha = topColor.a;

            float fullWidth = width + outline.LeftWidth + outline.RightWidth;
            float fullHeight = height + outline.TopWidth + outline.BottomWidth;

            AddRectVertRing(
                ref vh,
                center,
                width,
                height,
                topColor,
                rightColor,
                bottomColor,
                leftColor,
                fullWidth,
                fullHeight,
                false
            );

            AddRectVertRing(
                ref vh,
                center,
                fullWidth,
                fullHeight,
                topColor,
                rightColor,
                bottomColor,
                leftColor,
                fullWidth,
                fullHeight,
                true
            );
        }

        public static void AddRectVertRing(
            ref VertexHelper vh,
            Vector2 center,
            float width,
            float height,
            Color32 topColor,
            Color32 rightColor,
            Color32 bottomColor,
            Color32 leftColor,
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
            vh.AddVert(tmpPos, topColor, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);

            // TR
            tmpPos.x += width;
            tmpUVPos.x = 1.0f - uvXInset;
            vh.AddVert(tmpPos, topColor, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);

            // BR
            tmpPos.y -= height;
            tmpUVPos.y = uvYInset;
            vh.AddVert(tmpPos, topColor, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);

            // BL
            tmpPos.x -= width;
            tmpUVPos.x = uvXInset;
            vh.AddVert(tmpPos, topColor, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);

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

    }
}
