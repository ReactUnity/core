using System;
using ReactUnity.Styling.Types;

namespace ReactUnity.Styling.Parsers
{
    public class EnumConverter<T> : IStyleParser, IStyleConverter where T : struct, Enum
    {
        public bool AllowFlags { get; }
        public EnumConverter(bool allowFlags = true)
        {
            AllowFlags = allowFlags;
        }

        public object Convert(object value)
        {
            if (value == null) return SpecialNames.CantParse;
            if (value is T t) return t;
            if (value is int i) return Enum.ToObject(typeof(T), i);
            return FromString(value?.ToString());
        }

        public object FromString(string value)
        {
            if (AllowFlags && value.Contains(","))
            {
                var splits = value.Split(',');

                var result = 0;

                for (int i = 0; i < splits.Length; i++)
                {
                    var split = splits[i];

                    var parsed = Enum.TryParse<T>(split.Replace("-", "").ToLowerInvariant(), true, out var splitRes);

                    if (parsed) result = result | (System.Convert.ToInt32(splitRes));
                    else return SpecialNames.CantParse;
                }

                return (T)Enum.ToObject(typeof(T), result);
            }

            if (value != null && Enum.TryParse<T>(value.Replace("-", "").ToLowerInvariant(), true, out var res)) return res;
            return SpecialNames.CantParse;
        }
    }
}
