using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace ReactUnity.Converters
{
    internal static class ParserHelpers
    {
        public static Regex FunctionRegex = new Regex(@"^([\w\d-]+)\(([\s\w\d\.,/%#_:;+""\'\`\(\)-]*)\)$", RegexOptions.IgnoreCase);

        public static (string, string[]) ParseFunction(string fn)
        {
            if (fn == null) return (null, null);
            fn = fn.Trim();
            var match = FunctionRegex.Match(fn);

            if (!match.Success) return (null, null);

            var name = match.Groups[1].Value;
            var args = match.Groups[2].Value;

            var splits = Split(args, ',');

            if (splits.Count == 1 && splits[0] == "") return (name, new string[] { });
            else
            {
                var res = new string[splits.Count];

                for (int i = 0; i < splits.Count; i++)
                    res[i] = splits[i];

                return (name, res);
            }
        }

        public static List<string> SplitComma(string val) => Split(val, ',');
        public static List<string> SplitWhitespace(string val) => Split(val, ' ');

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

        public static float[] ParseCommaSeparatedColor(string[] vals)
        {
            if (vals.Length != 3 && vals.Length != 4) return null;

            var list = new float[vals.Length];

            for (int i = 0; i < 3; i++)
            {
                if (AllConverters.ColorValueConverter.Convert(vals[i]) is float v) list[i] = v;
                else return null;
            }

            if (vals.Length == 4)
            {
                if (AllConverters.PercentageConverter.Convert(vals[3]) is float alpha) list[3] = alpha;
                else return null;
            }

            return list;
        }

        public static float[] ParseSpaceSeparatedColor(string val)
        {
            var vals = ParseSpaceSeparatedColorArguments(val);
            return ParseCommaSeparatedColor(vals.ToArray());
        }


        public static List<string> ParseSpaceSeparatedColorArguments(string val)
        {
            var alphaSplit = val.Split(new[] { '/' }, 2);
            var vals = SplitWhitespace(alphaSplit[0]);
            if (alphaSplit.Length > 1) vals.Add(alphaSplit[1].Trim());
            return vals;
        }
    }
}
