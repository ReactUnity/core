using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using ReactUnity.Animations;
using ReactUnity.Converters;
using ReactUnity.Styling.Computed;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Styling
{
    public static class CssFunctions
    {
        // Static props here will be automatically added to the Functions list
        public static ICssFunction Steps = new StepsFunction();
        public static ICssFunction CubicBezier = new CubicBezierFunction();
        public static ICssFunction Url = new UrlFunction();
        public static ICssFunction Rgba = new RgbaFunction();
        public static ICssFunction Hsla = new HslaFunction();
        public static ICssFunction Var = new VarFunction();
        public static ICssFunction Vector3 = new Vector3Function();

        private static Dictionary<string, ICssFunction> Functions = new Dictionary<string, ICssFunction>(StringComparer.OrdinalIgnoreCase)
        {
            {  "rgb", Rgba },
            {  "hsl", Hsla },
            {  "hsv", Hsla },
            {  "hsva", Hsla },
            {  "vector2", Vector3 },
        };

        public static bool TryCall(string expression, out object result, HashSet<string> allowed = null)
        {
            if (string.IsNullOrWhiteSpace(expression))
            {
                result = null;
                return false;
            }

            var (name, splits) = ParserHelpers.ParseFunction(expression);

            if (splits == null || splits.Length == 0)
            {
                result = null;
                return false;
            }

            if ((allowed == null || allowed.Contains(name))
                && Functions.TryGetValue(name, out var fun)
                && fun.CanHandleArguments(splits.Length, name, splits))
            {
                result = fun.Call(name, splits);
                return true;
            }

            result = null;
            return false;
        }

        static CssFunctions()
        {
            var type = typeof(CssFunctions);
            var fields = type.GetFields(BindingFlags.Static | BindingFlags.Public);
            var functionFields = fields.Where(x => typeof(ICssFunction).IsAssignableFrom(x.FieldType));

            foreach (var fn in functionFields)
            {
                var prop = fn.GetValue(type) as ICssFunction;
                Functions[prop.Name] = prop;
            }
        }

        private class StepsFunction : ICssFunction
        {
            static private IStyleConverter StepConverter = new EnumConverter<StepsJumpMode>(true);

            public string Name { get; } = "steps";

            public object Call(string name, string[] args)
            {
                var a1 = AllConverters.IntConverter.Convert(args[0]);
                var a2 = args.Length > 1 ? StepConverter.Convert(args[1]) : StepsJumpMode.End;

                var stepMode = a2 is StepsJumpMode s2 ? s2 : StepsJumpMode.End;

                if (a1 is int f1)
                    return TimingFunctions.Steps(f1, stepMode);

                return null;
            }

            public bool CanHandleArguments(int count, string name, string[] args) => count == 1 || count == 2;
        }

        private class CubicBezierFunction : ICssFunction
        {
            public string Name { get; } = "cubic-bezier";

            public object Call(string name, string[] args)
            {
                var a1 = AllConverters.FloatConverter.Convert(args[0]);
                var a2 = AllConverters.FloatConverter.Convert(args[1]);
                var a3 = AllConverters.FloatConverter.Convert(args[2]);
                var a4 = AllConverters.FloatConverter.Convert(args[3]);

                if (a1 is float f1 &&
                    a2 is float f2 &&
                    a3 is float f3 &&
                    a4 is float f4)
                    return TimingFunctions.CubicBezier.Create(f1, f2, f3, f4);

                return null;
            }

            public bool CanHandleArguments(int count, string name, string[] args) => count == 4;
        }

        private class UrlFunction : ICssFunction
        {
            public string Name { get; } = "url";

            public object Call(string name, string[] args)
            {
                if (args.Length < 1) return null;

                var a1 = string.Join(",", args);

                return new Url(a1);
            }

            public bool CanHandleArguments(int count, string name, string[] args) => count >= 1;
        }

        private class Vector3Function : ICssFunction
        {
            public string Name { get; } = "vector3";

            public object Call(string name, string[] args)
            {
                var x = args.Length > 0 ? AllConverters.FloatConverter.Convert(args[0]) : null;
                var y = args.Length > 1 ? AllConverters.FloatConverter.Convert(args[1]) : null;
                var z = args.Length > 2 ? AllConverters.FloatConverter.Convert(args[2]) : null;

                if (x is float xf)
                {
                    if (y is float yf)
                    {
                        if (z is float zf) return new Vector3(xf, yf, zf);
                        return new Vector3(xf, yf, 0);
                    }
                    return null;
                }
                return null;
            }

            public bool CanHandleArguments(int count, string name, string[] args) => count == 2 || count == 3;
        }

        private class VarFunction : ICssFunction
        {
            static HashSet<string> Allowed = new HashSet<string> { "var" };
            public string Name { get; } = "var";

            public object Call(string name, string[] args)
            {
                if (args.Length < 1) return null;

                var varName = args[0];
                string fallback = null;
                if (args.Length > 1)
                {
                    fallback = string.Join(", ", args, 1);
                }

                var isProperty = TryCall(fallback, out var res, Allowed);
                var resFallback = isProperty ? res : fallback;

                return new ComputedVariable(new VariableProperty(varName), resFallback);
            }

            public bool CanHandleArguments(int count, string name, string[] args) => count >= 1;
        }

        private class RgbaFunction : ICssFunction
        {
            public string Name { get; } = "rgba";

            public object Call(string name, string[] args)
            {
                float[] vals;
                if (args.Length == 1) vals = ParserHelpers.ParseSpaceSeparatedColor(args[0]);
                else if (args.Length == 3 || args.Length == 4) vals = ParserHelpers.ParseCommaSeparatedColor(args);
                else return null;

                return new UnityEngine.Color(vals[0] / 255f, vals[1] / 255f, vals[2] / 255f, vals.Length > 3 ? vals[3] : 1);
            }

            public bool CanHandleArguments(int count, string name, string[] args) => count == 1 || count == 3 || count == 4;
        }

        private class HslaFunction : ICssFunction
        {
            public string Name { get; } = "hsla";

            public object Call(string name, string[] args)
            {
                string[] parsedArgs;
                if (args.Length == 1) parsedArgs = ParserHelpers.ParseSpaceSeparatedColorArguments(args[0]).ToArray();
                else if (args.Length == 3 || args.Length == 4) parsedArgs = args;
                else return null;

                var vals = new float[parsedArgs.Length];

                if (AllConverters.AngleConverter.Convert(parsedArgs[0]) is float h) vals[0] = h;
                else return null;

                if (AllConverters.PercentageConverter.Convert(parsedArgs[1]) is float s) vals[1] = s;
                else return null;

                if (AllConverters.PercentageConverter.Convert(parsedArgs[2]) is float l) vals[2] = l;
                else return null;

                if (parsedArgs.Length == 4)
                {
                    if (AllConverters.PercentageConverter.Convert(parsedArgs[3]) is float alpha) vals[3] = alpha;
                    else return null;
                }

                if (name == "hsv" || name == "hsva")
                {
                    var col = UnityEngine.Color.HSVToRGB(vals[0] / 360f, vals[1], vals[2]);
                    if (vals.Length > 3) col.a = vals[3];
                    return col;
                }
                return HslToRgb(vals[0] / 360f, vals[1], vals[2], vals.Length > 3 ? vals[3] : 1);
            }

            private UnityEngine.Color HslToRgb(float h, float s, float l, float a)
            {
                float r, g, b;

                if (s == 0)
                {
                    r = g = b = l; // achromatic
                }
                else
                {
                    var q = l < 0.5f ? l * (1 + s) : l + s - l * s;
                    var p = 2 * l - q;

                    r = HueToRgb(p, q, h + 1f / 3f);
                    g = HueToRgb(p, q, h);
                    b = HueToRgb(p, q, h - 1f / 3f);
                }

                return new UnityEngine.Color(r, g, b, a);
            }

            private float HueToRgb(float p, float q, float t)
            {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1f / 6) return p + (q - p) * 6 * t;
                if (t < 1f / 2) return q;
                if (t < 2f / 3) return p + (q - p) * (2f / 3 - t) * 6;
                return p;
            }

            public bool CanHandleArguments(int count, string name, string[] args) => count == 1 || count == 3 || count == 4;
        }
    }

    public interface ICssFunction
    {
        string Name { get; }
        bool CanHandleArguments(int count, string name, string[] args);
        object Call(string name, string[] args);
    }
}
