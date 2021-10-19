using System.Collections.Generic;
using ReactUnity.Converters;
using ReactUnity.Types;

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
            var clips = new AudioReference[count];
            var delays = new float[count];
            var iterations = new int[count];

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

                    var it = AllConverters.IterationCountConverter.Parse(split);

                    if (it is int fcount)
                    {
                        if (!countSet)
                        {
                            iterations[ci] = fcount;
                            countSet = true;
                        }
                        else return null;
                        continue;
                    }

                    var dur = AllConverters.DurationConverter.Parse(split);

                    if (dur is float f)
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

                    if (!clipSet)
                    {
                        clips[ci] = AllConverters.AudioReferenceConverter.Parse(split) as AudioReference;
                        clipSet = true;
                        continue;
                    }
                    else return null;
                }

                if (!clipSet) return null;
                if (!countSet) iterations[ci] = 1;
            }

            collection[StyleProperties.audioClip] = new CssValueList<AudioReference>(clips);
            collection[StyleProperties.audioDelay] = new CssValueList<float>(delays);
            collection[StyleProperties.audioIterationCount] = new CssValueList<int>(iterations);

            return ModifiedProperties;
        }
    }
}
