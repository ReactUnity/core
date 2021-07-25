using UnityEngine;

namespace ReactUnity.Styling.Computed
{
    public struct ComputedRootRelative : IComputedValue
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

        public ComputedRootRelative(float ratio, RootValueType type)
        {
            Ratio = ratio;
            Type = type;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style)
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

            size *= Ratio;

            var val = prop.Convert(size);
            return val;
        }
    }
}
