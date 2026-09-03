using System;
using System.Collections.Generic;
using System.Linq;
using ExCSS;
using ReactUnity.Helpers;

namespace ReactUnity.Styling.Rules
{
    public class StyleData
    {
        public List<Dictionary<IStyleProperty, object>> Rules = new List<Dictionary<IStyleProperty, object>>();
    }

    /// <summary>
    /// One rule's declarations, and the cascade layer they came from. <c>revert-layer</c> has to
    /// know which declarations leave the cascade along with it, and a bare dictionary cannot say.
    /// </summary>
    public class StyleRecord : Dictionary<IStyleProperty, object>
    {
        public CascadeLayer Layer;
    }

    public class StyleTree : RuleTree<StyleData>
    {
        public List<Tuple<RuleTreeNode<StyleData>, Dictionary<IStyleProperty, object>>> AddStyle
            (StyleRule rule, int importanceOffset = 0, MediaQueryList mql = null, IReactComponent scope = null, CascadeLayer layer = null)
        {
            // A nested rule's selector was resolved by the parser rather than lifted from the
            // source, so it has no stylesheet text of its own to read back.
            var selectorText = rule.Selector.StylesheetText?.Text ?? rule.SelectorText;
            var added = AddSelector(selectorText, importanceOffset, mql, scope, layer);
            var pairs = new List<Tuple<RuleTreeNode<StyleData>, Dictionary<IStyleProperty, object>>>();

            foreach (var leaf in added)
            {
                var style = rule.Style;
                if (leaf.Data == null) leaf.Data = new StyleData();
                var dic = RuleHelpers.ConvertStyleDeclarationToRecord(style, false);
                var importantDic = RuleHelpers.ConvertStyleDeclarationToRecord(style, true);
                dic.Layer = layer;
                importantDic.Layer = layer;

                if (dic.Count > 0) pairs.Add(Tuple.Create(leaf, (Dictionary<IStyleProperty, object>) dic));

                if (importantDic.Count > 0)
                {
                    var importantLeaf = leaf.AddChildCascading("** !", mql, scope, importanceOffset, layer);
                    if (importantLeaf.Data == null) importantLeaf.Data = new StyleData();
                    pairs.Add(Tuple.Create(importantLeaf, (Dictionary<IStyleProperty, object>) importantDic));

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
            int importanceOffset = 0, MediaQueryList mql = null, IReactComponent scope = null, CascadeLayer layer = null
        )
        {
            var added = AddSelector(selectorText, importanceOffset, null, null, layer);
            var pairs = new List<Tuple<RuleTreeNode<StyleData>, Dictionary<IStyleProperty, object>>>();

            foreach (var leaf in added)
            {
                if (leaf.Data == null) leaf.Data = new StyleData();

                if (rules.Count > 0) pairs.Add(Tuple.Create(leaf, rules));

                if (importantRules != null && importantRules.Count > 0)
                {
                    var importantLeaf = leaf.AddChildCascading("** !", mql, scope, importanceOffset, layer);
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

        public List<RuleTreeNode<T>> AddSelector(string selectorText, int importanceOffset = 0, MediaQueryList mql = null, IReactComponent scope = null, CascadeLayer layer = null)
        {
            var splits = RuleHelpers.SplitSelectorList(selectorText);

            var added = new List<RuleTreeNode<T>>();
            foreach (var split in splits)
            foreach (var expanded in RuleHelpers.ExpandMatchesAny(split))
            {
                var selector = RuleHelpers.StripZeroSpecificity(RuleHelpers.NormalizeSelector(expanded), out var zeroed);
                var leaf = AddChildCascading("** " + selector, mql, scope, importanceOffset, layer);

                if (leaf == null) continue;

                // What an inlined :where() argument contributed comes back off before the leaf is
                // sorted in, and the important leaf that hangs off it inherits the discount.
                if (zeroed > 0) leaf.DiscountSpecificity(zeroed);

                added.Add(leaf);

                var list = LeafNodes;
                if (leaf.PseudoType == RulePseudoType.Before) list = BeforeNodes;
                else if (leaf.PseudoType == RulePseudoType.After) list = AfterNodes;

                list.InsertIntoSortedList(leaf);
            }

            return added;
        }

        /// <summary>
        /// Applies the layer order to every rule already in the tree and sorts the lists again.
        /// A stylesheet inserted later can declare a sub-layer of a layer these rules point at,
        /// which moves that layer's position and so their specificity.
        /// </summary>
        public void RefreshLayers()
        {
            RefreshLayerSpecificity();

            Resort(LeafNodes);
            Resort(BeforeNodes);
            Resort(AfterNodes);
        }

        // OrderByDescending is stable, so rules of equal specificity keep the source order they
        // were inserted in, which is the tie-break the cascade wants.
        private static void Resort(List<RuleTreeNode<T>> list)
        {
            var sorted = list.OrderByDescending(x => x.Specifity).ToList();
            list.Clear();
            list.AddRange(sorted);
        }
    }
}
