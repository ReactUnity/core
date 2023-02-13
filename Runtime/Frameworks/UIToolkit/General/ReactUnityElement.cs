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
        public ReactContext Context { get; private set; }
        public ITimer Timer { get; protected set; }
        public IMediaProvider MediaProvider { get; private set; }

        public ScriptSource Script { get; }
        public SerializableDictionary Globals { get; }
        public JavascriptEngineType EngineType { get; }

        public bool Debug = false;
        public bool AwaitDebugger = false;


        public ReactUnityElement(ScriptSource script, SerializableDictionary globals, ITimer timer, IMediaProvider mediaProvider, JavascriptEngineType engineType = JavascriptEngineType.Auto, bool debug = false, bool awaitDebugger = false, bool autorun = true)
        {
            Script = script;
            Globals = globals;
            MediaProvider = mediaProvider;
            EngineType = engineType;
            Debug = debug;
            Timer = timer;
            AwaitDebugger = awaitDebugger;
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
            });
            ctx.Initialize();
            return ctx;
        }
    }
}
