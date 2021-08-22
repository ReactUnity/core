using System;
using System.Collections.Generic;

namespace ReactUnity.StyleEngine
{
    public class RuleTreeNode<T> : IComparable<RuleTreeNode<T>>
    {
        public RuleTree<T> Tree;
        public RuleTreeNode<T> Parent;
        public string Selector;
        public List<RuleSelectorPart> ParsedSelector;
        public LinkedList<RuleTreeNode<T>> Children;

        public RuleRelationType RelationType = RuleRelationType.Parent;
        public T Data;

        public MediaQueryList MediaQuery { get; private set; }
        public IReactComponent Scope { get; private set; }
        public int Specifity { get; private set; }

        public RuleTreeNode<T> AddChildCascading(string selector, MediaQueryList mq, IReactComponent scope, int specifity)
        {
            var shadowParent = selector.StartsWith(":deep ") || selector.StartsWith(">>> ");
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

            if (!(string.IsNullOrWhiteSpace(selectorSelf) || selectorSelf == "**"))
            {
                Selector = selectorSelf;
                ParsedSelector = RuleHelpers.ParseSelector(selectorSelf);
            }

            if (!hasChild)
            {
                return this;
            }
            else
            {
                if (Children == null) Children = new LinkedList<RuleTreeNode<T>>();

                var child = new RuleTreeNode<T>();
                Children.AddLast(child);
                child.Parent = this;
                child.MediaQuery = mq;
                child.Scope = scope;
                child.Specifity = specifity;
                return child.AddChildCascading(selectorOther, mq, scope, specifity);
            }
        }

        public bool Matches(IReactComponent component)
        {
            return Matches(component, Scope);
        }

        public bool Matches(IReactComponent component, IReactComponent scope)
        {
            if (!ThisMatches(component, scope)) return false;

            // We are at root, all rules matched
            if (Parent == null) return true;

            if (MediaQuery != null && !MediaQuery.matches) return false;

            var relative = component;
            var runOnce = RelationType == RuleRelationType.DirectSibling || RelationType == RuleRelationType.DirectParent || RelationType == RuleRelationType.Self;

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

                if (Parent.Matches(relative, scope)) return true;
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
        FirstChild = 21,
        LastChild = 22,
        NthChild = 23,
        NthLastChild = 24,
        OnlyChild = 25,
        Empty = 26,
        Root = 27,
        Scope = 28,
        Activatable = 29,

        Blank = 30,
        Enabled = 31,
        Disabled = 32,
        PlaceholderShown = 33,
        ReadOnly = 34,
        ReadWrite = 35,
        Checked = 36,
        Indeterminate = 37,


        Hover = 100,
        Focus = 101,
        FocusVisible = 102,
        FocusWithin = 103,
        Active = 104,

        Before = 500,
        After = 501,

        Important = 1000,
        Special = 1001,
        State = 2000,
    }

    public class RuleSelectorPart : IComparable<RuleSelectorPart>
    {
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
            if (component.IsPseudoElement) return Type == RuleSelectorPartType.Tag && Name == component.Tag;

            switch (Type)
            {
                case RuleSelectorPartType.None:
                    return false;
                case RuleSelectorPartType.All:
                    return true;
                case RuleSelectorPartType.Tag:
                    return Name == component.Tag;
                case RuleSelectorPartType.Id:
                    return Name == component.Id;
                case RuleSelectorPartType.ClassName:
                    return component.ClassList != null && component.ClassList.Contains(Name);
                case RuleSelectorPartType.Attribute:
                    return component.Data.TryGetValue(Name, out var val) && Equals(val, Parameter);
                case RuleSelectorPartType.DirectDescendant:
                case RuleSelectorPartType.AdjacentSibling:
                case RuleSelectorPartType.Sibling:
                case RuleSelectorPartType.Self:
                case RuleSelectorPartType.ShadowDescendant:
                    return true;
                case RuleSelectorPartType.Not:
                    break;
                case RuleSelectorPartType.FirstChild:
                    return component.Parent != null && component.Parent.Children[0] == component;
                case RuleSelectorPartType.LastChild:
                    return component.Parent != null && component.Parent.Children[component.Parent.Children.Count - 1] == component;
                case RuleSelectorPartType.NthChild:
                    return component.Parent != null && ((NthChildParameter) Parameter).Matches(component.Parent.Children.IndexOf(component) + 1);
                case RuleSelectorPartType.NthLastChild:
                    return component.Parent != null && ((NthChildParameter) Parameter).Matches(component.Parent.Children.Count - component.Parent.Children.IndexOf(component));
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
                case RuleSelectorPartType.OnlyChild:
                    return component.Parent != null && component.Parent.Children.Count == 1;
                case RuleSelectorPartType.Root:
                    return component is IHostComponent;
                case RuleSelectorPartType.Scope:
                    return scope != null && component == scope;
                case RuleSelectorPartType.Activatable:
                    return component is IActivatableComponent;
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
                    return component.StateStyles.GetState(Parameter as string);
                default:
                    break;
            }

            return false;
        }
    }

    public struct NthChildParameter
    {
        // An + B

        public int A;
        public int B;

        public NthChildParameter(string value)
        {
            if (value == "odd")
            {
                A = 2;
                B = 1;
            }
            else if (value == "even")
            {
                A = 2;
                B = 0;
            }
            else
            {
                var splits = value.Replace(" ", "").Split(new char[] { '+' }, StringSplitOptions.RemoveEmptyEntries);

                A = 0;
                B = 0;
                foreach (var split in splits)
                {
                    if (split.Contains("n")) int.TryParse(split.Replace("n", ""), out A);
                    else int.TryParse(split, out B);
                }
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
