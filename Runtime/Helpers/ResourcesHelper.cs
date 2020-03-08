using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Helpers
{
    internal static class ResourcesHelper
    {
        private static Sprite boxShadowSprite;

        public static Sprite BoxShadowSprite => boxShadowSprite ?? (boxShadowSprite = Resources.Load<Sprite>("ReactUnity/boxShadow"));
    }
}
