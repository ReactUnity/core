using System.Collections.Generic;
using ReactUnity.StyleEngine;
using ReactUnity.Styling;

namespace ReactUnity.Converters
{
    public class GeneralConverter : IStyleParser, IStyleConverter
    {
        static private HashSet<string> AllowedFunctions = new HashSet<string> { "var" };
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
            if (CssFunctions.TryCall(value, out var result, AllowedFunctions)) return result;
            var keyword = RuleHelpers.GetCssKeyword(value);
            if (keyword == CssKeyword.CurrentColor) return DynamicCurrentColorValue.Instance;
            if (keyword != CssKeyword.NoKeyword) return keyword;
            return CssKeyword.Invalid;
        }
    }
}
