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

        private void ProcessParsed(Stylesheet stylesheet)
        {
            using (ReactProfiling.ProcessStyles.Auto())
            {
                MediaQueries.Clear();
                Keyframes.Clear();
                FontFamilies.Clear();
                Declarations.Clear();

                if (stylesheet == null) return;

                foreach (var child in stylesheet.Children)
                {
                    if (child is IMediaRule media)
                    {
                        var mediaRegex = new Regex(@"@media\s*([^\{]*){.*");
                        var match = mediaRegex.Match(media.StylesheetText.Text);

                        if (match.Groups.Count < 2) continue;

                        var condition = match.Groups[1];
                        var mql = MediaQueryList.Create(Context.MediaProvider, condition.Value, Context.Context);

                        foreach (var rule in media.Children.OfType<StyleRule>())
                        {
                            var dcl = Context.StyleTree.AddStyle(rule, ImportanceOffset, mql, Scope);
                            Declarations.AddRange(dcl);
                        }
                        MediaQueries.Add(mql);
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
                        var dcl = Context.StyleTree.AddStyle(str, ImportanceOffset, null, Scope);
                        Declarations.AddRange(dcl);
                    }
                }
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
