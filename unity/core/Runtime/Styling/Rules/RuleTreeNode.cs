using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using ReactUnity.Helpers;

namespace ReactUnity.Styling.Rules
{
    public class RuleTreeNode<T> : IComparable<RuleTreeNode<T>>
    {
        public RuleTreeNode<T> Parent;
        public string Selector;
        public List<RuleSelectorPart> ParsedSelector;
        public LinkedList<RuleTreeNode<T>> Children;

        public RuleRelationType RelationType = RuleRelationType.Parent;
        public RulePseudoType PseudoType = RulePseudoType.None;
        public T Data;

        public MediaQueryList MediaQuery { get; private set; }
        public IReactComponent Scope { get; private set; }

        /// <summary>The cascade layer this rule is in, or null when it is in none.</summary>
        public CascadeLayer Layer { get; private set; }

        /// <summary>The @container this rule is in, set on the leaf alone; the important leaf below it matches through it.</summary>
        public ContainerQuery ContainerQuery { get; internal set; }

        /// <summary>The @scope this rule is in, set on the leaf and on the important leaf below it.</summary>
        public RuleScope RuleScope { get; internal set; }

        // Whether the rightmost compound can be tested before the scoping root is known: nothing in it
        // reads :scope. Lets a scoped rule be ruled out cheaply before the walk up to its root.
        private bool ScopeIndependent = true;

        private int RawSpecifity { get; set; } = 0;
        public int Specifity { get; private set; }

        private int ImportanceOffset;
        private bool Important;
        private int SpecificityDiscount;

        static RuleTreeNode<T> CreateChildNode(RuleTreeNode<T> parent, MediaQueryList mq, IReactComponent scope, RulePseudoType pseudo)
        {
            if (parent.Children == null) parent.Children = new LinkedList<RuleTreeNode<T>>();

            var child = new RuleTreeNode<T>();
            child.Parent = parent;
            child.MediaQuery = mq;
            child.Scope = scope;
            child.PseudoType = pseudo;

            if (pseudo == RulePseudoType.Before)
            {
                child.RelationType = RuleRelationType.Pseudo;
                child.Selector = "::before";
                child.ParsedSelector = new List<RuleSelectorPart> { RuleSelectorPart.Before };
            }
            else if (pseudo == RulePseudoType.After)
            {
                child.RelationType = RuleRelationType.Pseudo;
                child.Selector = "::after";
                child.ParsedSelector = new List<RuleSelectorPart> { RuleSelectorPart.After };
            }

            parent.Children.AddLast(child);
            return child;
        }

        private void RecalculateSpecificity(int importanceOffset, bool important, CascadeLayer layer)
        {
            ImportanceOffset = importanceOffset;
            Important = important;
            Layer = layer;

            RawSpecifity = Parent == null ? 0 : Parent.RawSpecifity;

            if (important && RawSpecifity < RuleHelpers.ImportantSpecifity) RawSpecifity += RuleHelpers.ImportantSpecifity;

            if (ParsedSelector != null)
            {
                foreach (var selector in ParsedSelector)
                {
                    if (selector.Type == RuleSelectorPartType.Important)
                    {
                        if (RawSpecifity < RuleHelpers.ImportantSpecifity) RawSpecifity += RuleHelpers.ImportantSpecifity;
                        continue;
                    }

                    RawSpecifity += RuleHelpers.SpecificityOf(selector);
                }
            }

            RawSpecifity -= SpecificityDiscount;

            ApplyCascadeTerms();
        }

        /// <summary>
        /// The layer and importance-offset terms of the specificity. They are applied here rather
        /// than accumulated into RawSpecifity, because the important leaf hangs off the normal one
        /// and its layer rank is the reverse of its parent's.
        /// </summary>
        private void ApplyCascadeTerms()
        {
            var layerOrder = Layer == null ? CascadeLayers.Unlayered : Layer.Order;

            Specifity = RawSpecifity
                + RuleHelpers.LayerRank(layerOrder, Important) * RuleHelpers.LayerSpecifityStep
                + ImportanceOffset * (1 << 24);
        }

        /// <summary>
        /// Works the specificity out again for this node and everything under it, after the layer
        /// order moved. Only the layer term can have changed, so the selector is not read again.
        /// </summary>
        internal void RefreshLayerSpecificity()
        {
            ApplyCascadeTerms();

            if (Children == null) return;
            foreach (var child in Children) child.RefreshLayerSpecificity();
        }

        /// <summary>
        /// Takes a specificity contribution off for good, which is how the parts an inlined
        /// <c>:where()</c> argument left behind end up weighing nothing. It is kept rather than
        /// subtracted once, because adding a leaf under this node works its specificity out again
        /// -- and it lands on RawSpecifity, which is what the important leaf is built from.
        /// </summary>
        internal void DiscountSpecificity(int amount)
        {
            SpecificityDiscount += amount;
            RecalculateSpecificity(ImportanceOffset, Important, Layer);
        }

        public RuleTreeNode<T> AddChildCascading(string selector, MediaQueryList mq, IReactComponent scope, int importanceOffset = 0, CascadeLayer layer = null)
        {
            var shadowParent = selector.FastStartsWith(":deep ") || selector.FastStartsWith(">>> ");
            var directParent = selector[0] == '>';
            var directSibling = selector[0] == '+';
            var sibling = selector[0] == '~';
            var important = selector[0] == '!';
            var hasRelative = shadowParent || directParent || directSibling || sibling || important;
            var selfIndex = hasRelative ? 1 : 0;

            var selectorSplit = RuleHelpers.SplitSelectorRegex.Split(selector.Trim(), selfIndex + 2);
            var selectorSelf = selectorSplit.Length > selfIndex ? selectorSplit[selfIndex] : null;
            var selectorOther = selectorSplit.Length > selfIndex + 1 ? selectorSplit[selfIndex + 1] : null;
            var hasChild = !string.IsNullOrWhiteSpace(selectorOther);

            if (hasRelative)
            {
                RelationType = directParent ? RuleRelationType.DirectParent :
                    shadowParent ? RuleRelationType.ShadowParent :
                    directSibling ? RuleRelationType.DirectSibling :
                    sibling ? RuleRelationType.Sibling :
                    important ? RuleRelationType.Self :
                    RuleRelationType.Parent;
            }

            var pseudoType = RulePseudoType.None;

            if (!(string.IsNullOrWhiteSpace(selectorSelf) || selectorSelf == "**"))
            {
                Selector = selectorSelf;
                ParsedSelector = RuleHelpers.ParseSelector(selectorSelf);

                if (ParsedSelector != null)
                {
                    for (int i = 0; i < ParsedSelector.Count; i++)
                    {
                        var sel = ParsedSelector[i];
                        if (sel.Type == RuleSelectorPartType.After || sel.Type == RuleSelectorPartType.Before)
                        {
                            if (sel.Type == RuleSelectorPartType.After) pseudoType = RulePseudoType.After;
                            else if (sel.Type == RuleSelectorPartType.Before) pseudoType = RulePseudoType.Before;
                            break;
                        }
                    }

                    ScopeIndependent = !ParsedSelector.Exists(RuleHelpers.ReadsScope);
                }
            }
            RecalculateSpecificity(importanceOffset, important, layer);

            if (!hasChild)
            {
                if (pseudoType != RulePseudoType.None)
                {

                    if (ParsedSelector.Count > 1)
                    {
                        var pseudoChild = CreateChildNode(this, mq, scope, pseudoType);
                        pseudoChild.RecalculateSpecificity(importanceOffset, important, layer);
                        return pseudoChild;
                    }
                    else
                    {
                        PseudoType = pseudoType;
                        RelationType = RuleRelationType.Pseudo;
                        return this;
                    }
                }


                return this;
            }
            else
            {
                if (pseudoType != RulePseudoType.None) return null;
                var child = CreateChildNode(this, mq, scope, RulePseudoType.None);
                return child.AddChildCascading(selectorOther, mq, scope, importanceOffset, layer);
            }
        }

        public bool Matches(IReactComponent component) => Matches(component, Scope, out _);

        public bool Matches(IReactComponent component, IReactComponent scope) => Matches(component, scope, out _);

        /// <summary>
        /// Whether the rule matches the component. For a rule in a <c>@scope</c>, the component has to
        /// be in the scope first, and the root that takes it in is what <c>:scope</c> then means for
        /// the rest of the selector; <paramref name="proximity"/> is how far up that root is, or
        /// <see cref="RuleScope.NoProximity"/> for a rule in no scope.
        /// </summary>
        public bool Matches(IReactComponent component, IReactComponent scope, out int proximity)
        {
            proximity = RuleScope.NoProximity;

            if (RuleScope != null)
            {
                if (ScopeIndependent && !ThisMatches(component, scope)) return false;
                if (!RuleScope.Matches(component, scope, out var root, out proximity)) return false;
                scope = root;
            }

            return MatchesChain(component, scope);
        }

        // The selector proper, matched right to left up the tree.
        private bool MatchesChain(IReactComponent component, IReactComponent scope)
        {
            if (!ThisMatches(component, scope)) return false;

            // We are at root, all rules matched
            if (Parent == null) return true;

            if (MediaQuery != null && !MediaQuery.matches) return false;

            var relative = component;
            var runOnce = RelationType == RuleRelationType.DirectSibling || RelationType == RuleRelationType.DirectParent
                || RelationType == RuleRelationType.Self || RelationType == RuleRelationType.Pseudo;

            while (relative != null)
            {
                if (RelationType == RuleRelationType.Parent || RelationType == RuleRelationType.DirectParent)
                    relative = relative.Parent;
                else if (RelationType == RuleRelationType.Sibling || RelationType == RuleRelationType.DirectSibling)
                {
                    if (relative.Parent == null) return false;
                    var ind = relative.Parent.Children.IndexOf(relative);
                    if (ind == 0) return false;
                    relative = relative.Parent.Children[ind - 1];
                }
                else if (RelationType == RuleRelationType.ShadowParent)
                {
                    while (relative != null)
                    {
                        if (relative is IShadowComponent s)
                        {
                            relative = s.ShadowParent;
                            break;
                        }
                        relative = relative.Parent;
                    }
                }

                // A pseudo-element's rules are matched against the originating element, which may be their container.
                if (Parent.MatchesChain(relative, scope)) return ContainerQuery == null || ContainerQuery.Matches(component, PseudoType != RulePseudoType.None);
                if (runOnce) return false;
            }

            return false;
        }


        private bool ThisMatches(IReactComponent component, IReactComponent scope)
        {
            // We are at root, all rules matched
            if (ParsedSelector == null) return true;

            // We reached the end of component hierarchy and there are still rules to process
            // This means the matching is incomplete
            if (component == null) return false;

            for (int i = 0; i < ParsedSelector.Count; i++)
            {
                var selected = ParsedSelector[i];
                if (selected.Matches(component, scope) == selected.Negated) return false;
            }
            return true;
        }

        public int CompareTo(RuleTreeNode<T> other)
        {
            return other.Specifity.CompareTo(Specifity);
        }
    }

    public enum RuleRelationType
    {
        Self = 0,
        Parent = 1,
        DirectParent = 2,
        Sibling = 3,
        DirectSibling = 4,
        ShadowParent = 5,
        Pseudo = 6,
    }

    public enum RulePseudoType
    {
        None = 0,
        Before = 1,
        After = 2,
    }

    public enum RuleSelectorPartType
    {
        None = 0,
        All = 1,
        Tag = 2,
        Id = 3,
        ClassName = 4,
        Attribute = 5,

        DirectDescendant = 10,
        AdjacentSibling = 11,
        Sibling = 12,
        Self = 13,
        ShadowDescendant = 14,

        Not = 20,

        // Standard pseudo classes
        FirstChild = 21,
        LastChild = 22,
        NthChild = 23,
        NthLastChild = 24,
        OnlyChild = 25,
        Empty = 26,
        Root = 27,
        Scope = 28,
        FirstOfType = 40,
        LastOfType = 41,
        NthOfType = 42,
        NthLastOfType = 43,
        OnlyOfType = 44,

        // Input related pseudo classes
        Blank = 30,
        Enabled = 31,
        Disabled = 32,
        PlaceholderShown = 33,
        ReadOnly = 34,
        ReadWrite = 35,
        Checked = 36,
        Indeterminate = 37,

        // Standard states
        Hover = 100,
        Focus = 101,
        FocusVisible = 102,
        FocusWithin = 103,
        Active = 104,

        // Custom states
        Enter = 200,
        Leave = 201,

        // Custom pseudo classes
        Activatable = 300,
        Text = 301,
        Graphic = 302,

        // Pseudo-elements
        Before = 500,
        After = 501,

        // Special
        Important = 1000,
        Special = 1001,
        // Costs a walk of the subtree, so it goes after everything that can rule the element out cheaply.
        Has = 1900,
        State = 2000,
    }

    public class RuleSelectorPart : IComparable<RuleSelectorPart>
    {
        public static RuleSelectorPart Important = new RuleSelectorPart { Type = RuleSelectorPartType.Important };
        public static RuleSelectorPart Before = new RuleSelectorPart { Type = RuleSelectorPartType.Before };
        public static RuleSelectorPart After = new RuleSelectorPart { Type = RuleSelectorPartType.After };

        public bool Negated = false;
        public RuleSelectorPartType Type = RuleSelectorPartType.None;
        public string Name = null;
        public object Parameter = null;

        public int CompareTo(RuleSelectorPart other)
        {
            if (Negated && !other.Negated) return 1;
            if (!Negated && other.Negated) return -1;
            return Type.CompareTo(other.Type);
        }

        public bool Matches(IReactComponent component, IReactComponent scope = null)
        {
            switch (Type)
            {
                case RuleSelectorPartType.None:
                    return false;
                case RuleSelectorPartType.All:
                    return !component.IsPseudoElement;
                case RuleSelectorPartType.Tag:
                    return Name == component.Tag;
                case RuleSelectorPartType.Id:
                    return Name == component.Id;
                case RuleSelectorPartType.ClassName:
                    return component.ClassList != null && component.ClassList.Contains(Name);
                case RuleSelectorPartType.Attribute:
                    if (!component.Data.TryGetValue(Name, out var val)) return false;
                    return Parameter is AttributeParameter attribute ? attribute.Matches(val) : IsTruthy(val);
                case RuleSelectorPartType.DirectDescendant:
                case RuleSelectorPartType.AdjacentSibling:
                case RuleSelectorPartType.Sibling:
                case RuleSelectorPartType.Self:
                case RuleSelectorPartType.ShadowDescendant:
                    return true;
                case RuleSelectorPartType.Not:
                    break;
                case RuleSelectorPartType.FirstChild:
                case RuleSelectorPartType.FirstOfType:
                    return SiblingPosition(component, Type == RuleSelectorPartType.FirstOfType, out _) == 1;
                case RuleSelectorPartType.LastChild:
                case RuleSelectorPartType.LastOfType:
                {
                    var position = SiblingPosition(component, Type == RuleSelectorPartType.LastOfType, out var count);
                    return position > 0 && position == count;
                }
                case RuleSelectorPartType.OnlyChild:
                case RuleSelectorPartType.OnlyOfType:
                {
                    var position = SiblingPosition(component, Type == RuleSelectorPartType.OnlyOfType, out var count);
                    return position > 0 && count == 1;
                }
                case RuleSelectorPartType.NthChild:
                case RuleSelectorPartType.NthOfType:
                {
                    var nth = (NthChildParameter) Parameter;
                    var position = SiblingPosition(component, Type == RuleSelectorPartType.NthOfType, nth.Of, scope, out _);
                    return position > 0 && nth.Matches(position);
                }
                case RuleSelectorPartType.NthLastChild:
                case RuleSelectorPartType.NthLastOfType:
                {
                    var nth = (NthChildParameter) Parameter;
                    var position = SiblingPosition(component, Type == RuleSelectorPartType.NthLastOfType, nth.Of, scope, out var count);
                    return position > 0 && nth.Matches(count - position + 1);
                }
                case RuleSelectorPartType.Empty:
                    if (component is ITextComponent tc)
                        return string.IsNullOrEmpty(tc.Content);
                    else if (component is IContainerComponent cc)
                        return cc?.Children == null || cc.Children.Count == 0;
                    return true;
                case RuleSelectorPartType.Blank:
                    return component is IInputComponent ic && string.IsNullOrEmpty(ic.Value);
                case RuleSelectorPartType.PlaceholderShown:
                    return component is IInputComponent icp && icp.PlaceholderShown;
                case RuleSelectorPartType.Enabled:
                    return component is IActivatableComponent ace && !ace.Disabled;
                case RuleSelectorPartType.Disabled:
                    return component is IActivatableComponent acd && acd.Disabled;
                case RuleSelectorPartType.ReadOnly:
                    return component is IInputComponent icr && icr.ReadOnly;
                case RuleSelectorPartType.ReadWrite:
                    return component is IInputComponent icw && !icw.ReadOnly;
                case RuleSelectorPartType.Checked:
                    return component is IToggleComponent tgc && tgc.Checked;
                case RuleSelectorPartType.Indeterminate:
                    return component is IToggleComponent tgi && tgi.Indeterminate;
                case RuleSelectorPartType.Root:
                    return component is IHostComponent;
                case RuleSelectorPartType.Scope:
                    // With nothing to be scoped to, :scope is the root, as it is in a document's stylesheet.
                    return scope != null ? component == scope : component is IHostComponent;
                case RuleSelectorPartType.Activatable:
                    return component is IActivatableComponent;
                case RuleSelectorPartType.Text:
                    return component is ITextComponent;
                case RuleSelectorPartType.Graphic:
                    return component is IGraphicComponent;
                case RuleSelectorPartType.Before:
                case RuleSelectorPartType.After:
                    return true;
                case RuleSelectorPartType.Hover:
                case RuleSelectorPartType.Focus:
                case RuleSelectorPartType.FocusVisible:
                case RuleSelectorPartType.FocusWithin:
                case RuleSelectorPartType.Active:
                    return true;
                case RuleSelectorPartType.Important:
                case RuleSelectorPartType.Special:
                    return true;
                case RuleSelectorPartType.State:
                    return component.StateStyles.GetStateOrSubscribe(Parameter as string);
                case RuleSelectorPartType.Has:
                    // A change below or after this element can now change its style, so it is remembered as one to re-resolve then.
                    component.StateStyles.HasAnchor = true;
                    return ((HasParameter) Parameter).Matches(component, scope);
                default:
                    break;
            }

            return false;
        }

        /// <summary>
        /// One-based position among the parent's children, counting only real elements -- a
        /// <c>::before</c> is in the list but is nobody's sibling -- and, for the of-type family,
        /// only those sharing the tag. Zero when the component has no siblings to be counted among.
        /// </summary>
        private static int SiblingPosition(IReactComponent component, bool ofType, out int count) => SiblingPosition(component, ofType, null, null, out count);

        /// <summary>
        /// The same count, over the siblings that match the <c>of S</c> selector list when there is
        /// one. An element that does not match it itself has no position, and so never matches.
        /// </summary>
        private static int SiblingPosition(IReactComponent component, bool ofType, List<List<RuleSelectorPart>> of, IReactComponent scope, out int count)
        {
            count = 0;
            if (component.IsPseudoElement || component.Parent == null || component.Parent.Children == null) return 0;

            var position = 0;
            foreach (var sibling in component.Parent.Children)
            {
                if (sibling.IsPseudoElement) continue;
                if (ofType && sibling.Tag != component.Tag) continue;
                if (of != null && !MatchesAny(sibling, of, scope)) continue;
                count++;
                if (sibling == component) position = count;
            }
            return position;
        }

        /// <summary>Whether the element satisfies any of the compound selectors.</summary>
        internal static bool MatchesAny(IReactComponent component, List<List<RuleSelectorPart>> compounds, IReactComponent scope)
        {
            for (int i = 0; i < compounds.Count; i++)
            {
                var parts = compounds[i];
                var all = true;
                for (int j = 0; j < parts.Count && all; j++) all = parts[j].Matches(component, scope) != parts[j].Negated;
                if (all) return true;
            }
            return false;
        }

        private static bool IsTruthy(object obj)
        {
            if (obj == null || obj is DBNull)
                return false;

            var str = obj as string;
            if (str != null)
                return !string.IsNullOrWhiteSpace(str) &&
                    !str.Trim().Equals(bool.FalseString, StringComparison.InvariantCultureIgnoreCase);

            try
            {
                if (System.Convert.ToDecimal(obj) == 0)
                    return false;
            }
            catch { }

            return true;
        }
    }

    /// <summary>
    /// The value of an attribute selector and how to compare it. Absent when the selector only
    /// tests that the attribute is there.
    /// </summary>
    public class AttributeParameter
    {
        private static readonly Regex ValueRegex = new Regex(@"^(?:""([^""]*)""|'([^']*)'|([^\s""']*))(?:\s+([iIsS]))?$");

        public string Value;
        public char Operator;
        public bool IgnoreCase;

        /// <summary>Splits <c>name^="value" i</c> into its attribute name and the rest, or returns null for a bare <c>name</c>.</summary>
        public static AttributeParameter Parse(string text, out string name)
        {
            var eq = text.IndexOf('=');
            if (eq < 0)
            {
                name = text.Trim();
                return null;
            }

            var op = eq > 0 && "^$*~|".IndexOf(text[eq - 1]) >= 0 ? text[eq - 1] : '=';
            name = text.Substring(0, op == '=' ? eq : eq - 1).Trim();

            var rest = text.Substring(eq + 1).Trim();
            var match = ValueRegex.Match(rest);
            if (!match.Success) return new AttributeParameter { Value = rest.Trim('"', '\''), Operator = op };

            var value = match.Groups[1].Success ? match.Groups[1].Value : match.Groups[2].Success ? match.Groups[2].Value : match.Groups[3].Value;
            return new AttributeParameter
            {
                Value = value,
                Operator = op,
                IgnoreCase = match.Groups[4].Success && char.ToLowerInvariant(match.Groups[4].Value[0]) == 'i',
            };
        }

        public bool Matches(object attribute)
        {
            var actual = Stringify(attribute);
            if (actual == null) return false;

            var comparison = IgnoreCase ? StringComparison.OrdinalIgnoreCase : StringComparison.Ordinal;

            switch (Operator)
            {
                case '^': return Value.Length > 0 && actual.StartsWith(Value, comparison);
                case '$': return Value.Length > 0 && actual.EndsWith(Value, comparison);
                case '*': return Value.Length > 0 && actual.IndexOf(Value, comparison) >= 0;
                case '|': return string.Equals(actual, Value, comparison) || actual.StartsWith(Value + "-", comparison);
                case '~':
                    if (Value.Length == 0 || Value.IndexOfAny(new[] { ' ', '\t', '\n' }) >= 0) return false;
                    foreach (var word in actual.Split((char[]) null, StringSplitOptions.RemoveEmptyEntries))
                        if (string.Equals(word, Value, comparison)) return true;
                    return false;
                default: return string.Equals(actual, Value, comparison);
            }
        }

        // A data prop set from JS is whatever was passed, so a number or a bool is compared the
        // way CSS would see it serialized, not by object equality.
        private static string Stringify(object value)
        {
            if (value == null || value is DBNull) return null;
            if (value is bool b) return b ? "true" : "false";
            if (value is IFormattable f) return f.ToString(null, System.Globalization.CultureInfo.InvariantCulture);
            return value.ToString();
        }
    }

    /// <summary>
    /// The relative selectors of a <c>:has()</c>, compiled to be walked forwards from the element
    /// being matched: each step names a combinator and the compound the elements it reaches must
    /// satisfy. The walk stops at the first element that satisfies the last step.
    /// </summary>
    public class HasParameter
    {
        private struct Step
        {
            public char Combinator;
            public List<RuleSelectorPart> Parts;
        }

        private readonly List<Step[]> Branches = new List<Step[]>();

        /// <summary>That of the most specific branch, which is what <c>:has()</c> weighs.</summary>
        public int Specificity { get; private set; }

        /// <summary>
        /// Reads a relative selector list. A branch that cannot be read is dropped, and an argument
        /// with nothing left in it matches nothing, which is how an invalid <c>:has()</c> behaves.
        /// </summary>
        public static HasParameter Parse(string text)
        {
            var result = new HasParameter();

            foreach (var branch in RuleHelpers.SplitSelectorList(text))
            foreach (var expanded in RuleHelpers.ExpandMatchesAny(branch.Trim()))
            {
                var normalized = RuleHelpers.StripZeroSpecificityMarks(RuleHelpers.NormalizeSelector(expanded));
                if (normalized.Length == 0) continue;

                var steps = new List<Step>();
                var specificity = 0;
                var combinator = ' ';
                var valid = true;

                foreach (var token in normalized.Split(' '))
                {
                    if (token.Length == 1 && ">+~".IndexOf(token[0]) >= 0)
                    {
                        combinator = token[0];
                        continue;
                    }

                    var parts = RuleHelpers.ParseSelector(token);
                    if (parts == null)
                    {
                        valid = false;
                        break;
                    }

                    foreach (var part in parts) specificity += RuleHelpers.SpecificityOf(part);
                    steps.Add(new Step { Combinator = combinator, Parts = parts });
                    combinator = ' ';
                }

                if (!valid || steps.Count == 0) continue;
                result.Branches.Add(steps.ToArray());
                if (specificity > result.Specificity) result.Specificity = specificity;
            }

            return result;
        }

        public bool Matches(IReactComponent anchor, IReactComponent scope)
        {
            for (int i = 0; i < Branches.Count; i++)
                if (MatchStep(Branches[i], 0, anchor, scope)) return true;
            return false;
        }

        private static bool MatchStep(Step[] steps, int index, IReactComponent from, IReactComponent scope)
        {
            var combinator = steps[index].Combinator;
            if (combinator == '+' || combinator == '~') return MatchSiblings(steps, index, from, scope, combinator == '~');
            return MatchDescendants(steps, index, from, scope, combinator == ' ');
        }

        private static bool MatchDescendants(Step[] steps, int index, IReactComponent from, IReactComponent scope, bool deep)
        {
            if (!(from is IContainerComponent container) || container.Children == null) return false;

            var children = container.Children;
            for (int i = 0; i < children.Count; i++)
            {
                var child = children[i];
                if (child.IsPseudoElement) continue;
                if (Accepts(steps, index, child, scope)) return true;
                if (deep && MatchDescendants(steps, index, child, scope, true)) return true;
            }
            return false;
        }

        private static bool MatchSiblings(Step[] steps, int index, IReactComponent from, IReactComponent scope, bool all)
        {
            var siblings = from.Parent?.Children;
            if (siblings == null) return false;

            var start = siblings.IndexOf(from);
            if (start < 0) return false;

            for (int i = start + 1; i < siblings.Count; i++)
            {
                var sibling = siblings[i];
                if (sibling.IsPseudoElement) continue;
                if (Accepts(steps, index, sibling, scope)) return true;
                if (!all) return false;
            }
            return false;
        }

        // Whether the element satisfies this step's compound and, when steps remain, leads on to the rest.
        private static bool Accepts(Step[] steps, int index, IReactComponent candidate, IReactComponent scope)
        {
            var parts = steps[index].Parts;
            for (int i = 0; i < parts.Count; i++)
            {
                var part = parts[i];
                if (part.Matches(candidate, scope) == part.Negated) return false;
            }

            return index == steps.Length - 1 || MatchStep(steps, index + 1, candidate, scope);
        }
    }

    public struct NthChildParameter
    {
        // An + B [of S]

        private static readonly Regex OfRegex = new Regex(@"^\s*(.*?)\s+of\s+(.+)$", RegexOptions.IgnoreCase | RegexOptions.Singleline);

        public int A;
        public int B;

        /// <summary>
        /// The compound selectors of an <c>of S</c> clause, or null when there is none. Only the
        /// siblings matching one of them are counted. An empty list is a clause nothing satisfied.
        /// </summary>
        public List<List<RuleSelectorPart>> Of;

        /// <summary>That of the most specific <c>of S</c> branch, which is what the clause adds to the rule.</summary>
        public int OfSpecificity;

        public NthChildParameter(string value)
        {
            A = 0;
            B = 0;
            Of = null;
            OfSpecificity = 0;

            var of = OfRegex.Match(value);
            if (of.Success)
            {
                value = of.Groups[1].Value;
                ParseOf(of.Groups[2].Value);
            }

            value = value.Replace(" ", "");

            if (value.Equals("odd", StringComparison.OrdinalIgnoreCase))
            {
                A = 2;
                B = 1;
                return;
            }

            if (value.Equals("even", StringComparison.OrdinalIgnoreCase))
            {
                A = 2;
                B = 0;
                return;
            }

            var n = value.IndexOf('n');
            if (n < 0)
            {
                int.TryParse(value, out B);
                return;
            }

            // The coefficient may be implied (`n`, `-n`), and the offset carries its own sign (`2n-1`).
            var coefficient = value.Substring(0, n);
            if (coefficient == "" || coefficient == "+") A = 1;
            else if (coefficient == "-") A = -1;
            else int.TryParse(coefficient, out A);

            var offset = value.Substring(n + 1);
            if (offset.Length > 0) int.TryParse(offset, out B);
        }

        // A branch with a combinator in it is dropped: the clause takes a complex selector on the
        // web, but siblings are what is counted here, and a compound is what a sibling can be tested with.
        private void ParseOf(string selectorList)
        {
            Of = new List<List<RuleSelectorPart>>();

            foreach (var branch in RuleHelpers.SplitSelectorList(selectorList))
            foreach (var expanded in RuleHelpers.ExpandMatchesAny(branch.Trim()))
            {
                var normalized = RuleHelpers.StripZeroSpecificityMarks(RuleHelpers.NormalizeSelector(expanded));
                if (normalized.Length == 0 || normalized.IndexOf(' ') >= 0) continue;

                var parts = RuleHelpers.ParseSelector(normalized);
                if (parts == null) continue;

                var specificity = 0;
                foreach (var part in parts) specificity += RuleHelpers.SpecificityOf(part);
                if (specificity > OfSpecificity) OfSpecificity = specificity;

                Of.Add(parts);
            }
        }

        public bool Matches(int index)
        {
            var offset = index - B;
            if (A > 0) return offset >= 0 && offset % A == 0;
            else if (A < 0) return offset <= 0 && offset % A == 0;
            else return offset == 0;
        }
    }
}
