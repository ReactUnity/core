using ReactUnity.Interop;
using ReactUnity.Schedulers;
using ReactUnity.Types;
using System;
using UnityEditor;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer
{
    public abstract class ReactWindow : EditorWindow
    {
        protected IDisposable ScriptWatchDisposable;
        protected ReactUnityRunner runner;
        protected EditorContext context;

        protected abstract ReactScript GetScript();

        protected virtual void OnEnable()
        {
            Run();
        }

        public virtual void Run(VisualElement host = null)
        {
            if (host == null) host = rootVisualElement;

            host.Clear();
            var src = GetScript();

            AdaptiveDispatcher.Initialize();
            runner = new ReactUnityRunner();

            ScriptWatchDisposable = src.GetScript((sc, isDevServer) =>
            {
                context = new EditorContext(host, new StringObjectDictionary(), src, new EditorScheduler(), isDevServer, () => Restart(host));
                runner.RunScript(sc, context);
            }, true, true);
        }

        protected virtual void OnDestroy()
        {
            if (ScriptWatchDisposable != null) ScriptWatchDisposable.Dispose();
            EditorDispatcher.StopAll();

            context?.Dispose();
            runner = null;
            context = null;
            ScriptWatchDisposable = null;
        }

        public virtual void Restart(VisualElement host = null)
        {
            OnDestroy();
            Run(host);
        }
    }
}
