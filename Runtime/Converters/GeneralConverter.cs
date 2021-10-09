using System.Collections.Generic;
using ReactUnity.StyleEngine;
using ReactUnity.Styling;
using ReactUnity.Styling.Computed;

namespace ReactUnity.Converters
{
    public class GeneralConverter : IStyleParser, IStyleConverter
    {
        static private HashSet<string> AllowedFunctions = new HashSet<string> { "var" };
        IStyleConverter baseConverter;

        static public GeneralConverter Wrap(IStyleConverter baseConverter)
        {
            if (baseConverter is GeneralConverter gc) return gc;
            return new GeneralConverter(baseConverter);
        }

        public GeneralConverter(IStyleConverter baseConverter = null)
        {
            this.baseConverter = baseConverter;
        }

        public bool CanHandleKeyword(CssKeyword keyword) => baseConverter != null ? baseConverter.CanHandleKeyword(keyword) : false;

        public object Convert(object value)
        {
            if (value is string s) return Parse(s);
            if (value is IComputedValue) return value;
            var res = baseConverter?.Convert(value);
            if (res != null && !Equals(res, CssKeyword.Invalid)) return res;
            return CssKeyword.Invalid;
        }

        public object Parse(string value)
        {
            if (CssFunctions.TryCall(value, out var result, AllowedFunctions)) return result;
            var keyword = RuleHelpers.GetCssKeyword(value);
            if (keyword == CssKeyword.CurrentColor) return ComputedCurrentColor.Instance;
            if (keyword != CssKeyword.NoKeyword && keyword != CssKeyword.Invalid) return keyword;
            if (baseConverter != null) return baseConverter?.Parse(value);
            return CssKeyword.Invalid;
        }
    }
}
