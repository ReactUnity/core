using ReactUnity.Styling;
using ReactUnity.Styling.Parsers;
using System.Collections.Generic;

namespace ReactUnity.Animations
{
    public class AnimationList
    {
        public string Definition { get; }
        public Dictionary<string, Animation> Animations { get; } = new Dictionary<string, Animation>();
        public bool Any { get; private set; } = false;


        public AnimationList(Animation tr)
        {
            AddAnimation(tr);
            Definition = tr.Definition;
        }

        public AnimationList(string definition)
        {
            Definition = definition;
            var splits = ParserHelpers.Split(definition, ',');

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

        public static bool operator ==(AnimationList left, AnimationList right) => left?.Definition == right?.Definition;
        public static bool operator !=(AnimationList left, AnimationList right) => left?.Definition != right?.Definition;
        public override bool Equals(object obj) => base.Equals(obj);
        public override int GetHashCode() => Definition.GetHashCode();

        public class Converter : IStyleParser, IStyleConverter
        {
            public object Convert(object value)
            {
                if (value is AnimationList f) return f;
                if (value is Animation t) return new AnimationList(t);
                return FromString(value?.ToString());
            }

            public object FromString(string value)
            {
                if (string.IsNullOrWhiteSpace(value)) return null;
                return new AnimationList(value);
            }
        }
    }

    public class Animation
    {
        public string Definition { get; }
        public float Delay { get; } = 0;
        public float Duration { get; } = 0;
        public int IterationCount { get; } = 1;
        public string Name { get; }
        public TimingFunction TimingFunction { get; } = TimingFunctions.Ease;
        public bool Valid { get; } = true;
        public AnimationFillMode FillMode;
        public AnimationDirection Direction;

        public Animation(string definition)
        {
            Definition = definition;
            var splits = ParserHelpers.Split(definition, ' ');

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
