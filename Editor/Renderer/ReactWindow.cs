using ReactUnity.Editor.Components;
using ReactUnity.Schedulers;
using ReactUnity.Types;
using System;
using UnityEditor;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer
{
    public abstract class ReactWindow : EditorWindow, IHasCustomMenu
    {
        private readonly GUIContent resetGUIContent = EditorGUIUtility.TrTextContent("Reload");

        protected IDisposable ScriptWatchDisposable;
        protected ReactUnityRunner runner;
        protected EditorContext context;
        protected IDispatcher dispatcher;

        protected abstract ReactScript GetScript();

        public event Action<ReactWindow> SelectionChange;

#if REACT_UNITY_DEVELOPER
        private readonly GUIContent enableDevServerContent = EditorGUIUtility.TrTextContent("Enable DevSever");
        protected bool DevServerEnabled
        {
            get
            {
                return !EditorPrefs.GetBool($"ReactUnity.Editor.ReactWindow.{GetType().Name}.DevServerDisabled");
            }
            set
            {
                EditorPrefs.SetBool($"ReactUnity.Editor.ReactWindow.{GetType().Name}.DevServerDisabled", !value);
            }
        }
#endif

        protected virtual void OnEnable()
        {
            Run();
        }

        public virtual void Run(VisualElement host = null)
        {
            if (host == null)
            {
                host = new VisualElement();
                rootVisualElement.Add(host);
                host.AddToClassList("react-unity__host");
            }

            host.Clear();
            var src = GetScript();

            runner = new ReactUnityRunner();

            dispatcher = new EditorDispatcher();

            ScriptWatchDisposable = src.GetScript((sc, isDevServer) =>
            {
                var globals = GetGlobals();
                context = new EditorContext(host, globals, src, dispatcher, new UnityScheduler(dispatcher), isDevServer, this, () => Restart(host));
                runner.RunScript(sc, context);
            }, dispatcher, true, true);
        }

        protected virtual StringObjectDictionary GetGlobals()
        {
            return new StringObjectDictionary()
            {
                {  "Editor", this }
            };
        }

        protected virtual void OnDestroy()
        {
            if (ScriptWatchDisposable != null) ScriptWatchDisposable.Dispose();
            context?.Dispose();
            dispatcher?.Dispose();
            runner = null;
            context = null;
            dispatcher = null;
            ScriptWatchDisposable = null;
        }

        public virtual void Restart(VisualElement host = null)
        {
            OnDestroy();
            Run(host);
        }

        private void OnSelectionChange()
        {
            SelectionChange?.Invoke(this);
        }

        public Action AddSelectionChange(Action<ReactWindow> callback)
        {
            SelectionChange += callback;
            return () => SelectionChange -= callback;
        }

        public Action AddPlayModeStateChange(Action<PlayModeStateChange, ReactWindow> callback)
        {
            Action<PlayModeStateChange> cb = x => callback(x, this);
            EditorApplication.playModeStateChanged += cb;
            return () => EditorApplication.playModeStateChanged -= cb;
        }

        public void AddItemsToMenu(GenericMenu menu)
        {
            menu.AddItem(resetGUIContent, false, () => Restart((context?.Host as HostComponent)?.Element));

#if REACT_UNITY_DEVELOPER
            menu.AddItem(enableDevServerContent, DevServerEnabled, () => DevServerEnabled = !DevServerEnabled);
#endif
        }
    }
}
