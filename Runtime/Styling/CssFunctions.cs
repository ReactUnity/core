using System;
using System.Collections.Generic;
using ReactUnity.Styling.Converters;
using ReactUnity.Styling.Functions;

namespace ReactUnity.Styling
{
    public static class CssFunctions
    {
        public static ICssFunction Steps = new StepsFunction();
        public static ICssFunction CubicBezier = new CubicBezierFunction();
        public static ICssFunction Url = new UrlFunction();
        public static ICssFunction Resource = new UrlFunction() { DefaultProtocol = Types.UrlProtocol.Resource };
        public static ICssFunction Rgba = new RgbaFunction();
        public static ICssFunction Hsla = new HslaFunction();
        public static ICssFunction Var = new VarFunction();
        public static ICssFunction Vector3 = new Vector3Function();
        public static ICssFunction LinearGradient = new LinearGradientFunction();
        public static ICssFunction RadialGradient = new RadialGradientFunction();
        public static ICssFunction ConicGradient = new ConicGradientFunction();

        private static Dictionary<string, ICssFunction> Functions = new Dictionary<string, ICssFunction>(StringComparer.InvariantCultureIgnoreCase)
        {
            { "rgb", Rgba },
            { "hsl", Hsla },
            { "hsv", Hsla },
            { "hsva", Hsla },
            { "vector2", Vector3 },
            { "steps", Steps },
            { "cubic-bezier", CubicBezier },
            { "url", Url },
            { "resource", Resource },
            { "rgba", Rgba },
            { "hsla", Hsla },
            { "var", Var },
            { "vector3", Vector3 },
            { "linear-gradient", LinearGradient },
            { "repeating-linear-gradient", LinearGradient },
            { "radial-gradient", RadialGradient },
            { "repeating-radial-gradient", RadialGradient },
            { "conic-gradient", ConicGradient },
            { "repeating-conic-gradient", ConicGradient },
        };

        public static bool TryCall(string expression, out object result, HashSet<string> allowed = null)
        {
            if (string.IsNullOrWhiteSpace(expression))
            {
                result = null;
                return false;
            }

            var (name, splits, argsCombined) = ParserHelpers.ParseFunction(expression);

            if (splits == null || splits.Length == 0)
            {
                result = null;
                return false;
            }

            if ((allowed == null || allowed.Contains(name) || name == "var")
                && Functions.TryGetValue(name, out var fun)
                && fun.CanHandleArguments(splits.Length, name, splits))
            {
                result = fun.Call(name, splits, argsCombined);
                return true;
            }

            result = null;
            return false;
        }
    }

    public interface ICssFunction
    {
        string Name { get; }
        bool CanHandleArguments(int count, string name, string[] args);
        object Call(string name, string[] args, string argsCombined);
    }
}
