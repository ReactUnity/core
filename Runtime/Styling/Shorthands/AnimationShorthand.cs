using System.Collections.Generic;
using ReactUnity.Converters;
using ReactUnity.Styling.Animations;
using ReactUnity.Types;

namespace ReactUnity.Styling.Shorthands
{
    public class AnimationShorthand : StyleShorthand
    {
        private static GeneralConverter DirectionConverter = AllConverters.Get<AnimationDirection>();
        private static GeneralConverter FillModeConverter = AllConverters.Get<AnimationFillMode>();
        private static GeneralConverter PlayStateConverter = AllConverters.Get<AnimationPlayState>();

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

        public override List<IStyleProperty> Modify(IDictionary<IStyleProperty, object> collection, object value)
        {
            if (base.Modify(collection, value) != null) return ModifiedProperties;

            var commas = ParserHelpers.SplitComma(value?.ToString());
            var cnt = commas.Count;
            var iterations = new int[cnt];
            var names = new string[cnt];
            var directions = new AnimationDirection[cnt];
            var fillModes = new AnimationFillMode[cnt];
            var states = new AnimationPlayState[cnt];
            var durations = new float[cnt];
            var easings = new TimingFunction[cnt];
            var delays = new float[cnt];

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

                    var dur = AllConverters.DurationConverter.Parse(split);

                    if (dur is float f)
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

                    var count = AllConverters.IterationCountConverter.Parse(split);

                    if (count is int fcount)
                    {
                        if (!countSet)
                        {
                            iterations[ci] = fcount;
                            countSet = true;
                        }
                        else return null;
                        continue;
                    }


                    var dir = !directionSet ? DirectionConverter.Parse(split) : null;

                    if (dir is AnimationDirection d)
                    {
                        directions[ci] = d;
                        directionSet = true;
                        continue;
                    }

                    var fm = !fillModeSet ? FillModeConverter.Parse(split) : null;

                    if (fm is AnimationFillMode fmd)
                    {
                        fillModes[ci] = fmd;
                        fillModeSet = true;
                        continue;
                    }

                    var ps = !playStateSet ? PlayStateConverter.Parse(split) : null;

                    if (ps is AnimationPlayState psd)
                    {
                        states[ci] = psd;
                        playStateSet = true;
                        continue;
                    }

                    var tm = !timingSet ? AllConverters.TimingFunctionConverter.Parse(split) : null;

                    if (tm is TimingFunction tmf)
                    {
                        easings[ci] = tmf;
                        timingSet = true;
                        continue;
                    }


                    if (!nameSet)
                    {
                        names[ci] = split;
                        nameSet = true;
                        continue;
                    }
                    else return null;
                }

                if (!nameSet) return null;
                if (!countSet) iterations[ci] = 1;
                if (!timingSet) easings[ci] = TimingFunctions.Default;
            }

            collection[StyleProperties.animationName] = new CssValueList<string>(names);
            collection[StyleProperties.animationDuration] = new CssValueList<float>(durations);
            collection[StyleProperties.animationTimingFunction] = new CssValueList<TimingFunction>(easings);
            collection[StyleProperties.animationDelay] = new CssValueList<float>(delays);
            collection[StyleProperties.animationPlayState] = new CssValueList<AnimationPlayState>(states);
            collection[StyleProperties.animationIterationCount] = new CssValueList<int>(iterations);
            collection[StyleProperties.animationFillMode] = new CssValueList<AnimationFillMode>(fillModes);
            collection[StyleProperties.animationDirection] = new CssValueList<AnimationDirection>(directions);

            return ModifiedProperties;
        }
    }
}
