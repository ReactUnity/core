using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Types;
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
