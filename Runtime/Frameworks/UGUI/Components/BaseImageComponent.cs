using Facebook.Yoga;
using ReactUnity.UGUI.Behaviours;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{
    public abstract class BaseImageComponent : UGUIComponent
    {
        public ImageMeasurer Measurer { get; private set; }
        public GameObject ImageContainer { get; private set; }

        public abstract MaskableGraphic Graphic { get; }

        public ReactReplacedElement ReplacedElement { get; private set; }

        public BaseImageComponent(UGUIContext context, string tag) : base(context, tag)
        {
            ImageContainer = new GameObject();
            ImageContainer.name = "[ImageContent]";

            var replacedElementLayout = new YogaNode();
            Layout.AddChild(replacedElementLayout);

            var rt = ImageContainer.AddComponent<RectTransform>();
            var re = ReplacedElement = ImageContainer.AddComponent<ReactReplacedElement>();
            re.Layout = replacedElementLayout;

            rt.SetParent(GameObject.transform);
            rt.anchorMin = Vector2.zero;
            rt.anchorMax = Vector2.one;
            rt.sizeDelta = Vector2.zero;

            Measurer = ImageContainer.AddComponent<ImageMeasurer>();
            Measurer.Context = context;
            Measurer.Layout = replacedElementLayout;
            replacedElementLayout.SetMeasureFunction(Measurer.Measure);
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "source":
                    SetSource(value);
                    return;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }

        protected abstract void SetSource(object value);

        protected override void ApplyStylesSelf()
        {
            base.ApplyStylesSelf();
            var fitMode = ComputedStyle.objectFit;
            if (Measurer.FitMode != fitMode)
                Measurer.FitMode = fitMode;
            ReplacedElement.Position = ComputedStyle.objectPosition;
        }
    }
}
