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

        public ContainerComponent ImageContainer { get; private set; }
        public Image Image { get; private set; }

        public ImageFitMode Fit { get; private set; }

        public ImageComponent(UnityUGUIContext context) : base(context)
        {
            ImageContainer = new ContainerComponent(context);
            ImageContainer.GameObject.name = "[ImageContent]";
            Image = ImageContainer.GameObject.AddComponent<Image>();
            var measure = ImageContainer.GameObject.AddComponent<ImageNodeMeasure>();
            ImageContainer.Layout.SetMeasureFunction(measure.Measure);
            measure.Context = context;
            measure.Layout = ImageContainer.Layout;
            measure.Component = this;

            ImageContainer.SetParent(this);
        }

        public void SetSource(object source)
        {
            Image.sprite = AssetReference.GetSpriteFromObject(source, Context);
        }


        public void SetFit(ImageFitMode fit)
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
