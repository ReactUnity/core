using ReactUnity.Styling.Types;
using System.Text.RegularExpressions;

namespace ReactUnity.Styling.Parsers
{
    public class FloatParser : IStyleParser
    {
        public static Regex PxRegex = new Regex("px$");
        public static Regex PercentRegex = new Regex("%$");

        public object FromString(string value)
        {
            if (PercentRegex.IsMatch(value)) return float.Parse(PercentRegex.Replace(value, "")) / 100;
            if (PxRegex.IsMatch(value)) value = PxRegex.Replace(value, "");
            if (float.TryParse(value, out var res)) return res;
            return SpecialNames.CantParse;
        }
    }
}
