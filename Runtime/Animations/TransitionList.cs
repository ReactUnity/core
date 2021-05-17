using ReactUnity.Styling;
using ReactUnity.Styling.Parsers;
using System.Collections.Generic;

namespace ReactUnity.Animations
{
    public class TransitionList
    {
        public string Definition { get; }
        public Dictionary<string, Transition> Transitions { get; } = new Dictionary<string, Transition>();
        public Transition All { get; private set; }
        public bool Any { get; private set; } = false;

        public TransitionList(Transition tr)
        {
            Definition = tr.Definition;
            AddTransition(tr);
        }

        public TransitionList(string definition)
        {
            Definition = definition;
            var splits = ParserHelpers.Split(definition, ',');

            foreach (var split in splits)
            {
                var tr = new Transition(split);
                AddTransition(tr);
            }
        }

        private void AddTransition(Transition tr)
        {
            if (tr.Property == null || tr.Property == "all") Transitions["all"] = All = tr;
            else Transitions[tr.Property] = tr;
            Any = Any || tr.Valid;
        }

        public static bool operator ==(TransitionList left, TransitionList right) => left?.Definition == right?.Definition;
        public static bool operator !=(TransitionList left, TransitionList right) => left?.Definition != right?.Definition;
        public override bool Equals(object obj) => base.Equals(obj);
        public override int GetHashCode() => Definition.GetHashCode();


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

    public class Transition
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
