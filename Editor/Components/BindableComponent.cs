using ReactUnity.Editor.Renderer;
using ReactUnity.Interop;
using System;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Components
{
    public class BindableComponent<TElementType> : EditorComponent<TElementType> where TElementType : VisualElement, IBindable, new()
    {
        public BindableComponent(EditorContext context, string tag) : base(context, tag)
        {
        }

        public override void SetProperty(string property, object value)
        {
            if (property == "bindingPath") Element.bindingPath = value?.ToString();
            else if (property == "binding") Element.binding = value as IBinding;
            else base.SetProperty(property, value);
        }
    }
}
