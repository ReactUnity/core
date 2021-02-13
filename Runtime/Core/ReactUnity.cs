using Esprima;
using Jint.Native;
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
        private Jint.Engine engine;
        private UGUIContext unityContext;
        private UnityScheduler scheduler;

        public StringObjectDictionary Globals = new StringObjectDictionary();
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
            Clean();
        }

        private void OnDestroy()
        {
            Clean();
        }

        void Clean()
        {
            if (ScriptWatchDisposable != null) ScriptWatchDisposable.Dispose();

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
            ScriptWatchDisposable = script.GetScript((code, isDevServer) =>
            {
                if (debounce >= 0) MainThreadDispatcher.StopDeferred(debounce);
                debounce = MainThreadDispatcher.Timeout(() => RunScript(code, isDevServer, script, preload, callback), 0.5f);
            }, out var result, true, disableWarnings);
            RunScript(result, false, script, preload, callback);
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

        void RunScript(string script, bool isDevServer, ReactScript scriptObj, List<TextAsset> preload = null, Action callback = null)
        {
            if (string.IsNullOrWhiteSpace(script)) return;

            Clean();

            if (engine == null) CreateEngine();
            unityContext = new UGUIContext(Root, engine, Globals, scriptObj, isDevServer);
            CreateLocation(engine, scriptObj);

            List<Action> callbacks = new List<Action>() { callback };

            engine.SetValue("addEventListener", new Action<string, Action>((e, f) =>
            {
                if (e == "DOMContentLoaded") callbacks.Add(f);
            }));

            engine.SetValue("Unity", new ReactUnityAPI(engine));
            engine.SetValue("RootContainer", unityContext.Host);
            engine.SetValue("Globals", Globals);
            try
            {
                if (preload != null) preload.ForEach(x => engine.Execute(x.text));
                engine.Execute(script);
                callbacks.ForEach(x => x?.Invoke());
            }
            catch (ParserException ex)
            {
                Debug.LogError($"Parser exception in line {ex.LineNumber} column {ex.Column}");
                Debug.LogException(ex);
            }
            catch (Jint.Runtime.JavaScriptException ex)
            {
                Debug.LogError($"JS exception in line {ex.LineNumber} column {ex.Column}");
                Debug.LogException(ex);
            }
            catch (Jint.Runtime.JintException ex)
            {
                Debug.LogException(ex);
            }
            catch (Exception ex)
            {
                Debug.LogException(ex);
            }
        }

        public void ExecuteScript(string script)
        {
            engine.Execute(script);
        }

        void CreateEngine()
        {
            engine = new Jint.Engine(x =>
            {
                x.AllowClr();
                x.CatchClrExceptions(ex =>
                {
                    Debug.LogException(ex);
                    return true;
                });
            });

            engine.SetValue("log", new Func<object, object>((x) => { Debug.Log(x); return x; }));
            engine.Execute("__dirname = '';");
            engine.Execute("WeakMap = Map;");
            engine.Execute("globalThis = global = window = parent = this;");
            engine.Execute("setTimeout = setInterval = clearTimeout = clearInterval = null;");
            engine.Execute("btoa = atob = null;");
            engine.Execute("process = { env: { NODE_ENV: 'production' }, argv: [], on: () => {} };"); ;


            engine.SetValue("Engine", engine);
            engine.SetValue("Callback", typeof(Callback));

            CreateConsole(engine);
            CreateLocalStorage(engine);
            CreateScheduler(engine);
            engine.SetValue("YogaValue", typeof(Facebook.Yoga.YogaValue));
            engine.SetValue("Color", typeof(Color));
            engine.SetValue("ShadowDefinition", typeof(ShadowDefinition));
            engine.SetValue("Vector2", typeof(Vector2));
            engine.SetValue("Vector3", typeof(Vector3));
            engine.SetValue("Rect", typeof(Rect));
            engine.SetValue("RectOffset", typeof(RectOffset));
            engine.SetValue("Action", typeof(Action));

            // Load polyfills
            engine.Execute(Resources.Load<TextAsset>("ReactUnity/polyfills/promise").text);
            engine.Execute(Resources.Load<TextAsset>("ReactUnity/polyfills/base64").text);
            engine.Execute(Resources.Load<TextAsset>("ReactUnity/polyfills/fetch").text);
        }

        void CreateConsole(Jint.Engine engine)
        {
            var console = new ConsoleProxy(engine);

            engine.SetValue("console", console);
        }

        void CreateScheduler(Jint.Engine engine)
        {
            scheduler = new UnityScheduler();
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

        void CreateLocalStorage(Jint.Engine engine)
        {
            var storage = new LocalStorage();
            engine.SetValue("localStorage", storage);
        }

        void CreateLocation(Jint.Engine engine, ReactScript script)
        {
            var location = new DomProxies.Location(script.SourceLocation, Restart);
            engine.SetValue("location", location);

#if UNITY_EDITOR
            engine.SetValue("WebSocket", typeof(WebSocketProxy));
            engine.SetValue("oldXMLHttpRequest", typeof(XMLHttpRequest));
            engine.Execute(@"XMLHttpRequest = function() { return new oldXMLHttpRequest('" + location.origin + @"'); }");
#endif
            engine.SetValue("document", new DocumentProxy(unityContext, this, location.origin));
        }
    }
}
