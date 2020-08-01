using Esprima;
using Jint;
using Jint.Native;
using Jint.Native.Object;
using ReactUnity.Interop;
using ReactUnity.DomProxies;
using ReactUnity.Schedulers;
using ReactUnity.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using ReactUnity.Styling.Types;

namespace ReactUnity
{
    public class ReactUnity : MonoBehaviour
    {
        private Engine engine;
        private UnityUGUIContext unityContext;
        private UnityScheduler scheduler;

        public StringObjectDictionary NamedAssets = new StringObjectDictionary();
        public ReactScript Script = new ReactScript() { ScriptSource = ScriptSource.Resource, SourcePath = "react/index.js" };
        private ReactScript TestScript = new ReactScript() { ScriptSource = ScriptSource.Url, SourcePath = "http://localhost:9876/context.html", UseDevServer = false };

        public List<TextAsset> PreloadScripts = new List<TextAsset>();

        private IDisposable ScriptWatchDisposable;

        public RectTransform Root => transform as RectTransform;

        void OnEnable()
        {
            Restart();
        }

        void OnDisable()
        {
            if (ScriptWatchDisposable != null) ScriptWatchDisposable.Dispose();
        }

        void Clean()
        {
            foreach (Transform children in Root)
            {
                DestroyImmediate(children.gameObject);
            }

            scheduler?.clearAllTimeouts();
        }

        private void LoadAndRun(ReactScript script, List<TextAsset> preload, Action callback = null, bool disableWarnings = false)
        {
            MainThreadDispatcher.Initialize();
            int debounce = -1;
            ScriptWatchDisposable = script.GetScript((code) =>
            {
                if (debounce >= 0) MainThreadDispatcher.StopDeferred(debounce);
                debounce = MainThreadDispatcher.Timeout(() => RunScript(code, script, preload, callback), 0.5f);
            }, out var result, true, disableWarnings);
            RunScript(result, script, preload, callback);
        }

        [ContextMenu("Restart")]
        public void Restart()
        {
            LoadAndRun(Script, PreloadScripts, null, false);
        }

        private void Test(bool debug = false)
        {
            var preload = new List<TextAsset>(PreloadScripts);
            preload.Add(Resources.Load<TextAsset>("ReactUnity/test/socket"));
            preload.Add(Resources.Load<TextAsset>("ReactUnity/test/karma"));
            preload.Add(Resources.Load<TextAsset>("ReactUnity/test/context"));
            preload.Add(Resources.Load<TextAsset>("ReactUnity/test/mocha"));
            preload.Add(Resources.Load<TextAsset>("ReactUnity/test/mocha-adapter"));
            preload.Add(Resources.Load<TextAsset>("ReactUnity/test/chai"));
            preload.Add(Resources.Load<TextAsset>("ReactUnity/test/chai-adapter"));
            if (debug) preload.Add(Resources.Load<TextAsset>("ReactUnity/test/debug"));

            LoadAndRun(TestScript, preload, null, true);
        }

        [ContextMenu("Test")]
        public void Test()
        {
            Test(false);
        }

        [ContextMenu("TestDebug")]
        public void TestDebug()
        {
            Test(true);
        }

        void RunScript(string script, ReactScript scriptObj, List<TextAsset> preload = null, Action callback = null)
        {
            if (string.IsNullOrWhiteSpace(script)) return;

            Clean();

            if (engine == null) CreateEngine();
            unityContext = new UnityUGUIContext(Root, engine, NamedAssets);
            CreateLocation(engine, scriptObj);

            engine.SetValue("Unity", typeof(ReactUnityAPI));
            engine.SetValue("RootContainer", unityContext.Host);
            engine.SetValue("NamedAssets", NamedAssets);
            try
            {
                if (preload != null) preload.ForEach(x => engine.Execute(x.text));
                engine.Execute(script);
                callback?.Invoke();
            }
            catch (ParserException ex)
            {
                Debug.LogError($"Parser exception in line {ex.LineNumber} column {ex.Column}");
                Debug.LogException(ex);
            }
            catch (Exception ex)
            {
                var lastNode = engine.GetLastSyntaxNode();
                Debug.LogError($"Runtime exception in {lastNode.Location.Start.Line}:{lastNode.Location.Start.Column} - {lastNode.Location.End.Line}:{lastNode.Location.End.Column}");
                Debug.LogException(ex);
            }
        }

        public void ExecuteScript(string script)
        {
            engine.Execute(script);
        }

        void CreateEngine()
        {
            engine = new Engine(e => e.CatchClrExceptions(ex =>
            {
                var lastNode = engine.GetLastSyntaxNode();
                Debug.LogError($"CLR exception in {lastNode.Location.Start.Line}:{lastNode.Location.Start.Column} - {lastNode.Location.End.Line}:{lastNode.Location.End.Column}");
                Debug.LogError(ex);
                return true;
            }));
            engine.ClrTypeConverter = new NullableTypeConverter(engine);

            engine
                .SetValue("log", new Func<object, object>((x) => { Debug.Log(x); return x; }))
                .Execute("jlog = (x, replacer, space) => { log(JSON.stringify(x, replacer, space)); return x; };")
                .Execute("__dirname = '';")
                .Execute("WeakMap = Map;")
                .Execute("global = window = parent = this;")
                .Execute("setTimeout = setInterval = clearTimeout = clearInterval = null;")
                .Execute("btoa = atob = null;")
                .Execute("process = { env: { NODE_ENV: 'production' }, argv: [], on: () => {} };");

            CreateConsole(engine);
            CreateLocalStorage(engine);
            CreateScheduler(engine);
            engine.SetValue("YogaValueNative", typeof(Facebook.Yoga.YogaValue));
            engine.SetValue("ColorNative", typeof(Color));
            engine.SetValue("ShadowDefinitionNative", typeof(ShadowDefinition));

            // Load polyfills
            engine.Execute(Resources.Load<TextAsset>("ReactUnity/polyfills/promise").text);
        }

        ObjectInstance CreateConsole(Engine engine)
        {
            var console = new ObjectInstance(engine);

            var methods = new Dictionary<string, Action<object>>
        {
            { "debug", Debug.Log },
            { "log", Debug.Log },
            { "info", Debug.Log },
            { "warn", Debug.LogWarning },
            { "error", x => {

                var lastNode = engine.GetLastSyntaxNode();
                Debug.LogError($"Runtime exception in {lastNode.Location.Start.Line}:{lastNode.Location.Start.Column} - {lastNode.Location.End.Line}:{lastNode.Location.End.Column}");
                Debug.LogError(x);
            } },
        };
            engine.SetValue("console", console);

            foreach (var item in methods)
            {
                console.FastAddProperty(item.Key, JsValue.FromObject(engine,
                    new Func<object, object[], object>((x, args) => { item.Value(x + "\n" + string.Join(",", args)); return x; })), true, true, false);

                engine.Execute($@"(function() {{
var old = console.{item.Key};
console.{item.Key} = (x, ...args) => old(x, args);
        }})()");
            }

            console.FastAddProperty("assert", JsValue.FromObject(engine, new Action<bool>((x) => { Debug.Assert(x); })), false, true, false);
            console.FastAddProperty("clear", JsValue.FromObject(engine, new Action(() => { Debug.ClearDeveloperConsole(); })), false, true, false);

            return console;
        }

        void CreateScheduler(Engine engine)
        {
            scheduler = new UnityScheduler();
            engine.SetValue("UnityScheduler", scheduler);
            engine.SetValue("setTimeout", new Func<JsValue, int, int>(scheduler.setTimeout));
            engine.SetValue("setInterval", new Func<JsValue, int, int>(scheduler.setInterval));
            engine.SetValue("clearTimeout", new Action<int?>(scheduler.clearTimeout));
            engine.SetValue("clearInterval", new Action<int?>(scheduler.clearInterval));
            engine.SetValue("requestAnimationFrame", new Func<JsValue, int>(scheduler.requestAnimationFrame));
            engine.SetValue("cancelAnimationFrame", new Action<int?>(scheduler.cancelAnimationFrame));
        }

        void CreateLocalStorage(Engine engine)
        {
            var storage = new ObjectInstance(engine);
            engine.SetValue("localStorage", storage);


            storage.FastAddProperty("setItem",
                JsValue.FromObject(engine, new Action<string, string>(PlayerPrefs.SetString)),
                false, true, false);
            storage.FastAddProperty("getItem",
                JsValue.FromObject(engine, new Func<string, string>(x => PlayerPrefs.GetString(x, ""))),
                false, true, false);
        }

        void CreateLocation(Engine engine, ReactScript script)
        {
            var location = new ObjectInstance(engine);
            engine.SetValue("location", location);

            var href = script.SourceLocation;
            var hrefSplit = href.Split(new string[] { "//" }, 2, StringSplitOptions.None);

            var protocol = hrefSplit.Length > 1 ? hrefSplit.First() : null;

            var hrefWithoutProtocol = hrefSplit.Length > 1 ? string.Join("", hrefSplit.Skip(1)) : href;
            var hrefWithoutProtocolSplit = hrefWithoutProtocol.Split(new string[] { "/" }, 2, StringSplitOptions.None);

            var host = hrefWithoutProtocolSplit.FirstOrDefault();
            var hostSplit = host.Split(new string[] { ":" }, 2, StringSplitOptions.None);
            var hostName = hostSplit.First();
            var port = hostSplit.ElementAtOrDefault(1) ?? "";

            var origin = protocol + "//" + host;
            var pathName = string.Join("", hrefWithoutProtocolSplit.Skip(1));

            location.FastAddProperty("reload", JsValue.FromObject(engine, new Action(() => MainThreadDispatcher.OnUpdate(Restart))), false, true, false);
            location.FastAddProperty("href", href, false, true, false);
            location.FastAddProperty("protocol", protocol, false, true, false);
            location.FastAddProperty("hostname", hostName, false, true, false);
            location.FastAddProperty("origin", origin, false, true, false);
            location.FastAddProperty("host", host, false, true, false);
            location.FastAddProperty("port", port, false, true, false);
            location.FastAddProperty("search", "", false, true, false);
            location.FastAddProperty("pathname", pathName, false, true, false);

#if UNITY_EDITOR
            engine.SetValue("WebSocket", typeof(WebSocketProxy));
            engine.SetValue("XMLHttpRequest", typeof(XMLHttpRequest));
            engine.Execute(@"(function() {
  var oldXMLHttpRequest = XMLHttpRequest;
  XMLHttpRequest = function() { return new oldXMLHttpRequest('" + origin + @"'); }
})();");
#endif
            engine.SetValue("document", new DocumentProxy(unityContext, this, origin));
        }
    }
}
