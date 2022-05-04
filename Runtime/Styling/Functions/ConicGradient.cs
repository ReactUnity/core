using System.Collections.Generic;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Styling.Functions
{
    internal class ConicGradientFunction : ICssFunction
    {
        public string Name { get; } = "conic-gradient";

        public object Call(string name, string[] args, string argsCombined)
        {
            if (args.Length < 2) return null;

            var first = args[0];
            var startIndex = 0;

            IComputedValue from = null;
            IComputedValue at = null;
            var isRepeating = name.StartsWith("repeating-");


            var firstSplit = ParserHelpers.SplitWhitespace(first);

            for (int i = 0; i < firstSplit.Count; i++)
            {
                var sp = firstSplit[i];

                if (sp == "at")
                {
                    sp = "";
                    for (int j = i + 1; j < firstSplit.Count; j++)
                    {
                        if (firstSplit[j] == "from") break;
                        sp += " " + firstSplit[j];
                        i = j;
                    }

                    if (AllConverters.YogaValue2Converter.TryParse(sp.Trim(), out at))
                    {
                        startIndex = 1;
                        continue;
                    }
                    else return null;
                }

                if (sp == "from")
                {
                    sp = "";
                    for (int j = i + 1; j < firstSplit.Count; j++)
                    {
                        if (firstSplit[j] == "at") break;
                        sp += " " + firstSplit[j];
                        i = j;
                    }

                    if (AllConverters.AngleConverter.TryParse(sp.Trim(), out from))
                    {
                        startIndex = 1;
                        continue;
                    }
                    else return null;
                }
            }

            if (args.Length - startIndex < 2) return null;

            var colors = LinearGradientFunction.GetColorKeys(args, startIndex, false);

            return ComputedCompound.Create(
                new List<IComputedValue> { colors, at ?? new ComputedConstant(YogaValue2.Center), from ?? new ComputedConstant(0f) },
                new List<StyleConverterBase> { new TypedStyleConverterBase<List<BaseGradient.ColorKey>>(), AllConverters.YogaValue2Converter, AllConverters.AngleConverter },
                (resolved) => {
                    if (
                        resolved[0] is List<BaseGradient.ColorKey> colorsRs &&
                        resolved[1] is YogaValue2 atRs &&
                        resolved[2] is float fromRs
                    )
                        return new ConicGradient(colorsRs, isRepeating, atRs, fromRs * Mathf.Deg2Rad);
                    return null;
                });
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count >= 2;
    }
}
