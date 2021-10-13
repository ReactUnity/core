using System.Globalization;
using Facebook.Yoga;
using ReactUnity.Styling;

namespace ReactUnity.Converters
{
    public class YogaValueConverter : IStyleParser, IStyleConverter
    {
        static CultureInfo culture = new CultureInfo("en-US");

        public static readonly YogaValueConverter Horizontal = new YogaValueConverter(true, false);
        public static readonly YogaValueConverter Vertical = new YogaValueConverter(false, true);

        bool AllowHorizontal;
        bool AllowVertical;

        public YogaValueConverter(bool allowHorizontal = false, bool allowVertical = false)
        {
            AllowHorizontal = allowHorizontal;
            AllowVertical = allowVertical;
        }

        public bool CanHandleKeyword(CssKeyword keyword) => keyword == CssKeyword.Auto;

        public object Parse(string value)
        {
            if (value == "auto") return YogaValue.Auto();

            if (AllowHorizontal || AllowVertical)
            {
                if (value == "center") return YogaValue.Percent(50);

                if (AllowHorizontal && value == "left") return YogaValue.Percent(0);
                if (AllowHorizontal && value == "right") return YogaValue.Percent(100);
                if (AllowVertical && value == "top") return YogaValue.Percent(0);
                if (AllowVertical && value == "bottom") return YogaValue.Percent(100);
            }

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
