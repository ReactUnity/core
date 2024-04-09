namespace Facebook.Yoga
{
    public class MeasureOutput
    {
        public static YogaSize Make(float width, float height)
        {
            return new YogaSize { width = width, height = height };
        }
    }
}
