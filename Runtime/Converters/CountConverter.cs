using System;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.Converters
{
    public class CountConverter : IStyleParser, IStyleConverter
    {
        public FloatConverter FloatConverter = new FloatConverter(null, null, true);

        public bool AllowFloats { get; set; } = false;
        public bool AllowInfinite { get; set; } = true;
        public int InfiniteValue { get; set; } = -1;
        public int Min { get; set; } = 0;
        public int Max { get; set; } = int.MaxValue;

        public CountConverter() { }

        public bool CanHandleKeyword(CssKeyword keyword) => false;

        public object Validate(int value)
        {
            if (value > Max || value < Min) return CssKeyword.Invalid;
            return value;
        }

        public object FromString(string value)
        {
            if (AllowInfinite && value == "infinite") return InfiniteValue;
            var pr = FloatConverter.FromString(value);
            if (pr is float f)
            {
                if (Mathf.Abs(f % 1) < Mathf.Epsilon || AllowFloats)
                    return Validate(Mathf.RoundToInt(f));
            }
            return CssKeyword.Invalid;
        }

        public object Convert(object value)
        {
            if (value is int i) return i;
            if (value is float f && (f % 1 == 0 || AllowFloats))
                return Validate(Mathf.RoundToInt(f));
            if (value is double d && (d % 1 == 0 || AllowFloats))
                return Validate((int) Math.Round(d));
            return FromString(value?.ToString());
        }
    }
}
