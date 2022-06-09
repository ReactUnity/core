using System;
using ReactUnity.Editor.UIToolkit;
using ReactUnity.Helpers;
using ReactUnity.Scheduling;
using ReactUnity.Scripting;
using ReactUnity.Styling.Rules;
using UnityEditor;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Renderer
{
    public abstract class ReactWindow : EditorWindow, IHasCustomMenu
    {
        private readonly GUIContent resetGUIContent = EditorGUIUtility.TrTextContent("Reload");

        public ReactContext Context => HostElement?.Context;
        public ReactUnityEditorElement HostElement { get; private set; }

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

        private readonly GUIContent enableDebugContent = EditorGUIUtility.TrTextContent("Enable Debug");
        public virtual bool DebugEnabled
        {
            get
            {
                return EditorPrefs.GetBool($"ReactUnity.Editor.ReactWindow.{GetType().Name}.DebugEnabled");
            }
            set
            {
                EditorPrefs.SetBool($"ReactUnity.Editor.ReactWindow.{GetType().Name}.DebugEnabled", value);
            }
        }

        private readonly GUIContent awaitDebuggerContent = EditorGUIUtility.TrTextContent("Await Debugger");
        public virtual bool AwaitDebugger
        {
            get
            {
                return EditorPrefs.GetBool($"ReactUnity.Editor.ReactWindow.{GetType().Name}.AwaitDebugger");
            }
            set
            {
                EditorPrefs.SetBool($"ReactUnity.Editor.ReactWindow.{GetType().Name}.AwaitDebugger", value);
            }
        }

        public virtual JavascriptEngineType EngineType
        {
            get
            {
                return (JavascriptEngineType) EditorPrefs.GetInt($"ReactUnity.Editor.ReactWindow.{GetType().Name}.EngineType", 0);
            }
            set
            {
                EditorPrefs.SetInt($"ReactUnity.Editor.ReactWindow.{GetType().Name}.EngineType", (int) value);
            }
        }
#else
        protected bool DevServerEnabled => false;
        public virtual bool DebugEnabled { get; set; } = false;
        public virtual bool AwaitDebugger { get; set; } = false;
        public virtual JavascriptEngineType EngineType { get; set; } = JavascriptEngineType.Auto;
#endif
        public virtual ITimer Timer { get; set; }
        public virtual bool AutoRun => true;

        protected virtual void OnEnable()
        {
            if (AutoRun) Run();
        }

        public virtual void Run(VisualElement root = null)
        {
            if (HostElement != null) OnDestroy();
            HostElement = new ReactUnityEditorElement(GetScript(), GetGlobals(), Timer,
                DefaultMediaProvider.CreateMediaProvider("window", "uitoolkit", true),
                EngineType, DebugEnabled, AwaitDebugger);
            HostElement.Window = this;
            HostElement.Run();
            (root ?? rootVisualElement).Add(HostElement);
        }

        protected abstract ScriptSource GetScript();

        protected virtual SerializableDictionary GetGlobals()
        {
            return new SerializableDictionary()
            {
                { "Window", this },
            };
        }

        protected virtual void OnDestroy()
        {
            HostElement?.RemoveFromHierarchy();
            HostElement?.Destroy();
            HostElement = null;
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
            VisibilityChange?.Invoke(false, this);
        }

        public Action AddSelectionChange(object cb)
        {
            var cbObject = Callback.From(cb, Context, this);
            var callback = new Action<ReactWindow>((arg1) => cbObject.CallWithPriority(EventPriority.Discrete, arg1));
            SelectionChange += callback;

            Action dispose = () => SelectionChange -= callback;
            Context.Disposables.Add(dispose);
            return dispose;
        }

        public Action AddPlayModeStateChange(object cb)
        {
            var cbObject = Callback.From(cb, Context, this);
            var callback = new Action<PlayModeStateChange>(x => cbObject.CallWithPriority(EventPriority.Discrete, x, this));
            EditorApplication.playModeStateChanged += callback;

            Action dispose = () => EditorApplication.playModeStateChanged -= callback;
            Context.Disposables.Add(dispose);
            return dispose;
        }

        public Action AddVisibilityChange(object cb)
        {
            var cbObject = Callback.From(cb, Context);
            var callback = new Action<bool, ReactWindow>((arg1, arg2) => cbObject.CallWithPriority(EventPriority.Discrete, arg1, arg2));
            VisibilityChange += callback;

            Action dispose = () => VisibilityChange -= callback;
            Context.Disposables.Add(dispose);
            return dispose;
        }

        public void AddItemsToMenu(GenericMenu menu)
        {
            menu.AddItem(resetGUIContent, false, () => Restart());

#if REACT_UNITY_DEVELOPER
            menu.AddItem(enableDevServerContent, DevServerEnabled, () => DevServerEnabled = !DevServerEnabled);
            menu.AddItem(enableDebugContent, DebugEnabled, () => DebugEnabled = !DebugEnabled);
            menu.AddItem(awaitDebuggerContent, AwaitDebugger, () => AwaitDebugger = !AwaitDebugger);

            menu.AddSeparator("");
            menu.AddItem(new GUIContent("Auto"), EngineType == JavascriptEngineType.Auto, () => EngineType = JavascriptEngineType.Auto);
#if REACT_JINT_AVAILABLE
            menu.AddItem(new GUIContent("Jint"), EngineType == JavascriptEngineType.Jint, () => EngineType = JavascriptEngineType.Jint);
#endif
#if REACT_CLEARSCRIPT_AVAILABLE
            menu.AddItem(new GUIContent("ClearScript"), EngineType == JavascriptEngineType.ClearScript, () => EngineType = JavascriptEngineType.ClearScript);
#endif
#if REACT_QUICKJS_AVAILABLE
            menu.AddItem(new GUIContent("QuickJS"), EngineType == JavascriptEngineType.QuickJS, () => EngineType = JavascriptEngineType.QuickJS);
#endif
#endif
        }
    }
}
