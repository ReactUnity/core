using ReactUnity.Animations;
using ReactUnity.Styling.Parsers;
using ReactUnity.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace ReactUnity.Styling
{
    public static class CssFunctions
    {
        public static ICssFunction Steps = new StepsFunction();
        public static ICssFunction CubicBezier = new CubicBezierFunction();
        public static ICssFunction Url = new UrlFunction();

        private static Dictionary<string, ICssFunction> Functions = new Dictionary<string, ICssFunction>(StringComparer.OrdinalIgnoreCase);

        public static bool TryCall(string expression, out object result, HashSet<string> allowed)
        {
            if (string.IsNullOrWhiteSpace(expression))
            {
                result = null;
                return false;
            }

            var splits = ParserHelpers.ParseFunction(expression);

            if (splits == null || splits.Length == 0)
            {
                result = null;
                return false;
            }

            var name = splits[0];

            if ((allowed == null || allowed.Contains(name))
                && Functions.TryGetValue(name, out var fun)
                && fun.CanHandleArguments(splits.Length - 1, splits))
            {
                result = fun.Call(splits);
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
            static private IStyleConverter StepConverter = new EnumConverter<StepsJumpMode>();

            public string Name { get; } = "steps";

            public object Call(string[] args)
            {
                var a1 = Converters.IntConverter.Convert(args[1]);
                var a2 = args.Length > 2 ? StepConverter.Convert(args[2]) : StepsJumpMode.End;

                var stepMode = a2 is StepsJumpMode s2 ? s2 : StepsJumpMode.End;

                if (a1 is int f1)
                    return TimingFunctions.Steps(f1, stepMode);

                return null;
            }

            public bool CanHandleArguments(int count, string[] args) => count == 1 || count == 2;
        }

        private class CubicBezierFunction : ICssFunction
        {
            public string Name { get; } = "cubic-bezier";

            public object Call(string[] args)
            {
                var a1 = Converters.FloatConverter.Convert(args[1]);
                var a2 = Converters.FloatConverter.Convert(args[2]);
                var a3 = Converters.FloatConverter.Convert(args[3]);
                var a4 = Converters.FloatConverter.Convert(args[4]);

                if (a1 is float f1 &&
                    a2 is float f2 &&
                    a3 is float f3 &&
                    a4 is float f4)
                    return TimingFunctions.CubicBezier.Create(f1, f2, f3, f4);

                return null;
            }

            public bool CanHandleArguments(int count, string[] args) => count == 4;
        }

        private class UrlFunction : ICssFunction
        {
            public string Name { get; } = "url";

            public object Call(string[] args)
            {
                if (args.Length < 2) return null;

                var a1 = string.Join("", args, 1, args.Length - 1);

                return new Url(a1);
            }

            public bool CanHandleArguments(int count, string[] args) => count >= 1;
        }
    }

    public interface ICssFunction
    {
        string Name { get; }
        bool CanHandleArguments(int count, string[] args);
        object Call(string[] args);
    }
}
