using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer.Styling
{
    internal static class EditorResourcesHelper
    {
        private static TextAsset useragentStylesheet;
        public static TextAsset UseragentStylesheet => useragentStylesheet ??= Resources.Load<TextAsset>("ReactUnity/editor/styles/useragent");

        private static VisualTreeAsset editorTester;
        public static VisualTreeAsset EditorTester => editorTester ??= Resources.Load<VisualTreeAsset>("ReactUnity/editor/EditorTester");

        private static StyleSheet editorTesterStyles;
        public static StyleSheet EditorTesterStyles => editorTesterStyles ??= Resources.Load<StyleSheet>("ReactUnity/editor/EditorTesterStyles");

        private static Font defaultFont;
        public static Font DefaultFont => defaultFont ??= Resources.Load<Font>("ReactUnity/fonts/sans-serif");
    }
}
