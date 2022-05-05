using System;
using System.Collections.Generic;
using ReactUnity.Helpers;
using ReactUnity.Scripting.DomProxies;
using ReactUnity.Styling.Rules;

namespace ReactUnity.Scripting
{
    public class ScriptContext
    {
        public readonly ReactContext Context;
        public readonly JavascriptEngineType EngineType;
        public readonly IJavaScriptEngineFactory EngineFactory;
        private IJavaScriptEngine engine;
        public IJavaScriptEngine Engine
        {
            get
            {
                if (!Initialized) Initialize();
                return engine;
            }
        }
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

        public void RunScript(string script, Action beforeStart = null, Action afterStart = null)
        {
            if (string.IsNullOrWhiteSpace(script)) return;

            Initialize();

            var beforeStartCallbacks = new List<Action>() { beforeStart };
            var afterStartCallbacks = new List<Action<Exception>>() { (success) => afterStart?.Invoke() };

            engine.SetValue("addEventListener", new Action<string, object>((e, f) => {
                var callback = Callback.From(f, Context);
                if (e == "DOMContentLoaded")
                    afterStartCallbacks.Add((success) => callback.CallWithPriority(EventPriority.Discrete, success, this));
            }));

            beforeStartCallbacks.ForEach(x => x?.Invoke());
            var error = engine.TryExecute(script, "ReactUnity");
            afterStartCallbacks.ForEach(x => x?.Invoke(error));
        }

        public void Initialize()
        {
            if (Initialized) return;

            if (engine == null) CreateBaseEngine(Debug, AwaitDebugger);
            engine.SetValue("Context", Context);
            engine.SetValue("HostContainer", Context.Host);
            engine.SetValue("Globals", Context.Globals);
            engine.SetValue("localStorage", Context.LocalStorage);
            CreateLocation(engine);
            CreateConsole(engine);
            CreateScheduler(engine, Context);
            CreatePolyfills(engine);

            Context.MediaProvider.SetValue("engine", engine.Key);

            engine.Execute("postMessage = function() {}");

            Initialized = true;
        }

        public void ExecuteScript(string code, string fileName = null)
        {
            Engine.Execute(code, fileName);
        }

        public object EvaluateScript(string code, string fileName = null)
        {
            return Engine.Evaluate(code, fileName);
        }

        public Callback CreateEventCallback(string code, object thisVal)
        {
            Engine.SetValue("__thisArg", thisVal);
            var fn = EvaluateScript(
                "(function(ts) { return (function(event, sender) {\n" + code + "\n}).bind(ts); })(__thisArg)");
            Engine.ClearValue("__thisArg");

            return Callback.From(fn, Context, thisVal);
        }

        void CreateBaseEngine(bool debug, bool awaitDebugger)
        {
            engine = EngineFactory.Create(Context, debug, awaitDebugger);

            engine.Execute("globalThis = global = window = parent = self = this;");
            engine.SetValue("matchMedia", new Func<string, MediaQueryList>(media => MediaQueryList.Create(Context.MediaProvider, media)));
            engine.SetValue("UnityBridge", ReactUnityBridge.Instance);

            Interop = new ReactInterop(engine);
            Interop.InitializeDefault();
            engine.SetValue("Interop", Interop);
        }

        void CreateConsole(IJavaScriptEngine engine)
        {
            var console = new ConsoleProxy(Context);

            engine.SetValue("__console", console);
            engine.Execute(@"(function() {
                var _console = __console;
                console = {
                    log:       function log       (arg) { _console.log(arg)           },
                    info:      function info      (arg) { _console.info(arg)          },
                    debug:     function debug     (arg) { _console.debug(arg)         },
                    trace:     function trace     (arg) { _console.debug(arg)         },
                    warn:      function warn      (arg) { _console.warn(arg)          },
                    error:     function error     (arg) { _console.error(arg)         },
                    exception: function exception (arg) { _console.exception(arg)     },
                    dir:       function dir       (arg) { _console.dir(arg)           },
                    clear:     function clear     (arg) { _console.clear(arg)         },
                    assert:    function assert    (arg) { _console.assert(arg)        },
                    count:     function count    (name) { return _console.count(name) },
                };
})()");
            engine.ClearValue("__console");
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

            engine.SetValue("setTimeout", new Func<object, double, int>(scheduler.setTimeout));
            engine.SetValue("clearTimeout", new Action<int?>(scheduler.clearTimeout));

            engine.SetValue("setInterval", new Func<object, double, int>(scheduler.setInterval));
            engine.SetValue("clearInterval", new Action<int?>(scheduler.clearInterval));

            engine.SetValue("requestAnimationFrame", new Func<object, int>(scheduler.requestAnimationFrame));
            engine.SetValue("cancelAnimationFrame", new Action<int?>(scheduler.cancelAnimationFrame));

            engine.SetValue("setImmediate", new Func<object, int>(scheduler.setImmediate));
            engine.SetValue("clearImmediate", new Action<int?>(scheduler.clearImmediate));
        }

        void CreateLocation(IJavaScriptEngine engine)
        {
            engine.SetValue("location", Context.Location);
            engine.SetValue("document", new DocumentProxy(Context, Context.Location.origin));

            engine.Execute(@"WebSocket = function(url) { return new WebSocket.original(Context, url); }");
            engine.Execute(@"XMLHttpRequest = function() { return new XMLHttpRequest.original(Context, location.origin); }");
            engine.SetProperty(engine.GetValue("WebSocket"), "original", typeof(WebSocketProxy));
            engine.SetProperty(engine.GetValue("XMLHttpRequest"), "original", typeof(XMLHttpRequest));
        }

        public void Dispose()
        {
            engine?.Dispose();
            engine = null;
            Interop = null;
        }
    }
}
