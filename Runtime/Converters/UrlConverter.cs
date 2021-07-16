namespace ReactUnity.Converters
{
    public class UrlConverter : IStyleParser, IStyleConverter
    {
        public object Convert(object value)
        {
            return FromString(value?.ToString());
        }

        public object FromString(string value)
        {
            if (string.IsNullOrWhiteSpace(value)) return value;
            value = value.Trim();
            if (value.StartsWith("\"") && value.EndsWith("\"")) return value.Substring(1, value.Length - 2);
            if (value.StartsWith("'") && value.EndsWith("'")) return value.Substring(1, value.Length - 2);
            if (value.StartsWith("`") && value.EndsWith("`")) return value.Substring(1, value.Length - 2);
            if (value.StartsWith("url(") && value.EndsWith(")")) return FromString(value.Substring(4, value.Length - 5));
            return value;
        }
    }
}
