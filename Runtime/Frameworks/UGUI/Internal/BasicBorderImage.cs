using ReactUnity.Helpers;
using UnityEngine;
using UnityEngine.Rendering;

namespace ReactUnity.UGUI.Internal
{
    public class BasicBorderImage : RoundedBorderMaskImage
    {
        public Color TopColor;
        public Color RightColor;
        public Color BottomColor;
        public Color LeftColor;

        public Vector4 BorderSize;

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
    }
}
