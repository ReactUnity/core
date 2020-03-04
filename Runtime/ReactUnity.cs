using Jint;
using Jint.Native;
using Jint.Native.Object;
using ReactUnity.Interop;
using ReactUnity.Schedulers;
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
            MainThreadDispatcher.CoroutineForwardRef debounce = null;
            ScriptWatchDisposable = Script.GetScript((script) =>
            {
                if (debounce != null) MainThreadDispatcher.StopDeferred(debounce);
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
            engine.SetValue("Unity", unityContext);
            CreateScheduler(engine);
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
                .Execute("global = this; module = { exports: {} };")
                .Execute("setTimeout = setInterval = clearTimeout = clearInterval = null;")
                .Execute("process = { env: { NODE_ENV: 'production' }, argv: [], on: () => {} };");

            CreateConsole(engine);
            engine.SetValue("YogaValueNative", typeof(Facebook.Yoga.YogaValue));
            engine.SetValue("ColorNative", typeof(Color));
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
            engine.SetValue("clearInterval", new Action<int>(scheduler.clearTimeout));
        }
    }
}
