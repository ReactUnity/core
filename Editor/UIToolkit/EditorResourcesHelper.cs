using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.UIToolkit
{
    internal static class EditorResourcesHelper
    {

        private static VisualTreeAsset editorTester;
        public static VisualTreeAsset EditorTester => editorTester = editorTester ?? Resources.Load<VisualTreeAsset>("ReactUnity/editor/EditorTester");

        private static StyleSheet editorTesterStyles;
        public static StyleSheet EditorTesterStyles => editorTesterStyles = editorTesterStyles ?? Resources.Load<StyleSheet>("ReactUnity/editor/EditorTesterStyles");
    }
}
