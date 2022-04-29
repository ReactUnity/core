using System;
using System.Collections;
using System.IO;
using ReactUnity.Converters;
using ReactUnity.Helpers;
using ReactUnity.Styling;
using UnityEngine;
using UnityEngine.Networking;

namespace ReactUnity.Types
{
    public class TextReference : AssetReference<TextAsset>
    {
        static public new ImageReference None = new ImageReference(AssetReferenceType.None, null);

        private DisposableHandle webDeferred;

        public TextReference(AssetReferenceType type, object value) : base(type, value) { }
        public TextReference(Url url) : base(url) { }

        protected override void Get(ReactContext context, AssetReferenceType realType, object realValue, Action<TextAsset> callback)
        {
            if (realType == AssetReferenceType.Url || realType == AssetReferenceType.Auto)
            {
                webDeferred = new DisposableHandle(context.Dispatcher, context.Dispatcher.StartDeferred(GetTextAsset(realValue as string, callback)));
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

        IEnumerator GetTextAsset(string realValue, Action<TextAsset> callback)
        {
            var www = UnityWebRequest.Get(realValue);
            yield return www.SendWebRequest();

            var resultString = www.downloadHandler.text;
            callback(new TextAsset(resultString));
        }

        public override void Dispose()
        {
            base.Dispose();
            if (webDeferred != null) webDeferred.Dispose();
        }

        public class Converter : IStyleParser, IStyleConverter
        {
            public bool AllowWithoutUrl { get; }

            public Converter(bool allowWithoutUrl = false)
            {
                AllowWithoutUrl = allowWithoutUrl;
            }

            public bool CanHandleKeyword(CssKeyword keyword) => false;

            public object Convert(object value)
            {
                if (value == null) return None;
                if (value is TextReference ir) return ir;
                if (value is TextAsset t) return new TextReference(AssetReferenceType.Object, t);
                if (value is UnityEngine.Object o) return new TextReference(AssetReferenceType.Object, o);
                return Parse(value?.ToString());
            }

            public object Parse(string value)
            {
                if (AllConverters.UrlConverter.Convert(value) is Url u) return new TextReference(u);

                if (AllowWithoutUrl) return new TextReference(new Url(value));
                return CssKeyword.Invalid;
            }
        }
    }
}
