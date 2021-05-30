using UnityEngine;

namespace ReactUnity.Helpers
{
    internal static class ResourcesHelper
    {
        private static Sprite checkBoxSprite;
        public static Sprite CheckBoxSprite => checkBoxSprite ??= Resources.Load<Sprite>("ReactUnity/sprites/checkbox");

        private static Sprite checkSprite;
        public static Sprite CheckSprite => checkSprite ??= Resources.Load<Sprite>("ReactUnity/sprites/check");

        private static TextAsset useragentStylesheet;
        public static TextAsset UseragentStylesheet => useragentStylesheet ??= Resources.Load<TextAsset>("ReactUnity/styles/useragent");

        private static Material borderRadiusMaterial;
        public static Material BorderRadiusMaterial => borderRadiusMaterial ??= Resources.Load<Material>("ReactUnity/materials/RoundedBorder");

        private static Material coloredBorderMaterial;
        public static Material ColoredBorderMaterial => coloredBorderMaterial ??= Resources.Load<Material>("ReactUnity/materials/RoundedColoredBorder");

        private static Material boxShadowMaterial;
        public static Material BoxShadowMaterial => boxShadowMaterial ??= Resources.Load<Material>("ReactUnity/materials/RoundedBoxShadow");

        public static string InjectCode(string code)
        {
            var injectableText = Resources.Load<TextAsset>("ReactUnity/editor/injectable/index");
            var injectedText = injectableText.text.Replace("/*INJECT_CODE*/", code);

            return injectedText;
        }
    }
}
