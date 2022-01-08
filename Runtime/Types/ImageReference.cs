using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using ReactUnity.Converters;
using ReactUnity.Helpers;
using ReactUnity.Styling;
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
                var color = AllConverters.ColorConverter.Convert(realValue);

                if (color is Color c)
                {
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
                if (value is ImageReference ir) return ir;
                if (value is Texture2D t) return new ImageReference(AssetReferenceType.Object, t);
                if (value is Sprite s) return new ImageReference(AssetReferenceType.Object, s.texture);
                if (value is UnityEngine.Object o) return new ImageReference(AssetReferenceType.Object, o);
                return Parse(value?.ToString());
            }

            public object Parse(string value)
            {
                if (AllConverters.UrlConverter.Convert(value) is Url u) return new ImageReference(u);

                if (AllowWithoutUrl) return new ImageReference(new Url(value));
                return CssKeyword.Invalid;
            }
        }
    }
}
