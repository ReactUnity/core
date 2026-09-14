using System;
using System.Collections.Generic;
using ReactUnity.Styling.Converters;
using UnityEngine;

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
            if (!TryGetSpace(name, out var converters, out var callback, out var keywords, out var decompose)) return null;

            if (RelativeColor.IsRelative(args))
            {
                if (RelativeColor.TryParse(args[0], keywords, converters, decompose, callback, out var relative)) return relative;
                return null;
            }

            if (args.Length == 1)
            {
                var vals = ParserHelpers.ParseSpaceSeparatedColorArguments(args[0]);
                if (ParserHelpers.ParseCommaSeparatedColor(vals.ToArray(), callback, converters, out var rs)) return rs;
            }
            else if (args.Length == 3 || args.Length == 4)
            {
                if (ParserHelpers.ParseCommaSeparatedColor(args, callback, converters, out var rs)) return rs;
            }

            return null;
        }

        private static bool TryGetSpace(
            string name,
            out List<StyleConverterBase> converters,
            out ParserHelpers.ColorCallback callback,
            out string[] keywords,
            out Action<Color, float[]> decompose
        )
        {
            if ("lab".Equals(name, StringComparison.OrdinalIgnoreCase))
            {
                converters = LabConverters;
                callback = (l, a, b, alpha) => ColorSpaces.LabToColor(l, a, b, alpha);
                keywords = RelativeColor.LabKeywords;
                decompose = RelativeColor.DecomposeLab;
                return true;
            }

            if ("lch".Equals(name, StringComparison.OrdinalIgnoreCase))
            {
                converters = LchConverters;
                callback = (l, c, h, alpha) => ColorSpaces.LchToColor(l, c, h, alpha);
                keywords = RelativeColor.LchKeywords;
                decompose = RelativeColor.DecomposeLch;
                return true;
            }

            if ("oklab".Equals(name, StringComparison.OrdinalIgnoreCase))
            {
                converters = OklabConverters;
                callback = (l, a, b, alpha) => ColorSpaces.OklabToColor(l, a, b, alpha);
                keywords = RelativeColor.LabKeywords;
                decompose = RelativeColor.DecomposeOklab;
                return true;
            }

            if ("oklch".Equals(name, StringComparison.OrdinalIgnoreCase))
            {
                converters = OklchConverters;
                callback = (l, c, h, alpha) => ColorSpaces.OklchToColor(l, c, h, alpha);
                keywords = RelativeColor.LchKeywords;
                decompose = RelativeColor.DecomposeOklch;
                return true;
            }

            converters = null;
            callback = null;
            keywords = null;
            decompose = null;
            return false;
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count == 1 || count == 3 || count == 4;
    }
}
