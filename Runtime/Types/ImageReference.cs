using ReactUnity.Interop;
using ReactUnity.Styling;
using System;
using System.Collections;
using System.IO;
using UnityEngine;
using UnityEngine.Networking;

namespace ReactUnity.Types
{
    public class ImageReference : AssetReference<Texture2D>
    {
        static public new ImageReference None = new ImageReference(AssetReferenceType.None, null);

        private int webDeferred = -1;

        public ImageReference(AssetReferenceType type, object value) : base(type, value) { }

        protected override void Get(ReactContext context, AssetReferenceType realType, object realValue, Action<Texture2D> callback)
        {
            if (realType == AssetReferenceType.Url)
            {
                webDeferred = AdaptiveDispatcher.StartDeferred(GetTexture(realValue as string, callback));
            }
            else if (realType == AssetReferenceType.Data)
            {
                var base64 = realValue as string;
                byte[] fileData = Convert.FromBase64String(base64);
                var texture = new Texture2D(1, 1);
                texture.LoadImage(fileData);
                callback(texture);
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
                var color = ParserMap.ColorConverter.Convert(realValue);

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
            if (webDeferred >= 0) AdaptiveDispatcher.StopDeferred(webDeferred);
        }
    }
}
