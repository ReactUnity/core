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
        private static HashSet<string> DefaultAllowedFunctions = new HashSet<string>(StringComparer.InvariantCultureIgnoreCase) {
            "calc", "min", "max", "clamp",
            "round", "mod", "rem", "abs", "sign",
            "sin", "cos", "tan", "asin", "acos", "atan", "atan2",
            "pow", "sqrt", "hypot", "log", "exp",
        };
        protected override HashSet<string> AllowedFunctions => DefaultAllowedFunctions;

        // The numeric constants calc() knows. Only where a bare number is allowed at all, since they are one.
        private static readonly Dictionary<string, float> MathConstants = new Dictionary<string, float>(StringComparer.InvariantCultureIgnoreCase)
        {
            { "pi", Mathf.PI },
            { "e", (float) Math.E },
            { "infinity", float.PositiveInfinity },
            { "-infinity", float.NegativeInfinity },
            { "nan", float.NaN },
        };

        static CultureInfo culture = new CultureInfo("en-US");

        internal Dictionary<string, float> SuffixMap;
        internal Dictionary<string, Func<float, object>> SuffixMapper;
        public bool AllowSuffixless { get; }

        protected virtual Dictionary<string, float> SpecialValues { get; set; }

        public CalcConverter CalcConverter { get; }

        public FloatConverter() : this(null, null, true) { }

        public FloatConverter(
            Dictionary<string, float> suffixMap,
            Dictionary<string, Func<float, object>> suffixMapper = null,
            bool allowSuffixless = true
        )
        {
            SuffixMap = suffixMap ?? new Dictionary<string, float>();
            SuffixMapper = suffixMapper ?? new Dictionary<string, Func<float, object>>();
            AllowSuffixless = allowSuffixless;
            CalcConverter = new CalcConverter(this);
        }

        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            if (SpecialValues != null && SpecialValues.TryGetValue(value, out var val))
            {
                result = new ComputedConstant(val);
                return true;
            }
            if (AllowSuffixless && MathConstants.TryGetValue(value.Trim(), out var constant))
            {
                result = new ComputedConstant(constant);
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

        /// <summary>
        /// What a number with no unit means. A length in pixels, other than where CSS gives a bare
        /// number a meaning of its own.
        /// </summary>
        internal virtual IComputedValue Suffixless(float value) => new ComputedConstant(value);

        private bool ParseVal(string value, out IComputedValue result)
        {
            var i = 0;

            var numberPart = new StringBuilder();
            var suffixPart = new StringBuilder();
            var numberEnded = false;

            while (i < value.Length)
            {
                var c = value[i];
                if (!numberEnded && (char.IsDigit(c) || c == '.' || c == '+' || c == '-' || char.IsWhiteSpace(c))) numberPart.Append(c);
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

                if (suffix == "")
                {
                    if (!AllowSuffixless && res != 0)
                    {
                        result = null;
                        return false;
                    }

                    result = Suffixless(res);
                    return true;
                }

                if (SuffixMapper.TryGetValue(suffix, out var mapper))
                {
                    result = StylingUtils.CreateComputed(mapper(res));
                    return true;
                }

                if (!SuffixMap.TryGetValue(suffix, out var multiplier))
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

        public override string StringifyTyped(float value) => value + "";
    }

    public class PercentageConverter : FloatConverter
    {
        public PercentageConverter() : base(new Dictionary<string, float>
        {
            { "%", 0.01f },
        })
        { }

        public override string StringifyTyped(float value) => value + "%";
    }

    public class ColorValueConverter : FloatConverter
    {
        public ColorValueConverter() : base(new Dictionary<string, float>
        {
            { "%", 255 },
        })
        { }
    }

    /// <summary>
    /// Chroma in oklch(), and the a/b axes in oklab(), where 100% means 0.4.
    /// </summary>
    public class OklchChromaConverter : FloatConverter
    {
        public OklchChromaConverter() : base(new Dictionary<string, float>
        {
            { "%", ColorSpaces.OklchChromaReference / 100f },
        })
        { }
    }

    /// <summary>
    /// Lightness in lab() and lch(), which is 0..100 rather than 0..1, so a percentage is itself.
    /// </summary>
    public class LabLightnessConverter : FloatConverter
    {
        public LabLightnessConverter() : base(new Dictionary<string, float>
        {
            { "%", 1f },
        })
        { }
    }

    /// <summary>
    /// The a/b axes in lab(), where 100% means 125.
    /// </summary>
    public class LabAxisConverter : FloatConverter
    {
        public LabAxisConverter() : base(new Dictionary<string, float>
        {
            { "%", ColorSpaces.LabAxisReference / 100f },
        })
        { }
    }

    /// <summary>
    /// Chroma in lch(), where 100% means 150.
    /// </summary>
    public class LchChromaConverter : FloatConverter
    {
        public LchChromaConverter() : base(new Dictionary<string, float>
        {
            { "%", ColorSpaces.LchChromaReference / 100f },
        })
        { }
    }

    public class LengthConverter : FloatConverter
    {
        private const float CM = 37.8f;
        private const float IN = 96f;

        public static Dictionary<string, float> UnitValueMap = new Dictionary<string, float>
        {
            { "px", 1 },
            { "cm", CM },
            { "mm", CM / 10 },
            { "Q", CM / 40f },
            { "in", IN },
            { "pc", IN / 6 },
            { "pt", IN / 72f },
        };

        public LengthConverter() : base(
            UnitValueMap,
            WithContainerUnits(WithViewportUnits(new Dictionary<string, Func<float, object>>
            {
                { "rem", x => new ComputedRootRelative(x, ComputedRootRelative.RootValueType.Rem) },
                { "em", x => new ComputedFontSize(x) },
                { "%", x => new ComputedPercentage(x) },
                { "lh", x => new ComputedFontProperty(x, ComputedFontProperty.FontPropertyType.LineHeight) },
                { "rlh", x => new ComputedFontProperty(x, ComputedFontProperty.FontPropertyType.RootLineHeight) },
                { "ch", x => new ComputedFontProperty(x, ComputedFontProperty.FontPropertyType.CharacterWidth) },
                { "ex", x => new ComputedFontProperty(x, ComputedFontProperty.FontPropertyType.XHeight) },
            }))
        )
        { }

        /// <summary>
        /// The viewport units. The small/large/dynamic variants only differ where a browser's own bars
        /// can shrink the viewport, and the logical `vi`/`vb` assume horizontal writing, so all map to `vw`/`vh`.
        /// </summary>
        internal static Dictionary<string, Func<float, object>> WithViewportUnits(Dictionary<string, Func<float, object>> map)
        {
            foreach (var prefix in new[] { "v", "dv", "sv", "lv" })
            {
                map[prefix + "w"] = x => new ComputedRootRelative(x / 100f, ComputedRootRelative.RootValueType.Width);
                map[prefix + "h"] = x => new ComputedRootRelative(x / 100f, ComputedRootRelative.RootValueType.Height);
                map[prefix + "min"] = x => new ComputedRootRelative(x / 100f, ComputedRootRelative.RootValueType.Min);
                map[prefix + "max"] = x => new ComputedRootRelative(x / 100f, ComputedRootRelative.RootValueType.Max);
                map[prefix + "i"] = map[prefix + "w"];
                map[prefix + "b"] = map[prefix + "h"];
            }
            return map;
        }

        /// <summary>The container units. `cqi`/`cqb` assume horizontal writing, like `vi`/`vb`.</summary>
        internal static Dictionary<string, Func<float, object>> WithContainerUnits(Dictionary<string, Func<float, object>> map)
        {
            map["cqw"] = map["cqi"] = x => new ComputedContainerRelative(x / 100f, ComputedContainerRelative.Axis.Inline);
            map["cqh"] = map["cqb"] = x => new ComputedContainerRelative(x / 100f, ComputedContainerRelative.Axis.Block);
            map["cqmin"] = x => new ComputedContainerRelative(x / 100f, ComputedContainerRelative.Axis.Min);
            map["cqmax"] = x => new ComputedContainerRelative(x / 100f, ComputedContainerRelative.Axis.Max);
            return map;
        }

        public override string StringifyTyped(float value) => value + "px";
    }

    public class FontSizeConverter : FloatConverter
    {
        public FontSizeConverter() : base(
            LengthConverter.UnitValueMap,
            LengthConverter.WithContainerUnits(LengthConverter.WithViewportUnits(new Dictionary<string, Func<float, object>>
            {
                { "rem", x => new ComputedRootRelative(x, ComputedRootRelative.RootValueType.Rem) },
                { "em", x => new ComputedFontSize(x) },
                { "%", x => new ComputedFontSize(x / 100f) },
                { "lh", x => new ComputedFontProperty(x, ComputedFontProperty.FontPropertyType.LineHeight) },
                { "rlh", x => new ComputedFontProperty(x, ComputedFontProperty.FontPropertyType.RootLineHeight) },
                { "ch", x => new ComputedFontProperty(x, ComputedFontProperty.FontPropertyType.CharacterWidth) },
                { "ex", x => new ComputedFontProperty(x, ComputedFontProperty.FontPropertyType.XHeight) },
            }))
        )
        { }

        public override string StringifyTyped(float value) => value + "px";
    }

    /// <summary>
    /// <c>line-height</c>, where a number with no unit is a multiple of the element's own font size
    /// rather than a length -- which is what the CSS property means, and what a framework's type
    /// scale is written in: Tailwind's `text-base` asks for a line height of `calc(1.5 / 1)`.
    /// </summary>
    public class LineHeightConverter : FontSizeConverter
    {
        internal override IComputedValue Suffixless(float value) => new ComputedFontSize(value);
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

        public override string StringifyTyped(float value) => value + "deg";
    }

    public class DurationConverter : FloatConverter
    {
        public DurationConverter() : base(new Dictionary<string, float>
        {
            { "ms", 0.001f },
            { "s", 1 },
        }, null, false)
        { }

        public override string StringifyTyped(float value) => value + "s";
    }

    public class CalcConverter : TypedStyleConverterBase<ComputedCalc.CalcValue>
    {
        public FloatConverter BaseConverter { get; }

        public bool BasePercentage { get; }
        public bool AllowsUnitless { get; }

        public CalcConverter(FloatConverter baseConverter)
        {
            BaseConverter = baseConverter;
            AllowsUnitless = BaseConverter.AllowSuffixless;
        }

        protected override bool ConvertInternal(object value, out IComputedValue result)
        {
            if (BaseConverter.TryConvert(value, out var floatResult))
            {
                result = ComputedMapper.Create(floatResult, BaseConverter, (res) => {
                    if (res is float f) return new ComputedCalc.CalcValue { Value = f, HasUnit = true };
                    return null;
                });
                return true;
            }

            return base.ConvertInternal(value, out result);
        }

        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            // An operand with no unit is a plain number, whatever the property makes of a bare number
            // alone: `calc(var(--spacing) * 6)` is six times a length, and a divisor has to be unitless.
            if (AllowsUnitless && TryParseUnitless(value, out result)) return true;

            if (BaseConverter.TryConvert(value, out var floatResult))
            {
                result = ComputedMapper.Create(floatResult, BaseConverter, (res) => {
                    if (res is float f) return new ComputedCalc.CalcValue { Value = f, HasUnit = true };
                    return null;
                });
                return true;
            }

            if (TryParseUnitless(value, out result)) return true;

            return base.ParseInternal(value, out result);
        }

        private static bool TryParseUnitless(string value, out IComputedValue result)
        {
            if (!AllConverters.FloatConverter.TryConvert(value, out var unitless))
            {
                result = null;
                return false;
            }

            result = ComputedMapper.Create(unitless, AllConverters.FloatConverter, (res) => {
                if (res is float f) return new ComputedCalc.CalcValue { Value = f, HasUnit = false };
                return null;
            });
            return result != null;
        }
    }
}
