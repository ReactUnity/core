using ReactUnity.Helpers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;
using Facebook.Yoga;

namespace ReactUnity.UGUI.Internal
{
    public class RoundedBorderMaskImage : Image
    {
        public YogaValue2[] BorderRadius = new YogaValue2[4];
        public Vector4 Size;

        protected override void OnEnable()
        {
            base.OnEnable();
            type = Type.Sliced;
            pixelsPerUnitMultiplier = 100;
            material = GetDefaultMaterial();
        }

        public virtual Material GetDefaultMaterial()
        {
            return Instantiate(ResourcesHelper.BorderRadiusMaterial);
        }

        public override Material materialForRendering
        {
            get
            {
                Material result = base.materialForRendering;

                var br = BorderRadius;
                var sz = Size;

                // Horizontal border radii in pixel - tl,tr,br,bl
                var brx = new Vector4(
                    Mathf.Max(0, br[0].X.Unit == YogaUnit.Percent ? sz.x * br[0].X.Value / 100 : (br[0].X.Value)),
                    Mathf.Max(0, br[1].X.Unit == YogaUnit.Percent ? sz.x * br[1].X.Value / 100 : (br[1].X.Value)),
                    Mathf.Max(0, br[2].X.Unit == YogaUnit.Percent ? sz.x * br[2].X.Value / 100 : (br[2].X.Value)),
                    Mathf.Max(0, br[3].X.Unit == YogaUnit.Percent ? sz.x * br[3].X.Value / 100 : (br[3].X.Value))
                );

                // Vertical border radii in pixel - tl,tr,br,bl
                var bry = new Vector4(
                    Mathf.Max(0, br[0].Y.Unit == YogaUnit.Percent ? sz.y * br[0].Y.Value / 100 : (br[0].Y.Value)),
                    Mathf.Max(0, br[1].Y.Unit == YogaUnit.Percent ? sz.y * br[1].Y.Value / 100 : (br[1].Y.Value)),
                    Mathf.Max(0, br[2].Y.Unit == YogaUnit.Percent ? sz.y * br[2].Y.Value / 100 : (br[2].Y.Value)),
                    Mathf.Max(0, br[3].Y.Unit == YogaUnit.Percent ? sz.y * br[3].Y.Value / 100 : (br[3].Y.Value))
                );

                // Total border radius in each edge - top, right, bottom, left
                var sums = new Vector4(
                    Mathf.Max(sz.x, brx.x + brx.y),
                    Mathf.Max(sz.y, bry.y + bry.z),
                    Mathf.Max(sz.x, brx.z + brx.w),
                    Mathf.Max(sz.y, bry.w + bry.x)
                );

                // Pixel unit of each corner - tl,tr,br,bl
                var pixelUnits = new Vector4(
                    Mathf.Min(sz.x / sums.x, sz.y / sums.w),
                    Mathf.Min(sz.x / sums.x, sz.y / sums.y),
                    Mathf.Min(sz.x / sums.z, sz.y / sums.y),
                    Mathf.Min(sz.x / sums.z, sz.y / sums.w)
                );



                brx = new Vector4(
                    brx.x * pixelUnits.x / sz.x,
                    brx.y * pixelUnits.y / sz.x,
                    brx.z * pixelUnits.z / sz.x,
                    brx.w * pixelUnits.w / sz.x
                );

                bry = new Vector4(
                    bry.x * pixelUnits.x / sz.y,
                    bry.y * pixelUnits.y / sz.y,
                    bry.z * pixelUnits.z / sz.y,
                    bry.w * pixelUnits.w / sz.y
                );

                var cutPoints = new Vector4(
                    1 - brx.y,
                    bry.z,
                    brx.w,
                    1 - bry.x
                );

                result.SetVector(ShaderHelpers.BorderRadiusXProp, brx);
                result.SetVector(ShaderHelpers.BorderRadiusYProp, bry);
                result.SetVector(ShaderHelpers.BorderRadiusCutsProp, cutPoints);
                result.SetVector(ShaderHelpers.SizeProp, Size);
                return result;
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
            RefreshSize();
        }
#endif

        protected virtual void RefreshSize()
        {
            var rect = ((RectTransform) transform).rect;
            Size = new Vector4(rect.width, rect.height, 0, 0);
            SetMaterialDirty();

            var mask = GetComponent<Mask>();
            if (mask) MaskUtilities.NotifyStencilStateChanged(mask);
        }
    }
}
