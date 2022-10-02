using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Internal
{
#if NET_STANDARD_2_0 && !NET_STANDARD_2_1
    using HashCode = ReactUnity.Helpers.HashCode;
#else
    using HashCode = System.HashCode;
#endif

    public class BasicBorderImage : RoundedBorderMaskImage
    {
        private struct ShaderProps
        {
            public Material BaseMaterial;
            public Color TopColor;
            public Color RightColor;
            public Color BottomColor;
            public Color LeftColor;
            public Vector4 BorderSize;
            public int Stencil;

            public override bool Equals(object obj)
            {
                return obj is ShaderProps props &&
                       EqualityComparer<Material>.Default.Equals(BaseMaterial, props.BaseMaterial) &&
                       TopColor.Equals(props.TopColor) &&
                       RightColor.Equals(props.RightColor) &&
                       BottomColor.Equals(props.BottomColor) &&
                       LeftColor.Equals(props.LeftColor) &&
                       BorderSize.Equals(props.BorderSize) &&
                       Stencil == props.Stencil;
            }

            public override int GetHashCode()
            {
                return HashCode.Combine(BaseMaterial, TopColor, RightColor, BottomColor, LeftColor, BorderSize, Stencil);
            }

            public void SetToMaterial(Material mat)
            {
                mat.SetInt("_StencilComp", (int) CompareFunction.Equal);
                mat.SetInt("_StencilOp", (int) StencilOp.Zero);
                mat.SetFloat("_Stencil", Stencil);
                mat.SetColor("_topColor", TopColor);
                mat.SetColor("_rightColor", RightColor);
                mat.SetColor("_bottomColor", BottomColor);
                mat.SetColor("_leftColor", LeftColor);
                mat.SetVector(ShaderHelpers.BorderSizeProp, BorderSize);

            }
        }

        static Dictionary<ShaderProps, Material> CachedMaterials = new Dictionary<ShaderProps, Material>();

        public Color TopColor;
        public Color RightColor;
        public Color BottomColor;
        public Color LeftColor;
        public Vector4 BorderSize;

        public RoundedBorderMaskImage InsetBorder;

        public override Material GetDefaultMaterial()
        {
            return ResourcesHelper.ColoredBorderMaterial;
        }

        public override Material materialForRendering
        {
            get
            {
                Material baseMat = base.materialForRendering;
                var stencil = (int) baseMat.GetFloat("_Stencil") >> 1;

                var props = new ShaderProps
                {
                    BaseMaterial = baseMat,
                    TopColor = TopColor,
                    RightColor = RightColor,
                    BottomColor = BottomColor,
                    LeftColor = LeftColor,
                    BorderSize = BorderSize,
                    Stencil = stencil,
                };

                if (!CachedMaterials.TryGetValue(props, out var result) || !result)
                {
                    result = new Material(baseMat);
                    props.SetToMaterial(result);
                    CachedMaterials[props] = result;
                }

                return result;
            }
        }

        protected override void RefreshSize()
        {
            base.RefreshSize();

            RefreshInsetBorder();
        }

        internal void RefreshInsetBorder()
        {
            if (InsetBorder != null)
            {

                var br = BorderRadius;
                var sz = Size;
                var brx = new Vector4(
                    Mathf.Max(0, br[0].X.Unit == YogaUnit.Percent ? br[0].X.Value * sz.x / 100 : br[0].X.Value),
                    Mathf.Max(0, br[1].X.Unit == YogaUnit.Percent ? br[1].X.Value * sz.x / 100 : br[1].X.Value),
                    Mathf.Max(0, br[2].X.Unit == YogaUnit.Percent ? br[2].X.Value * sz.x / 100 : br[2].X.Value),
                    Mathf.Max(0, br[3].X.Unit == YogaUnit.Percent ? br[3].X.Value * sz.x / 100 : br[3].X.Value)
                );

                var bry = new Vector4(
                    Mathf.Max(0, br[0].Y.Unit == YogaUnit.Percent ? br[0].Y.Value * sz.y / 100 : br[0].Y.Value),
                    Mathf.Max(0, br[1].Y.Unit == YogaUnit.Percent ? br[1].Y.Value * sz.y / 100 : br[1].Y.Value),
                    Mathf.Max(0, br[2].Y.Unit == YogaUnit.Percent ? br[2].Y.Value * sz.y / 100 : br[2].Y.Value),
                    Mathf.Max(0, br[3].Y.Unit == YogaUnit.Percent ? br[3].Y.Value * sz.y / 100 : br[3].Y.Value)
                );

                brx = new Vector4(
                    Mathf.Ceil(brx.x - BorderSize.w),
                    Mathf.Ceil(brx.y - BorderSize.y),
                    Mathf.Ceil(brx.z - BorderSize.y),
                    Mathf.Ceil(brx.w - BorderSize.w)
                );

                bry = new Vector4(
                    Mathf.Ceil(bry.x - BorderSize.x),
                    Mathf.Ceil(bry.y - BorderSize.x),
                    Mathf.Ceil(bry.z - BorderSize.z),
                    Mathf.Ceil(bry.w - BorderSize.z)
                );

                InsetBorder.BorderRadius = new YogaValue2[4] {
                    YogaValue2.Point(brx.x, bry.x),
                    YogaValue2.Point(brx.y, bry.y),
                    YogaValue2.Point(brx.z, bry.z),
                    YogaValue2.Point(brx.w, bry.w),
                };
                InsetBorder.SetMaterialDirty();
                var mask = InsetBorder.GetComponent<Mask>();
                if (mask) MaskUtilities.NotifyStencilStateChanged(mask);
            }
        }
    }
}
