using ExCSS;
using ReactUnity.Schedulers;
using ReactUnity.StyleEngine;
using ReactUnity.Styling;
using ReactUnity.Types;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace ReactUnity
{
    public abstract class ReactContext : IDisposable
    {
        protected static Regex ExtensionRegex = new Regex(@"\.\w+$");
        protected static Regex ResourcesRegex = new Regex(@"resources(/|\\)", RegexOptions.IgnoreCase);

        public IHostComponent Host { get; protected set; }
        public StringObjectDictionary Globals { get; private set; }
        public bool IsDevServer { get; }

        public ReactScript Script { get; }
        public IUnityScheduler Scheduler { get; }
        public IDispatcher Dispatcher { get; }
        public virtual Dictionary<string, Type> StateHandlers { get; }

        protected bool Scheduled = false;
        protected List<System.Action> ScheduledCallbacks = new List<System.Action>();

        public StylesheetParser Parser;
        public StyleTree StyleTree;
        public Action OnRestart;

        public List<IDisposable> Disposables = new List<IDisposable>();

        public Dictionary<string, FontReference> FontFamilies = new Dictionary<string, FontReference>();

        private bool mergeLayouts;

        public ReactContext(StringObjectDictionary globals, ReactScript script, IDispatcher dispatcher,
            IUnityScheduler scheduler, bool isDevServer, Action onRestart, bool mergeLayouts = false)
        {
            Globals = globals;
            Script = script;
            IsDevServer = isDevServer;
            Scheduler = scheduler;
            Dispatcher = dispatcher;
            OnRestart = onRestart ?? (() => { });
            this.mergeLayouts = mergeLayouts;

            Parser = new StylesheetParser(true, true, true, true, true);
            StyleTree = new StyleTree(Parser);
        }


        public virtual void scheduleLayout(System.Action callback = null)
        {
            Scheduled = true;
            ScheduledCallbacks.Add(callback);
        }

        public virtual void InsertStyle(string style, int importanceOffset = 0)
        {
            if (string.IsNullOrWhiteSpace(style)) return;

            var stylesheet = StyleTree.Parser.Parse(style);

            foreach (var rule in stylesheet.FontfaceSetRules)
            {
                FontFamilies[(ParserMap.StringConverter.Convert(rule.Family) as string).ToLowerInvariant()] =
                    ParserMap.FontReferenceConverter.Convert(rule.Source) as FontReference;
            }

            foreach (var rule in stylesheet.StyleRules.OfType<StyleRule>())
            {
                StyleTree.AddStyle(rule, importanceOffset, mergeLayouts);
            }

            Host.ResolveStyle(true);
        }

        public virtual void RemoveStyle(string style)
        {
        }

        public virtual string ResolvePath(string path)
        {
            if (IsDevServer) return Script.DevServerFile + path;
            var res = Path.GetDirectoryName(Script.GetResolvedSourcePath()) + path;
            if (Script.ScriptSource == ScriptSource.Resource) return GetResourceUrl(res);
            return res;
        }

        public virtual ReactScript CreateStaticScript(string path)
        {
            var src = new ReactScript();
            src.ScriptSource = IsDevServer ? ScriptSource.Url : Script.ScriptSource;
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

        public void Dispose()
        {
            Scheduler?.clearAllTimeouts();
            if(Dispatcher != null) Dispatcher.Dispose();
            foreach (var dp in Disposables)
            {
                dp.Dispose();
            }
        }
    }
}
