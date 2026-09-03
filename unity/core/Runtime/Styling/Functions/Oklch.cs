using System;
using System.Collections.Generic;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Functions
{
    /// <summary>
    /// oklch(L C H[ / A]) and oklab(L a b[ / A]). Only the modern space-separated syntax is CSS,
    /// but the comma form is accepted too for consistency with the other color functions here.
    /// </summary>
    internal class OklchFunction : ICssFunction
    {
        public string Name { get; } = "oklch";

        private static List<StyleConverterBase> OklchConverters = new List<StyleConverterBase> {
            AllConverters.PercentageConverter,
            AllConverters.OklchChromaConverter,
            AllConverters.AngleConverter,
            AllConverters.PercentageConverter,
        };

        private static List<StyleConverterBase> OklabConverters = new List<StyleConverterBase> {
            AllConverters.PercentageConverter,
            AllConverters.OklchChromaConverter,
            AllConverters.OklchChromaConverter,
            AllConverters.PercentageConverter,
        };

        public object Call(string name, string[] args, string argsCombined, StyleConverterBase converter)
        {
            var isLab = "oklab".Equals(name, StringComparison.OrdinalIgnoreCase);
            var cb = isLab ? (ParserHelpers.ColorCallback) LabCallback : (ParserHelpers.ColorCallback) LchCallback;
            var converters = isLab ? OklabConverters : OklchConverters;

            if (args.Length == 1)
            {
                var vals = ParserHelpers.ParseSpaceSeparatedColorArguments(args[0]);
                if (ParserHelpers.ParseCommaSeparatedColor(ReplaceNone(vals), cb, converters, out var rs)) return rs;
            }
            else if (args.Length == 3 || args.Length == 4)
            {
                var vals = new List<string>(args);
                if (ParserHelpers.ParseCommaSeparatedColor(ReplaceNone(vals), cb, converters, out var rs)) return rs;
            }

            return null;
        }

        // A missing component in a non-relative color resolves to zero.
        private static string[] ReplaceNone(List<string> vals)
        {
            var result = new string[vals.Count];
            for (int i = 0; i < vals.Count; i++)
            {
                var val = vals[i].Trim();
                result[i] = val.Equals("none", StringComparison.OrdinalIgnoreCase) ? "0" : val;
            }
            return result;
        }

        private object LchCallback(float l, float c, float h, float a) => ColorSpaces.OklchToColor(l, c, h, a);

        private object LabCallback(float l, float ca, float cb, float a) => ColorSpaces.OklabToColor(l, ca, cb, a);

        public bool CanHandleArguments(int count, string name, string[] args) => count == 1 || count == 3 || count == 4;
    }
}
