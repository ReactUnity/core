using ReactUnity.Editor.Renderer;
using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

namespace ReactUnity.Editor
{
    public class EditStyleWindow : ReactWindow
    {
        [MenuItem("React/Inspect Element")]
        public static void ShowDefaultWindow()
        {
            var wnd = GetWindow<EditStyleWindow>();
            wnd.titleContent = new GUIContent("React Edit Style");
        }


        protected override ReactScript GetScript()
        {
            var res = ReactScript.Resource("ReactUnity/editor/inspector/index");
            res.UseDevServer = false;
            return res;
        }
    }
}
