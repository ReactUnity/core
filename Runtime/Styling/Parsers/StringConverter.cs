namespace ReactUnity.Styling.Parsers
{
    public class StringConverter : IStyleParser, IStyleConverter
    {
        public object Convert(object value)
        {
            return FromString(value?.ToString());
        }

        public object FromString(string value)
        {
            return value;
        }
    }
}
