using ReactUnity.Converters;
using ReactUnity.Styling.Types;

namespace ReactUnity.Styling.Parsers
{
    public class ColorParser : IStyleParser
    {
        public object FromString(string value)
        {
            var res = ColorConverter.FromJsValue(value);
            if (!res.HasValue) return SpecialNames.CantParse;
            return res.Value;
        }
    }
}
