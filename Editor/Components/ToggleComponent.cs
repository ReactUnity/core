using ReactUnity.Editor.Renderer;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Components
{
    public class ToggleComponent : BaseFieldComponent<Toggle, bool>
    {
        public ToggleComponent(EditorContext context) : base(context, "toggle")
        { }

        public override void SetProperty(string property, object value)
        {
            if (property == "text") Element.text = value?.ToString();
            else base.SetProperty(property, value);
        }
    }
}
