using System;
using System.Collections.Generic;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Functions
{
    /// <summary>
    /// The four Lab-family color functions: lab(), lch(), oklab() and oklch(). Only the modern
    /// space-separated syntax is CSS, but the comma form is accepted too for consistency with the
    /// other color functions here.
    /// </summary>
    internal class LabColorFunction : ICssFunction
    {
        public string Name { get; } = "lab";

        private static List<StyleConverterBase> LabConverters = new List<StyleConverterBase> {
            AllConverters.LabLightnessConverter,
            AllConverters.LabAxisConverter,
            AllConverters.LabAxisConverter,
            AllConverters.PercentageConverter,
        };

        private static List<StyleConverterBase> LchConverters = new List<StyleConverterBase> {
            AllConverters.LabLightnessConverter,
            AllConverters.LchChromaConverter,
            AllConverters.AngleConverter,
            AllConverters.PercentageConverter,
        };

        private static List<StyleConverterBase> OklabConverters = new List<StyleConverterBase> {
            AllConverters.PercentageConverter,
            AllConverters.OklchChromaConverter,
            AllConverters.OklchChromaConverter,
            AllConverters.PercentageConverter,
        };

        private static List<StyleConverterBase> OklchConverters = new List<StyleConverterBase> {
            AllConverters.PercentageConverter,
            AllConverters.OklchChromaConverter,
            AllConverters.AngleConverter,
            AllConverters.PercentageConverter,
        };

        public object Call(string name, string[] args, string argsCombined, StyleConverterBase converter)
        {
            if (!TryGetSpace(name, out var converters, out var callback)) return null;

            if (args.Length == 1)
            {
                var vals = ParserHelpers.ParseSpaceSeparatedColorArguments(args[0]);
                if (ParserHelpers.ParseCommaSeparatedColor(ReplaceNone(vals), callback, converters, out var rs)) return rs;
            }
            else if (args.Length == 3 || args.Length == 4)
            {
                var vals = new List<string>(args);
                if (ParserHelpers.ParseCommaSeparatedColor(ReplaceNone(vals), callback, converters, out var rs)) return rs;
            }

            return null;
        }

        private static bool TryGetSpace(string name, out List<StyleConverterBase> converters, out ParserHelpers.ColorCallback callback)
        {
            if ("lab".Equals(name, StringComparison.OrdinalIgnoreCase))
            {
                converters = LabConverters;
                callback = (l, a, b, alpha) => ColorSpaces.LabToColor(l, a, b, alpha);
                return true;
            }

            if ("lch".Equals(name, StringComparison.OrdinalIgnoreCase))
            {
                converters = LchConverters;
                callback = (l, c, h, alpha) => ColorSpaces.LchToColor(l, c, h, alpha);
                return true;
            }

            if ("oklab".Equals(name, StringComparison.OrdinalIgnoreCase))
            {
                converters = OklabConverters;
                callback = (l, a, b, alpha) => ColorSpaces.OklabToColor(l, a, b, alpha);
                return true;
            }

            if ("oklch".Equals(name, StringComparison.OrdinalIgnoreCase))
            {
                converters = OklchConverters;
                callback = (l, c, h, alpha) => ColorSpaces.OklchToColor(l, c, h, alpha);
                return true;
            }

            converters = null;
            callback = null;
            return false;
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

        public bool CanHandleArguments(int count, string name, string[] args) => count == 1 || count == 3 || count == 4;
    }
}
