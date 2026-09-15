using System;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Styling.Functions
{
    internal class HslaFunction : ICssFunction
    {
        public string Name { get; } = "hsla";

        public object Call(string name, string[] args, string argsCombined, StyleConverterBase converter)
        {
            var hsv = "hsv".Equals(name, StringComparison.OrdinalIgnoreCase) || "hsva".Equals(name, StringComparison.OrdinalIgnoreCase);
            var cb = hsv ? (ParserHelpers.ColorCallback) HsvCallback : (ParserHelpers.ColorCallback) HslCallback;

            if (RelativeColor.IsRelative(args))
            {
                var keywords = hsv ? RelativeColor.HsvKeywords : RelativeColor.HslKeywords;
                Action<Color, float[]> decompose = hsv ? RelativeColor.DecomposeHsv : (Action<Color, float[]>) RelativeColor.DecomposeHsl;

                if (RelativeColor.TryParse(args[0], keywords, ParserHelpers.HslConverters, decompose, cb, out var relative)) return relative;
                return null;
            }

            if (args.Length == 1)
            {
                if (ParserHelpers.ParseSpaceSeparatedColor(args[0], cb, true, out var rs)) return rs;
            }
            else if (args.Length == 3 || args.Length == 4)
            {
                if (ParserHelpers.ParseCommaSeparatedColor(args, cb, true, out var rs)) return rs;
            }

            return null;
        }

        // Saturation, lightness and value arrive on CSS's 0..100 scale; the conversions take 0..1.
        private object HsvCallback(float v1, float v2, float v3, float v4)
        {
            var col = Color.HSVToRGB(ColorSpaces.NormalizeHue(v1) / 360f, Mathf.Clamp01(v2 / 100f), Mathf.Clamp01(v3 / 100f));
            col.a = Mathf.Clamp01(v4);
            return col;
        }

        private object HslCallback(float v1, float v2, float v3, float v4) => ColorSpaces.HslToColor(v1, v2 / 100f, v3 / 100f, v4);

        public bool CanHandleArguments(int count, string name, string[] args) => count == 1 || count == 3 || count == 4;
    }
}
