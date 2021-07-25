using ReactUnity.Animations;

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

        public object Convert(IStyleProperty prop, NodeStyle style)
        {
            var from = From.Convert(prop, style);
            var to = To.Convert(prop, style);

            return Interpolater.Interpolate(from, to, Ratio);
        }
    }
}
