using ReactUnity.Styling;

namespace ReactUnity.Converters
{
    public interface IStyleParser
    {
        object FromString(string value);
    }

    public interface IStyleConverter
    {
        object Convert(object value);

        bool CanHandleKeyword(CssKeyword keyword);
    }
}
