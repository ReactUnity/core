using System.Collections.Generic;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using TMPro;

namespace ReactUnity.Styling.Computed
{
    /// <summary>
    /// A <c>font-family</c> list, resolved when it is read rather than when it is parsed: the weight
    /// and slope that pick a family's face belong to the element, so an inherited list gives a bold
    /// child the bold face without the child having to name the family again.
    /// </summary>
    public class ComputedFontFamily : IComputedValue
    {
        /// <summary>Each entry is either a family name, or a <see cref="FontReference"/> written as a url.</summary>
        public readonly IReadOnlyList<object> Entries;

        private readonly int hash;

        public ComputedFontFamily(IReadOnlyList<object> entries)
        {
            Entries = entries;

            var acc = 17;
            for (int i = 0; i < entries.Count; i++) acc = acc * 31 + EntryHash(entries[i]);
            hash = acc;
        }

        public object GetValue(IStyleProperty targetProp, NodeStyle targetStyle, IStyleConverter converter)
        {
            var context = targetStyle?.Context?.Style;
            if (context == null) return FontReference.None;

            var weight = (int) targetStyle.GetStyleValue(StyleProperties.fontWeight);
            var italic = targetStyle.GetStyleValue<FontStyles>(StyleProperties.fontStyle).HasFlag(FontStyles.Italic);

            return context.ResolveFontFamily(this, weight, italic);
        }

        // Value equality, so the same list written twice -- an inline style reassigned every frame,
        // most of all -- shares one entry in the context's resolution cache instead of adding one.
        public override int GetHashCode() => hash;

        public override bool Equals(object obj)
        {
            if (!(obj is ComputedFontFamily other) || other.hash != hash || other.Entries.Count != Entries.Count) return false;

            for (int i = 0; i < Entries.Count; i++)
                if (!EntryEquals(Entries[i], other.Entries[i])) return false;

            return true;
        }

        private static int EntryHash(object entry)
        {
            if (entry is FontReference reference) return ((int) reference.Type * 397) ^ (reference.Value?.GetHashCode() ?? 0);
            return entry?.GetHashCode() ?? 0;
        }

        private static bool EntryEquals(object a, object b)
        {
            if (a is FontReference ra) return b is FontReference rb && ra.Type == rb.Type && Equals(ra.Value, rb.Value);
            return Equals(a, b);
        }

        /// <summary>Reads a comma separated list, where an entry is a url or a family name.</summary>
        public static ComputedFontFamily Parse(List<string> splits)
        {
            var entries = new List<object>(splits.Count);

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i].Trim();
                if (split.Length == 0) continue;

                if (AllConverters.UrlConverter.TryGetConstantValue<Url>(split, out var url)) entries.Add(new FontReference(url));
                else entries.Add(StringConverter.Normalize(split));
            }

            if (entries.Count == 0) return null;
            return new ComputedFontFamily(entries);
        }
    }
}
