using System.Collections.Generic;
using ReactUnity.Styling;
using ReactUnity.Types;

namespace ReactUnity.Converters
{
    public class UrlConverter : IStyleParser, IStyleConverter
    {
        private static HashSet<string> AllowedFunctions = new HashSet<string> { "url" };

        public bool CanHandleKeyword(CssKeyword keyword) => false;

        public object Convert(object value)
        {
            if (value is Url u) return u;
            return FromString(value?.ToString());
        }

        public object FromString(string value)
        {
            if (CssFunctions.TryCall(value, out var result, AllowedFunctions))
            {
                if (result is Url u) return u;
            }

            return CssKeyword.Invalid;
        }
    }
}
