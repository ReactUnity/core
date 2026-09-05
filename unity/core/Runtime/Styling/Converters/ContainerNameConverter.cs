using System;
using ReactUnity.Styling.Computed;

namespace ReactUnity.Styling.Converters
{
    /// <summary>
    /// <c>container-name</c>: one or more identifiers, kept as a single space-separated string.
    /// The words the grammar reserves are refused, so that <c>none</c> stays the way to clear it.
    /// </summary>
    public class ContainerNameConverter : TypedStyleConverterBase<string>
    {
        protected override bool ParseInternal(string value, out IComputedValue result)
        {
            var names = ParserHelpers.SplitWhitespace(value);
            if (names.Count == 0) return Fail(out result);

            for (int i = 0; i < names.Count; i++)
                if (!IsCustomIdent(names[i])) return Fail(out result);

            return Constant(names.Count == 1 ? names[0] : string.Join(" ", names), out result);
        }

        private static bool IsCustomIdent(string name)
        {
            if (name.Length == 0 || char.IsDigit(name[0])) return false;

            for (int i = 0; i < name.Length; i++)
            {
                var c = name[i];
                if (!char.IsLetterOrDigit(c) && c != '-' && c != '_') return false;
            }

            return !name.Equals("none", StringComparison.OrdinalIgnoreCase)
                && !name.Equals("and", StringComparison.OrdinalIgnoreCase)
                && !name.Equals("or", StringComparison.OrdinalIgnoreCase)
                && !name.Equals("not", StringComparison.OrdinalIgnoreCase)
                && !name.Equals("default", StringComparison.OrdinalIgnoreCase);
        }
    }
}
