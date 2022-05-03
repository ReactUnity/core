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

        public class Converter : TypedStyleConverterBase<VideoReference>
        {
            public bool AllowWithoutUrl { get; }

            public override bool HandleKeyword(CssKeyword keyword, out IComputedValue result)
            {
                if (keyword == CssKeyword.None) return Constant(None, out result);
                return base.HandleKeyword(keyword, out result);
            }

            public Converter(bool allowWithoutUrl = true)
            {
                AllowWithoutUrl = allowWithoutUrl;
            }

            protected override bool ConvertInternal(object value, out IComputedValue result)
            {
                if (value is VideoClip s) return Constant(new VideoReference(AssetReferenceType.Object, s), out result);
                if (value is UnityEngine.Object o) return Constant(new VideoReference(AssetReferenceType.Object, o), out result);
                return base.ConvertInternal(value, out result);
            }

            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                if (ComputedMapper.Create(out result, value, AllConverters.UrlConverter,
                    (u) => {
                        if (u is Url uu) return new VideoReference(uu);
                        return null;
                    }))
                    return true;

                if (AllowWithoutUrl) return Constant(new VideoReference(new Url(value)), out result);
                result = null;
                return false;
            }
        }
    }
}
