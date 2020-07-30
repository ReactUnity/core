using ReactUnity.Converters;

namespace ReactUnity.Styling.Parsers
{
    public class ColorParser : IStyleParser
    {
        public object FromString(string value)
        {
            return ColorConverter.FromJsValue(value).Value;
        }
    }
}
