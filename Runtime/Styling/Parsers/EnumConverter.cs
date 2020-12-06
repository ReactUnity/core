using System;
using ReactUnity.Styling.Types;

namespace ReactUnity.Styling.Parsers
{
    public class EnumConverter<T> : IStyleParser, IStyleConverter where T : struct, Enum
    {
        public object Convert(object value)
        {
            if (value == null) return SpecialNames.CantParse;
            if (value is T t) return t;
            if (value is int i) return System.Convert.ChangeType(i, typeof(T));
            return FromString(value?.ToString());
        }

        public object FromString(string value)
        {
            if (value != null && Enum.TryParse<T>(value.Replace("-", "").ToLowerInvariant(), true, out var res)) return res;
            return SpecialNames.CantParse;
        }
    }
}
