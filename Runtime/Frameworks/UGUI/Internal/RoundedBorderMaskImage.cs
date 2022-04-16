using ReactUnity.Helpers;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Internal
{
    public class RoundedBorderMaskImage : Image
    {
        public Vector4 BorderRadiusX;
        public Vector4 BorderRadiusY;
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

                var brx = BorderRadiusX;
                var bry = BorderRadiusY;
                var sz = Size;
                brx = new Vector4(
                    Mathf.Max(0, brx.x < 1 ? brx.x : (brx.x / sz.x)),
                    Mathf.Max(0, brx.y < 1 ? brx.y : (brx.y / sz.x)),
                    Mathf.Max(0, brx.z < 1 ? brx.z : (brx.z / sz.x)),
                    Mathf.Max(0, brx.w < 1 ? brx.w : (brx.w / sz.x))
                );

                bry = new Vector4(
                    Mathf.Max(0, bry.x < 1 ? bry.x : (bry.x / sz.y)),
                    Mathf.Max(0, bry.y < 1 ? bry.y : (bry.y / sz.y)),
                    Mathf.Max(0, bry.z < 1 ? bry.z : (bry.z / sz.y)),
                    Mathf.Max(0, bry.w < 1 ? bry.w : (bry.w / sz.y))
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
