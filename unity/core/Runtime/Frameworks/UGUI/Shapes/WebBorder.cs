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
                BorderTexture = HasRounding ? null : ResourcesHelper.BorderTexture;
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

        Texture2D borderTexture;
        Texture2D BorderTexture
        {
            get => borderTexture;
            set
            {
                if (borderTexture != value)
                {
                    borderTexture = value;
                    SetMaterialDirty();
                }
            }
        }
        public override Texture mainTexture => BorderTexture;

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

    }
}
