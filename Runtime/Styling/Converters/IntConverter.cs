using System;
using ReactUnity.Styling.Computed;
using UnityEngine;

namespace ReactUnity.Styling.Converters
{
    public class IntConverter : StyleConverterBase
    {
        protected override Type TargetType => typeof(int);

        public StyleConverterBase FloatConverter = new FloatConverter(null, null, true);

        public bool AllowFloats { get; set; } = false;
        public bool AllowInfinite { get; set; } = false;
        public int InfiniteValue { get; set; } = -1;
        public int Min { get; set; } = int.MinValue;
        public int Max { get; set; } = int.MaxValue;

        public IntConverter() { }

        private bool Validate(int value, out IComputedValue result)
        {
            if (value > Max || value < Min)
            {
                result = null;
                return false;
            }

            result = new ComputedConstant(value);
            return true;
        }

        protected override bool ConvertInternal(object value, out IComputedValue result)
        {
            if (value is float f && (f % 1 == 0 || AllowFloats))
                return Validate(Mathf.RoundToInt(f), out result);
            if (value is double d && (d % 1 == 0 || AllowFloats))
                return Validate((int) Math.Round(d), out result);

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
                    return Validate((int) value, out result);
                default:
                    break;
            }

            return base.ConvertInternal(value, out result);
        }

        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            if (AllowInfinite && value == "infinite")
            {
                result = new ComputedConstant(InfiniteValue);
                return true;
            }

            if (AllowFloats)
            {
                if (float.TryParse(value, out var floatResult))
                {
                    return Validate(Mathf.RoundToInt(floatResult), out result);
                }
            }
            else if (int.TryParse(value, out var intResult))
            {
                return Validate(intResult, out result);
            }

            return base.ParseInternal(value, out result);
        }
    }

    public class CountConverter : IntConverter
    {
        public CountConverter()
        {
            Min = 0;
            AllowInfinite = true;
        }
    }
}
