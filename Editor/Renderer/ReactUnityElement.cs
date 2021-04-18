using ReactUnity.Schedulers;
using ReactUnity.Types;
using System;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer
{
    public class ReactUnityElement : VisualElement
    {
        protected IDisposable ScriptWatchDisposable;
        protected ReactUnityRunner runner;
        protected EditorContext context;
        protected IDispatcher dispatcher;

        public ReactScript Script { get; }
        public GlobalRecord Globals { get; }
        public ReactUnityElement(ReactScript script, GlobalRecord globals, bool autorun = true)
        {
            Script = script;
            Globals = globals;
            AddToClassList("react-unity__host");
            if (autorun) Run();
        }

        public virtual void Run()
        {
            var src = Script;

            runner = new ReactUnityRunner();

            dispatcher = new EditorDispatcher();

            ScriptWatchDisposable = src.GetScript((sc, isDevServer) =>
            {
                context = new EditorContext(this, Globals, src, dispatcher, new UnityScheduler(dispatcher), isDevServer, () => Restart());
                runner.RunScript(sc, context);
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
    }
}
