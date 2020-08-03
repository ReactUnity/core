using ReactUnity.Components;
using ReactUnity.Styling;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ReactUnity.StyleEngine
{
    public class RuleTreeNode<T> : IComparable<RuleTreeNode<T>>
    {
        public RuleTreeNode<T> Parent;
        public string Selector;
        public List<RuleSelectorPart> ParsedSelector;
        public LinkedList<RuleTreeNode<T>> Children;

        public RuleRelationType RelationType = RuleRelationType.Parent;
        public T Data;

        public int Specifity { get; set; }

        public RuleTreeNode<T> AddChildCascading(string selector)
        {
            var directParent = selector[0] == '>';
            var directSibling = selector[0] == '+';
            var sibling = selector[0] == '~';
            var important = selector[0] == '!';
            var hasRelative = directParent || directSibling || sibling || important;
            var selfIndex = hasRelative ? 1 : 0;

            var selectorSplit = RuleHelpers.SplitSelectorRegex.Split(selector.Trim(), selfIndex + 2);
            var selectorSelf = selectorSplit.Length > selfIndex ? selectorSplit[selfIndex] : null;
            var selectorOther = selectorSplit.Length > selfIndex + 1 ? selectorSplit[selfIndex + 1] : null;
            var hasChild = !string.IsNullOrWhiteSpace(selectorOther);

            if (hasRelative)
            {
                RelationType = directParent ? RuleRelationType.DirectParent :
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
                return child.AddChildCascading(selectorOther);
            }
        }

        public bool Matches(UnityComponent component, UnityComponent scope)
        {
            if (!ThisMatches(component, scope)) return false;

            // We are at root, all rules matched
            if (Parent == null) return true;

            var relative = component;
            var runOnce = RelationType == RuleRelationType.DirectSibling || RelationType == RuleRelationType.DirectParent || RelationType == RuleRelationType.Self;

            while (relative != null)
            {
                if (RelationType == RuleRelationType.Parent || RelationType == RuleRelationType.DirectParent)
                    relative = relative.Parent;
                else if (RelationType == RuleRelationType.Sibling || RelationType == RuleRelationType.DirectSibling)
                {
                    var ind = relative.Parent.Children.IndexOf(relative);
                    if (ind == 0) return false;
                    relative = relative.Parent.Children[ind - 1];
                }

                if (Parent.Matches(relative, scope)) return true;
                if (runOnce) return false;
            }

            return false;
        }


        private bool ThisMatches(UnityComponent component, UnityComponent scope)
        {
            // We are at root, all rules matched
            if (ParsedSelector == null) return true;

            // We reached the end of component hierarchy and there are still rules to process
            // This means the matching is incomplete
            if (component == null) return false;

            return ParsedSelector.All(x => x.Negated ^ x.Matches(component, scope));
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

        Not = 20,
        FirstChild = 21,
        LastChild = 22,
        NthChild = 23,
        NthLastChild = 24,
        OnlyChild = 25,
        Empty = 26,
        Root = 27,
        Scope = 28,

        Hover = 100,
        Focus = 101,
        Active = 102,

        Before = 500,
        After = 501,

        Important = 1000,
        Special = 1001,
        State = 2000,
    }

    public class RuleSelectorPart: IComparable<RuleSelectorPart>
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

        public bool Matches(UnityComponent component, UnityComponent scope = null)
        {
            switch (Type)
            {
                case RuleSelectorPartType.None:
                    return false;
                case RuleSelectorPartType.All:
                    return true;
                case RuleSelectorPartType.Tag:
                    return Name == component.Tag;
                case RuleSelectorPartType.Id:
                    return Name == component.GameObject.name;
                case RuleSelectorPartType.ClassName:
                    return component.ClassList != null && component.ClassList.Contains(Name);
                case RuleSelectorPartType.Attribute:
                    throw new Exception("Attribute selectors are not supported.");
                case RuleSelectorPartType.DirectDescendant:
                case RuleSelectorPartType.AdjacentSibling:
                case RuleSelectorPartType.Sibling:
                case RuleSelectorPartType.Self:
                    return true;
                case RuleSelectorPartType.Not:
                    break;
                case RuleSelectorPartType.FirstChild:
                    return component.Parent.Children[0] == component;
                case RuleSelectorPartType.LastChild:
                    return component.Parent.Children[component.Parent.Children.Count - 1] == component;
                case RuleSelectorPartType.NthChild:
                    return ((NthChildParameter)Parameter).Matches(component.Parent.Children.IndexOf(component) + 1);
                case RuleSelectorPartType.NthLastChild:
                    return ((NthChildParameter)Parameter).Matches(component.Parent.Children.Count - component.Parent.Children.IndexOf(component));
                case RuleSelectorPartType.Empty:
                    var cmp = component as ContainerComponent;
                    return cmp == null || cmp.Children.Count == 0;
                case RuleSelectorPartType.OnlyChild:
                    return component.Parent.Children.Count == 1;
                case RuleSelectorPartType.Root:
                    return component is HostComponent;
                case RuleSelectorPartType.Scope:
                    return scope != null && component == scope;
                case RuleSelectorPartType.Before:
                case RuleSelectorPartType.After:
                    return false;
                case RuleSelectorPartType.Hover:
                case RuleSelectorPartType.Focus:
                case RuleSelectorPartType.Active:
                    return true;
                case RuleSelectorPartType.Important:
                case RuleSelectorPartType.Special:
                    return true;
                case RuleSelectorPartType.State:
                    return false;
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
