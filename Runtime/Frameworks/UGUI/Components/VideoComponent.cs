
using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using UnityEngine;
using UnityEngine.Video;

namespace ReactUnity.UGUI
{
    public class VideoComponent : BaseRenderTextureComponent
    {
        public VideoPlayer VideoPlayer;

        public VideoComponent(UGUIContext context) : base(context, "video")
        {
            VideoPlayer = AddComponent<VideoPlayer>();
            VideoPlayer.renderMode = VideoRenderMode.RenderTexture;
            VideoPlayer.targetTexture = RenderTexture;
            VideoPlayer.playOnAwake = false;
            VideoPlayer.prepareCompleted += PrepareCompleted;
        }

        private void PrepareCompleted(VideoPlayer source)
        {
            RenderTexture.width = (int) source.width;
            RenderTexture.height = (int) source.height;
            Replaced.Measurer.MarkDirty();
        }

        public override void SetProperty(string propertyName, object value)
        {
            switch (propertyName)
            {
                case "source":
                    if (!AllConverters.VideoReferenceConverter.TryGetConstantValue<VideoReference>(value, out var source))
                        source = VideoReference.None;
                    SetSource(source);
                    return;
                default:
                    base.SetProperty(propertyName, value);
                    break;
            }
        }

        private void SetSource(VideoReference source)
        {
            source?.Get(Context, (res) => {
                if (res == null)
                {
                    VideoPlayer.source = VideoSource.VideoClip;
                    VideoPlayer.clip = null;
                    VideoPlayer.url = null;
                }
                else
                {
                    VideoPlayer.clip = res.Clip;
                    VideoPlayer.url = res.Url;
                    VideoPlayer.source = res.Type;
                    VideoPlayer.Prepare();
                }
            });
        }
    }
}
