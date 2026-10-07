using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Styling.Animations
{
    public delegate float TimingFunction(float value, float start = 0, float end = 1);

    public static class TimingFunctions
    {
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static float Linear(float t, float start = 0, float end = 1) => t * (end - start) + start;
        public static readonly TimingFunction Ease = CubicBezier.Create(0.25f, 0.1f, 0.25f, 1f);
        public static readonly TimingFunction EaseIn = CubicBezier.Create(0.42f, 0f, 1f, 1f);
        public static readonly TimingFunction EaseOut = CubicBezier.Create(0f, 0f, 0.58f, 1f);
        public static readonly TimingFunction EaseInOut = CubicBezier.Create(0.42f, 0f, 0.58f, 1f);
        public static readonly TimingFunction StepStart = Steps(1, StepsJumpMode.Start);
        public static readonly TimingFunction StepEnd = Steps(1, StepsJumpMode.End);
        public static readonly TimingFunction Default = Ease;

        private static readonly TimingFunction[] timingFunctions = new TimingFunction[] {
            Ease,
            Linear,
            EaseIn,
            EaseOut,
            EaseInOut,
            StepStart,
            StepEnd,
        };

        public static TimingFunction Steps(int count, StepsJumpMode mode = StepsJumpMode.End)
        {
            if (mode == StepsJumpMode.Both) count++;
            else if (mode == StepsJumpMode.None) count--;

            if (count <= 0) return null;

            var step = 1f / count;

            return delegate (float value, float start, float end) {
                var diff = end - start;

                var st = value * count;

                if (mode == StepsJumpMode.Start || mode == StepsJumpMode.Both) st = Mathf.Ceil(st);
                else if (mode == StepsJumpMode.None) st = Mathf.Round(st);
                else st = Mathf.Floor(st);

                return (diff * step * st) + start;
            };
        }

        public struct LinearStop
        {
            public float Output;
            /// <summary>Input progress in 0..1, or NaN for a stop whose position is worked out from its neighbours.</summary>
            public float Input;
        }

        /// <summary>
        /// The linear() easing over its stops. Missing inputs are spread evenly between the nearest
        /// given ones, inputs never go backwards, and the curve extrapolates past its ends.
        /// </summary>
        public static TimingFunction Linear(List<LinearStop> stops)
        {
            if (stops == null || stops.Count == 0) return null;
            if (stops.Count == 1) return Linear;

            var points = stops.ToArray();
            if (float.IsNaN(points[0].Input)) points[0].Input = 0;
            if (float.IsNaN(points[points.Length - 1].Input)) points[points.Length - 1].Input = 1;

            for (int i = 1; i < points.Length; i++)
            {
                if (!float.IsNaN(points[i].Input))
                {
                    points[i].Input = Mathf.Max(points[i].Input, points[i - 1].Input);
                    continue;
                }

                var next = i + 1;
                while (float.IsNaN(points[next].Input)) next++;
                var step = (Mathf.Max(points[next].Input, points[i - 1].Input) - points[i - 1].Input) / (next - i + 1);
                for (int j = i; j < next; j++) points[j].Input = points[i - 1].Input + step * (j - i + 1);
            }

            float Interpolate(float t, LinearStop a, LinearStop b)
            {
                if (b.Input == a.Input) return b.Output;
                return a.Output + (b.Output - a.Output) * (t - a.Input) / (b.Input - a.Input);
            }

            return delegate (float value, float start, float end) {
                var last = points.Length - 1;
                float output;

                if (value <= points[0].Input) output = Interpolate(value, points[0], points[1]);
                else if (value >= points[last].Input) output = Interpolate(value, points[last - 1], points[last]);
                else
                {
                    var i = 1;
                    while (i < last && points[i].Input <= value) i++;
                    output = Interpolate(value, points[i - 1], points[i]);
                }

                return output * (end - start) + start;
            };
        }

        public static TimingFunction Get(TimingFunctionType easeType)
        {
            return timingFunctions[(int) easeType];
        }

        public static TimingFunction Get(string easeType)
        {
            if (easeType != null &&
                Enum.TryParse<TimingFunctionType>(easeType.Replace("-", "").ToLowerInvariant(), true, out var res) &&
                Enum.IsDefined(typeof(TimingFunctionType), res))
                return Get(res);
            return null;
        }


        // Ported from https://github.com/gre/bezier-easing
        [System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        public static class CubicBezier
        {
            public static float Linear(float value, float start = 0, float end = 1)
            {
                return Mathf.Lerp(start, end, value);
            }

            // Solves x(t) = ((2a * t + 3b) * t + 3c) * t = x for t, with x in (0, 1):
            // u = 1/t is the largest real root of x·u³ − 3c·u² − 3b·u − 2a = 0
            static double solveTForX(double x, double a, double b, double c)
            {
                var j = 1 / Math.Max(c, Math.Sqrt(x));
                var k = x * j;
                var l = k * j;
                var s = c * j;
                var q = b * l;
                var m = s * s + q;
                var h = -s * (s * s + 1.5 * q) - a * k * l;
                var D = h * h - m * m * m;
                double v;
                if (m == 0 || D > 1e-12 * h * h)
                {
                    // one real root (Cardano)
                    var U = -Math.Cbrt(h < 0 ? h - Math.Sqrt(D) : h + Math.Sqrt(D));
                    v = U + m / U;
                    if (double.IsNaN(v)) v = 0; // triple root (m = h = 0)
                }
                else
                {
                    // three real roots, take the largest
                    var r = Math.Sqrt(m);
                    v = 2 * r * Math.Cos(Math.Acos(Math.Max(-1, Math.Min(1, -h / (m * r)))) / 3);
                }
                return Math.Min(1, k / (v + s));
            }

            public static TimingFunction Create(float mX1, float mY1, float mX2, float mY2)
            {
                if (mX1 == mY1 && mX2 == mY2) return Linear;

                // x(t) = ((2a * t + 3b) * t + 3c) * t, y(t) = ((ay * t + by) * t + cy) * t
                double a = (3.0 * mX1 - 3.0 * mX2 + 1) / 2;
                double b = mX2 - 2.0 * mX1;
                double c = mX1;
                double ay = 3.0 * mY1 - 3.0 * mY2 + 1;
                double by = 3.0 * (mY2 - 2.0 * mY1);
                double cy = 3.0 * mY1;

                return delegate (float value, float start, float end) {
                    // value outside (0, 1) saturates to 0 / 1
                    if (!(value > 0 && value < 1))
                    {
                        return Linear(value, start, end);
                    }
                    var t = solveTForX(value, a, b, c);
                    return Linear((float) (((ay * t + by) * t + cy) * t), start, end);
                };
            }
        }


        public class Converter : TypedStyleConverterBase<TimingFunction>
        {
            static private HashSet<string> DefaultAllowedFunctions = new HashSet<string> { "steps", "cubic-bezier", "linear" };
            static private StyleConverterBase TypeConverter = new EnumConverter<TimingFunctionType>(true);

            protected override HashSet<string> AllowedFunctions => DefaultAllowedFunctions;

            protected override bool ConvertInternal(object value, out IComputedValue result)
            {
                if (value is TimingFunctionType tt) return Constant(Get(tt), out result);
                return base.ConvertInternal(value, out result);
            }

            protected override bool ParseInternal(string value, out IComputedValue result)
            {
                return ComputedMapper.Create(out result, value, TypeConverter,
                    (resolvedValue) => {
                        if (resolvedValue is TimingFunctionType tt) return Get(tt);
                        return null;
                    });
            }
        }
    }
}
