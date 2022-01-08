using ReactUnity.Styling;

namespace ReactUnity.Converters
{
    public class StringConverter : IStyleParser, IStyleConverter
    {
        public bool CanHandleKeyword(CssKeyword keyword) => false;

        public object Convert(object value)
        {
            return Parse(value?.ToString());
        }

        public object Parse(string value)
        {
            if (string.IsNullOrWhiteSpace(value)) return value;
            if ((value.StartsWith("\"") && value.EndsWith("\""))
                || (value.StartsWith("'") && value.EndsWith("'"))
                || (value.StartsWith("`") && value.EndsWith("`")))
                return value.Substring(1, value.Length - 2);
            return value;
        }
    }
}
