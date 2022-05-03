using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Styling.Functions
{
    internal class LinearGradientFunction : ICssFunction
    {
        public string Name { get; } = "linear-gradient";

        public object Call(string name, string[] args, string argsCombined)
        {
            if (args.Length < 2) return null;

            var first = args[0];
            var startIndex = 0;

            IComputedValue angle = new ComputedConstant(180f);
            var isRepeating = name.StartsWith("repeating-");

            if (AllConverters.AngleConverter.TryParse(first, out angle))
            {
                startIndex = 1;
            }

            if (args.Length - startIndex < 2) return null;

            var colors = GetColorKeys(args, startIndex, false);

            return new ComputedCompound(
                new List<IComputedValue> { colors, angle },
                new List<StyleConverterBase> { new TypedStyleConverterBase<List<BaseGradient.ColorKey>>(), AllConverters.AngleConverter },
                (List<object> resolved, out IComputedValue rs) => {
                    if (
                        resolved[0] is List<BaseGradient.ColorKey> colors &&
                        resolved[1] is float angle
                    )
                    {
                        var res = new LinearGradient(colors, isRepeating, angle * Mathf.Deg2Rad);
                        rs = new ComputedConstant(res);
                        return res.Valid;
                    }

                    rs = null;
                    return false;
                });
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count >= 2;

        internal static bool ConvertOffset(string val, bool angular, out IComputedValue result)
        {
            if (angular)
            {
                return ComputedMapper.Create(out result, val, AllConverters.AngleConverter,
                    (object resolved, out IComputedValue rs) => {
                        if (resolved is float f)
                        {
                            rs = new ComputedConstant(YogaValue.Percent(f * 100f / 360f));
                            return true;
                        }

                        rs = null;
                        return false;

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
                        dcolors.Add(f);
                        doffsets.Add(new ComputedConstant(YogaValue.Undefined()));
                    }
                    else return null;
                }
            }

            return new ComputedList(dcolors, AllConverters.ColorConverter,
                (List<object> resolved, out IComputedValue rs) => {
                    rs = new ComputedList(doffsets, AllConverters.YogaValueConverter,
                        (List<object> resolved2, out IComputedValue rs2) => {
                            var colors = new List<BaseGradient.ColorKey>();

                            for (int i = 0; i < resolved.Count; i++)
                            {
                                var c = resolved[i];
                                var o = resolved2[i];

                                if (c is Color cc && o is YogaValue oo)
                                {
                                    colors.Add(new BaseGradient.ColorKey { Color = cc, Offset = oo });
                                }
                                else
                                {
                                    rs2 = null;
                                    return false;
                                }
                            }

                            rs2 = new ComputedConstant(colors);
                            return true;
                        });

                    return true;
                });
        }
    }
}
