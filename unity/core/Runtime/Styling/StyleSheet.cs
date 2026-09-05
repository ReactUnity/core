using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using ExCSS;
using ReactUnity.Helpers;
using ReactUnity.Styling.Converters;
using ReactUnity.Styling.Rules;
using ReactUnity.Types;

namespace ReactUnity.Styling
{
    public partial class StyleSheet
    {
        public readonly StyleContext Context;
        public readonly IReactComponent Scope;
        public readonly int ImportanceOffset;
        public readonly MediaQueryList Media;

        public readonly Dictionary<string, FontReference> FontFamilies = new Dictionary<string, FontReference>();
        public readonly Dictionary<string, KeyframeList> Keyframes = new Dictionary<string, KeyframeList>();
        public readonly Dictionary<string, RegisteredProperty> RegisteredProperties = new Dictionary<string, RegisteredProperty>();
        public readonly List<MediaQueryList> MediaQueries = new List<MediaQueryList>();
        public readonly List<Tuple<RuleTreeNode<StyleData>, Dictionary<IStyleProperty, object>>> Declarations = new List<Tuple<RuleTreeNode<StyleData>, Dictionary<IStyleProperty, object>>>();

        internal Stylesheet parsed;
        internal Stylesheet Parsed
        {
            get => parsed;
            set
            {
                if (parsed == value) return;

                if (parsed != null)
                {
                    parsed = null;
                    ResolveEnabled();
                }

                parsed = value;
                ProcessParsed(Parsed);
                ResolveEnabled();
            }
        }

        private bool attached = false;

        public bool Attached
        {
            get => attached;
            set
            {
                if (attached == value) return;
                attached = value;
                ResolveEnabled();
            }
        }

        private bool enabled = true;

        public bool Enabled
        {
            get => enabled;
            set
            {
                if (enabled == value) return;
                enabled = value;
                ResolveEnabled();
            }
        }

        private bool currentEnabled = false;

        public StyleSheet(StyleContext context, string style, int importanceOffset = 0, IReactComponent scope = null, string media = null)
        {
            Context = context;
            Scope = scope;
            ImportanceOffset = importanceOffset;

            if (!string.IsNullOrWhiteSpace(media))
            {
                Media = MediaQueryList.Create(Context.MediaProvider, media, Context.Context);
                Media.OnUpdate += ResolveEnabled;
            }

            Parse(style);
        }

        internal void ResolveEnabled()
        {
            var newEnabled = enabled && attached && (Media == null || Media.matches) && Parsed != null;

            if (newEnabled == currentEnabled) return;

            currentEnabled = newEnabled;
            if (newEnabled) Enable();
            else Disable();
        }

        internal void RefreshParsed()
        {
            var oldParsed = Parsed;
            Parsed = null;
            Parsed = oldParsed;
        }

        internal void Parse(string style)
        {
            Stylesheet parsed;
            using (ReactProfiling.ParseStyles.Auto())
            {
                parsed = Context.Parser.Parse(ContainerQuery.PrepareForParser(style ?? ""));
            }

            Parsed = parsed;
        }

        private static readonly Regex MediaConditionRegex = new Regex(@"@media\s*([^\{]*){.*");

        // Document-wide, so a layer name is the same layer in every sheet.
        private CascadeLayers Layers => Context.Layers;

        /// <summary>
        /// Every layer name this sheet declares, in the order it declares them. The context orders
        /// the layers of all its sheets from these lists.
        /// </summary>
        internal readonly List<string> LayerNames = new List<string>();

        private void ProcessParsed(Stylesheet stylesheet)
        {
            using (ReactProfiling.ProcessStyles.Auto())
            {
                MediaQueries.Clear();
                Keyframes.Clear();
                FontFamilies.Clear();
                RegisteredProperties.Clear();
                Declarations.Clear();
                LayerNames.Clear();

                if (stylesheet == null) return;

                // The names are collected in their own pass, because a rule can be in a layer whose
                // place is only settled by a name further down the sheet -- or in another sheet.
                CollectLayers(stylesheet.Children, null);
                ProcessRules(stylesheet.Children, null, null, null);

                // The names this sheet contributes have changed, so the order they take part in is
                // worked out again.
                Context.RebuildLayers();
            }
        }

        /// <summary>
        /// Registers every layer the sheet mentions, in the order it mentions them. Conditional
        /// blocks are walked into unconditionally: a @media condition can flip at runtime, and
        /// letting that reshuffle the layer order would move rules that have nothing to do with it.
        /// </summary>
        private void CollectLayers(IEnumerable<IStylesheetNode> children, string layerPath)
        {
            foreach (var child in children)
            {
                if (child is ILayerRule layerRule)
                {
                    var nested = Layers.Qualify(layerPath, layerRule);
                    LayerNames.Add(nested);
                    CollectLayers(layerRule.Rules, nested);
                }
                else if (child is IRule rule && rule.Type == RuleType.LayerStatement)
                {
                    foreach (var name in CascadeLayers.ParseStatement(rule))
                        LayerNames.Add(Layers.Qualify(layerPath, name));
                }
                else if (child is IGroupingRule grouping)
                {
                    CollectLayers(grouping.Rules, layerPath);
                }
            }
        }

        private void ProcessRules(IEnumerable<IStylesheetNode> children, MediaQueryList media, string mediaCondition, string layerPath, ContainerQuery container = null)
        {
            foreach (var child in children)
            {
                if (child is IMediaRule mediaRule)
                {
                    var match = MediaConditionRegex.Match(mediaRule.StylesheetText.Text);

                    if (match.Groups.Count < 2) continue;

                    // A nested @media matches only when both conditions do, same as joining them with "and".
                    var condition = match.Groups[1].Value;

                    // A @container block, dressed as @media so the parser keeps it wherever it is nested.
                    if (ContainerQuery.TryDecodePrelude(condition, out var prelude))
                    {
                        ProcessRules(mediaRule.Rules, media, mediaCondition, layerPath, ContainerQuery.Parse(prelude, container));
                        continue;
                    }

                    if (!string.IsNullOrWhiteSpace(mediaCondition)) condition = mediaCondition.Trim() + " and " + condition.Trim();

                    var mql = MediaQueryList.Create(Context.MediaProvider, condition, Context.Context);

                    ProcessRules(mediaRule.Rules, mql, condition, layerPath, container);

                    MediaQueries.Add(mql);
                }
                else if (child is ISupportsRule supportsRule)
                {
                    // The condition is evaluated here rather than through ExCSS, which only knows
                    // which properties and values the web supports.
                    if (SupportsCondition.Evaluate(supportsRule.ConditionText))
                        ProcessRules(((IGroupingRule) supportsRule).Rules, media, mediaCondition, layerPath, container);
                }
                else if (child is ILayerRule layerRule)
                {
                    // The block's rules are ordinary rules; only their place in the cascade differs,
                    // and CollectLayers has already worked that out.
                    ProcessRules(layerRule.Rules, media, mediaCondition, Layers.Qualify(layerPath, layerRule), container);
                }
                else if (child is IPropertyRule propertyRule)
                {
                    // An invalid @property rule is ignored, which is all Create says by returning null.
                    var registered = RegisteredProperty.Create(propertyRule);
                    if (registered != null) RegisteredProperties[registered.Name] = registered;
                }
                else if (child is IKeyframesRule kfs)
                {
                    Keyframes[kfs.Name] = KeyframeList.Create(kfs);
                }
                else if (child is IFontFaceRule ffr)
                {
                    FontFamilies[StringConverter.Normalize(ffr.Family)] =
                        AllConverters.FontReferenceConverter.TryGetConstantValue(ffr.Source, FontReference.None);
                }
                else if (child is StyleRule str)
                {
                    AddStyleRule(str, media, mediaCondition, layerPath, container);
                }
            }
        }

        /// <summary>
        /// A style rule and the rules nested inside it, whose selectors the parser has already
        /// resolved against their parent's. They come after the parent's own declarations, as in
        /// CSS, and share its layer and media context.
        /// </summary>
        private void AddStyleRule(StyleRule rule, MediaQueryList media, string mediaCondition, string layerPath, ContainerQuery container)
        {
            // An at-rule that cannot nest inside a style rule -- @scope, for one -- is parsed as
            // a style rule with no selector at all, and a selectorless rule would match every
            // element. Dropping it leaves the block ignored, which is what it was before.
            if (!string.IsNullOrWhiteSpace(rule.SelectorText))
            {
                var dcl = Context.StyleTree.AddStyle(rule, ImportanceOffset, media, Scope, Layers.Get(layerPath), container);
                Declarations.AddRange(dcl);
            }

            // A nested @media or @supports arrives as the conditional rule it is, holding an
            // implicit rule with this one's selector, so the ordinary path handles it.
            foreach (var nested in rule.NestedRules)
            {
                if (nested is StyleRule nestedRule) AddStyleRule(nestedRule, media, mediaCondition, layerPath, container);
                else ProcessRules(new IStylesheetNode[] { nested }, media, mediaCondition, layerPath, container);
            }
        }

        public void AddRules(string selector, IDictionary<IStyleProperty, object> rules, bool important = false)
        {
            var dc = rules.ToDictionary(x => x.Key, x => x.Value);
            var dcl = Context.StyleTree.AddStyle(selector, important ? null : dc, important ? dc : null, ImportanceOffset, null);
            Declarations.AddRange(dcl);
        }

        public void AddRules(string selector, IDictionary<string, object> rules, bool important = false)
        {
            var dc = RuleHelpers.ConvertStyleDeclarationToRecord(rules);
            AddRules(selector, dc, important);
        }

        public void Enable()
        {
            foreach (var mql in MediaQueries)
                mql.OnUpdate += ResolveStyle;

            Context.FontFamilies.Add(FontFamilies);
            Context.Keyframes.Add(Keyframes);
            Context.RegisteredProperties.Add(RegisteredProperties);

            foreach (var dcl in Declarations)
            {
                dcl.Item1.Data.Rules.Add(dcl.Item2);
            }

            ResolveStyle();
        }

        public void Disable()
        {
            foreach (var mql in MediaQueries)
                mql.OnUpdate -= ResolveStyle;

            Context.FontFamilies.Remove(FontFamilies);
            Context.Keyframes.Remove(Keyframes);
            Context.RegisteredProperties.Remove(RegisteredProperties);

            foreach (var dcl in Declarations)
            {
                dcl.Item1.Data.Rules.Remove(dcl.Item2);
            }

            ResolveStyle();
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public void ResolveStyle() => Context.ResolveStyle(Scope);
    }
}
