using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.UI;

namespace ReactUnity.Styling
{
    public class IgnoreMaskImage : Image
    {
        public override Material materialForRendering
        {
            get
            {
                Material result = new Material(base.materialForRendering);
                result.SetInt("_StencilComp", (int)CompareFunction.Always);
                return result;
            }
        }
    }
}
