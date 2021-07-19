using System.Globalization;
using System.Text.RegularExpressions;
using Facebook.Yoga;
using ReactUnity.Styling;

namespace ReactUnity.Converters
{
    public class YogaValueConverter : IStyleParser, IStyleConverter
    {
        static CultureInfo culture = new CultureInfo("en-US");
        static Regex PxRegex = new Regex("px$");
        public object FromString(string value)
        {
            if (value == "auto") return YogaValue.Auto();
            else if (value.EndsWith("%"))
            {
                if (float.TryParse(value.Replace("%", ""), NumberStyles.Float, culture, out var parsedValue)) return YogaValue.Percent(parsedValue);
                return CssKeyword.Invalid;
            }

            if (float.TryParse(PxRegex.Replace(value, ""), NumberStyles.Float, culture, out var parsedValue2)) return YogaValue.Point(parsedValue2);
            return CssKeyword.Invalid;
        }

        public object Convert(object value)
        {
            if (value == null) return YogaValue.Undefined();
            else if (value is YogaValue c) return c;
            else if (value is double d) return YogaValue.Point((float) d);
            else if (value is int i) return YogaValue.Point(i);
            else if (value is float v) return YogaValue.Point(v);
            return FromString(value?.ToString());
        }
    }
}
