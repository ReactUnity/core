using ReactUnity.Editor.Renderer;
using ReactUnity.Helpers;
using ReactUnity.Styling;
using System;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Components
{
    public class ValueComponent<TElementType, TValueType> : BindableComponent<TElementType> where TElementType : VisualElement, IBindable, INotifyValueChanged<TValueType>, new()
    {
        private EventCallback<ChangeEvent<TValueType>> previousChangeEvent;

        public ValueComponent(EditorContext context, string tag) : base(context, tag)
        {
        }

        public override void SetEventListener(string eventName, Callback callback)
        {
            switch (eventName)
            {
                case "onChange":
                    if (previousChangeEvent != null)
                    {
                        Element.UnregisterValueChangedCallback(previousChangeEvent);
                        previousChangeEvent = null;
                    }
                    if (callback != null) Element.RegisterValueChangedCallback(previousChangeEvent = (ev) => callback.Call(ev, this));
                    return;
                default:
                    base.SetEventListener(eventName, callback);
                    return;
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
            if (value == Microsoft.ClearScript.Undefined.Value) return default;
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
