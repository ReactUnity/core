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
            const float NEWTON_ITERATIONS = 4f;
            const float NEWTON_MIN_SLOPE = 0.001f;
            const float SUBDIVISION_PRECISION = 0.0000001f;
            const float SUBDIVISION_MAX_ITERATIONS = 10f;
            const int kSplineTableSize = 11;
            const float kSampleStepSize = 1f / (kSplineTableSize - 1f);

            public static float Linear(float value, float start = 0, float end = 1)
            {
                return Mathf.Lerp(start, end, value);
            }

            static float A(float aA1, float aA2) { return 1f - 3 * aA2 + 3 * aA1; }
            static float B(float aA1, float aA2) { return 3 * aA2 - 6 * aA1; }
            static float C(float aA1) { return 3 * aA1; }
            static float calcBezier(float aT, float aA1, float aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }
            static float getSlope(float aT, float aA1, float aA2) { return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1); }


            static float binarySubdivide(float aX, float aA, float aB, float mX1, float mX2)
            {
                var currentX = 0f;
                var currentT = 0f;
                var i = 0;
                do
                {
                    currentT = aA + (aB - aA) / 2f;
                    currentX = calcBezier(currentT, mX1, mX2) - aX;
                    if (currentX > 0.0)
                    {
                        aB = currentT;
                    }
                    else
                    {
                        aA = currentT;
                    }
                } while (Math.Abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
                return currentT;
            }

            static float newtonRaphsonIterate(float aX, float aGuessT, float mX1, float mX2)
            {
                for (var i = 0; i < NEWTON_ITERATIONS; ++i)
                {
                    var currentSlope = getSlope(aGuessT, mX1, mX2);
                    if (currentSlope == 0f)
                    {
                        return aGuessT;
                    }
                    var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
                    aGuessT -= currentX / currentSlope;
                }
                return aGuessT;
            }

            public static TimingFunction Create(float mX1, float mY1, float mX2, float mY2)
            {
                if (mX1 == mY1 && mX2 == mY2) return Linear;

                // Precompute samples table
                var sampleValues = new float[kSplineTableSize];
                for (var i = 0; i < kSplineTableSize; ++i)
                {
                    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
                }

                float getTForX(float aX)
                {
                    var intervalStart = 0f;
                    var currentSample = 1;
                    var lastSample = kSplineTableSize - 1;

                    for (; currentSample != lastSample && sampleValues[currentSample] <= aX; ++currentSample)
                    {
                        intervalStart += kSampleStepSize;
                    }
                    --currentSample;

                    // Interpolate to provide an initial guess for t
                    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
                    var guessForT = intervalStart + dist * kSampleStepSize;

                    var initialSlope = getSlope(guessForT, mX1, mX2);
                    if (initialSlope >= NEWTON_MIN_SLOPE)
                    {
                        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
                    }
                    else if (initialSlope == 0.0)
                    {
                        return guessForT;
                    }
                    else
                    {
                        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
                    }
                }

                return delegate (float value, float start, float end) {
                    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
                    if (value == 0 || value == 1)
                    {
                        return Linear(value, start, end);
                    }
                    return Linear(calcBezier(getTForX(value), mY1, mY2), start, end);
                };
            }
        }


        public class Converter : TypedStyleConverterBase<TimingFunction>
        {
            static private HashSet<string> DefaultAllowedFunctions = new HashSet<string> { "steps", "cubic-bezier" };
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
