using ReactUnity.Schedulers;
using ReactUnity.Types;
using System;
using UnityEngine;
using UnityEngine.Events;

namespace ReactUnity
{
    public class ReactUnity : MonoBehaviour
    {
        public StringObjectDictionary Globals = new StringObjectDictionary();
        public ReactScript Script = new ReactScript() { ScriptSource = ScriptSource.Resource, SourcePath = "react/index" };
        private ReactScript TestScript = new ReactScript() { ScriptSource = ScriptSource.Url, SourcePath = "http://localhost:9876/context.html", UseDevServer = false };

        public UGUIContext Context { get; private set; }
        private IDisposable ScriptWatchDisposable { get; set; }
        private IDispatcher dispatcher { get; set; }
        private ReactUnityRunner runner { get; set; }
        public RectTransform Root => transform as RectTransform;

        #region Advanced Options

        [HideInInspector] public bool AutoRender = true;
        [HideInInspector] public UnityEvent<ReactUnityRunner> BeforeStart;
        [HideInInspector] public UnityEvent<ReactUnityRunner> AfterStart;

        #endregion

        void OnEnable()
        {
            if (AutoRender) Render();
        }

        void OnDisable()
        {
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

            Context?.Dispose();
            dispatcher?.Dispose();
            runner = null;
            dispatcher = null;
            Context = null;
            ScriptWatchDisposable = null;
        }

        private IDisposable LoadAndRun(ReactScript script, bool disableWarnings = false)
        {
            dispatcher = Application.isPlaying ? RuntimeDispatcher.Create() as IDispatcher : new EditorDispatcher();
            runner = new ReactUnityRunner();
            var watcherDisposable = script.GetScript((code, isDevServer) =>
            {
                Context = new UGUIContext(Root, Globals, script, dispatcher, new UnityScheduler(dispatcher), isDevServer, Render);
                runner.RunScript(code, Context, BeforeStart, AfterStart);
            }, dispatcher, true, disableWarnings);

            return watcherDisposable;
        }

        [ContextMenu("Restart")]
        public void Render()
        {
            Clean();
            ScriptWatchDisposable = LoadAndRun(Script, false);
        }

        private void Test(bool debug = false)
        {
            Clean();
            ScriptWatchDisposable = LoadAndRun(TestScript, true);
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
