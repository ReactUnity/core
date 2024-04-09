namespace Yoga
{
    public static class YogaValueExtensions
    {
        public static YogaValue Percent(this float value)
        {
            return YogaValue.Percent(value);
        }

        public static YogaValue Pt(this float value)
        {
            return YogaValue.Point(value);
        }

        public static YogaValue Percent(this int value)
        {
            return YogaValue.Percent(value);
        }

        public static YogaValue Pt(this int value)
        {
            return YogaValue.Point(value);
        }
    }
}
