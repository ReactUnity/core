using ReactUnity.Styling.Types;
using System.Globalization;
using System.Text.RegularExpressions;

namespace ReactUnity.Styling.Parsers
{
    public class FloatConverter : IStyleParser, IStyleConverter
    {
        static CultureInfo culture = new CultureInfo("en-US");
        public static Regex PxRegex = new Regex("px$");
        public static Regex PercentRegex = new Regex("%$");

        public object FromString(string value)
        {
            if (value == null) return SpecialNames.CantParse;
            if (PercentRegex.IsMatch(value)) return float.Parse(PercentRegex.Replace(value, ""), culture) / 100;
            if (PxRegex.IsMatch(value)) value = PxRegex.Replace(value, "");
            if (float.TryParse(value, NumberStyles.Float, culture, out var res)) return res;
            return SpecialNames.CantParse;
        }

        public object Convert(object value)
        {
            if (value is float f) return f;
            if (value is int i) return (float) i;
            if (value is double d) return (float) d;
            return FromString(value?.ToString());
        }
    }
}
