using System;
using System.Collections.Generic;
using ReactUnity.DomProxies;
using ReactUnity.Helpers;
using ReactUnity.ScriptEngine;
using ReactUnity.StyleEngine;
using UnityEngine.Events;

namespace ReactUnity
{
    public class ReactUnityRunner : IDisposable
    {
        public IJavaScriptEngineFactory engineFactory { get; private set; }
        public IJavaScriptEngine engine { get; private set; }
        public ReactContext context { get; private set; }
        public ReactInterop interop { get; private set; }

        public void RunScript(string script, ReactContext ctx, JavascriptEngineType engineType, bool debug, bool awaitDebugger, UnityEvent<ReactUnityRunner> beforeStart = null, UnityEvent<ReactUnityRunner> afterStart = null)
        {
            if (string.IsNullOrWhiteSpace(script)) return;

            engineFactory = JavascriptEngineHelpers.GetEngineFactory(engineType);

            context = ctx;
            if (engine == null) CreateBaseEngine(debug, awaitDebugger);
            engine.SetValue("Context", context);
            engine.SetValue("HostContainer", context.Host);
            engine.SetValue("Globals", context.Globals);
            engine.SetValue("localStorage", context.LocalStorage);
            CreateLocation(engine);
            CreateConsole(engine);
            CreateScheduler(engine, context);
            CreatePolyfills(engine);

            ctx.MediaProvider.SetValue("engine", engine.Key);

            var beforeStartCallbacks = new List<Action<ReactUnityRunner>>() { (runner) => beforeStart?.Invoke(runner) };
            var afterStartCallbacks = new List<Action<ReactUnityRunner, Exception>>() { (runner, success) => afterStart?.Invoke(runner) };

            engine.Execute("postMessage = function() {}");

            engine.SetValue("addEventListener", new Action<string, object>((e, f) => {
                var callback = Callback.From(f);
                if (e == "DOMContentLoaded")
                    afterStartCallbacks.Add((runner, success) => callback.Call(runner));
            }));

            beforeStartCallbacks.ForEach(x => x?.Invoke(this));
            var error = engine.TryExecute(script, "ReactUnity");
            afterStartCallbacks.ForEach(x => x?.Invoke(this, error));
        }

        public void ExecuteScript(string code, string fileName = null)
        {
            engine.Execute(code, fileName);
        }

        void CreateBaseEngine(bool debug, bool awaitDebugger)
        {
            engine = engineFactory.Create(context, debug, awaitDebugger);

            engine.Execute("globalThis = global = window = parent = self = this;");
            engine.SetValue("matchMedia", new Func<string, MediaQueryList>(media => MediaQueryList.Create(context.MediaProvider, media)));

            engine.SetValue("Engine", engine);
            engine.SetValue("Callback", typeof(Callback));

            interop = new ReactInterop(engine);
            interop.InitializeDefault();
            engine.SetValue("Interop", interop);

            engine.SetValue("Unity", ReactUnityBridge.Instance);
            engine.SetValue("UnityBridge", ReactUnityBridge.Instance);
        }

        void CreateConsole(IJavaScriptEngine engine)
        {
            var console = new ConsoleProxy(context);

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
            engine.SetValue("location", context.Location);
            engine.SetValue("document", new DocumentProxy(context, ExecuteScript, context.Location.origin));

            engine.Execute(@"WebSocket = function(url) { return new WebSocket.original(Context, url); }");
            engine.Execute(@"XMLHttpRequest = function() { return new XMLHttpRequest.original(Context, location.origin); }");
            engine.SetProperty(engine.GetValue("WebSocket"), "original", typeof(WebSocketProxy));
            engine.SetProperty(engine.GetValue("XMLHttpRequest"), "original", typeof(XMLHttpRequest));
        }

        public void Dispose()
        {
            engine?.Dispose();
            engine = null;
            engineFactory = null;
            context = null;
        }
    }
}
