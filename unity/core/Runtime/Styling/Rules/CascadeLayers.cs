using System.Collections.Generic;
using ExCSS;

namespace ReactUnity.Styling.Rules
{
    /// <summary>
    /// Cascade layer ordering for one stylesheet, per
    /// <see href="https://www.w3.org/TR/css-cascade-5/#layering">CSS Cascade 5</see>. A layer takes
    /// its place from where its name is first seen, and a sub-layer sits inside its parent's slot
    /// rather than at the end, so the final order is a depth-first walk of a tree and not the order
    /// the names appeared in.
    /// </summary>
    internal class CascadeLayers
    {
        /// <summary>The order of a rule that is in no layer at all, which outranks every layer.</summary>
        public const int Unlayered = 0;

        private class Layer
        {
            public string Segment;
            public List<Layer> Children;
        }

        private readonly Layer root = new Layer();
        private readonly Dictionary<ILayerRule, string> anonymous = new Dictionary<ILayerRule, string>();
        private Dictionary<string, int> order;

        /// <summary>
        /// Registers a layer by its full dotted name, creating any parent the name mentions.
        /// </summary>
        public void Declare(string name)
        {
            if (string.IsNullOrEmpty(name)) return;

            var node = root;

            foreach (var segment in name.Split('.'))
            {
                var trimmed = segment.Trim();
                if (trimmed.Length == 0) return;
                node = Child(node, trimmed);
            }

            order = null;
        }

        /// <summary>Full name of a layer nested inside <paramref name="parent"/>.</summary>
        public string Qualify(string parent, string name)
        {
            if (string.IsNullOrEmpty(name)) return parent;
            return string.IsNullOrEmpty(parent) ? name : parent + "." + name;
        }

        public string Qualify(string parent, ILayerRule rule) => Qualify(parent, NameOf(rule));

        /// <summary>
        /// An anonymous layer has no name to be reopened by, so it gets one no author could write.
        /// Keyed on the rule itself, so the collecting and the indexing pass agree on it.
        /// </summary>
        public string NameOf(ILayerRule rule)
        {
            var name = rule.Name?.Trim();
            if (!string.IsNullOrEmpty(name)) return name;

            if (!anonymous.TryGetValue(rule, out var generated))
            {
                // '%' cannot appear in an identifier, so this can never collide with a real name.
                generated = "%" + anonymous.Count;
                anonymous[rule] = generated;
            }

            return generated;
        }

        /// <summary>
        /// One-based position in the final order, or <see cref="Unlayered"/> for a name that was
        /// never declared.
        /// </summary>
        public int Order(string name)
        {
            if (string.IsNullOrEmpty(name)) return Unlayered;
            if (order == null) Flatten();
            return order.TryGetValue(name, out var found) ? found : Unlayered;
        }

        /// <summary>
        /// The layer names an <c>@layer a, b, c;</c> statement declares. Read out of the rule's
        /// text because upstream keeps the statement rule itself internal, with no interface.
        /// </summary>
        public static IEnumerable<string> ParseStatement(IRule rule)
        {
            var text = rule.Text ?? "";

            var start = text.IndexOf("@layer", System.StringComparison.OrdinalIgnoreCase);
            if (start < 0) yield break;

            var names = text.Substring(start + "@layer".Length).Trim().TrimEnd(';').Trim();

            foreach (var name in names.Split(','))
            {
                var trimmed = name.Trim();
                if (trimmed.Length > 0) yield return trimmed;
            }
        }

        private static Layer Child(Layer parent, string segment)
        {
            if (parent.Children == null) parent.Children = new List<Layer>();

            for (int i = 0; i < parent.Children.Count; i++)
                if (parent.Children[i].Segment == segment)
                    return parent.Children[i];

            var child = new Layer { Segment = segment };
            parent.Children.Add(child);
            return child;
        }

        private void Flatten()
        {
            order = new Dictionary<string, int>();
            Visit(root, null);
        }

        private void Visit(Layer layer, string prefix)
        {
            if (layer.Children == null) return;

            foreach (var child in layer.Children)
            {
                var path = prefix == null ? child.Segment : prefix + "." + child.Segment;

                // Depth first, and the layer itself only after its sub-layers: within one layer the
                // same rule applies again, so its own rules outrank anything it nests.
                Visit(child, path);
                order[path] = order.Count + 1;
            }
        }
    }
}
