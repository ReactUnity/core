namespace Facebook.Yoga
{
    public static class YogaConstants
    {
        public const float Undefined = float.NaN;

        public static bool IsUndefined(float value)
        {
            return float.IsNaN(value);
        }

        public static bool IsUndefined(YogaValue value)
        {
            return value.Unit == YogaUnit.Undefined;
        }
    }
}
