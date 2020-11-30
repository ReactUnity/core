using ReactUnity.Styling.Types;
using System.Globalization;
using System.Text.RegularExpressions;

namespace ReactUnity.Styling.Parsers
{
    public class FloatParser : IStyleParser
    {
        static CultureInfo culture = new CultureInfo("en-US");
        public static Regex PxRegex = new Regex("px$");
        public static Regex PercentRegex = new Regex("%$");

        public object FromString(string value)
        {
            if (PercentRegex.IsMatch(value)) return float.Parse(PercentRegex.Replace(value, ""), culture) / 100;
            if (PxRegex.IsMatch(value)) value = PxRegex.Replace(value, "");
            if (float.TryParse(value, NumberStyles.Float, culture, out var res)) return res;
            return SpecialNames.CantParse;
        }
    }

    public class FloatConverter : IStyleConverter
    {
        FloatParser parser = new FloatParser();

        public object Convert(object value)
        {
            if (value is int i) return (float) i;
            if (value is double d) return (float) d;
            return parser.FromString(value?.ToString());
        }
    }
}
