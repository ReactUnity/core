using UnityEngine;

namespace ReactUnity.Helpers
{
    internal static class ResourcesHelper
    {
        private static Sprite boxShadowSprite;
        public static Sprite BoxShadowSprite => boxShadowSprite ??= Resources.Load<Sprite>("ReactUnity/sprites/box-shadow");

        private static Sprite checkBoxSprite;
        public static Sprite CheckBoxSprite => checkBoxSprite ??= Resources.Load<Sprite>("ReactUnity/sprites/checkbox");

        private static Sprite checkSprite;
        public static Sprite CheckSprite => checkSprite ??= Resources.Load<Sprite>("ReactUnity/sprites/check");

        private static TextAsset useragentStylesheet;
        public static TextAsset UseragentStylesheet => useragentStylesheet ??= Resources.Load<TextAsset>("ReactUnity/styles/useragent");

        private static Material borderRadiusMaterial;
        public static Material BorderRadiusMaterial => borderRadiusMaterial ??= Resources.Load<Material>("ReactUnity/materials/RoundedBorder");

        public static string InjectCode(string code)
        {
            var injectableText = Resources.Load<TextAsset>("ReactUnity/editor/injectable/index");
            var injectedText = injectableText.text.Replace("/*INJECT_CODE*/", code);

            return injectedText;
        }
    }
}
