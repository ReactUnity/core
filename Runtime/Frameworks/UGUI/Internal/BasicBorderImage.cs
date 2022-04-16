using ReactUnity.Helpers;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.UI;

namespace ReactUnity.UGUI.Internal
{
    public class BasicBorderImage : RoundedBorderMaskImage
    {
        public Color TopColor;
        public Color RightColor;
        public Color BottomColor;
        public Color LeftColor;
        public Vector4 BorderSize;

        public RoundedBorderMaskImage InsetBorder;

        public override Material GetDefaultMaterial()
        {
            return Instantiate(ResourcesHelper.ColoredBorderMaterial);
        }

        public override Material materialForRendering
        {
            get
            {
                Material result = base.materialForRendering;
                result.SetInt("_StencilComp", (int) CompareFunction.Equal);
                result.SetInt("_StencilOp", (int) StencilOp.Zero);
                result.SetFloat("_Stencil", (int) result.GetFloat("_Stencil") >> 1);

                result.SetColor("_topColor", TopColor);
                result.SetColor("_rightColor", RightColor);
                result.SetColor("_bottomColor", BottomColor);
                result.SetColor("_leftColor", LeftColor);
                result.SetVector(ShaderHelpers.BorderSizeProp, BorderSize);

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

                var brx = BorderRadiusX;
                var bry = BorderRadiusY;
                var sz = Size;
                brx = new Vector4(
                    Mathf.Max(0, brx.x < 1 ? brx.x * sz.x : brx.x),
                    Mathf.Max(0, brx.y < 1 ? brx.y * sz.x : brx.y),
                    Mathf.Max(0, brx.z < 1 ? brx.z * sz.x : brx.z),
                    Mathf.Max(0, brx.w < 1 ? brx.w * sz.x : brx.w)
                );

                bry = new Vector4(
                    Mathf.Max(0, bry.x < 1 ? bry.x * sz.y : bry.x),
                    Mathf.Max(0, bry.y < 1 ? bry.y * sz.y : bry.y),
                    Mathf.Max(0, bry.z < 1 ? bry.z * sz.y : bry.z),
                    Mathf.Max(0, bry.w < 1 ? bry.w * sz.y : bry.w)
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

                InsetBorder.BorderRadiusX = brx;
                InsetBorder.BorderRadiusY = bry;
                InsetBorder.SetMaterialDirty();
                var mask = InsetBorder.GetComponent<Mask>();
                if (mask) MaskUtilities.NotifyStencilStateChanged(mask);
            }
        }
    }
}
