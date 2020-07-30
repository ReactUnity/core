using ReactUnity.Styling.Types;
using System.Linq;

namespace ReactUnity.Styling.Parsers
{
    public class BoolParser : IStyleParser
    {
        string[] truthyValues;
        string[] falsyValues;

        public BoolParser(string[] truthyValues, string[] falsyValues)
        {
            this.truthyValues = truthyValues ?? new string[0];
            this.falsyValues = falsyValues ?? new string[0];
        }

        public object FromString(string value)
        {
            if (truthyValues.Contains(value)) return true;
            if (falsyValues.Contains(value)) return false;
            return SpecialNames.CantParse;
        }
    }
}
