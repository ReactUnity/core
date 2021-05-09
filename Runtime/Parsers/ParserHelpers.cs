using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace ReactUnity.Styling.Parsers
{
    internal static class ParserHelpers
    {
        public static Regex FunctionRegex = new Regex(@"^([\w\d-]+)\(([\s\w\d\.,/%#_:;+-]*)\)$", RegexOptions.IgnoreCase);

        public static string[] ParseFunction(string fn)
        {
            if (fn == null) return null;
            fn = fn.Trim();
            var match = FunctionRegex.Match(fn);

            if (!match.Success) return null;

            var name = match.Groups[1].Value;
            var args = match.Groups[2].Value;

            var splits = Split(args, ',');

            if (splits.Count == 1 && splits[0] == "") return new string[] { name };
            else
            {
                var res = new string[splits.Count + 1];

                res[0] = name;

                for (int i = 0; i < splits.Count; i++)
                    res[i + 1] = splits[i];

                return res;
            }
        }

        public static List<string> Split(string val, char separator)
        {
            var acc = new StringBuilder();
            var spaces = new StringBuilder();

            var list = new List<string>();

            var len = val.Length;

            var parensStack = 0;

            for (int i = 0; i < len; i++)
            {
                var c = val[i];

                if (c == '(')
                {
                    parensStack++;
                }

                if (parensStack == 0 && c == separator)
                {
                    if (!char.IsWhiteSpace(c) || acc.Length > 0)
                    {
                        list.Add(acc.ToString());
                        acc.Clear();
                        spaces.Clear();
                    }
                }
                else if (parensStack == 0 && char.IsWhiteSpace(c))
                {
                    if (acc.Length > 0) spaces.Append(c);
                }
                else
                {
                    if (spaces.Length > 0)
                    {
                        acc.Append(spaces);
                        spaces.Clear();
                    }
                    acc.Append(c);
                    if (c == ')') parensStack--;
                }
            }

            if (!char.IsWhiteSpace(separator) || acc.Length > 0)
                list.Add(acc.ToString());

            return list;
        }
    }
}
