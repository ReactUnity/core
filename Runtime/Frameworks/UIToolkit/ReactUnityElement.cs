using System;
using ReactUnity.Dispatchers;
using ReactUnity.Helpers;
using ReactUnity.Schedulers;
using ReactUnity.ScriptEngine;
using ReactUnity.StyleEngine;
using ReactUnity.Timers;
using UnityEngine.UIElements;

namespace ReactUnity.UIToolkit
{
    public class ReactUnityElement : VisualElement
    {
        protected IDisposable ScriptWatchDisposable;
        public ReactUnityRunner runner { get; private set; }
        public ReactContext context { get; private set; }
        public IDispatcher dispatcher { get; private set; }
        public IUnityScheduler scheduler { get; private set; }
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
            var src = Script;

            runner = new ReactUnityRunner();
            dispatcher = CreateDispatcher();
            scheduler = new UnityScheduler(dispatcher);

            ScriptWatchDisposable = src.GetScript((sc, isDevServer) => {
                context = CreateContext(src, isDevServer);
                runner.RunScript(sc, context, EngineType, Debug, AwaitDebugger);
            }, dispatcher, true, true);
        }

        public void Destroy()
        {
            Clear();
            if (ScriptWatchDisposable != null) ScriptWatchDisposable.Dispose();
            context?.Dispose();
            dispatcher?.Dispose();
            runner = null;
            context = null;
            dispatcher = null;
            ScriptWatchDisposable = null;
        }

        public virtual void Restart()
        {
            Destroy();
            Run();
        }

        protected virtual ReactContext CreateContext(ScriptSource script, bool isDevServer)
        {
            return new UIToolkitContext(this, Globals, script, dispatcher, scheduler, Timer ?? UnityTimer.Instance, MediaProvider, isDevServer, Restart);
        }

        protected virtual IDispatcher CreateDispatcher() => new RuntimeDispatcher();
    }
}
