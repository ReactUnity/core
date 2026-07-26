using System;
using System.Collections;
using ReactUnity.Helpers;
using ReactUnity.Styling.Computed;
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
                webDeferred = new DisposableHandle(context.Dispatcher, context.Dispatcher.StartDeferred(GetClip(context, realType, realValue, callback)));
            }
            else if (realType == AssetReferenceType.Data)
            {
                webDeferred = new DisposableHandle(context.Dispatcher, context.Dispatcher.StartDeferred(GetClip(context, realType, "data:," + urlString, callback)));
            }
            else if (realType == AssetReferenceType.File)
            {
                webDeferred = new DisposableHandle(context.Dispatcher, context.Dispatcher.StartDeferred(GetClip(context, realType, "file:," + urlString, callback)));
            }
            else
            {
                base.Get(context, realType, realValue, callback);
            }
        }

        protected override UnityWebRequest CreateWebRequest(string url) => UnityWebRequestMultimedia.GetAudioClip(url, AudioType.UNKNOWN);

        IEnumerator GetClip(ReactContext context, AssetReferenceType realType, object realValue, Action<AudioClip> callback)
        {
            var www = GetWebRequest(context, realType, realValue);
            yield return SendWebRequestIfNecessary(www);

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


        public class Converter : BaseConverter<AudioReference>
        {
            public Converter(bool allowWithoutUrl = false) : base(allowWithoutUrl) { }

            protected override bool ConvertInternal(object value, out IComputedValue result)
            {
                if (value is AudioClip s) return Constant(FromObject(AssetReferenceType.Object, s), out result);
                return base.ConvertInternal(value, out result);
            }

            protected override object FromObject(AssetReferenceType type, object obj) => new AudioReference(type, obj);
            protected override object FromUrl(Url url) => new AudioReference(url);
        }
    }
}
