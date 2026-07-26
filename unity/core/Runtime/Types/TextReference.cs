using System;
using System.Collections;
using System.IO;
using ReactUnity.Helpers;
using UnityEngine;
using UnityEngine.Networking;

namespace ReactUnity.Types
{
    public class TextReference : AssetReference<TextAsset>
    {
        static public new TextReference None = new TextReference(AssetReferenceType.None, null);

        private DisposableHandle webDeferred;

        public TextReference(AssetReferenceType type, object value) : base(type, value) { }
        public TextReference(Url url) : base(url) { }

        protected override void Get(ReactContext context, AssetReferenceType realType, object realValue, Action<TextAsset> callback)
        {
            if (realType == AssetReferenceType.Url || realType == AssetReferenceType.Auto)
            {
                webDeferred = new DisposableHandle(context.Dispatcher, context.Dispatcher.StartDeferred(GetTextAsset(context, realType, realValue as string, callback)));
            }
            else if (realType == AssetReferenceType.Data)
            {
                try
                {
                    var fileData = realValue as byte[];
                    var asset = new TextAsset(System.Text.Encoding.UTF8.GetString(fileData));
                    callback(asset);
                }
                catch
                {
                    callback(null);
                }
            }
            else if (realType == AssetReferenceType.File)
            {
                var filePath = realValue as string;
                TextAsset asset = null;

                if (File.Exists(filePath))
                {
                    asset = new TextAsset(File.ReadAllText(filePath));
                }
                callback(asset);
            }
            else if (realType == AssetReferenceType.Procedural)
            {
                callback(new TextAsset(realValue?.ToString()));
            }
            else
            {
                base.Get(context, realType, realValue, callback);
            }
        }

        protected override UnityWebRequest CreateWebRequest(string url) => UnityWebRequest.Get(url);

        IEnumerator GetTextAsset(ReactContext context, AssetReferenceType realType, string realValue, Action<TextAsset> callback)
        {
            var www = GetWebRequest(context, realType, realValue);
            yield return SendWebRequestIfNecessary(www);

            var resultString = www.downloadHandler.text;
            callback(new TextAsset(resultString));
        }

        public override void Dispose()
        {
            base.Dispose();
            if (webDeferred != null) webDeferred.Dispose();
        }


        public class Converter : BaseConverter<TextReference>
        {
            public Converter(bool allowWithoutUrl = false) : base(allowWithoutUrl) { }

            protected override object FromObject(AssetReferenceType type, object obj) => new TextReference(type, obj);
            protected override object FromUrl(Url url) => new TextReference(url);
        }
    }
}
