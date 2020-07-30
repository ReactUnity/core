using ReactUnity.Styling.Types;

namespace ReactUnity.Styling.Parsers
{
    public class IntParser : IStyleParser
    {
        public object FromString(string value)
        {
            if (int.TryParse(value, out var res)) return res;
            return SpecialNames.CantParse;
        }
    }
}
