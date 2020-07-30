using System;
using UnityEngine;

namespace ReactUnity.Styling.Types
{
    [Serializable]
    public class ShadowDefinition
    {
        public Vector2 offset;
        public Vector2 spread;
        public Color color = Color.black;
        public float blur;

        public ShadowDefinition() { }

        public ShadowDefinition(Vector2 offset, Vector2 spread, Color color, float blur)
        {
            this.offset = offset;
            this.spread = spread;
            this.color = color;
            this.blur = blur;
        }
    }
}
