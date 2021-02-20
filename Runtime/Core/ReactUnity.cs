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
        public StringObjectDictionary Globals = new StringObjectDictionary();
        public ReactScript Script = new ReactScript() { ScriptSource = ScriptSource.Resource, SourcePath = "react/index" };
        private ReactScript TestScript = new ReactScript() { ScriptSource = ScriptSource.Url, SourcePath = "http://localhost:9876/context.html", UseDevServer = false };
        public List<TextAsset> PreloadScripts = new List<TextAsset>();

        private UGUIContext ctx;
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

            ctx?.Scheduler.clearAllTimeouts();
        }

        private IDisposable LoadAndRun(ReactScript script, List<TextAsset> preload, Action callback = null, bool disableWarnings = false)
        {
            var ru = new ReactUnityRunner();
            MainThreadDispatcher.Initialize();
            var watcherDisposable = script.GetScript((code, isDevServer) =>
            {
                ctx = new UGUIContext(Root, Globals, script, new UnityScheduler(), isDevServer, Restart);
                ru.RunScript(code, ctx, preload, callback);
            }, true, disableWarnings);

            return watcherDisposable;
        }

        [ContextMenu("Restart")]
        public void Restart()
        {
            Clean();
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

            Clean();
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
    }
}
