using ReactUnity.Editor.Renderer;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Components
{
    public class ToggleComponent<T> : BaseFieldComponent<T, bool> where T : Toggle, new()
    {
        public ToggleComponent(EditorContext context, string tag) : base(context, tag)
        { }

        public override void SetProperty(string property, object value)
        {
            if (property == "text") Element.text = value?.ToString();
            else base.SetProperty(property, value);
        }
    }
}
