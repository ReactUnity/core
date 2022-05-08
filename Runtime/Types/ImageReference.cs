using System;
using System.Collections;
using System.IO;
using ReactUnity.Helpers;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using UnityEngine;
using UnityEngine.Networking;

namespace ReactUnity.Types
{
    public class ImageReference : AssetReference<Texture2D>
    {
        static public new ImageReference None = new ImageReference(AssetReferenceType.None, null);

        private DisposableHandle webDeferred;

        public ImageReference(AssetReferenceType type, object value) : base(type, value) { }
        public ImageReference(Url url) : base(url) { }

        protected override void Get(ReactContext context, AssetReferenceType realType, object realValue, Action<Texture2D> callback)
        {
            if (realType == AssetReferenceType.Url || realType == AssetReferenceType.Auto)
            {
                webDeferred = new DisposableHandle(context.Dispatcher, context.Dispatcher.StartDeferred(GetTexture(context, realType, realValue as string, callback)));
            }
            else if (realType == AssetReferenceType.Data)
            {
                try
                {
                    var fileData = realValue as byte[];
                    var texture = new Texture2D(1, 1);
                    texture.LoadImage(fileData);
                    callback(texture);
                }
                catch
                {
                    callback(null);
                }
            }
            else if (realType == AssetReferenceType.File)
            {
                var filePath = realValue as string;
                Texture2D texture = null;
                byte[] fileData;

                if (File.Exists(filePath))
                {
                    fileData = File.ReadAllBytes(filePath);
                    texture = new Texture2D(1, 1);
                    texture.LoadImage(fileData);
                }
                callback(texture);
            }
            else if (realType == AssetReferenceType.Procedural)
            {
                if (AllConverters.ColorConverter.TryGetConstantValue<Color>(realValue, out var color))
                {
                    var t = new Texture2D(1, 1);
                    t.SetPixel(0, 0, color);
                    t.Apply();
                    callback(t);
                }
                else
                {
                    callback(null);
                }
            }
            else
            {
                base.Get(context, realType, realValue, callback);
            }
        }

        protected override UnityWebRequest CreateWebRequest(string url) => UnityWebRequestTexture.GetTexture(url);

        IEnumerator GetTexture(ReactContext context, AssetReferenceType realType, string realValue, Action<Texture2D> callback)
        {
            var www = GetWebRequest(context, realType, realValue);
            yield return www.SendWebRequest();

            var resultTexture = DownloadHandlerTexture.GetContent(www);
            callback(resultTexture);
        }

        public override void Dispose()
        {
            base.Dispose();
            if (webDeferred != null) webDeferred.Dispose();
        }

        public class Converter : BaseConverter<ImageReference>
        {
            public Converter(bool allowWithoutUrl = false) : base(allowWithoutUrl) { }

            protected override bool ConvertInternal(object value, out IComputedValue result)
            {
                if (value is Sprite s) return Constant(new ImageReference(AssetReferenceType.Object, s.texture), out result);
                return base.ConvertInternal(value, out result);
            }

            protected override object FromObject(AssetReferenceType type, object obj) => new ImageReference(type, obj);
            protected override object FromUrl(Url url) => new ImageReference(url);
        }
    }
}
