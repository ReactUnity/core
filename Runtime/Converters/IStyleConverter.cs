using ReactUnity.Styling;

namespace ReactUnity.Converters
{
    public interface IStyleParser
    {
        object Parse(string value);
    }

    public interface IStyleConverter : IStyleParser
    {
        object Convert(object value);

        bool CanHandleKeyword(CssKeyword keyword);
    }
}
