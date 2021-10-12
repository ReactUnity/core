using ReactUnity.Editor.UIToolkit;
using ReactUnity.Helpers;
using ReactUnity.Styling.Rules;
using UnityEditor;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer
{
    public abstract class ReactProperty : PropertyDrawer
    {
#if REACT_UNITY_DEVELOPER
        protected bool DevServerEnabled
        {
            get
            {
                return EditorPrefs.GetBool($"ReactUnity.Editor.ReactProperty.{GetType().Name}.DevServerEnabled");
            }
            set
            {
                EditorPrefs.SetBool($"ReactUnity.Editor.ReactProperty.{GetType().Name}.DevServerEnabled", value);
            }
        }
#endif

        public override VisualElement CreatePropertyGUI(SerializedProperty property)
        {
            var el = new ReactUnityEditorElement(GetScript(), GetGlobals(property), null, DefaultMediaProvider.CreateMediaProvider("property", "uitoolkit", true));
            el.Property = this;
            el.Run();
            return el;
        }

        protected abstract ScriptSource GetScript();

        protected virtual GlobalRecord GetGlobals(SerializedProperty property)
        {
            return new GlobalRecord()
            {
                { "Property", property },
                { "Drawer", this },
            };
        }
    }
}
