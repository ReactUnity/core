using System;
using System.Collections.Generic;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using TMPro;

namespace ReactUnity.Styling.Shorthands
{
    /// <summary>
    /// The <c>text-decoration</c> shorthand. The line and the colour are applied; the style and the
    /// thickness components are parsed and dropped, because TextMeshPro draws the line from the font
    /// asset's own metrics and has no dashed or wavy form.
    /// </summary>
    /// <remarks>
    /// Dropping those two rather than rejecting the declaration is deliberate: <c>text-decoration:
    /// underline dotted red</c> is a single common Tailwind and shadcn idiom, and losing the whole
    /// thing means losing the underline too. Before this shorthand existed that is what happened --
    /// every part reached the line converter, and one it could not spell invalidated the rule.
    /// </remarks>
    internal class TextDecorationShorthand : StyleShorthand
    {
        public override List<IStyleProperty> ModifiedProperties { get; }

        // Classified here rather than by handing each part to the line converter, which also answers
        // to `bold` and `italic` -- neither of them a decoration line. `overline` and `blink` are
        // absent because nothing can draw them, so a rule asking for one stays invalid.
        private static readonly Dictionary<string, FontStyles> Lines = new Dictionary<string, FontStyles>(StringComparer.OrdinalIgnoreCase)
        {
            { "none", FontStyles.Normal },
            { "underline", FontStyles.Underline },
            { "line-through", FontStyles.Strikethrough },
            { "linethrough", FontStyles.Strikethrough },
        };

        private static readonly HashSet<string> Styles = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            "solid", "double", "dotted", "dashed", "wavy",
        };

        private static readonly HashSet<string> Thicknesses = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            "auto", "from-font",
        };

        public TextDecorationShorthand(string name) : base(name)
        {
            ModifiedProperties = new List<IStyleProperty>
            {
                StyleProperties.fontStyle,
                StyleProperties.textDecorationColor,
            };
        }

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var splits = ParserHelpers.SplitWhitespace(value.ToString());
            if (splits.Count == 0) return null;

            var line = FontStyles.Normal;
            var lineSet = false;
            IComputedValue color = null;

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];

                if (Lines.TryGetValue(split, out var flag))
                {
                    line = line | flag;
                    lineSet = true;
                    continue;
                }

                if (Styles.Contains(split) || Thicknesses.Contains(split)) continue;
                // A thickness, which is dropped the same way.
                if (AllConverters.LengthConverter.TryParse(split, out _)) continue;

                if (color == null && AllConverters.ColorConverter.TryParse(split, out var c))
                {
                    color = c;
                    continue;
                }

                return null;
            }

            // Only what was named is written. `fontStyle` is the one property carrying italic, bold
            // and the letter casing as well as the two lines, so resetting it for an omitted line --
            // which is what a CSS shorthand would do -- would clear an inherited `font-style` too.
            if (lineSet) collection[StyleProperties.fontStyle] = new ComputedConstant(line);
            if (color != null) collection[StyleProperties.textDecorationColor] = color;

            return ModifiedProperties;
        }
    }
}
