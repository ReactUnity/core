using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using ExCSS;
using ReactUnity.DomProxies;
using ReactUnity.Helpers;
using ReactUnity.Scheduling;
using ReactUnity.StyleEngine;
using ReactUnity.Styling;
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
        public IHostComponent Host { get; protected set; }
        public GlobalRecord Globals { get; private set; }
        public bool IsDevServer { get; }

        public ScriptSource Script { get; }
        public ITimer Timer { get; }
        public IDispatcher Dispatcher { get; }
        public virtual Dictionary<string, Type> StateHandlers { get; }
        public Location Location { get; }
        public IMediaProvider MediaProvider { get; }

        public Action OnRestart;
        public readonly StylesheetParser Parser;
        public readonly StyleContext Style;

        public List<IDisposable> Disposables = new List<IDisposable>();

        public virtual CursorSet CursorSet { get; }
        public CursorAPI CursorAPI { get; }

        public ReactContext(
            GlobalRecord globals, ScriptSource script, IDispatcher dispatcher,
            ITimer timer, IMediaProvider mediaProvider, bool isDevServer,
            Action onRestart, bool calculatesLayout
        )
        {
            Globals = globals;
            Script = script;
            IsDevServer = isDevServer;
            Timer = timer;
            Dispatcher = dispatcher;
            OnRestart = onRestart ?? (() => { });
            CalculatesLayout = calculatesLayout;
            Location = new Location(this);
            MediaProvider = mediaProvider;
            CursorAPI = new CursorAPI(this);

            Parser = new StylesheetParser(true, true, true, true, true, false, true);
            Style = new StyleContext(this);

            var updateVisitor = new UpdateVisitor();
            Dispatcher.OnEveryUpdate(() => Host.Accept(updateVisitor));

            if (CalculatesLayout) dispatcher.OnEveryLateUpdate(() => Host.Layout.CalculateLayout());
        }

        public virtual StyleSheet InsertStyle(string style, int importanceOffset = 0)
        {
            var sheet = new StyleSheet(Style, style, importanceOffset);
            Style.Insert(sheet);
            return sheet;
        }

        public virtual void RemoveStyle(StyleSheet sheet)
        {
            Style.Remove(sheet);
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
