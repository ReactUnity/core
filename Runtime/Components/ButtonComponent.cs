using Facebook.Yoga;
using Jint.Native.Function;
using ReactUnity.Interop;
using ReactUnity.Styling;
using System;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.Components
{

    public class ButtonComponent : ContainerComponent
    {
        public static NodeStyle ButtonDefaultStyle { get; } = new NodeStyle()
        {
            backgroundColor = new Color(0.9f, 0.9f, 0.9f),
            borderRadius = 8,
            cursor = "pointer",
            textAlign = TMPro.TextAlignmentOptions.Midline,
            appearance = Styling.Types.Appearance.Button,
        };
        public static YogaNode ButtonDefaultLayout { get; } = new YogaNode()
        {
            PaddingHorizontal = 12,
            PaddingVertical = 8,
            AlignItems = YogaAlign.Center,
            JustifyContent = YogaJustify.Center,
            FlexDirection = YogaFlexDirection.Row,
        };
        public override NodeStyle DefaultStyle => ButtonDefaultStyle;
        public override YogaNode DefaultLayout => ButtonDefaultLayout;

        public Button Button { get; private set; }


        public ButtonComponent(UnityUGUIContext context) : base(context, "button")
        {
            Button = AddComponent<Button>();
        }


        public override void SetEventListener(string eventName, Callback callback)
        {
            switch (eventName)
            {
                case "onClick":
                    Button.onClick.RemoveAllListeners();
                    if (callback != null) Button.onClick.AddListener(new UnityAction(() => callback.Call(null)));
                    return;
                default:
                    base.SetEventListener(eventName, callback);
                    return;
            }
        }
    }
}
