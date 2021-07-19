using ReactUnity.Converters;
using ReactUnity.Types;

namespace ReactUnity.Animations
{
    public class TransitionList : CommaSeparatedList<Transition>
    {
        public TransitionList(string definition) : base(definition) { }
        public TransitionList(Transition item) : base(item) { }
        public TransitionList(Transition[] items) : base(items) { }

        protected override Transition CreateItem(string definition)
        {
            return new Transition(definition);
        }

        public class Converter : IStyleParser, IStyleConverter
        {
            public object Convert(object value)
            {
                if (value is TransitionList f) return f;
                if (value is Transition t) return new TransitionList(t);
                return FromString(value?.ToString());
            }

            public object FromString(string value)
            {
                if (string.IsNullOrWhiteSpace(value)) return null;
                return new TransitionList(value);
            }
        }
    }

    public class Transition : ICommaSeparatedListItem
    {
        public string Definition { get; }
        public float Delay { get; } = 0;
        public float Duration { get; } = 0;
        public string Property { get; } = "all";
        public AnimationPlayState PlayState { get; }
        public TimingFunction TimingFunction { get; } = TimingFunctions.Ease;
        public bool Valid { get; } = true;
        public bool All { get; } = true;

        public Transition(string definition)
        {
            Definition = definition;
            var splits = ParserHelpers.SplitWhitespace(definition);

            if (splits.Count == 0)
            {
                Valid = false;
                return;
            }

            var durationSet = false;
            var delaySet = false;
            var playStateSet = false;
            var nameSet = false;
            var timingSet = false;

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];

                var dur = AllConverters.DurationConverter.Convert(split);

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

                var ps = !playStateSet ? AllConverters.Get<AnimationPlayState>().Convert(split) : null;

                if (ps is AnimationPlayState psd)
                {
                    PlayState = psd;
                    playStateSet = true;
                    continue;
                }

                var tm = !timingSet ? AllConverters.TimingFunctionConverter.Convert(split) : null;

                if (tm is TimingFunction tmf)
                {
                    TimingFunction = tmf;
                    timingSet = true;
                    continue;
                }


                if (!nameSet)
                {
                    Property = split;
                    All = string.IsNullOrWhiteSpace(Property) || Property.ToLowerInvariant() == "all";
                    nameSet = true;
                    continue;
                }
                else Valid = false;
            }
        }
    }
}
