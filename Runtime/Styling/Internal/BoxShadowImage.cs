using ReactUnity.Helpers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.Rendering;

namespace ReactUnity.Styling.Internal
{
    public class BoxShadowImage : RoundedBorderMaskImage
    {
        public BoxShadow Shadow;

        public Vector4 BorderSize;

        public override Material GetDefaultMaterial()
        {
            return Instantiate(ResourcesHelper.BoxShadowMaterial);
        }

        public override Material materialForRendering
        {
            get
            {
                Material result = base.materialForRendering;
                result.SetInt("_StencilComp", (int) (Shadow.inset ? CompareFunction.Equal : CompareFunction.Always));
                result.SetVector("_blurRadius", Shadow.blur);
                result.SetFloat("_inset", Shadow.inset ? 1 : 0);
                result.SetVector("_spread", Shadow.inset ? Shadow.spread - Shadow.blur : Vector2.zero);
                result.SetVector("_offset", Shadow.inset ? Shadow.offset : Vector2.zero);

                return result;
            }
        }
    }
}
