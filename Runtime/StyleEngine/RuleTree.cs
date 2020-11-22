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

        public List<RuleTreeNode<StyleData>> AddStyle(StyleRule rule)
        {
            var added = AddSelector(rule.SelectorText);
            var addedList = added.ToList();
            foreach (var leaf in addedList)
            {
                var style = rule.Style;
                if (leaf.Data == null) leaf.Data = new StyleData();
                var dic = RuleHelpers.GetRuleDic(style, false);
                leaf.Data.Rules.Add(dic);

                var lay = RuleHelpers.GetLayoutDic(style, false);
                if (lay != null)
                {
                    leaf.Data.Layouts.AddRange(lay);
                }

                var canBePseudo = leaf.ParsedSelector.Count > 0 && leaf.ParsedSelector.All(x => x.Type == RuleSelectorPartType.Tag);
                if (canBePseudo) LeafNodesForPseudos.InsertIntoSortedList(leaf);


                var importantDic = RuleHelpers.GetRuleDic(style, true);
                var importantLay = RuleHelpers.GetLayoutDic(style, true);
                if (importantDic.Count > 0 || importantLay != null)
                {
                    var importantLeaf = leaf.AddChildCascading("** !");
                    importantLeaf.Specifity = leaf.Specifity + (1 << 30);
                    if (importantLeaf.Data == null) importantLeaf.Data = new StyleData();
                    importantLeaf.Data.Rules.Add(importantDic);

                    if (importantLay != null)
                    {
                        importantLeaf.Data.Layouts.AddRange(importantLay);
                    }

                    added.Add(importantLeaf);
                    LeafNodes.InsertIntoSortedList(importantLeaf);
                    if (canBePseudo) LeafNodesForPseudos.InsertIntoSortedList(importantLeaf);
                }
            }

            return added;
        }

    }

    public class RuleTree<T> : RuleTreeNode<T>
    {

        public List<RuleTreeNode<T>> LeafNodes = new List<RuleTreeNode<T>>();
        public List<RuleTreeNode<T>> LeafNodesForPseudos = new List<RuleTreeNode<T>>();
        public StylesheetParser Parser { get; private set; }

        public RuleTree(StylesheetParser parser)
        {
            Parser = parser;
        }

        public IEnumerable<RuleTreeNode<T>> GetMatchingRules(UnityComponent component, bool pseudoElement = false)
        {
            return (pseudoElement ? LeafNodesForPseudos : LeafNodes).Where(x => x.Matches(component, null));
        }

        public UnityComponent GetMatchingChild(UnityComponent component, bool pseudoElement = false)
        {
            var list = new List<UnityComponent>();
            GetMatchingChildrenInner(component, pseudoElement, list, component, true);
            return list.FirstOrDefault();
        }

        public List<UnityComponent> GetMatchingChildren(UnityComponent component, bool pseudoElement = false)
        {
            var list = new List<UnityComponent>();

            GetMatchingChildrenInner(component, pseudoElement, list, component, false);
            return list;
        }

        private bool GetMatchingChildrenInner(
            UnityComponent component, bool pseudoElement, List<UnityComponent> list, UnityComponent scope, bool singleItem)
        {
            var matches = (pseudoElement ? LeafNodesForPseudos : LeafNodes).Any(x => x.Matches(component, scope));
            if (matches) list.Add(component);
            if (matches && singleItem) return true;

            if (component is ContainerComponent cmp)
                foreach (var child in cmp.Children)
                {
                    var childMatches = GetMatchingChildrenInner(child, pseudoElement, list, scope, singleItem);
                    if (childMatches && singleItem) return true;
                }

            return false;
        }

        public List<RuleTreeNode<T>> AddSelector(string selectorText)
        {
            var splits = selectorText.Split(',');

            var added = new List<RuleTreeNode<T>>();
            foreach (var split in splits)
            {
                var selector = RuleHelpers.NormalizeSelector(split);
                var sl = Parser.ParseSelector(selector);
                var specificity = RuleHelpers.GetSpecificity(sl.Specifity);

                var leaf = AddChildCascading("** " + selector);
                leaf.Specifity = specificity;

                added.Add(leaf);
                LeafNodes.InsertIntoSortedList(leaf);
            }

            return added;
        }

    }
}
