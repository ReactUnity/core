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

        private int[] slots;
        private object[] values;

        /// <summary>The built-in properties as parallel arrays, built on first merge: a record is not written once converted.</summary>
        internal int Slotted(out int[] slots, out object[] values)
        {
            if (this.slots == null)
            {
                var s = new List<int>(Count);
                var v = new List<object>(Count);
                foreach (var kv in this)
                {
                    var slot = kv.Key is IStyleSlot ss ? ss.Slot : -1;
                    if (slot < 0) continue;
                    s.Add(slot);
                    v.Add(kv.Value);
                }
                this.values = v.ToArray();
                this.slots = s.ToArray();
            }
            slots = this.slots;
            values = this.values;
            return slots.Length;
        }
    }

    public class StyleTree : RuleTree<StyleData>
    {
        // A disabled sheet leaves its leaves in place with no declarations. Matching one would
        // decide nothing, and would still register its @container as reading the container.
        protected override bool Eligible(RuleTreeNode<StyleData> leaf) => leaf.Data != null && leaf.Data.Rules.Count > 0;

        public List<Tuple<RuleTreeNode<StyleData>, Dictionary<IStyleProperty, object>>> AddStyle
            (StyleRule rule, int importanceOffset = 0, MediaQueryList mql = null, IReactComponent scope = null, CascadeLayer layer = null, ContainerQuery container = null, string selectorText = null, RuleScope ruleScope = null)
        {
            // A nested rule's selector was resolved by the parser rather than lifted from the
            // source, so it has no stylesheet text of its own to read back.
            selectorText = selectorText ?? rule.Selector.StylesheetText?.Text ?? rule.SelectorText;
            var added = AddSelector(selectorText, importanceOffset, mql, scope, layer, container, ruleScope);
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
                    importantLeaf.RuleScope = ruleScope;
                    pairs.Add(Tuple.Create(importantLeaf, (Dictionary<IStyleProperty, object>) importantDic));

                    var list = LeafNodes;
                    if (leaf.PseudoType == RulePseudoType.Before) list = BeforeNodes;
                    else if (leaf.PseudoType == RulePseudoType.After) list = AfterNodes;

                    list.InsertIntoSortedList(importantLeaf);
                    LeavesChanged();
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
                    LeavesChanged();
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

        /// <summary>
        /// Whether any rule here uses <c>:has()</c>. Until one does, a change to an element cannot
        /// restyle anything before or above it, and the components skip looking.
        /// </summary>
        public bool ContainsHasSelector { get; private set; }

        /// <summary>
        /// Whether any rule reads where an element sits among its siblings (a structural pseudo-class),
        /// and whether any reads a sibling's own state (a sibling combinator, <c>of S</c>). Until one
        /// does, a child arriving or a sibling changing restyles nobody but the element itself.
        /// </summary>
        public bool ReadsSiblingPosition { get; private set; }
        public bool ReadsSiblingState { get; private set; }

        /// <summary>
        /// Whether one of those reads is above the subject, or in a pseudo-element's rule, so that
        /// the siblings' descendants and pseudo-elements have to be matched again too.
        /// </summary>
        public bool ReadsSiblingsDeep { get; private set; }

        /// <summary>Whether any rule uses <c>:empty</c>, which a child arriving or leaving changes for its parent.</summary>
        public bool ContainsEmptySelector { get; private set; }

        public IEnumerable<RuleTreeNode<T>> GetMatchingRules(IReactComponent component) => Match(LeafNodes, component, true);
        public IEnumerable<RuleTreeNode<T>> GetMatchingBefore(IReactComponent component) => Match(BeforeNodes, component);
        public IEnumerable<RuleTreeNode<T>> GetMatchingAfter(IReactComponent component) => Match(AfterNodes, component);

        // The same, as the fresh list each already is, for callers that would otherwise copy it.
        internal List<RuleTreeNode<T>> MatchRules(IReactComponent component) => Match(LeafNodes, component, true);
        internal List<RuleTreeNode<T>> MatchBefore(IReactComponent component) => Match(BeforeNodes, component);
        internal List<RuleTreeNode<T>> MatchAfter(IReactComponent component) => Match(AfterNodes, component);

        /// <summary>Whether a leaf takes part in matching at all.</summary>
        protected virtual bool Eligible(RuleTreeNode<T> leaf) => true;

        /// <summary>
        /// The leaves matching the component, in cascade order: by specificity, then by scope
        /// proximity (CSS Cascade 6), then by source order. A scoped rule beats one of equal
        /// specificity whose root is further up, and one that is in no scope at all. The lists
        /// are kept in specificity and source order already, so the sort only runs when a scoped
        /// rule matched.
        /// </summary>
        private List<RuleTreeNode<T>> Match(List<RuleTreeNode<T>> leaves, IReactComponent component, bool indexed = false)
        {
            var matched = new List<RuleTreeNode<T>>();
            List<int> proximities = null;

            var count = leaves.Count;
            var candidates = indexed ? Candidates(component, out count) : null;

            for (int c = 0; c < count; c++)
            {
                var leaf = leaves[candidates != null ? candidates[c] : c];
                if (!Eligible(leaf) || !leaf.Matches(component, leaf.Scope, out var proximity)) continue;

                if (proximity != RuleScope.NoProximity && proximities == null)
                {
                    proximities = new List<int>(matched.Count + 1);
                    for (int j = 0; j < matched.Count; j++) proximities.Add(RuleScope.NoProximity);
                }

                matched.Add(leaf);
                if (proximities != null) proximities.Add(proximity);
            }

            if (candidates != null) candidateScratch = candidates;

            if (proximities == null) return matched;

            // OrderBy is stable, so equal specificity and proximity keep their source order.
            return matched
                .Select((leaf, index) => new KeyValuePair<RuleTreeNode<T>, int>(leaf, proximities[index]))
                .OrderByDescending(x => x.Key.Specifity)
                .ThenBy(x => x.Value)
                .Select(x => x.Key)
                .ToList();
        }

        /// <summary>
        /// The leaves of <see cref="LeafNodes"/> filed by an id, class or tag their subject compound
        /// requires, as positions in the list, so an element is only tested against rules it could match.
        /// </summary>
        private class LeafIndex
        {
            public readonly Dictionary<string, List<int>> Ids = new Dictionary<string, List<int>>();
            public readonly Dictionary<string, List<int>> Classes = new Dictionary<string, List<int>>();
            public readonly Dictionary<string, List<int>> Tags = new Dictionary<string, List<int>>();
            public readonly List<int> Unkeyed = new List<int>();
            public int Count;
        }

        private LeafIndex leafIndex;
        private int[] candidateScratch;

        /// <summary>Drops the index after <see cref="LeafNodes"/> gained a leaf or was sorted again.</summary>
        protected void LeavesChanged() => leafIndex = null;

        // Sorted positions, so the matches come out in the list's cascade order.
        private int[] Candidates(IReactComponent component, out int count)
        {
            var index = leafIndex;
            if (index == null || index.Count != LeafNodes.Count) index = leafIndex = BuildIndex(LeafNodes);

            // Taken rather than shared, in case matching one rule matches another.
            var result = candidateScratch ?? new int[64];
            candidateScratch = null;
            count = 0;

            Append(ref result, ref count, index.Unkeyed);
            if (component.Id != null && index.Ids.TryGetValue(component.Id, out var byId)) Append(ref result, ref count, byId);
            if (component.Tag != null && index.Tags.TryGetValue(component.Tag, out var byTag)) Append(ref result, ref count, byTag);
            if (component.ClassList != null && index.Classes.Count > 0)
                foreach (var cls in component.ClassList)
                    if (index.Classes.TryGetValue(cls, out var byClass)) Append(ref result, ref count, byClass);

            // A few sorted runs end to end, which an insertion sort takes nearly in one pass; List.Sort
            // compared through an interface call each time.
            for (int i = 1; i < count; i++)
            {
                var value = result[i];
                var j = i - 1;
                while (j >= 0 && result[j] > value)
                {
                    result[j + 1] = result[j];
                    j--;
                }
                result[j + 1] = value;
            }

            return result;
        }

        private static void Append(ref int[] buffer, ref int count, List<int> positions)
        {
            if (count + positions.Count > buffer.Length) System.Array.Resize(ref buffer, System.Math.Max(buffer.Length * 2, count + positions.Count));
            positions.CopyTo(buffer, count);
            count += positions.Count;
        }

        private static LeafIndex BuildIndex(List<RuleTreeNode<T>> leaves)
        {
            var index = new LeafIndex { Count = leaves.Count };

            for (int i = 0; i < leaves.Count; i++)
            {
                string id = null, cls = null, tag = null;

                // The subject compound runs up through the important leaf and pseudo-element nodes,
                // which sit on the same element as their parent node.
                for (var node = leaves[i]; node?.Parent != null; node = node.Parent)
                {
                    if (node.ParsedSelector != null)
                        foreach (var part in node.ParsedSelector)
                        {
                            if (part.Negated) continue;
                            if (part.Type == RuleSelectorPartType.Id) id = part.Name;
                            else if (part.Type == RuleSelectorPartType.ClassName) cls = part.Name;
                            else if (part.Type == RuleSelectorPartType.Tag) tag = part.Name;
                        }

                    if (node.RelationType != RuleRelationType.Self && node.RelationType != RuleRelationType.Pseudo) break;
                }

                if (id != null) File(index.Ids, id, i);
                else if (cls != null) File(index.Classes, cls, i);
                else if (tag != null) File(index.Tags, tag, i);
                else index.Unkeyed.Add(i);
            }

            return index;
        }

        private static void File(Dictionary<string, List<int>> bucket, string key, int position)
        {
            if (!bucket.TryGetValue(key, out var list)) bucket[key] = list = new List<int>();
            list.Add(position);
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

        public List<RuleTreeNode<T>> AddSelector(string selectorText, int importanceOffset = 0, MediaQueryList mql = null, IReactComponent scope = null, CascadeLayer layer = null, ContainerQuery container = null, RuleScope ruleScope = null)
        {
            var splits = RuleHelpers.SplitSelectorList(selectorText);
            if (ruleScope != null && ruleScope.ContainsHasSelector) ContainsHasSelector = true;

            var added = new List<RuleTreeNode<T>>();
            foreach (var split in splits)
            foreach (var expanded in RuleHelpers.ExpandMatchesAny(split))
            {
                var selector = RuleHelpers.StripZeroSpecificity(RuleHelpers.NormalizeSelector(expanded), out var zeroed);
                var leaf = AddChildCascading("** " + selector, mql, scope, importanceOffset, layer);

                if (leaf == null) continue;
                leaf.ContainerQuery = container;
                leaf.RuleScope = ruleScope;
                if (selector.IndexOf(":has(", StringComparison.OrdinalIgnoreCase) >= 0) ContainsHasSelector = true;

                // What an inlined :where() argument contributed comes back off before the leaf is
                // sorted in, and the important leaf that hangs off it inherits the discount.
                if (zeroed > 0) leaf.DiscountSpecificity(zeroed);

                added.Add(leaf);

                var list = LeafNodes;
                if (leaf.PseudoType == RulePseudoType.Before) list = BeforeNodes;
                else if (leaf.PseudoType == RulePseudoType.After) list = AfterNodes;

                list.InsertIntoSortedList(leaf);
                LeavesChanged();
                NoteSiblingReads(leaf);
            }

            return added;
        }

        /// <summary>Records what the leaf's selector reads of its siblings, walking it right to left from the subject.</summary>
        private void NoteSiblingReads(RuleTreeNode<T> leaf)
        {
            var above = leaf.PseudoType != RulePseudoType.None;

            for (var node = leaf; node != null; node = node.Parent)
            {
                if (node.ParsedSelector != null)
                {
                    foreach (var part in node.ParsedSelector)
                    {
                        var type = part.Type;
                        var position = (type >= RuleSelectorPartType.FirstChild && type <= RuleSelectorPartType.OnlyChild)
                            || (type >= RuleSelectorPartType.FirstOfType && type <= RuleSelectorPartType.OnlyOfType);
                        // Complex :is()/:not() arguments are not looked into, so they count as reading everything.
                        var state = type == RuleSelectorPartType.MatchesAny || (part.Parameter is NthChildParameter nth && nth.Of != null);

                        if (type == RuleSelectorPartType.Empty) ContainsEmptySelector = true;
                        if (position || state) ReadsSiblingPosition = true;
                        if (state) ReadsSiblingState = true;
                        if ((position || state) && above) ReadsSiblingsDeep = true;
                        if (type == RuleSelectorPartType.MatchesAny) ReadsSiblingsDeep = true;
                    }
                }

                var relation = node.RelationType;
                if (relation == RuleRelationType.Sibling || relation == RuleRelationType.DirectSibling)
                {
                    ReadsSiblingPosition = ReadsSiblingState = true;
                    if (above) ReadsSiblingsDeep = true;
                }

                // Self is the important leaf and Pseudo a pseudo-element, both on the same element as their parent node.
                if (node.Parent != null && relation != RuleRelationType.Self && relation != RuleRelationType.Pseudo) above = true;
            }
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
            LeavesChanged();
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
