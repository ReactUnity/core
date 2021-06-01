using ReactUnity.Styling;
using ReactUnity.Styling.Parsers;
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
        public TimingFunction TimingFunction { get; } = TimingFunctions.Ease;
        public bool Valid { get; } = true;
        public bool All { get; } = true;

        public Transition(string definition)
        {
            Definition = definition;
            var splits = ParserHelpers.Split(definition, ' ');


            if (splits.Count == 0)
            {
                Valid = false;
                return;
            }

            var offset = 1;
            var firstChar = splits[0][0];

            if (char.IsDigit(firstChar) || firstChar == '.')
            {
                offset = 0;
            }
            else
            {
                Property = splits[0];
                if (splits.Count < 2)
                {
                    Valid = false;
                    return;
                }
                All = Property == "all";
            }


            var dur = Converters.DurationConverter.Convert(splits[offset]);
            if (dur is float f) Duration = f;
            else Valid = false;

            if (splits.Count > offset + 1)
            {
                var next = splits[offset + 1];
                var last = splits.Count > offset + 2 ? splits[offset + 2] : null;
                var nextIsDelay = false;

                firstChar = next[0];
                if (char.IsDigit(firstChar) || firstChar == '.') nextIsDelay = true;

                var delayString = nextIsDelay ? next : last ?? "0";
                var easing = nextIsDelay ? last ?? "linear" : next;

                dur = Converters.DurationConverter.Convert(delayString);
                if (dur is float delay) Delay = delay;
                else Valid = false;

                var tm = Converters.TimingFunctionConverter.Convert(easing);
                if (tm is TimingFunction tmf) TimingFunction = tmf;
            }
        }
    }
}
