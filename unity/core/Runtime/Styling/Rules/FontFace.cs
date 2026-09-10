using System;
using System.Collections.Generic;
using ExCSS;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling.Rules
{
    /// <summary>
    /// One <c>@font-face</c> rule: the sources it names, and the weight and slope they cover. Several
    /// rules sharing a <c>font-family</c> form that family, which is how its weights are declared in
    /// CSS rather than in a font asset's own weight table.
    /// </summary>
    public class FontFace
    {
        /// <summary>The weight a face with no <c>font-weight</c> descriptor covers.</summary>
        public const int NormalWeight = 400;
        public const int BoldWeight = 700;

        public string Family { get; }
        public int Weight { get; }
        public bool Italic { get; }

        /// <summary>
        /// The <c>src</c> entries, in order. The first one that loads is the face; the rest are the
        /// alternatives CSS lists for formats a renderer may not have, not glyph fallbacks.
        /// </summary>
        public List<FontReference> Sources { get; }

        private FontReference reference;

        /// <summary>The face as a single reference, which resolves to the first source that loads.</summary>
        public FontReference Reference => reference ??= Sources.Count == 1 ? Sources[0] : new FontFamilyReference(Sources, false);

        internal FontFace(string family, List<FontReference> sources, int weight, bool italic)
        {
            Family = family;
            Sources = sources;
            Weight = weight;
            Italic = italic;
        }

        /// <summary>
        /// Reads a <c>@font-face</c> rule, or returns null when it names no family or no usable source.
        /// </summary>
        public static FontFace Create(IFontFaceRule rule)
        {
            var family = StringConverter.Normalize(rule?.Family?.Trim());
            if (string.IsNullOrEmpty(family)) return null;

            var sources = ParseSources(rule.Source);
            if (sources == null) return null;

            return new FontFace(family, sources, ParseWeight(rule.Weight), IsItalic(rule.Style));
        }

        /// <summary>
        /// How far this face is from the weight and slope asked for -- lower is a better match, and 0
        /// is the variant itself. Slope dominates, as in CSS Fonts 4 5.2.
        /// </summary>
        public int MatchScore(int weight, bool italic)
        {
            return (Italic == italic ? 0 : SlopeMismatch) + WeightScore(Weight, weight);
        }

        /// <summary>Enough to outrank any weight distance, so a face of the right slope always wins.</summary>
        private const int SlopeMismatch = 1 << 24;

        /// <summary>The wrong side of the requested weight, which is only reached once that side is exhausted.</summary>
        private const int WrongDirection = 1 << 12;

        private static int WeightScore(int weight, int desired)
        {
            if (weight == desired) return 0;

            // 400 reaches for 500 before anything lighter, and 500 for 400. Below that, lighter faces
            // come first; above it, heavier ones do.
            if (desired == NormalWeight && weight == 500) return 1;
            if (desired == 500 && weight == NormalWeight) return 1;

            var heavierFirst = desired > 500;
            var heavier = weight > desired;

            var distance = heavier ? weight - desired : desired - weight;
            return (heavier == heavierFirst ? 2 : WrongDirection) + distance;
        }

        private static List<FontReference> ParseSources(string src)
        {
            if (string.IsNullOrWhiteSpace(src)) return null;

            List<FontReference> sources = null;

            foreach (var entry in ParserHelpers.SplitComma(src))
            {
                var reference = ParseSource(entry);
                if (reference == null) continue;

                sources ??= new List<FontReference>();
                sources.Add(reference);
            }

            return sources;
        }

        private static FontReference ParseSource(string entry)
        {
            // `format()` and `tech()` describe a file this renderer never inspects, and `local()` names
            // a system font Unity cannot hand out as a font asset. All three are dropped, which leaves
            // the url of an entry that has one and nothing at all for an entry that does not.
            var source = (string) null;

            foreach (var token in ParserHelpers.SplitWhitespace(entry))
            {
                var (name, _, _) = ParserHelpers.ParseFunction(token);

                if (Is(name, "format") || Is(name, "tech")) continue;
                if (Is(name, "local")) return null;

                if (source != null) return null;
                source = token;
            }

            if (source == null) return null;

            if (AllConverters.UrlConverter.TryGetConstantValue<Types.Url>(source, out var url)) return new FontReference(url);

            // A bare name is another declared family, which is how the sources of one can be aliased.
            return new FontReference(AssetReferenceType.Procedural, StringConverter.Normalize(source));
        }

        private static bool Is(string value, string name) => string.Equals(value, name, StringComparison.OrdinalIgnoreCase);

        private static int ParseWeight(string value)
        {
            var trimmed = value?.Trim();
            if (string.IsNullOrEmpty(trimmed)) return NormalWeight;

            // A `400 700` range is a variable font's, and TextMeshPro has no variable axis to drive --
            // so the low end is the weight this face covers.
            var splits = ParserHelpers.SplitWhitespace(trimmed);
            if (splits.Count > 0) trimmed = splits[0];

            if (trimmed.Equals("bold", StringComparison.OrdinalIgnoreCase)) return BoldWeight;
            if (int.TryParse(trimmed, out var parsed)) return Math.Min(900, Math.Max(100, parsed));

            // `normal`, and anything ExCSS let through that is neither a keyword nor a number.
            return NormalWeight;
        }

        private static bool IsItalic(string value)
        {
            var trimmed = value?.Trim();
            if (string.IsNullOrEmpty(trimmed)) return false;

            return trimmed.StartsWith("italic", StringComparison.OrdinalIgnoreCase)
                || trimmed.StartsWith("oblique", StringComparison.OrdinalIgnoreCase);
        }
    }
}
