using Facebook.Yoga;
using ReactUnity.Styling;
using ReactUnity.UGUI.Behaviours;
using ReactUnity.UGUI.Internal;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{
    public abstract class BaseImageComponent : UGUIComponent
    {
        public ReplacedImageComponent Replaced { get; }

        public BaseImageComponent(UGUIContext context, string tag) : base(context, tag)
        {
            Replaced = new ReplacedImageComponent(context);
            Replaced.SetParent(this);
        }

        private object source;
        public object Source
        {
            get => source;
            set
            {
                if (source == value) return;
                source = value;
                SetSource(value);
            }
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "source":
                    Source = value;
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
            if (Replaced.Measurer.FitMode != fitMode)
                Replaced.Measurer.FitMode = fitMode;
            Replaced.ReplacedElement.Position = ComputedStyle.objectPosition;
        }
    }


    public class ReplacedImageComponent : UGUIComponent
    {
        protected override string DefaultName => $"[ImageContent]";

        public ImageMeasurer Measurer { get; }
        public ReactReplacedElement ReplacedElement { get; }
        public MaskableGraphic Graphic { get; private set; }

        public ReplacedImageComponent(UGUIContext context) : base(context, "_image", false)
        {
            IsPseudoElement = true;

            ReplacedElement = GetOrAddComponent<ReactReplacedElement>();
            ReplacedElement.Layout = Layout;

            RectTransform.anchorMin = Vector2.zero;
            RectTransform.anchorMax = Vector2.one;
            RectTransform.sizeDelta = Vector2.zero;

            Measurer = GetOrAddComponent<ImageMeasurer>();
            Measurer.Context = context;
            Measurer.Layout = Layout;
            Layout.SetMeasureFunction(Measurer.Measure);
        }

        public T CreateGraphic<T>() where T : MaskableGraphic
        {
            var res = GetOrAddComponent<T>();
            Graphic = res;
            return res;
        }

        protected override void ApplyStylesSelf()
        {
            base.ApplyStylesSelf();

            var graphic = GameObject.GetComponent<Graphic>();
            if (graphic) graphic.color = ComputedStyle.HasValue(StyleProperties.backgroundColor) ?
                    ComputedStyle.backgroundColor : Color.white;
        }

        protected override void ApplyLayoutStylesSelf() { }

        protected override void ResolveTransform() { }

        public override BorderAndBackground UpdateBackgroundGraphic(bool updateLayout, bool updateStyle) => null;
    }
}
