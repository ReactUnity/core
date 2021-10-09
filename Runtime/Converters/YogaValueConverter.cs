using System.Globalization;
using Facebook.Yoga;
using ReactUnity.Styling;

namespace ReactUnity.Converters
{
    public class YogaValueConverter : IStyleParser, IStyleConverter
    {
        static CultureInfo culture = new CultureInfo("en-US");

        public bool CanHandleKeyword(CssKeyword keyword) => keyword == CssKeyword.Auto;

        public object Parse(string value)
        {
            if (value == "auto") return YogaValue.Auto();
            else if (value.EndsWith("%"))
            {
                if (float.TryParse(value.Replace("%", ""), NumberStyles.Float, culture, out var parsedValue)) return YogaValue.Percent(parsedValue);
                return CssKeyword.Invalid;
            }

            var converted = AllConverters.LengthConverter.Parse(value);

            if (converted is float f) return YogaValue.Point(f);
            return converted;
        }

        public object Convert(object value)
        {
            if (value == null) return YogaValue.Undefined();
            else if (value is YogaValue c) return c;
            else if (value is double d) return YogaValue.Point((float) d);
            else if (value is int i) return YogaValue.Point(i);
            else if (value is float v) return YogaValue.Point(v);

            if (Equals(value, CssKeyword.Auto)) return YogaValue.Auto();

            return Parse(value?.ToString());
        }
    }
}
