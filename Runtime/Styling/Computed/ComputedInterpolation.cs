using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Computed
{
    public struct ComputedInterpolation : IComputedValue
    {
        public IComputedValue From { get; }
        public IComputedValue To { get; }
        public float Ratio { get; }

        public ComputedInterpolation(IComputedValue from, IComputedValue to, float ratio)
        {
            From = from;
            To = to;
            Ratio = ratio;
        }

        public object GetValue(IStyleProperty prop, NodeStyle style, IStyleConverter converter)
        {
            var from = From.ResolveValue(prop, style, converter);
            var to = To.ResolveValue(prop, style, converter);

            return Interpolater.Interpolate(from, to, Ratio);
        }

        public static IComputedValue Create(IComputedValue from, IComputedValue to, float ratio)
        {
            if (StylingUtils.UnboxConstant(from, out var cFrom) && StylingUtils.UnboxConstant(to, out var cTo))
            {
                return StylingUtils.CreateComputed(Interpolater.Interpolate(cFrom, cTo, ratio));
            }

            return new ComputedInterpolation(from, to, ratio);
        }
    }
}
