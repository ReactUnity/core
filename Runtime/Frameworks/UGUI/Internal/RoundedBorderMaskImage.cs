using ReactUnity.Helpers;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Internal
{
    public class RoundedBorderMaskImage : Image
    {
        public Vector4 BorderRadius;
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
                result.SetVector(ShaderHelpers.BorderRadiusProp, BorderRadius);
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

        private void RefreshSize()
        {
            var rect = ((RectTransform) transform).rect;
            Size = new Vector4(rect.width, rect.height, 0, 0);
            SetMaterialDirty();

            var mask = GetComponent<Mask>();
            if (mask) MaskUtilities.NotifyStencilStateChanged(mask);
        }
    }
}
