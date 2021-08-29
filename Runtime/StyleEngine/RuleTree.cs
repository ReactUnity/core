using System;
using System.Collections.Generic;
using System.Linq;
using ExCSS;
using ReactUnity.Helpers;
using ReactUnity.Styling;

namespace ReactUnity.StyleEngine
{
    public class StyleData
    {
        public List<Dictionary<IStyleProperty, object>> Rules = new List<Dictionary<IStyleProperty, object>>();
    }

    public class StyleTree : RuleTree<StyleData>
    {
        public StyleTree(StylesheetParser parser) : base(parser) { }

        public List<Tuple<RuleTreeNode<StyleData>, Dictionary<IStyleProperty, object>>> AddStyle
            (StyleRule rule, int importanceOffset = 0, MediaQueryList mql = null, IReactComponent scope = null)
        {
            var added = AddSelector(rule.SelectorText, importanceOffset, mql, scope);
            var pairs = new List<Tuple<RuleTreeNode<StyleData>, Dictionary<IStyleProperty, object>>>();

            foreach (var leaf in added)
            {
                var style = rule.Style;
                if (leaf.Data == null) leaf.Data = new StyleData();
                var dic = RuleHelpers.ConvertStyleDeclarationToRecord(style, false);
                var importantDic = RuleHelpers.ConvertStyleDeclarationToRecord(style, true);

                if (dic.Count > 0) pairs.Add(Tuple.Create(leaf, dic));

                if (importantDic.Count > 0)
                {
                    var importantLeaf = leaf.AddChildCascading("** !", mql, scope, leaf.Specifity + RuleHelpers.ImportantSpecifity);
                    if (importantLeaf.Data == null) importantLeaf.Data = new StyleData();
                    pairs.Add(Tuple.Create(importantLeaf, importantDic));

                    var list = LeafNodes;
                    if (leaf.PseudoType == RulePseudoType.Before) list = BeforeNodes;
                    else if (leaf.PseudoType == RulePseudoType.After) list = AfterNodes;

                    list.InsertIntoSortedList(importantLeaf);
                }
            }

            return pairs;
        }

        public List<Tuple<RuleTreeNode<StyleData>, Dictionary<IStyleProperty, object>>> AddStyle(
            string selectorText, Dictionary<IStyleProperty, object> rules, Dictionary<IStyleProperty, object> importantRules,
            int importanceOffset = 0, MediaQueryList mql = null, IReactComponent scope = null
        )
        {
            var added = AddSelector(selectorText, importanceOffset);
            var pairs = new List<Tuple<RuleTreeNode<StyleData>, Dictionary<IStyleProperty, object>>>();

            foreach (var leaf in added)
            {
                if (leaf.Data == null) leaf.Data = new StyleData();

                if (rules.Count > 0) pairs.Add(Tuple.Create(leaf, rules));

                if (importantRules != null && importantRules.Count > 0)
                {
                    var importantLeaf = leaf.AddChildCascading("** !", mql, scope, leaf.Specifity + RuleHelpers.ImportantSpecifity);
                    if (importantLeaf.Data == null) importantLeaf.Data = new StyleData();
                    pairs.Add(Tuple.Create(importantLeaf, importantRules));


                    var list = LeafNodes;
                    if (leaf.PseudoType == RulePseudoType.Before) list = BeforeNodes;
                    else if (leaf.PseudoType == RulePseudoType.After) list = AfterNodes;

                    list.InsertIntoSortedList(importantLeaf);
                }
            }

            return pairs;
        }
    }

    public class RuleTree<T> : RuleTreeNode<T>
    {

        public List<RuleTreeNode<T>> LeafNodes = new List<RuleTreeNode<T>>();
        public List<RuleTreeNode<T>> BeforeNodes = new List<RuleTreeNode<T>>();
        public List<RuleTreeNode<T>> AfterNodes = new List<RuleTreeNode<T>>();
        public StylesheetParser Parser { get; private set; }

        public RuleTree(StylesheetParser parser)
        {
            Parser = parser;
            Tree = this;
        }

        public IEnumerable<RuleTreeNode<T>> GetMatchingRules(IReactComponent component)
        {
            return LeafNodes.Where(x => x.Matches(component));
        }
        public IEnumerable<RuleTreeNode<T>> GetMatchingBefore(IReactComponent component)
        {
            return BeforeNodes.Where(x => x.Matches(component));
        }
        public IEnumerable<RuleTreeNode<T>> GetMatchingAfter(IReactComponent component)
        {
            return AfterNodes.Where(x => x.Matches(component));
        }

        public bool AnyMatches(IReactComponent component, IReactComponent scope = null)
        {
            var leafList = LeafNodes;
            for (int i = 0; i < leafList.Count; i++)
            {
                var leaf = leafList[i];
                if (leaf.Matches(component, scope))
                {
                    return true;
                }
            }
            return false;
        }

        public IReactComponent Closest(IReactComponent component, IReactComponent scope = null)
        {
            IReactComponent current = component;
            while (current != null)
            {
                if (AnyMatches(current, scope)) return current;
                current = current.Parent;
            }

            return null;
        }

        public IReactComponent GetMatchingChild(IReactComponent component, IReactComponent scope = null)
        {
            var list = new List<IReactComponent>();
            GetMatchingChildrenInner(component, list, scope ?? component, true, LeafNodes);
            return list.Count > 0 ? list[0] : default;
        }

        public List<IReactComponent> GetMatchingChildren(IReactComponent component, IReactComponent scope = null)
        {
            var list = new List<IReactComponent>();
            GetMatchingChildrenInner(component, list, scope ?? component, false, LeafNodes);
            return list;
        }

        private bool GetMatchingChildrenInner(
            IReactComponent component, List<IReactComponent> list, IReactComponent scope, bool singleItem, List<RuleTreeNode<T>> leafList)
        {
            var matches = false;
            for (int i = 0; i < leafList.Count; i++)
            {
                var leaf = leafList[i];
                if (leaf.Matches(component, scope))
                {
                    matches = true;
                    break;
                }
            }

            if (matches) list.Add(component);
            if (matches && singleItem) return true;

            if (component is IContainerComponent cmp && cmp.Children != null)
            {
                foreach (var child in cmp.Children)
                {
                    var childMatches = GetMatchingChildrenInner(child, list, scope, singleItem, leafList);
                    if (childMatches && singleItem) return true;
                }
            }

            return false;
        }

        public List<RuleTreeNode<T>> AddSelector(string selectorText, int importanceOffset = 0, MediaQueryList mql = null, IReactComponent scope = null)
        {
            var splits = selectorText.Split(',');

            var added = new List<RuleTreeNode<T>>();
            foreach (var split in splits)
            {
                var selector = RuleHelpers.NormalizeSelector(split);
                var sl = Tree.Parser.ParseSelector(selector);
                var specificity = RuleHelpers.GetSpecificity(sl.Specifity);
                var leaf = AddChildCascading("** " + selector, mql, scope, specificity + (1 << (29 + importanceOffset)));

                added.Add(leaf);

                var list = LeafNodes;
                if (selector.EndsWith(":before")) list = BeforeNodes;
                if (selector.EndsWith(":after")) list = AfterNodes;

                list.InsertIntoSortedList(leaf);
            }

            return added;
        }

    }
}
