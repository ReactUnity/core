using ReactUnity.Helpers;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.UI;

namespace ReactUnity.Styling.Internal
{
    public class BoxShadowImage : RoundedBorderMaskImage
    {
        public Transform MaskRoot;
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
                if (Shadow == null) return result;

                if (Shadow.inset)
                {
                    result.SetInt("_StencilComp", (int) CompareFunction.Equal);
                }
                else
                {
                    var depth = MaskUtilities.GetStencilDepth(MaskRoot, MaskRoot.GetComponentInParent<Canvas>()?.transform ?? MaskRoot.root);
                    var id = 0;
                    for (int i = 0; i < depth; i++) id |= 1 << i;

                    result.SetInt("_StencilReadMask", id);
                    result.SetInt("_StencilComp", (int) CompareFunction.LessEqual);
                }

                result.SetVector("_blurRadius", Shadow.blur);
                result.SetFloat("_inset", Shadow.inset ? 1 : 0);
                result.SetVector("_spread", Shadow.inset ? Shadow.spread - Shadow.blur : Vector2.zero);
                result.SetVector("_offset", Shadow.inset ? Shadow.offset : Vector2.zero);
                return result;
            }
        }
    }
}
