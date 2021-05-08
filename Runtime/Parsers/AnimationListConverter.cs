using ReactUnity.Animations;

namespace ReactUnity.Styling.Parsers
{
    public class AnimationListConverter : IStyleParser, IStyleConverter
    {
        public object Convert(object value)
        {
            if (value is AnimationList f) return f;
            if (value is Animation t) return new AnimationList(t);
            return FromString(value?.ToString());
        }

        public object FromString(string value)
        {
            if (string.IsNullOrWhiteSpace(value)) return null;

            return new AnimationList(value);
        }
    }
}
