using Facebook.Yoga;
using Jint.Native.Function;
using ReactUnity.Helpers;
using ReactUnity.Styling;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.Components
{

    public class ToggleComponent : ContainerComponent
    {
        public static NodeStyle ToggleDefaultStyle { get; } = new NodeStyle()
        {
            backgroundColor = Color.white,
            borderColor = new Color(0.4f, 0.4f, 0.4f, 1),
            borderRadius = 6,
            //backgroundImage = ResourcesHelper.CheckBoxSprite,
        };
        public static YogaNode ToggleDefaultLayout { get; } = new YogaNode()
        {
            AspectRatio = 1,
            Width = 30,
            BorderWidth = 3,
            MarginHorizontal = 6,
            Padding = 0,
            AlignItems = YogaAlign.Center,
            JustifyContent = YogaJustify.Center,
            FlexDirection = YogaFlexDirection.Row
        };
        public override NodeStyle DefaultStyle => ToggleDefaultStyle;
        public override YogaNode DefaultLayout => ToggleDefaultLayout;

        public bool Value
        {
            get => Toggle.isOn;
            set => Toggle.SetIsOnWithoutNotify(value);
        }

        public Toggle Toggle { get; private set; }
        public ImageComponent Check { get; private set; }


        public ToggleComponent(UnityUGUIContext context) : base(context)
        {
            Toggle = GameObject.AddComponent<Toggle>();
            Selectable = Toggle;

            Check = new ImageComponent(context);
            Check.SetProperty("source", ResourcesHelper.CheckSprite);
            Check.SetProperty("fit", ImageFitMode.FitCenter);
            Check.SetParent(this);

            Toggle.graphic = Check.Image;
        }

        public void Focus()
        {
            Toggle.Select();
        }


        public override void SetEventListener(string eventName, FunctionInstance callback)
        {
            switch (eventName)
            {
                case "onChange":
                    Toggle.onValueChanged.RemoveAllListeners();
                    if (callback != null) Toggle.onValueChanged.AddListener(new UnityAction<bool>((x) => callback.Invoke(x)));
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