using System;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class BaseFieldComponent<TElementType, TValueType> : ValueComponent<TElementType, TValueType> where TElementType : BaseField<TValueType>, new()
    {
#if UNITY_2021_1_OR_NEWER
        public bool Indeterminate
        {
            get => Element.showMixedValue;
            set => Element.showMixedValue = value;
        }
#else
        public bool Indeterminate
        {
            get => false;
            set { }
        }
#endif

        public BaseFieldComponent(UIToolkitContext context, string tag) : base(context, tag)
        {
        }

        public override void SetProperty(string property, object value)
        {
            if (property == "label") Element.label = value?.ToString();
            else if (property == "indeterminate") Indeterminate = Convert.ToBoolean(value);
            else base.SetProperty(property, value);
        }
    }

    public class StringValueComponent<TElementType> : BaseFieldComponent<TElementType, string>, IInputComponent where TElementType : TextInputBaseField<string>, new()
    {
        public StringValueComponent(UIToolkitContext context, string tag) : base(context, tag)
        {

        }

        public bool ReadOnly
        {
            get => Element.isReadOnly;
            set => Element.isReadOnly = value;
        }

        public bool PlaceholderShown => false;

        public override void SetProperty(string property, object value)
        {
            if (property == "readOnly") ReadOnly = Convert.ToBoolean(value);
            else if (property == "maskChar") Element.maskChar = Convert.ToChar(value);
            else if (property == "maxLength") Element.maxLength = Convert.ToInt32(value);
            else if (property == "password") Element.isPasswordField = Convert.ToBoolean(value);
            else if (property == "delayed") Element.isDelayed = Convert.ToBoolean(value);
            else base.SetProperty(property, value);
        }

        public void SelectAll() => Element.SelectAll();
    }

    public class TextFieldComponent : StringValueComponent<TextField>
    {
        public TextFieldComponent(UIToolkitContext context, string tag) : base(context, tag)
        {
        }

        public bool Multiline
        {
            get => Element.multiline;
            set => Element.multiline = value;
        }

        public override void SetProperty(string property, object value)
        {
            if (property == "multiline") Multiline = Convert.ToBoolean(value);
            else base.SetProperty(property, value);
        }

        public void SelectRange(int rangeCursorIndex, int selectionIndex) => Element.SelectRange(rangeCursorIndex, selectionIndex);
    }
}
