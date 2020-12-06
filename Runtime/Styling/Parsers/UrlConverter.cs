using ReactUnity.Styling.Types;
using System.Text.RegularExpressions;

namespace ReactUnity.Styling.Parsers
{
    public class UrlParser : IStyleParser, IStyleConverter
    {
        public static Regex ResourceRegex = new Regex("^resource\\((.*)\\)");
        public static Regex FileRegex = new Regex("^file\\((.*)\\)");
        public static Regex UrlRegex = new Regex("^url\\((.*)\\)");
        public static ColorConverter ColorParser = new ColorConverter();

        public object Convert(object value)
        {
            return FromString(value?.ToString());
        }

        public object FromString(string value)
        {
            return SpecialNames.CantParse;
        }
    }
}
