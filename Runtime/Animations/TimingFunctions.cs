using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Animations
{
    public delegate float TimingFunction(float value, float start = 0, float end = 1);

    public static class TimingFunctions
    {
        private static readonly TimingFunction[] timingFunctions = null;
        static TimingFunctions()
        {
            timingFunctions = new TimingFunction[]{
                EaseInQuad,
                EaseOutQuad,
                EaseInOutQuad,
                EaseInCubic,
                EaseOutCubic,
                EaseInOutCubic,
                EaseInQuart,
                EaseOutQuart,
                EaseInOutQuart,
                EaseInQuint,
                EaseOutQuint,
                EaseInOutQuint,
                EaseInSine,
                EaseOutSine,
                EaseInOutSine,
                EaseInExpo,
                EaseOutExpo,
                EaseInOutExpo,
                EaseInCirc,
                EaseOutCirc,
                EaseInOutCirc,
                Linear,
                Spring,
                EaseInBounce,
                EaseOutBounce,
                EaseInOutBounce,
                EaseInBack,
                EaseOutBack,
                EaseInOutBack,
                EaseInElastic,
                EaseOutElastic,
                EaseInOutElastic,
                Clerp,
                SmoothStep,
                SmootherStep,
                SmoothestStep,
                DownEdge,
                MidEdge,
                UpEdge
            };
        }

        #region Timing Functions
        public static float Linear(float value, float start = 0, float end = 1)
        {
            return Mathf.Lerp(start, end, value);
        }
        public static float Clerp(float value, float start = 0, float end = 1)
        {
            float min = 0.0f;
            float max = 360.0f;
            float half = Mathf.Abs((max - min) / 2.0f);
            float retval = 0.0f;
            float diff = 0.0f;
            if ((end - start) < -half)
            {
                diff = ((max - start) + end) * value;
                retval = start + diff;
            }
            else if ((end - start) > half)
            {
                diff = -((max - end) + start) * value;
                retval = start + diff;
            }
            else retval = start + (end - start) * value;
            return retval;
        }
        public static float Spring(float value, float start = 0, float end = 1)
        {
            value = Mathf.Clamp01(value);
            value = (Mathf.Sin(value * Mathf.PI * (0.2f + 2.5f * value * value * value)) * Mathf.Pow(1f - value, 2.2f) + value) * (1f + (1.2f * (1f - value)));
            return start + (end - start) * value;
        }
        public static float EaseInQuad(float value, float start = 0, float end = 1)
        {
            end -= start;
            return end * value * value + start;
        }
        public static float EaseOutQuad(float value, float start = 0, float end = 1)
        {
            end -= start;
            return -end * value * (value - 2) + start;
        }
        public static float EaseInOutQuad(float value, float start = 0, float end = 1)
        {
            value /= .5f;
            end -= start;
            if (value < 1) return end / 2 * value * value + start;
            value--;
            return -end / 2 * (value * (value - 2) - 1) + start;
        }
        public static float EaseInCubic(float value, float start = 0, float end = 1)
        {
            end -= start;
            return end * value * value * value + start;
        }
        public static float EaseOutCubic(float value, float start = 0, float end = 1)
        {
            value--;
            end -= start;
            return end * (value * value * value + 1) + start;
        }
        public static float EaseInOutCubic(float value, float start = 0, float end = 1)
        {
            value /= .5f;
            end -= start;
            if (value < 1) return end / 2 * value * value * value + start;
            value -= 2;
            return end / 2 * (value * value * value + 2) + start;
        }
        public static float EaseInQuart(float value, float start = 0, float end = 1)
        {
            end -= start;
            return end * value * value * value * value + start;
        }
        public static float EaseOutQuart(float value, float start = 0, float end = 1)
        {
            value--;
            end -= start;
            return -end * (value * value * value * value - 1) + start;
        }
        public static float EaseInOutQuart(float value, float start = 0, float end = 1)
        {
            value /= .5f;
            end -= start;
            if (value < 1) return end / 2 * value * value * value * value + start;
            value -= 2;
            return -end / 2 * (value * value * value * value - 2) + start;
        }
        public static float EaseInQuint(float value, float start = 0, float end = 1)
        {
            end -= start;
            return end * value * value * value * value * value + start;
        }
        public static float EaseOutQuint(float value, float start = 0, float end = 1)
        {
            value--;
            end -= start;
            return end * (value * value * value * value * value + 1) + start;
        }
        public static float EaseInOutQuint(float value, float start = 0, float end = 1)
        {
            value /= .5f;
            end -= start;
            if (value < 1) return end / 2 * value * value * value * value * value + start;
            value -= 2;
            return end / 2 * (value * value * value * value * value + 2) + start;
        }
        public static float EaseInSine(float value, float start = 0, float end = 1)
        {
            end -= start;
            return -end * Mathf.Cos(value / 1 * (Mathf.PI / 2)) + end + start;
        }
        public static float EaseOutSine(float value, float start = 0, float end = 1)
        {
            end -= start;
            return end * Mathf.Sin(value / 1 * (Mathf.PI / 2)) + start;
        }
        public static float EaseInOutSine(float value, float start = 0, float end = 1)
        {
            end -= start;
            return -end / 2 * (Mathf.Cos(Mathf.PI * value / 1) - 1) + start;
        }
        public static float EaseInExpo(float value, float start = 0, float end = 1)
        {
            end -= start;
            return end * Mathf.Pow(2, 10 * (value / 1 - 1)) + start;
        }
        public static float EaseOutExpo(float value, float start = 0, float end = 1)
        {
            end -= start;
            return end * (-Mathf.Pow(2, -10 * value / 1) + 1) + start;
        }
        public static float EaseInOutExpo(float value, float start = 0, float end = 1)
        {
            value /= .5f;
            end -= start;
            if (value < 1) return end / 2 * Mathf.Pow(2, 10 * (value - 1)) + start;
            value--;
            return end / 2 * (-Mathf.Pow(2, -10 * value) + 2) + start;
        }
        public static float EaseInCirc(float value, float start = 0, float end = 1)
        {
            end -= start;
            return -end * (Mathf.Sqrt(1 - value * value) - 1) + start;
        }
        public static float EaseOutCirc(float value, float start = 0, float end = 1)
        {
            value--;
            end -= start;
            return end * Mathf.Sqrt(1 - value * value) + start;
        }
        public static float EaseInOutCirc(float value, float start = 0, float end = 1)
        {
            value /= .5f;
            end -= start;
            if (value < 1) return -end / 2 * (Mathf.Sqrt(1 - value * value) - 1) + start;
            value -= 2;
            return end / 2 * (Mathf.Sqrt(1 - value * value) + 1) + start;
        }
        public static float EaseInBounce(float value, float start = 0, float end = 1)
        {
            end -= start;
            float d = 1f;
            return end - EaseOutBounce(0, end, d - value) + start;
        }
        public static float EaseOutBounce(float value, float start = 0, float end = 1)
        {
            value /= 1f;
            end -= start;
            if (value < (1 / 2.75f))
            {
                return end * (7.5625f * value * value) + start;
            }
            else if (value < (2 / 2.75f))
            {
                value -= (1.5f / 2.75f);
                return end * (7.5625f * (value) * value + .75f) + start;
            }
            else if (value < (2.5 / 2.75))
            {
                value -= (2.25f / 2.75f);
                return end * (7.5625f * (value) * value + .9375f) + start;
            }
            else
            {
                value -= (2.625f / 2.75f);
                return end * (7.5625f * (value) * value + .984375f) + start;
            }
        }
        public static float EaseInOutBounce(float value, float start = 0, float end = 1)
        {
            end -= start;
            float d = 1f;
            if (value < d / 2) return EaseInBounce(0, end, value * 2) * 0.5f + start;
            else return EaseOutBounce(0, end, value * 2 - d) * 0.5f + end * 0.5f + start;
        }
        public static float EaseInBack(float value, float start = 0, float end = 1)
        {
            end -= start;
            value /= 1;
            float s = 1.70158f;
            return end * (value) * value * ((s + 1) * value - s) + start;
        }
        public static float EaseOutBack(float value, float start = 0, float end = 1)
        {
            float s = 1.70158f;
            end -= start;
            value = (value / 1) - 1;
            return end * ((value) * value * ((s + 1) * value + s) + 1) + start;
        }
        public static float EaseInOutBack(float value, float start = 0, float end = 1)
        {
            float s = 1.70158f;
            end -= start;
            value /= .5f;
            if ((value) < 1)
            {
                s *= (1.525f);
                return end / 2 * (value * value * (((s) + 1) * value - s)) + start;
            }
            value -= 2;
            s *= (1.525f);
            return end / 2 * ((value) * value * (((s) + 1) * value + s) + 2) + start;
        }
        public static float Punch(float amplitude, float value)
        {
            float s = 9;
            if (value == 0)
            {
                return 0;
            }
            if (value == 1)
            {
                return 0;
            }
            float period = 1 * 0.3f;
            s = period / (2 * Mathf.PI) * Mathf.Asin(0);
            return (amplitude * Mathf.Pow(2, -10 * value) * Mathf.Sin((value * 1 - s) * (2 * Mathf.PI) / period));
        }
        public static float EaseInElastic(float value, float start = 0, float end = 1)
        {
            end -= start;

            float d = 1f;
            float p = d * .3f;
            float s = 0;
            float a = 0;

            if (value == 0) return start;

            if ((value /= d) == 1) return start + end;

            if (a == 0f || a < Mathf.Abs(end))
            {
                a = end;
                s = p / 4;
            }
            else
            {
                s = p / (2 * Mathf.PI) * Mathf.Asin(end / a);
            }

            return -(a * Mathf.Pow(2, 10 * (value -= 1)) * Mathf.Sin((value * d - s) * (2 * Mathf.PI) / p)) + start;
        }
        public static float EaseOutElastic(float value, float start = 0, float end = 1)
        {
            /* GFX47 MOD END */
            //Thank you to rafael.marteleto for fixing this as a port over from Pedro's UnityTween
            end -= start;

            float d = 1f;
            float p = d * .3f;
            float s = 0;
            float a = 0;

            if (value == 0) return start;

            if ((value /= d) == 1) return start + end;

            if (a == 0f || a < Mathf.Abs(end))
            {
                a = end;
                s = p / 4;
            }
            else
            {
                s = p / (2 * Mathf.PI) * Mathf.Asin(end / a);
            }

            return (a * Mathf.Pow(2, -10 * value) * Mathf.Sin((value * d - s) * (2 * Mathf.PI) / p) + end + start);
        }
        public static float EaseInOutElastic(float value, float start = 0, float end = 1)
        {
            end -= start;

            float d = 1f;
            float p = d * .3f;
            float s = 0;
            float a = 0;

            if (value == 0) return start;

            if ((value /= d / 2) == 2) return start + end;

            if (a == 0f || a < Mathf.Abs(end))
            {
                a = end;
                s = p / 4;
            }
            else
            {
                s = p / (2 * Mathf.PI) * Mathf.Asin(end / a);
            }

            if (value < 1) return -0.5f * (a * Mathf.Pow(2, 10 * (value -= 1)) * Mathf.Sin((value * d - s) * (2 * Mathf.PI) / p)) + start;
            return a * Mathf.Pow(2, -10 * (value -= 1)) * Mathf.Sin((value * d - s) * (2 * Mathf.PI) / p) * 0.5f + end + start;
        }

        public static float SmoothStep(float value, float start = 0, float end = 1)
        {
            value = (value - start) / (end - start);
            return value * value * (3 - 2 * value);
        }

        public static float SmootherStep(float value, float start = 0, float end = 1)
        {
            value = (value - start) / (end - start);
            return value * value * value * (value * (value * 6 - 15) + 10);
        }

        public static float SmoothestStep(float value, float start = 0, float end = 1)
        {
            value = (value - start) / (end - start);
            return value * value * value * value * (value * (value * (value * -20 + 70) - 84) + 35);
        }

        public static float DownEdge(float value, float start = 0, float end = 1)
        {
            return value <= 0 ? start : end;
        }

        public static float MidEdge(float value, float start = 0, float end = 1)
        {
            return value < 0.5f ? start : end;
        }

        public static float UpEdge(float value, float start = 0, float end = 1)
        {
            return value < 1 ? start : end;
        }
        #endregion

        public static TimingFunction Steps(int count, StepsJumpMode mode = StepsJumpMode.None)
        {
            if (mode == StepsJumpMode.Both || mode == StepsJumpMode.None) count++;
            var step = 1f / count;

            return delegate (float value, float start, float end)
            {
                var diff = end - start;

                var st = value * count;

                if (mode == StepsJumpMode.Start || mode == StepsJumpMode.Both) st = Mathf.Ceil(st);
                else st = Mathf.Floor(st);

                return (diff * step * st) + start;
            };
        }

        static float NEWTON_ITERATIONS = 4f;
        static float NEWTON_MIN_SLOPE = 0.001f;
        static float SUBDIVISION_PRECISION = 0.0000001f;
        static float SUBDIVISION_MAX_ITERATIONS = 10f;
        static int kSplineTableSize = 11;
        static float kSampleStepSize = 1f / (kSplineTableSize - 1f);

        // Ported from https://github.com/gre/bezier-easing
        [System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]
        public static TimingFunction CubicBezier(float mX1, float mY1, float mX2, float mY2)
        {
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

            return delegate (float value, float start, float end)
            {
                // Because JavaScript number are imprecise, we should guarantee the extremes are right.
                if (value == 0 || value == 1)
                {
                    return Linear(value, start, end);
                }
                return Linear(calcBezier(getTForX(value), mY1, mY2), start, end);
            };
        }

        public static TimingFunction Get(TimingFunctionType easeType)
        {
            return timingFunctions[(int)easeType];
        }

        public static TimingFunction Get(string easeType)
        {
            if (System.Enum.TryParse<TimingFunctionType>(easeType.Replace("-", ""), true, out var res)) return Get(res);
            return null;
        }
    }
}
