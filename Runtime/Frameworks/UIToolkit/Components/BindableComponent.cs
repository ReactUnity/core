using UnityEngine.UIElements;

#if UNITY_EDITOR
using UnityEditor.UIElements;
#endif

namespace ReactUnity.UIToolkit
{
    public class BindableComponent<TElementType> : UIToolkitComponent<TElementType> where TElementType : VisualElement, IBindable, new()
    {
        public BindableComponent(UIToolkitContext context, string tag) : base(context, tag)
        {
        }

        public override void SetProperty(string property, object value)
        {
            if (property == "bindingPath") Element.bindingPath = value?.ToString();
            else if (property == "binding") Element.binding = value as IBinding;
#if UNITY_EDITOR
            else if (property == "bind")
            {
                if (value is UnityEditor.SerializedObject so) Element.BindProperty(so);
                else if (value is UnityEditor.SerializedProperty sp) Element.BindProperty(sp);
                else Element.Unbind();
            }
#endif
            else base.SetProperty(property, value);
        }
    }
}
