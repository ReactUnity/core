using System;
using System.Collections;
using System.IO;

using ReactUnity.Helpers;
using ReactUnity.Styling;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
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

        public class Converter : TypedStyleConverterBase<TextReference>
        {
            public bool AllowWithoutUrl { get; }

            public Converter(bool allowWithoutUrl = false)
            {
                AllowWithoutUrl = allowWithoutUrl;
            }

            protected override bool ConvertInternal(object value, out IComputedValue result)
            {
                if (value is TextAsset t) return Constant(new TextReference(AssetReferenceType.Object, t), out result);
                if (value is UnityEngine.Object o) return Constant(new TextReference(AssetReferenceType.Object, o), out result);
                return base.ConvertInternal(value, out result);
            }

            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                if (ComputedMapper.Create(out result, value, AllConverters.UrlConverter,
                    (object u, out IComputedValue rs) => Constant(new TextReference(u as Url), out rs)))
                    return true;

                if (AllowWithoutUrl) return Constant(new TextReference(new Url(value)), out result);
                result = null;
                return false;
            }
        }
    }
}
