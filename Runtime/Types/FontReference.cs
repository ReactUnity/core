using ReactUnity.Converters;
using System;
using System.Text.RegularExpressions;
using TMPro;
using UnityEngine;

namespace ReactUnity.Types
{
    public class FontReference : AssetReference<TMP_FontAsset>
    {
        static public new FontReference None = new FontReference(AssetReferenceType.None, null);

        public FontReference(AssetReferenceType type, object value) : base(type, value) { }

        protected override void Get(ReactContext context, AssetReferenceType realType, object realValue, Action<TMP_FontAsset> callback)
        {
            if (realType == AssetReferenceType.Procedural)
            {
                if (context.FontFamilies.TryGetValue((realValue as string).ToLowerInvariant(), out var found))
                {
                    found.Get(context, callback);
                }
                else
                {
                    callback(null);
                    IsCached = false;
                }
            }
            else
            {
                base.Get(context, realType, realValue, callback);
            }
        }


        public class Converter : IStyleParser, IStyleConverter
        {
            private static Regex DataRegex = new Regex(@"^data:(?<mime>[\w/\-\.]+)?(;(?<encoding>\w+))?,?(?<data>.*)", RegexOptions.Compiled);
            private static Regex ProceduralRegex = new Regex("^procedural://");
            private static Regex GlobalRegex = new Regex("^globals?://");
            private static Regex ResourceRegex = new Regex("^res(ources?)?://");
            private static Regex FileRegex = new Regex("^file://");
            private static Regex HttpRegex = new Regex("^https?://");

            public object Convert(object value)
            {
                if (value == null) return FontReference.None;
                if (value is Texture2D t) return new FontReference(AssetReferenceType.Object, t);
                if (value is Sprite s) return new FontReference(AssetReferenceType.Object, s.texture);
                if (value is UnityEngine.Object o) return new FontReference(AssetReferenceType.Object, o);
                return FromString(AllConverters.UrlConverter.Convert(value) as string);
            }

            public object FromString(string value)
            {
                if (string.IsNullOrWhiteSpace(value)) return FontReference.None;
                if (FileRegex.IsMatch(value)) return new FontReference(AssetReferenceType.File, FileRegex.Replace(value, ""));
                if (HttpRegex.IsMatch(value)) return new FontReference(AssetReferenceType.Url, HttpRegex.Replace(value, ""));
                if (GlobalRegex.IsMatch(value)) return new FontReference(AssetReferenceType.Global, GlobalRegex.Replace(value, ""));
                if (ProceduralRegex.IsMatch(value)) return new FontReference(AssetReferenceType.Procedural, ProceduralRegex.Replace(value, ""));
                if (ResourceRegex.IsMatch(value)) return new FontReference(AssetReferenceType.Resource, ResourceRegex.Replace(value, ""));

                var dataMatch = DataRegex.Match(value);
                if (dataMatch.Success)
                {
                    var mime = dataMatch.Groups["mime"].Value;
                    var encoding = dataMatch.Groups["encoding"].Value;
                    var data = dataMatch.Groups["data"].Value;
                    return new FontReference(AssetReferenceType.Data, data);
                }

                return new FontReference(AssetReferenceType.Procedural, value);
            }
        }
    }
}
