using Facebook.Yoga;

namespace ReactUnity.Styling
{
    internal static class StylingUtils
    {
        public static float GetPointValue(YogaValue val, float fullSize, float defaultValue = float.NaN)
        {
            if (val.Unit == YogaUnit.Point) return val.Value;
            if (val.Unit == YogaUnit.Percent) return fullSize * val.Value / 100f;
            return defaultValue;
        }

        public static float GetRatioValue(YogaValue val, float fullSize, float defaultValue = float.NaN)
        {
            if (val.Unit == YogaUnit.Point) return val.Value / fullSize;
            if (val.Unit == YogaUnit.Percent) return val.Value / 100f;
            return defaultValue;
        }
    }
}
