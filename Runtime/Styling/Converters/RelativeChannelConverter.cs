using System.Collections.Generic;
using ReactUnity.Styling.Computed;

namespace ReactUnity.Styling.Converters
{
    /// <summary>
    /// One channel slot of a relative color: the slot's own converter, plus the channel keywords of
    /// the function it belongs to. A keyword is a value and not a unit, so it is an operand inside
    /// calc() like any number -- which is what `rgb(from red calc(r * 0.5) g b)` needs.
    /// </summary>
    internal class RelativeChannelConverter : FloatConverter
    {
        private readonly Dictionary<string, int> Keywords;
        private readonly RelativeColorContext Context;

        public RelativeChannelConverter(FloatConverter baseConverter, Dictionary<string, int> keywords, RelativeColorContext context)
            : base(baseConverter.SuffixMap, baseConverter.SuffixMapper, baseConverter.AllowSuffixless)
        {
            Keywords = keywords;
            Context = context;
        }

        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            if (Keywords.TryGetValue(value.Trim(), out var index))
            {
                // A literal origin was decomposed while parsing, so the keyword is a constant and
                // the whole function folds to one color the way a non-relative one does.
                var literal = Context.Literal;
                if (literal != null) return Constant(literal[index], out result);

                result = new ComputedRelativeChannel(Context, index);
                return true;
            }

            return base.ParseInternal(value, out result);
        }
    }
}
