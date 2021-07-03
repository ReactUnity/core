using ReactUnity.Styling;
using ReactUnity.Styling.Parsers;
using ReactUnity.Types;

namespace ReactUnity.Animations
{
    public class AudioList : CommaSeparatedList<AudioListPart>
    {
        public AudioList(string definition) : base(definition) { }
        public AudioList(AudioListPart item) : base(item) { }
        public AudioList(AudioListPart[] items) : base(items) { }

        protected override AudioListPart CreateItem(string definition)
        {
            return new AudioListPart(definition);
        }

        public class Converter : IStyleParser, IStyleConverter
        {
            public object Convert(object value)
            {
                if (value is AudioList f) return f;
                if (value is AudioListPart t) return new AudioList(t);
                return FromString(value?.ToString());
            }

            public object FromString(string value)
            {
                if (string.IsNullOrWhiteSpace(value)) return null;
                return new AudioList(value);
            }
        }
    }

    public class AudioListPart : ICommaSeparatedListItem
    {
        public string Definition { get; }
        public AudioReference AudioClip { get; }
        public int IterationCount { get; } = 1;
        public float Delay { get; } = 0;
        public bool Local { get; } = false;
        public bool Valid { get; } = true;

        public AudioListPart(string definition)
        {
            Definition = definition;
            var splits = ParserHelpers.Split(definition, ' ');

            if (splits.Count == 0)
            {
                Valid = false;
                return;
            }

            var countSet = false;
            var delaySet = false;
            var clipSet = false;
            var localSet = false;

            for (int i = 0; i < splits.Count; i++)
            {
                var split = splits[i];

                if (split == "local")
                {
                    if (!localSet)
                    {
                        Local = true;
                        localSet = true;
                    }
                    else Valid = false;
                    continue;
                }

                var count = split == "infinite" ? -1 : Converters.IntConverter.Convert(split);

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

                var dur = Converters.DurationConverter.Convert(split);

                if (dur is float f)
                {
                    if (!delaySet)
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

                if (!clipSet)
                {
                    AudioClip = Converters.AudioReferenceConverter.Convert(split) as AudioReference;
                    clipSet = true;
                    continue;
                }
                else Valid = false;
            }

            if (AudioClip == null) Valid = false;
        }
    }
}
