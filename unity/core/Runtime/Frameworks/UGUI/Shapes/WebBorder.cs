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
            var topBand = BorderUtils.GetBorderStyleTextureUVs(outline.Styles.Top, false);
            var rightBand = BorderUtils.GetBorderStyleTextureUVs(outline.Styles.Right, true);
            var bottomBand = BorderUtils.GetBorderStyleTextureUVs(outline.Styles.Bottom, true);
            var leftBand = BorderUtils.GetBorderStyleTextureUVs(outline.Styles.Left, false);

            // Outlines come through with negative sizes, which draws the two rings the other way
            // round, so the band's edges swap with them. Same normalisation the square path gets
            // from swapping its positions.
            if (outline.Sizes.Top < 0) topBand = new Vector2(topBand.y, topBand.x);
            if (outline.Sizes.Right < 0) rightBand = new Vector2(rightBand.y, rightBand.x);
            if (outline.Sizes.Bottom < 0) bottomBand = new Vector2(bottomBand.y, bottomBand.x);
            if (outline.Sizes.Left < 0) leftBand = new Vector2(leftBand.y, leftBand.x);

            var innerUvY = new Vector4(topBand.x, rightBand.x, bottomBand.x, leftBand.x);
            var outerUvY = new Vector4(topBand.y, rightBand.y, bottomBand.y, leftBand.y);

            // A tiled style repeats along the edge, which one continuous ring cannot express. When
            // any side has one, both rings are emitted as vertices only - the path the strips below
            // are walked out of - and every side is drawn as its own strip instead.
            var tiled =
                BorderUtils.IsTiledStyle(outline.Styles.Top) ||
                BorderUtils.IsTiledStyle(outline.Styles.Right) ||
                BorderUtils.IsTiledStyle(outline.Styles.Bottom) ||
                BorderUtils.IsTiledStyle(outline.Styles.Left);

            var innerBase = vh.currentVertCount;

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

            var outerBase = vh.currentVertCount;

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
                !tiled,
                outerUvY
            );

            if (!tiled) return;

            // Each corner arc doubles its vertex at 45 degrees, and the per-side split lands on that
            // pair, so a side runs from one mitre to the next as [previous corner's second half] +
            // [next corner's first half] - contiguous once the ring is treated as a cycle.
            int nTR = cornerUnitPositions.TRUnitPositions.Length;
            int nBR = cornerUnitPositions.BRUnitPositions.Length;
            int nBL = cornerUnitPositions.BLUnitPositions.Length;
            int nTL = cornerUnitPositions.TLUnitPositions.Length;

            // The closing duplicate of vertex 0 sits at the end of each ring; the cycle skips it.
            var ringCount = nTR + nBR + nBL + nTL;

            int hTR = nTR / 2, hBR = nBR / 2, hBL = nBL / 2, hTL = nTL / 2;
            int oBR = nTR, oBL = oBR + nBR, oTL = oBL + nBL;

            BorderUtils.AddRoundedSideStrip(ref vh, innerBase, outerBase, ringCount,
                oTL + hTL + 1, nTL - hTL + hTR,
                outline.Styles.Top, topBand, outline.Sizes.Top, outline.Colors.Top);

            BorderUtils.AddRoundedSideStrip(ref vh, innerBase, outerBase, ringCount,
                hTR + 1, nTR - hTR + hBR,
                outline.Styles.Right, rightBand, outline.Sizes.Right, outline.Colors.Right);

            BorderUtils.AddRoundedSideStrip(ref vh, innerBase, outerBase, ringCount,
                oBR + hBR + 1, nBR - hBR + hBL,
                outline.Styles.Bottom, bottomBand, outline.Sizes.Bottom, outline.Colors.Bottom);

            BorderUtils.AddRoundedSideStrip(ref vh, innerBase, outerBase, ringCount,
                oBL + hBL + 1, nBL - hBL + hTL,
                outline.Styles.Left, leftBand, outline.Sizes.Left, outline.Colors.Left);
        }

    }
}
