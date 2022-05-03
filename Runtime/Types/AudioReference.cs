using System;
using System.Collections;

using ReactUnity.Helpers;
using ReactUnity.Styling;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using UnityEngine;
using UnityEngine.Networking;

namespace ReactUnity.Types
{
    public class AudioReference : AssetReference<AudioClip>
    {
        static public new AudioReference None = new AudioReference(AssetReferenceType.None, null);

        private DisposableHandle webDeferred;

        public AudioReference(AssetReferenceType type, object value) : base(type, value) { }

        public AudioReference(Url url) : base(url) { }

        protected override void Get(ReactContext context, AssetReferenceType realType, object realValue, Action<AudioClip> callback)
        {
            var urlString = realValue as string;

            if (realType == AssetReferenceType.Url)
            {
                webDeferred = new DisposableHandle(context.Dispatcher, context.Dispatcher.StartDeferred(GetClip(urlString, callback)));
            }
            else if (realType == AssetReferenceType.Data)
            {
                webDeferred = new DisposableHandle(context.Dispatcher, context.Dispatcher.StartDeferred(GetClip("data:," + urlString, callback)));
            }
            else if (realType == AssetReferenceType.File)
            {
                webDeferred = new DisposableHandle(context.Dispatcher, context.Dispatcher.StartDeferred(GetClip("file:," + urlString, callback)));
            }
            else
            {
                base.Get(context, realType, realValue, callback);
            }
        }

        IEnumerator GetClip(string url, Action<AudioClip> callback)
        {
            var www = UnityWebRequestMultimedia.GetAudioClip(url, AudioType.UNKNOWN);
            yield return www.SendWebRequest();

            AudioClip result = null;
            try
            {
                result = DownloadHandlerAudioClip.GetContent(www);
            }
            catch { }
            callback(result);
        }

        public override void Dispose()
        {
            base.Dispose();
            if (webDeferred != null) webDeferred.Dispose();
        }


        public class Converter : StyleConverterBase
        {
            protected override Type TargetType => typeof(AudioReference);

            protected override bool ConvertInternal(object value, out IComputedValue result)
            {
                if (value is AudioClip c) return Constant(new AudioReference(AssetReferenceType.Object, c), out result);
                if (value is UnityEngine.Object o) return Constant(new AudioReference(AssetReferenceType.Object, o), out result);
                if (value is Url u) return Constant(new AudioReference(u), out result);

                return base.ConvertInternal(value, out result);
            }

            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                return ComputedMapper.Create(out result, value, AllConverters.UrlConverter,
                    (object resolvedValue, out IComputedValue rs) => {
                        if (resolvedValue is Url u) return Constant(new AudioReference(u), out rs);
                        rs = null;
                        return false;
                    });
            }
        }
    }
}
