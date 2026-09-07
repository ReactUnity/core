namespace ReactUnity.Styling.Rules
{
    /// <summary>
    /// The prelude of a <c>@scope</c> rule: the selector list naming the scoping roots, and the one
    /// naming the limits under each -- the elements that, with their subtrees, the scope leaves out.
    /// A rule nested in another <c>@scope</c> chains to it through <see cref="Parent"/>: its roots
    /// have to be in the outer scope, and the outer root is what <c>:scope</c> means in its start selector.
    /// </summary>
    public class RuleScope
    {
        /// <summary>The proximity of a rule that is in no scope, which every scoped rule beats.</summary>
        public const int NoProximity = int.MaxValue;

        public RuleScope Parent { get; }

        // Null when the prelude names no root, which makes the sheet's scope element the root.
        private readonly RuleTree<object> Start;
        private readonly RuleTree<object> End;

        /// <summary>Whether a selector in the prelude uses <c>:has()</c>, which the style tree has to be told.</summary>
        public bool ContainsHasSelector { get; }

        public RuleScope(string startText, string endText, RuleScope parent = null)
        {
            Parent = parent;
            Start = Build(startText);
            End = Build(endText);
            ContainsHasSelector = (Start != null && Start.ContainsHasSelector) || (End != null && End.ContainsHasSelector)
                || (parent != null && parent.ContainsHasSelector);
        }

        private static RuleTree<object> Build(string text)
        {
            if (string.IsNullOrWhiteSpace(text)) return null;

            var tree = new RuleTree<object>();
            tree.AddSelector(RuleHelpers.ResolveScopedSelector(text));
            return tree;
        }

        /// <summary>
        /// Whether <paramref name="element"/> is in the scope. <paramref name="sheetScope"/> is the
        /// stylesheet's own scope element, which is what <c>:scope</c> means outside any <c>@scope</c>
        /// and the root of a prelude-less one. Reports the nearest root that takes the element in and
        /// how many hops up it is, which is the rule's proximity in the cascade.
        /// </summary>
        public bool Matches(IReactComponent element, IReactComponent sheetScope, out IReactComponent root, out int proximity)
        {
            proximity = 0;

            for (var candidate = element; candidate != null; candidate = candidate.Parent, proximity++)
            {
                if (!IsRoot(candidate, sheetScope)) continue;

                // Inside a limit of this root, the element may still be in the scope of a root further up.
                if (End != null && HasLimitBetween(element, candidate)) continue;

                root = candidate;
                return true;
            }

            root = null;
            proximity = NoProximity;
            return false;
        }

        private bool IsRoot(IReactComponent candidate, IReactComponent sheetScope)
        {
            if (candidate.IsPseudoElement) return false;

            var outerRoot = sheetScope;
            if (Parent != null && !Parent.Matches(candidate, sheetScope, out outerRoot, out _)) return false;

            if (Start == null) return candidate == (sheetScope ?? candidate.Context.Host);
            return Start.AnyMatches(candidate, outerRoot);
        }

        // A limit is a descendant of the root, never the root itself, so the walk stops short of it.
        private bool HasLimitBetween(IReactComponent element, IReactComponent root)
        {
            for (var current = element; current != root; current = current.Parent)
                if (!current.IsPseudoElement && End.AnyMatches(current, root)) return true;
            return false;
        }
    }
}
