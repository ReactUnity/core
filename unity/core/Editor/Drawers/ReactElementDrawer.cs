using ReactUnity.UGUI.Behaviours;
using UnityEditor;
using UnityEngine;

namespace ReactUnity.Editor
{
    [CustomEditor(typeof(ReactElement))]
    public class ReactElementDrawer : UnityEditor.Editor
    {
        public override void OnInspectorGUI()
        {
            base.OnInspectorGUI();

            if (GUILayout.Button("Edit Style"))
            {
                if (EditorWindow.HasOpenInstances<DevToolsWindow>())
                    EditorWindow.FocusWindowIfItsOpen<DevToolsWindow>();
                else DevToolsWindow.ShowDefaultWindow();
            }
        }
    }
}
