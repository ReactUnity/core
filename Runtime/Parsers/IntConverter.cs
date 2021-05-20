using System;
using UnityEngine;

namespace ReactUnity.Styling.Parsers
{
    public class IntConverter : IStyleParser, IStyleConverter
    {
        public FloatConverter FloatParser = new FloatConverter(new System.Collections.Generic.Dictionary<string, float> {
            { "pt", 1 },
            { "px", 1 },
            { "%", 0.01f },
        });

        public object FromString(string value)
        {
            var pr = FloatParser.FromString(value);
            if (pr is float f) return Mathf.RoundToInt(f);
            return CssKeyword.Invalid;
        }

        public object Convert(object value)
        {
            if (value is float f) return Mathf.RoundToInt(f);
            if (value is double d) return (int)Math.Round(d);
            return FromString(value?.ToString());
        }
    }
}
