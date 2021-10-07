using ReactUnity.Converters;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Styling.Functions
{
    internal class ConicGradientFunction : ICssFunction
    {
        public string Name { get; } = "conic-gradient";

        public object Call(string name, string[] args)
        {
            if (args.Length < 2) return null;

            var first = args[0];
            var startIndex = 0;

            var from = 0f;
            var at = YogaValue2.Center;
            var isRepeating = name.StartsWith("repeating-");


            var firstSplit = ParserHelpers.SplitWhitespace(first);

            for (int i = 0; i < firstSplit.Count; i++)
            {
                var sp = firstSplit[i];

                if (sp == "at")
                {
                    i++;
                    if (firstSplit.Count <= i) return null;

                    sp = firstSplit[i];

                    var cAt = AllConverters.YogaValue2Converter.Convert(sp);

                    if (cAt is YogaValue2 cvAt)
                    {
                        at = cvAt;
                    }
                    else return null;

                    startIndex = 1;
                    continue;
                }

                if (sp == "from")
                {
                    i++;
                    if (firstSplit.Count <= i) return null;

                    sp = firstSplit[i];

                    var cAt = AllConverters.AngleConverter.Convert(sp);

                    if (cAt is float cvAt)
                    {
                        from = cvAt;
                    }
                    else return null;

                    startIndex = 1;
                    continue;
                }
            }

            if (args.Length - startIndex < 2) return null;

            var colors = LinearGradientFunction.GetColorKeys(args, startIndex, false);

            var def = new ConicGradient(colors, isRepeating, at, from * Mathf.Deg2Rad);
            return def.Valid ? def : null;
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count >= 2;
    }
}
