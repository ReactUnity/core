using ReactUnity.Helpers;
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

        bool HasRounding => rounding != null && rounding.HasRounding();

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

        // Resolved on every material rebuild rather than cached on assignment: the graphic is also
        // created from the layout pass, which never assigns Rounding, and a cached texture stayed
        // null there - making every border style render as solid until the next style update.
        public override Texture mainTexture => ResourcesHelper.BorderTexture;

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

            Rounding?.UpdateAdjusted(outerRect.size, pixelRect.size, Border.Sizes);
            InnerRounding?.UpdateAdjusted(pixelRect.size, pixelRect.size);

            if (!HasRounding)
            {
                BorderUtils.AddNonRoundedOutline(
                    ref vh,
                    Border,
                    pixelRect,
                    Border.Colors,
                    Border.Styles
                );
            }
            else
            {
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

            if (fullWidth <= 0 || fullHeight <= 0) return;

            RoundedCornerUnitPositionData.SetCornerUnitPositions(
                rounding,
                ref cornerUnitPositions
            );

            // Same bands and the same inversion per side as the non-rounded path: the style is a
            // ramp across the border width, so the inner ring takes the band's inner edge and the
            // outer ring its outer edge, and the quad strip between them interpolates it.
            var topBand = BorderUtils.GetRoundedBorderStyleTextureUVs(outline.Styles.Top, false);
            var rightBand = BorderUtils.GetRoundedBorderStyleTextureUVs(outline.Styles.Right, true);
            var bottomBand = BorderUtils.GetRoundedBorderStyleTextureUVs(outline.Styles.Bottom, true);
            var leftBand = BorderUtils.GetRoundedBorderStyleTextureUVs(outline.Styles.Left, false);

            // Outlines come through with negative sizes, which draws the two rings the other way
            // round, so the band's edges swap with them. Same normalisation the square path gets
            // from swapping its positions.
            if (outline.Sizes.Top < 0) topBand = new Vector2(topBand.y, topBand.x);
            if (outline.Sizes.Right < 0) rightBand = new Vector2(rightBand.y, rightBand.x);
            if (outline.Sizes.Bottom < 0) bottomBand = new Vector2(bottomBand.y, bottomBand.x);
            if (outline.Sizes.Left < 0) leftBand = new Vector2(leftBand.y, leftBand.x);

            var innerUvY = new Vector4(topBand.x, rightBand.x, bottomBand.x, leftBand.x);
            var outerUvY = new Vector4(topBand.y, rightBand.y, bottomBand.y, leftBand.y);

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
                false,
                innerUvY
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
                true,
                outerUvY
            );
        }

    }
}
