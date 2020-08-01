using ExCSS;
using ReactUnity.Components;
using ReactUnity.Styling;
using System.Collections.Generic;
using System.Linq;

namespace ReactUnity.StyleEngine
{
    public class RuleTree : RuleTreeNode
    {

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
                var selector = RuleHelpers.NormalizeSelector(split);
                var sl = Parser.ParseSelector(selector);
                var specificity = RuleHelpers.GetSpecificity(sl.Specifity);

                var leaf = AddChildCascading("** " + selector);
                leaf.Specifity = specificity;

                if (leaf.Rules == null) leaf.Rules = new List<Dictionary<string, object>>();
                var dic = RuleHelpers.GetRuleDic(rule, false);
                leaf.Rules.Add(dic);

                var lay = RuleHelpers.GetLayoutDic(rule, false);
                if (lay != null)
                {
                    if (leaf.Layouts == null) leaf.Layouts = new List<LayoutValue>();
                    leaf.Layouts.AddRange(lay);
                }

                added.Add(leaf);
                LeafNodes.InsertIntoSortedList(leaf);

                var canBePseudo = leaf.ParsedSelector.Count > 0 && leaf.ParsedSelector.All(x => x.Type == RuleSelectorPartType.Tag);
                if (canBePseudo) LeafNodesForPseudos.InsertIntoSortedList(leaf);


                var importantDic = RuleHelpers.GetRuleDic(rule, true);
                var importantLay = RuleHelpers.GetLayoutDic(rule, true);
                if (importantDic.Count > 0 || importantLay != null)
                {
                    var importantLeaf = leaf.AddChildCascading("** !");
                    importantLeaf.Specifity = specificity + (1 << 30);
                    if (importantLeaf.Rules == null) importantLeaf.Rules = new List<Dictionary<string, object>>();
                    importantLeaf.Rules.Add(importantDic);

                    if (importantLay != null)
                    {
                        if (importantLeaf.Layouts == null) importantLeaf.Layouts = new List<LayoutValue>();
                        importantLeaf.Layouts.AddRange(importantLay);
                    }

                    added.Add(importantLeaf);
                    LeafNodes.InsertIntoSortedList(importantLeaf);
                    if (canBePseudo) LeafNodesForPseudos.InsertIntoSortedList(importantLeaf);
                }

            }

            return added;
        }

        public IEnumerable<RuleTreeNode> GetMatchingRules(UnityComponent component, bool pseudoElement)
        {
            return (pseudoElement ? LeafNodesForPseudos : LeafNodes).Where(x => x.Matches(component));
        }
    }
}
