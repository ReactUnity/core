using Facebook.Yoga;
using ReactUnity.Layout;
using ReactUnity.Styling;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;

namespace ReactUnity.Components
{
    public class RawImageComponent : ContainerComponent
    {
        public static NodeStyle ImageDefaultStyle { get; } = new NodeStyle() { };
        public static YogaNode ImageDefaultLayout { get; } = new YogaNode() { Overflow = YogaOverflow.Hidden, AlignItems = YogaAlign.Center, JustifyContent = YogaJustify.Center };
        public override NodeStyle DefaultStyle => ImageDefaultStyle;
        public override YogaNode DefaultLayout => ImageDefaultLayout;

        public ImageMeasurer Measurer { get; private set; }
        public ContainerComponent ImageContainer { get; private set; }
        public RawImage Image { get; private set; }

        public ImageFitMode Fit { get; private set; }

        public RawImageComponent(UnityUGUIContext context, string tag = "rawimage") : base(context, tag)
        {
            ImageContainer = new ContainerComponent(context, "");
            ImageContainer.GameObject.name = "[RawImageContent]";
            Image = ImageContainer.AddComponent<RawImage>();

            Measurer = ImageContainer.AddComponent<ImageMeasurer>();
            Measurer.Context = context;
            Measurer.Layout = ImageContainer.Layout;
            Measurer.Texture = Image.texture;
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
                SetTexture(res);
            });
        }

        protected void SetTexture(Texture texture)
        {
            Image.texture = texture;
            Measurer.Texture = texture;
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

            Measurer.FitMode = Fit;
        }
    }
}
