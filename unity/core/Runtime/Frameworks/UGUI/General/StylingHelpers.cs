using System;
using System.Runtime.CompilerServices;
using Yoga;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.UGUI
{
    public static class StylingHelpers
    {
        public static float GetStyleFloat(NodeStyle style, StyleProperty<float> prop)
        {
            return style.GetStyleValue<float>(prop, true);
        }

        public static float GetStyleFloatDouble(NodeStyle style, StyleProperty<float> prop, StyleProperty<float> prop2)
        {
            if (style.HasValue(prop)) return style.GetStyleValue<float>(prop, true);
            if (style.HasValue(prop2)) return style.GetStyleValue<float>(prop2, true);
            else return float.NaN;
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static YogaValue GetStyleLength(NodeStyle style, StyleProperty<YogaValue> prop)
        {
            return style.GetStyleValue<YogaValue>(prop, true);
        }

        public static YogaValue GetStyleLengthDouble(NodeStyle style, StyleProperty<YogaValue> prop, StyleProperty<YogaValue> prop2)
        {
            if (style.HasValue(prop)) return style.GetStyleValue<YogaValue>(prop, true);
            if (style.HasValue(prop2)) return style.GetStyleValue<YogaValue>(prop2, true);
            else return YogaValue.Undefined();
        }

        public static YogaValue GetStyleLengthTriple(NodeStyle style, StyleProperty<YogaValue> prop, StyleProperty<YogaValue> prop2, StyleProperty<YogaValue> prop3)
        {
            if (style.HasValue(prop)) return style.GetStyleValue<YogaValue>(prop, true);
            if (style.HasValue(prop2)) return style.GetStyleValue<YogaValue>(prop2, true);
            if (style.HasValue(prop3)) return style.GetStyleValue<YogaValue>(prop3, true);
            else return YogaValue.Undefined();
        }

        public static T GetStyleEnumCustom<T>(NodeStyle style, StyleProperty<T> prop) where T : struct, IConvertible
        {
            return style.GetStyleValue<T>(prop, true);
        }

        public static float GetPointValue(YogaValue val, float fullSize)
        {
            if (val.Unit == YogaUnit.Point) return val.Value;
            if (val.Unit == YogaUnit.Percent) return fullSize * val.Value / 100f;
            return 0;
        }

        public static Rect GetScreenClientRect(RectTransform transform)
        {
            var canvas = transform.GetComponentInParent<Canvas>();
            var rootCanvas = canvas.rootCanvas;

            var size = Vector2.Scale(transform.rect.size, new Vector2(transform.lossyScale.x / rootCanvas.transform.lossyScale.x, transform.lossyScale.y / rootCanvas.transform.lossyScale.y));
            Vector2 pos;

            if (canvas.renderMode == RenderMode.ScreenSpaceCamera)
                pos = RectTransformUtility.WorldToScreenPoint(canvas.worldCamera, transform.position);
            else if (canvas.renderMode == RenderMode.WorldSpace)
                pos = RectTransformUtility.WorldToScreenPoint(canvas.worldCamera, transform.position);
            else
                pos = RectTransformUtility.WorldToScreenPoint(null, transform.position);

            pos.x -= (transform.pivot.x * size.x);
            pos.y = Screen.height - pos.y - ((1.0f - transform.pivot.y) * size.y);
            return new Rect(pos, size);
        }

        /// <summary>
        /// The rotation a CSS <c>rotate</c> value means on a canvas. CSS has y down and z toward the
        /// viewer, a canvas y up and z away, so the y and z terms of the rotation flip and a positive
        /// angle turns clockwise, as on the web.
        /// </summary>
        public static Quaternion RotationOf(Vector3 cssEuler)
        {
            var q = Quaternion.Euler(cssEuler);
            return new Quaternion(q.x, -q.y, -q.z, q.w);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static void Swap<T>(ref T lhs, ref T rhs)
        {
            T temp = lhs;
            lhs = rhs;
            rhs = temp;
        }
    }
}
