using ReactUnity.Styling;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using UnityEngine;

namespace ReactUnity.Converters
{
    public class FloatConverter : IStyleParser, IStyleConverter
    {
        static CultureInfo culture = new CultureInfo("en-US");

        Dictionary<string, float> SuffixMap;
        bool AllowSuffixless;

        public FloatConverter()
        {
            SuffixMap = new Dictionary<string, float>();
            AllowSuffixless = true;
        }

        public FloatConverter(Dictionary<string, float> suffixMap, bool allowSuffixless = true)
        {
            SuffixMap = suffixMap;
            AllowSuffixless = allowSuffixless;
        }


        public object FromString(string value)
        {
            if (value == null) return CssKeyword.Invalid;
            return Parse(value);
        }

        public object Convert(object value)
        {
            if (value is float f) return f;
            if (value is int i) return (float) i;
            if (value is double d) return (float) d;
            return FromString(value?.ToString());
        }

        private object Parse(string value)
        {
            var i = 0;

            var numberPart = new StringBuilder();
            var suffixPart = new StringBuilder();
            var numberEnded = false;

            while (i < value.Length)
            {
                var c = value[i];
                if (!numberEnded && (char.IsDigit(c) || c == '.' || c == '+' || c == '-')) numberPart.Append(c);
                else
                {
                    numberEnded = true;
                    suffixPart.Append(c);
                }

                i++;
            }

            if (numberPart.Length > 0 && float.TryParse(numberPart.ToString(), NumberStyles.Float, culture, out var res))
            {
                var suffix = suffixPart.ToString();

                var multiplier = 1f;
                if (suffix != "")
                {
                    if (!SuffixMap.TryGetValue(suffix, out multiplier)) return CssKeyword.Invalid;
                }
                else if (!AllowSuffixless && res != 0)
                    return CssKeyword.Invalid;


                return res * multiplier;
            }
            else return CssKeyword.Invalid;
        }
    }

    public class PercentageConverter : FloatConverter
    {
        public PercentageConverter() : base(new Dictionary<string, float>
        {
            { "%", 0.01f },
        })
        { }
    }

    public class ColorValueConverter : FloatConverter
    {
        public ColorValueConverter() : base(new Dictionary<string, float>
        {
            { "%", 255 },
        })
        { }
    }

    public class LengthConverter : FloatConverter
    {
        public LengthConverter() : base(new Dictionary<string, float>
        {
            { "px", 1 },
            { "pt", 1 },
            { "%", 0.01f },
        })
        { }
    }

    public class AngleConverter : FloatConverter
    {
        public AngleConverter() : base(new Dictionary<string, float>
        {
            { "deg", 1 },
            { "rad", 180 / Mathf.PI },
            { "grad", 400 / 360f },
            { "turn", 360 },
        })
        { }
    }

    public class DurationConverter : FloatConverter
    {
        public DurationConverter() : base(new Dictionary<string, float>
        {
            { "ms", 1 },
            { "s", 1000 },
        }, false)
        { }
    }
}
