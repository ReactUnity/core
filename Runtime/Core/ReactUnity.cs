using Esprima;
using Jint;
using Jint.Native;
using Jint.Native.Object;
using ReactUnity.Interop;
using ReactUnity.Schedulers;
using ReactUnity.Styling;
using ReactUnity.Types;
using System;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity
{

    public class ReactUnity : MonoBehaviour
    {
        private Engine engine;
        private UnityUGUIContext unityContext;
        private UnityScheduler scheduler;

        public RectTransform DocumentRoot;
        public StringObjectDictionary NamedAssets = new StringObjectDictionary();
        public ReactScript Script;

        private IDisposable ScriptWatchDisposable;

        void OnEnable()
        {
            MainThreadDispatcher.Initialize();
            Restart();
        }

        void OnDisable()
        {
            if (ScriptWatchDisposable != null) ScriptWatchDisposable.Dispose();
        }

        void Clean()
        {
            foreach (Transform children in DocumentRoot)
            {
                DestroyImmediate(children.gameObject);
            }

            scheduler?.clearAllTimeouts();
        }

        [ContextMenu("Restart")]
        public void Restart()
        {
            int debounce = -1;
            ScriptWatchDisposable = Script.GetScript((script) =>
            {
                if (debounce >= 0) MainThreadDispatcher.StopDeferred(debounce);
                debounce = MainThreadDispatcher.Timeout(() => RunScript(script), 0.5f);
            }, out var result);
            RunScript(result);
        }

        void RunScript(string script)
        {
            if (string.IsNullOrWhiteSpace(script)) return;

            Clean();

            if (engine == null) CreateEngine();
            unityContext = new UnityUGUIContext(DocumentRoot, engine, NamedAssets);
            engine.SetValue("Unity", typeof(ReactUnityAPI));
            engine.SetValue("RootContainer", unityContext.Host);
            engine.SetValue("NamedAssets", NamedAssets);
            try
            {
                engine.Execute(script);
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
            engine = new Engine();
            engine.ClrTypeConverter = new NullableTypeConverter(engine);

            engine
                .SetValue("log", new Func<object, object>((x) => { Debug.Log(x); return x; }))
                .Execute("jlog = (x, replacer, space) => { log(JSON.stringify(x, replacer, space)); return x; };")
                .Execute("__dirname = '';")
                .Execute("WeakMap = Map;")
                .Execute("global = this; module = { exports: {} };")
                .Execute("setTimeout = setInterval = clearTimeout = clearInterval = null;")
                .Execute("process = { env: { NODE_ENV: 'production' }, argv: [], on: () => {} };");

            CreateConsole(engine);
            CreateLocalStorage(engine);
            CreateScheduler(engine);
            engine.SetValue("YogaValueNative", typeof(Facebook.Yoga.YogaValue));
            engine.SetValue("ColorNative", typeof(Color));
            engine.SetValue("ShadowDefinitionNative", typeof(ShadowDefinition));
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
            { "error", Debug.LogError },
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
            engine.SetValue("clearTimeout", new Action<int>(scheduler.clearTimeout));
            engine.SetValue("clearInterval", new Action<int>(scheduler.clearInterval));
            engine.SetValue("requestAnimationFrame", new Func<JsValue, int>(scheduler.requestAnimationFrame));
            engine.SetValue("cancelAnimationFrame", new Action<int>(scheduler.cancelAnimationFrame));
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
    }
}
