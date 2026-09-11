using System;
using System.Collections.Generic;

namespace ReactUnity.Styling.Rules
{
    /// <summary>
    /// Evaluates an @supports condition against ReactUnity's own property and value support.
    /// ExCSS can evaluate one itself, but only against the properties and values the web has,
    /// so it answers wrongly in both directions for a CSS dialect that is neither a subset nor
    /// a superset of it.
    /// </summary>
    public static class SupportsCondition
    {
        /// <summary>
        /// Whether the condition holds. The context decides which pseudo-classes a
        /// <c>selector()</c> query counts as supported; without one, every state is.
        /// </summary>
        public static bool Evaluate(string condition, ReactContext context = null)
        {
            if (string.IsNullOrWhiteSpace(condition)) return false;

            var cursor = 0;
            if (!TryParseCondition(condition, ref cursor, context, out var result)) return false;

            SkipWhitespace(condition, ref cursor);
            if (cursor != condition.Length) return false;

            return result;
        }

        // Condition := Unary (('and' | 'or') Unary)*
        // Mixing and/or without parentheses is invalid CSS; it is evaluated left to right here.
        private static bool TryParseCondition(string s, ref int i, ReactContext context, out bool value)
        {
            if (!TryParseUnary(s, ref i, context, out value)) return false;

            while (true)
            {
                var mark = i;
                SkipWhitespace(s, ref i);

                var word = ReadWord(s, i);
                var isAnd = word.Equals("and", StringComparison.OrdinalIgnoreCase);

                if (!isAnd && !word.Equals("or", StringComparison.OrdinalIgnoreCase))
                {
                    i = mark;
                    return true;
                }

                i += word.Length;

                // Both operands are always parsed, so that the cursor ends up past the whole condition.
                if (!TryParseUnary(s, ref i, context, out var operand)) return false;

                value = isAnd ? value && operand : value || operand;
            }
        }

        // Unary := 'not' Unary | Primary
        private static bool TryParseUnary(string s, ref int i, ReactContext context, out bool value)
        {
            SkipWhitespace(s, ref i);

            var word = ReadWord(s, i);
            if (word.Equals("not", StringComparison.OrdinalIgnoreCase))
            {
                i += word.Length;
                if (!TryParseUnary(s, ref i, context, out value)) return false;
                value = !value;
                return true;
            }

            return TryParsePrimary(s, ref i, context, out value);
        }

        // Primary := '(' Inner ')' | <ident> '(' ... ')'
        private static bool TryParsePrimary(string s, ref int i, ReactContext context, out bool value)
        {
            value = false;

            SkipWhitespace(s, ref i);
            if (i >= s.Length) return false;

            if (s[i] == '(')
            {
                if (!TryReadBalanced(s, ref i, out var inner)) return false;
                return TryEvaluateInner(inner, context, out value);
            }

            // A functional query. selector() is answered; font-tech() and font-format() are not
            // supported, but the cursor still has to move past them for the enclosing condition to parse.
            var name = ReadWord(s, i);
            if (name.Length == 0) return false;

            i += name.Length;
            if (i >= s.Length || s[i] != '(') return false;
            if (!TryReadBalanced(s, ref i, out var argument)) return false;

            value = name.Equals("selector", StringComparison.OrdinalIgnoreCase) && IsSelectorSupported(argument, context);
            return true;
        }

        private static bool TryEvaluateInner(string inner, ReactContext context, out bool value)
        {
            value = false;
            inner = inner.Trim();
            if (inner.Length == 0) return false;

            // Inside parentheses the grammar allows either a nested condition, which is itself
            // always parenthesized or negated, or a single declaration.
            if (inner[0] == '(' || IsWordAt(inner, 0, "not"))
            {
                var cursor = 0;
                if (!TryParseCondition(inner, ref cursor, context, out value)) return false;
                SkipWhitespace(inner, ref cursor);
                return cursor == inner.Length;
            }

            value = IsDeclarationSupported(inner);
            return true;
        }

        /// <summary>
        /// Whether one complex selector parses into parts this engine can match: every pseudo-class
        /// is one it knows or a state the context has a handler for, and every pseudo-element is
        /// one some element has. <c>:state()</c> and <c>:enter</c>/<c>:leave</c> always count.
        /// </summary>
        public static bool IsSelectorSupported(string selector, ReactContext context = null)
        {
            // selector() takes one complex selector; a list is not one.
            var branches = RuleHelpers.SplitSelectorList(selector);
            if (branches.Count != 1 || string.IsNullOrWhiteSpace(branches[0])) return false;

            foreach (var expanded in RuleHelpers.ExpandMatchesAny(branches[0].Trim()))
            {
                var normalized = RuleHelpers.StripZeroSpecificityMarks(RuleHelpers.NormalizeSelector(expanded));
                if (normalized.Length == 0) return false;

                var pendingCombinator = true;

                foreach (var token in normalized.Split(' '))
                {
                    if (token.Length == 1 && ">+~".IndexOf(token[0]) >= 0)
                    {
                        // A combinator with no compound before it is a relative selector, which selector() does not take.
                        if (pendingCombinator) return false;
                        pendingCombinator = true;
                        continue;
                    }

                    var parts = RuleHelpers.ParseSelector(token);
                    if (parts == null || parts.Count == 0) return false;

                    foreach (var part in parts)
                    {
                        if (!IsPartSupported(part, context)) return false;
                    }

                    pendingCombinator = false;
                }

                if (pendingCombinator) return false;
            }

            return true;
        }

        private static bool IsPartSupported(RuleSelectorPart part, ReactContext context)
        {
            switch (part.Type)
            {
                case RuleSelectorPartType.None:
                    return false;
                case RuleSelectorPartType.Tag:
                    // A `::name` parses as the `_name` tag, so an unknown one is a pseudo-element nothing has.
                    return part.Name == null || part.Name.Length == 0 || part.Name[0] != '_' || RuleHelpers.KnownPseudoElements.Contains(part.Name);
                case RuleSelectorPartType.State:
                {
                    var name = part.Parameter as string;
                    if (part.Name == "state" || name == "enter" || name == "leave" || context == null) return true;
                    return context.StateHandlers != null && context.StateHandlers.ContainsKey(name);
                }
                case RuleSelectorPartType.MatchesAny:
                    return part.Parameter is SelectorListParameter list && list.Valid;
                default:
                    return true;
            }
        }

        private static bool IsDeclarationSupported(string declaration)
        {
            var depth = 0;
            var colon = -1;

            for (int i = 0; i < declaration.Length; i++)
            {
                var c = declaration[i];
                if (c == '(') depth++;
                else if (c == ')') depth--;
                else if (c == ':' && depth == 0)
                {
                    colon = i;
                    break;
                }
            }

            if (colon < 0) return false;

            var name = declaration.Substring(0, colon).Trim();
            var value = declaration.Substring(colon + 1).Trim();

            if (value.EndsWith("!important", StringComparison.OrdinalIgnoreCase))
                value = value.Substring(0, value.Length - "!important".Length).TrimEnd();

            if (name.Length == 0 || value.Length == 0) return false;

            var key = CssProperties.GetKey(name);
            if (key == null) return false;

            try
            {
                // Modify returns null when the value does not convert, which is exactly the question
                // @supports asks. The probe dictionary is discarded.
                var probe = new Dictionary<IStyleProperty, object>();
                return key.Modify(probe, value) != null && probe.Count > 0;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>Reads a parenthesized run starting at <paramref name="i"/>, returning its contents.</summary>
        private static bool TryReadBalanced(string s, ref int i, out string inner)
        {
            inner = null;
            if (i >= s.Length || s[i] != '(') return false;

            var depth = 0;
            var start = i + 1;

            for (; i < s.Length; i++)
            {
                var c = s[i];
                if (c == '(') depth++;
                else if (c == ')')
                {
                    depth--;
                    if (depth == 0)
                    {
                        inner = s.Substring(start, i - start);
                        i++;
                        return true;
                    }
                }
            }

            return false;
        }

        private static void SkipWhitespace(string s, ref int i)
        {
            while (i < s.Length && char.IsWhiteSpace(s[i])) i++;
        }

        private static string ReadWord(string s, int i)
        {
            var start = i;
            while (i < s.Length && (char.IsLetterOrDigit(s[i]) || s[i] == '-' || s[i] == '_')) i++;
            return s.Substring(start, i - start);
        }

        private static bool IsWordAt(string s, int i, string word)
        {
            var read = ReadWord(s, i);
            return read.Equals(word, StringComparison.OrdinalIgnoreCase);
        }
    }
}
