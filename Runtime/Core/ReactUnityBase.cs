using System;
using ReactUnity.Helpers;
using ReactUnity.Scheduling;
using ReactUnity.Scripting;
using ReactUnity.StyleEngine;
using UnityEngine;
using UnityEngine.Events;

namespace ReactUnity
{
    public abstract class ReactUnityBase : MonoBehaviour
    {
        [Serializable]
        public class ScriptContextEvent : UnityEvent<ScriptContext> { }

        public ScriptSource Script = new ScriptSource() { Type = ScriptSourceType.Resource, SourcePath = "react/index" };

        public bool Debug = false;

#if !REACT_UNITY_DEVELOPER
        [HideInInspector]
#endif
        public bool AwaitDebugger = false;

        public JavascriptEngineType EngineType = JavascriptEngineType.Auto;

        public IMediaProvider MediaProvider { get; private set; }
        public ReactContext Context { get; private set; }
        private IDisposable ScriptWatchDisposable { get; set; }
        public IDispatcher dispatcher { get; private set; }
        public ITimer timer { get; set; }

        public SerializableDictionary Globals = new SerializableDictionary();

        #region Advanced Options

        [HideInInspector] public bool AutoRender = true;
        [HideInInspector] public ScriptContextEvent BeforeStart = new ScriptContextEvent();
        [HideInInspector] public ScriptContextEvent AfterStart = new ScriptContextEvent();

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

        private void OnValidate()
        {
            Context?.Globals.UpdateStringObjectDictionary(Globals, true);
        }

        protected virtual void Clean()
        {
            if (ScriptWatchDisposable != null) ScriptWatchDisposable.Dispose();

            ClearRoot();

            Context?.Dispose();
            dispatcher?.Dispose();
            dispatcher = null;
            Context = null;
            ScriptWatchDisposable = null;
        }

        protected abstract void ClearRoot();

        private IDisposable LoadAndRun(ScriptSource script, bool disableWarnings = false)
        {
            dispatcher = Application.isPlaying ? RuntimeDispatcher.Create() as IDispatcher : new EditorDispatcher();
            MediaProvider = CreateMediaProvider();
            Context = CreateContext(script);

            var watcherDisposable = script.GetScript((code, isDevServer) => {
                Context.Script.RunScript(code, BeforeStart, AfterStart);
            }, dispatcher, true, disableWarnings);

            return watcherDisposable;
        }

        [ContextMenu("Restart")]
        public void Render()
        {
            Clean();
            ScriptWatchDisposable = LoadAndRun(Script, false);
        }

        protected abstract ReactContext CreateContext(ScriptSource script);
        protected abstract IMediaProvider CreateMediaProvider();
    }
}
