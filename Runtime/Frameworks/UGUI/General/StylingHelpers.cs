using System;
using System.Runtime.CompilerServices;
using Facebook.Yoga;
using ReactUnity.Styling;

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
    }
}
