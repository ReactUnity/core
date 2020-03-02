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

        public Button button { get; private set; }


        public ButtonComponent() : base()
        {
            button = GameObject.AddComponent<Button>();
        }

        public void setButtonOnClick(System.Action callback)
        {
            button.onClick.RemoveAllListeners();
            if (callback != null) button.onClick.AddListener(new UnityAction(callback));
        }

        public override Graphic CreateBackgroundGraphic()
        {
            var image = base.CreateBackgroundGraphic();

            button.targetGraphic = image;

            return image;
        }
    }
}
