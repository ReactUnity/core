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

    public class ButtonComponent : UGUIComponent
    {
        public static Dictionary<string, object> DefaultLayout { get; } = new Dictionary<string, object>
        {
            { "padding-horizontal", 12 },
            { "padding-vertical", 8 },
            { "align-items", YogaAlign.Center },
            { "justify-content", YogaJustify.Center },
            { "flex-direction", YogaFlexDirection.Row },
        };

        public static NodeStyle ButtonDefaultStyle { get; } = new NodeStyle(null, DefaultLayout)
        {
            backgroundColor = new Color(0.9f, 0.9f, 0.9f),
            borderRadius = 8f,
            cursor = CursorList.Pointer,
            textAlign = TMPro.TextAlignmentOptions.Midline,
            appearance = Appearance.Button,
        };

        public override NodeStyle DefaultStyle => ButtonDefaultStyle;

        public Button Button { get; private set; }


        public ButtonComponent(UGUIContext context) : base(context, "button")
        {
            Button = AddComponent<Button>();
        }


        public override void SetEventListener(string eventName, Callback callback)
        {
            switch (eventName)
            {
                case "onClick":
                    Button.onClick.RemoveAllListeners();
                    if (callback != null) Button.onClick.AddListener(new UnityAction(() => callback.Call(this)));
                    return;
                default:
                    base.SetEventListener(eventName, callback);
                    return;
            }
        }
    }
}
