using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Styling.Computed
{
    public struct ComputedCurrentColor : IComputedValue
    {
        public static ComputedCurrentColor Instance { get; } = new ComputedCurrentColor();

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            var st = style;
            var fromChild = ReferenceEquals(prop, StyleProperties.color);
            if (fromChild) st = style?.Parent;

            var val = st?.GetRawStyleValue(StyleProperties.color, fromChild) ?? Color.black;
            if (val == null) return null;
            if (val is IComputedValue d) val = d.ResolveValue(StyleProperties.color, st, StyleProperties.color);

            return converter.Convert(val);
        }
    }
}
