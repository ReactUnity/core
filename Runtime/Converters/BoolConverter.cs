using System;
using System.Collections.Generic;
using ReactUnity.Styling;

namespace ReactUnity.Converters
{
    public class BoolConverter : IStyleParser, IStyleConverter
    {
        HashSet<string> truthyValues;
        HashSet<string> falsyValues;
        public bool CanHandleKeyword(CssKeyword keyword) => false;

        public BoolConverter(string[] truthyValues, string[] falsyValues)
        {
            this.truthyValues = new HashSet<string>(truthyValues ?? new string[0], StringComparer.InvariantCultureIgnoreCase);
            this.falsyValues = new HashSet<string>(falsyValues ?? new string[0], StringComparer.InvariantCultureIgnoreCase);
        }

        public object Convert(object value)
        {
            if (value is bool b) return b;
            return Parse(value?.ToString());
        }

        public object Parse(string value)
        {
            if (truthyValues.Contains(value)) return true;
            if (falsyValues.Contains(value)) return false;
            return CssKeyword.Invalid;
        }

        public static bool IsTruthy(object obj)
        {
            if (obj == null || obj is DBNull)
                return false;

            var str = obj as string;
            if (str != null)
                return !string.IsNullOrWhiteSpace(str) &&
                    !str.Trim().Equals(bool.FalseString, StringComparison.InvariantCultureIgnoreCase);

            try
            {
                if (System.Convert.ToDecimal(obj) == 0)
                    return false;
            }
            catch { }

            return true;
        }
    }
}
