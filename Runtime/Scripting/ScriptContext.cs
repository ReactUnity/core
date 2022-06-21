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
                if (!Initialized) Initialize(null);

                if (engine == null) throw new InvalidOperationException("Engine is not initialized yet");
                return engine;
            }
        }
        public ReactInterop Interop { get; private set; }
        public bool Initialized { get; private set; }
        public bool EngineInitialized { get; private set; }
        public bool Debug { get; set; }
        public bool AwaitDebugger { get; set; }

        public ScriptContext(ReactContext context, JavascriptEngineType engineType, bool debug = false, bool awaitDebugger = false)
        {
            Context = context;
            EngineFactory = JavascriptEngineHelpers.GetEngineFactory(engineType);
            EngineType = engineType;
            Debug = debug;
            AwaitDebugger = awaitDebugger;

            context.Dispatcher.OnEveryUpdate(Update);
        }

        public void RunMainScript(string script, Action beforeStart = null, Action afterStart = null)
        {
            if (string.IsNullOrWhiteSpace(script)) return;

            Initialize(() => {
                var beforeStartCallbacks = new List<Action>() { beforeStart };
                var afterStartCallbacks = new List<Action<Exception>>() { (success) => afterStart?.Invoke() };

                engine.SetGlobal("addEventListener", new Action<string, object>((e, f) => {
                    var callback = Callback.From(f, Context);
                    if (e == "DOMContentLoaded")
                        afterStartCallbacks.Add((success) => callback.CallWithPriority(EventPriority.Discrete, success, this));
                }));

                beforeStartCallbacks.ForEach(x => x?.Invoke());
                var error = engine.TryExecute(script, "ReactUnity/main");
                afterStartCallbacks.ForEach(x => x?.Invoke(error));
            });
        }

        public void Initialize(Action callback)
        {
            if (Initialized)
            {
                callback?.Invoke();
                return;
            }

            Initialized = true;
            if (engine == null)
            {
                CreateBaseEngine(Debug, AwaitDebugger, () => {
                    engine.SetGlobal("Context", Context);
                    engine.SetGlobal("HostContainer", Context.Host);
                    engine.SetGlobal("Globals", Context.Globals);
                    engine.SetGlobal("localStorage", Context.LocalStorage);

                    CreateLocation(engine, Context);
                    CreateConsole(engine);
                    CreateScheduler(engine, Context);
                    CreatePolyfills(engine);

                    Context.MediaProvider.SetValue("engine", engine.Key);

                    engine.Execute(@"
                        global.postMessage = function() {};

                        // Required for JSS
                        global.getComputedStyle = function() { return {}; };

                        // Required for styled-components
                        global.HTMLElement = {};
                        void 0;
                    ", "ReactUnity/shims/dom");

                    EngineInitialized = true;

                    callback?.Invoke();
                });
            }
            else callback?.Invoke();
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
            Engine.SetGlobal("__thisArg", thisVal);
            var fn = EvaluateScript(
                "(function(ts) { return (function(event, sender) {\n" + code + "\n}).bind(ts); })(__thisArg)");
            Engine.DeleteGlobal("__thisArg");

            return Callback.From(fn, Context, thisVal);
        }

        void CreateBaseEngine(bool debug, bool awaitDebugger, Action onInitialize)
        {
            EngineFactory.Create(Context, debug, awaitDebugger, (engine) => {
                this.engine = engine;
                engine.Execute("this.globalThis = this.global = this.window = this.parent = this.self = this; void 0;", "ReactUnity/shims/global");
                engine.SetGlobal("matchMedia", new Func<string, MediaQueryList>(media => MediaQueryList.Create(Context.MediaProvider, media)));
                engine.SetGlobal("UnityBridge", ReactUnityBridge.Instance);

                Interop = new ReactInterop(engine);
                Interop.InitializeDefault();
                engine.SetGlobal("Interop", Interop);

                onInitialize?.Invoke();
            });
        }

        void CreateConsole(IJavaScriptEngine engine)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            engine.Execute("global.console = global.$$webglWindow.console; void 0;", "ReactUnity/shims/console");
#else
            if (engine.Capabilities.HasFlag(EngineCapabilities.Console)) return;

            var console = new ConsoleProxy(Context);

            engine.SetGlobal("__console", console);
            engine.Execute(@"(function() {
                var _console = global.__console;
                global.console = {
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
                void 0;
})()", "ReactUnity/shims/console");
            engine.DeleteGlobal("__console");
#endif
        }

        static void CreatePolyfills(IJavaScriptEngine engine)
        {
            // Load essential polyfills

            if (!engine.Capabilities.HasFlag(EngineCapabilities.Base64))
                engine.Execute(ResourcesHelper.GetPolyfill("base64"), "ReactUnity/polyfills/base64");

            if (!engine.Capabilities.HasFlag(EngineCapabilities.Fetch))
                engine.Execute(ResourcesHelper.GetPolyfill("fetch"), "ReactUnity/polyfills/fetch");
        }

        static void CreateScheduler(IJavaScriptEngine engine, ReactContext context)
        {
            if (engine.Capabilities.HasFlag(EngineCapabilities.Scheduler)) return;

            var scheduler = context.Dispatcher.Scheduler;

            engine.SetGlobal("setTimeout", new Func<object, double, int>(scheduler.setTimeout));
            engine.SetGlobal("clearTimeout", new Action<int?>(scheduler.clearTimeout));

            engine.SetGlobal("setInterval", new Func<object, double, int>(scheduler.setInterval));
            engine.SetGlobal("clearInterval", new Action<int?>(scheduler.clearInterval));

            engine.SetGlobal("requestAnimationFrame", new Func<object, int>(scheduler.requestAnimationFrame));
            engine.SetGlobal("cancelAnimationFrame", new Action<int?>(scheduler.cancelAnimationFrame));

            engine.SetGlobal("setImmediate", new Func<object, int>(scheduler.setImmediate));
            engine.SetGlobal("clearImmediate", new Action<int?>(scheduler.clearImmediate));
        }

        static void CreateLocation(IJavaScriptEngine engine, ReactContext context)
        {
            engine.SetGlobal("location", context.Location);
            engine.SetGlobal("document", new DocumentProxy(context, context.Location.origin));

            if (!engine.Capabilities.HasFlag(EngineCapabilities.URL))
            {
                engine.SetGlobal("URL", typeof(URL));
            }

            if (!engine.Capabilities.HasFlag(EngineCapabilities.WebSocket))
            {
                var webSocketGlobal = engine.Evaluate(@"global.WebSocket = function(url) {
                    return new global.WebSocket.original(Context, url); }", "ReactUnity/shims/websocket");
                engine.SetProperty(webSocketGlobal, "original", typeof(WebSocketProxy));
            }

            if (!engine.Capabilities.HasFlag(EngineCapabilities.XHR))
            {
                var xhrGlobal = engine.Evaluate(@"global.XMLHttpRequest = function() {
                    return new global.XMLHttpRequest.original(Context, location.origin); }", "ReactUnity/shims/xhr");
                engine.SetProperty(xhrGlobal, "original", typeof(XMLHttpRequest));
            }
        }

        public void Dispose()
        {
            Interop?.Dispose();
            Interop = null;
            engine?.Dispose();
            engine = null;
        }

        internal void Update()
        {
#if UNITY_EDITOR
            var isCompiling = UnityEditor.EditorApplication.isCompiling;
#else
            var isCompiling = false;
#endif

            if (!isCompiling) Engine?.Update();
        }
    }
}
