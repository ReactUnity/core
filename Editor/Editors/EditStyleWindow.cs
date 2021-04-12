using ReactUnity.Editor.Renderer;
using UnityEditor;
using UnityEngine;

namespace ReactUnity.Editor
{
    public class EditStyleWindow : ReactWindow
    {
        [MenuItem("React/Show Inspector")]
        public static void ShowDefaultWindow()
        {
            var window = GetWindow<EditStyleWindow>();
            window.titleContent = new GUIContent("React Inspector");
        }

        protected override ReactScript GetScript()
        {
            var res = ReactScript.Resource("ReactUnity/editor/inspector/index");
#if REACT_UNITY_DEVELOPER
            res.DevServer = "http://localhost:4000";
            res.UseDevServer = true;
#endif
            return res;
        }
    }
}
