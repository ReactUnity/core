using ReactUnity.Styling.Converters;
using ReactUnity.Styling.Rules;
using UnityEngine;

namespace ReactUnity.Styling.Computed
{
    /// <summary>
    /// A container unit: a fraction of the nearest size container's content box on an axis, or of
    /// the viewport where the element has no such container, as <c>cqw</c> and <c>cqh</c> are defined.
    /// </summary>
    public struct ComputedContainerRelative : IComputedValue
    {
        public enum Axis
        {
            Inline,
            Block,
            Min,
            Max,
        }

        public float Ratio { get; }
        public Axis Type { get; }

        public ComputedContainerRelative(float ratio, Axis type)
        {
            Ratio = ratio;
            Type = type;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            switch (Type)
            {
                case Axis.Inline: return Measure(style, false) * Ratio;
                case Axis.Block: return Measure(style, true) * Ratio;
                case Axis.Min: return Mathf.Min(Measure(style, false), Measure(style, true)) * Ratio;
                case Axis.Max: return Mathf.Max(Measure(style, false), Measure(style, true)) * Ratio;
                default: return 0f;
            }
        }

        // Each axis finds its own container: an inline-size one answers for the width alone, so the
        // height may come from further up, or from the viewport.
        private static float Measure(NodeStyle style, bool block)
        {
            var container = ContainerQuery.FindSizeContainer(style.Component, block);

            if (container != null)
            {
                ContainerQuery.GetContentSize(container, out var width, out var height);
                return block ? height : width;
            }

            var host = style.Context?.Host;
            if (host == null) return 0;
            return block ? host.Height : host.Width;
        }
    }
}
