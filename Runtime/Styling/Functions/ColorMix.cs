using System;
using System.Collections.Generic;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Styling.Functions
{
    /// <summary>
    /// color-mix(in &lt;space&gt; [&lt;hue-method&gt; hue]?, &lt;color&gt; &lt;percentage&gt;?, &lt;color&gt; &lt;percentage&gt;?).
    /// The colors stay lazy so that var() and currentColor work as inputs; the percentages must be literal.
    /// </summary>
    internal class ColorMixFunction : ICssFunction
    {
        public string Name { get; } = "color-mix";

        private static List<StyleConverterBase> Converters = new List<StyleConverterBase> {
            AllConverters.ColorConverter,
            AllConverters.ColorConverter,
        };

        public object Call(string name, string[] args, string argsCombined, StyleConverterBase converter)
        {
            if (args.Length != 3) return null;

            if (!TryParseInterpolationMethod(args[0], out var space, out var hueMethod)) return null;

            if (!TrySplitColorAndPercentage(args[1], out var color1, out var pct1)) return null;
            if (!TrySplitColorAndPercentage(args[2], out var color2, out var pct2)) return null;

            if (!TryNormalizePercentages(ref pct1, ref pct2, out var alphaMultiplier)) return null;

            var ratio = pct2.Value;

            if (!ComputedCompound.Create(
                out var result,
                new List<object> { color1, color2 },
                Converters,
                (resolved) => {
                    if (!(resolved[0] is Color from) || !(resolved[1] is Color to)) return null;

                    var mixed = ColorInterpolation.Mix(from, to, ratio, space, hueMethod);
                    mixed.a *= alphaMultiplier;
                    return mixed;
                })) return null;

            return result;
        }

        /// <summary>Parses the leading "in &lt;space&gt;" argument, with an optional "&lt;method&gt; hue" suffix.</summary>
        private static bool TryParseInterpolationMethod(string arg, out ColorInterpolationSpace space, out HueInterpolationMethod hueMethod)
        {
            space = ColorInterpolationSpace.Oklab;
            hueMethod = HueInterpolationMethod.Shorter;

            var tokens = ParserHelpers.SplitWhitespace(arg ?? "");
            if (tokens.Count < 2 || tokens.Count > 4) return false;
            if (!tokens[0].Equals("in", StringComparison.OrdinalIgnoreCase)) return false;
            if (!ColorInterpolation.TryParseSpace(tokens[1], out space)) return false;

            if (tokens.Count == 2) return true;

            // A hue method is only meaningful in a polar space, and must be spelled "<method> hue".
            if (tokens.Count != 4) return false;
            if (ColorInterpolation.HueChannel(space) < 0) return false;
            if (!tokens[3].Equals("hue", StringComparison.OrdinalIgnoreCase)) return false;

            return ColorInterpolation.TryParseHueMethod(tokens[2], out hueMethod);
        }

        /// <summary>The percentage may come before or after the color, and may be absent.</summary>
        private static bool TrySplitColorAndPercentage(string arg, out string color, out float? percentage)
        {
            color = null;
            percentage = null;

            var tokens = ParserHelpers.SplitWhitespace(arg ?? "");
            if (tokens.Count == 0) return false;

            if (tokens.Count > 1 && TryParsePercentage(tokens[tokens.Count - 1], out var trailing))
            {
                percentage = trailing;
                tokens.RemoveAt(tokens.Count - 1);
            }
            else if (tokens.Count > 1 && TryParsePercentage(tokens[0], out var leading))
            {
                percentage = leading;
                tokens.RemoveAt(0);
            }

            color = string.Join(" ", tokens.ToArray()).Trim();
            if (string.IsNullOrEmpty(color)) return false;
            if (percentage.HasValue && percentage.Value < 0) return false;

            return true;
        }

        private static bool TryParsePercentage(string token, out float value)
        {
            value = 0;
            if (string.IsNullOrEmpty(token) || token[token.Length - 1] != '%') return false;
            return AllConverters.PercentageConverter.TryGetConstantValue(token, out value);
        }

        /// <summary>
        /// Fills in an omitted percentage, scales the pair to sum to 1, and reports the alpha
        /// multiplier that a total below 100% implies.
        /// </summary>
        private static bool TryNormalizePercentages(ref float? p1, ref float? p2, out float alphaMultiplier)
        {
            alphaMultiplier = 1;

            if (!p1.HasValue && !p2.HasValue)
            {
                p1 = 0.5f;
                p2 = 0.5f;
                return true;
            }

            if (!p1.HasValue) p1 = Mathf.Max(0, 1 - p2.Value);
            else if (!p2.HasValue) p2 = Mathf.Max(0, 1 - p1.Value);

            var sum = p1.Value + p2.Value;
            if (sum <= 0) return false;

            if (sum < 1) alphaMultiplier = sum;

            p1 = p1.Value / sum;
            p2 = p2.Value / sum;

            return true;
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count == 3;
    }
}
