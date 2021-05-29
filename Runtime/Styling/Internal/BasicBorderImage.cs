using ReactUnity.Helpers;
using UnityEngine;
using UnityEngine.Rendering;

namespace ReactUnity.Styling.Internal
{
    public class BasicBorderImage : RoundedBorderMaskImage
    {
        public override Material GetDefaultMaterial()
        {
            return Instantiate(ResourcesHelper.BorderRadiusMaterial);
        }

        public override Material materialForRendering
        {
            get
            {
                Material result = base.materialForRendering;
                result.SetInt("_StencilComp", (int) CompareFunction.Equal);
                result.SetInt("_StencilOp", (int) StencilOp.Zero);
                result.SetFloat("_Stencil", (int) result.GetFloat("_Stencil") >> 1);
                return result;
            }
        }
    }
}
