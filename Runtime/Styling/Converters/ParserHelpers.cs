using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.RegularExpressions;
using ReactUnity.Styling.Computed;

namespace ReactUnity.Styling.Converters
{
    internal static class ParserHelpers
    {
        public static Regex FunctionRegex = new Regex(@"^([\w\d-]+)\(([\s\w\d\.,/%#_:;+""\'\`\(\)-]*)\)$", RegexOptions.IgnoreCase);

        public static (string, string[], string) ParseFunction(string val)
        {
            if (string.IsNullOrWhiteSpace(val)) return default;
            val = val.Trim();

            var name = new StringBuilder();
            var args = new StringBuilder();
            var len = val.Length;
            var parensStack = 0;
            var hasParens = false;

            for (int i = 0; i < len; i++)
            {
                var c = val[i];

                if (c == '(')
                {
                    parensStack++;
                    hasParens = true;

                    if (parensStack > 1) args.Append(c);
                    else if (name.Length == 0) return default;
                }
                else if (c == ')')
                {
                    parensStack--;

                    if (parensStack < 0) return default;
                    else if (parensStack > 0) args.Append(c);
                    else
                    {
                        if (i == len - 1) break;
                        else return (null, null, null);
                    }
                }
                else if (parensStack == 0)
                {
                    if (char.IsWhiteSpace(c)) return default;
                    name.Append(c);
                }
                else args.Append(c);
            }

            if (!hasParens) return default;

            var argsCombined = args.ToString();
            var splits = SplitComma(argsCombined);

            if (splits.Count == 1 && splits[0] == "") return (name.ToString(), new string[] { }, argsCombined);
            else return (name.ToString(), splits.ToArray(), argsCombined);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static List<string> SplitComma(string val) => Split(val, ',');

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static List<string> SplitWhitespace(string val, char isolateCharacter = default) => Split(val, ' ', isolateCharacter);

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static List<string> SplitShorthand(string val) => Split(val, ' ', '/');

        public static List<string> Split(string val, char separator, char isolateCharacter = default)
        {
            var acc = new StringBuilder();
            var spaces = new StringBuilder();
            var list = new List<string>();
            var len = val.Length;
            var parensStack = 0;

            for (int i = 0; i < len; i++)
            {
                var c = val[i];

                if (c == '(') parensStack++;

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
                else if (parensStack == 0 && c == isolateCharacter)
                {
                    if (acc.Length > 0) list.Add(acc.ToString());
                    acc.Clear();
                    spaces.Clear();
                    list.Add(c.ToString());
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

        public delegate object ColorCallback(float v1, float v2, float v3, float v4);

        public static bool ParseCommaSeparatedColor(string[] vals, ColorCallback callback, bool hsl, out IComputedValue result)
        {
            if (vals.Length != 3 && vals.Length != 4)
            {
                result = null;
                return false;
            }

            var cv = AllConverters.ColorValueConverter;
            var pc = AllConverters.PercentageConverter;

            return ComputedCompound.Create(
                out result,
                vals.OfType<object>().ToList(),
                hsl ? new List<StyleConverterBase> { cv, pc, pc, pc } : new List<StyleConverterBase> { cv, cv, cv, pc },
                (List<object> resolved, out IComputedValue rs) => {
                    if (resolved[0] is float r && resolved[1] is float g && resolved[2] is float b)
                    {
                        if (!(resolved.Count > 3 && resolved[3] is float a)) a = 1;
                        rs = new ComputedConstant(callback(r, g, b, a));
                        return true;
                    }
                    rs = null;
                    return false;
                });
        }

        public static bool ParseSpaceSeparatedColor(string val, ColorCallback callback, bool hsl, out IComputedValue result)
        {
            var vals = ParseSpaceSeparatedColorArguments(val);
            return ParseCommaSeparatedColor(vals.ToArray(), callback, hsl, out result);
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
