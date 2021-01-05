using Facebook.Yoga;
using ReactUnity.Layout;
using ReactUnity.Styling;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Components
{
    public class ImageComponent : ContainerComponent
    {
        public static NodeStyle ImageDefaultStyle { get; } = new NodeStyle() { };
        public static YogaNode ImageDefaultLayout { get; } = new YogaNode() { Overflow = YogaOverflow.Hidden, AlignItems = YogaAlign.Center, JustifyContent = YogaJustify.Center };
        public override NodeStyle DefaultStyle => ImageDefaultStyle;
        public override YogaNode DefaultLayout => ImageDefaultLayout;

        public ImageMeasurer Measurer { get; private set; }
        public ContainerComponent ImageContainer { get; private set; }
        public Image Image { get; private set; }

        public ImageFitMode Fit { get; private set; }

        public ImageComponent(UnityUGUIContext context) : base(context, "image")
        {
            ImageContainer = new ContainerComponent(context, "");
            ImageContainer.GameObject.name = "[ImageContent]";
            Image = ImageContainer.GameObject.AddComponent<Image>();

            Measurer = ImageContainer.GameObject.AddComponent<ImageMeasurer>();
            Measurer.Context = context;
            Measurer.Layout = ImageContainer.Layout;
            Measurer.Component = this;
            ImageContainer.Layout.SetMeasureFunction(Measurer.Measure);

            ImageContainer.SetParent(this);
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "source":
                    SetSource(ParserMap.ImageReferenceConverter.Convert(value) as ImageReference);
                    return;
                case "fit":
                    SetFit((ImageFitMode) System.Convert.ToInt32(value));
                    return;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }



        private void SetSource(ImageReference source)
        {
            source.Get(Context, (res) =>
            {
                Image.sprite = res == null ? null : Sprite.Create(res, new Rect(0, 0, res.width, res.height), Vector2.one / 2);
            });
        }


        private void SetFit(ImageFitMode fit)
        {
            Fit = fit;
            if (fit == ImageFitMode.FitStart)
            {
                Layout.AlignItems = YogaAlign.FlexStart;
                Layout.JustifyContent = YogaJustify.FlexStart;
            }
            else if (fit == ImageFitMode.FitEnd)
            {
                Layout.AlignItems = YogaAlign.FlexEnd;
                Layout.JustifyContent = YogaJustify.FlexEnd;
            }
            ImageContainer.Layout.MarkDirty();
        }
    }

    public enum ImageFitMode
    {
        Center = 0,
        CenterCrop = 1,
        CenterInside = 2,
        FitCenter = 3,
        FitStart = 4,
        FitEnd = 5,
        Fill = 6,
    }
}
