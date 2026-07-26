using Yoga;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.UGUI.Shapes
{
    [System.Serializable]
    public class WebRoundingProperties
    {
        static WebOutlineSizes DefaultOutlineSizes = new WebOutlineSizes();

        public enum RoundedType
        {
            None,
            Uniform,
            Individual
        }

        public enum ResolutionType
        {
            Uniform,
            Individual
        }

        public RoundedType Type = RoundedType.None;
        public ResolutionType ResolutionMode = ResolutionType.Uniform;

        public YogaValue2 UniformRadius = YogaValue2.Zero;

        public YogaValue2 TLRadius = YogaValue2.Zero;
        public YogaValue2 TRRadius = YogaValue2.Zero;
        public YogaValue2 BRRadius = YogaValue2.Zero;
        public YogaValue2 BLRadius = YogaValue2.Zero;



        public WebRoundingResolutionProperties TLResolution { get; set; } = new WebRoundingResolutionProperties();
        public WebRoundingResolutionProperties TRResolution { get; set; } = new WebRoundingResolutionProperties();
        public WebRoundingResolutionProperties BRResolution { get; set; } = new WebRoundingResolutionProperties();
        public WebRoundingResolutionProperties BLResolution { get; set; } = new WebRoundingResolutionProperties();
        public WebRoundingResolutionProperties UniformResolution = new WebRoundingResolutionProperties();

        public Vector2 AdjustedTLRadius { get; private set; }
        public Vector2 AdjustedTRRadius { get; private set; }
        public Vector2 AdjustedBRRadius { get; private set; }
        public Vector2 AdjustedBLRadius { get; private set; }

        public WebRoundingProperties() { }

        public WebRoundingProperties(Vector4 brx, Vector4 bry)
        {
            Type = WebRoundingProperties.RoundedType.Individual;
            TLRadius = YogaValue2.Point(brx.x, bry.x);
            TRRadius = YogaValue2.Point(brx.y, bry.y);
            BRRadius = YogaValue2.Point(brx.z, bry.z);
            BLRadius = YogaValue2.Point(brx.w, bry.w);
        }
        public WebRoundingProperties(YogaValue2[] borders)
        {
            Type = WebRoundingProperties.RoundedType.Individual;
            TLRadius = borders[0];
            TRRadius = borders[1];
            BRRadius = borders[2];
            BLRadius = borders[3];
        }

        public void UpdateAdjusted(Vector2 size, Vector2 innerSize, WebOutlineSizes? outline = null, WebRoundingProperties matchRounding = null)
        {
            var ot = outline ?? DefaultOutlineSizes;

            var br = new YogaValue2[4];

            switch (Type)
            {
                case RoundedType.Uniform:
                    br[0] = br[1] = br[2] = br[3] = UniformRadius;
                    break;
                case RoundedType.Individual:
                    br[0] = TLRadius;
                    br[1] = TRRadius;
                    br[2] = BRRadius;
                    br[3] = BLRadius;
                    break;
                case RoundedType.None:
                    br[0] = br[1] = br[2] = br[3] = YogaValue2.Zero;
                    break;
                default:
                    throw new System.ArgumentOutOfRangeException();
            }


            // Horizontal border radii in pixel - tl,tr,br,bl
            var brx = new Vector4(
                Mathf.Max(0, br[0].X.Unit == YogaUnit.Percent ? size.x * br[0].X.Value / 100 : (br[0].X.Value)),
                Mathf.Max(0, br[1].X.Unit == YogaUnit.Percent ? size.x * br[1].X.Value / 100 : (br[1].X.Value)),
                Mathf.Max(0, br[2].X.Unit == YogaUnit.Percent ? size.x * br[2].X.Value / 100 : (br[2].X.Value)),
                Mathf.Max(0, br[3].X.Unit == YogaUnit.Percent ? size.x * br[3].X.Value / 100 : (br[3].X.Value))
            );

            // Vertical border radii in pixel - tl,tr,br,bl
            var bry = new Vector4(
                Mathf.Max(0, br[0].Y.Unit == YogaUnit.Percent ? size.y * br[0].Y.Value / 100 : (br[0].Y.Value)),
                Mathf.Max(0, br[1].Y.Unit == YogaUnit.Percent ? size.y * br[1].Y.Value / 100 : (br[1].Y.Value)),
                Mathf.Max(0, br[2].Y.Unit == YogaUnit.Percent ? size.y * br[2].Y.Value / 100 : (br[2].Y.Value)),
                Mathf.Max(0, br[3].Y.Unit == YogaUnit.Percent ? size.y * br[3].Y.Value / 100 : (br[3].Y.Value))
            );

            // Total border radius in each edge - top, right, bottom, left
            var sums = new Vector4(
                Mathf.Max(size.x, brx.x + brx.y),
                Mathf.Max(size.y, bry.y + bry.z),
                Mathf.Max(size.x, brx.z + brx.w),
                Mathf.Max(size.y, bry.w + bry.x)
            );

            // Pixel unit of each corner - tl,tr,br,bl
            var pixelUnits = new Vector4(
                Mathf.Min(sums.x == 0 ? 0 : size.x / sums.x, sums.w == 0 ? 0 : size.y / sums.w),
                Mathf.Min(sums.x == 0 ? 0 : size.x / sums.x, sums.y == 0 ? 0 : size.y / sums.y),
                Mathf.Min(sums.z == 0 ? 0 : size.x / sums.z, sums.y == 0 ? 0 : size.y / sums.y),
                Mathf.Min(sums.z == 0 ? 0 : size.x / sums.z, sums.w == 0 ? 0 : size.y / sums.w)
            );

            // Final sizes of corner border radii (horizontal)
            brx = new Vector4(
                Mathf.Min(innerSize.x + ot.Left, brx.x * pixelUnits.x),
                Mathf.Min(innerSize.x + ot.Right, brx.y * pixelUnits.y),
                Mathf.Min(innerSize.x + ot.Right, brx.z * pixelUnits.z),
                Mathf.Min(innerSize.x + ot.Left, brx.w * pixelUnits.w)
            );

            // Final sizes of corner border radii (vertical)
            bry = new Vector4(
                Mathf.Min(innerSize.y + ot.Top, bry.x * pixelUnits.x),
                Mathf.Min(innerSize.y + ot.Top, bry.y * pixelUnits.y),
                Mathf.Min(innerSize.y + ot.Bottom, bry.z * pixelUnits.z),
                Mathf.Min(innerSize.y + ot.Bottom, bry.w * pixelUnits.w)
            );

            // Average border radii
            var bra = new Vector4(
                (brx.x + bry.x) / 2,
                (brx.y + bry.y) / 2,
                (brx.z + bry.z) / 2,
                (brx.w + bry.w) / 2
            );

            AdjustedTLRadius = new Vector2(brx.x, bry.x);
            AdjustedTRRadius = new Vector2(brx.y, bry.y);
            AdjustedBRRadius = new Vector2(brx.z, bry.z);
            AdjustedBLRadius = new Vector2(brx.w, bry.w);

            if (ResolutionMode == ResolutionType.Uniform)
            {
                TLResolution.UpdateAdjusted(bra.x, UniformResolution, 4.0f, matchRounding?.TLResolution);
                TRResolution.UpdateAdjusted(bra.y, UniformResolution, 4.0f, matchRounding?.TRResolution);
                BRResolution.UpdateAdjusted(bra.z, UniformResolution, 4.0f, matchRounding?.BRResolution);
                BLResolution.UpdateAdjusted(bra.w, UniformResolution, 4.0f, matchRounding?.BLResolution);
            }
            else
            {
                TLResolution.UpdateAdjusted(bra.x, 4.0f, matchRounding?.TLResolution);
                TRResolution.UpdateAdjusted(bra.y, 4.0f, matchRounding?.TRResolution);
                BRResolution.UpdateAdjusted(bra.z, 4.0f, matchRounding?.BRResolution);
                BLResolution.UpdateAdjusted(bra.w, 4.0f, matchRounding?.BLResolution);
            }
        }

        public void OnCheck()
        {
            TLResolution.OnCheck();
            TRResolution.OnCheck();
            BRResolution.OnCheck();
            BLResolution.OnCheck();

            UniformResolution.OnCheck();
        }

        public WebRoundingProperties OffsetBorder(Vector2 size, Vector4 borderSizes)
        {
            var border = new WebOutlineSizes()
            {
                Top = borderSizes.x,
                Right = borderSizes.y,
                Bottom = borderSizes.z,
                Left = borderSizes.w,
            };

            var offsetSize = new Vector2(
                size.x + border.Left + border.Right,
                size.y + border.Bottom + border.Top
            );
            UpdateAdjusted(offsetSize, size, border);

            var brx = new Vector4(
                Mathf.Ceil(AdjustedTLRadius.x - (borderSizes.w)),
                Mathf.Ceil(AdjustedTRRadius.x - (borderSizes.y)),
                Mathf.Ceil(AdjustedBRRadius.x - (borderSizes.y)),
                Mathf.Ceil(AdjustedBLRadius.x - (borderSizes.w))
            );

            var bry = new Vector4(
                Mathf.Ceil(AdjustedTLRadius.y - (borderSizes.x)),
                Mathf.Ceil(AdjustedTRRadius.y - (borderSizes.x)),
                Mathf.Ceil(AdjustedBRRadius.y - (borderSizes.z)),
                Mathf.Ceil(AdjustedBLRadius.y - (borderSizes.z))
            );

            return new WebRoundingProperties(brx, bry)
            {
                UniformResolution = UniformResolution,
            };
        }

        public bool HasRounding()
        {
            if (Type == RoundedType.None) return false;

            if (Type == RoundedType.Uniform) return !UniformRadius.IsZero();

            return !(
                TLRadius.IsZero() &&
                TRRadius.IsZero() &&
                BRRadius.IsZero() &&
                BLRadius.IsZero());
        }
    }
}
