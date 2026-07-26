using System.Collections.Generic;
using Yoga;
using ReactUnity.Helpers;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Styling.Functions
{
    internal class LinearGradientFunction : ICssFunction
    {
        public string Name { get; } = "linear-gradient";

        public object Call(string name, string[] args, string argsCombined, StyleConverterBase converter)
        {
            if (args.Length < 2) return null;

            var first = args[0];
            var startIndex = 0;

            IComputedValue angle;
            var isRepeating = name.FastStartsWith("repeating-");

            if (AllConverters.AngleConverter.TryParse(first, out angle))
            {
                startIndex = 1;
            }

            if (args.Length - startIndex < 2) return null;

            var colors = GetColorKeys(args, startIndex, false);

            return ComputedCompound.Create(
                new List<IComputedValue> { colors, angle ?? new ComputedConstant(180f) },
                new List<StyleConverterBase> { new TypedStyleConverterBase<List<BaseGradient.ColorKey>>(), AllConverters.AngleConverter },
                (resolved) => {
                    if (
                        resolved[0] is List<BaseGradient.ColorKey> colorsRs &&
                        resolved[1] is float angleRs
                    )
                        return new LinearGradient(colorsRs, isRepeating, angleRs * Mathf.Deg2Rad);

                    return null;
                });
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count >= 2;

        internal static bool ConvertOffset(string val, bool angular, out IComputedValue result)
        {
            if (angular)
            {
                return ComputedMapper.Create(out result, val, AllConverters.AngleConverter,
                    (resolved) => {
                        if (resolved is float f) return YogaValue.Percent(f * 100f / 360f);
                        return null;
                    });
            }

            return AllConverters.YogaValueConverter.TryParse(val, out result);
        }

        internal static IComputedValue GetColorKeys(string[] args, int startIndex, bool angular)
        {
            var dcolors = new List<IComputedValue>();
            var doffsets = new List<IComputedValue>();

            for (int i = startIndex; i < args.Length; i++)
            {
                var arg = args[i];
                var parts = ParserHelpers.SplitWhitespace(arg);

                var p0 = parts[0];

                if (AllConverters.ColorConverter.TryParse(p0, out var c))
                {
                    if (parts.Count == 1)
                    {
                        dcolors.Add(c);
                        doffsets.Add(new ComputedConstant(YogaValue.Undefined()));
                    }
                    else
                    {
                        var p1 = parts[1];

                        if (ConvertOffset(p1, angular, out var f))
                        {
                            dcolors.Add(c);
                            doffsets.Add(f);
                        }
                        else return null;

                        if (parts.Count == 3)
                        {
                            var p2 = parts[2];

                            if (ConvertOffset(p2, angular, out var f2))
                            {
                                dcolors.Add(c);
                                doffsets.Add(f2);
                            }
                            else return null;
                        }
                    }
                }
                else
                {
                    if (parts.Count != 1) return null;
                    if (ConvertOffset(p0, angular, out var f))
                    {
                        doffsets.Add(f);

                        // HACK: add 0 so that it cannot be detected as color, but still passes the validation
                        dcolors.Add(new ComputedConstant(0));
                    }
                    else return null;
                }
            }

            return ComputedList.Create(dcolors, AllConverters.ColorConverter,
                (resolved) => {
                    return ComputedList.Create(doffsets, AllConverters.YogaValueConverter,
                        (resolved2) => {
                            var colors = new List<BaseGradient.ColorKey>();

                            for (int i = 0; i < resolved.Count; i++)
                            {
                                var c = resolved[i];
                                var o = resolved2[i];

                                if (o is YogaValue oo)
                                {
                                    if (c is Color cc) colors.Add(new BaseGradient.ColorKey { Color = cc, Offset = oo });
                                    else colors.Add(new BaseGradient.ColorKey { Color = null, Offset = oo });
                                }
                                else return null;
                            }

                            return colors;
                        });
                });
        }
    }
}
