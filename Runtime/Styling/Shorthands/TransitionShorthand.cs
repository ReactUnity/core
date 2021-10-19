using System.Collections.Generic;
using ReactUnity.Converters;
using ReactUnity.Styling.Animations;
using ReactUnity.Types;

namespace ReactUnity.Styling.Shorthands
{
    public class TransitionShorthand : StyleShorthand
    {
        private static GeneralConverter PlayStateConverter = AllConverters.Get<AnimationPlayState>();

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
            var names = new TransitionProperty[count];
            var states = new AnimationPlayState[count];
            var durations = new float[count];
            var easings = new TimingFunction[count];
            var delays = new float[count];

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
                        var nm = AllConverters.TransitionPropertyConverter.Parse(split);

                        if (nm is TransitionProperty tp)
                        {
                            names[ci] = tp;
                            nameSet = true;
                        }
                        else return null;
                        continue;
                    }
                    else return null;
                }

                if (!nameSet) names[ci] = TransitionProperty.All;
                if (!timingSet) easings[ci] = TimingFunctions.Default;
            }

            collection[StyleProperties.transitionProperty] = new CssValueList<TransitionProperty>(names);
            collection[StyleProperties.transitionDuration] = new CssValueList<float>(durations);
            collection[StyleProperties.transitionTimingFunction] = new CssValueList<TimingFunction>(easings);
            collection[StyleProperties.transitionDelay] = new CssValueList<float>(delays);
            collection[StyleProperties.transitionPlayState] = new CssValueList<AnimationPlayState>(states);

            return ModifiedProperties;
        }
    }
}
