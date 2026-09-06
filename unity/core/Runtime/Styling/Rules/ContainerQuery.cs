using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using Yoga;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;

namespace ReactUnity.Styling.Rules
{
    /// <summary>
    /// The prelude of a <c>@container</c> rule: an optional container name and a condition on the
    /// size or the style of the nearest ancestor eligible to answer it. A rule nested in another
    /// <c>@container</c> chains to it through <see cref="Parent"/>, and every link has to hold.
    /// </summary>
    public class ContainerQuery
    {
        public string Name { get; }
        public ContainerQuery Parent { get; }

        private readonly Condition Root;
        private readonly bool NeedsInline;
        private readonly bool NeedsBlock;
        private readonly bool QueriesStyle;

        private ContainerQuery(string name, ContainerQuery parent, Condition root)
        {
            Name = name;
            Parent = parent;
            Root = root;

            var inline = false;
            var block = false;
            var style = false;
            root.Collect(ref inline, ref block, ref style);
            NeedsInline = inline;
            NeedsBlock = block;
            QueriesStyle = style;
        }

        /// <summary>Parses a prelude. One that is not valid produces a query that never holds.</summary>
        public static ContainerQuery Parse(string prelude, ContainerQuery parent = null)
        {
            var text = (prelude ?? "").Trim();
            string name = null;

            // A leading identifier that does not start the condition itself is the container name.
            var word = ReadIdent(text, 0);
            if (word.Length > 0 && !word.Equals("not", StringComparison.OrdinalIgnoreCase)
                && (word.Length == text.Length || text[word.Length] != '('))
            {
                name = word;
                text = text.Substring(word.Length).Trim();
            }

            var cursor = 0;
            Condition root;
            if (text.Length == 0 || !TryParseCondition(text, ref cursor, out root)) root = Constant.Never;
            else
            {
                SkipWhitespace(text, ref cursor);
                if (cursor != text.Length) root = Constant.Never;
            }

            return new ContainerQuery(name, parent, root);
        }

        /// <summary>
        /// Whether the query holds for <paramref name="element"/>. <paramref name="includeSelf"/> is for
        /// a pseudo-element's rules, whose originating element may be the container they read.
        /// </summary>
        public bool Matches(IReactComponent element, bool includeSelf = false)
        {
            if (Parent != null && !Parent.Matches(element, includeSelf)) return false;

            var container = FindContainer(element, includeSelf);
            if (container == null) return false;

            var subject = new Subject { Style = container.ComputedStyle };

            if (NeedsInline || NeedsBlock)
            {
                TrackSize(container);
                GetContentSize(container, out subject.Width, out subject.Height);
            }

            if (QueriesStyle)
            {
                var state = State(container);
                if (state != null) state.HasStyleDependents = true;
            }

            return Root.Matches(ref subject);
        }

        // The nearest ancestor with the name, if there is one, that can answer for every axis the
        // condition reads. An inline-size container is passed over by a query on its height.
        private IReactComponent FindContainer(IReactComponent element, bool includeSelf)
        {
            for (var candidate = includeSelf ? element : element.Parent; candidate != null; candidate = candidate.Parent)
            {
                var style = candidate.ComputedStyle;
                if (style == null) continue;
                if (Name != null && !HasName(style.containerName, Name)) continue;

                if (NeedsInline || NeedsBlock)
                {
                    var type = style.containerType;
                    if (type == ContainerType.Normal || (NeedsBlock && type != ContainerType.Size)) continue;
                }

                return candidate;
            }

            return null;
        }

        /// <summary>
        /// The nearest ancestor that is a size container for the axis, or null. This is what a
        /// container unit measures, and the ancestor is tracked so a change to it resolves the unit again.
        /// </summary>
        public static IReactComponent FindSizeContainer(IReactComponent element, bool block)
        {
            for (var candidate = element?.Parent; candidate != null; candidate = candidate.Parent)
            {
                var type = candidate.ComputedStyle?.containerType ?? ContainerType.Normal;
                if (type == ContainerType.Size || (!block && type == ContainerType.InlineSize))
                {
                    TrackSize(candidate);
                    return candidate;
                }
            }

            return null;
        }

        /// <summary>Whether a space-separated <c>container-name</c> value includes the name.</summary>
        public static bool HasName(string names, string name)
        {
            if (names == null) return false;

            var index = 0;
            while (index < names.Length)
            {
                var end = names.IndexOf(' ', index);
                if (end < 0) end = names.Length;
                if (end - index == name.Length && string.CompareOrdinal(names, index, name, 0, name.Length) == 0) return true;
                index = end + 1;
            }

            return false;
        }

        /// <summary>The content box, which is what a container query and a container unit measure.</summary>
        public static void GetContentSize(IReactComponent component, out float width, out float height)
        {
            var layout = component.Layout;

            if (layout != null)
            {
                width = layout.LayoutWidth
                    - layout.LayoutGetPadding(YogaEdge.Left) - layout.LayoutGetPadding(YogaEdge.Right)
                    - layout.LayoutGetBorder(YogaEdge.Left) - layout.LayoutGetBorder(YogaEdge.Right);
                height = layout.LayoutHeight
                    - layout.LayoutGetPadding(YogaEdge.Top) - layout.LayoutGetPadding(YogaEdge.Bottom)
                    - layout.LayoutGetBorder(YogaEdge.Top) - layout.LayoutGetBorder(YogaEdge.Bottom);
            }
            else
            {
                width = component.ClientWidth;
                height = component.ClientHeight;
            }

            // Not laid out yet. An empty box compares the way one would expect; NaN equals nothing, itself included.
            if (float.IsNaN(width)) width = 0;
            if (float.IsNaN(height)) height = 0;
        }

        private static void TrackSize(IReactComponent container)
        {
            var state = State(container);
            if (state == null || state.TracksSize) return;

            state.TracksSize = true;
            GetContentSize(container, out state.Width, out state.Height);
            container.Context.Style.SizeContainers.Add(container);
        }

        private static QueryContainerState State(IReactComponent component)
        {
            var states = component.StateStyles;
            if (states == null) return null;
            return states.QueryContainer ?? (states.QueryContainer = new QueryContainerState());
        }

        #region Condition tree

        private struct Subject
        {
            public NodeStyle Style;
            public float Width;
            public float Height;
        }

        private enum Feature
        {
            Width,
            Height,
            AspectRatio,
            Orientation,
        }

        private abstract class Condition
        {
            public abstract bool Matches(ref Subject subject);
            public virtual void Collect(ref bool inline, ref bool block, ref bool style) { }
        }

        private sealed class Constant : Condition
        {
            public static readonly Constant Never = new Constant(false);
            public static readonly Constant Always = new Constant(true);

            private readonly bool Value;
            private Constant(bool value) { Value = value; }
            public override bool Matches(ref Subject subject) => Value;
        }

        private sealed class Not : Condition
        {
            private readonly Condition Inner;
            public Not(Condition inner) { Inner = inner; }
            public override bool Matches(ref Subject subject) => !Inner.Matches(ref subject);
            public override void Collect(ref bool inline, ref bool block, ref bool style) => Inner.Collect(ref inline, ref block, ref style);
        }

        private sealed class Junction : Condition
        {
            private readonly List<Condition> Terms;
            private readonly bool And;

            public Junction(List<Condition> terms, bool and)
            {
                Terms = terms;
                And = and;
            }

            public override bool Matches(ref Subject subject)
            {
                for (int i = 0; i < Terms.Count; i++)
                {
                    var holds = Terms[i].Matches(ref subject);
                    if (And && !holds) return false;
                    if (!And && holds) return true;
                }
                return And;
            }

            public override void Collect(ref bool inline, ref bool block, ref bool style)
            {
                for (int i = 0; i < Terms.Count; i++) Terms[i].Collect(ref inline, ref block, ref style);
            }
        }

        // A closed or half-open interval on a size feature. A bound is a float for a ratio, or a
        // length still to be resolved against the container -- `20em` is its font size, not the element's.
        private sealed class SizeRange : Condition
        {
            private readonly Feature Feature;
            private readonly object Min;
            private readonly bool MinInclusive;
            private readonly object Max;
            private readonly bool MaxInclusive;

            public SizeRange(Feature feature, object min, bool minInclusive, object max, bool maxInclusive)
            {
                Feature = feature;
                Min = min;
                MinInclusive = minInclusive;
                Max = max;
                MaxInclusive = maxInclusive;
            }

            public override bool Matches(ref Subject subject)
            {
                var value = Measure(Feature, ref subject);

                if (Min != null)
                {
                    var min = Resolve(Min, ref subject);
                    if (float.IsNaN(min) || (MinInclusive ? value < min : value <= min)) return false;
                }

                if (Max != null)
                {
                    var max = Resolve(Max, ref subject);
                    if (float.IsNaN(max) || (MaxInclusive ? value > max : value >= max)) return false;
                }

                return true;
            }

            public override void Collect(ref bool inline, ref bool block, ref bool style) => CollectAxes(Feature, ref inline, ref block);
        }

        private sealed class OrientationIs : Condition
        {
            private readonly bool Portrait;
            public OrientationIs(bool portrait) { Portrait = portrait; }
            public override bool Matches(ref Subject subject) => (subject.Height >= subject.Width) == Portrait;
            public override void Collect(ref bool inline, ref bool block, ref bool style) => CollectAxes(Feature.Orientation, ref inline, ref block);
        }

        // style(): a custom property compares as declared text, with whitespace collapsed; any other
        // property compares its computed value with the argument converted the way the property would.
        private sealed class StyleIs : Condition
        {
            private readonly IStyleProperty Property;
            private readonly string Expected;

            public StyleIs(IStyleProperty property, string expected)
            {
                Property = property;
                Expected = expected;
            }

            public override bool Matches(ref Subject subject)
            {
                var style = subject.Style;
                if (style == null) return false;

                if (Property is VariableProperty)
                {
                    var actual = Normalize(VariableText(Property, style));
                    return Expected == null ? actual != null : actual == Expected;
                }

                var value = style.GetStyleValue<object>(Property);
                if (Expected == null) return value != null && !value.Equals(Property.defaultValue);

                var expected = Property.Convert(Expected);
                var resolved = expected is IComputedValue cv ? cv.ResolveValue(Property, style, Property) : expected;
                return resolved != null && resolved.Equals(value);
            }

            public override void Collect(ref bool inline, ref bool block, ref bool style) => style = true;
        }

        private static void CollectAxes(Feature feature, ref bool inline, ref bool block)
        {
            if (feature != Feature.Height) inline = true;
            if (feature != Feature.Width) block = true;
        }

        private static float Measure(Feature feature, ref Subject subject)
        {
            switch (feature)
            {
                case Feature.Width: return subject.Width;
                case Feature.Height: return subject.Height;
                case Feature.AspectRatio: return subject.Height > 0 ? subject.Width / subject.Height : 0;
                default: return float.NaN;
            }
        }

        private static float Resolve(object bound, ref Subject subject)
        {
            if (bound is float f) return f;
            if (!(bound is IComputedValue computed)) return float.NaN;

            var resolved = computed.ResolveValue(LayoutProperties.Width, subject.Style, AllConverters.LengthConverter);
            return resolved is float r ? r : float.NaN;
        }

        private static string VariableText(IStyleProperty property, NodeStyle style)
        {
            var value = style.GetRawStyleValue(property);
            if (value is IComputedValue computed) value = computed.ResolveValue(property, style, AllConverters.RawConverter);
            var text = value as string;

            // A value that is itself a var() reference stands for what that resolves to.
            if (text != null && text.IndexOf("var(", StringComparison.OrdinalIgnoreCase) >= 0 && ParserHelpers.TryParseVariables(text, out var reference))
                text = reference.ResolveValue(property, style, AllConverters.RawConverter) as string;

            return text;
        }

        private static string Normalize(string text)
        {
            if (text == null) return null;

            var sb = new StringBuilder(text.Length);
            var pendingSpace = false;

            foreach (var c in text.Trim())
            {
                if (char.IsWhiteSpace(c))
                {
                    pendingSpace = true;
                    continue;
                }
                if (pendingSpace) sb.Append(' ');
                pendingSpace = false;
                sb.Append(c);
            }

            return sb.ToString();
        }

        #endregion

        #region Condition parser

        // Condition := Unary (('and' | 'or') Unary)*
        private static bool TryParseCondition(string s, ref int i, out Condition result)
        {
            result = null;
            if (!TryParseUnary(s, ref i, out var first)) return false;

            List<Condition> terms = null;
            var and = false;

            while (true)
            {
                var mark = i;
                SkipWhitespace(s, ref i);

                var word = ReadIdent(s, i);
                var isAnd = word.Equals("and", StringComparison.OrdinalIgnoreCase);

                if (!isAnd && !word.Equals("or", StringComparison.OrdinalIgnoreCase))
                {
                    i = mark;
                    break;
                }

                i += word.Length;
                if (!TryParseUnary(s, ref i, out var operand)) return false;

                if (terms == null)
                {
                    terms = new List<Condition> { first };
                    and = isAnd;
                }
                // Mixing and/or at one level is invalid CSS.
                else if (and != isAnd) return false;

                terms.Add(operand);
            }

            result = terms == null ? first : new Junction(terms, and);
            return true;
        }

        // Unary := 'not' Unary | Primary
        private static bool TryParseUnary(string s, ref int i, out Condition result)
        {
            SkipWhitespace(s, ref i);

            var word = ReadIdent(s, i);
            if (word.Equals("not", StringComparison.OrdinalIgnoreCase))
            {
                i += word.Length;
                if (!TryParseUnary(s, ref i, out var inner))
                {
                    result = null;
                    return false;
                }
                result = new Not(inner);
                return true;
            }

            return TryParsePrimary(s, ref i, out result);
        }

        // Primary := '(' Inner ')' | <ident> '(' ... ')'
        private static bool TryParsePrimary(string s, ref int i, out Condition result)
        {
            result = null;

            SkipWhitespace(s, ref i);
            if (i >= s.Length) return false;

            if (s[i] == '(')
            {
                if (!TryReadBalanced(s, ref i, out var inner)) return false;
                return TryParseInner(inner, out result);
            }

            var name = ReadIdent(s, i);
            if (name.Length == 0) return false;

            i += name.Length;
            if (i >= s.Length || s[i] != '(') return false;
            if (!TryReadBalanced(s, ref i, out var argument)) return false;

            // style() is the one functional query here; another, scroll-state() say, parses but never holds.
            result = name.Equals("style", StringComparison.OrdinalIgnoreCase) ? ParseStyle(argument) : Constant.Never;
            return true;
        }

        // Inside parentheses: a nested condition, or a single size feature.
        private static bool TryParseInner(string inner, out Condition result)
        {
            result = null;
            inner = inner.Trim();
            if (inner.Length == 0) return false;

            var word = ReadIdent(inner, 0);
            var nested = inner[0] == '('
                || word.Equals("not", StringComparison.OrdinalIgnoreCase)
                || (word.Length > 0 && word.Length < inner.Length && inner[word.Length] == '(');

            if (nested)
            {
                var cursor = 0;
                if (!TryParseCondition(inner, ref cursor, out result)) return false;
                SkipWhitespace(inner, ref cursor);
                return cursor == inner.Length;
            }

            result = ParseSizeFeature(inner);
            return true;
        }

        private static Condition ParseSizeFeature(string text)
        {
            // Plain syntax: `min-width: 400px`, `orientation: portrait`, `aspect-ratio: 16/9`.
            var colon = text.IndexOf(':');
            if (colon >= 0)
            {
                var name = text.Substring(0, colon).Trim().ToLowerInvariant();
                var value = text.Substring(colon + 1).Trim();

                var isMin = name.StartsWith("min-", StringComparison.Ordinal);
                var isMax = name.StartsWith("max-", StringComparison.Ordinal);
                if (isMin || isMax) name = name.Substring(4);

                if (!TryFeature(name, out var feature)) return Constant.Never;
                if (feature == Feature.Orientation) return isMin || isMax ? Constant.Never : ParseOrientation(value);

                var bound = ParseBound(feature, value);
                if (bound == null) return Constant.Never;
                return new SizeRange(feature, isMax ? null : bound, true, isMin ? null : bound, true);
            }

            var operands = SplitOnComparisons(text, out var operators);

            // Boolean context: the feature has a value other than zero. Orientation always has one.
            if (operators.Count == 0)
            {
                if (!TryFeature(operands[0].Trim().ToLowerInvariant(), out var feature)) return Constant.Never;
                if (feature == Feature.Orientation) return Constant.Always;
                return new SizeRange(feature, 0f, false, null, true);
            }

            if (operators.Count == 1)
            {
                var left = operands[0].Trim();
                var right = operands[1].Trim();
                if (TryFeature(left.ToLowerInvariant(), out var feature)) return RangeFrom(feature, operators[0], right, true);
                if (TryFeature(right.ToLowerInvariant(), out feature)) return RangeFrom(feature, operators[0], left, false);
                return Constant.Never;
            }

            // `400px <= width < 800px`: both operators have to point the same way.
            if (operators.Count == 2)
            {
                if (!TryFeature(operands[1].Trim().ToLowerInvariant(), out var feature) || feature == Feature.Orientation) return Constant.Never;

                var first = operators[0];
                var second = operators[1];
                if (first == "=" || second == "=" || first[0] != second[0]) return Constant.Never;

                var low = ParseBound(feature, operands[0].Trim());
                var high = ParseBound(feature, operands[2].Trim());
                if (low == null || high == null) return Constant.Never;

                var firstInclusive = first.Length == 2;
                var secondInclusive = second.Length == 2;

                return first[0] == '<'
                    ? new SizeRange(feature, low, firstInclusive, high, secondInclusive)
                    : new SizeRange(feature, high, secondInclusive, low, firstInclusive);
            }

            return Constant.Never;
        }

        private static Condition RangeFrom(Feature feature, string op, string valueText, bool featureOnLeft)
        {
            if (feature == Feature.Orientation) return Constant.Never;

            var bound = ParseBound(feature, valueText);
            if (bound == null) return Constant.Never;

            if (op == "=") return new SizeRange(feature, bound, true, bound, true);

            var inclusive = op.Length == 2;
            var greater = (op[0] == '>') == featureOnLeft;

            return greater
                ? new SizeRange(feature, bound, inclusive, null, true)
                : new SizeRange(feature, null, true, bound, inclusive);
        }

        private static Condition ParseOrientation(string value)
        {
            if (value.Equals("portrait", StringComparison.OrdinalIgnoreCase)) return new OrientationIs(true);
            if (value.Equals("landscape", StringComparison.OrdinalIgnoreCase)) return new OrientationIs(false);
            return Constant.Never;
        }

        private static Condition ParseStyle(string declaration)
        {
            declaration = declaration.Trim();

            var colon = IndexOfTopLevel(declaration, ':');
            var name = (colon < 0 ? declaration : declaration.Substring(0, colon)).Trim();
            var value = colon < 0 ? null : declaration.Substring(colon + 1).Trim();

            if (name.Length == 0 || value != null && value.Length == 0) return Constant.Never;

            // A shorthand has no computed value of its own to compare with.
            if (!(CssProperties.GetKey(name) is IStyleProperty property)) return Constant.Never;

            return new StyleIs(property, value == null ? null : Normalize(value));
        }

        // A float for a ratio, a computed length otherwise, or null when the text is neither.
        private static object ParseBound(Feature feature, string text)
        {
            if (feature == Feature.AspectRatio) return TryParseRatio(text, out var ratio) ? (object) ratio : null;

            // A percentage has nothing to be a percentage of here.
            if (text.EndsWith("%", StringComparison.Ordinal)) return null;

            return AllConverters.LengthConverter.TryParse(text, out var length) ? length : null;
        }

        private static bool TryParseRatio(string text, out float ratio)
        {
            ratio = 0;
            var parts = text.Split('/');
            if (parts.Length > 2) return false;

            if (!float.TryParse(parts[0].Trim(), NumberStyles.Float, CultureInfo.InvariantCulture, out var numerator)) return false;
            var denominator = 1f;
            if (parts.Length == 2 && !float.TryParse(parts[1].Trim(), NumberStyles.Float, CultureInfo.InvariantCulture, out denominator)) return false;
            if (denominator <= 0) return false;

            ratio = numerator / denominator;
            return true;
        }

        private static bool TryFeature(string name, out Feature feature)
        {
            switch (name)
            {
                case "width":
                case "inline-size":
                    feature = Feature.Width;
                    return true;
                case "height":
                case "block-size":
                    feature = Feature.Height;
                    return true;
                case "aspect-ratio":
                    feature = Feature.AspectRatio;
                    return true;
                case "orientation":
                    feature = Feature.Orientation;
                    return true;
                default:
                    feature = default;
                    return false;
            }
        }

        // Splits `400px <= width < 800px` into its operands and the operators between them.
        private static List<string> SplitOnComparisons(string text, out List<string> operators)
        {
            var operands = new List<string>();
            operators = new List<string>();
            var start = 0;
            var depth = 0;

            for (int i = 0; i < text.Length; i++)
            {
                var c = text[i];
                if (c == '(') depth++;
                else if (c == ')') depth--;
                else if (depth == 0 && (c == '<' || c == '>' || c == '='))
                {
                    var length = c != '=' && i + 1 < text.Length && text[i + 1] == '=' ? 2 : 1;
                    operands.Add(text.Substring(start, i - start));
                    operators.Add(text.Substring(i, length));
                    i += length - 1;
                    start = i + 1;
                }
            }

            operands.Add(text.Substring(start));
            return operands;
        }

        private static int IndexOfTopLevel(string s, char c)
        {
            var depth = 0;
            for (int i = 0; i < s.Length; i++)
            {
                if (s[i] == '(') depth++;
                else if (s[i] == ')') depth--;
                else if (s[i] == c && depth == 0) return i;
            }
            return -1;
        }

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

        private static string ReadIdent(string s, int i)
        {
            var start = i;
            while (i < s.Length && IsIdentChar(s[i])) i++;
            return s.Substring(start, i - start);
        }

        private static bool IsIdentChar(char c) => char.IsLetterOrDigit(c) || c == '-' || c == '_';

        #endregion
    }

    /// <summary>
    /// What an element knows about being a query container: whether anything has measured it, and
    /// the content box those measurements saw, so that a change to it after layout restyles them.
    /// </summary>
    public class QueryContainerState
    {
        public bool TracksSize;
        public bool HasStyleDependents;
        public float Width;
        public float Height;
    }
}
