using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using ExCSS;
using ReactUnity.Helpers;
using ReactUnity.Helpers.Visitors;
using ReactUnity.Html;
using ReactUnity.Scheduling;
using ReactUnity.Scripting;
using ReactUnity.Scripting.DomProxies;
using ReactUnity.Styling;
using ReactUnity.Styling.Rules;
using UnityEngine;

namespace ReactUnity
{
    public abstract class ReactContext : IDisposable
    {
        public class Options
        {
            public SerializableDictionary Globals;
            public ScriptSource Source;
            public ITimer Timer;
            public IMediaProvider MediaProvider;
            public Action OnRestart;
            public JavascriptEngineType EngineType;
            public bool Debug;
            public bool AwaitDebugger;
            public virtual bool CalculatesLayout { get; }
        }

        protected static Regex ExtensionRegex = new Regex(@"\.\w+$");
        protected static Regex ResourcesRegex = new Regex(@"resources(/|\\)", RegexOptions.IgnoreCase);

        public bool CalculatesLayout { get; }
        public IHostComponent Host { get; protected set; }
        public GlobalRecord Globals { get; private set; }
        public bool IsDisposed { get; private set; }

        public Options options { get; }
        public ScriptSource Source { get; }
        public ITimer Timer { get; }
        public IDispatcher Dispatcher { get; }
        public virtual Dictionary<string, Type> StateHandlers { get; }
        public Location Location { get; }
        public LocalStorage LocalStorage { get; }
        public IMediaProvider MediaProvider { get; }
        public Action OnRestart { get; }
        public StylesheetParser StyleParser { get; }
        public StyleContext Style { get; }
        public ScriptContext Script { get; }
        public HtmlContext Html { get; }
        public virtual CursorSet CursorSet { get; }
        public CursorAPI CursorAPI { get; }
        public List<IDisposable> Disposables { get; } = new List<IDisposable>();

        public ReactContext(Options options)
        {
            this.options = options;
            Source = options.Source;
            Timer = options.Timer;
            Dispatcher = CreateDispatcher();
            Globals = GlobalRecord.BindSerializableDictionary(options.Globals, Dispatcher, false);
            OnRestart = options.OnRestart ?? (() => { });
            CalculatesLayout = options.CalculatesLayout;
            Location = new Location(this);
            MediaProvider = options.MediaProvider;
            CursorAPI = new CursorAPI(this);
            LocalStorage = new LocalStorage();

            StyleParser = new StylesheetParser(true, true, true, true, true, false, true);
            Style = new StyleContext(this);

            Script = new ScriptContext(this, options.EngineType, options.Debug, options.AwaitDebugger);

            Html = new HtmlContext(this);

            var updateVisitor = new UpdateVisitor();
            Dispatcher.OnEveryUpdate(() => Host.Accept(updateVisitor));

            if (CalculatesLayout) Dispatcher.OnEveryLateUpdate(() => Host.Layout.CalculateLayout());
        }

        public virtual StyleSheet InsertStyle(string style) => InsertStyle(style, 0);

        public virtual StyleSheet InsertStyle(string style, int importanceOffset)
        {
            var sheet = new StyleSheet(Style, style, importanceOffset);
            return InsertStyle(sheet);
        }

        public virtual StyleSheet InsertStyle(StyleSheet sheet)
        {
            Style.Insert(sheet);
            return sheet;
        }

        public virtual void RemoveStyle(StyleSheet sheet)
        {
            Style.Remove(sheet);
        }

        public virtual string ResolvePath(string path)
        {
            var source = Source.GetResolvedSourceUrl();
            var type = Source.EffectiveScriptSource;

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
            var src = new ScriptSource(Source);
            src.SourcePath = ResolvePath(path);
            src.Type = Source.EffectiveScriptSource;
            src.UseDevServer = Source.IsDevServer;
            return src;
        }

        private string GetResourceUrl(string fullUrl)
        {
            var splits = ResourcesRegex.Split(fullUrl);
            var url = splits[splits.Length - 1];

            return ExtensionRegex.Replace(url, "");
        }

        public abstract ITextComponent CreateText(string text);
        public abstract IReactComponent CreateDefaultComponent(string tag, string text);
        public abstract IReactComponent CreateComponent(string tag, string text);
        public abstract IReactComponent CreatePseudoComponent(string tag);
        public abstract void PlayAudio(AudioClip clip);

        public void Dispose()
        {
            IsDisposed = true;
            Host.Destroy(false);
            Dispatcher?.Dispose();
            Globals?.Dispose();
            Script?.Dispose();
            foreach (var item in Disposables) item?.Dispose();
        }

        protected virtual IDispatcher CreateDispatcher() => Application.isPlaying ? RuntimeDispatcher.Create(this) as IDispatcher : new EditorDispatcher(this);
    }
}
