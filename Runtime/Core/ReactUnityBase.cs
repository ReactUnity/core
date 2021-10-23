using ReactUnity.Helpers;
using ReactUnity.Scheduling;
using ReactUnity.Scripting;
using ReactUnity.Styling.Rules;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.Serialization;

namespace ReactUnity
{
    public abstract class ReactUnityBase : MonoBehaviour
    {
        [FormerlySerializedAs("Script")]
        public ScriptSource Source = new ScriptSource() { Type = ScriptSourceType.Resource, SourcePath = "react/index", Watch = true };

        [Tooltip("Serve debugging protocol on port 9222")]
        public bool Debug = false;
        public bool AwaitDebugger = false;

        public JavascriptEngineType EngineType = JavascriptEngineType.Auto;

        public IMediaProvider MediaProvider { get; private set; }
        public ReactContext Context { get; private set; }
        public ITimer timer { get; set; }

        public SerializableDictionary Globals = new SerializableDictionary();

        #region Advanced Options

        [HideInInspector] public bool AutoRender = true;
        [HideInInspector] public UnityEvent BeforeStart = new UnityEvent();
        [HideInInspector] public UnityEvent AfterStart = new UnityEvent();

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
            ClearRoot();
            Context?.Dispose();
            Context = null;
        }

        protected abstract void ClearRoot();

        private void LoadAndRun(ScriptSource script)
        {
            MediaProvider = CreateMediaProvider();
            Context = CreateContext(script);
            Context.Start();
        }

        [ContextMenu("Restart")]
        public void Render()
        {
            Clean();
            LoadAndRun(Source);
        }

        protected abstract ReactContext CreateContext(ScriptSource script);
        protected abstract IMediaProvider CreateMediaProvider();
    }
}
