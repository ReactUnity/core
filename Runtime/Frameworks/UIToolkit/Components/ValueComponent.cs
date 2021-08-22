#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT)
#define REACT_CLEARSCRIPT
#endif

using System;
using ReactUnity.Helpers;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class ValueComponent<TElementType, TValueType> : BindableComponent<TElementType> where TElementType : VisualElement, IBindable, INotifyValueChanged<TValueType>, new()
    {
        public ValueComponent(UIToolkitContext context, string tag) : base(context, tag)
        {
        }

        public override Action AddEventListener(string eventName, Callback callback)
        {
            switch (eventName)
            {
                case "onChange":
                    EventCallback<ChangeEvent<TValueType>> listener = (ev) => callback.Call(ev, this);
                    Element.RegisterValueChangedCallback(listener);
                    return () => Element.UnregisterValueChangedCallback(listener);
                default:
                    return base.AddEventListener(eventName, callback);
            }
        }

        public override void SetProperty(string property, object value)
        {
            if (property == "value") Element.SetValueWithoutNotify(ConvertValue(value));
            else base.SetProperty(property, value);
        }

        public TValueType ConvertValue(object value)
        {
            if (value == null) return default;
#if REACT_CLEARSCRIPT
            if (value == Microsoft.ClearScript.Undefined.Value) return default;
#endif
            if (value is TValueType val) return val;
            return (TValueType) Convert.ChangeType(value, typeof(TValueType));
        }

        public void SetValue(TValueType value)
        {
            Element.value = value;
        }

        public void SetValueWithoutNotify(TValueType value)
        {
            Element.SetValueWithoutNotify(value);
        }
    }
}
