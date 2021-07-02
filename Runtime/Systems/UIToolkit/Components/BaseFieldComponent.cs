using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class BaseFieldComponent<TElementType, TValueType> : ValueComponent<TElementType, TValueType> where TElementType : BaseField<TValueType>, new()
    {
        public BaseFieldComponent(UIToolkitContext context, string tag) : base(context, tag)
        {
        }

        public override void SetProperty(string property, object value)
        {
            if (property == "label") Element.label = value?.ToString();
            else base.SetProperty(property, value);
        }
    }
}
