using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Styling;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{

    public class ToggleComponent : UGUIComponent
    {
        public static Dictionary<string, object> ToggleDefaultLayout { get; } = new Dictionary<string, object>
        {
            { "aspect-ratio", 1 },
            { "width", YogaValue.Point(24) },
            { "margin-horizontal", 6 },
            { "align-items", YogaAlign.Center },
            { "justify-content", YogaJustify.Center },
            { "flex-direction", YogaFlexDirection.Row },
        };
        public static NodeStyle ToggleDefaultStyle { get; } = new NodeStyle(ToggleDefaultLayout)
        {
            backgroundColor = new Color(0.82f, 0.82f, 0.82f, 1),
            borderRadius = 6f,
            cursor = CursorList.Pointer,
            appearance = Appearance.Toggle,
        };
        public override NodeStyle DefaultStyle => ToggleDefaultStyle;

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
