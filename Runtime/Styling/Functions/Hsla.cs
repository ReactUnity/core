using ReactUnity.Converters;
using UnityEngine;

namespace ReactUnity.Styling.Functions
{
    internal class HslaFunction : ICssFunction
    {
        public string Name { get; } = "hsla";

        public object Call(string name, string[] args)
        {
            string[] parsedArgs;
            if (args.Length == 1) parsedArgs = ParserHelpers.ParseSpaceSeparatedColorArguments(args[0]).ToArray();
            else if (args.Length == 3 || args.Length == 4) parsedArgs = args;
            else return null;

            var vals = new float[parsedArgs.Length];

            if (AllConverters.AngleConverter.Convert(parsedArgs[0]) is float h) vals[0] = h;
            else return null;

            if (AllConverters.PercentageConverter.Convert(parsedArgs[1]) is float s) vals[1] = s;
            else return null;

            if (AllConverters.PercentageConverter.Convert(parsedArgs[2]) is float l) vals[2] = l;
            else return null;

            if (parsedArgs.Length == 4)
            {
                if (AllConverters.PercentageConverter.Convert(parsedArgs[3]) is float alpha) vals[3] = alpha;
                else return null;
            }

            if (name == "hsv" || name == "hsva")
            {
                var col = Color.HSVToRGB(vals[0] / 360f, vals[1], vals[2]);
                if (vals.Length > 3) col.a = vals[3];
                return col;
            }
            return HslToRgb(vals[0] / 360f, vals[1], vals[2], vals.Length > 3 ? vals[3] : 1);
        }

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
