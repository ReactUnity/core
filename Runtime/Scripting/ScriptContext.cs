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


        public EventTarget GlobalEventTarget { get; } = new EventTarget();
        public ReactUnityWebGLCompat WebGLCompat { get; } = new ReactUnityWebGLCompat();
        private Callback WebGLCompatDispatchEventCallback { get; set; }

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

                engine.SetGlobal("addEventListener", new EventTarget.addEventListener((e, h, o) => GlobalEventTarget.AddEventListener(e, h)));
                engine.SetGlobal("removeEventListener", new EventTarget.removeEventListener((e, h, o) => GlobalEventTarget.RemoveEventListener(e, h)));
                engine.SetGlobal("dispatchEvent", new EventTarget.dispatchEvent((e, a) => GlobalEventTarget.DispatchEvent(e, Context, EventPriority.Unknown, a)));

                afterStartCallbacks.Add((success) => GlobalEventTarget.DispatchEvent("DOMContentLoaded", Context, EventPriority.Discrete, success, this));

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
                    engine.SetGlobal("ReactUnityWebGLCompat", WebGLCompat);

                    CreateDOMShims(engine, Context);
                    CreateConsole(engine);
                    CreateScheduler(engine, Context);
                    CreatePolyfills(engine);

                    Context.MediaProvider.SetValue("engine", engine.Key);

                    engine.Execute(@"
                        global.Blob = undefined;
                        global.postMessage = function postMessage () {};

                        // Required for JSS
                        global.getComputedStyle = function getComputedStyle () { return {}; };

                        // Required for styled-components
                        global.HTMLElement = function HTMLElement() {};
                        void 0;

                        global.dispatchWebGLCompatEvent = function dispatchWebGLCompatEvent (name, args) {
                            var ev = global.dispatchReactUnityEvent;
                            if (typeof ev === 'function') ev.call(null, name, ...args);

                            ev = typeof $$webglWindow !== 'undefined' && $$webglWindow.dispatchReactUnityEvent;
                            if (typeof ev === 'function') ev.apply(null, name, ...args);
                        };
                    ", "ReactUnity/shims/dom");

                    var dispatchWebGLCompatCallback = engine.GetGlobal("dispatchWebGLCompatEvent");
                    WebGLCompatDispatchEventCallback = new Callback(dispatchWebGLCompatCallback, Context);

                    EngineInitialized = true;

                    callback?.Invoke();
                });
            }
            else callback?.Invoke();
        }

        public object JsonParse(string str)
        {
            return Engine.Evaluate(str);
        }

        public void ExecuteScript(string code, string fileName = null, JavascriptDocumentType documentType = JavascriptDocumentType.Script)
        {
            Engine.Execute(code, fileName, documentType);
        }

        public object EvaluateScript(string code, string fileName = null)
        {
            return Engine.Evaluate(code, fileName);
        }

        public object AsArray(System.Collections.IList obj)
        {
            Engine.SetGlobal("__host_temp__", obj);
            var res = EvaluateScript("[...__host_temp__]");
            Engine.DeleteGlobal("__host_temp__");
            return res;
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
                    log:       function log       ()    { _console.log   (arguments[0], Array.prototype.slice.call(arguments, 1)) },
                    info:      function info      ()    { _console.info  (arguments[0], Array.prototype.slice.call(arguments, 1)) },
                    debug:     function debug     ()    { _console.debug (arguments[0], Array.prototype.slice.call(arguments, 1)) },
                    trace:     function trace     ()    { _console.debug (arguments[0], Array.prototype.slice.call(arguments, 1)) },
                    warn:      function warn      ()    { _console.warn  (arguments[0], Array.prototype.slice.call(arguments, 1)) },
                    error:     function error     ()    { _console.error (arguments[0], Array.prototype.slice.call(arguments, 1)) },
                    dir:       function dir       ()    { _console.dir   (arguments[0], Array.prototype.slice.call(arguments, 1)) },
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

            if (!engine.Capabilities.HasFlag(EngineCapabilities.AbortController))
                engine.Execute(ResourcesHelper.GetPolyfill("abortcontroller"), "ReactUnity/polyfills/abortcontroller");
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

        static void CreateDOMShims(IJavaScriptEngine engine, ReactContext context)
        {
            engine.SetGlobal("location", context.Location);
            engine.SetGlobal("document", new DocumentProxy(context, context.Location.origin));

            if (!engine.Capabilities.HasFlag(EngineCapabilities.URL))
            {
                engine.SetGlobal("URL", typeof(URL));
                engine.SetGlobal("URLSearchParams", typeof(URLSearchParams));
            }

            if (!engine.Capabilities.HasFlag(EngineCapabilities.WebSocket))
            {
                engine.SetGlobal("__WebSocketOriginal", typeof(WebSocketProxy));
                engine.Execute(@"
                    global.WebSocket = function WebSocket(url, protocols) {
                        protocols = protocols || [];
                        if(typeof protocols === 'string') protocols = [protocols];
                        if(!Array.isArray(protocols)) protocols = [];
                        protocols = protocols.map(x => String(x));

                        return new global.__WebSocketOriginal(Context, url, protocols.join(','));
                    }

                    global.WebSocket.CONNECTING = 0;
                    global.WebSocket.OPEN = 1;
                    global.WebSocket.CLOSING = 2;
                    global.WebSocket.CLOSED = 3;
                ", "ReactUnity/shims/websocket");
            }

            if (!engine.Capabilities.HasFlag(EngineCapabilities.XHR))
            {
                engine.SetGlobal("__XMLHttpRequestOriginal", typeof(XMLHttpRequest));
                engine.Execute(@"
                    global.XMLHttpRequest = function XMLHttpRequest() {
                        return new global.__XMLHttpRequestOriginal(Context, location.origin);
                    }
                    global.XMLHttpRequest.UNSENT = 0;
                    global.XMLHttpRequest.OPENED = 1;
                    global.XMLHttpRequest.HEADERS_RECEIVED = 2;
                    global.XMLHttpRequest.LOADING = 3;
                    global.XMLHttpRequest.DONE = 4;
                ", "ReactUnity/shims/xhr");
                engine.SetGlobal("FormData", typeof(FormData));
            }

            if (!engine.Capabilities.HasFlag(EngineCapabilities.Encoding))
            {
                engine.SetGlobal("EncodingHelpers", typeof(EncodingHelpers));
                engine.Execute(@"
                    global.encodeURI          = function(x) {   return EncodingHelpers.encodeURI(x + '')            };
                    global.decodeURI          = function(x) {   return EncodingHelpers.decodeURI(x + '')            };
                    global.encodeURIComponent = function(x) {   return EncodingHelpers.encodeURIComponent(x + '')   };
                    global.decodeURIComponent = function(x) {   return EncodingHelpers.decodeURIComponent(x + '')   };
                ", "ReactUnity/shims/encoding");
            }

            if (!engine.Capabilities.HasFlag(EngineCapabilities.Navigator))
            {
                engine.Evaluate(@"global.navigator = { product: 'ReactUnity' }");
            }
        }

        public void WebGLCompatDispatchEvent(string eventName, params object[] args)
        {
            WebGLCompatDispatchEventCallback.Call(eventName, args);
        }

        public void Dispose()
        {
            WebGLCompatDispatchEventCallback?.Dispose();
            WebGLCompatDispatchEventCallback = null;
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
