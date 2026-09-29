using UnityEngine;

namespace ReactUnity.UGUI.Shapes
{
    [System.Serializable]
    public class WebShadowProperties
    {
        public bool Inset = false;
        public Vector2 Offset = Vector2.zero;
        [MinAttribute(0.0f)] public float Blur = 0;
        public float Spread = 0;

        public bool ValueEquals(WebShadowProperties other) =>
            other != null && Inset == other.Inset && Offset == other.Offset && Blur == other.Blur && Spread == other.Spread;
    }
}
