using ExCSS;
using ReactUnity.Components;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace ReactUnity.StyleEngine
{
    public class RuleTree : RuleTreeNode
    {
        static public Regex SplitSelectorRegex = new Regex("\\s+");

        public List<RuleTreeNode> LeafNodes = new List<RuleTreeNode>();
        public List<RuleTreeNode> LeafNodesForPseudos = new List<RuleTreeNode>();
        public StylesheetParser Parser { get; private set; }

        public RuleTree(StylesheetParser parser)
        {
            Parser = parser;
        }

        public List<RuleTreeNode> AddRule(StyleRule rule)
        {
            var splits = rule.SelectorText.Split(',');

            var added = new List<RuleTreeNode>();
            foreach (var split in splits)
            {
                var selector = NormalizeSelector(split);
                var sl = Parser.ParseSelector(selector);
                var specificity = RuleHelpers.GetSpecificity(sl.Specifity);

                var leaf = AddChildCascading("** " + selector);
                leaf.Specifity = specificity;

                if (leaf.Rules == null) leaf.Rules = new List<Dictionary<string, object>>();
                var dic = RuleHelpers.GetRuleDic(rule, false);
                leaf.Rules.Add(dic);

                added.Add(leaf);
                LeafNodes.InsertIntoSortedList(leaf);

                var pseudoSelector = leaf.ParsedSelector.Count > 0 && leaf.ParsedSelector.All(x => x.Type == RuleSelectorPartType.Tag);
                if (pseudoSelector) LeafNodesForPseudos.InsertIntoSortedList(leaf);

                var importantDic = RuleHelpers.GetRuleDic(rule, true);
                if (importantDic.Count > 0)
                {
                    var importantLeaf = leaf.AddChildCascading("** !");
                    importantLeaf.Specifity = specificity + (1 << 30);
                    if (importantLeaf.Rules == null) importantLeaf.Rules = new List<Dictionary<string, object>>();
                    importantLeaf.Rules.Add(importantDic);

                    added.Add(importantLeaf);
                    LeafNodes.InsertIntoSortedList(importantLeaf);
                    if (pseudoSelector) LeafNodesForPseudos.InsertIntoSortedList(importantLeaf);
                }

            }

            return added;
        }

        public IEnumerable<RuleTreeNode> GetMatchingRules(UnityComponent component, bool pseudoElement)
        {
            return (pseudoElement ? LeafNodesForPseudos : LeafNodes).Where(x => x.Matches(component));
        }

        private string NormalizeSelector(string selector)
        {
            return SplitSelectorRegex.Replace(selector.Replace(">", " > ").Replace("+", " + ").Replace("~", " ~ ").Trim(), " ");
        }
    }

    public class RuleTreeNode : IComparable<RuleTreeNode>
    {
        public RuleTreeNode Parent;
        public string Selector;
        public List<RuleSelectorPart> ParsedSelector;
        public LinkedList<RuleTreeNode> Children;

        public RuleRelationType RelationType = RuleRelationType.Parent;
        public List<Dictionary<string, object>> Rules;


        public int Specifity { get; set; }

        public RuleTreeNode AddChildCascading(string selector)
        {
            var directParent = selector[0] == '>';
            var directSibling = selector[0] == '+';
            var sibling = selector[0] == '~';
            var important = selector[0] == '!';
            var hasRelative = directParent || directSibling || sibling || important;
            var selfIndex = hasRelative ? 1 : 0;

            var selectorSplit = RuleTree.SplitSelectorRegex.Split(selector.Trim(), selfIndex + 2);
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
                if (Children == null) Children = new LinkedList<RuleTreeNode>();

                var child = new RuleTreeNode();
                Children.AddLast(child);
                child.Parent = this;
                return child.AddChildCascading(selectorOther);
            }
        }

        public bool Matches(UnityComponent component)
        {
            if (!ThisMatches(component)) return false;

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

                if (Parent.Matches(relative)) return true;
                if (runOnce) return false;
            }

            return false;
        }


        private bool ThisMatches(UnityComponent component)
        {
            // We are at root, all rules matched
            if (ParsedSelector == null) return true;

            // We reached the end of component hierarchy and there are still rules to process
            // This means the matching is incomplete
            if (component == null) return false;

            return ParsedSelector.All(x => x.Negated ^ x.Matches(component));
        }

        public int CompareTo(RuleTreeNode other)
        {
            return other.Specifity.CompareTo(Specifity);
        }
    }

    public static class RuleHelpers
    {
        public static List<RuleSelectorPart> ParseSelector(string selector)
        {
            if (selector == "**") return null;
            var splits = selector.Split(new char[] { '.', ' ' });
            var tag = splits[0];

            var list = new List<RuleSelectorPart>();

            if (!(string.IsNullOrWhiteSpace(tag) || tag == "*" || tag == ">" || tag == "~" || tag == "+" || tag == "!"))
            {
                list.Add(new RuleSelectorPart() { Name = tag, Type = RuleSelectorPartType.Tag });
            }

            for (int i = 1; i < splits.Length; i++)
            {
                var split = splits[i];
                list.Add(new RuleSelectorPart() { Name = split, Type = RuleSelectorPartType.ClassName });
            }

            return list;
        }

        public static int GetSpecificity(Priority priority)
        {
            return (priority.Inlines << 24) + (priority.Ids << 16) + (priority.Classes * 8) + priority.Tags;
        }

        public static Dictionary<string, object> GetRuleDic(StyleRule rule, bool important)
        {
            return rule.Style.Where(x => !(important ^ x.IsImportant)).ToDictionary(x => x.Name, x => x.Value as object);
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

        Hover = 100,
        Focus = 101,
        Active = 102,

        Before = 500,
        After = 501,

        Important = 1000,
        Special = 1001,
    }

    public class RuleSelectorPart
    {
        public bool Negated = false;
        public RuleSelectorPartType Type = RuleSelectorPartType.None;
        public string Name = null;
        public string Parameter = null;

        public bool Matches(UnityComponent component)
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
                default:
                    break;
            }

            return false;
        }
    }

    public class RuleTreeNodeComparer : IComparer<RuleTreeNode>
    {
        public int Compare(RuleTreeNode x, RuleTreeNode y)
        {
            return x.Specifity.CompareTo(y.Specifity);
        }
    }

    /// <summary>
    /// Container for extension functions for the System.Collections.Generic.IList{T} and System.Collections.IList
    /// interfaces that inserts elements lists that are presumed to be already sorted such that sort ordering is preserved
    /// </summary>
    /// <author>Jackson Dunstan, http://JacksonDunstan.com/articles/3189</author>
    /// <license>MIT</license>
    public static class IListInsertIntoSortedListExtensions
    {
        /// <summary>
        /// Insert a value into an IList{T} that is presumed to be already sorted such that sort
        /// ordering is preserved
        /// </summary>
        /// <param name="list">List to insert into</param>
        /// <param name="value">Value to insert</param>
        /// <typeparam name="T">Type of element to insert and type of elements in the list</typeparam>
        public static void InsertIntoSortedList<T>(this IList<T> list, T value)
            where T : IComparable<T>
        {
            InsertIntoSortedList(list, value, (a, b) => a.CompareTo(b));
        }

        /// <summary>
        /// Insert a value into an IList{T} that is presumed to be already sorted such that sort
        /// ordering is preserved
        /// </summary>
        /// <param name="list">List to insert into</param>
        /// <param name="value">Value to insert</param>
        /// <param name="comparison">Comparison to determine sort order with</param>
        /// <typeparam name="T">Type of element to insert and type of elements in the list</typeparam>
        public static void InsertIntoSortedList<T>(
            this IList<T> list,
            T value,
            Comparison<T> comparison
        )
        {
            var startIndex = 0;
            var endIndex = list.Count;
            while (endIndex > startIndex)
            {
                var windowSize = endIndex - startIndex;
                var middleIndex = startIndex + (windowSize / 2);
                var middleValue = list[middleIndex];
                var compareToResult = comparison(middleValue, value);
                if (compareToResult == 0)
                {
                    // To make it stable
                    endIndex = middleIndex;
                    //list.Insert(middleIndex, value);
                    //return;
                }
                else if (compareToResult < 0)
                {
                    startIndex = middleIndex + 1;
                }
                else
                {
                    endIndex = middleIndex;
                }
            }
            list.Insert(startIndex, value);
        }

        /// <summary>
        /// Insert a value into an IList that is presumed to be already sorted such that sort ordering is preserved
        /// </summary>
        /// <param name="list">List to insert into</param>
        /// <param name="value">Value to insert</param>
        public static void InsertIntoSortedList(this IList list, IComparable value)
        {
            InsertIntoSortedList(list, value, (a, b) => a.CompareTo(b));
        }

        /// <summary>
        /// Insert a value into an IList that is presumed to be already sorted such that sort ordering is preserved
        /// </summary>
        /// <param name="list">List to insert into</param>
        /// <param name="value">Value to insert</param>
        /// <param name="comparison">Comparison to determine sort order with</param>
        public static void InsertIntoSortedList(
            this IList list,
            IComparable value,
            Comparison<IComparable> comparison
        )
        {
            var startIndex = 0;
            var endIndex = list.Count;
            while (endIndex > startIndex)
            {
                var windowSize = endIndex - startIndex;
                var middleIndex = startIndex + (windowSize / 2);
                var middleValue = (IComparable)list[middleIndex];
                var compareToResult = comparison(middleValue, value);
                if (compareToResult == 0)
                {
                    // To make it stable
                    endIndex = middleIndex;
                    //list.Insert(middleIndex, value);
                    //return;
                }
                else if (compareToResult < 0)
                {
                    startIndex = middleIndex + 1;
                }
                else
                {
                    endIndex = middleIndex;
                }
            }
            list.Insert(startIndex, value);
        }
    }
}
