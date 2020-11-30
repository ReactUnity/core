using Facebook.Yoga;
using ReactUnity.Styling.Types;
using System.Text.RegularExpressions;

namespace ReactUnity.Styling.Parsers
{
    public class YogaValueParser : IStyleParser
    {
        static Regex PxRegex = new Regex("px$");
        public object FromString(string value)
        {
            if (value == "auto") return YogaValue.Auto();
            else if (value.EndsWith("%"))
            {
                if (float.TryParse(value.Replace("%", ""), out var parsedValue)) return YogaValue.Percent(parsedValue);
                return SpecialNames.CantParse;
            }

            if (float.TryParse(PxRegex.Replace(value, ""), out var parsedValue2)) return YogaValue.Point(parsedValue2);
            return SpecialNames.CantParse;
        }
    }

    public class YogaValueConverter : IStyleConverter
    {
        public object Convert(object value)
        {
            if (value == null) return YogaValue.Undefined();
            else if (value is YogaValue c) return c;
            else if (value is double d) return YogaValue.Point((float) d);
            else if (value is int i) return YogaValue.Point(i);
            else if (value is float v) return YogaValue.Point(v);
            else if (value is string s)
            {
                if (s == "auto") return YogaValue.Auto();
                else if (s.EndsWith("%")) return YogaValue.Percent(float.Parse(s.Replace("%", "")));
                else return YogaValue.Point(float.Parse(s));
            }
            else return SpecialNames.CantParse;
        }
    }
}
