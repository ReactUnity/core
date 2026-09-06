using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using ExCSS;
using ReactUnity.Helpers;

namespace ReactUnity.Styling.Rules
{
    public static class RuleHelpers
    {
        // Specificity is packed into one int, most significant field first:
        //
        //   bits 24+     importance offset, one step per inserted stylesheet
        //   bit  23      !important
        //   bits 18-22   cascade layer rank
        //   bits 12-17   id count
        //   bits 6-11    class and pseudo-class count
        //   bits 0-5     tag count
        //
        // Layer sits above specificity and below importance because that is the order CSS Cascade 5
        // resolves them in. Its five bits leave exactly enough room below bit 23 for a full
        // specificity alongside the highest rank, so nothing can carry into the importance bit.
        public static int ImportantSpecifity = 1 << 23;
        public static int LayerSpecifityStep = 1 << 18;
        public const int MaxLayerRank = 31;

        /// <summary>
        /// Where a layer sits in the cascade, given a one-based layer order (0 being unlayered).
        /// Unlayered rules beat layered ones and a later layer beats an earlier one -- both of
        /// which reverse for important declarations.
        /// </summary>
        public static int LayerRank(int layerOrder, bool important)
        {
            if (layerOrder <= 0) return important ? 0 : MaxLayerRank;

            var clamped = Math.Min(layerOrder, MaxLayerRank - 1);
            return important ? MaxLayerRank - clamped : clamped;
        }

        public static Regex SplitSelectorRegex = new Regex("\\s+");

        // Stands in for a space inside `[...]` or `(...)` while the selector is split on whitespace,
        // so `[data-x="a b"]`, `:not(.a, .b)` and `:has(> .a .b)` reach ParseSelector in one piece.
        private const char InnerSpace = '\u0003';

        private static readonly Dictionary<string, RuleSelectorPartType> NthPartTypes = new Dictionary<string, RuleSelectorPartType>(StringComparer.InvariantCultureIgnoreCase)
        {
            { "nth-child", RuleSelectorPartType.NthChild },
            { "nth-last-child", RuleSelectorPartType.NthLastChild },
            { "nth-of-type", RuleSelectorPartType.NthOfType },
            { "nth-last-of-type", RuleSelectorPartType.NthLastOfType },
        };

        private static Dictionary<string, RuleSelectorPartType> BasicPartTypes = new Dictionary<string, RuleSelectorPartType>(StringComparer.InvariantCultureIgnoreCase)
        {
            { "first-child", RuleSelectorPartType.FirstChild },
            { "last-child", RuleSelectorPartType.LastChild },
            { "only-child", RuleSelectorPartType.OnlyChild },
            { "first-of-type", RuleSelectorPartType.FirstOfType },
            { "last-of-type", RuleSelectorPartType.LastOfType },
            { "only-of-type", RuleSelectorPartType.OnlyOfType },
            { "before", RuleSelectorPartType.Before },
            { "after", RuleSelectorPartType.After },
            { "empty", RuleSelectorPartType.Empty },
            { "root", RuleSelectorPartType.Root },
            { "scope", RuleSelectorPartType.Scope },
            { "blank", RuleSelectorPartType.Blank },
            { "enabled", RuleSelectorPartType.Enabled },
            { "disabled", RuleSelectorPartType.Disabled },
            { "placeholder-shown", RuleSelectorPartType.PlaceholderShown },
            { "read-only", RuleSelectorPartType.ReadOnly },
            { "read-write", RuleSelectorPartType.ReadWrite },
            { "checked", RuleSelectorPartType.Checked },
            { "indeterminate", RuleSelectorPartType.Indeterminate },
            { "activatable", RuleSelectorPartType.Activatable },
            { "text", RuleSelectorPartType.Text },
            { "graphic", RuleSelectorPartType.Graphic },
        };

        public static List<RuleSelectorPart> ParseSelector(string selector, bool negated = false)
        {
            // Special selector for the root element, skip parsing in this case
            if (selector == "**") return null;

            var length = selector.Length;


            var paranCount = 0;
            var parenOpened = false;
            var type = RuleSelectorPartType.Tag;
            var acc = new StringBuilder();
            var paranContent = new StringBuilder();

            var list = new List<RuleSelectorPart>();

            void end(RuleSelectorPartType nextType)
            {
                var raw = acc.ToString();
                var nm = raw.Trim('"');
                // A parenthesis after no pseudo-class name -- a nested at-rule's condition, say -- is not a
                // selector. Left as an empty compound it would match everything, so it matches nothing.
                var invalid = parenOpened && type != RuleSelectorPartType.Special;
                var ignore = invalid || type == RuleSelectorPartType.None || string.IsNullOrWhiteSpace(nm)
                    || nm == "*" || nm == ">" || nm == "~" || nm == "+" || nm == "!";
                if (invalid) list.Add(new RuleSelectorPart() { Type = RuleSelectorPartType.None });
                else if (!ignore)
                {
                    if (type == RuleSelectorPartType.Special)
                    {
                        var paran = paranContent.ToString().Replace(InnerSpace, ' ');
                        if (nm == "has") list.Add(new RuleSelectorPart() { Type = RuleSelectorPartType.Has, Negated = negated, Parameter = HasParameter.Parse(paran) });
                        else if (nm == "not")
                        {
                            // :not(A, B) matches what is neither, so every branch lands negated in this compound.
                            foreach (var arg in SplitSelectorList(paran))
                            {
                                var parsed = ParseSelector(arg.Trim(), !negated);
                                if (parsed != null) list.AddRange(parsed);
                            }
                        }
                        else if (BasicPartTypes.TryGetValue(nm, out var partType)) list.Add(new RuleSelectorPart() { Type = partType, Negated = negated });
                        else if (NthPartTypes.TryGetValue(nm, out var nthType)) list.Add(new RuleSelectorPart()
                        {
                            Type = nthType,
                            Negated = negated,
                            Parameter = new NthChildParameter(paran),
                        });
                        else list.Add(new RuleSelectorPart() { Type = RuleSelectorPartType.State, Negated = negated, Parameter = nm });
                    }
                    else if (type == RuleSelectorPartType.Tag)
                    {
                        if (nm == "_after") list.Add(RuleSelectorPart.After);
                        else if (nm == "_before") list.Add(RuleSelectorPart.Before);
                        else list.Add(new RuleSelectorPart() { Name = nm, Type = type, Negated = negated });
                    }
                    else
                    {
                        object parameter = null;
                        if (type == RuleSelectorPartType.Attribute)
                        {
                            parameter = AttributeParameter.Parse(raw.Replace(InnerSpace, ' '), out nm);
                            if (nm.FastStartsWith("data-")) nm = nm.Substring(5);
                        }
                        list.Add(new RuleSelectorPart() { Name = nm, Type = type, Negated = negated, Parameter = parameter });
                    }
                }
                else if (acc.Length == 0 && type == RuleSelectorPartType.Special && nextType == RuleSelectorPartType.Special)
                {
                    acc.Append("_");
                    type = RuleSelectorPartType.Tag;
                    return;
                }
                else if (nm == "!")
                {
                    list.Add(RuleSelectorPart.Important);
                }

                acc.Clear();
                paranContent.Clear();
                parenOpened = false;
                type = nextType;
            }

            var prevIsEscape = false;
            var quote = '\0';
            for (int i = 0; i < length; i++)
            {
                var ch = selector[i];
                if (!prevIsEscape && ch == '\\')
                {
                    prevIsEscape = true;
                    continue;
                }

                if (prevIsEscape) acc.Append(ch);
                else if (type == RuleSelectorPartType.Attribute && paranCount == 0)
                {
                    // Everything up to the closing bracket is the attribute's own syntax, quotes included.
                    if (quote != '\0') { if (ch == quote) quote = '\0'; }
                    else if (ch == '"' || ch == '\'') quote = ch;
                    else if (ch == ']')
                    {
                        end(RuleSelectorPartType.Tag);
                        prevIsEscape = false;
                        continue;
                    }
                    acc.Append(ch);
                }
                else if (ch == '(')
                {
                    paranCount++;
                    parenOpened = true;
                    if (paranCount > 1) paranContent.Append(ch);
                }
                else if (ch == ')')
                {
                    paranCount--;
                    if (paranCount == 0) end(RuleSelectorPartType.None);
                    else paranContent.Append(ch);
                }
                else if (paranCount > 0) paranContent.Append(ch);
                else if (ch == '.') end(RuleSelectorPartType.ClassName);
                else if (ch == '#') end(RuleSelectorPartType.Id);
                else if (ch == '_' && i == 0)
                {
                    // Special case for pseudo-elements
                    end(RuleSelectorPartType.Tag);
                    acc.Append(ch);
                }
                else if (ch == '[') end(RuleSelectorPartType.Attribute);
                else if (ch == ']') end(RuleSelectorPartType.Tag);
                else if (ch == ':') end(RuleSelectorPartType.Special);
                else acc.Append(ch);

                prevIsEscape = false;
            }
            end(RuleSelectorPartType.None);

            list.Sort();
            return list;
        }

        /// <summary>What one selector part adds to a rule's specificity.</summary>
        public static int SpecificityOf(RuleSelectorPart part)
        {
            switch (part.Type)
            {
                case RuleSelectorPartType.Id:
                    return 1 << 12;

                case RuleSelectorPartType.Has:
                    return part.Parameter is HasParameter has ? has.Specificity : 0;

                case RuleSelectorPartType.Empty:
                case RuleSelectorPartType.Text:
                case RuleSelectorPartType.Activatable:
                case RuleSelectorPartType.Blank:
                case RuleSelectorPartType.Enabled:
                case RuleSelectorPartType.Disabled:
                case RuleSelectorPartType.PlaceholderShown:
                case RuleSelectorPartType.ReadOnly:
                case RuleSelectorPartType.ReadWrite:
                case RuleSelectorPartType.Checked:
                case RuleSelectorPartType.Indeterminate:
                case RuleSelectorPartType.Hover:
                case RuleSelectorPartType.Focus:
                case RuleSelectorPartType.FocusVisible:
                case RuleSelectorPartType.FocusWithin:
                case RuleSelectorPartType.Active:
                case RuleSelectorPartType.Enter:
                case RuleSelectorPartType.Leave:
                case RuleSelectorPartType.Attribute:
                case RuleSelectorPartType.ClassName:
                case RuleSelectorPartType.Root:
                case RuleSelectorPartType.Scope:
                case RuleSelectorPartType.FirstChild:
                case RuleSelectorPartType.LastChild:
                case RuleSelectorPartType.OnlyChild:
                case RuleSelectorPartType.FirstOfType:
                case RuleSelectorPartType.LastOfType:
                case RuleSelectorPartType.NthOfType:
                case RuleSelectorPartType.NthLastOfType:
                case RuleSelectorPartType.OnlyOfType:
                case RuleSelectorPartType.State:
                    return 1 << 6;

                case RuleSelectorPartType.NthChild:
                case RuleSelectorPartType.NthLastChild:
                    // An `of S` clause weighs what its most specific branch weighs, on top of the pseudo-class.
                    return (1 << 6) + (part.Parameter is NthChildParameter nth ? nth.OfSpecificity : 0);

                // Pseudo-elements weigh as a type selector does.
                case RuleSelectorPartType.Before:
                case RuleSelectorPartType.After:
                case RuleSelectorPartType.Tag:
                    return 1;

                default:
                    return 0;
            }
        }

        public static StyleRecord ConvertStyleDeclarationToRecord(StyleDeclaration rule, bool important)
        {
            var dic = new StyleRecord();

            foreach (var item in rule.Where(x => important == x.IsImportant))
            {
                var md = CssProperties.GetKey(item.Name);
                md?.Modify(dic, item.Value);
            }
            return dic;
        }

        public static Dictionary<IStyleProperty, object> ConvertStyleDeclarationToRecord(IDictionary<string, object> dc)
        {
            var dic = new Dictionary<IStyleProperty, object>();

            foreach (var item in dc)
            {
                var md = CssProperties.GetKey(item.Key);
                md?.Modify(dic, item.Value);
            }
            return dic;
        }

        /// <summary>
        /// Splits a selector list on its top-level commas only, so a comma inside
        /// <c>:is(a, b)</c> or an attribute value is not mistaken for a separator.
        /// </summary>
        public static List<string> SplitSelectorList(string selectorText)
        {
            var parts = new List<string>();
            if (selectorText == null) return parts;

            var start = 0;
            var depth = 0;
            var quote = '\0';

            for (int i = 0; i < selectorText.Length; i++)
            {
                var ch = selectorText[i];

                if (ch == '\\') { i++; continue; }

                if (quote != '\0')
                {
                    if (ch == quote) quote = '\0';
                    continue;
                }

                if (ch == '"' || ch == '\'') quote = ch;
                else if (ch == '(' || ch == '[') depth++;
                else if (ch == ')' || ch == ']') { if (depth > 0) depth--; }
                else if (ch == ',' && depth == 0)
                {
                    parts.Add(selectorText.Substring(start, i - start));
                    start = i + 1;
                }
            }

            parts.Add(selectorText.Substring(start));
            return parts;
        }

        /// <summary>
        /// Rewrites <c>:is()</c> and <c>:where()</c> away by inlining the argument, which is the
        /// form every resolved nested selector arrives in. A list argument expands into one
        /// selector per branch, so <c>:is(.a, .b) text</c> becomes <c>.a text</c> and <c>.b text</c>.
        /// </summary>
        /// <remarks>
        /// Inlining is only equivalent where the pseudo-class begins its compound selector, or
        /// where its argument is a single compound. Anything else -- <c>.x:is(.a .b)</c>, or one
        /// nested inside another function such as <c>:not()</c>, where a list is an intersection
        /// rather than a union -- is left alone, and then matches nothing, as before.
        /// An <c>:is()</c> keeps the flattened selector's specificity rather than its "most
        /// specific argument"; a <c>:where()</c> argument is fenced off with marks instead, so
        /// that <see cref="StripZeroSpecificity"/> can take its specificity back off again.
        /// </remarks>
        public static List<string> ExpandMatchesAny(string selector)
        {
            var done = new List<string>();
            var pending = new List<string> { selector };

            while (pending.Count > 0)
            {
                var last = pending.Count - 1;
                var current = pending[last];
                pending.RemoveAt(last);

                if (!TryFindMatchesAny(current, out var open, out var close, out var nameLength, out var zeroSpecificity)
                    || done.Count + pending.Count >= MaxSelectorExpansion)
                {
                    done.Add(current);
                    continue;
                }

                var prefix = current.Substring(0, open);
                var suffix = current.Substring(close + 1);
                var args = SplitSelectorList(current.Substring(open + nameLength, close - open - nameLength));

                // Whether this occurrence begins its compound decides whether inlining an argument
                // that is more than one compound would change what the selector means. Marks an
                // outer :where() left are not part of the compound, so they do not count here.
                var significant = prefix.Length - 1;
                while (significant >= 0 && IsZeroSpecificityMark(prefix[significant])) significant--;

                var startsCompound = significant < 0 || " \t>+~".IndexOf(prefix[significant]) >= 0;
                var inlinable = true;

                for (int i = 0; i < args.Count && inlinable; i++)
                {
                    var arg = args[i].Trim();
                    inlinable = arg.Length > 0 && (startsCompound || arg.IndexOfAny(CompoundBreaks) < 0);
                }

                if (!inlinable)
                {
                    done.Add(current);
                    continue;
                }

                foreach (var arg in args)
                    pending.Add(zeroSpecificity
                        ? prefix + ZeroSpecificityOpen + arg.Trim() + ZeroSpecificityClose + suffix
                        : prefix + arg.Trim() + suffix);
            }

            return done;
        }

        /// <summary>
        /// Removes the marks <see cref="ExpandMatchesAny"/> left around an inlined <c>:where()</c>
        /// argument, and reports what the parts inside them add up to -- which is what has to come
        /// back off the rule, <c>:where()</c> contributing no specificity of its own.
        /// </summary>
        public static string StripZeroSpecificity(string selector, out int specificity)
        {
            specificity = 0;
            if (selector.IndexOf(ZeroSpecificityOpen) < 0) return selector;

            var result = new StringBuilder(selector.Length);
            var compound = new StringBuilder();
            var depth = 0;

            // The selector is normalized by now, so a single space separates every compound and
            // every combinator, and a mark that ended up on its own leaves an empty piece behind.
            foreach (var piece in selector.Split(' '))
            {
                var zeroed = depth > 0;
                compound.Clear();

                foreach (var ch in piece)
                {
                    if (ch == ZeroSpecificityOpen)
                    {
                        depth++;
                        zeroed = true;
                    }
                    else if (ch == ZeroSpecificityClose)
                    {
                        if (depth > 0) depth--;
                    }
                    else compound.Append(ch);
                }

                if (compound.Length == 0) continue;

                if (result.Length > 0) result.Append(' ');
                result.Append(compound);

                // A combinator is not a compound, and ParseSelector has nothing to make of one.
                if (!zeroed || (compound.Length == 1 && ">+~".IndexOf(compound[0]) >= 0)) continue;

                foreach (var part in ParseSelector(compound.ToString())) specificity += SpecificityOf(part);
            }

            return result.ToString();
        }

        private const string IsFunction = ":is(";
        private const string WhereFunction = ":where(";
        private const int MaxSelectorExpansion = 32;
        private static readonly char[] CompoundBreaks = { ' ', '\t', '>', '+', '~' };

        // The marks fencing off what an inlined :where() argument contributed. Control characters,
        // so that nothing a selector may legally contain collides with them, and inert to
        // NormalizeSelector and to the whitespace split that follows it.
        private const char ZeroSpecificityOpen = '\u0001';
        private const char ZeroSpecificityClose = '\u0002';

        private static bool IsZeroSpecificityMark(char ch) => ch == ZeroSpecificityOpen || ch == ZeroSpecificityClose;

        /// <summary>
        /// Locates the first <c>:is(</c> or <c>:where(</c> that is not itself inside a function,
        /// reporting how long its name is and whether it is the one that weighs nothing.
        /// </summary>
        private static bool TryFindMatchesAny(string selector, out int open, out int close, out int nameLength, out bool zeroSpecificity)
        {
            open = close = -1;
            nameLength = 0;
            zeroSpecificity = false;

            var depth = 0;
            var quote = '\0';

            for (int i = 0; i < selector.Length; i++)
            {
                var ch = selector[i];

                if (ch == '\\') { i++; continue; }

                if (quote != '\0')
                {
                    if (ch == quote) quote = '\0';
                    continue;
                }

                if (ch == '"' || ch == '\'') { quote = ch; continue; }

                if (ch == ':' && depth == 0)
                {
                    if (StartsFunction(selector, i, IsFunction)) nameLength = IsFunction.Length;
                    else if (StartsFunction(selector, i, WhereFunction))
                    {
                        nameLength = WhereFunction.Length;
                        zeroSpecificity = true;
                    }

                    if (nameLength > 0)
                    {
                        open = i;
                        close = MatchingParen(selector, i + nameLength - 1);
                        if (close > 0) return true;

                        open = -1;
                        nameLength = 0;
                        zeroSpecificity = false;
                        return false;
                    }
                }

                if (ch == '(' || ch == '[') depth++;
                else if (ch == ')' || ch == ']') { if (depth > 0) depth--; }
            }

            return false;
        }

        private static bool StartsFunction(string selector, int index, string name) =>
            index + name.Length <= selector.Length
            && string.Compare(selector, index, name, 0, name.Length, StringComparison.OrdinalIgnoreCase) == 0;

        private static int MatchingParen(string selector, int openIndex)
        {
            var depth = 0;
            var quote = '\0';

            for (int i = openIndex; i < selector.Length; i++)
            {
                var ch = selector[i];

                if (ch == '\\') { i++; continue; }

                if (quote != '\0')
                {
                    if (ch == quote) quote = '\0';
                    continue;
                }

                if (ch == '"' || ch == '\'') quote = ch;
                else if (ch == '(') depth++;
                else if (ch == ')' && --depth == 0) return i;
            }

            return -1;
        }

        /// <summary>
        /// Reads the CSS escape starting at the backslash at <paramref name="index"/>, and returns
        /// how many characters it spans. Both forms are handled: one backslashed character, and a
        /// hexadecimal code point with an optional whitespace terminator.
        /// </summary>
        private static int ReadEscape(string selector, int index, out string decoded)
        {
            decoded = "";
            if (index + 1 >= selector.Length) return 1;

            var digits = 0;
            var point = 0;

            while (digits < 6 && index + 1 + digits < selector.Length)
            {
                var value = HexValue(selector[index + 1 + digits]);
                if (value < 0) break;
                point = point * 16 + value;
                digits++;
            }

            if (digits == 0)
            {
                decoded = selector[index + 1].ToString();
                return 2;
            }

            var length = 1 + digits;
            // A single whitespace character may terminate the escape, and is not part of the name.
            if (index + length < selector.Length && char.IsWhiteSpace(selector[index + length])) length++;

            // Zero, out of range, or a surrogate is a replacement character, per CSS Syntax.
            decoded = point == 0 || point > 0x10FFFF || (point >= 0xD800 && point <= 0xDFFF)
                ? "\ufffd"
                : char.ConvertFromUtf32(point);

            return length;
        }

        private static int HexValue(char ch)
        {
            if (ch >= '0' && ch <= '9') return ch - '0';
            if (ch >= 'a' && ch <= 'f') return ch - 'a' + 10;
            if (ch >= 'A' && ch <= 'F') return ch - 'A' + 10;
            return -1;
        }

        public static string NormalizeSelector(string selector)
        {
            var spaced = new StringBuilder();
            var count = selector.Length;

            var prev = ' ';
            var inAttribute = false;
            var depth = 0;
            var quote = '\0';
            for (int i = 0; i < count; i++)
            {
                var ch = selector[i];

                if (ch == '\\')
                {
                    // Re-emitted one backslash per character, which is the form ParseSelector
                    // reads as a literal. The hexadecimal form is resolved here rather than
                    // there, because it is how a name that starts with a digit is written:
                    // `2xl:flex` as `\\32 xl\\:flex`.
                    i += ReadEscape(selector, i, out var decoded) - 1;

                    foreach (var c in decoded)
                    {
                        spaced.Append('\\');
                        spaced.Append(c);
                    }

                    prev = '\0';
                    continue;
                }
                else if (inAttribute || depth > 0)
                {
                    // Inside brackets a combinator character or a space belongs to the argument, which
                    // is read again on its own by whoever takes it.
                    if (quote != '\0') { if (ch == quote) quote = '\0'; }
                    else if (ch == '"' || ch == '\'') quote = ch;
                    else if (inAttribute) { if (ch == ']') inAttribute = false; }
                    else if (ch == '[') inAttribute = true;
                    else if (ch == '(') depth++;
                    else if (ch == ')') depth--;

                    spaced.Append(char.IsWhiteSpace(ch) ? InnerSpace : ch);
                    prev = ch;
                    continue;
                }
                else if (ch == '[' || ch == '(')
                {
                    if (ch == '[') inAttribute = true;
                    else depth++;
                    if (prev == ':') spaced.Append(prev);
                    spaced.Append(ch);
                    prev = ch;
                    continue;
                }
                else if (ch == '>' || ch == '+' || ch == '~')
                {
                    spaced.Append(' ');
                    spaced.Append(ch);
                    spaced.Append(' ');
                    prev = '\0';
                    continue;
                }
                else if (prev == ':' && ch == ':')
                {
                    spaced.Append(" ::");
                    prev = '\0';
                }
                else if (ch == ':')
                {
                    prev = ch;
                }
                else
                {
                    if (prev == ':') spaced.Append(prev);
                    spaced.Append(ch);
                    prev = ch;
                }
            }

            return SplitSelectorRegex.Replace(spaced.ToString().Trim(), " ");
        }

        /// <summary>The marks <see cref="ExpandMatchesAny"/> leaves around an inlined <c>:where()</c>, taken out.</summary>
        public static string StripZeroSpecificityMarks(string selector)
        {
            if (selector.IndexOf(ZeroSpecificityOpen) < 0) return selector;
            return selector.Replace(ZeroSpecificityOpen.ToString(), "").Replace(ZeroSpecificityClose.ToString(), "");
        }
    }
}
