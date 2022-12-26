using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Shapes
{
    [RequireComponent(typeof(CanvasRenderer))]
    public class WebBorder : MaskableGraphic
    {
        [SerializeField]
        private WebRoundingProperties rounding = new WebRoundingProperties();

        public WebRoundingProperties Rounding
        {
            get => rounding;
            set
            {
                rounding = value;
                RefreshInnerRounding();
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
                RefreshInnerRounding();
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
            var size = Border.Sizes;

            return new Rect(
                pixelRect.x - size.Left,
                pixelRect.y - size.Bottom,
                pixelRect.width + size.Left + size.Right,
                pixelRect.height + size.Bottom + size.Top
            );
        }


        protected override void OnPopulateMesh(VertexHelper vh)
        {
            vh.Clear();
            var pixelRect = GetInnerRect();
            var outerRect = GetOuterRect();

            Rounding.UpdateAdjusted(outerRect.size, pixelRect.size, Border.Sizes);
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
            RefreshInnerRounding();
            SetVerticesDirty();
        }


        internal void RefreshInnerRounding()
        {
            var borderSizes = Border.Sizes.Vector;

            InnerRounding = Rounding.OffsetBorder(GetInnerRect().size, borderSizes);
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
            float fullWidth = width + outline.Sizes.Left + outline.Sizes.Right;
            float fullHeight = height + outline.Sizes.Top + outline.Sizes.Bottom;

            if (rounding.Type == WebRoundingProperties.RoundedType.None)
            {
                if (width <= 0 || height <= 0) return;

                AddRectRing(
                    ref vh,
                    outline,
                    center,
                    width,
                    height,
                    outline.Colors,
                    uv
                );

                return;
            }

            if (fullWidth <= 0 || fullHeight <= 0) return;

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
                outline.Colors.Top,
                outline.Colors.Right,
                outline.Colors.Bottom,
                outline.Colors.Left,
                uv,
                false
            );

            var outCenter = new Vector2(
                center.x + (outline.Sizes.Right - outline.Sizes.Left) / 2,
                center.y + (outline.Sizes.Top - outline.Sizes.Bottom) / 2
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
                outline.Colors.Top,
                outline.Colors.Right,
                outline.Colors.Bottom,
                outline.Colors.Left,
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
            WebOutlineColors colors,
            Vector2 uv
        )
        {
            float fullWidth = width + outline.Sizes.Left + outline.Sizes.Right;
            float fullHeight = height + outline.Sizes.Top + outline.Sizes.Bottom;

            AddRectVertRing(
                ref vh,
                center,
                width,
                height,
                colors,
                fullWidth,
                fullHeight,
                false
            );

            var outCenter = new Vector2(
                center.x + (outline.Sizes.Right - outline.Sizes.Left) / 2,
                center.y + (outline.Sizes.Top - outline.Sizes.Bottom) / 2
            );

            AddRectVertRing(
                ref vh,
                outCenter,
                fullWidth,
                fullHeight,
                colors,
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
            WebOutlineColors colors,
            float totalWidth,
            float totalHeight,
            bool addRingIndices = false
        )
        {
            Debug.Assert(totalWidth > 0 && totalHeight > 0);

            float uvXInset = 0.5f - width / totalWidth * 0.5f;
            float uvYInset = 0.5f - height / totalHeight * 0.5f;

            // TL
            tmpPos.x = center.x - width * 0.5f;
            tmpPos.y = center.y + height * 0.5f;
            tmpUVPos.x = uvXInset;
            tmpUVPos.y = 1.0f - uvYInset;
            vh.AddVert(tmpPos, colors.Left, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);
            vh.AddVert(tmpPos, colors.Top, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);

            // TR
            tmpPos.x += width;
            tmpUVPos.x = 1.0f - uvXInset;
            vh.AddVert(tmpPos, colors.Top, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);

            vh.AddVert(tmpPos, colors.Right, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);

            // BR
            tmpPos.y -= height;
            tmpUVPos.y = uvYInset;
            vh.AddVert(tmpPos, colors.Right, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);

            vh.AddVert(tmpPos, colors.Bottom, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);

            // BL
            tmpPos.x -= width;
            tmpUVPos.x = uvXInset;
            vh.AddVert(tmpPos, colors.Bottom, tmpUVPos, GeoUtils.ZeroV2, GeoUtils.UINormal, GeoUtils.UITangent);

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
