using ReactUnity.Helpers;
using ReactUnity.Converters;
using System;
using System.Collections;
using System.IO;
using System.Text.RegularExpressions;
using UnityEngine;
using UnityEngine.Networking;

namespace ReactUnity.Types
{
    public class ImageReference : AssetReference<Texture2D>
    {
        static public new ImageReference None = new ImageReference(AssetReferenceType.None, null);

        private DisposableHandle webDeferred;

        public ImageReference(AssetReferenceType type, object value) : base(type, value) { }

        protected override void Get(ReactContext context, AssetReferenceType realType, object realValue, Action<Texture2D> callback)
        {
            if (realType == AssetReferenceType.Url)
            {
                webDeferred = new DisposableHandle(context.Dispatcher, context.Dispatcher.StartDeferred(GetTexture(realValue as string, callback)));
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
            private static Regex DataRegex = new Regex(@"^data:(?<mime>[\w/\-\.]+)?(;(?<encoding>\w+))?,?(?<data>.*)", RegexOptions.Compiled);
            private static Regex ProceduralRegex = new Regex("^procedural://");
            private static Regex GlobalRegex = new Regex("^globals?://");
            private static Regex ResourceRegex = new Regex("^res(ources?)?://");
            private static Regex FileRegex = new Regex("^file://");
            private static Regex HttpRegex = new Regex("^https?://");
            private static Regex PathRegex = new Regex("^/");
            private static IStyleConverter ColorConverter = AllConverters.ColorConverter;

            public object Convert(object value)
            {
                if (value == null) return ImageReference.None;
                if (value is Texture2D t) return new ImageReference(AssetReferenceType.Object, t);
                if (value is Sprite s) return new ImageReference(AssetReferenceType.Object, s.texture);
                if (value is UnityEngine.Object o) return new ImageReference(AssetReferenceType.Object, o);
                return FromString(AllConverters.UrlConverter.Convert(value) as string);
            }

            public object FromString(string value)
            {
                if (string.IsNullOrWhiteSpace(value)) return ImageReference.None;
                if (FileRegex.IsMatch(value)) return new ImageReference(AssetReferenceType.File, FileRegex.Replace(value, ""));
                if (HttpRegex.IsMatch(value)) return new ImageReference(AssetReferenceType.Url, value);
                if (GlobalRegex.IsMatch(value)) return new ImageReference(AssetReferenceType.Global, GlobalRegex.Replace(value, ""));
                if (ProceduralRegex.IsMatch(value)) return new ImageReference(AssetReferenceType.Procedural, ProceduralRegex.Replace(value, ""));
                if (ResourceRegex.IsMatch(value)) return new ImageReference(AssetReferenceType.Resource, ResourceRegex.Replace(value, ""));
                if (PathRegex.IsMatch(value)) return new ImageReference(AssetReferenceType.Path, value);

                var dataMatch = DataRegex.Match(value);
                if (dataMatch.Success)
                {
                    var mime = dataMatch.Groups["mime"].Value;
                    var encoding = dataMatch.Groups["encoding"].Value;
                    var data = dataMatch.Groups["data"].Value;
                    return new ImageReference(AssetReferenceType.Data, data);
                }

                var color = ColorConverter.Convert(value);
                if (color is Color c) return new ImageReference(AssetReferenceType.Procedural, c);

                return new ImageReference(AssetReferenceType.Auto, value);
            }
        }
    }
}
