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
                var brx = new Vector4(
                    Mathf.Max(0, br[0].X.Unit == YogaUnit.Percent ? br[0].X.Value / 100 : (br[0].X.Value / sz.x)),
                    Mathf.Max(0, br[1].X.Unit == YogaUnit.Percent ? br[1].X.Value / 100 : (br[1].X.Value / sz.x)),
                    Mathf.Max(0, br[2].X.Unit == YogaUnit.Percent ? br[2].X.Value / 100 : (br[2].X.Value / sz.x)),
                    Mathf.Max(0, br[3].X.Unit == YogaUnit.Percent ? br[3].X.Value / 100 : (br[3].X.Value / sz.x))
                );

                var bry = new Vector4(
                    Mathf.Max(0, br[0].Y.Unit == YogaUnit.Percent ? br[0].Y.Value / 100 : (br[0].Y.Value / sz.y)),
                    Mathf.Max(0, br[1].Y.Unit == YogaUnit.Percent ? br[1].Y.Value / 100 : (br[1].Y.Value / sz.y)),
                    Mathf.Max(0, br[2].Y.Unit == YogaUnit.Percent ? br[2].Y.Value / 100 : (br[2].Y.Value / sz.y)),
                    Mathf.Max(0, br[3].Y.Unit == YogaUnit.Percent ? br[3].Y.Value / 100 : (br[3].Y.Value / sz.y))
                );

                var sums = new Vector4(
                    Mathf.Max(1, brx.x + brx.y),
                    Mathf.Max(1, bry.y + bry.z),
                    Mathf.Max(1, brx.z + brx.w),
                    Mathf.Max(1, bry.w + bry.x)
                );

                brx = new Vector4(
                    brx.x / sums.x,
                    brx.y / sums.x,
                    brx.z / sums.z,
                    brx.w / sums.z
                );

                bry = new Vector4(
                    bry.x / sums.w,
                    bry.y / sums.y,
                    bry.z / sums.y,
                    bry.w / sums.w
                );

                var cutPoints = new Vector4(
                    brx.x,
                    bry.z,
                    brx.w,
                    bry.w
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
