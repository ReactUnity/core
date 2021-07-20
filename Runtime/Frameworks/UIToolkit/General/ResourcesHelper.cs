using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public static class ResourcesHelper
    {
        public const string UtilityCursorClassPrefix = "react-unity_cursor_";

        private static Font defaultFont;
        public static Font DefaultFont => defaultFont ??= Resources.Load<Font>("ReactUnity/fonts/sans-serif");

        private static StyleSheet utilityStylesheet;
        public static StyleSheet UtilityStylesheet => utilityStylesheet ??= Resources.Load<StyleSheet>("ReactUnity/styles/uitoolkit/react-unity-utils");

        private static TextAsset useragentStylesheet;
        public static TextAsset UseragentStylesheet => useragentStylesheet ??= Resources.Load<TextAsset>("ReactUnity/styles/uitoolkit/useragent");
    }
}
