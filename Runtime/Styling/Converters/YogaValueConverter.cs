using System;
using System.Globalization;
using Facebook.Yoga;
using ReactUnity.Helpers;
using ReactUnity.Styling.Computed;

namespace ReactUnity.Styling.Converters
{
    public class YogaValueConverter : TypedStyleConverterBase<YogaValue>
    {
        static CultureInfo culture = new CultureInfo("en-US");

        public override bool HandleKeyword(CssKeyword keyword, out IComputedValue result)
        {
            if (keyword == CssKeyword.Auto)
            {
                result = new ComputedConstant(YogaValue.Auto());
                return true;
            }

            return base.HandleKeyword(keyword, out result);
        }

        public static readonly YogaValueConverter Horizontal = new YogaValueConverter(true, false);
        public static readonly YogaValueConverter Vertical = new YogaValueConverter(false, true);

        bool AllowHorizontal;
        bool AllowVertical;

        public YogaValueConverter(bool allowHorizontal = false, bool allowVertical = false)
        {
            AllowHorizontal = allowHorizontal;
            AllowVertical = allowVertical;
        }

        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            if (AllowHorizontal || AllowVertical)
            {
                if (value == "center")
                {
                    result = new ComputedConstant(YogaValue.Percent(50));
                    return true;
                }

                if (AllowHorizontal && value == "left")
                {
                    result = new ComputedConstant(YogaValue.Percent(0));
                    return true;
                }
                if (AllowHorizontal && value == "right")
                {
                    result = new ComputedConstant(YogaValue.Percent(100));
                    return true;
                }
                if (AllowVertical && value == "top")
                {
                    result = new ComputedConstant(YogaValue.Percent(0));
                    return true;
                }
                if (AllowVertical && value == "bottom")
                {
                    result = new ComputedConstant(YogaValue.Percent(100));
                    return true;
                }
            }

            if (value.FastEndsWith("%"))
            {
                if (float.TryParse(value.Replace("%", ""), NumberStyles.Float, culture, out var parsedValue))
                {
                    result = new ComputedConstant(YogaValue.Percent(parsedValue));
                    return true;
                }

                result = null;
                return false;
            }

            return ComputedMapper.Create(out result, value, AllConverters.LengthConverter,
                (resolved) => {
                    if (resolved is float f) return YogaValue.Point(f);
                    return null;
                });
        }

        protected override bool ConvertInternal(object value, out IComputedValue result)
        {
            switch (Type.GetTypeCode(value.GetType()))
            {
                case TypeCode.Byte:
                case TypeCode.SByte:
                case TypeCode.UInt16:
                case TypeCode.UInt32:
                case TypeCode.UInt64:
                case TypeCode.Int16:
                case TypeCode.Int32:
                case TypeCode.Int64:
                case TypeCode.Decimal:
                case TypeCode.Single:
                case TypeCode.Double:
                    result = new ComputedConstant(YogaValue.Point(System.Convert.ToSingle(value)));
                    return true;
                default:
                    break;
            }

            result = null;
            return false;
        }
    }
}
