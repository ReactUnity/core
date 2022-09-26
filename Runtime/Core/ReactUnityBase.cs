using System;
using System.Collections;
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
        public enum DebugMode
        {
            None = 0,
            Debug = 1,
            DebugAndAwait = 2,
        }

        [Serializable]
        public class ReactAdvancedOptions
        {
            [Tooltip("Controls whether the pooling is enabled. Basic pooling enables pooling only for basic components like text and pseudo components.")]
            public ReactContext.PoolingType Pooling = ReactContext.PoolingType.Basic;
            public float MediaUpdateInterval = 0.5f;
            [Tooltip("Serve debugging protocol on port 9222")]
            public DebugMode DebugMode = DebugMode.None;
            public bool AutoRender = true;
            public List<TextAsset> Stylesheets = new List<TextAsset>();
            [Space(10)]
            public UnityEvent BeforeStart = new UnityEvent();
            public UnityEvent AfterStart = new UnityEvent();
        }

        [FormerlySerializedAs("Script")]
        public ScriptSource Source = new ScriptSource() { Type = ScriptSourceType.Resource, SourcePath = "react/index", Watch = true };

        public JavascriptEngineType EngineType = JavascriptEngineType.Auto;

        public IMediaProvider MediaProvider { get; private set; }
        public ReactContext Context { get; private set; }
        public ITimer timer { get; set; }

        public SerializableDictionary Globals = new SerializableDictionary();
        public ReactAdvancedOptions AdvancedOptions = new ReactAdvancedOptions();

        private Coroutine MediaProviderCoroutine;

        void OnEnable()
        {
            if (AdvancedOptions.AutoRender) Render();
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
            if (MediaProviderCoroutine != null) StopCoroutine(MediaProviderCoroutine);
            MediaProviderCoroutine = null;
            Context?.Dispose();
            Context = null;
        }

        protected abstract void ClearRoot();

        private void LoadAndRun(ScriptSource script, Action afterStart = null)
        {
            MediaProvider = CreateMediaProvider();
            MediaProviderCoroutine = StartCoroutine(UpdateMediaProvider());
            if (AdvancedOptions == null) AdvancedOptions = new ReactAdvancedOptions();
            Context = CreateContext(script);

            if (AdvancedOptions.Stylesheets != null)
            {
                foreach (var sheet in AdvancedOptions.Stylesheets)
                {
                    if (sheet) Context.InsertStyle(sheet.text);
                }
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

        protected virtual IEnumerator UpdateMediaProvider()
        {
            var wait = new WaitForSeconds(AdvancedOptions.MediaUpdateInterval);
            while (true)
            {
                yield return wait;

                if (Context?.MediaProvider is DefaultMediaProvider df)
                {
                    df.SetUpdatesSuspended(true);
                    df.RecalculateScreenAndDevices();
                    df.RecalculateInput();
                    df.SetUpdatesSuspended(false);
                }
            }
        }

        public class WaitForRenderToComplete : CustomYieldInstruction
        {
            public bool rendered { get; internal set; } = false;
            public override bool keepWaiting => !rendered;
        }
    }
}
