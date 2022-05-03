using System.Collections.Generic;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling.Shorthands
{
    internal class AnimationShorthand : StyleShorthand
    {
        private static StyleConverterBase DirectionConverter = AllConverters.Get<AnimationDirection>();
        private static StyleConverterBase FillModeConverter = AllConverters.Get<AnimationFillMode>();
        private static StyleConverterBase PlayStateConverter = AllConverters.Get<AnimationPlayState>();

        public override List<IStyleProperty> ModifiedProperties { get; } = new List<IStyleProperty>
        {
            StyleProperties.animationDelay,
            StyleProperties.animationDirection,
            StyleProperties.animationDuration,
            StyleProperties.animationFillMode,
            StyleProperties.animationIterationCount,
            StyleProperties.animationName,
            StyleProperties.animationPlayState,
            StyleProperties.animationTimingFunction,
        };

        public AnimationShorthand(string name) : base(name) { }

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            var commas = ParserHelpers.SplitComma(value?.ToString());
            var cnt = commas.Count;
            var iterations = new IComputedValue[cnt];
            var names = new IComputedValue[cnt];
            var directions = new IComputedValue[cnt];
            var fillModes = new IComputedValue[cnt];
            var states = new IComputedValue[cnt];
            var durations = new IComputedValue[cnt];
            var easings = new IComputedValue[cnt];
            var delays = new IComputedValue[cnt];

            for (int ci = 0; ci < cnt; ci++)
            {
                var comma = commas[ci];
                var splits = ParserHelpers.SplitWhitespace(comma);

                if (splits.Count == 0) return null;

                var durationSet = false;
                var delaySet = false;
                var countSet = false;
                var directionSet = false;
                var fillModeSet = false;
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


                    if (!directionSet && DirectionConverter.TryParse(split, out var d))
                    {
                        directions[ci] = d;
                        directionSet = true;
                        continue;
                    }

                    if (!fillModeSet && FillModeConverter.TryParse(split, out var fmd))
                    {
                        fillModes[ci] = fmd;
                        fillModeSet = true;
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


                    if (!nameSet && AllConverters.StringConverter.TryParse(split, out var ss))
                    {
                        names[ci] = ss;
                        nameSet = true;
                        continue;
                    }
                    else return null;
                }

                if (!nameSet) return null;
                if (!durationSet) durations[ci] = new ComputedConstant(0f);
                if (!delaySet) delays[ci] = new ComputedConstant(0f);
                if (!fillModeSet) fillModes[ci] = new ComputedConstant(AnimationFillMode.None);
                if (!directionSet) directions[ci] = new ComputedConstant(AnimationDirection.Normal);
                if (!playStateSet) states[ci] = new ComputedConstant(AnimationPlayState.Running);
                if (!countSet) iterations[ci] = new ComputedConstant(1);
                if (!timingSet) easings[ci] = new ComputedConstant(TimingFunctions.Default);
            }

            collection[StyleProperties.animationName] = StyleProperties.animationName.Converter.FromList(names);
            collection[StyleProperties.animationDuration] = StyleProperties.animationDuration.Converter.FromList(durations);
            collection[StyleProperties.animationTimingFunction] = StyleProperties.animationTimingFunction.Converter.FromList(easings);
            collection[StyleProperties.animationDelay] = StyleProperties.animationDelay.Converter.FromList(delays);
            collection[StyleProperties.animationPlayState] = StyleProperties.animationPlayState.Converter.FromList(states);
            collection[StyleProperties.animationIterationCount] = StyleProperties.animationIterationCount.Converter.FromList(iterations);
            collection[StyleProperties.animationFillMode] = StyleProperties.animationFillMode.Converter.FromList(fillModes);
            collection[StyleProperties.animationDirection] = StyleProperties.animationDirection.Converter.FromList(directions);

            return ModifiedProperties;
        }
    }
}
