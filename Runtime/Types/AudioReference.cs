using System;
using System.Collections;
using System.Collections.Generic;
using ReactUnity.Converters;
using ReactUnity.Helpers;
using ReactUnity.Styling;
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


        public class Converter : IStyleParser, IStyleConverter
        {
            private static HashSet<string> AllowedFunctions = new HashSet<string> { "url" };
            public bool CanHandleKeyword(CssKeyword keyword) => false;

            public object Convert(object value)
            {
                if (value == null) return None;
                if (value is AudioReference a) return a;
                if (value is AudioClip c) return new AudioReference(AssetReferenceType.Object, c);
                if (value is UnityEngine.Object o) return new AudioReference(AssetReferenceType.Object, o);
                return Parse(value?.ToString());
            }

            public object Parse(string value)
            {
                if (CssFunctions.TryCall(value, out var result, AllowedFunctions))
                {
                    if (result is Url u) return new AudioReference(u);
                }
                return CssKeyword.Invalid;
            }
        }
    }
}
