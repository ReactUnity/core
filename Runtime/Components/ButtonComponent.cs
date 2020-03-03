using Facebook.Yoga;
using ReactUnity.Styling;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.Components
{

    public class ButtonComponent : ContainerComponent
    {
        public static NodeStyle ButtonDefaultStyle { get; } = new NodeStyle() { backgroundColor = new Color(0.9f, 0.9f, 0.9f), borderRadius = 8 };
        public static YogaNode ButtonDefaultLayout { get; } = new YogaNode() { PaddingHorizontal = 12, PaddingVertical = 8 };
        public override NodeStyle DefaultStyle => ButtonDefaultStyle;
        public override YogaNode DefaultLayout => ButtonDefaultLayout;

        public Button Button { get; private set; }


        public ButtonComponent(UnityUGUIContext context) : base(context)
        {
            Button = GameObject.AddComponent<Button>();
            Selectable = Button;
        }

        public void setButtonOnClick(System.Action callback)
        {
            Button.onClick.RemoveAllListeners();
            if (callback != null) Button.onClick.AddListener(new UnityAction(callback));
        }
    }
}
