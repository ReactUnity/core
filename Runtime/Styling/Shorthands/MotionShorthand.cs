using System.Collections.Generic;

using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Shorthands
{
    internal class MotionShorthand : StyleShorthand
    {
        public override List<IStyleProperty> ModifiedProperties { get; } = new List<IStyleProperty>
        {
            StyleProperties.motionDuration,
            StyleProperties.motionTimingFunction,
            StyleProperties.motionDelay,
        };

        public MotionShorthand(string name) : base(name) { }

        protected override List<IStyleProperty> ModifyInternal(IDictionary<IStyleProperty, object> collection, object value)
        {
            IComputedValue duration = new ComputedConstant(0f);
            IComputedValue easing = new ComputedConstant(TimingFunctions.Default);
            IComputedValue delay = new ComputedConstant(0f);

            var splits = ParserHelpers.SplitWhitespace(value?.ToString());

            if (splits.Count == 0) return null;

            var durationSet = false;
            var delaySet = false;
            var timingSet = false;

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];

                if (AllConverters.DurationConverter.TryParse(split, out var f))
                {
                    if (!durationSet)
                    {
                        duration = f;
                        durationSet = true;
                    }
                    else if (!delaySet)
                    {
                        delay = f;
                        delaySet = true;
                    }
                    else
                    {
                        return null;
                    }
                    continue;
                }

                if (!timingSet && AllConverters.TimingFunctionConverter.TryParse(split, out var tmf))
                {
                    easing = tmf;
                    timingSet = true;
                    continue;
                }

                else return null;
            }

            collection[StyleProperties.motionDuration] = duration;
            collection[StyleProperties.motionTimingFunction] = easing;
            collection[StyleProperties.motionDelay] = delay;

            return ModifiedProperties;
        }
    }
}
