using System.Collections.Generic;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;

namespace ReactUnity.Styling.Functions
{
    internal class VarFunction : ICssFunction
    {
        static HashSet<string> Allowed = new HashSet<string> { "var" };
        public string Name { get; } = "var";

        public object Call(string name, string[] args, string argsCombined, StyleConverterBase converter)
        {
            if (args.Length < 1) return null;

            var varName = args[0];
            string fallback = null;
            if (args.Length > 1)
            {
                fallback = string.Join(", ", args, 1);
            }

            var isProperty = CssFunctions.TryCall(fallback, out var res, Allowed, null);
            var resFallback = isProperty ? res : fallback;

            return new ComputedVariable(new VariableProperty(varName), resFallback);
        }

        public bool CanHandleArguments(int count, string name, string[] args) => count >= 1;
    }
}
