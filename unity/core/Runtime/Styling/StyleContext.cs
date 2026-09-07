using System.Collections.Generic;
using System.Linq;
using ExCSS;
using ReactUnity.Helpers.Visitors;
using ReactUnity.Styling.Rules;
using ReactUnity.Types;

namespace ReactUnity.Styling
{
    public class StyleContext
    {
        public readonly ReactContext Context;
        public readonly IMediaProvider MediaProvider;
        public readonly StylesheetParser Parser;
        public readonly StyleTree StyleTree;

        /// <summary>
        /// Layer order for the whole context. Every stylesheet shares it, so a layer name means the
        /// same layer in all of them and takes its place from the first sheet that mentions it.
        /// </summary>
        internal readonly CascadeLayers Layers = new CascadeLayers();
        public readonly List<Dictionary<string, FontReference>> FontFamilies = new List<Dictionary<string, FontReference>>();
        public readonly List<Dictionary<string, KeyframeList>> Keyframes = new List<Dictionary<string, KeyframeList>>();
        public readonly List<Dictionary<string, RegisteredProperty>> RegisteredProperties = new List<Dictionary<string, RegisteredProperty>>();
        public readonly List<StyleSheet> StyleSheets = new List<StyleSheet>();

        /// <summary>Every element a size query or a container unit has measured, checked after each layout.</summary>
        internal readonly List<IReactComponent> SizeContainers = new List<IReactComponent>();

        public StyleContext(ReactContext context)
        {
            Context = context;
            Parser = Context.StyleParser;
            MediaProvider = Context.MediaProvider;
            StyleTree = new StyleTree();

            // light-dark() reads the preferred scheme while resolving, so a change to it is a restyle.
            if (MediaProvider != null)
            {
                preferredScheme = MediaProvider.GetValue("prefers-color-scheme");
                MediaProvider.OnUpdate += OnMediaUpdate;

                // The provider may outlive this context, and a seed from a host that is gone should not.
                Context.Disposables.Add(() => {
                    MediaProvider.OnUpdate -= OnMediaUpdate;
                    SeedColorScheme(ColorScheme.Normal);
                });
            }
        }

        private string preferredScheme;

        private void OnMediaUpdate(IMediaProvider provider)
        {
            // A reload replaces the style context; the one it replaced has nothing left to restyle.
            if (Context.Style != this) return;

            var scheme = provider.GetValue("prefers-color-scheme");
            if (scheme == preferredScheme) return;
            preferredScheme = scheme;
            ResolveStyle();
        }

        /// <summary>
        /// The host's <c>color-scheme</c>, made the default <c>prefers-color-scheme</c>. A single
        /// scheme seeds it, and anything else hands the feature back to whatever set it before.
        /// </summary>
        public void SeedColorScheme(ColorScheme scheme)
        {
            if (!(MediaProvider is DefaultMediaProvider provider)) return;
            provider.SeedValue("prefers-color-scheme", scheme == ColorScheme.Light ? "light" : scheme == ColorScheme.Dark ? "dark" : null);
        }

        /// <summary>
        /// Restyles the subtree of every tracked container whose content box changed since it was
        /// last read, and applies the result at once so that the layout can be run again on it.
        /// Returns whether any did.
        /// </summary>
        internal bool RestyleResizedContainers()
        {
            List<IReactComponent> changed = null;

            for (int i = SizeContainers.Count - 1; i >= 0; i--)
            {
                var container = SizeContainers[i];
                var state = container.StateStyles?.QueryContainer;

                // Nothing read it since its subtree was last restyled, so it is no longer a container anyone measures.
                if (container.Destroyed || state == null || !state.TracksSize)
                {
                    if (state != null) state.Listed = false;
                    SizeContainers.RemoveAt(i);
                    continue;
                }

                ContainerQuery.GetContentSize(container, out var width, out var height);
                if (width == state.Width && height == state.Height) continue;

                state.Width = width;
                state.Height = height;
                (changed ?? (changed = new List<IReactComponent>())).Add(container);
            }

            if (changed == null) return false;

            // A changed container inside another is restyled along with it.
            foreach (var container in changed)
            {
                if (HasAncestorIn(container, changed)) continue;
                container.MarkForStyleResolving(true);
                container.Accept(UpdateVisitor.Instance);
            }

            return true;
        }

        private static bool HasAncestorIn(IReactComponent component, List<IReactComponent> set)
        {
            for (var parent = component.Parent; parent != null; parent = parent.Parent)
                if (set.Contains(parent)) return true;
            return false;
        }

        public void ResolveStyle(IReactComponent scope = null)
        {
            if (!Context.IsDisposed)
                (scope ?? Context.Host)?.MarkForStyleResolving(true);
        }

        public virtual void Insert(StyleSheet sheet)
        {
            StyleSheets.Add(sheet);
            RebuildLayers();
            sheet.Attached = true;
            sheet.ResolveEnabled();
        }

        public virtual void Remove(StyleSheet sheet)
        {
            StyleSheets.Remove(sheet);
            RebuildLayers();
            sheet.Attached = false;
            sheet.ResolveEnabled();
        }

        /// <summary>
        /// Settles the layer order over the attached stylesheets, and works out the specificity of
        /// every rule again if that moved a layer. Which sheets are attached is what decides the
        /// order, so this runs whenever that changes -- including when one is reparsed.
        /// </summary>
        internal void RebuildLayers()
        {
            if (Layers.Rebuild(StyleSheets.Select(x => x.LayerNames))) StyleTree.RefreshLayers();
        }

        public FontReference GetFontFamily(string name)
        {
            for (int i = FontFamilies.Count - 1; i >= 0; i--)
            {
                var list = FontFamilies[i];
                if (list.TryGetValue(name, out var found)) return found;
            }
            return null;
        }

        public KeyframeList GetKeyframes(string name)
        {
            for (int i = Keyframes.Count - 1; i >= 0; i--)
            {
                var list = Keyframes[i];
                if (list.TryGetValue(name, out var found)) return found;
            }
            return null;
        }

        /// <summary>
        /// The <c>@property</c> registration for a custom property, or null when it has none. The
        /// last sheet to register a name is the one that counts, as with keyframes and fonts.
        /// </summary>
        public RegisteredProperty GetRegisteredProperty(string name)
        {
            for (int i = RegisteredProperties.Count - 1; i >= 0; i--)
            {
                var list = RegisteredProperties[i];
                if (list.TryGetValue(name, out var found)) return found;
            }
            return null;
        }
    }
}
