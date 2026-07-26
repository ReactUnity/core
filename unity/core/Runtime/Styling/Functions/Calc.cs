using System.Collections.Generic;
using ReactUnity.Helpers;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Functions
{
    internal class CalcFunction : ICssFunction
    {
        public string Name { get; } = "calc";

        public object Call(string name, string[] args, string argsCombined, StyleConverterBase converter)
        {
            if (string.IsNullOrWhiteSpace(argsCombined)) return null;

            return Parse(argsCombined.Trim(), converter);
        }

        private object Parse(string expression, StyleConverterBase converter)
        {
            var len = expression.Length;

            var parenStack = 0;
            var parenStart = -1;
            var cursor = -1;

            var items = new List<object>();
            var ops = new List<ComputedCalc.CalcOperator>();

            for (int i = 0; i < len; i++)
            {
                var c = expression[i];

                if (c == '(')
                {
                    parenStack++;
                    if (parenStack == 1) parenStart = i;
                }
                else if (c == ')')
                {
                    parenStack--;
                    if (parenStack < 0) return null;
                    else if (parenStack == 0)
                    {
                        if (parenStart == 0 && i == len - 1)
                        {
                            return Parse(expression.Substring(parenStart + 1, len - 2), converter);
                        }
                    }
                }
                else if (parenStack > 0) continue;
                else if (c == '+' || c == '-')
                {
                    if (i < 2 || i > len - 2) return null;
                    var prev = expression[i - 1];
                    var next = expression[i + 1];

                    if (prev == ' ' && next == ' ')
                    {
                        items.Add(expression.Substring(cursor + 1, i - 2 - cursor).Trim());
                        ops.Add(c == '+' ? ComputedCalc.CalcOperator.Add : ComputedCalc.CalcOperator.Subtract);

                        i++;
                        cursor = i;
                    }
                }
                else if (c == '*' || c == '/')
                {
                    if (i < 1 || i > len - 1) return null;
                    items.Add(expression.Substring(cursor + 1, i - 1 - cursor).Trim());
                    ops.Add(c == '*' ? ComputedCalc.CalcOperator.Multiply : ComputedCalc.CalcOperator.Divide);

                    cursor = i;
                }
                else continue;
            }

            if (parenStack > 0) return null;

            items.Add(expression.Substring(cursor + 1).Trim());

            for (int i = 0; i < items.Count; i++)
            {
                var item = items[i];

                if (item is string s && s.FastStartsWith("(") && s.FastEndsWith(")"))
                    items[i] = Parse(s, converter);
            }

            if (ComputedCalc.Create(out var result, items, ops, converter)) return result;
            return null;
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count == 1;
    }

}
