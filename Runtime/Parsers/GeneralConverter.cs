using ReactUnity.StyleEngine;

namespace ReactUnity.Styling.Parsers
{
    public class GeneralConverter : IStyleParser, IStyleConverter
    {
        IStyleConverter baseConverter;

        public GeneralConverter(IStyleConverter baseConverter = null)
        {
            this.baseConverter = baseConverter;
        }

        public object Convert(object value)
        {
            var res = baseConverter?.Convert(value);
            if (res != null && !Equals(res, CssKeyword.Invalid)) return res;
            if (value is string s) return FromString(s);
            return CssKeyword.Invalid;
        }

        public object FromString(string value)
        {
            var keyword = RuleHelpers.GetCssKeyword(value);
            if (keyword != CssKeyword.NoKeyword) return keyword;
            return CssKeyword.Invalid;
        }
    }
}
