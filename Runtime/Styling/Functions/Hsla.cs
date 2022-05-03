using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Styling.Functions
{
    internal class HslaFunction : ICssFunction
    {
        public string Name { get; } = "hsla";

        public object Call(string name, string[] args, string argsCombined)
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

        private object HslCallback(float v1, float v2, float v3, float v4) => HslToRgb(v1 / 360f, v2, v3, v4);


        private Color HslToRgb(float h, float s, float l, float a)
        {
            float r, g, b;

            if (s == 0)
            {
                r = g = b = l; // achromatic
            }
            else
            {
                var q = l < 0.5f ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;

                r = HueToRgb(p, q, h + 1f / 3f);
                g = HueToRgb(p, q, h);
                b = HueToRgb(p, q, h - 1f / 3f);
            }

            return new Color(r, g, b, a);
        }

        private float HueToRgb(float p, float q, float t)
        {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1f / 6) return p + (q - p) * 6 * t;
            if (t < 1f / 2) return q;
            if (t < 2f / 3) return p + (q - p) * (2f / 3 - t) * 6;
            return p;
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count == 1 || count == 3 || count == 4;
    }
}
