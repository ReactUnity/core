using ReactUnity.Editor.Renderer;
using ReactUnity.Interop;
using System;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Components
{
    public class BaseFieldComponent<TElementType, TValueType> : EditorComponent<TElementType> where TElementType : BaseField<TValueType>, new()
    {
        private EventCallback<ChangeEvent<TValueType>> previousChangeEvent;

        public BaseFieldComponent(EditorContext context, string tag) : base(context, tag)
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
            if (property == "value") Element.SetValueWithoutNotify((TValueType)Convert.ChangeType(value, typeof(TValueType)));
            else if (property == "label") Element.label = value?.ToString();
            else if (property == "bindingPath") Element.bindingPath = value?.ToString();
            else if (property == "binding") Element.binding = value as IBinding;
            else base.SetProperty(property, value);
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
