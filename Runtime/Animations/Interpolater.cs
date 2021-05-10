using Facebook.Yoga;
using ReactUnity.Types;
using System;
using UnityEngine;

namespace ReactUnity.Animations
{
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
            return TimingFunctions.Linear(t, from, to);
        }
        public static int Interpolate(int from, int to, float t)
        {
            return Mathf.RoundToInt(TimingFunctions.Linear(t, from, to));
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
        public static YogaValue Interpolate(YogaValue from, YogaValue to, float t)
        {
            if (!(from.Unit == to.Unit || from.Value == 0 || to.Value == 0) || !(from.Unit == YogaUnit.Point || from.Unit == YogaUnit.Percent)) return t > 0 ? to : from;

            if (from.Value == 0 && to.Value == 0) return YogaValue.Point(0);

            var unit = from.Value != 0 ? from.Unit : to.Unit;

            if (unit == YogaUnit.Percent) return YogaValue.Percent(Interpolate(from.Value, to.Value, t));
            return YogaValue.Point(Interpolate(from.Value, to.Value, t));
        }
        public static YogaValue2 Interpolate(YogaValue2 from, YogaValue2 to, float t)
        {
            return new YogaValue2(Interpolate(from.X, to.X, t), Interpolate(from.Y, to.Y, t));
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
        public static float Interpolate(float t, TimingFunction timingFunction, bool mirror = false)
        {
            if (mirror && t < 0) return timingFunction(Mathf.Abs(t));
            else return timingFunction(t);
        }
        public static float Interpolate(float from, float to, float t, TimingFunction timingFunction)
        {
            return timingFunction(from, to, t);
        }
        public static Color Interpolate(Color from, Color to, float t, TimingFunction timingFunction)
        {
            return Color.LerpUnclamped(from, to, Interpolate(t, timingFunction));
        }
        public static Vector2 Interpolate(Vector2 from, Vector2 to, float t, TimingFunction timingFunction)
        {
            return Vector2.LerpUnclamped(from, to, Interpolate(t, timingFunction));
        }
        public static Vector3 Interpolate(Vector3 from, Vector3 to, float t, TimingFunction timingFunction)
        {
            return Vector3.LerpUnclamped(from, to, Interpolate(t, timingFunction));
        }
        public static Vector4 Interpolate(Vector4 from, Vector4 to, float t, TimingFunction timingFunction)
        {
            return Vector4.LerpUnclamped(from, to, Interpolate(t, timingFunction));
        }
        public static Quaternion Interpolate(Quaternion from, Quaternion to, float t, TimingFunction timingFunction)
        {
            return Quaternion.SlerpUnclamped(from, to, Interpolate(t, timingFunction));
        }
        #endregion


        #region Object interpolations
        public static object Interpolate(object from, object to, float t)
        {
            if (from is float f1 && to is float f2) return Interpolate(f1, f2, t);
            if (from is int i1 && to is int i2) return Interpolate(i1, i2, t);
            if (from is Color c1 && to is Color c2) return Interpolate(c1, c2, t);
            if (from is Vector2 x1 && to is Vector2 x2) return Interpolate(x1, x2, t);
            if (from is Vector3 y1 && to is Vector3 y2) return Interpolate(y1, y2, t);
            if (from is Vector4 z1 && to is Vector4 z2) return Interpolate(z1, z2, t);
            if (from is Quaternion q1 && to is Quaternion q2) return Interpolate(q1, q2, t);
            if (from is YogaValue b1 && to is YogaValue b2) return Interpolate(b1, b2, t);
            if (from is YogaValue2 g1 && to is YogaValue2 g2) return Interpolate(g1, g2, t);

            return t > 0.5 ? to : from;
        }

        public static object Interpolate(object from, object to, float t, Type type)
        {
            if (type == null) return Interpolate(from, to, t);
            else if (type == typeof(float)) { if (from is float f1 && to is float f2) return Interpolate(f1, f2, t); }
            else if (type == typeof(int)) { if (from is int i1 && to is int i2) return Interpolate(i1, i2, t); }
            else if (type == typeof(Color)) { if (from is Color c1 && to is Color c2) return Interpolate(c1, c2, t); }
            else if (type == typeof(Vector2)) { if (from is Vector2 x1 && to is Vector2 x2) return Interpolate(x1, x2, t); }
            else if (type == typeof(Vector3)) { if (from is Vector3 y1 && to is Vector3 y2) return Interpolate(y1, y2, t); }
            else if (type == typeof(Vector4)) { if (from is Vector4 z1 && to is Vector4 z2) return Interpolate(z1, z2, t); }
            else if (type == typeof(Quaternion)) { if (from is Quaternion q1 && to is Quaternion q2) return Interpolate(q1, q2, t); }
            else if (type == typeof(YogaValue)) { if (from is YogaValue y1 && to is YogaValue y2) return Interpolate(y1, y2, t); }
            else if (type == typeof(YogaValue2)) { if (from is YogaValue2 g1 && to is YogaValue2 g2) return Interpolate(g1, g2, t); }

            return t > 0.5 ? to : from;
        }

        public static object Interpolate(object from, object to, float t, TimingFunction timingFunction)
        {
            return Interpolate(from, to, timingFunction(t));
        }

        public static object Interpolate(object from, object to, float t, TimingFunction timingFunction, Type type)
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
