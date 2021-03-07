using ReactUnity.Interop;
using System;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer.Components
{
    public class EditorToggleComponent : EditorBaseFieldComponent<Toggle, bool>
    {
        public EditorToggleComponent(EditorContext context) : base(context, "toggle")
        { }

        public override void SetProperty(string property, object value)
        {
            if (property == "text") Element.text = value?.ToString();
            else base.SetProperty(property, value);
        }
    }
}
