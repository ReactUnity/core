using UnityEngine;

namespace ReactUnity.UGUI.Shapes
{
    [System.Serializable]
    public class WebOutlineProperties
    {
        public Color TopColor = Color.black;
        public Color RightColor = Color.black;
        public Color BottomColor = Color.black;
        public Color LeftColor = Color.black;

        [Min(0)] public float TopWidth = 0;
        [Min(0)] public float RightWidth = 0;
        [Min(0)] public float BottomWidth = 0;
        [Min(0)] public float LeftWidth = 0;
    }
}
