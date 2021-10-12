using System.Collections.Generic;
using ReactUnity.Converters;
using ReactUnity.Styling.Animations;

namespace ReactUnity.Styling.Shorthands
{
    public class MotionShorthand : StyleShorthand
    {
        public override List<IStyleProperty> ModifiedProperties { get; } = new List<IStyleProperty>
        {
            StyleProperties.motionDuration,
            StyleProperties.motionTimingFunction,
            StyleProperties.motionDelay,
        };

        public MotionShorthand(string name) : base(name) { }

        public override List<IStyleProperty> Modify(IDictionary<IStyleProperty, object> collection, object value)
        {
            if (base.Modify(collection, value) != null) return ModifiedProperties;

            var duration = 0f;
            var easing = TimingFunctions.Default;
            var delay = 0f;

            var splits = ParserHelpers.SplitWhitespace(value?.ToString());

            if (splits.Count == 0) return null;

            var durationSet = false;
            var delaySet = false;
            var timingSet = false;

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];

                var dur = AllConverters.DurationConverter.Parse(split);

                if (dur is float f)
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

                var tm = !timingSet ? AllConverters.TimingFunctionConverter.Parse(split) : null;

                if (tm is TimingFunction tmf)
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
