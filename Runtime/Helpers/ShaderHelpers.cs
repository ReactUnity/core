using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Helpers
{
    internal static class ShaderHelpers
    {
        public static readonly int BorderRadiusProp = Shader.PropertyToID("_borderRadius");
        public static readonly int SizeProp = Shader.PropertyToID("_size");
    }
}
