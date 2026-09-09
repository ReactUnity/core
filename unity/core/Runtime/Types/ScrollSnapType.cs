using System;
using ReactUnity.Styling;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Types
{
    /// <summary>
    /// The axes a scroll container snaps on. There are no writing modes here, so <c>block</c> is read as
    /// the vertical axis and <c>inline</c> as the horizontal one.
    /// </summary>
    [Flags]
    public enum ScrollSnapAxis
    {
        None = 0,
        X = 1,
        Y = 2,
        Both = X | Y,
    }

    /// <summary>
    /// The <c>scroll-snap-type</c> property: which axes snap, and whether a snap point has to be
    /// reached or only be nearby.
    /// </summary>
    public struct ScrollSnapType : IEquatable<ScrollSnapType>
    {
        public static readonly ScrollSnapType None = new ScrollSnapType(ScrollSnapAxis.None, false);

        public ScrollSnapAxis Axis { get; }

        /// <summary>
        /// <c>mandatory</c> rather than <c>proximity</c>: the scroll rests on a snap point however far it
        /// has to travel to reach one, where a proximity snap only takes the ones it is already near.
        /// </summary>
        public bool Mandatory { get; }

        public ScrollSnapType(ScrollSnapAxis axis, bool mandatory)
        {
            Axis = axis;
            Mandatory = mandatory;
        }

        public bool Snaps(bool horizontal) => (Axis & (horizontal ? ScrollSnapAxis.X : ScrollSnapAxis.Y)) != 0;

        public bool Equals(ScrollSnapType other) => Axis == other.Axis && Mandatory == other.Mandatory;
        public override bool Equals(object obj) => obj is ScrollSnapType other && Equals(other);
        public override int GetHashCode() => ((int) Axis << 1) | (Mandatory ? 1 : 0);

        public static bool operator ==(ScrollSnapType left, ScrollSnapType right) => left.Equals(right);
        public static bool operator !=(ScrollSnapType left, ScrollSnapType right) => !left.Equals(right);

        public class Converter : TypedStyleConverterBase<ScrollSnapType>
        {
            public override bool HandleKeyword(CssKeyword keyword, out IComputedValue result)
            {
                if (keyword == CssKeyword.None) return Constant(None, out result);
                return base.HandleKeyword(keyword, out result);
            }

            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                var axis = ScrollSnapAxis.None;
                var strictness = (bool?) null;

                foreach (var word in ParserHelpers.SplitWhitespace(value))
                {
                    if (axis == ScrollSnapAxis.None && TryReadAxis(word, out var read)) axis = read;
                    else if (!strictness.HasValue && word.Equals("mandatory", StringComparison.OrdinalIgnoreCase)) strictness = true;
                    else if (!strictness.HasValue && word.Equals("proximity", StringComparison.OrdinalIgnoreCase)) strictness = false;
                    else return Fail(out result);
                }

                // The strictness is optional and defaults to `proximity`, but the axis is not: a bare
                // `mandatory` names nothing to snap and is no more valid than a misspelling.
                if (axis == ScrollSnapAxis.None) return Fail(out result);

                return Constant(new ScrollSnapType(axis, strictness ?? false), out result);
            }

            private static bool TryReadAxis(string word, out ScrollSnapAxis axis)
            {
                switch (word.ToLowerInvariant())
                {
                    case "x":
                    case "inline":
                        axis = ScrollSnapAxis.X;
                        return true;
                    case "y":
                    case "block":
                        axis = ScrollSnapAxis.Y;
                        return true;
                    case "both":
                        axis = ScrollSnapAxis.Both;
                        return true;
                    default:
                        axis = ScrollSnapAxis.None;
                        return false;
                }
            }

            public override string StringifyTyped(ScrollSnapType value)
            {
                if (value.Axis == ScrollSnapAxis.None) return "none";

                var axis = value.Axis == ScrollSnapAxis.Both ? "both" : value.Axis == ScrollSnapAxis.X ? "x" : "y";
                return value.Mandatory ? axis + " mandatory" : axis + " proximity";
            }
        }
    }
}
