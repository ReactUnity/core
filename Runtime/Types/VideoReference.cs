using ReactUnity.Components;
using System;

namespace ReactUnity.Types
{
    public class VideoReference : AssetReference<VideoComponentSource>
    {
        static public new VideoReference None = new VideoReference(AssetReferenceType.None, null);

        public VideoReference(AssetReferenceType type, object value) : base(type, value) { }

        protected override void Get(UnityUGUIContext context, AssetReferenceType realType, object realValue, Action<VideoComponentSource> callback)
        {
            if (realType == AssetReferenceType.Url)
            {
                callback(new VideoComponentSource() { Type = UnityEngine.Video.VideoSource.Url, Url = realValue as string });
            }
            else if (realType == AssetReferenceType.File)
            {
                callback(new VideoComponentSource() { Type = UnityEngine.Video.VideoSource.Url, Url = "file://" + realValue as string });
            }
            else
            {
                base.Get(context, realType, realValue, callback);
            }
        }
    }
}
