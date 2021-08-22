using System;
using ReactUnity.Helpers;
using UnityEngine.Events;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{

    public class ButtonComponent : UGUIComponent, IActivatableComponent
    {
        public Button Button { get; private set; }

        public bool Disabled
        {
            get => !Button.interactable;
            set
            {
                Button.interactable = !value;
                MarkForStyleResolving(true);
            }
        }

        public ButtonComponent(UGUIContext context) : base(context, "button")
        {
            Button = AddComponent<Button>();
        }


        public override Action AddEventListener(string eventName, Callback callback)
        {
            switch (eventName)
            {
                case "onClick":
                    var listener = new UnityAction(() => callback.Call(this));
                    Button.onClick.AddListener(listener);
                    return () => Button.onClick.RemoveListener(listener);
                default:
                    return base.AddEventListener(eventName, callback);
            }
        }

        public override void SetProperty(string propertyName, object value)
        {
            if (propertyName == "disabled") Disabled = System.Convert.ToBoolean(value);
            else base.SetProperty(propertyName, value);
        }

        public void Activate()
        {
            Button.onClick?.Invoke();
        }
    }
}
