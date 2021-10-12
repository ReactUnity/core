using System;
using System.Collections.Generic;
using ReactUnity.DomProxies;
using ReactUnity.Helpers;
using ReactUnity.StyleEngine;
using UnityEngine.Events;

namespace ReactUnity.Scripting
{
    public class ScriptContext
    {
        public readonly ReactContext Context;
        public readonly JavascriptEngineType EngineType;
        public readonly IJavaScriptEngineFactory EngineFactory;
        public IJavaScriptEngine Engine { get; private set; }
        public ReactInterop Interop { get; private set; }
        public bool Initialized { get; private set; }
        public bool Debug { get; set; }
        public bool AwaitDebugger { get; set; }

        public ScriptContext(ReactContext context, JavascriptEngineType engineType, bool debug = false, bool awaitDebugger = false)
        {
            Context = context;
            EngineFactory = JavascriptEngineHelpers.GetEngineFactory(engineType);
            EngineType = engineType;
            Debug = debug;
            AwaitDebugger = awaitDebugger;
        }

        public void RunScript(string script, UnityEvent<ScriptContext> beforeStart = null, UnityEvent<ScriptContext> afterStart = null)
        {
            if (string.IsNullOrWhiteSpace(script)) return;

            Initialize();

            var beforeStartCallbacks = new List<Action<ScriptContext>>() { (runner) => beforeStart?.Invoke(runner) };
            var afterStartCallbacks = new List<Action<ScriptContext, Exception>>() { (runner, success) => afterStart?.Invoke(runner) };

            Engine.SetValue("addEventListener", new Action<string, object>((e, f) => {
                var callback = Callback.From(f);
                if (e == "DOMContentLoaded")
                    afterStartCallbacks.Add((runner, success) => callback.Call(runner));
            }));

            beforeStartCallbacks.ForEach(x => x?.Invoke(this));
            var error = Engine.TryExecute(script, "ReactUnity");
            afterStartCallbacks.ForEach(x => x?.Invoke(this, error));
        }

        public void Initialize()
        {
            if (Initialized) return;

            if (Engine == null) CreateBaseEngine(Debug, AwaitDebugger);
            Engine.SetValue("Context", Context);
            Engine.SetValue("HostContainer", Context.Host);
            Engine.SetValue("Globals", Context.Globals);
            Engine.SetValue("localStorage", Context.LocalStorage);
            CreateLocation(Engine);
            CreateConsole(Engine);
            CreateScheduler(Engine, Context);
            CreatePolyfills(Engine);

            Context.MediaProvider.SetValue("engine", Engine.Key);

            Engine.Execute("postMessage = function() {}");

            Initialized = true;
        }

        public void ExecuteScript(string code, string fileName = null)
        {
            Engine.Execute(code, fileName);
        }

        void CreateBaseEngine(bool debug, bool awaitDebugger)
        {
            Engine = EngineFactory.Create(Context, debug, awaitDebugger);

            Engine.Execute("globalThis = global = window = parent = self = this;");
            Engine.SetValue("matchMedia", new Func<string, MediaQueryList>(media => MediaQueryList.Create(Context.MediaProvider, media)));

            Engine.SetValue("Engine", Engine);
            Engine.SetValue("Callback", typeof(Callback));

            Interop = new ReactInterop(Engine);
            Interop.InitializeDefault();
            Engine.SetValue("Interop", Interop);

            Engine.SetValue("Unity", ReactUnityBridge.Instance);
            Engine.SetValue("UnityBridge", ReactUnityBridge.Instance);
        }

        void CreateConsole(IJavaScriptEngine engine)
        {
            var console = new ConsoleProxy(Context);

            engine.SetValue("_console", console);
            engine.Execute(@"console = {
    log: (...args) => _console.log(...args),
    info: (...args) => _console.info(...args),
    debug: (...args) => _console.debug(...args),
    trace: (...args) => _console.debug(...args),
    warn: (...args) => _console.warn(...args),
    error: (...args) => _console.error(...args),
    exception: (...args) => _console.exception(...args),
    dir: (...args) => _console.dir(...args),
    clear: (...args) => _console.clear(...args),
    assert: (...args) => _console.assert(...args),
}");
        }

        void CreatePolyfills(IJavaScriptEngine engine)
        {
            // Load essential polyfills
            engine.Execute(ResourcesHelper.GetPolyfill("base64"));
            engine.Execute(ResourcesHelper.GetPolyfill("fetch"));
        }

        void CreateScheduler(IJavaScriptEngine engine, ReactContext context)
        {
            var scheduler = context.Dispatcher.Scheduler;
            engine.SetValue("UnityScheduler", scheduler);
            engine.SetValue("setTimeout", new Func<object, double, int>(scheduler.setTimeout));
            engine.SetValue("setInterval", new Func<object, double, int>(scheduler.setInterval));
            engine.SetValue("setImmediate", new Func<object, int>(scheduler.setImmediate));
            engine.SetValue("requestAnimationFrame", new Func<object, int>(scheduler.requestAnimationFrame));
            engine.SetValue("clearTimeout", new Action<int?>(scheduler.clearTimeout));
            engine.SetValue("clearInterval", new Action<int?>(scheduler.clearInterval));
            engine.SetValue("clearImmediate", new Action<int?>(scheduler.clearImmediate));
            engine.SetValue("cancelAnimationFrame", new Action<int?>(scheduler.cancelAnimationFrame));
        }

        void CreateLocation(IJavaScriptEngine engine)
        {
            engine.SetValue("location", Context.Location);
            engine.SetValue("document", new DocumentProxy(Context, ExecuteScript, Context.Location.origin));

            engine.Execute(@"WebSocket = function(url) { return new WebSocket.original(Context, url); }");
            engine.Execute(@"XMLHttpRequest = function() { return new XMLHttpRequest.original(Context, location.origin); }");
            engine.SetProperty(engine.GetValue("WebSocket"), "original", typeof(WebSocketProxy));
            engine.SetProperty(engine.GetValue("XMLHttpRequest"), "original", typeof(XMLHttpRequest));
        }

        public void Dispose()
        {
            Engine?.Dispose();
            Engine = null;
            Interop = null;
        }
    }
}
