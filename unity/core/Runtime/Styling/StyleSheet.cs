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

        /// <summary>The <c>@custom-media</c> definitions of this sheet, by name. The context resolves a name over every attached sheet.</summary>
        internal readonly Dictionary<string, MediaNode> CustomMedia = new Dictionary<string, MediaNode>();
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
                var hadCustomMedia = CustomMedia.Count > 0;
                CustomMedia.Clear();

                if (stylesheet == null)
                {
                    if (hadCustomMedia) Context.RefreshCustomMedia();
                    return;
                }

                // The names are collected in their own pass, because a rule can be in a layer whose
                // place is only settled by a name further down the sheet -- or in another sheet.
                CollectLayers(stylesheet.Children, null);
                ProcessRules(stylesheet.Children, null, null, null);

                // The names this sheet contributes have changed, so the order they take part in is
                // worked out again.
                Context.RebuildLayers();
                if (hadCustomMedia || CustomMedia.Count > 0) Context.RefreshCustomMedia();
            }
        }

        private static readonly Regex CustomMediaRegex = new Regex(@"^@custom-media\s+(--[^\s;]+)\s*([^;]*?)\s*;?\s*$", RegexOptions.IgnoreCase | RegexOptions.Singleline);

        /// <summary>
        /// A <c>@custom-media --name query;</c> statement. The parser knows no such rule and keeps it
        /// as an unknown one with its text, which is all that is needed to read it.
        /// </summary>
        private void AddCustomMedia(IRule rule)
        {
            var match = CustomMediaRegex.Match(rule.StylesheetText?.Text?.Trim() ?? "");
            if (!match.Success) return;

            // The name is case-sensitive, as every dashed ident is. Without a query it is an invalid rule, and is dropped.
            var query = match.Groups[2].Value;
            if (query.Length == 0) return;

            CustomMedia[match.Groups[1].Value] = MediaQueryList.ParseNode(query, Context.Context);
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

        private void ProcessRules(IEnumerable<IStylesheetNode> children, MediaQueryList media, string mediaCondition, string layerPath, ContainerQuery container = null, bool startingStyle = false, RuleScope scope = null)
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

                    ProcessRules(mediaRule.Rules, mql, condition, layerPath, container, startingStyle, scope);

                    MediaQueries.Add(mql);
                }
                else if (child is IContainerRule containerRule)
                {
                    // The parser keeps the prelude as written; the query grammar is this side's.
                    var prelude = string.IsNullOrEmpty(containerRule.Name) ? containerRule.ConditionText : containerRule.Name + " " + containerRule.ConditionText;
                    ProcessRules(containerRule.Rules, media, mediaCondition, layerPath, ContainerQuery.Parse(prelude, container), startingStyle, scope);
                }
                else if (child is IScopeRule scopeRule)
                {
                    // Both preludes arrive as written; a nested @scope has had its start resolved against
                    // the enclosing rule by the parser, and chains to the @scope it is in here.
                    ProcessRules(scopeRule.Rules, media, mediaCondition, layerPath, container, startingStyle, new RuleScope(scopeRule.StartText, scopeRule.EndText, scope));
                }
                else if (child is IStartingStyleRule startingStyleRule)
                {
                    // Its rules apply through :enter.
                    ProcessRules(startingStyleRule.Rules, media, mediaCondition, layerPath, container, true, scope);
                }
                else if (child is ISupportsRule supportsRule)
                {
                    // The condition is evaluated here rather than through ExCSS, which only knows
                    // which properties and values the web supports.
                    if (SupportsCondition.Evaluate(supportsRule.ConditionText, Context.Context))
                        ProcessRules(((IGroupingRule) supportsRule).Rules, media, mediaCondition, layerPath, container, startingStyle, scope);
                }
                else if (child is IRule unknown && unknown.Type == RuleType.Unknown)
                {
                    AddCustomMedia(unknown);
                }
                else if (child is ILayerRule layerRule)
                {
                    // The block's rules are ordinary rules; only their place in the cascade differs,
                    // and CollectLayers has already worked that out.
                    ProcessRules(layerRule.Rules, media, mediaCondition, Layers.Qualify(layerPath, layerRule), container, startingStyle, scope);
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
                    AddStyleRule(str, media, mediaCondition, layerPath, container, startingStyle, scope);
                }
            }
        }

        /// <summary>
        /// The selector with <c>:enter</c> on each of its branches, which is how a starting style
        /// applies: for the element's first frame, and as the state a transition starts from.
        /// </summary>
        private static string ToStartingStyleSelector(string selectorText)
        {
            var branches = RuleHelpers.SplitSelectorList(selectorText);
            for (int i = 0; i < branches.Count; i++)
            {
                var branch = branches[i].Trim();
                // A pseudo-element stays last, so the state goes on the element that owns it.
                var pseudo = PseudoElementSuffix.Match(branch);
                branches[i] = pseudo.Success ? branch.Substring(0, pseudo.Index) + ":enter" + pseudo.Value : branch + ":enter";
            }
            return string.Join(", ", branches);
        }

        private static readonly Regex PseudoElementSuffix = new Regex(@"::?(before|after)$", RegexOptions.IgnoreCase);

        /// <summary>
        /// A style rule and the rules nested inside it, whose selectors the parser has already
        /// resolved against their parent's. They come after the parent's own declarations, as in
        /// CSS, and share its layer and media context.
        /// </summary>
        private void AddStyleRule(StyleRule rule, MediaQueryList media, string mediaCondition, string layerPath, ContainerQuery container, bool startingStyle = false, RuleScope scope = null)
        {
            // An at-rule the parser does not know is parsed as a style rule with no selector at
            // all, and a selectorless rule would match every element. Dropping it leaves the block ignored.
            if (!string.IsNullOrWhiteSpace(rule.SelectorText))
            {
                var selectorText = rule.Selector.StylesheetText?.Text ?? rule.SelectorText;
                if (startingStyle) selectorText = ToStartingStyleSelector(selectorText);

                var dcl = Context.StyleTree.AddStyle(rule, ImportanceOffset, media, Scope, Layers.Get(layerPath), container, selectorText, scope);
                Declarations.AddRange(dcl);
            }

            // A nested @media, @supports, @container or @starting-style arrives as the group rule
            // it is, holding an implicit rule with this one's selector, so the ordinary path handles
            // it; so does a nested @scope, whose rules are its own.
            foreach (var nested in rule.NestedRules)
            {
                if (nested is StyleRule nestedRule) AddStyleRule(nestedRule, media, mediaCondition, layerPath, container, startingStyle, scope);
                else ProcessRules(new IStylesheetNode[] { nested }, media, mediaCondition, layerPath, container, startingStyle, scope);
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
