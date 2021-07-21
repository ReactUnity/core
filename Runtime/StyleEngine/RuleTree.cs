using System.Collections.Generic;
using System.Linq;
using ExCSS;
using ReactUnity.Helpers;
using ReactUnity.Styling;

namespace ReactUnity.StyleEngine
{
    public class StyleData
    {
        public List<Dictionary<string, object>> Rules = new List<Dictionary<string, object>>();
    }

    public class StyleTree : RuleTree<StyleData>
    {
        public StyleTree(StylesheetParser parser) : base(parser) { }

        public List<RuleTreeNode<StyleData>> AddStyle(StyleRule rule, int importanceOffset = 0, MediaQueryList mql = null)
        {
            var added = AddSelector(rule.SelectorText, importanceOffset);
            var addNew = new List<RuleTreeNode<StyleData>>();
            foreach (var leaf in added)
            {
                var style = rule.Style;
                if (leaf.Data == null) leaf.Data = new StyleData();
                var dic = RuleHelpers.ConvertStyleDeclarationToRecord(style, false);
                leaf.Data.Rules.Add(dic);
                leaf.MediaQuery = mql;

                var importantDic = RuleHelpers.ConvertStyleDeclarationToRecord(style, true);
                if (importantDic.Count > 0)
                {
                    var importantLeaf = leaf.AddChildCascading("** !");
                    importantLeaf.Specifity = leaf.Specifity + RuleHelpers.ImportantSpecifity;
                    if (importantLeaf.Data == null) importantLeaf.Data = new StyleData();
                    importantLeaf.Data.Rules.Add(importantDic);
                    importantLeaf.MediaQuery = mql;
                    addNew.Add(importantLeaf);
                    LeafNodes.InsertIntoSortedList(importantLeaf);
                }
            }

            added.AddRange(addNew);
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

            if (component is IContainerComponent cmp && cmp.Children != null)
            {
                foreach (var child in cmp.Children)
                {
                    var childMatches = GetMatchingChildrenInner(child, pseudoElement, list, scope, singleItem, leafList);
                    if (childMatches && singleItem) return true;
                }
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
