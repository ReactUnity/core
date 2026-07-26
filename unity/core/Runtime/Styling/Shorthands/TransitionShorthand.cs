using System.Collections.Generic;

using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Shorthands
{
    internal class TransitionShorthand : StyleShorthand
    {
        private static StyleConverterBase PlayStateConverter = AllConverters.Get<AnimationPlayState>();

        public override List<IStyleProperty> ModifiedProperties { get; } = new List<IStyleProperty>
        {
            StyleProperties.transitionProperty,
            StyleProperties.transitionDuration,
            StyleProperties.transitionTimingFunction,
            StyleProperties.transitionDelay,
            StyleProperties.transitionPlayState,
        };

        public TransitionShorthand(string name) : base(name) { }

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var commas = ParserHelpers.SplitComma(value?.ToString());
            var count = commas.Count;
            var names = new IComputedValue[count];
            var states = new IComputedValue[count];
            var durations = new IComputedValue[count];
            var easings = new IComputedValue[count];
            var delays = new IComputedValue[count];

            for (int ci = 0; ci < count; ci++)
            {
                var comma = commas[ci];
                var splits = ParserHelpers.SplitWhitespace(comma);

                if (splits.Count == 0) return null;

                var durationSet = false;
                var delaySet = false;
                var playStateSet = false;
                var nameSet = false;
                var timingSet = false;

                for (int i = 0; i < splits.Count; i++)
                {
                    var split = splits[i];

                    if (AllConverters.DurationConverter.TryParse(split, out var f))
                    {
                        if (!durationSet)
                        {
                            durations[ci] = f;
                            durationSet = true;
                        }
                        else if (!delaySet)
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

                    if (!playStateSet && PlayStateConverter.TryParse(split, out var psd))
                    {
                        states[ci] = psd;
                        playStateSet = true;
                        continue;
                    }

                    if (!timingSet && AllConverters.TimingFunctionConverter.TryParse(split, out var tmf))
                    {
                        easings[ci] = tmf;
                        timingSet = true;
                        continue;
                    }


                    if (!nameSet)
                    {
                        if (AllConverters.TransitionPropertyConverter.TryParse(split, out var tp))
                        {
                            names[ci] = tp;
                            nameSet = true;
                        }
                        else return null;
                        continue;
                    }
                    else return null;
                }

                if (!nameSet) names[ci] = new ComputedConstant(TransitionProperty.All);
                if (!timingSet) easings[ci] = new ComputedConstant(TimingFunctions.Default);
            }

            collection[StyleProperties.transitionProperty] = StyleProperties.transitionProperty.Converter.FromList(names);
            collection[StyleProperties.transitionDuration] = StyleProperties.transitionDuration.Converter.FromList(durations);
            collection[StyleProperties.transitionTimingFunction] = StyleProperties.transitionTimingFunction.Converter.FromList(easings);
            collection[StyleProperties.transitionDelay] = StyleProperties.transitionDelay.Converter.FromList(delays);
            collection[StyleProperties.transitionPlayState] = StyleProperties.transitionPlayState.Converter.FromList(states);

            return ModifiedProperties;
        }
    }
}
