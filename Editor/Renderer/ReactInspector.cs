using ReactUnity.Editor.UIToolkit;
using ReactUnity.Helpers;
using ReactUnity.StyleEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer
{
    public abstract class ReactInspector : UnityEditor.Editor
    {
#if REACT_UNITY_DEVELOPER
        protected bool DevServerEnabled
        {
            get
            {
                return EditorPrefs.GetBool($"ReactUnity.Editor.ReactInspector.{GetType().Name}.DevServerEnabled");
            }
            set
            {
                EditorPrefs.SetBool($"ReactUnity.Editor.ReactInspector.{GetType().Name}.DevServerEnabled", value);
            }
        }
#endif

        public override VisualElement CreateInspectorGUI()
        {
            return new ReactUnityEditorElement(GetScript(), GetGlobals(), DefaultMediaProvider.CreateMediaProvider("inspector", "uitoolkit", true));
        }

        protected abstract ScriptSource GetScript();

        protected virtual GlobalRecord GetGlobals()
        {
            return new GlobalRecord()
            {
                { "Inspector", this },
            };
        }
    }
}
