using System;
using System.Collections.Generic;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Styling.Functions
{
    /// <summary>
    /// CSS Color 5's relative color syntax -- the `from &lt;color&gt;` form every color function
    /// accepts. The origin color is decomposed into the channels of the function it is written in,
    /// and each channel becomes a keyword the three channel slots and the alpha slot can use.
    /// </summary>
    internal static class RelativeColor
    {
        // Each channel keyword is worth what the slot's own converter would make of that number,
        // which is the range CSS Color 5 gives it: `r` is 0..255, hsl's `s` is 0..100, oklch's `l`
        // is 0..1, a hue is degrees and `alpha` is 0..1.

        public static readonly string[] RgbKeywords = { "r", "g", "b", "alpha" };
        public static readonly string[] HslKeywords = { "h", "s", "l", "alpha" };
        public static readonly string[] HsvKeywords = { "h", "s", "v", "alpha" };
        public static readonly string[] LabKeywords = { "l", "a", "b", "alpha" };
        public static readonly string[] LchKeywords = { "l", "c", "h", "alpha" };

        /// <summary>Whether a function's single argument opens with the `from` keyword.</summary>
        public static bool IsRelative(string[] args)
        {
            if (args == null || args.Length != 1) return false;

            var val = args[0]?.TrimStart();
            if (val == null || val.Length <= 4) return false;

            return char.IsWhiteSpace(val[4]) && string.Compare(val, 0, "from", 0, 4, StringComparison.OrdinalIgnoreCase) == 0;
        }

        /// <summary>
        /// `from &lt;color&gt; &lt;c1&gt; &lt;c2&gt; &lt;c3&gt; [/ &lt;alpha&gt;]`, where every
        /// channel may be a number, a percentage, `none`, a channel keyword or a calc() over them.
        /// </summary>
        public static bool TryParse(
            string arg,
            string[] keywords,
            IList<StyleConverterBase> converters,
            Action<Color, float[]> decompose,
            ParserHelpers.ColorCallback callback,
            out IComputedValue result
        )
        {
            result = null;

            var tokens = ParserHelpers.ParseSpaceSeparatedColorArguments(arg);
            if (tokens.Count != 5 && tokens.Count != 6) return false;

            if (!AllConverters.ColorConverter.TryConvert(tokens[1], out var origin)) return false;

            var context = new RelativeColorContext();

            if (StylingUtils.UnboxConstant(origin, out var constant) && constant is Color literal)
            {
                context.Literal = new float[4];
                decompose(literal, context.Literal);
            }

            var map = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
            for (int i = 0; i < keywords.Length; i++) map[keywords[i]] = i;

            var slots = new List<StyleConverterBase>(4);
            for (int i = 0; i < 4; i++)
            {
                if (!(converters[i] is FloatConverter fc)) return false;
                slots.Add(new RelativeChannelConverter(fc, map, context));
            }

            // An omitted alpha is the origin's own, which is exactly what the alpha keyword means.
            var vals = new string[4];
            for (int i = 0; i < 3; i++) vals[i] = tokens[i + 2];
            vals[3] = tokens.Count == 6 ? tokens[5] : keywords[3];

            if (!ParserHelpers.ParseCommaSeparatedColor(vals, callback, slots, out var channels)) return false;

            result = context.Literal != null ? channels : new ComputedRelativeColor(origin, channels, context, decompose);
            return true;
        }

        public static void DecomposeRgb(Color color, float[] channels)
        {
            channels[0] = color.r * 255f;
            channels[1] = color.g * 255f;
            channels[2] = color.b * 255f;
            channels[3] = color.a;
        }

        public static void DecomposeHsl(Color color, float[] channels)
        {
            ColorSpaces.ColorToHsl(color, out var h, out var s, out var l);
            channels[0] = h;
            channels[1] = s * 100f;
            channels[2] = l * 100f;
            channels[3] = color.a;
        }

        public static void DecomposeHsv(Color color, float[] channels)
        {
            Color.RGBToHSV(color, out var h, out var s, out var v);
            channels[0] = h * 360f;
            channels[1] = s * 100f;
            channels[2] = v * 100f;
            channels[3] = color.a;
        }

        public static void DecomposeLab(Color color, float[] channels)
        {
            ColorSpaces.ColorToLab(color, out channels[0], out channels[1], out channels[2]);
            channels[3] = color.a;
        }

        public static void DecomposeLch(Color color, float[] channels)
        {
            ColorSpaces.ColorToLch(color, out channels[0], out channels[1], out channels[2]);
            channels[3] = color.a;
        }

        public static void DecomposeOklab(Color color, float[] channels)
        {
            ColorSpaces.ColorToOklab(color, out channels[0], out channels[1], out channels[2]);
            channels[3] = color.a;
        }

        public static void DecomposeOklch(Color color, float[] channels)
        {
            ColorSpaces.ColorToOklch(color, out channels[0], out channels[1], out channels[2]);
            channels[3] = color.a;
        }
    }
}
