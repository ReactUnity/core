using System;
using System.Collections.Generic;
using ReactUnity.Styling;

namespace ReactUnity.Converters
{
    public class BoolConverter : IStyleParser, IStyleConverter
    {
        HashSet<string> truthyValues;
        HashSet<string> falsyValues;

        public BoolConverter(string[] truthyValues, string[] falsyValues)
        {
            this.truthyValues = new HashSet<string>(truthyValues ?? new string[0], StringComparer.OrdinalIgnoreCase);
            this.falsyValues = new HashSet<string>(falsyValues ?? new string[0], StringComparer.OrdinalIgnoreCase);
        }

        public object Convert(object value)
        {
            if (value is bool b) return b;
            return FromString(value?.ToString());
        }

        public object FromString(string value)
        {
            if (truthyValues.Contains(value)) return true;
            if (falsyValues.Contains(value)) return false;
            return CssKeyword.Invalid;
        }
    }
}
