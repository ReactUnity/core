using Facebook.Yoga;
using ReactUnity.Layout;
using ReactUnity.Styling;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Video;

namespace ReactUnity.Components
{
    public class VideoComponent : ContainerComponent
    {
        public static NodeStyle ImageDefaultStyle { get; } = new NodeStyle() { };
        public static YogaNode ImageDefaultLayout { get; } = new YogaNode() { Overflow = YogaOverflow.Hidden, AlignItems = YogaAlign.Center, JustifyContent = YogaJustify.Center };
        public override NodeStyle DefaultStyle => ImageDefaultStyle;
        public override YogaNode DefaultLayout => ImageDefaultLayout;

        public RawImageMeasurer Measurer { get; private set; }
        public ContainerComponent ImageContainer { get; private set; }
        public RawImage Image { get; private set; }

        public ImageFitMode Fit { get; private set; }

        public VideoPlayer VideoPlayer;
        public RenderTexture RenderTexture;

        public VideoComponent(UnityUGUIContext context) : base(context, "video")
        {
            VideoPlayer = AddComponent<VideoPlayer>();
            VideoPlayer.renderMode = VideoRenderMode.RenderTexture;

            VideoPlayer.prepareCompleted += PrepareCompleted;

            ImageContainer = new ContainerComponent(context, "");
            ImageContainer.GameObject.name = "[ImageContent]";
            Image = ImageContainer.AddComponent<RawImage>();

            Measurer = ImageContainer.AddComponent<RawImageMeasurer>();
            Measurer.Context = context;
            Measurer.Layout = ImageContainer.Layout;
            Measurer.Component = this;
            ImageContainer.Layout.SetMeasureFunction(Measurer.Measure);

            ImageContainer.SetParent(this);
        }

        private void PrepareCompleted(VideoPlayer source)
        {
            RenderTexture = new RenderTexture((int) source.width, (int) source.height, 1);
            Image.texture = RenderTexture;
            VideoPlayer.targetTexture = RenderTexture;
            ImageContainer.Layout.MarkDirty();
            ScheduleLayout();
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "source":
                    SetSource(ParserMap.VideoReferenceConverter.Convert(value) as VideoReference);
                    return;
                case "fit":
                    SetFit((ImageFitMode) System.Convert.ToInt32(value));
                    return;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }



        private void SetSource(VideoReference source)
        {
            source.Get(Context, (res) =>
            {
                if (res == null)
                {
                    VideoPlayer.clip = null;
                    VideoPlayer.url = null;
                    VideoPlayer.source = VideoSource.Url;
                }
                else
                {
                    VideoPlayer.clip = res.Clip;
                    VideoPlayer.url = res.Url;
                    VideoPlayer.source = res.Type;
                }
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

    public class VideoComponentSource
    {
        public string Url;
        public VideoClip Clip;
        public VideoSource Type;
    }
}
