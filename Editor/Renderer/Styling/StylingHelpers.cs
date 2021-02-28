using Facebook.Yoga;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer.Styling
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
            { TextAlignmentOptions.Converted, TextAnchor.MiddleCenter },
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
    }
}
