using System;
using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Styling;
using ReactUnity.Types;
using TMPro;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public static class StylingHelpers
    {
        public static Dictionary<TextAlignmentOptions, TextAnchor> TextAlignMap = new Dictionary<TextAlignmentOptions, TextAnchor>() {
            { TextAlignmentOptions.TopLeft, TextAnchor.UpperLeft },
            { TextAlignmentOptions.Top, TextAnchor.UpperCenter },
            { TextAlignmentOptions.TopRight, TextAnchor.UpperRight },
            { TextAlignmentOptions.TopJustified, TextAnchor.UpperCenter },
            { TextAlignmentOptions.TopFlush, TextAnchor.UpperCenter },
            { TextAlignmentOptions.TopGeoAligned, TextAnchor.UpperCenter },
            { TextAlignmentOptions.Left, TextAnchor.MiddleLeft },
            { TextAlignmentOptions.Center, TextAnchor.MiddleCenter },
            { TextAlignmentOptions.Right, TextAnchor.MiddleRight },
            { TextAlignmentOptions.Justified, TextAnchor.MiddleCenter },
            { TextAlignmentOptions.Flush, TextAnchor.MiddleCenter },
            { TextAlignmentOptions.CenterGeoAligned, TextAnchor.MiddleCenter },
            { TextAlignmentOptions.BottomLeft, TextAnchor.LowerLeft },
            { TextAlignmentOptions.Bottom, TextAnchor.LowerCenter },
            { TextAlignmentOptions.BottomRight, TextAnchor.LowerRight },
            { TextAlignmentOptions.BottomJustified, TextAnchor.LowerCenter },
            { TextAlignmentOptions.BottomFlush, TextAnchor.LowerCenter },
            { TextAlignmentOptions.BottomGeoAligned, TextAnchor.LowerCenter },
            { TextAlignmentOptions.BaselineLeft, TextAnchor.MiddleLeft },
            { TextAlignmentOptions.Baseline, TextAnchor.MiddleCenter },
            { TextAlignmentOptions.BaselineRight, TextAnchor.MiddleRight },
            { TextAlignmentOptions.BaselineJustified, TextAnchor.MiddleCenter },
            { TextAlignmentOptions.BaselineFlush, TextAnchor.MiddleCenter },
            { TextAlignmentOptions.BaselineGeoAligned, TextAnchor.MiddleCenter },
            { TextAlignmentOptions.MidlineLeft, TextAnchor.MiddleLeft },
            { TextAlignmentOptions.Midline, TextAnchor.MiddleCenter },
            { TextAlignmentOptions.MidlineRight, TextAnchor.MiddleRight },
            { TextAlignmentOptions.MidlineJustified, TextAnchor.MiddleCenter },
            { TextAlignmentOptions.MidlineFlush, TextAnchor.MiddleCenter },
            { TextAlignmentOptions.MidlineGeoAligned, TextAnchor.MiddleCenter },
            { TextAlignmentOptions.CaplineLeft, TextAnchor.MiddleLeft },
            { TextAlignmentOptions.Capline, TextAnchor.MiddleCenter },
            { TextAlignmentOptions.CaplineRight, TextAnchor.MiddleRight },
            { TextAlignmentOptions.CaplineJustified, TextAnchor.MiddleCenter },
            { TextAlignmentOptions.CaplineFlush, TextAnchor.MiddleCenter },
            { TextAlignmentOptions.CaplineGeoAligned, TextAnchor.MiddleCenter },
            { TextAlignmentOptions.Converted, TextAnchor.UpperLeft },
        };

        public static StyleLength YogaValueToStyleLength(YogaValue value)
        {
            if (value.Unit == YogaUnit.Auto) return new StyleLength(StyleKeyword.Auto);
            if (value.Unit == YogaUnit.Undefined) return new StyleLength(StyleKeyword.Null);
            if (float.IsNaN(value.Value)) return new StyleLength(StyleKeyword.Null);
            if (value.Unit == YogaUnit.Percent) return new StyleLength(new Length(value.Value, LengthUnit.Percent));
            if (value.Unit == YogaUnit.Point) return new StyleLength(new Length(value.Value, LengthUnit.Pixel));
            return new StyleLength(StyleKeyword.Initial);
        }


        public static YogaValue StyleLengthToYogaValue(StyleLength value)
        {
            if (value.keyword == StyleKeyword.Auto) return YogaValue.Auto();
            if (value.keyword == StyleKeyword.Null || value.keyword == StyleKeyword.None || value.keyword == StyleKeyword.Initial)
                return YogaValue.Undefined();
            if (value.value.unit == LengthUnit.Percent) return YogaValue.Percent(value.value.value);
            if (value.value.unit == LengthUnit.Pixel) return YogaValue.Point(value.value.value);
            return YogaValue.Undefined();
        }


        public static float NormalizeFloat(float value)
        {
            if (float.IsNaN(value)) return 0;
            return value;
        }

        public static FontStyle ConvertFontStyle(FontStyles style, FontWeight weight)
        {
            var fs = FontStyle.Normal;
            if ((style & FontStyles.Bold) > 0 || weight == FontWeight.Bold) fs = fs | FontStyle.Bold;
            if ((style & FontStyles.Italic) > 0) fs = fs | FontStyle.Italic;

            return fs;
        }

        public static object GetStyleValue<T>(NodeStyle style, StyleProperty<T> prop)
        {
            if (style.HasValue(prop)) return style.GetStyleValue<T>(prop);
            else return StyleKeyword.Null;
        }

        public static StyleColor GetStyleColor(NodeStyle style, StyleProperty<Color> prop)
        {
            if (style.HasValue(prop)) return style.GetStyleValue<Color>(prop);
            else return StyleKeyword.Null;
        }

        public static StyleFloat GetStyleFloat(NodeStyle style, StyleProperty<float> prop)
        {
            if (style.HasValue(prop)) return style.GetStyleValue<float>(prop);
            else return StyleKeyword.Null;
        }

        public static StyleFloat GetStyleFloatDouble(NodeStyle style, StyleProperty<float> prop, StyleProperty<float> prop2)
        {
            if (style.HasValue(prop)) return style.GetStyleValue<float>(prop);
            if (style.HasValue(prop2)) return style.GetStyleValue<float>(prop2);
            else return StyleKeyword.Null;
        }

        public static StyleLength GetStyleLength(NodeStyle style, StyleProperty<YogaValue> prop)
        {
            if (style.HasValue(prop)) return YogaValueToStyleLength(style.GetStyleValue<YogaValue>(prop));
            else return StyleKeyword.Null;
        }

        public static StyleLength GetStyleLengthDouble(NodeStyle style, StyleProperty<YogaValue> prop, StyleProperty<YogaValue> prop2)
        {
            if (style.HasValue(prop)) return YogaValueToStyleLength(style.GetStyleValue<YogaValue>(prop));
            if (style.HasValue(prop2)) return YogaValueToStyleLength(style.GetStyleValue<YogaValue>(prop2));
            else return StyleKeyword.Null;
        }

        public static StyleEnum<T> GetStyleEnum<T>(NodeStyle style, StyleProperty<T> prop) where T : struct, IConvertible
        {
            if (style.HasValue(prop)) return style.GetStyleValue<T>(prop);
            else return StyleKeyword.Null;
        }

        public static StyleEnum<T> GetStyleEnumCustom<T>(NodeStyle style, IStyleProperty prop) where T : struct, IConvertible
        {
            if (style.HasValue(prop)) return style.GetStyleValue<T>(prop);
            else return StyleKeyword.Null;
        }

        public static StyleEnum<T> GetStyleBoolToEnum<T>(NodeStyle style, StyleProperty<bool> prop, T trueValue, T falseValue) where T : struct, IConvertible
        {
            if (style.HasValue(prop)) return style.GetStyleValue<bool>(prop) ? trueValue : falseValue;
            else return StyleKeyword.Null;
        }

        public static StyleLength GetStyleBorderRadius(NodeStyle style, StyleProperty<YogaValue2> prop)
        {
            if (style.HasValue(prop)) return YogaValueToStyleLength(style.GetStyleValue<YogaValue2>(prop).X);
            else return StyleKeyword.Null;
        }

        public static StyleColor GetStyleBorderColor(NodeStyle style, StyleProperty<Color> prop)
        {
            if (style.HasValue(prop)) return style.GetStyleValue<Color>(prop);
            else return StyleKeyword.Null;
        }
    }
}
