using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using ReactUnity.Styling.Computed;
using UnityEngine;

namespace ReactUnity.Styling.Converters
{
    public class FloatConverter : TypedStyleConverterBase<float>
    {
        private static HashSet<string> DefaultAllowedFunctions = new HashSet<string>() { "calc" };
        protected override HashSet<string> AllowedFunctions => DefaultAllowedFunctions;

        static CultureInfo culture = new CultureInfo("en-US");

        Dictionary<string, float> SuffixMap;
        Dictionary<string, Func<float, object>> SuffixMapper;
        bool AllowSuffixless;

        protected virtual Dictionary<string, float> SpecialValues { get; set; }

        public FloatConverter()
        {
            SuffixMap = new Dictionary<string, float>();
            SuffixMapper = new Dictionary<string, Func<float, object>>();
            AllowSuffixless = true;
        }

        public FloatConverter(
            Dictionary<string, float> suffixMap,
            Dictionary<string, Func<float, object>> suffixMapper = null,
            bool allowSuffixless = true
        )
        {
            SuffixMap = suffixMap ?? new Dictionary<string, float>();
            SuffixMapper = suffixMapper ?? new Dictionary<string, Func<float, object>>();
            AllowSuffixless = allowSuffixless;
        }

        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            if (SpecialValues != null && SpecialValues.TryGetValue(value, out var val))
            {
                result = new ComputedConstant(val);
                return true;
            }
            return ParseVal(value, out result);
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
                case TypeCode.Double:
                    result = new ComputedConstant(System.Convert.ToSingle(value));
                    return true;
                default:
                    break;
            }

            return base.ConvertInternal(value, out result);
        }

        private bool ParseVal(string value, out IComputedValue result)
        {
            var i = 0;

            var numberPart = new StringBuilder();
            var suffixPart = new StringBuilder();
            var numberEnded = false;

            while (i < value.Length)
            {
                var c = value[i];
                if (!numberEnded && (char.IsDigit(c) || c == '.' || c == '+' || c == '-')) numberPart.Append(c);
                else
                {
                    numberEnded = true;
                    suffixPart.Append(c);
                }

                i++;
            }

            if (numberPart.Length > 0 && float.TryParse(numberPart.ToString(), NumberStyles.Float, culture, out var res))
            {
                var suffix = suffixPart.ToString();

                var multiplier = 1f;
                if (suffix != "")
                {
                    if (SuffixMapper.TryGetValue(suffix, out var mapper))
                    {
                        result = StylingUtils.CreateComputed(mapper(res));
                        return true;
                    }
                    if (!SuffixMap.TryGetValue(suffix, out multiplier))
                    {
                        result = null;
                        return false;
                    }
                }
                else if (!AllowSuffixless && res != 0)
                {
                    result = null;
                    return false;
                }

                result = new ComputedConstant(res * multiplier);
                return true;
            }

            result = null;
            return false;
        }
    }

    public class PercentageConverter : FloatConverter
    {
        public PercentageConverter() : base(new Dictionary<string, float>
        {
            { "%", 0.01f },
        })
        { }
    }

    public class ColorValueConverter : FloatConverter
    {
        public ColorValueConverter() : base(new Dictionary<string, float>
        {
            { "%", 255 },
        })
        { }
    }

    public class LengthConverter : FloatConverter
    {
        public LengthConverter() : base(
            new Dictionary<string, float>
            {
                { "px", 1 },
                { "pt", 96f / 72f },
                { "pc", 16 },
                { "in", 96 },
                { "cm", 38 },
                { "mm", 3.8f },
                { "Q", 38f / 40f },
                { "%", 0.01f },
            },
            new Dictionary<string, Func<float, object>>
            {
                { "rem", x => new ComputedRootRelative(x, ComputedRootRelative.RootValueType.Rem) },
                { "vw", x => new ComputedRootRelative(x / 100f, ComputedRootRelative.RootValueType.Width) },
                { "vh", x => new ComputedRootRelative(x / 100f, ComputedRootRelative.RootValueType.Height) },
                { "vmin", x => new ComputedRootRelative(x / 100f, ComputedRootRelative.RootValueType.Min) },
                { "vmax", x => new ComputedRootRelative(x / 100f, ComputedRootRelative.RootValueType.Max) },
                { "em", x => new ComputedFontSize(x) },
                //{ "lh", x => new DynamicFontSizeValue(x) },
                //{ "ex", x => new DynamicFontSizeValue(x / 2) },
                //{ "ch", x => new DynamicFontSizeValue(x / 2) }
            }
        )
        { }
    }

    public class FontSizeConverter : FloatConverter
    {
        public FontSizeConverter() : base(
            new Dictionary<string, float>
            {
                { "px", 1 },
                { "pt", 96f / 72f },
                { "pc", 16 },
                { "in", 96 },
                { "cm", 38 },
                { "mm", 3.8f },
                { "Q", 38f / 40f },
            },
            new Dictionary<string, Func<float, object>>
            {
                { "rem", x => new ComputedRootRelative(x, ComputedRootRelative.RootValueType.Rem) },
                { "vw", x => new ComputedRootRelative(x / 100f, ComputedRootRelative.RootValueType.Width) },
                { "vh", x => new ComputedRootRelative(x / 100f, ComputedRootRelative.RootValueType.Height) },
                { "vmin", x => new ComputedRootRelative(x / 100f, ComputedRootRelative.RootValueType.Min) },
                { "vmax", x => new ComputedRootRelative(x / 100f, ComputedRootRelative.RootValueType.Max) },
                { "em", x => new ComputedFontSize(x) },
                { "%", x => new ComputedFontSize(x / 100f) },
                //{ "lh", x => new DynamicFontSizeValue(x) },
                //{ "ex", x => new DynamicFontSizeValue(x / 2) },
                //{ "ch", x => new DynamicFontSizeValue(x / 2) }
            }
        )
        { }
    }

    public class AngleConverter : FloatConverter
    {
        public AngleConverter() : base(new Dictionary<string, float>
        {
            { "deg", 1 },
            { "rad", 180 / Mathf.PI },
            { "grad", 400 / 360f },
            { "turn", 360 },
            { "%", 3.6f },
        })
        {
            SpecialValues = new Dictionary<string, float>
            {
                { "to top", 0 },
                { "to top right", 45 },
                { "to right top", 45 },
                { "to right", 90 },
                { "to bottom right", 135 },
                { "to right bottom", 135 },
                { "to bottom", 180 },
                { "to bottom left", 225 },
                { "to left bottom", 225 },
                { "to left", 270 },
                { "to top left", 315 },
                { "to left top", 315 },
            };
        }
    }

    public class DurationConverter : FloatConverter
    {
        public DurationConverter() : base(new Dictionary<string, float>
        {
            { "ms", 0.001f },
            { "s", 1 },
        }, null, false)
        { }
    }
}
