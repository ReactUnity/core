using System;
using ReactUnity.Styling;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Types
{
    /// <summary>Which edge of a snap target lines up with the same edge of the scrollport.</summary>
    public enum ScrollSnapAlignment
    {
        None = 0,
        Start = 1,
        End = 2,
        Center = 3,
    }

    /// <summary>
    /// The <c>scroll-snap-align</c> property, one alignment per axis. A single value covers both, and the
    /// two-value form is written block first -- vertical, then horizontal.
    /// </summary>
    public struct ScrollSnapAlign : IEquatable<ScrollSnapAlign>
    {
        public static readonly ScrollSnapAlign None = new ScrollSnapAlign(ScrollSnapAlignment.None, ScrollSnapAlignment.None);

        public ScrollSnapAlignment Block { get; }
        public ScrollSnapAlignment Inline { get; }

        public ScrollSnapAlign(ScrollSnapAlignment block, ScrollSnapAlignment inline)
        {
            Block = block;
            Inline = inline;
        }

        public ScrollSnapAlignment Get(bool horizontal) => horizontal ? Inline : Block;

        public bool Equals(ScrollSnapAlign other) => Block == other.Block && Inline == other.Inline;
        public override bool Equals(object obj) => obj is ScrollSnapAlign other && Equals(other);
        public override int GetHashCode() => ((int) Block << 2) | (int) Inline;

        public static bool operator ==(ScrollSnapAlign left, ScrollSnapAlign right) => left.Equals(right);
        public static bool operator !=(ScrollSnapAlign left, ScrollSnapAlign right) => !left.Equals(right);

        public class Converter : TypedStyleConverterBase<ScrollSnapAlign>
        {
            public override bool HandleKeyword(CssKeyword keyword, out IComputedValue result)
            {
                if (keyword == CssKeyword.None) return Constant(None, out result);
                return base.HandleKeyword(keyword, out result);
            }

            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                var words = ParserHelpers.SplitWhitespace(value);
                if (words.Count < 1 || words.Count > 2) return Fail(out result);

                if (!TryRead(words[0], out var block)) return Fail(out result);
                if (words.Count == 1) return Constant(new ScrollSnapAlign(block, block), out result);

                if (!TryRead(words[1], out var inline)) return Fail(out result);
                return Constant(new ScrollSnapAlign(block, inline), out result);
            }

            private static bool TryRead(string word, out ScrollSnapAlignment alignment)
            {
                switch (word.ToLowerInvariant())
                {
                    case "none":
                        alignment = ScrollSnapAlignment.None;
                        return true;
                    case "start":
                        alignment = ScrollSnapAlignment.Start;
                        return true;
                    case "end":
                        alignment = ScrollSnapAlignment.End;
                        return true;
                    case "center":
                        alignment = ScrollSnapAlignment.Center;
                        return true;
                    default:
                        alignment = ScrollSnapAlignment.None;
                        return false;
                }
            }

            public override string StringifyTyped(ScrollSnapAlign value)
            {
                var block = Name(value.Block);
                return value.Block == value.Inline ? block : block + " " + Name(value.Inline);
            }

            private static string Name(ScrollSnapAlignment alignment)
            {
                switch (alignment)
                {
                    case ScrollSnapAlignment.Start: return "start";
                    case ScrollSnapAlignment.End: return "end";
                    case ScrollSnapAlignment.Center: return "center";
                    default: return "none";
                }
            }
        }
    }
}
