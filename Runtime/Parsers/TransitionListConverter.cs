using ReactUnity.Animations;

namespace ReactUnity.Styling.Parsers
{
    public class TransitionListConverter : IStyleParser, IStyleConverter
    {
        public object Convert(object value)
        {
            if (value is TransitionList f) return f;
            if (value is Transition t) return new TransitionList(t);
            return FromString(value?.ToString());
        }

        public object FromString(string value)
        {
            if (string.IsNullOrWhiteSpace(value)) return null;

            return new TransitionList(value);
        }
    }
}
