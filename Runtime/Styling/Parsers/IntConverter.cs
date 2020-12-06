using ReactUnity.Styling.Types;
using System;
using UnityEngine;

namespace ReactUnity.Styling.Parsers
{
    public class IntConverter : IStyleParser, IStyleConverter
    {
        public FloatConverter FloatParser = new FloatConverter();

        public object FromString(string value)
        {
            var pr = FloatParser.FromString(value);
            if (pr is float f) return Mathf.RoundToInt(f);
            return SpecialNames.CantParse;
        }

        public object Convert(object value)
        {
            if (value is float f) return Mathf.RoundToInt(f);
            if (value is double d) return (int) Math.Round(d);
            return FromString(value?.ToString());
        }
    }
}
