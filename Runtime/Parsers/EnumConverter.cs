using System;

namespace ReactUnity.Styling.Parsers
{
    public class EnumConverter : IStyleParser, IStyleConverter
    {
        public Type EnumType { get; }
        public bool AllowFlags { get; }

        public EnumConverter(Type enumType)
        {
            EnumType = enumType;
            AllowFlags = enumType.GetCustomAttributes(typeof(FlagsAttribute), false).Length > 0;
        }

        public EnumConverter(Type enumType, bool allowFlags)
        {
            EnumType = enumType;
            AllowFlags = allowFlags;
        }

        public static object Convert<TEnum>(object value, bool allowFlags = true) where TEnum : struct, Enum
        {
            if (value == null) return CssKeyword.Invalid;
            if (value is TEnum t) return t;
            if (value is int i) return Enum.ToObject(typeof(TEnum), i);
            return FromString<TEnum>(value?.ToString(), allowFlags);
        }

        public static object FromString<TEnum>(string value, bool allowFlags = true) where TEnum : struct, Enum
        {
            if (allowFlags && value.Contains(","))
            {
                var splits = value.Split(',');

                var result = 0;

                for (int i = 0; i < splits.Length; i++)
                {
                    var split = splits[i];

                    var parsed = Enum.TryParse<TEnum>(split.Replace("-", "").ToLowerInvariant(), true, out var splitRes);

                    if (parsed) result = result | (System.Convert.ToInt32(splitRes));
                    else return CssKeyword.Invalid;
                }

                return (TEnum) Enum.ToObject(typeof(TEnum), result);
            }

            if (value != null && Enum.TryParse<TEnum>(value.Replace("-", "").ToLowerInvariant(), true, out var res)) return res;
            return CssKeyword.Invalid;
        }

        public static object Convert(Type type, object value, bool allowFlags = true)
        {
            if (value == null) return CssKeyword.Invalid;
            if (value.GetType() == type) return value;
            if (value is int i) return Enum.ToObject(type, i);
            return FromString(type, value?.ToString(), allowFlags);
        }

        public static object FromString(Type type, string value, bool allowFlags = true)
        {
            if (allowFlags && value.Contains(","))
            {
                var splits = value.Split(',');

                var result = 0;

                for (int i = 0; i < splits.Length; i++)
                {
                    var split = splits[i];

                    var parsed = TryParse(type, split.Replace("-", "").ToLowerInvariant(), out var splitRes);

                    if (parsed) result = result | (System.Convert.ToInt32(splitRes));
                    else return CssKeyword.Invalid;
                }

                return Enum.ToObject(type, result);
            }

            if (value != null && TryParse(type, value.Replace("-", "").ToLowerInvariant(), out var res)) return res;
            return CssKeyword.Invalid;
        }

        private static bool TryParse(Type type, string value, out object res)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                res = CssKeyword.Invalid;
                return false;
            }

            try
            {
                res = Enum.Parse(type, value, true);
                return true;
            }
            catch
            {
                res = CssKeyword.Invalid;
                return false;
            }
        }

        public object Convert(object value) => Convert(EnumType, value, AllowFlags);

        public object FromString(string value) => FromString(EnumType, value, AllowFlags);
    }

    public class EnumConverter<T> : IStyleParser, IStyleConverter where T : struct, Enum
    {
        public bool AllowFlags { get; }
        public EnumConverter()
        {
            AllowFlags = typeof(T).GetCustomAttributes(typeof(FlagsAttribute), false).Length > 0;
        }

        public EnumConverter(bool allowFlags)
        {
            AllowFlags = allowFlags;
        }

        public object Convert(object value) => EnumConverter.Convert<T>(value, AllowFlags);
        public object FromString(string value) => EnumConverter.FromString<T>(value, AllowFlags);
    }
}
