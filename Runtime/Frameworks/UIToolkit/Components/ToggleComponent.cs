using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class ToggleComponent<T> : BaseFieldComponent<T, bool>, IToggleComponent where T : Toggle, new()
    {
        public ToggleComponent(UIToolkitContext context, string tag) : base(context, tag)
        { }

        public bool Checked
        {
            get => Value;
            set => Value = value;
        }

        public override void SetProperty(string property, object value)
        {
            if (property == "text") Element.text = value?.ToString();
            else base.SetProperty(property, value);
        }
    }
}
