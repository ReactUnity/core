using UnityEngine;

namespace ReactUnity.Helpers
{
    internal static class ShaderHelpers
    {
        public static readonly int MainTexProp = Shader.PropertyToID("_MainTex");
        public static readonly int BorderRadiusXProp = Shader.PropertyToID("_borderRadiusX");
        public static readonly int BorderRadiusYProp = Shader.PropertyToID("_borderRadiusY");
        public static readonly int BorderRadiusCutsProp = Shader.PropertyToID("_borderRadiusCuts");
        public static readonly int BorderSizeProp = Shader.PropertyToID("_borderSize");
        public static readonly int SizeProp = Shader.PropertyToID("_size");
        public static readonly int InsetSizeProp = Shader.PropertyToID("_insetSize");
    }
}
