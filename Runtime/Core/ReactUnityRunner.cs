using System;
using System.Collections.Generic;
using Facebook.Yoga;
using ReactUnity.DomProxies;
using ReactUnity.Helpers;
using ReactUnity.ScriptEngine;
using ReactUnity.StyleEngine;
using UnityEngine;
using UnityEngine.Events;

namespace ReactUnity
{
    public class ReactUnityRunner
    {
        public IJavaScriptEngineFactory engineFactory { get; private set; }
        public IJavaScriptEngine engine { get; private set; }
        public ReactContext context { get; private set; }

        public void RunScript(string script, ReactContext ctx, JavascriptEngineType engineType, bool debug, bool awaitDebugger, UnityEvent<ReactUnityRunner> beforeStart = null, UnityEvent<ReactUnityRunner> afterStart = null)
        {
            if (string.IsNullOrWhiteSpace(script)) return;

            engineFactory = JavascriptEngineHelpers.GetEngineFactory(engineType);

            context = ctx;
            if (engine == null) CreateBaseEngine(debug, awaitDebugger);
            engine.SetValue("Context", context);
            engine.SetValue("HostContainer", context.Host);
            // TODO: deprecate RootContainer in favor of HostContainer
            engine.SetValue("RootContainer", context.Host);
            engine.SetValue("Globals", context.Globals);
            CreateLocation(engine);
            CreateConsole(engine);
            CreateLocalStorage(engine);
            CreateScheduler(engine, context);
            CreatePolyfills(engine);

            ctx.MediaProvider.SetValue("engine", engine.Key);

            var beforeStartCallbacks = new List<Action<ReactUnityRunner>>() { (runner) => beforeStart?.Invoke(runner) };
            var afterStartCallbacks = new List<Action<ReactUnityRunner, Exception>>() { (runner, success) => afterStart?.Invoke(runner) };

            engine.SetValue("addEventListener", new Action<string, Action<ReactUnityRunner>>((e, f) => {
                if (e == "DOMContentLoaded") afterStartCallbacks.Add((runner, success) => f(runner));
            }));

            beforeStartCallbacks.ForEach(x => x?.Invoke(this));
            var error = engine.TryExecute(script, "ReactUnity");
            afterStartCallbacks.ForEach(x => x?.Invoke(this, error));
        }

        public void ExecuteScript(string script)
        {
            engine.Execute(script);
        }

        void CreateBaseEngine(bool debug, bool awaitDebugger)
        {
            engine = engineFactory.Create(context, debug, awaitDebugger);

            engine.Execute("globalThis = global = window = parent = self = this;");
            engine.SetValue("matchMedia", new Func<string, MediaQueryList>(media => MediaQueryList.Create(context.MediaProvider, media)));

            engine.SetValue("Engine", engine);
            engine.SetValue("Callback", typeof(Callback));
            engine.SetValue("importType", new Func<string, object>((string typeName) => engine.CreateTypeReference(ReflectionHelpers.FindType(typeName))));

            engine.SetValue("UnityEngine", engine.CreateNamespaceReference("UnityEngine", typeof(Vector2).Assembly, typeof(UnityEngine.UIElements.Button).Assembly));
            engine.SetValue("ReactUnity", engine.CreateNamespaceReference("ReactUnity", typeof(ReactUnityBridge).Assembly));
            engine.SetValue("Facebook", engine.CreateNamespaceReference("Facebook", typeof(YogaValue).Assembly));
#if UNITY_EDITOR
            engine.SetValue("UnityEditor", engine.CreateNamespaceReference("UnityEditor", typeof(UnityEditor.EditorWindow).Assembly, typeof(UnityEditor.UIElements.ColorField).Assembly));
#endif

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
            var scheduler = context.Scheduler;
            engine.SetValue("UnityScheduler", scheduler);
            engine.Execute("global.setTimeout = function setTimeout(fun, delay) { return UnityScheduler.setTimeout(new Callback(fun), delay); }");
            engine.Execute("global.setInterval = function setInterval(fun, delay) { return UnityScheduler.setInterval(new Callback(fun), delay); }");
            engine.Execute("global.setImmediate = function setImmediate(fun) { return UnityScheduler.setImmediate(new Callback(fun)); }");
            engine.Execute("global.requestAnimationFrame = function requestAnimationFrame(fun) { return UnityScheduler.requestAnimationFrame(new Callback(fun)); }");
            engine.SetValue("clearTimeout", new Action<int?>(scheduler.clearTimeout));
            engine.SetValue("clearInterval", new Action<int?>(scheduler.clearInterval));
            engine.SetValue("clearImmediate", new Action<int?>(scheduler.clearImmediate));
            engine.SetValue("cancelAnimationFrame", new Action<int?>(scheduler.cancelAnimationFrame));
        }

        void CreateLocalStorage(IJavaScriptEngine engine)
        {
            var storage = new LocalStorage();
            engine.SetValue("localStorage", storage);
        }

        void CreateLocation(IJavaScriptEngine engine)
        {
            engine.SetValue("location", context.Location);

            engine.Execute(@"WebSocket = function(url) { return new WebSocket.original(Context, url); }");
            engine.Execute(@"XMLHttpRequest = function() { return new XMLHttpRequest.original(Context, location.origin); }");
            engine.SetProperty(engine.GetValue("WebSocket"), "original", typeof(WebSocketProxy));
            engine.SetProperty(engine.GetValue("XMLHttpRequest"), "original", typeof(XMLHttpRequest));

            engine.SetValue("document", new DocumentProxy(context, this.ExecuteScript, context.Location.origin));
        }
    }
}
