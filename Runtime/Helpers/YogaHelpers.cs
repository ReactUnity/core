using Facebook.Yoga;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Helpers
{
    public static class YogaHelpers
    {
        public static bool HasValue(this YogaValue val)
        {
            return (val.Unit == YogaUnit.Point || val.Unit == YogaUnit.Percent) && !float.IsNaN(val.Value);
        }

        public static float IfPoint(this YogaValue val, float elseValue = 0f)
        {
            return (val.Unit == YogaUnit.Point) ? val.Value : elseValue;
        }

        public static float IfPercent(this YogaValue val, float elseValue = 0f)
        {
            return (val.Unit == YogaUnit.Percent) ? val.Value : elseValue;
        }

        public static float GetPointValue(this YogaValue val, float fullSize, float defaultValue = float.NaN)
        {
            if (val.Unit == YogaUnit.Point) return val.Value;
            if (val.Unit == YogaUnit.Percent) return fullSize * val.Value / 100f;
            return defaultValue;
        }

        public static float GetRatioValue(this YogaValue val, float fullSize, float defaultValue = float.NaN)
        {
            if (val.Unit == YogaUnit.Point) return val.Value / fullSize;
            if (val.Unit == YogaUnit.Percent) return val.Value / 100f;
            return defaultValue;
        }

        public static Vector2 GetPointValue(this YogaValue2 val, Vector2 fullSize, float defaultValue = float.NaN, bool yInverted = false)
        {
            var yval = GetPointValue(val.Y, fullSize.y, defaultValue);
            return new Vector2(GetPointValue(val.X, fullSize.x, defaultValue), yInverted ? fullSize.y - yval : yval);
        }

        public static Vector2 GetPointValue(this YogaValue2 val, Vector2 fullSize, Vector2 defaultValue = default, bool yInverted = false)
        {
            var yval = GetPointValue(val.Y, fullSize.y, defaultValue.y);
            return new Vector2(GetPointValue(val.X, fullSize.x, defaultValue.x), yInverted ? fullSize.y - yval : yval);
        }

        public static Vector2 GetRatioValue(this YogaValue2 val, Vector2 fullSize, float defaultValue = float.NaN, bool yInverted = false)
        {
            var yval = GetRatioValue(val.Y, fullSize.y, defaultValue);
            return new Vector2(GetRatioValue(val.X, fullSize.x, defaultValue), yInverted ? 1 - yval : yval);
        }
    }
}
