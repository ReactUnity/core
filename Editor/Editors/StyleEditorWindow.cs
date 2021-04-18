using ReactUnity.Editor.Renderer;
using ReactUnity.Helpers.TypescriptUtils;
using UnityEditor;
using UnityEngine;

namespace ReactUnity.Editor
{
    [TypescriptInclude]
    internal class StyleEditorWindow : ReactWindow
    {
        [MenuItem("React/Show Style Editor")]
        public static void ShowDefaultWindow()
        {
            var window = GetWindow<StyleEditorWindow>();
            window.titleContent = new GUIContent("React Style Editor");
        }

        protected override ReactScript GetScript()
        {
            var res = ReactScript.Resource("ReactUnity/editor/style-editor/index");
#if REACT_UNITY_DEVELOPER
            res.DevServer = "http://localhost:4000";
            res.UseDevServer = DevServerEnabled;
#endif
            return res;
        }
    }
}
