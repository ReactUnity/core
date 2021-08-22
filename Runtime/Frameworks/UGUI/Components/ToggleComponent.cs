using ReactUnity.Helpers;
using UnityEngine.Events;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{
    public class ToggleComponent : UGUIComponent, IToggleComponent
    {
        public bool Value
        {
            get => Toggle.isOn;
            set
            {
                Toggle.SetIsOnWithoutNotify(value);
                MarkForStyleResolving(true);
            }
        }

        public Toggle Toggle { get; private set; }

        public bool Checked
        {
            get => Value;
            set => Value = value;
        }

        private bool indeterminate;
        public bool Indeterminate
        {
            get => indeterminate;
            private set
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

        UnityAction<bool> ChangeListener;

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

        public override void SetEventListener(string eventName, Callback callback)
        {
            switch (eventName)
            {
                case "onChange":
                    if (ChangeListener != null)
                    {
                        Toggle.onValueChanged.RemoveListener(ChangeListener);
                        ChangeListener = null;
                    }

                    if (callback != null)
                    {
                        ChangeListener = new UnityAction<bool>((x) => callback.Call(x, this));
                        Toggle.onValueChanged.AddListener(ChangeListener);
                    }
                    return;
                default:
                    base.SetEventListener(eventName, callback);
                    return;
            }
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "value":
                    Value = System.Convert.ToBoolean(value);
                    return;
                case "indeterminate":
                    Indeterminate = System.Convert.ToBoolean(value);
                    return;
                case "disabled":
                    Disabled = System.Convert.ToBoolean(value);
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
