using ReactUnity.Styling.Types;
using System;
using UnityEngine;

namespace ReactUnity.Styling.Parsers
{
    public class IntParser : IStyleParser
    {
        public FloatParser FloatParser = new FloatParser();

        public object FromString(string value)
        {
            var pr = FloatParser.FromString(value);
            if (pr is float f) return Mathf.RoundToInt(f);
            return SpecialNames.CantParse;
        }
    }

    public class IntConverter : IStyleConverter
    {
        IntParser parser = new IntParser();

        public object Convert(object value)
        {
            if (value is float f) return Mathf.RoundToInt(f);
            if (value is double d) return (int) Math.Round(d);
            return parser.FromString(value?.ToString());
        }
    }
}
