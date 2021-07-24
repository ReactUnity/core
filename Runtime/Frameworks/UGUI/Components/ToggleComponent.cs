using ReactUnity.Helpers;
using UnityEngine.Events;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{

    public class ToggleComponent : UGUIComponent
    {
        public bool Value
        {
            get => Toggle.isOn;
            set => Toggle.SetIsOnWithoutNotify(value);
        }

        public Toggle Toggle { get; private set; }
        public ImageComponent Check { get; private set; }


        public ToggleComponent(UGUIContext context) : base(context, "toggle")
        {
            Toggle = AddComponent<Toggle>();

            Check = new ImageComponent(context, "_toggle-image");
            Check.SetProperty("source", ResourcesHelper.CheckSprite);
            Check.SetParent(this);

            Toggle.graphic = Check.Image;
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
                    Toggle.onValueChanged.RemoveAllListeners();
                    if (callback != null) Toggle.onValueChanged.AddListener(new UnityAction<bool>((x) => callback.Call(x, this)));
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
                    Toggle.SetIsOnWithoutNotify(System.Convert.ToBoolean(value));
                    return;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }
    }
}
