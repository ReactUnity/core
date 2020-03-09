using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Helpers
{
    internal static class ResourcesHelper
    {
        private static Sprite boxShadowSprite;
        public static Sprite BoxShadowSprite => boxShadowSprite ?? (boxShadowSprite = Resources.Load<Sprite>("ReactUnity/boxShadow"));


        private static Sprite checkBoxSprite;
        public static Sprite CheckBoxSprite => checkBoxSprite ?? (checkBoxSprite = Resources.Load<Sprite>("ReactUnity/checkBox"));

        private static Sprite checkSprite;
        public static Sprite CheckSprite => checkSprite ?? (checkSprite = Resources.Load<Sprite>("ReactUnity/check"));
    }
}
