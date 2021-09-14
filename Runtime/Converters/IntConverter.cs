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

        public object FromString(string value)
        {
            var pr = FloatParser.FromString(value);
            if (pr is float f) return Mathf.RoundToInt(f);
            return CssKeyword.Invalid;
        }

        public object Convert(object value)
        {
            if (value is float f) return Mathf.RoundToInt(f);
            if (value is double d) return (int) Math.Round(d);
            return FromString(value?.ToString());
        }
    }


    public class CountConverter : IStyleParser, IStyleConverter
    {
        public FloatConverter FloatConverter = new FloatConverter(null, null, true);

        public bool AllowFloats { get; } = false;

        public CountConverter(bool allowFloats)
        {
            AllowFloats = allowFloats;
        }

        public bool CanHandleKeyword(CssKeyword keyword) => false;

        public object FromString(string value)
        {
            if (value == "infinite") return -1;
            var pr = FloatConverter.FromString(value);
            if (pr is float f)
            {
                if (f % 1 == 0 || AllowFloats)
                    return Mathf.RoundToInt(f);
            }
            return CssKeyword.Invalid;
        }

        public object Convert(object value)
        {
            if (value is float f && (f % 1 == 0 || AllowFloats))
                return Mathf.RoundToInt(f);
            if (value is double d && (d % 1 == 0 || AllowFloats))
                return (int) Math.Round(d);
            return FromString(value?.ToString());
        }
    }
}
