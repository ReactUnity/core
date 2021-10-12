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
        protected IDisposable ScriptWatchDisposable;
        public ReactContext context { get; private set; }
        public IDispatcher dispatcher { get; private set; }
        public ITimer Timer { get; protected set; }
        public IMediaProvider MediaProvider { get; private set; }

        public ScriptSource Script { get; }
        public GlobalRecord Globals { get; }
        public JavascriptEngineType EngineType { get; }

        public bool Debug = false;
        public bool AwaitDebugger = false;


        public ReactUnityElement(ScriptSource script, GlobalRecord globals, ITimer timer, IMediaProvider mediaProvider, JavascriptEngineType engineType = JavascriptEngineType.Auto, bool debug = false, bool awaitDebugger = false, bool autorun = true)
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
            if (context != null) throw new Exception("ReactUnity UIToolkit is already running");
            var src = Script;

            dispatcher = CreateDispatcher();
            context = CreateContext(src);

            ScriptWatchDisposable = src.GetScript((sc, isDevServer) => {
                context.Script.RunScript(sc);
            }, dispatcher, true, true);
        }

        public void Destroy()
        {
            Clear();
            if (ScriptWatchDisposable != null) ScriptWatchDisposable.Dispose();
            context?.Dispose();
            dispatcher?.Dispose();
            context = null;
            dispatcher = null;
            ScriptWatchDisposable = null;
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
                Dispatcher = dispatcher,
                Timer = Timer ?? UnityTimer.Instance,
                MediaProvider = MediaProvider,
                OnRestart = Restart,
                Debug = Debug,
                AwaitDebugger = AwaitDebugger,
                EngineType = EngineType,
            });
            ctx.Initialize();
            return ctx;
        }

        protected virtual IDispatcher CreateDispatcher() => new RuntimeDispatcher();
    }
}
