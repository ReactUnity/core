using ReactUnity.UGUI.Behaviours;
using ReactUnity.UGUI.Measurers;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.UGUI
{
    public abstract class BaseImageComponent : UGUIComponent, IGraphicComponent
    {
        public ReplacedImageHelper Replaced { get; }

        public BaseImageComponent(UGUIContext context, string tag) : base(context, tag, false)
        {
            Replaced = new ReplacedImageHelper(this);
        }

        protected object source;
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
                case "src":
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
            var style = ComputedStyle;

            var fitMode = style.objectFit;
            if (Replaced.Measurer.FitMode != fitMode)
                Replaced.Measurer.FitMode = fitMode;
            Replaced.ReplacedElement.Position = style.objectPosition;

            Replaced.Graphic.color = style.color;

            Replaced.Graphic.raycastTarget = style.pointerEvents != Types.PointerEvents.None;
        }

        public override bool Pool()
        {
            if (!base.Pool()) return false;

            Source = null;
            return true;
        }

        public class ReplacedImageHelper
        {
            public GameObject GameObject { get; }
            public RectTransform RectTransform { get; }
            public ImageMeasurer Measurer { get; }
            public ReactReplacedElement ReplacedElement { get; }
            public MaskableGraphic Graphic { get; private set; }

            public ReplacedImageHelper(BaseImageComponent parent)
            {
                var go = GameObject = parent.Context.CreateNativeObject("[ImageContent]", typeof(RectTransform));
                var rt = RectTransform = go.GetComponent<RectTransform>();

                rt.SetParent(parent.RectTransform);

                ReplacedElement = go.AddComponent<ReactReplacedElement>();

                rt.anchorMin = Vector2.zero;
                rt.anchorMax = Vector2.one;
                rt.sizeDelta = Vector2.zero;

                ReplacedElement.Measurer = Measurer = go.AddComponent<ImageMeasurer>();
                Measurer.Context = parent.Context;

                Measurer.Layout = ReplacedElement.Layout = parent.Layout;
                parent.Layout.SetMeasureFunction(Measurer.Measure);
            }

            public T CreateGraphic<T>() where T : MaskableGraphic
            {
                var res = GameObject.AddComponent<T>();
                Graphic = res;
                return res;
            }
        }
    }
}
