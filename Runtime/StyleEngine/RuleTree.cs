using ExCSS;
using ReactUnity.Components;
using ReactUnity.Styling;
using System.Collections.Generic;
using System.Linq;

namespace ReactUnity.StyleEngine
{
    public class StyleData
    {
        public List<Dictionary<string, object>> Rules = new List<Dictionary<string, object>>();
        public List<LayoutValue> Layouts = new List<LayoutValue>();
    }

    public class StyleTree : RuleTree<StyleData>
    {
        public StyleTree(StylesheetParser parser) : base(parser) { }

        public List<RuleTreeNode<StyleData>> AddStyle(StyleRule rule, int importanceOffset = 0, ReactContext.LayoutMergeMode mergeMode = ReactContext.LayoutMergeMode.Both)
        {
            var added = AddSelector(rule.SelectorText, importanceOffset);
            foreach (var leaf in added)
            {
                var style = rule.Style;
                if (leaf.Data == null) leaf.Data = new StyleData();
                var dic = RuleHelpers.GetRuleDic(style, false);
                leaf.Data.Rules.Add(dic);

                var lay = RuleHelpers.GetLayoutDic(style, false);
                if (lay != null)
                {
                    if (mergeMode == ReactContext.LayoutMergeMode.Both || mergeMode == ReactContext.LayoutMergeMode.CssOnly)
                        leaf.Data.Rules.Add(lay.ToDictionary(x => x.prop.name, x => x.value));
                    if (mergeMode == ReactContext.LayoutMergeMode.Both || mergeMode == ReactContext.LayoutMergeMode.LayoutOnly)
                        leaf.Data.Layouts.AddRange(lay);
                }

                var importantDic = RuleHelpers.GetRuleDic(style, true);
                var importantLay = RuleHelpers.GetLayoutDic(style, true);
                if (importantDic.Count > 0 || importantLay != null)
                {
                    var importantLeaf = leaf.AddChildCascading("** !");
                    importantLeaf.Specifity = leaf.Specifity + RuleHelpers.ImportantSpecifity;
                    if (importantLeaf.Data == null) importantLeaf.Data = new StyleData();
                    importantLeaf.Data.Rules.Add(importantDic);

                    if (importantLay != null)
                    {
                        if (mergeMode == ReactContext.LayoutMergeMode.Both || mergeMode == ReactContext.LayoutMergeMode.CssOnly)
                            leaf.Data.Rules.Add(importantLay.ToDictionary(x => x.prop.name, x => x.value));
                        if (mergeMode == ReactContext.LayoutMergeMode.Both || mergeMode == ReactContext.LayoutMergeMode.LayoutOnly)
                            importantLeaf.Data.Layouts.AddRange(importantLay);
                    }

                    added.Add(importantLeaf);
                    LeafNodes.InsertIntoSortedList(importantLeaf);
                }
            }

            return added;
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
            return LeafNodes.Where(x => x.Matches(component, null));
        }
        public IEnumerable<RuleTreeNode<T>> GetMatchingBefore(IReactComponent component)
        {
            return BeforeNodes.Where(x => x.Matches(component, null));
        }
        public IEnumerable<RuleTreeNode<T>> GetMatchingAfter(IReactComponent component)
        {
            return AfterNodes.Where(x => x.Matches(component, null));
        }

        public IReactComponent GetMatchingChild(IReactComponent component, bool pseudoElement = false)
        {
            var list = new List<IReactComponent>();
            GetMatchingChildrenInner(component, pseudoElement, list, component, true, LeafNodes);
            return list.Count > 0 ? list[0] : default;
        }

        public List<IReactComponent> GetMatchingChildren(IReactComponent component, bool pseudoElement = false)
        {
            var list = new List<IReactComponent>();
            GetMatchingChildrenInner(component, pseudoElement, list, component, false, LeafNodes);
            return list;
        }

        private bool GetMatchingChildrenInner(
            IReactComponent component, bool pseudoElement, List<IReactComponent> list, IReactComponent scope, bool singleItem, List<RuleTreeNode<T>> leafList)
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

            if (component is ContainerComponent cmp)
                foreach (var child in cmp.Children)
                {
                    var childMatches = GetMatchingChildrenInner(child, pseudoElement, list, scope, singleItem, leafList);
                    if (childMatches && singleItem) return true;
                }

            return false;
        }

        public List<RuleTreeNode<T>> AddSelector(string selectorText, int importanceOffset = 0)
        {
            var splits = selectorText.Split(',');

            var added = new List<RuleTreeNode<T>>();
            foreach (var split in splits)
            {
                var selector = RuleHelpers.NormalizeSelector(split);
                var sl = Tree.Parser.ParseSelector(selector);
                var specificity = RuleHelpers.GetSpecificity(sl.Specifity);

                var list = LeafNodes;
                if (selector.EndsWith(":before")) list = BeforeNodes;
                if (selector.EndsWith(":after")) list = AfterNodes;
                var leaf = AddChildCascading("** " + selector);
                leaf.Specifity = specificity + (1 << (29 + importanceOffset));

                added.Add(leaf);
                list.InsertIntoSortedList(leaf);
            }

            return added;
        }

    }
}
