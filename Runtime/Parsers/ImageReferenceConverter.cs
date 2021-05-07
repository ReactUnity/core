using ReactUnity.Types;
using System.Text.RegularExpressions;
using UnityEngine;

namespace ReactUnity.Styling.Parsers
{
    public class ImageReferenceConverter : IStyleParser, IStyleConverter
    {

        private static Regex DataRegex = new Regex(@"^data:(?<mime>[\w/\-\.]+)?(;(?<encoding>\w+))?,?(?<data>.*)", RegexOptions.Compiled);
        private static Regex ProceduralRegex = new Regex("^procedural://");
        private static Regex GlobalRegex = new Regex("^globals?://");
        private static Regex ResourceRegex = new Regex("^res(ources?)?://");
        private static Regex FileRegex = new Regex("^file://");
        private static Regex HttpRegex = new Regex("^https?://");
        private static Regex PathRegex = new Regex("^/");
        private static IStyleConverter ColorConverter = ConverterMap.ColorConverter;

        public object Convert(object value)
        {
            if (value == null) return ImageReference.None;
            if (value is Texture2D t) return new ImageReference(AssetReferenceType.Object, t);
            if (value is Sprite s) return new ImageReference(AssetReferenceType.Object, s.texture);
            if (value is Object o) return new ImageReference(AssetReferenceType.Object, o);
            return FromString(ConverterMap.UrlConverter.Convert(value) as string);
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
