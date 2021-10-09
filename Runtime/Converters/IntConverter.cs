using System;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.Converters
{
    public class IntConverter : IStyleParser, IStyleConverter
    {
        public FloatConverter FloatParser = new FloatConverter(new System.Collections.Generic.Dictionary<string, float> {
            { "pt", 1 },
            { "px", 1 },
            { "%", 0.01f },
        });

        public bool CanHandleKeyword(CssKeyword keyword) => false;

        public object Parse(string value)
        {
            var pr = FloatParser.Parse(value);
            if (pr is float f) return Mathf.RoundToInt(f);
            return CssKeyword.Invalid;
        }

        public object Convert(object value)
        {
            if (value is float f) return Mathf.RoundToInt(f);
            if (value is double d) return (int) Math.Round(d);
            return Parse(value?.ToString());
        }
    }
}
