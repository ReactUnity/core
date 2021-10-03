using Facebook.Yoga;
using ReactUnity.Types;
using UnityEngine;

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

        public static Vector2 GetPointValue(YogaValue2 val, Vector2 fullSize, float defaultValue = float.NaN, bool yInverted = true)
        {
            var yval = GetPointValue(val.Y, fullSize.y, defaultValue);
            return new Vector2(GetPointValue(val.X, fullSize.x, defaultValue), yInverted ? fullSize.y - yval : yval);
        }

        public static Vector2 GetRatioValue(YogaValue2 val, Vector2 fullSize, float defaultValue = float.NaN, bool yInverted = true)
        {
            var yval = GetRatioValue(val.Y, fullSize.y, defaultValue);
            return new Vector2(GetRatioValue(val.X, fullSize.x, defaultValue), yInverted ? 1 - yval : yval);
        }
    }
}
