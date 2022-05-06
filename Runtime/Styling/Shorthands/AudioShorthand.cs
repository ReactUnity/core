using System.Collections.Generic;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Shorthands
{
    internal class AudioShorthand : StyleShorthand
    {
        public override List<IStyleProperty> ModifiedProperties { get; } = new List<IStyleProperty>
        {
            StyleProperties.audioClip,
            StyleProperties.audioDelay,
            StyleProperties.audioIterationCount,
        };

        public AudioShorthand(string name) : base(name) { }

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var commas = ParserHelpers.SplitComma(value?.ToString());
            var count = commas.Count;
            var clips = new IComputedValue[count];
            var delays = new IComputedValue[count];
            var iterations = new IComputedValue[count];

            for (int ci = 0; ci < count; ci++)
            {
                var comma = commas[ci];
                var splits = ParserHelpers.SplitWhitespace(comma);

                if (splits.Count == 0) return null;

                var countSet = false;
                var delaySet = false;
                var clipSet = false;

                for (int i = 0; i < splits.Count; i++)
                {
                    var split = splits[i];

                    if (AllConverters.IterationCountConverter.TryParse(split, out var fcount))
                    {
                        if (!countSet)
                        {
                            iterations[ci] = fcount;
                            countSet = true;
                        }
                        else return null;
                        continue;
                    }

                    if (AllConverters.DurationConverter.TryParse(split, out var f))
                    {
                        if (!delaySet)
                        {
                            delays[ci] = f;
                            delaySet = true;
                        }
                        else
                        {
                            return null;
                        }
                        continue;
                    }

                    if (!clipSet && AllConverters.AudioReferenceConverter.TryParse(split, out var cl))
                    {
                        clips[ci] = cl;
                        clipSet = true;
                        continue;
                    }
                    else return null;
                }

                if (!clipSet) return null;
                if (!delaySet) delays[ci] = new ComputedConstant(0f);
                if (!countSet) iterations[ci] = new ComputedConstant(1);
            }

            collection[StyleProperties.audioClip] = StyleProperties.audioClip.Converter.FromList(clips);
            collection[StyleProperties.audioDelay] = StyleProperties.audioDelay.Converter.FromList(delays);
            collection[StyleProperties.audioIterationCount] = StyleProperties.audioIterationCount.Converter.FromList(iterations);

            return ModifiedProperties;
        }
    }
}
