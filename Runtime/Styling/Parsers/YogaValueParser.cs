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
}
