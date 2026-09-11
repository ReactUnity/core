using System;
using ExCSS;

namespace ReactUnity.Styling.Rules
{
    /// <summary>
    /// A custom property registered with <c>@property</c>. The initial value is kept as written and
    /// converted where it is used, the way a declared variable's value is; <c>syntax</c> only
    /// decides whether the rule needed an initial value to be valid at all.
    /// </summary>
    public class RegisteredProperty
    {
        /// <summary>The universal syntax, which accepts any value and so guarantees nothing.</summary>
        public const string UniversalSyntax = "*";

        public string Name { get; }
        public string Syntax { get; }
        public bool Inherits { get; }

        /// <summary>The value the property has where it is not declared, or null when it has none.</summary>
        public object InitialValue { get; }

        internal RegisteredProperty(string name, string syntax, bool inherits, object initialValue)
        {
            Name = name;
            Syntax = syntax;
            Inherits = inherits;
            InitialValue = initialValue;
        }

        /// <summary>
        /// Reads an <c>@property</c> rule, or returns null when it is invalid and has to be ignored:
        /// the name must be a dashed identifier, <c>syntax</c> and <c>inherits</c> are both required,
        /// and so is an initial value unless the syntax is the universal one.
        /// </summary>
        public static RegisteredProperty Create(IPropertyRule rule)
        {
            var name = rule?.Name?.Trim();
            if (string.IsNullOrEmpty(name) || !name.StartsWith("--", StringComparison.Ordinal) || name.Length <= 2) return null;

            var syntax = Unquote(rule.Syntax);
            if (string.IsNullOrEmpty(syntax)) return null;

            var inherits = rule.Inherits?.Trim();
            if (!bool.TryParse(inherits, out var inheritsValue)) return null;

            var initial = rule.InitialValue?.Trim();
            if (string.IsNullOrEmpty(initial))
            {
                // Only the universal syntax may leave it out, and then the property has no initial
                // value at all -- so a var() reading it still falls through to its own fallback.
                return syntax == UniversalSyntax ? new RegisteredProperty(name, syntax, inheritsValue, null) : null;
            }

            return new RegisteredProperty(name, syntax, inheritsValue, initial);
        }

        private static string Unquote(string value)
        {
            var trimmed = value?.Trim();
            if (string.IsNullOrEmpty(trimmed) || trimmed.Length < 2) return trimmed;

            var quote = trimmed[0];
            if (quote != '"' && quote != '\'') return trimmed;

            return trimmed[trimmed.Length - 1] == quote ? trimmed.Substring(1, trimmed.Length - 2).Trim() : trimmed;
        }
    }
}
