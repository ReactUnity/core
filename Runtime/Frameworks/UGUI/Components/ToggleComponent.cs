using System;
using ReactUnity.Helpers;
using UnityEngine.Events;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{
    public class ToggleComponent : UGUIComponent, IToggleComponent
    {
        public object Value { get; set; }

        public Toggle Toggle { get; private set; }

        public bool Checked
        {
            get => Toggle.isOn;
            set
            {
                Toggle.SetIsOnWithoutNotify(value);
                MarkForStyleResolving(true);
            }
        }

        private bool indeterminate;
        public bool Indeterminate
        {
            get => indeterminate;
            set
            {
                indeterminate = value;
                MarkForStyleResolving(true);
            }
        }
        public bool Disabled
        {
            get => !Toggle.interactable;
            set
            {
                Toggle.interactable = !value;
                MarkForStyleResolving(true);
            }
        }

        public ToggleComponent(UGUIContext context) : base(context, "toggle")
        {
            Toggle = AddComponent<Toggle>();
            Toggle.onValueChanged.AddListener(x => MarkForStyleResolving(true));
        }

        public void Focus()
        {
            Toggle.Select();
        }

        protected override void ApplyLayoutStylesSelf()
        {
            base.ApplyLayoutStylesSelf();
        }

        public override Action AddEventListener(string eventName, Callback callback)
        {
            switch (eventName)
            {
                case "onChange":
                    var listener = new UnityAction<bool>((x) => callback.Call(x, this));
                    Toggle.onValueChanged.AddListener(listener);
                    return () => Toggle.onValueChanged.RemoveListener(listener);
                default:
                    return base.AddEventListener(eventName, callback);
            }
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "value":
                    Value = value;
                    return;
                case "checked":
                    Checked = Convert.ToBoolean(value);
                    return;
                case "indeterminate":
                    Indeterminate = Convert.ToBoolean(value);
                    return;
                case "disabled":
                    Disabled = Convert.ToBoolean(value);
                    return;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }

        public void Activate()
        {
            Toggle.isOn = !Toggle.isOn;
        }
    }
}
