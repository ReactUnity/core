using System;
using System.Collections.Generic;
using System.Linq;
using ExCSS;
using ReactUnity.Helpers.Visitors;
using ReactUnity.Styling.Computed;
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
        public readonly List<Dictionary<string, List<FontFace>>> FontFamilies = new List<Dictionary<string, List<FontFace>>>();
        public readonly List<Dictionary<string, KeyframeList>> Keyframes = new List<Dictionary<string, KeyframeList>>();
        public readonly List<Dictionary<string, RegisteredProperty>> RegisteredProperties = new List<Dictionary<string, RegisteredProperty>>();
        public readonly List<StyleSheet> StyleSheets = new List<StyleSheet>();

        /// <summary>Every element a size query, a container unit or a scroll-state query has read, checked after each layout.</summary>
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
        /// Restyles the subtree of every tracked container whose content box, scrollable edges or stuck
        /// edges changed since they were last read, and applies the result at once so that the layout
        /// can be run again on it. Returns whether any did.
        /// </summary>
        internal bool RestyleResizedContainers()
        {
            List<IReactComponent> changed = null;

            for (int i = SizeContainers.Count - 1; i >= 0; i--)
            {
                var container = SizeContainers[i];
                var state = container.StateStyles?.QueryContainer;

                // Nothing read it since its subtree was last restyled, so it is no longer a container anyone measures.
                if (container.Destroyed || state == null || (!state.TracksSize && !state.TracksScroll))
                {
                    if (state != null) state.Listed = false;
                    SizeContainers.RemoveAt(i);
                    continue;
                }

                var moved = false;

                if (state.TracksSize)
                {
                    ContainerQuery.GetContentSize(container, out var width, out var height);
                    if (width != state.Width || height != state.Height)
                    {
                        state.Width = width;
                        state.Height = height;
                        moved = true;
                    }
                }

                if (state.TracksScroll)
                {
                    var scrollable = ContainerQuery.GetScrollable(container);
                    if (scrollable != state.Scrollable)
                    {
                        state.Scrollable = scrollable;
                        moved = true;
                    }

                    var stuck = container.StuckEdges;
                    if (stuck != state.Stuck)
                    {
                        state.Stuck = stuck;
                        moved = true;
                    }
                }

                if (moved) (changed ?? (changed = new List<IReactComponent>())).Add(container);
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
            if (sheet.CustomMedia.Count > 0) RefreshCustomMedia();
        }

        public virtual void Remove(StyleSheet sheet)
        {
            StyleSheets.Remove(sheet);
            RebuildLayers();
            sheet.Attached = false;
            sheet.ResolveEnabled();
            if (sheet.CustomMedia.Count > 0) RefreshCustomMedia();
        }

        /// <summary>
        /// The definition of a <c>@custom-media</c> name over the attached sheets, or null when
        /// none declares it. The last sheet to declare a name is the one that counts, as in CSS.
        /// </summary>
        internal MediaNode GetCustomMedia(string name)
        {
            for (int i = StyleSheets.Count - 1; i >= 0; i--)
            {
                if (StyleSheets[i].CustomMedia.TryGetValue(name, out var found)) return found;
            }
            return null;
        }

        /// <summary>
        /// A media query caches its match while it is listened to and only revisits it when the
        /// provider changes, so a definition coming or going has to ask every query to look again.
        /// </summary>
        internal void RefreshCustomMedia()
        {
            foreach (var sheet in StyleSheets)
            {
                sheet.Media?.Refresh();
                foreach (var query in sheet.MediaQueries) query.Refresh();
            }
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

        /// <summary>The regular upright face of a family, which is what a name on its own asks for.</summary>
        public FontReference GetFontFamily(string name) => GetFontFace(name, FontFace.NormalWeight, false)?.Reference;

        /// <summary>
        /// The face of <paramref name="name"/> that best fits the weight and slope, over every attached
        /// sheet, or null when no sheet declares the family. Later rules win a tie, as the cascade does.
        /// </summary>
        public FontFace GetFontFace(string name, int weight, bool italic)
        {
            if (name == null) return null;

            FontFace best = null;
            var bestScore = int.MaxValue;

            for (int i = 0; i < FontFamilies.Count; i++)
            {
                if (!FontFamilies[i].TryGetValue(name, out var faces)) continue;

                for (int j = 0; j < faces.Count; j++)
                {
                    var score = faces[j].MatchScore(weight, italic);
                    if (score > bestScore) continue;

                    bestScore = score;
                    best = faces[j];
                }
            }

            return best;
        }

        /// <summary>
        /// The reference a <c>font-family</c> list resolves to for one weight and slope. Cached, because
        /// the resolution is read on every style pass and its result is compared by identity -- a fresh
        /// one each time would reload the font asset every frame.
        /// </summary>
        internal FontReference ResolveFontFamily(ComputedFontFamily list, int weight, bool italic)
        {
            var key = new FontQuery(list, weight, italic);
            if (ResolvedFonts.TryGetValue(key, out var cached)) return cached;

            List<FontCandidate> candidates = null;

            for (int i = 0; i < list.Entries.Count; i++)
            {
                var entry = list.Entries[i];

                if (entry is FontReference direct)
                {
                    (candidates ??= new List<FontCandidate>()).Add(new FontCandidate(direct));
                    continue;
                }

                var face = GetFontFace(entry as string, weight, italic);
                if (face == null) continue;

                (candidates ??= new List<FontCandidate>()).Add(
                    new FontCandidate(face.Reference, face.Weight == weight, face.Italic == italic));
            }

            var resolved = candidates == null ? FontReference.None : new FontFamilyReference(candidates);
            return ResolvedFonts[key] = resolved;
        }

        private readonly Dictionary<FontQuery, FontReference> ResolvedFonts = new Dictionary<FontQuery, FontReference>();

        /// <summary>Discards the resolutions, which a sheet coming or going may have changed.</summary>
        internal void RefreshFontFamilies() => ResolvedFonts.Clear();

        private struct FontQuery : IEquatable<FontQuery>
        {
            private readonly ComputedFontFamily List;
            private readonly int Weight;
            private readonly bool Italic;

            public FontQuery(ComputedFontFamily list, int weight, bool italic)
            {
                List = list;
                Weight = weight;
                Italic = italic;
            }

            public bool Equals(FontQuery other) => Weight == other.Weight && Italic == other.Italic && List.Equals(other.List);
            public override bool Equals(object obj) => obj is FontQuery other && Equals(other);
            public override int GetHashCode() => (List.GetHashCode() * 397 ^ Weight) * 2 + (Italic ? 1 : 0);
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
