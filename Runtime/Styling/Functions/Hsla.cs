using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Styling.Functions
{
    internal class HslaFunction : ICssFunction
    {
        public string Name { get; } = "hsla";

        public object Call(string name, string[] args, string argsCombined, StyleConverterBase converter)
        {
            var cb = name == "hsv" || name == "hsva" ? (ParserHelpers.ColorCallback) HsvCallback : (ParserHelpers.ColorCallback) HslCallback;
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

        private object HsvCallback(float v1, float v2, float v3, float v4)
        {
            var col = Color.HSVToRGB(v1 / 360f, v2, v3);
            col.a = v4;
            return col;
        }

        private object HslCallback(float v1, float v2, float v3, float v4) => ColorSpaces.HslToColor(v1, v2, v3, v4);

        public bool CanHandleArguments(int count, string name, string[] args) => count == 1 || count == 3 || count == 4;
    }
}
