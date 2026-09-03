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
                parsed = Context.Parser.Parse(style ?? "");
            }

            Parsed = parsed;
        }

        private static readonly Regex MediaConditionRegex = new Regex(@"@media\s*([^\{]*){.*");

        private CascadeLayers Layers = new CascadeLayers();

        private void ProcessParsed(Stylesheet stylesheet)
        {
            using (ReactProfiling.ProcessStyles.Auto())
            {
                MediaQueries.Clear();
                Keyframes.Clear();
                FontFamilies.Clear();
                Declarations.Clear();

                Layers = new CascadeLayers();

                if (stylesheet == null) return;

                // Layer order has to be settled before any rule is indexed, because a layer's place
                // can depend on a name that only appears further down the sheet.
                CollectLayers(stylesheet.Children, null);
                ProcessRules(stylesheet.Children, null, null, null);
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
                    Layers.Declare(nested);
                    CollectLayers(layerRule.Rules, nested);
                }
                else if (child is IRule rule && rule.Type == RuleType.LayerStatement)
                {
                    foreach (var name in CascadeLayers.ParseStatement(rule))
                        Layers.Declare(Layers.Qualify(layerPath, name));
                }
                else if (child is IGroupingRule grouping)
                {
                    CollectLayers(grouping.Rules, layerPath);
                }
            }
        }

        private void ProcessRules(IEnumerable<IStylesheetNode> children, MediaQueryList media, string mediaCondition, string layerPath)
        {
            foreach (var child in children)
            {
                if (child is IMediaRule mediaRule)
                {
                    var match = MediaConditionRegex.Match(mediaRule.StylesheetText.Text);

                    if (match.Groups.Count < 2) continue;

                    // A nested @media matches only when both conditions do, same as joining them with "and".
                    var condition = match.Groups[1].Value;
                    if (!string.IsNullOrWhiteSpace(mediaCondition)) condition = mediaCondition.Trim() + " and " + condition.Trim();

                    var mql = MediaQueryList.Create(Context.MediaProvider, condition, Context.Context);

                    ProcessRules(mediaRule.Rules, mql, condition, layerPath);

                    MediaQueries.Add(mql);
                }
                else if (child is ISupportsRule supportsRule)
                {
                    // The condition is evaluated here rather than through ExCSS, which only knows
                    // which properties and values the web supports.
                    if (SupportsCondition.Evaluate(supportsRule.ConditionText))
                        ProcessRules(((IGroupingRule) supportsRule).Rules, media, mediaCondition, layerPath);
                }
                else if (child is ILayerRule layerRule)
                {
                    // The block's rules are ordinary rules; only their place in the cascade differs,
                    // and CollectLayers has already worked that out.
                    ProcessRules(layerRule.Rules, media, mediaCondition, Layers.Qualify(layerPath, layerRule));
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
                    AddStyleRule(str, media, mediaCondition, layerPath);
                }
            }
        }

        /// <summary>
        /// A style rule and the rules nested inside it, whose selectors the parser has already
        /// resolved against their parent's. They come after the parent's own declarations, as in
        /// CSS, and share its layer and media context.
        /// </summary>
        private void AddStyleRule(StyleRule rule, MediaQueryList media, string mediaCondition, string layerPath)
        {
            // An at-rule that cannot nest inside a style rule -- @container, for one -- is parsed as
            // a style rule with no selector at all, and a selectorless rule would match every
            // element. Dropping it leaves the block ignored, which is what it was before.
            if (!string.IsNullOrWhiteSpace(rule.SelectorText))
            {
                var dcl = Context.StyleTree.AddStyle(rule, ImportanceOffset, media, Scope, Layers.Order(layerPath));
                Declarations.AddRange(dcl);
            }

            // A nested @media or @supports arrives as the conditional rule it is, holding an
            // implicit rule with this one's selector, so the ordinary path handles it.
            foreach (var nested in rule.NestedRules)
            {
                if (nested is StyleRule nestedRule) AddStyleRule(nestedRule, media, mediaCondition, layerPath);
                else ProcessRules(new IStylesheetNode[] { nested }, media, mediaCondition, layerPath);
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
