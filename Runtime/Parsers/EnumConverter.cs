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
            if (value is int i) return Enum.ToObject(typeof(T), i);
            return FromString(value?.ToString());
        }

        public object FromString(string value)
        {
            if (value.Contains(","))
            {
                var splits = value.Split(',');

                var result = 0;

                for (int i = 0; i < splits.Length; i++)
                {
                    var split = splits[i];

                    var splitRes = Enum.Parse(typeof(T), split.Replace("-", "").ToLowerInvariant(), true);

                    result = result | ((int) splitRes);
                }

                return (T) Enum.ToObject(typeof(T), result);
            }

            if (value != null && Enum.TryParse<T>(value.Replace("-", "").ToLowerInvariant(), true, out var res)) return res;
            return SpecialNames.CantParse;
        }
    }
}
