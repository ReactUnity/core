using System;
using ReactUnity.Styling;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
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


        public class Converter : BaseConverter<VideoReference>
        {
            public Converter(bool allowWithoutUrl = true) : base(allowWithoutUrl) { }

            protected override bool ConvertInternal(object value, out IComputedValue result)
            {
                if (value is VideoClip v) return Constant(FromObject(AssetReferenceType.Object, v), out result);
                return base.ConvertInternal(value, out result);
            }

            protected override object FromObject(AssetReferenceType type, object obj) => new VideoReference(type, obj);
            protected override object FromUrl(Url url) => new VideoReference(url);
        }
    }
}
