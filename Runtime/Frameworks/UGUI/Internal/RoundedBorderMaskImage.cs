using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Internal
{
#if (NET_STANDARD_2_0 && !NET_STANDARD_2_1) || (NET_4_6 && !UNITY_2021_2_OR_NEWER)
    using HashCode = ReactUnity.Helpers.HashCode;
#else
    using HashCode = System.HashCode;
#endif

    public class RoundedBorderMaskImage : Image
    {
        private struct ShaderProps
        {
            public Material BaseMaterial;
            public Vector4 BorderRadiusX;
            public Vector4 BorderRadiusY;
            public Vector4 BorderRadiusCuts;
            public Vector2 Size;

            public override bool Equals(object obj)
            {
                return obj is ShaderProps props &&
                       EqualityComparer<Material>.Default.Equals(BaseMaterial, props.BaseMaterial) &&
                       BorderRadiusX.Equals(props.BorderRadiusX) &&
                       BorderRadiusY.Equals(props.BorderRadiusY) &&
                       BorderRadiusCuts.Equals(props.BorderRadiusCuts) &&
                       Size.Equals(props.Size);
            }

            public override int GetHashCode()
            {
                return HashCode.Combine(BaseMaterial, BorderRadiusX, BorderRadiusY, BorderRadiusCuts, Size);
            }

            public void SetToMaterial(Material mat)
            {
                mat.SetVector(ShaderHelpers.BorderRadiusXProp, BorderRadiusX);
                mat.SetVector(ShaderHelpers.BorderRadiusYProp, BorderRadiusY);
                mat.SetVector(ShaderHelpers.BorderRadiusCutsProp, BorderRadiusCuts);
                mat.SetVector(ShaderHelpers.SizeProp, Size);
            }
        }

        static Dictionary<ShaderProps, Material> CachedMaterials = new Dictionary<ShaderProps, Material>();

        public YogaValue2[] BorderRadius = new YogaValue2[4];
        public Vector2 Size;

        protected override void OnEnable()
        {
            base.OnEnable();
            type = Type.Sliced;
            pixelsPerUnitMultiplier = 100;
            material = GetDefaultMaterial();
            SetMaterialDirty();
        }

        public virtual Material GetDefaultMaterial()
        {
            return ResourcesHelper.BorderRadiusMaterial;
        }

        public override Material materialForRendering
        {
            get
            {
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

                // Final sizes of corner border radii (horizontal)
                brx = new Vector4(
                    brx.x * pixelUnits.x / sz.x,
                    brx.y * pixelUnits.y / sz.x,
                    brx.z * pixelUnits.z / sz.x,
                    brx.w * pixelUnits.w / sz.x
                );

                // Final sizes of corner border radii (vertical)
                bry = new Vector4(
                    bry.x * pixelUnits.x / sz.y,
                    bry.y * pixelUnits.y / sz.y,
                    bry.z * pixelUnits.z / sz.y,
                    bry.w * pixelUnits.w / sz.y
                );

                // Ratio at which the region of the next corner begins - top, right, bottom, left
                var cutPoints = new Vector4(
                    1 - brx.y,
                    bry.z,
                    brx.w,
                    1 - bry.x
                );

                var props = new ShaderProps
                {
                    BaseMaterial = base.materialForRendering,
                    BorderRadiusX = brx,
                    BorderRadiusY = bry,
                    BorderRadiusCuts = cutPoints,
                    Size = Size,
                };

                if (!CachedMaterials.TryGetValue(props, out var result) || !result)
                {
                    result = new Material(props.BaseMaterial);
                    props.SetToMaterial(result);
                    CachedMaterials[props] = result;
                }

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
            Size = new Vector2(rect.width, rect.height);
            SetMaterialDirty();

            var mask = GetComponent<Mask>();
            if (mask) MaskUtilities.NotifyStencilStateChanged(mask);
        }
    }
}
