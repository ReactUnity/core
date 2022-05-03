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
                webDeferred = new DisposableHandle(context.Dispatcher, context.Dispatcher.StartDeferred(GetTexture(realValue as string, callback)));
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
                if (AllConverters.ColorConverter.TryConvert(realValue, out var color))
                {
                    var c = AllConverters.TryGetConstantValue(color, Color.clear);
                    var t = new Texture2D(1, 1);
                    t.SetPixel(0, 0, c);
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

        IEnumerator GetTexture(string realValue, Action<Texture2D> callback)
        {
            var www = UnityWebRequestTexture.GetTexture(realValue);
            yield return www.SendWebRequest();

            var resultTexture = DownloadHandlerTexture.GetContent(www);
            callback(resultTexture);
        }

        public override void Dispose()
        {
            base.Dispose();
            if (webDeferred != null) webDeferred.Dispose();
        }

        public class Converter : TypedStyleConverterBase<ImageReference>
        {
            public bool AllowWithoutUrl { get; }

            public Converter(bool allowWithoutUrl = false)
            {
                AllowWithoutUrl = allowWithoutUrl;
            }

            protected override bool ConvertInternal(object value, out IComputedValue result)
            {
                if (value is Texture2D t) return Constant(new ImageReference(AssetReferenceType.Object, t), out result);
                if (value is Sprite s) return Constant(new ImageReference(AssetReferenceType.Object, s.texture), out result);
                if (value is UnityEngine.Object o) return Constant(new ImageReference(AssetReferenceType.Object, o), out result);
                return base.ConvertInternal(value, out result);
            }

            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                if (ComputedMapper.Create(out result, value, AllConverters.UrlConverter,
                    (object u, out IComputedValue rs) => Constant(new ImageReference(u as Url), out rs)))
                    return true;

                if (AllowWithoutUrl) return Constant(new ImageReference(new Url(value)), out result);
                result = null;
                return false;
            }
        }
    }
}
