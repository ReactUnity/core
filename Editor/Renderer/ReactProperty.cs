using ReactUnity.Types;
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
                return !EditorPrefs.GetBool($"ReactUnity.Editor.ReactProperty.{GetType().Name}.DevServerDisabled");
            }
            set
            {
                EditorPrefs.SetBool($"ReactUnity.Editor.ReactProperty.{GetType().Name}.DevServerDisabled", !value);
            }
        }
#endif

        public override VisualElement CreatePropertyGUI(SerializedProperty property)
        {
            return new ReactUnityElement(GetScript(), GetGlobals(property));
        }

        protected abstract ReactScript GetScript();

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
