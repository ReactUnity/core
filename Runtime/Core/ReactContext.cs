using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using ExCSS;
using ReactUnity.Converters;
using ReactUnity.Scheduling;
using ReactUnity.DomProxies;
using ReactUnity.Helpers;
using ReactUnity.StyleEngine;
using ReactUnity.Styling;
using ReactUnity.Types;
using ReactUnity.Visitors;
using UnityEngine;

namespace ReactUnity
{
    public abstract class ReactContext : IDisposable
    {
        public enum LayoutMergeMode
        {
            Both = 0,
            LayoutOnly = 1,
            CssOnly = 2,
        }

        protected static Regex ExtensionRegex = new Regex(@"\.\w+$");
        protected static Regex ResourcesRegex = new Regex(@"resources(/|\\)", RegexOptions.IgnoreCase);

        public bool CalculatesLayout { get; }
        private LayoutMergeMode MergeLayout { get; }

        public IHostComponent Host { get; protected set; }
        public GlobalRecord Globals { get; private set; }
        public bool IsDevServer { get; }

        public ScriptSource Script { get; }
        public ITimer Timer { get; }
        public IDispatcher Dispatcher { get; }
        public virtual Dictionary<string, Type> StateHandlers { get; }
        public Location Location { get; }
        public IMediaProvider MediaProvider { get; }

        protected bool LayoutScheduled = false;

        public StylesheetParser Parser;
        public StyleTree StyleTree;
        public Action OnRestart;

        public List<IDisposable> Disposables = new List<IDisposable>();

        public Dictionary<string, FontReference> FontFamilies = new Dictionary<string, FontReference>();
        public Dictionary<string, KeyframeList> Keyframes = new Dictionary<string, KeyframeList>();

        public virtual CursorSet CursorSet { get; }
        public CursorAPI CursorAPI { get; }

        public ReactContext(
            GlobalRecord globals, ScriptSource script, IDispatcher dispatcher,
            ITimer timer, IMediaProvider mediaProvider, bool isDevServer,
            Action onRestart, LayoutMergeMode mergeLayout, bool calculatesLayout
        )
        {
            Globals = globals;
            Script = script;
            IsDevServer = isDevServer;
            Timer = timer;
            Dispatcher = dispatcher;
            OnRestart = onRestart ?? (() => { });
            MergeLayout = mergeLayout;
            CalculatesLayout = calculatesLayout;
            Location = new Location(this);
            MediaProvider = mediaProvider;
            CursorAPI = new CursorAPI(this);

            Parser = new StylesheetParser(true, true, true, true, true);
            StyleTree = new StyleTree(Parser);

            var updateVisitor = new UpdateVisitor();
            Dispatcher.OnEveryUpdate(() => Host.Accept(updateVisitor));

            if (CalculatesLayout)
            {
                Action callback = () => {
                    if (LayoutScheduled)
                    {
                        Host?.Layout?.CalculateLayout();
                        LayoutScheduled = false;
                    }
                };
                dispatcher.OnEveryLateUpdate(callback);
            }
        }


        public virtual void ScheduleLayout()
        {
            LayoutScheduled = true;
        }

        public virtual void InsertStyle(string style, int importanceOffset = 0)
        {
            if (string.IsNullOrWhiteSpace(style)) return;

            var stylesheet = StyleTree.Parser.Parse(style);

            foreach (var rule in stylesheet.FontfaceSetRules)
            {
                FontFamilies[(AllConverters.StringConverter.Convert(rule.Family) as string).ToLowerInvariant()] =
                    AllConverters.FontReferenceConverter.Convert(rule.Source) as FontReference;
            }

            foreach (var rule in stylesheet.StyleRules.OfType<StyleRule>())
            {
                StyleTree.AddStyle(rule, importanceOffset, MergeLayout);
            }

            foreach (var rule in stylesheet.Children.OfType<IKeyframesRule>())
            {
                Keyframes[rule.Name] = KeyframeList.Create(rule);
            }


            foreach (var media in stylesheet.MediaRules.OfType<IMediaRule>())
            {
                var mediaRegex = new Regex(@"@media ([^\{]*){.*");
                var match = mediaRegex.Match(media.StylesheetText.Text);

                if (match.Groups.Count < 2) continue;

                var condition = match.Groups[1];
                var mql = MediaQueryList.Create(MediaProvider, condition.Value);

                foreach (var rule in media.Children.OfType<StyleRule>())
                {
                    StyleTree.AddStyle(rule, importanceOffset, MergeLayout, mql);
                }
                mql.OnUpdate += MediaQueryUpdated;
            }

            Host.ResolveStyle(true);
        }

        private void MediaQueryUpdated()
        {
            Host.ResolveStyle(true);
        }

        public virtual void RemoveStyle(string style)
        {
        }

        public virtual string ResolvePath(string path)
        {
            var source = Script.GetResolvedSourceUrl();
            var type = Script.EffectiveScriptSource;

            if (type == ScriptSourceType.Url)
            {
                var baseUrl = new Uri(source);
                if (Uri.TryCreate(baseUrl, path, out var res)) return res.AbsoluteUri;
            }
            else if (type == ScriptSourceType.File || type == ScriptSourceType.Resource)
            {
                var lastSlash = source.LastIndexOfAny(new[] { '/', '\\' });
                var parent = source.Substring(0, lastSlash);

                var res = parent + (path.StartsWith("/") ? path : "/" + path);
                if (type == ScriptSourceType.Resource) return GetResourceUrl(res);
                return res;
            }
            else
            {
                // TODO: write path rewriting logic
            }

            return null;
        }

        public virtual ScriptSource CreateStaticScript(string path)
        {
            var src = new ScriptSource();
            src.Type = IsDevServer ? ScriptSourceType.Url : Script.Type;
            src.UseDevServer = IsDevServer;
            src.SourcePath = ResolvePath(path);

            return src;
        }

        private string GetResourceUrl(string fullUrl)
        {
            var splits = ResourcesRegex.Split(fullUrl);
            var url = splits[splits.Length - 1];

            return ExtensionRegex.Replace(url, "");
        }

        public abstract ITextComponent CreateText(string text);
        public abstract IReactComponent CreateComponent(string tag, string text);
        public abstract IReactComponent CreatePseudoComponent(string tag);
        public abstract void PlayAudio(AudioClip clip);

        public void Dispose()
        {
            Dispatcher?.Dispose();
            foreach (var item in Disposables) item?.Dispose();
        }
    }
}
