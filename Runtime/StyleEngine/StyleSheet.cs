using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using ExCSS;
using ReactUnity.Converters;
using ReactUnity.Styling;
using ReactUnity.Types;

namespace ReactUnity.StyleEngine
{
    public class StyleSheet
    {
        public readonly StyleContext Context;
        public readonly int ImportanceOffset;
        public readonly Dictionary<string, FontReference> FontFamilies = new Dictionary<string, FontReference>();
        public readonly Dictionary<string, KeyframeList> Keyframes = new Dictionary<string, KeyframeList>();
        public List<MediaQueryList> MediaQueries = new List<MediaQueryList>();
        public List<Tuple<RuleTreeNode<StyleData>, Dictionary<IStyleProperty, object>>> Declarations = new List<Tuple<RuleTreeNode<StyleData>, Dictionary<IStyleProperty, object>>>();

        public StyleSheet(StyleContext context, string style, int importanceOffset = 0, IReactComponent scope = null)
        {
            Context = context;
            ImportanceOffset = importanceOffset;

            Initialize(style, scope);
        }

        private void Initialize(string style, IReactComponent scope)
        {
            if (string.IsNullOrWhiteSpace(style)) return;

            var stylesheet = Context.Parser.Parse(style);

            foreach (var child in stylesheet.Children)
            {
                if (child is IMediaRule media)
                {
                    var mediaRegex = new Regex(@"@media ([^\{]*){.*");
                    var match = mediaRegex.Match(media.StylesheetText.Text);

                    if (match.Groups.Count < 2) continue;

                    var condition = match.Groups[1];
                    var mql = MediaQueryList.Create(Context.MediaProvider, condition.Value);

                    foreach (var rule in media.Children.OfType<StyleRule>())
                    {
                        var dcl = Context.StyleTree.AddStyle(rule, ImportanceOffset, mql, scope);
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
                    FontFamilies[AllConverters.StringConverter.Convert(ffr.Family) as string] =
                        AllConverters.FontReferenceConverter.Convert(ffr.Source) as FontReference;
                }
                else if (child is StyleRule str)
                {
                    var dcl = Context.StyleTree.AddStyle(str, ImportanceOffset, null, scope);
                    Declarations.AddRange(dcl);
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
                mql.OnUpdate += Context.ResolveStyle;

            Context.FontFamilies.Add(FontFamilies);
            Context.Keyframes.Add(Keyframes);

            foreach (var dcl in Declarations)
            {
                dcl.Item1.Data.Rules.Add(dcl.Item2);
            }

            Context.ResolveStyle();
        }

        public void Disable()
        {
            foreach (var mql in MediaQueries)
                mql.OnUpdate -= Context.ResolveStyle;

            Context.FontFamilies.Remove(FontFamilies);
            Context.Keyframes.Remove(Keyframes);

            foreach (var dcl in Declarations)
            {
                dcl.Item1.Data.Rules.Remove(dcl.Item2);
            }

            Context.ResolveStyle();
        }
    }
}
