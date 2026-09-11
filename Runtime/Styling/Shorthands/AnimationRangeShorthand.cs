using System.Collections.Generic;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Shorthands
{
    /// <summary>
    /// <c>animation-range: &lt;start&gt; &lt;end&gt;?</c>. A bare range name left on its own covers
    /// that whole range, so <c>entry</c> is <c>entry entry</c>; anything else ends at <c>normal</c>.
    /// </summary>
    internal class AnimationRangeShorthand : StyleShorthand
    {
        public override List<IStyleProperty> ModifiedProperties { get; } = new List<IStyleProperty>
        {
            StyleProperties.animationRangeStart,
            StyleProperties.animationRangeEnd,
        };

        public AnimationRangeShorthand(string name) : base(name) { }

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var commas = ParserHelpers.SplitComma(value?.ToString());
            var cnt = commas.Count;
            var starts = new IComputedValue[cnt];
            var ends = new IComputedValue[cnt];

            for (int ci = 0; ci < cnt; ci++)
            {
                var splits = ParserHelpers.SplitWhitespace(commas[ci]);
                var index = 0;

                var start = ReadBoundary(splits, ref index, out var bareName);
                if (start == null) return null;

                string end;
                if (index < splits.Count)
                {
                    end = ReadBoundary(splits, ref index, out _);
                    if (end == null) return null;
                }
                else end = bareName ?? "normal";

                if (index != splits.Count) return null;

                if (!AllConverters.AnimationRangeConverter.TryParse(start, out starts[ci])) return null;
                if (!AllConverters.AnimationRangeConverter.TryParse(end, out ends[ci])) return null;
            }

            collection[StyleProperties.animationRangeStart] = StyleProperties.animationRangeStart.Converter.FromList(starts);
            collection[StyleProperties.animationRangeEnd] = StyleProperties.animationRangeEnd.Converter.FromList(ends);

            return ModifiedProperties;
        }

        // A named range may be followed by an offset into it, so the split between the two ends of
        // the shorthand is only known after reading the first one.
        private static string ReadBoundary(List<string> splits, ref int index, out string bareName)
        {
            bareName = null;
            if (index >= splits.Count) return null;

            var token = splits[index].Trim();
            index++;

            if (!AnimationRangeConverter.TryParseRangeName(token, out _)) return token;

            if (index < splits.Count
                && !AnimationRangeConverter.TryParseRangeName(splits[index].Trim(), out _)
                && AllConverters.YogaValueConverter.TryParse(splits[index].Trim(), out _))
            {
                var offset = splits[index].Trim();
                index++;
                return token + " " + offset;
            }

            bareName = token;
            return token;
        }
    }
}
