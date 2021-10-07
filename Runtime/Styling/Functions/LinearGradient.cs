using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.Converters;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Styling.Functions
{
    internal class LinearGradientFunction : ICssFunction
    {
        public string Name { get; } = "linear-gradient";

        public object Call(string name, string[] args)
        {
            if (args.Length < 2) return null;

            var first = args[0];
            var startIndex = 0;

            var angle = 180f;
            var isRepeating = name.StartsWith("repeating-");

            var cAngle = AllConverters.AngleConverter.Convert(first);

            if (cAngle is float fAngle)
            {
                angle = fAngle;
                startIndex = 1;
            }

            if (args.Length - startIndex < 2) return null;

            var colors = GetColorKeys(args, startIndex, false);

            var def = new LinearGradient(colors, isRepeating, angle * Mathf.Deg2Rad);
            return def.Valid ? def : null;
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count >= 2;

        internal static object ConvertOffset(string val, bool angular)
        {
            if (angular)
            {
                var ang = AllConverters.AngleConverter.Convert(val);

                if (ang is float f) return YogaValue.Percent(f * 100f / 360f);
                return null;
            }

            return AllConverters.YogaValueConverter.Convert(val);
        }

        internal static List<BaseGradient.ColorKey> GetColorKeys(string[] args, int startIndex, bool angular)
        {
            var colors = new List<BaseGradient.ColorKey>();

            for (int i = startIndex; i < args.Length; i++)
            {
                var arg = args[i];
                var parts = ParserHelpers.SplitWhitespace(arg);

                var p0 = parts[0];

                var p0c = AllConverters.ColorConverter.Convert(p0);

                if (p0c is Color c)
                {
                    if (parts.Count == 1)
                    {
                        colors.Add(new BaseGradient.ColorKey { Color = c });
                    }
                    else
                    {
                        var p1 = parts[1];
                        var p1f = ConvertOffset(p1, angular);

                        if (p1f is YogaValue f)
                            colors.Add(new BaseGradient.ColorKey { Color = c, Offset = f });
                        else return null;

                        if (parts.Count == 3)
                        {
                            var p2 = parts[2];
                            var p2f = ConvertOffset(p2, angular);

                            if (p2f is YogaValue f2)
                                colors.Add(new BaseGradient.ColorKey { Color = c, Offset = f2 });
                            else return null;
                        }
                    }
                }
                else
                {
                    if (parts.Count != 1) return null;
                    var p0f = ConvertOffset(p0, angular);

                    if (p0f is YogaValue f)
                    {
                        colors.Add(new BaseGradient.ColorKey { Offset = f });
                    }
                    else
                    {
                        return null;
                    }
                }
            }

            return colors;
        }
    }
}
