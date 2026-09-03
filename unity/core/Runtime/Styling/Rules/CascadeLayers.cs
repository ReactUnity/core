using System.Collections.Generic;
using ExCSS;

namespace ReactUnity.Styling.Rules
{
    /// <summary>
    /// One cascade layer, and its place in the document's layer order. A rule holds the layer rather
    /// than its position, because the position moves: inserting or removing a stylesheet can reorder
    /// the layers that other sheets' rules are already in.
    /// </summary>
    public class CascadeLayer
    {
        /// <summary>Full dotted name, or the generated one an anonymous layer was given.</summary>
        public string Name { get; }

        /// <summary>
        /// One-based position in the document's layer order, or <see cref="CascadeLayers.Unlayered"/>
        /// for a layer no attached stylesheet declares any more.
        /// </summary>
        public int Order { get; internal set; }

        internal CascadeLayer(string name)
        {
            Name = name;
        }

        public override string ToString() => Name + "@" + Order;
    }

    /// <summary>
    /// Cascade layer ordering for one document, per
    /// <see href="https://www.w3.org/TR/css-cascade-5/#layering">CSS Cascade 5</see>. Every
    /// stylesheet in a context shares one of these, so a name is the same layer wherever it is
    /// reopened, and a layer takes its place from the first sheet that mentions it. A sub-layer sits
    /// inside its parent's slot rather than at the end, so the final order is a depth-first walk of
    /// a tree and not the order the names appeared in.
    /// </summary>
    internal class CascadeLayers
    {
        /// <summary>The order of a rule that is in no layer at all, which outranks every layer.</summary>
        public const int Unlayered = 0;

        private class Node
        {
            public string Segment;
            public List<Node> Children;
            public CascadeLayer Layer;
        }

        private readonly Dictionary<string, CascadeLayer> layers = new Dictionary<string, CascadeLayer>();
        private readonly Dictionary<ILayerRule, string> anonymous = new Dictionary<ILayerRule, string>();

        /// <summary>
        /// The layer with this full name, created on first sight. The object is permanent and only
        /// its <see cref="CascadeLayer.Order"/> moves, which is what lets a rule hold on to it.
        /// </summary>
        public CascadeLayer Get(string name)
        {
            if (string.IsNullOrEmpty(name)) return null;

            if (!layers.TryGetValue(name, out var layer))
                layers[name] = layer = new CascadeLayer(name);

            return layer;
        }

        /// <summary>
        /// Works the order out again from the names each attached stylesheet declares, given in
        /// document order. Returns true when a layer moved, which means the rules in it need their
        /// specificity worked out again. A layer no sheet mentions any more is left unordered: the
        /// only rules in it belong to a sheet that is no longer attached.
        /// </summary>
        public bool Rebuild(IEnumerable<IEnumerable<string>> declarations)
        {
            var root = new Node();

            foreach (var sheet in declarations)
            {
                if (sheet == null) continue;
                foreach (var name in sheet) Declare(root, name);
            }

            var ordered = new List<CascadeLayer>();
            Visit(root, ordered);

            var changed = false;

            for (int i = 0; i < ordered.Count; i++)
            {
                if (ordered[i].Order == i + 1) continue;
                ordered[i].Order = i + 1;
                changed = true;
            }

            var present = new HashSet<CascadeLayer>(ordered);

            foreach (var layer in layers.Values)
            {
                if (layer.Order == Unlayered || present.Contains(layer)) continue;
                layer.Order = Unlayered;
                changed = true;
            }

            return changed;
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
        /// Keyed on the rule itself, so every pass over the same stylesheet agrees on it.
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

        private void Declare(Node root, string name)
        {
            if (string.IsNullOrEmpty(name)) return;

            var node = root;
            string path = null;

            foreach (var segment in name.Split('.'))
            {
                var trimmed = segment.Trim();
                if (trimmed.Length == 0) return;
                path = path == null ? trimmed : path + "." + trimmed;
                node = Child(node, trimmed, path);
            }
        }

        private Node Child(Node parent, string segment, string path)
        {
            if (parent.Children == null) parent.Children = new List<Node>();

            for (int i = 0; i < parent.Children.Count; i++)
                if (parent.Children[i].Segment == segment)
                    return parent.Children[i];

            var child = new Node { Segment = segment, Layer = Get(path) };
            parent.Children.Add(child);
            return child;
        }

        private static void Visit(Node node, List<CascadeLayer> ordered)
        {
            if (node.Children == null) return;

            foreach (var child in node.Children)
            {
                // Depth first, and the layer itself only after its sub-layers: within one layer the
                // same rule applies again, so its own rules outrank anything it nests.
                Visit(child, ordered);
                ordered.Add(child.Layer);
            }
        }
    }
}
