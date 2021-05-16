using ReactUnity.Schedulers;
using ReactUnity.StyleEngine;
using ReactUnity.Types;
using System;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer
{
    public class ReactUnityElement : VisualElement
    {
        protected IDisposable ScriptWatchDisposable;
        public ReactUnityRunner runner { get; private set; }
        public EditorContext context { get; private set; }
        public IDispatcher dispatcher { get; private set; }
        public IMediaProvider MediaProvider { get; private set; }

        public ReactScript Script { get; }
        public GlobalRecord Globals { get; }


        public ReactUnityElement(ReactScript script, GlobalRecord globals, IMediaProvider mediaProvider, bool autorun = true)
        {
            Script = script;
            Globals = globals;
            MediaProvider = mediaProvider;
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
                context = new EditorContext(this, Globals, src, dispatcher, new UnityScheduler(dispatcher), MediaProvider, isDevServer, () => Restart());
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
