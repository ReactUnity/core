using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Animations
{
    static public class TimingFunctions
    {
        public delegate float TimingFunction(float value, float start = 0, float end = 1);
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
        static private float Linear(float value, float start = 0, float end = 1)
        {
            return Mathf.Lerp(start, end, value);
        }
        static private float Clerp(float value, float start = 0, float end = 1)
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
        static private float Spring(float value, float start = 0, float end = 1)
        {
            value = Mathf.Clamp01(value);
            value = (Mathf.Sin(value * Mathf.PI * (0.2f + 2.5f * value * value * value)) * Mathf.Pow(1f - value, 2.2f) + value) * (1f + (1.2f * (1f - value)));
            return start + (end - start) * value;
        }
        static private float EaseInQuad(float value, float start = 0, float end = 1)
        {
            end -= start;
            return end * value * value + start;
        }
        static private float EaseOutQuad(float value, float start = 0, float end = 1)
        {
            end -= start;
            return -end * value * (value - 2) + start;
        }
        static private float EaseInOutQuad(float value, float start = 0, float end = 1)
        {
            value /= .5f;
            end -= start;
            if (value < 1) return end / 2 * value * value + start;
            value--;
            return -end / 2 * (value * (value - 2) - 1) + start;
        }
        static private float EaseInCubic(float value, float start = 0, float end = 1)
        {
            end -= start;
            return end * value * value * value + start;
        }
        static private float EaseOutCubic(float value, float start = 0, float end = 1)
        {
            value--;
            end -= start;
            return end * (value * value * value + 1) + start;
        }
        static private float EaseInOutCubic(float value, float start = 0, float end = 1)
        {
            value /= .5f;
            end -= start;
            if (value < 1) return end / 2 * value * value * value + start;
            value -= 2;
            return end / 2 * (value * value * value + 2) + start;
        }
        static private float EaseInQuart(float value, float start = 0, float end = 1)
        {
            end -= start;
            return end * value * value * value * value + start;
        }
        static private float EaseOutQuart(float value, float start = 0, float end = 1)
        {
            value--;
            end -= start;
            return -end * (value * value * value * value - 1) + start;
        }
        static private float EaseInOutQuart(float value, float start = 0, float end = 1)
        {
            value /= .5f;
            end -= start;
            if (value < 1) return end / 2 * value * value * value * value + start;
            value -= 2;
            return -end / 2 * (value * value * value * value - 2) + start;
        }
        static private float EaseInQuint(float value, float start = 0, float end = 1)
        {
            end -= start;
            return end * value * value * value * value * value + start;
        }
        static private float EaseOutQuint(float value, float start = 0, float end = 1)
        {
            value--;
            end -= start;
            return end * (value * value * value * value * value + 1) + start;
        }
        static private float EaseInOutQuint(float value, float start = 0, float end = 1)
        {
            value /= .5f;
            end -= start;
            if (value < 1) return end / 2 * value * value * value * value * value + start;
            value -= 2;
            return end / 2 * (value * value * value * value * value + 2) + start;
        }
        static private float EaseInSine(float value, float start = 0, float end = 1)
        {
            end -= start;
            return -end * Mathf.Cos(value / 1 * (Mathf.PI / 2)) + end + start;
        }
        static private float EaseOutSine(float value, float start = 0, float end = 1)
        {
            end -= start;
            return end * Mathf.Sin(value / 1 * (Mathf.PI / 2)) + start;
        }
        static private float EaseInOutSine(float value, float start = 0, float end = 1)
        {
            end -= start;
            return -end / 2 * (Mathf.Cos(Mathf.PI * value / 1) - 1) + start;
        }
        static private float EaseInExpo(float value, float start = 0, float end = 1)
        {
            end -= start;
            return end * Mathf.Pow(2, 10 * (value / 1 - 1)) + start;
        }
        static private float EaseOutExpo(float value, float start = 0, float end = 1)
        {
            end -= start;
            return end * (-Mathf.Pow(2, -10 * value / 1) + 1) + start;
        }
        static private float EaseInOutExpo(float value, float start = 0, float end = 1)
        {
            value /= .5f;
            end -= start;
            if (value < 1) return end / 2 * Mathf.Pow(2, 10 * (value - 1)) + start;
            value--;
            return end / 2 * (-Mathf.Pow(2, -10 * value) + 2) + start;
        }
        static private float EaseInCirc(float value, float start = 0, float end = 1)
        {
            end -= start;
            return -end * (Mathf.Sqrt(1 - value * value) - 1) + start;
        }
        static private float EaseOutCirc(float value, float start = 0, float end = 1)
        {
            value--;
            end -= start;
            return end * Mathf.Sqrt(1 - value * value) + start;
        }
        static private float EaseInOutCirc(float value, float start = 0, float end = 1)
        {
            value /= .5f;
            end -= start;
            if (value < 1) return -end / 2 * (Mathf.Sqrt(1 - value * value) - 1) + start;
            value -= 2;
            return end / 2 * (Mathf.Sqrt(1 - value * value) + 1) + start;
        }
        static private float EaseInBounce(float value, float start = 0, float end = 1)
        {
            end -= start;
            float d = 1f;
            return end - EaseOutBounce(0, end, d - value) + start;
        }
        static private float EaseOutBounce(float value, float start = 0, float end = 1)
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
        static private float EaseInOutBounce(float value, float start = 0, float end = 1)
        {
            end -= start;
            float d = 1f;
            if (value < d / 2) return EaseInBounce(0, end, value * 2) * 0.5f + start;
            else return EaseOutBounce(0, end, value * 2 - d) * 0.5f + end * 0.5f + start;
        }
        static private float EaseInBack(float value, float start = 0, float end = 1)
        {
            end -= start;
            value /= 1;
            float s = 1.70158f;
            return end * (value) * value * ((s + 1) * value - s) + start;
        }
        static private float EaseOutBack(float value, float start = 0, float end = 1)
        {
            float s = 1.70158f;
            end -= start;
            value = (value / 1) - 1;
            return end * ((value) * value * ((s + 1) * value + s) + 1) + start;
        }
        static private float EaseInOutBack(float value, float start = 0, float end = 1)
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
        static private float Punch(float amplitude, float value)
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
        static private float EaseInElastic(float value, float start = 0, float end = 1)
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
        static private float EaseOutElastic(float value, float start = 0, float end = 1)
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
        static private float EaseInOutElastic(float value, float start = 0, float end = 1)
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

        static private float SmoothStep(float value, float start = 0, float end = 1)
        {
            value = (value - start) / (end - start);
            return value * value * (3 - 2 * value);
        }

        static private float SmootherStep(float value, float start = 0, float end = 1)
        {
            value = (value - start) / (end - start);
            return value * value * value * (value * (value * 6 - 15) + 10);
        }

        static private float SmoothestStep(float value, float start = 0, float end = 1)
        {
            value = (value - start) / (end - start);
            return value * value * value * value * (value * (value * (value * -20 + 70) - 84) + 35);
        }

        static private float DownEdge(float value, float start = 0, float end = 1)
        {
            return value <= 0 ? start : end;
        }

        static private float MidEdge(float value, float start = 0, float end = 1)
        {
            return value < 0.5f ? start : end;
        }

        static private float UpEdge(float value, float start = 0, float end = 1)
        {
            return value < 1 ? start : end;
        }
        #endregion

        static public TimingFunction GetTimingFunction(TimingFunctionType easeType)
        {
            return timingFunctions[(int)easeType];
        }

        static public TimingFunction GetTimingFunction(string easeType)
        {
            if (System.Enum.TryParse<TimingFunctionType>(easeType.Replace("-", ""), true, out var res)) return GetTimingFunction(res);
            return null;
        }

        static public float Ease(float t, TimingFunctionType easeType = TimingFunctionType.Linear, bool mirror = false)
        {
            if (mirror && t < 0) return GetTimingFunction(easeType)(Mathf.Abs(t));
            else return GetTimingFunction(easeType)(t);
        }
        static public float Ease(float from, float to, float t, TimingFunctionType easeType = TimingFunctionType.Linear)
        {
            return GetTimingFunction(easeType)(from, to, t);
        }
        static public Color Ease(Color from, Color to, float t, TimingFunctionType easeType = TimingFunctionType.Linear)
        {
            return Color.LerpUnclamped(from, to, Ease(t, easeType));
        }
        static public Vector2 Ease(Vector2 from, Vector2 to, float t, TimingFunctionType easeType = TimingFunctionType.Linear)
        {
            return Vector2.LerpUnclamped(from, to, Ease(t, easeType));
        }
        static public Vector3 Ease(Vector3 from, Vector3 to, float t, TimingFunctionType easeType = TimingFunctionType.Linear)
        {
            return Vector3.LerpUnclamped(from, to, Ease(t, easeType));
        }
        static public Vector4 Ease(Vector4 from, Vector4 to, float t, TimingFunctionType easeType = TimingFunctionType.Linear)
        {
            return Vector4.LerpUnclamped(from, to, Ease(t, easeType));
        }
        static public Quaternion Ease(Quaternion from, Quaternion to, float t, TimingFunctionType easeType = TimingFunctionType.Linear)
        {
            return Quaternion.SlerpUnclamped(from, to, Ease(t, easeType));
        }
    }
}
