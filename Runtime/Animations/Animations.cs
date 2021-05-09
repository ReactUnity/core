using ReactUnity.Styling;
using ReactUnity.Styling.Parsers;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace ReactUnity.Animations
{
    public class AnimationList
    {
        public Dictionary<string, Animation> Animations { get; } = new Dictionary<string, Animation>();
        public bool Any { get; private set; } = false;


        public AnimationList()
        {

        }

        public AnimationList(Animation tr)
        {
            AddAnimation(tr);
        }

        public AnimationList(string value)
        {
            var splits = ParserHelpers.Split(value, ',');

            foreach (var split in splits)
            {
                var tr = new Animation(split);
                AddAnimation(tr);
            }
        }

        private void AddAnimation(Animation tr)
        {
            Animations[tr.Name] = tr;
            Any = Any || tr.Valid;
        }
    }

    public class Animation
    {
        public float Delay { get; } = 0;
        public float Duration { get; } = 0;
        public int IterationCount { get; } = 1;
        public string Name { get; }
        public TimingFunction TimingFunction { get; } = TimingFunctions.Ease;
        public bool Valid { get; } = true;
        public AnimationFillMode FillMode;
        public AnimationDirection Direction;

        public Animation() { }

        public Animation(string value)
        {
            var splits = ParserHelpers.Split(value, ' ');

            if (splits.Count == 0)
            {
                Valid = false;
                return;
            }

            var durationSet = false;
            var delaySet = false;
            var countSet = false;
            var directionSet = false;
            var fillModeSet = false;
            var nameSet = false;
            var timingSet = false;

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];

                var dur = ConverterMap.DurationConverter.Convert(split);

                if (dur is float f)
                {
                    if (!durationSet)
                    {
                        Duration = f;
                        durationSet = true;
                    }
                    else if (!delaySet)
                    {
                        Delay = f;
                        delaySet = true;
                    }
                    else
                    {
                        Valid = false;
                    }
                    continue;
                }

                var count = split == "infinite" ? -1 : ConverterMap.IntConverter.Convert(split);

                if (count is int fcount)
                {
                    if (!countSet)
                    {
                        IterationCount = fcount;
                        countSet = true;
                    }
                    else Valid = false;
                    continue;
                }


                var dir = !directionSet ? ConverterMap.AnimationDirectionConverter.Convert(split) : null;

                if (dir is AnimationDirection d)
                {
                    Direction = d;
                    directionSet = true;
                    continue;
                }

                var fm = !fillModeSet ? ConverterMap.AnimationFillModeConverter.Convert(split) : null;

                if (fm is AnimationFillMode fmd)
                {
                    FillMode = fmd;
                    fillModeSet = true;
                    continue;
                }


                var tm = !timingSet ? ConverterMap.TimingFunctionConverter.Convert(split) : null;

                if (tm is TimingFunction tmf)
                {
                    TimingFunction = tmf;
                    timingSet = true;
                    continue;
                }


                if (!nameSet)
                {
                    Name = split;
                    nameSet = true;
                    continue;
                }
                else Valid = false;
            }
        }
    }

    public enum AnimationFillMode
    {
        None = 0,
        Forwards = 1,
        Backwards = 2,
        Both = 3,
    }

    public enum AnimationDirection
    {
        Normal = 0,
        Reverse = 1,
        Alternate = 2,
        AlternateReverse = 3,
    }
}
