using System;
using System.Collections.Generic;
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
        public List<TextAsset> Stylesheets = new List<TextAsset>();

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

        private void LoadAndRun(ScriptSource script, Action afterStart = null)
        {
            MediaProvider = CreateMediaProvider();
            Context = CreateContext(script);

            foreach (var sheet in Stylesheets)
            {
                if (sheet) Context.InsertStyle(sheet.text);
            }
            Context.Start(afterStart);
        }

        [ContextMenu("Restart")]
        public WaitForRenderToComplete Render()
        {
            Clean();

            var res = new WaitForRenderToComplete();
            LoadAndRun(Source, () => res.rendered = true);

            if (res.rendered) return null;

            return res;
        }

        protected abstract ReactContext CreateContext(ScriptSource script);
        protected abstract IMediaProvider CreateMediaProvider();


        public class WaitForRenderToComplete : CustomYieldInstruction
        {
            public bool rendered { get; internal set; } = false;
            public override bool keepWaiting => !rendered;
        }
    }
}
