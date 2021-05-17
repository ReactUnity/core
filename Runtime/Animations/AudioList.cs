using ReactUnity.Styling;
using ReactUnity.Styling.Parsers;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Animations
{
    public class AudioList
    {
        public string Definition { get; }
        public List<AudioListPart> Parts { get; } = new List<AudioListPart>();
        public bool Any { get; private set; } = false;


        public AudioList(AudioListPart tr)
        {
            AddPart(tr);
            Definition = tr.Definition;
        }

        public AudioList(string definition)
        {
            Definition = definition;
            var splits = ParserHelpers.Split(definition, ',');

            foreach (var split in splits)
            {
                var tr = new AudioListPart(split);
                AddPart(tr);
            }
        }

        private void AddPart(AudioListPart tr)
        {
            Parts.Add(tr);
            Any = Any || tr.Valid;
        }

        public static bool operator ==(AudioList left, AudioList right) => left?.Definition == right?.Definition;
        public static bool operator !=(AudioList left, AudioList right) => left?.Definition != right?.Definition;
        public override bool Equals(object obj) => base.Equals(obj);
        public override int GetHashCode() => Definition.GetHashCode();


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

    public class AudioListPart
    {
        public string Definition { get; }
        public string Url { get; }
        public int IterationCount { get; } = 1;
        public float Delay { get; } = 0;
        public float Start { get; } = 0;
        public float End { get; } = 0;
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
            var startSet = false;
            var endSet = false;
            var urlSet = false;
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

                var dur = ConverterMap.DurationConverter.Convert(split);

                if (dur is float f)
                {
                    if (!delaySet)
                    {
                        Delay = f;
                        delaySet = true;
                    }
                    else if (!startSet)
                    {
                        Start = f;
                        startSet = true;
                    }
                    else if (!endSet)
                    {
                        End = f;
                        endSet = true;
                    }
                    else
                    {
                        Valid = false;
                    }
                    continue;
                }

                if (!urlSet)
                {
                    Url = split;
                    urlSet = true;
                    continue;
                }
                else Valid = false;
            }
        }
    }
}
