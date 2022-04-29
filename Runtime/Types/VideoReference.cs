using System;
using ReactUnity.Converters;
using ReactUnity.Styling;
using UnityEngine.Video;

namespace ReactUnity.Types
{
    public class VideoComponentSource
    {
        public string Url;
        public VideoClip Clip;
        public VideoSource Type;

        public VideoComponentSource(VideoComponentSource other)
        {
            Type = other.Type;
            Clip = other.Clip;
            Url = other.Url;
        }

        public VideoComponentSource(VideoClip clip)
        {
            Type = VideoSource.VideoClip;
            Clip = clip;
        }

        public VideoComponentSource(string url)
        {
            Type = VideoSource.Url;
            Url = url;
        }
    }

    public class VideoReference : AssetReference<VideoComponentSource>
    {
        static public new VideoReference None = new VideoReference(AssetReferenceType.None, null);

        public VideoReference(AssetReferenceType type, object value) : base(type, value) { }
        public VideoReference(Url url) : base(url) { }

        protected override void Get(ReactContext context, AssetReferenceType realType, object realValue, Action<VideoComponentSource> callback)
        {
            if (realType == AssetReferenceType.Url)
            {
                callback(new VideoComponentSource(realValue?.ToString()));
            }
            else if (realType == AssetReferenceType.File)
            {
                callback(new VideoComponentSource("file:" + realValue));
            }
            else
            {
                var vd = base.Get<VideoClip>(context, realType, realValue);
                callback(vd != null ? new VideoComponentSource(vd) : null);
            }
        }

        public class Converter : IStyleParser, IStyleConverter
        {
            public bool CanHandleKeyword(CssKeyword keyword) => false;

            public object Convert(object value)
            {
                if (value == null) return None;
                if (value is VideoReference b) return b;
                if (value is VideoClip v) return new VideoReference(AssetReferenceType.Object, v);
                if (value is UnityEngine.Object o) return new VideoReference(AssetReferenceType.Object, o);
                return Parse(value?.ToString());
            }

            public object Parse(string value)
            {
                if (AllConverters.UrlConverter.Convert(value) is Url u) return new VideoReference(u);
                return new VideoReference(new Url(value));
            }
        }
    }
}
