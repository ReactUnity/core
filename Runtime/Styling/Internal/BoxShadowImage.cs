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
                result.SetInt("_StencilComp", (int) CompareFunction.Always);
                result.SetVector("_blurRadius", new Vector4(Shadow.blur.x, Shadow.blur.y, 0, 0));

                return result;
            }
        }
    }
}
