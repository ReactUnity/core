using ReactUnity.Styling.Types;

namespace ReactUnity.Styling.Parsers
{
    public class FloatParser : IStyleParser
    {
        public object FromString(string value)
        {
            if (value.EndsWith("%")) return float.Parse(value.Replace("%", "")) / 100;
            if (float.TryParse(value, out var res)) return res;
            return SpecialNames.CantParse;
        }
    }
}
