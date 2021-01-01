using ReactUnity.StyleEngine;
using ReactUnity.Styling.Types;

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
            if (res != null && !Equals(res, SpecialNames.CantParse)) return res;
            if (value is string s) return FromString(s);
            return SpecialNames.CantParse;
        }

        public object FromString(string value)
        {
            var special = RuleHelpers.GetSpecialName(value);
            if (special != SpecialNames.NoSpecialName) return special;
            return SpecialNames.CantParse;
        }
    }
}
