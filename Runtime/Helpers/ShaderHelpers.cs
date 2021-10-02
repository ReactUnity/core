using UnityEngine;

namespace ReactUnity.Helpers
{
    internal static class ShaderHelpers
    {
        public static readonly int MainTexProp = Shader.PropertyToID("_MainTex");
        public static readonly int BorderRadiusProp = Shader.PropertyToID("_borderRadius");
        public static readonly int BorderSizeProp = Shader.PropertyToID("_borderSize");
        public static readonly int SizeProp = Shader.PropertyToID("_size");
    }
}
