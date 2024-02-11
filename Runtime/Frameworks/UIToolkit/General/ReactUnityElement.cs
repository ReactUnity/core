using System;
using ReactUnity.Helpers;
using ReactUnity.Scheduling;
using ReactUnity.Scripting;
using ReactUnity.Styling.Rules;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class ReactUnityElement : VisualElement
    {
        [Serializable]
        public class ReactAdvancedOptions
        {
            public ReactContext.PoolingType Pooling = ReactContext.PoolingType.Basic;
            public ReactContext.UnknownPropertyHandling UnknownPropertyHandling = ReactContext.UnknownPropertyHandling.Log;
            public Action BeforeStart;
            public Action AfterStart;
        }

        public ReactContext Context { get; private set; }
        public ITimer Timer { get; protected set; }
        public IMediaProvider MediaProvider { get; private set; }

        public ScriptSource Script { get; }
        public GlobalRecord Globals { get; }
        public JavascriptEngineType EngineType { get; }

        public bool Debug = false;
        public bool AwaitDebugger = false;

        public ReactAdvancedOptions AdvancedOptions { get; set; }


        public ReactUnityElement(ScriptSource script, GlobalRecord globals, ITimer timer, IMediaProvider mediaProvider, JavascriptEngineType engineType = JavascriptEngineType.Auto, bool debug = false, bool awaitDebugger = false, bool autorun = true, ReactAdvancedOptions advancedOptions = null)
        {
            Script = script;
            Globals = globals;
            MediaProvider = mediaProvider;
            EngineType = engineType;
            Debug = debug;
            Timer = timer;
            AwaitDebugger = awaitDebugger;
            AdvancedOptions = advancedOptions;
            AddToClassList("react-unity__host");
            if (autorun) Run();
        }

        public virtual void Run()
        {
            if (Context != null) throw new Exception("ReactUnity UIToolkit is already running");
            var src = Script;

            Context = CreateContext(src);
            Context.Start();
        }

        public void Destroy()
        {
            Clear();
            Context?.Dispose();
            Context = null;
        }

        public virtual void Restart()
        {
            Destroy();
            Run();
        }

        protected virtual ReactContext CreateContext(ScriptSource script)
        {
            var ctx = new UIToolkitContext(new UIToolkitContext.Options
            {
                HostElement = this,
                Globals = Globals,
                Source = script,
                Timer = Timer ?? UnscaledTimer.Instance,
                MediaProvider = MediaProvider,
                OnRestart = Restart,
                Debug = Debug,
                AwaitDebugger = AwaitDebugger,
                EngineType = EngineType,
                BeforeStart = AdvancedOptions.BeforeStart,
                AfterStart = AdvancedOptions.AfterStart,
                Pooling = AdvancedOptions.Pooling,
                UnknownPropertyHandling = AdvancedOptions.UnknownPropertyHandling,
            });
            ctx.Initialize();
            return ctx;
        }
    }
}
