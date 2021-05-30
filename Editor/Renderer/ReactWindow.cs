using ReactUnity.Dispatchers;
using ReactUnity.Helpers;
using ReactUnity.StyleEngine;
using System;
using UnityEditor;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer
{
    public abstract class ReactWindow : EditorWindow, IHasCustomMenu
    {
        private readonly GUIContent resetGUIContent = EditorGUIUtility.TrTextContent("Reload");

        protected ReactUnityRunner runner => hostElement?.runner;
        protected EditorContext context => hostElement?.context;
        protected IDispatcher dispatcher => hostElement?.dispatcher;
        protected IMediaProvider mediaProvider => hostElement?.MediaProvider;
        protected ReactUnityElement hostElement { get; private set; }

        public event Action<ReactWindow> SelectionChange;
        public event Action<bool, ReactWindow> VisibilityChange;

#if REACT_UNITY_DEVELOPER
        private readonly GUIContent enableDevServerContent = EditorGUIUtility.TrTextContent("Enable DevSever");
        protected bool DevServerEnabled
        {
            get
            {
                return EditorPrefs.GetBool($"ReactUnity.Editor.ReactWindow.{GetType().Name}.DevServerEnabled");
            }
            set
            {
                EditorPrefs.SetBool($"ReactUnity.Editor.ReactWindow.{GetType().Name}.DevServerEnabled", value);
            }
        }
#endif

        protected virtual void OnEnable()
        {
            Run();
        }

        public virtual void Run(VisualElement root = null)
        {
            if (hostElement != null) OnDestroy();
            hostElement = new ReactUnityElement(GetScript(), GetGlobals(), new DefaultMediaProvider("window"));
            (root ?? rootVisualElement).Add(hostElement);
        }

        protected abstract ReactScript GetScript();

        protected virtual GlobalRecord GetGlobals()
        {
            return new GlobalRecord()
            {
                { "Window", this },
            };
        }

        protected virtual void OnDestroy()
        {
            hostElement?.RemoveFromHierarchy();
            hostElement?.Destroy();
            hostElement = null;
        }

        public virtual void Restart(VisualElement root = null)
        {
            OnDestroy();
            Run(root);
        }

        private void OnSelectionChange()
        {
            SelectionChange?.Invoke(this);
        }

        protected void OnBecameVisible()
        {
            VisibilityChange?.Invoke(true, this);
        }

        protected void OnBecameInvisible()
        {
            VisibilityChange?.Invoke(true, this);
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

        public Action AddVisibilityChange(Action<bool, ReactWindow> callback)
        {
            VisibilityChange += callback;
            return () => VisibilityChange -= callback;
        }

        public void AddItemsToMenu(GenericMenu menu)
        {
            menu.AddItem(resetGUIContent, false, () => Restart());

#if REACT_UNITY_DEVELOPER
            menu.AddItem(enableDevServerContent, DevServerEnabled, () => DevServerEnabled = !DevServerEnabled);
#endif
        }
    }
}
