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

        /// <summary>
        /// Compares the radii and resolutions, not the adjusted output -- the assignment sites all
        /// build a fresh instance from the style, so reference equality would never match.
        /// </summary>
        public bool ValueEquals(WebRoundingProperties other)
        {
            if (other == null) return false;
            return Type == other.Type && ResolutionMode == other.ResolutionMode &&
                UniformRadius == other.UniformRadius && TLRadius == other.TLRadius &&
                TRRadius == other.TRRadius && BRRadius == other.BRRadius && BLRadius == other.BLRadius &&
                TLResolution.ValueEquals(other.TLResolution) && TRResolution.ValueEquals(other.TRResolution) &&
                BRResolution.ValueEquals(other.BRResolution) && BLResolution.ValueEquals(other.BLResolution) &&
                UniformResolution.ValueEquals(other.UniformResolution);
        }

        /// <summary>
        /// How much the radii on one edge have to give to fit along it, at most 1. An edge with no
        /// radius on it has nothing to say, rather than a division by zero.
        /// </summary>
        private static float EdgeScale(float length, float sum) => sum <= 0 ? 1f : Mathf.Min(1f, length / sum);

        /// <summary>One radius in pixels, never negative and never larger than a number can be
        /// multiplied by -- an infinite radius scaled to fit is NaN, and a NaN corner paints nothing.</summary>
        private static float Resolve(YogaValue value, float extent) =>
            Mathf.Clamp(value.Unit == YogaUnit.Percent ? extent * value.Value / 100 : value.Value, 0, MaxRadius);

        // Well past any box, and small enough that scaling it down to fit stays exact in a float.
        private const float MaxRadius = 1 << 25;

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
                Resolve(br[0].X, size.x), Resolve(br[1].X, size.x),
                Resolve(br[2].X, size.x), Resolve(br[3].X, size.x)
            );

            // Vertical border radii in pixel - tl,tr,br,bl
            var bry = new Vector4(
                Resolve(br[0].Y, size.y), Resolve(br[1].Y, size.y),
                Resolve(br[2].Y, size.y), Resolve(br[3].Y, size.y)
            );

            // CSS Backgrounds 3 section 5.5: one factor for the whole box -- the smallest of
            // (edge length / the two radii sitting on that edge) over the four edges -- applied to
            // every radius, so an over-large `border-radius` shrinks the box's shape rather than
            // each corner separately. Per corner, a pill asked for on an oblong kept the corners
            // its shorter edge did not touch, which is what drew a chevron instead of a cap.
            var scale = Mathf.Min(
                Mathf.Min(EdgeScale(size.x, brx.x + brx.y), EdgeScale(size.y, bry.y + bry.z)),
                Mathf.Min(EdgeScale(size.x, brx.z + brx.w), EdgeScale(size.y, bry.w + bry.x))
            );

            // Final sizes of corner border radii (horizontal)
            brx = new Vector4(
                Mathf.Min(innerSize.x + ot.Left, brx.x * scale),
                Mathf.Min(innerSize.x + ot.Right, brx.y * scale),
                Mathf.Min(innerSize.x + ot.Right, brx.z * scale),
                Mathf.Min(innerSize.x + ot.Left, brx.w * scale)
            );

            // Final sizes of corner border radii (vertical)
            bry = new Vector4(
                Mathf.Min(innerSize.y + ot.Top, bry.x * scale),
                Mathf.Min(innerSize.y + ot.Top, bry.y * scale),
                Mathf.Min(innerSize.y + ot.Bottom, bry.z * scale),
                Mathf.Min(innerSize.y + ot.Bottom, bry.w * scale)
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
