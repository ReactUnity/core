using ReactUnity.Animations;
using UnityEngine;

namespace ReactUnity.Styling
{
    public interface IDynamicValue
    {
        object Convert(IStyleProperty prop, NodeStyle style);
    }

    public struct DynamicValue : IDynamicValue
    {
        public object Value { get; }
        public DynamicValue(object value)
        {
            if (value is IDynamicValue) throw new System.Exception("Dynamic value cannot wrap another dynamic value");
            Value = value;
        }
        public object Convert(IStyleProperty prop, NodeStyle style)
        {
            return prop.Convert(Value);
        }
    }

    public struct DynamicPropertyValue : IDynamicValue
    {
        public VariableProperty Property { get; }
        public object FallbackValue { get; }

        public DynamicPropertyValue(VariableProperty prop, object fallbackValue)
        {
            Property = prop;
            FallbackValue = fallbackValue;
        }

        public object Convert(IStyleProperty prop, NodeStyle style)
        {
            var val = style.GetRawStyleValue(Property, false);

            if (val == null) val = FallbackValue;

            if (val is IDynamicValue d)
                return d.Convert(prop, style);

            return prop.Convert(val);
        }
    }

    public struct DynamicCurrentColorValue : IDynamicValue
    {
        public static DynamicCurrentColorValue Instance { get; } = new DynamicCurrentColorValue();

        public object Convert(IStyleProperty prop, NodeStyle style)
        {
            var st = style;
            var fromChild = ReferenceEquals(prop, StyleProperties.color);
            if (fromChild) st = style?.Parent;

            var val = st?.GetRawStyleValue(StyleProperties.color, fromChild);

            if (val == null) return null;

            if (val is IDynamicValue d)
                return d.Convert(StyleProperties.color, st);

            return prop.Convert(val);
        }
    }

    public struct DynamicFontSizeValue : IDynamicValue
    {
        public static DynamicFontSizeValue Default { get; } = new DynamicFontSizeValue(1);

        public float Ratio { get; }

        public DynamicFontSizeValue(float ratio)
        {
            Ratio = ratio;
        }

        public object Convert(IStyleProperty prop, NodeStyle style)
        {
            var st = style;
            var fromChild = ReferenceEquals(prop, StyleProperties.fontSize);
            if (fromChild) st = style?.Parent;

            var val = st?.GetRawStyleValue(StyleProperties.fontSize, fromChild);

            if (val == null) return null;

            if (val is IDynamicValue d) val = d.Convert(StyleProperties.fontSize, st);
            else val = prop.Convert(val);

            if (val is float f) return f * Ratio;
            return val;
        }
    }

    public struct DynamicRootValue : IDynamicValue
    {
        public enum RootValueType
        {
            None,
            Width,
            Height,
            Min,
            Max,
            Rem,
        }

        public float Ratio { get; }
        public RootValueType Type { get; }

        public DynamicRootValue(float ratio, RootValueType type)
        {
            Ratio = ratio;
            Type = type;
        }

        public object Convert(IStyleProperty prop, NodeStyle style)
        {
            var size = 0f;

            switch (Type)
            {
                case RootValueType.Width:
                    size = style.Context.Host.Width;
                    break;
                case RootValueType.Height:
                    size = style.Context.Host.Height;
                    break;
                case RootValueType.Min:
                    size = Mathf.Min(style.Context.Host.Width, style.Context.Host.Height);
                    break;
                case RootValueType.Max:
                    size = Mathf.Max(style.Context.Host.Width, style.Context.Host.Height);
                    break;
                case RootValueType.Rem:
                    var hostStyle = style.Context.Host.ComputedStyle;
                    if (style == hostStyle && ReferenceEquals(prop, StyleProperties.fontSize)) size = 24;
                    else size = hostStyle.fontSize;
                    break;
                case RootValueType.None:
                default:
                    break;
            }

            var val = prop.Convert(size);

            if (val is float f) return f * Ratio;
            return val;
        }
    }

    public struct DynamicInterpolatedValue : IDynamicValue
    {
        public IDynamicValue From { get; }
        public IDynamicValue To { get; }
        public float Ratio { get; }

        public DynamicInterpolatedValue(IDynamicValue from, IDynamicValue to, float ratio)
        {
            From = from;
            To = to;
            Ratio = ratio;
        }

        public object Convert(IStyleProperty prop, NodeStyle style)
        {
            var from = From.Convert(prop, style);
            var to = To.Convert(prop, style);

            return Interpolater.Interpolate(from, to, Ratio);
        }
    }
}
