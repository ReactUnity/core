using ReactUnity.Converters;

namespace ReactUnity.Styling.Parsers
{
    public class ShadowDefinitionParser : IStyleParser
    {
        public object FromString(string value)
        {
            return YogaValueConverter.NormalizeYogaValue(value);
        }
    }
}
