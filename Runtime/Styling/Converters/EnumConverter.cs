using System;

using ReactUnity.Styling.Computed;

namespace ReactUnity.Styling.Converters
{
    public class EnumConverter : StyleConverterBase
    {
        public Type EnumType { get; }
        public bool AllowFlags { get; }
        public bool KeywordOnly { get; }

        protected override Type TargetType => EnumType;

        public override bool CanHandleKeyword(CssKeyword keyword) => Enum.IsDefined(EnumType, keyword.ToString());


        public EnumConverter(Type enumType, bool keywordOnly)
        {
            EnumType = enumType;
            AllowFlags = enumType.GetCustomAttributes(typeof(FlagsAttribute), false).Length > 0;
            KeywordOnly = keywordOnly;
        }

        public EnumConverter(Type enumType, bool allowFlags, bool keywordOnly)
        {
            EnumType = enumType;
            AllowFlags = allowFlags;
            KeywordOnly = keywordOnly;
        }


        public static bool Convert(Type type, object value, bool allowFlags, bool keywordOnly, out IComputedValue result)
        {
            if (!keywordOnly && value is int i)
            {
                result = new ComputedConstant(Enum.ToObject(type, i));
                return true;
            }

            result = null;
            return false;
        }

        public static bool FromString(Type type, string value, bool allowFlags, bool keywordOnly, out IComputedValue result)
        {
            if (allowFlags && value.Contains(","))
            {
                var splits = ParserHelpers.SplitComma(value);

                var enumValue = 0;

                for (int i = 0; i < splits.Count; i++)
                {
                    var split = splits[i];

                    var parsed = Enum.TryParse(type, split.Replace("-", "").ToLowerInvariant(), true, out var splitRes);

                    if (parsed &&
                        (!keywordOnly || !int.TryParse(value, out _)) &&
                        Enum.IsDefined(type, splitRes) &&
                        Enum.IsDefined(type, splitRes)) enumValue = enumValue | (System.Convert.ToInt32(splitRes));
                    else
                    {
                        result = null;
                        return false;
                    }
                }

                result = new ComputedConstant(Enum.ToObject(type, enumValue));
                return true;
            }


            if ((!keywordOnly || !int.TryParse(value, out _)) &&
                Enum.TryParse(type, value.Replace("-", "").ToLowerInvariant(), true, out var res) &&
                Enum.IsDefined(type, res))
            {
                result = new ComputedConstant(res);
                return true;
            }

            result = null;
            return false;
        }

        protected override bool ConvertInternal(object value, out IComputedValue result)
        {
            return Convert(EnumType, value, AllowFlags, KeywordOnly, out result);
        }

        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            return FromString(EnumType, value, AllowFlags, KeywordOnly, out result);
        }
    }

    public class EnumConverter<T> : EnumConverter where T : struct, Enum
    {
        public EnumConverter(bool allowFlags, bool keywordOnly) : base(typeof(T), allowFlags, keywordOnly) { }
        public EnumConverter(bool keywordOnly) : this(typeof(T).GetCustomAttributes(typeof(FlagsAttribute), false).Length > 0, keywordOnly) { }
    }
}
