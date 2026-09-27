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

            // Resolved on the node it comes from, which has usually resolved it already.
            var val = st == null ? (object) Color.black : st.GetResolvedValue(StyleProperties.color, fromChild);
            if (val == null) return null;

            return converter.Convert(val);
        }
    }
}
