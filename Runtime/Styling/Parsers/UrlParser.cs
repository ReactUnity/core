using ReactUnity.Styling.Types;
using System.Text.RegularExpressions;

namespace ReactUnity.Styling.Parsers
{
    public class UrlParser : IStyleParser
    {
        public static Regex ResourceRegex = new Regex("^resource\\((.*)\\)");
        public static Regex FileRegex = new Regex("^file\\((.*)\\)");
        public static Regex UrlRegex = new Regex("^url\\((.*)\\)");
        public static ColorParser ColorParser = new ColorParser();

        public object FromString(string value)
        {
            return SpecialNames.CantParse;
        }
    }
}
