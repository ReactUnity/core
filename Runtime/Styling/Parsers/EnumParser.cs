using System;

namespace ReactUnity.Styling.Parsers
{
    public class EnumParser<T> : IStyleParser
    {
        public object FromString(string value)
        {
            return Enum.Parse(typeof(T), value, true);
        }
    }
}
