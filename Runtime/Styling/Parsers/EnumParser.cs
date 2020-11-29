using System;
using ReactUnity.Styling.Types;

namespace ReactUnity.Styling.Parsers
{
    public class EnumParser<T> : IStyleParser where T : struct
    {
        public object FromString(string value)
        {
            if (value != null && Enum.TryParse<T>(value.Replace("-", ""), true, out var res)) return res;
            return SpecialNames.CantParse;
        }
    }
}
