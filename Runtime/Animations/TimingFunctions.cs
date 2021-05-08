using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Animations
{
    public static class TimingFunctions
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
    public static class Interpolater
    {
        #region Linear interpolations
        public static float Interpolate(float t, bool mirror = false)
        {
            if (mirror && t < 0) return Mathf.Abs(t);
            else return t;
        }
        public static float Interpolate(float from, float to, float t)
        {
            return TimingFunctions.Linear(from, to, t);
        }
        public static Color Interpolate(Color from, Color to, float t)
        {
            return Color.LerpUnclamped(from, to, t);
        }
        public static Vector2 Interpolate(Vector2 from, Vector2 to, float t)
        {
            return Vector2.LerpUnclamped(from, to, t);
        }
        public static Vector3 Interpolate(Vector3 from, Vector3 to, float t)
        {
            return Vector3.LerpUnclamped(from, to, t);
        }
        public static Vector4 Interpolate(Vector4 from, Vector4 to, float t)
        {
            return Vector4.LerpUnclamped(from, to, t);
        }
        public static Quaternion Interpolate(Quaternion from, Quaternion to, float t)
        {
            return Quaternion.SlerpUnclamped(from, to, t);
        }
        #endregion


        #region Enum interpolations
        public static float Interpolate(float t, TimingFunctionType easeType, bool mirror = false)
        {
            if (mirror && t < 0) return TimingFunctions.Get(easeType)(Mathf.Abs(t));
            else return TimingFunctions.Get(easeType)(t);
        }
        public static float Interpolate(float from, float to, float t, TimingFunctionType easeType)
        {
            return TimingFunctions.Get(easeType)(from, to, t);
        }
        public static Color Interpolate(Color from, Color to, float t, TimingFunctionType easeType)
        {
            return Color.LerpUnclamped(from, to, Interpolate(t, easeType));
        }
        public static Vector2 Interpolate(Vector2 from, Vector2 to, float t, TimingFunctionType easeType)
        {
            return Vector2.LerpUnclamped(from, to, Interpolate(t, easeType));
        }
        public static Vector3 Interpolate(Vector3 from, Vector3 to, float t, TimingFunctionType easeType)
        {
            return Vector3.LerpUnclamped(from, to, Interpolate(t, easeType));
        }
        public static Vector4 Interpolate(Vector4 from, Vector4 to, float t, TimingFunctionType easeType)
        {
            return Vector4.LerpUnclamped(from, to, Interpolate(t, easeType));
        }
        public static Quaternion Interpolate(Quaternion from, Quaternion to, float t, TimingFunctionType easeType)
        {
            return Quaternion.SlerpUnclamped(from, to, Interpolate(t, easeType));
        }
        #endregion


        #region Function interpolations
        public static float Interpolate(float t, TimingFunctions.TimingFunction timingFunction, bool mirror = false)
        {
            if (mirror && t < 0) return timingFunction(Mathf.Abs(t));
            else return timingFunction(t);
        }
        public static float Interpolate(float from, float to, float t, TimingFunctions.TimingFunction timingFunction)
        {
            return timingFunction(from, to, t);
        }
        public static Color Interpolate(Color from, Color to, float t, TimingFunctions.TimingFunction timingFunction)
        {
            return Color.LerpUnclamped(from, to, Interpolate(t, timingFunction));
        }
        public static Vector2 Interpolate(Vector2 from, Vector2 to, float t, TimingFunctions.TimingFunction timingFunction)
        {
            return Vector2.LerpUnclamped(from, to, Interpolate(t, timingFunction));
        }
        public static Vector3 Interpolate(Vector3 from, Vector3 to, float t, TimingFunctions.TimingFunction timingFunction)
        {
            return Vector3.LerpUnclamped(from, to, Interpolate(t, timingFunction));
        }
        public static Vector4 Interpolate(Vector4 from, Vector4 to, float t, TimingFunctions.TimingFunction timingFunction)
        {
            return Vector4.LerpUnclamped(from, to, Interpolate(t, timingFunction));
        }
        public static Quaternion Interpolate(Quaternion from, Quaternion to, float t, TimingFunctions.TimingFunction timingFunction)
        {
            return Quaternion.SlerpUnclamped(from, to, Interpolate(t, timingFunction));
        }
        #endregion


        #region Object interpolations
        public static object Interpolate(object from, object to, float t)
        {
            if (from is float f1 && to is float f2) return Interpolate(f1, f2, t);
            if (from is Color c1 && to is Color c2) return Interpolate(c1, c2, t);
            if (from is Vector2 x1 && to is Vector2 x2) return Interpolate(x1, x2, t);
            if (from is Vector3 y1 && to is Vector3 y2) return Interpolate(y1, y2, t);
            if (from is Vector4 z1 && to is Vector4 z2) return Interpolate(z1, z2, t);
            if (from is Quaternion q1 && to is Quaternion q2) return Interpolate(q1, q2, t);

            return t > 0.5 ? to : from;
        }

        public static object Interpolate(object from, object to, float t, Type type)
        {
            if (type == null) return Interpolate(from, to, t);
            else if (type == typeof(float)) { if (from is float f1 && to is float f2) return Interpolate(f1, f2, t); }
            else if (type == typeof(Color)) { if (from is Color c1 && to is Color c2) return Interpolate(c1, c2, t); }
            else if (type == typeof(Vector2)) { if (from is Vector2 x1 && to is Vector2 x2) return Interpolate(x1, x2, t); }
            else if (type == typeof(Vector3)) { if (from is Vector3 y1 && to is Vector3 y2) return Interpolate(y1, y2, t); }
            else if (type == typeof(Vector4)) { if (from is Vector4 z1 && to is Vector4 z2) return Interpolate(z1, z2, t); }
            else if (type == typeof(Quaternion)) { if (from is Quaternion q1 && to is Quaternion q2) return Interpolate(q1, q2, t); }

            return t > 0.5 ? to : from;
        }

        public static object Interpolate(object from, object to, float t, TimingFunctions.TimingFunction timingFunction)
        {
            return Interpolate(from, to, timingFunction(t));
        }

        public static object Interpolate(object from, object to, float t, TimingFunctions.TimingFunction timingFunction, Type type)
        {
            return Interpolate(from, to, timingFunction(t), type);
        }

        public static object Interpolate(object from, object to, float t, TimingFunctionType timingFunctionType)
        {
            return Interpolate(from, to, TimingFunctions.Get(timingFunctionType)(t));
        }

        public static object Interpolate(object from, object to, float t, TimingFunctionType timingFunctionType, Type type)
        {
            return Interpolate(from, to, TimingFunctions.Get(timingFunctionType)(t), type);
        }
        #endregion

    }
}
