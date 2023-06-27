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
    public abstract partial class ReactContext : IDisposable
    {
        public enum PoolingType
        {
            None = 0,
            Basic = 1,
            All = 2,
        }

        public enum UnknownPropertyHandling
        {
            None = 0,
            Log = 1,
            Warn = 2,
            Error = 3,
            Exception = 4,
        }

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
            public Action BeforeStart;
            public Action AfterStart;
            public PoolingType Pooling;
            public UnknownPropertyHandling UnknownPropertyHandling;

            public virtual bool CalculatesLayout { get; }
        }

        protected static Regex ExtensionRegex = new Regex(@"\.\w+$");
        protected static Regex ResourcesRegex = new Regex(@"resources(/|\\)", RegexOptions.IgnoreCase);

        public bool CalculatesLayout { get; }
        public IHostComponent Host { get; protected set; }
        public HashSet<IReactComponent> DetachedRoots { get; protected set; } = new HashSet<IReactComponent>();
        public GlobalRecord Globals { get; private set; }
        public bool IsDisposed { get; private set; }
        public virtual bool IsEditorContext => false;

        public Options options { get; }
        public ScriptSource Source { get; }
        public ITimer Timer { get; }
        public IDispatcher Dispatcher { get; }
        public virtual Dictionary<string, Type> StateHandlers { get; }
        public Location Location { get; private set; }
        public LocalStorage LocalStorage { get; }
        public IMediaProvider MediaProvider { get; }
        public Action OnRestart { get; }
        public StylesheetParser StyleParser { get; }
        public StyleContext Style { get; private set; }
        public ScriptContext Script { get; private set; }
        public HtmlContext Html { get; }
        public virtual CursorSet CursorSet { get; }
        public CursorAPI CursorAPI { get; }
        public List<Action> Disposables { get; } = new List<Action>();

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
            Style = CreateStyleContext();

            Html = new HtmlContext(this);

            Dispatcher.OnEveryUpdate(UpdateElementsRecursively);
            Dispatcher.OnEveryLateUpdate(LateUpdateElementsRecursively);

            if (CalculatesLayout) Dispatcher.OnEveryLateUpdate(() => {
                Host?.Layout.CalculateLayout();
                foreach (var dr in DetachedRoots) dr.Layout.CalculateLayout();
            });

#if UNITY_EDITOR
            // Runtime contexts are disposed on reload (by OnDisable), but this is required for editor contexts 
            UnityEditor.AssemblyReloadEvents.beforeAssemblyReload += Dispose;
#endif
        }

        public void UpdateElementsRecursively() => Host?.Accept(UpdateVisitor.Instance);
        public void LateUpdateElementsRecursively() => Host?.Accept(LateUpdateVisitor.Instance);

        protected virtual StyleContext CreateStyleContext() => new StyleContext(this);

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

            return new URL(path, source).href;
        }

        public virtual ScriptSource CreateStaticScript(string path)
        {
            var src = new ScriptSource(Source);
            src.SourcePath = ResolvePath(path);
            src.Type = Source.EffectiveScriptSource;
            src.UseDevServer = ScriptSource.DevServerType.Never;
            return src;
        }

        public abstract void PlayAudio(AudioClip clip);

        public void Start(Action afterStart = null)
        {
            SetRef(0, Host);
            Host.InstanceId = 0;
            var renderCount = 0;

            var scriptJob = Source.GetScript((code) => {
                Location = new Location(this);
                Script = new ScriptContext(this, options.EngineType, options.Debug, options.AwaitDebugger);

                if (renderCount > 0)
                {
                    Style = CreateStyleContext();
                }

                renderCount++;

                if (Source.Language == ScriptSourceLanguage.Html)
                {
                    options.BeforeStart?.Invoke();
                    Html.InsertHtml(code, Host, true);
                    afterStart?.Invoke();
                    options.AfterStart?.Invoke();
                }
                else
                {
                    Script.RunMainScript(code, options.BeforeStart, () => {
                        afterStart?.Invoke();
                        options.AfterStart?.Invoke();
                    });
                }

                Style.ResolveStyle();
                if (CalculatesLayout) Host.Layout?.CalculateLayout();
            }, Dispatcher, true);

            if (scriptJob != null) Disposables.Add(scriptJob.Dispose);
        }

        public void Dispose()
        {
            CommandsCallback = null;
            FireEventByRefCallback = null;
            GetObjectCallback = null;
            GetEventAsObjectCallback = null;

            IsDisposed = true;
            Host?.Destroy(false);
            Host = null;
            Refs.Clear();
            foreach (var dr in DetachedRoots) dr.Destroy(false);
            DetachedRoots.Clear();
            Dispatcher?.Dispose();
            Globals?.Dispose();
            foreach (var item in Disposables) item?.Invoke();
            Script?.Dispose();
        }

        protected virtual IDispatcher CreateDispatcher() => Application.isPlaying && !IsEditorContext ?
            RuntimeDispatcherBehavior.Create(this, Timer) as IDispatcher :
            new EditorDispatcher(this);

        public virtual void HandleUnknownProperty(IReactComponent cmp, string propertyName, object value)
        {
            switch (options.UnknownPropertyHandling)
            {
#if UNITY_EDITOR
                case UnknownPropertyHandling.Log:
                    Debug.LogWarning($"Unknown property name specified, '{propertyName}'");
                    break;
#endif
                case UnknownPropertyHandling.Warn:
                    Debug.LogWarning($"Unknown property name specified, '{propertyName}'");
                    break;
                case UnknownPropertyHandling.Error:
                    Debug.LogError($"Unknown property name specified, '{propertyName}'");
                    break;
                case UnknownPropertyHandling.Exception:
                    throw new ArgumentException($"Unknown property name specified, '{propertyName}'");
                default:
                case UnknownPropertyHandling.None:
                    break;
            }
        }
    }
}
