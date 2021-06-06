using Jint.Native;
using ReactUnity.Dispatchers;
using ReactUnity.Helpers;
using ReactUnity.ScriptEngine;
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

        private readonly GUIContent enableDebugContent = EditorGUIUtility.TrTextContent("Enable Debug");
        protected bool DebugEnabled
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
        protected bool AwaitDebugger
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

        protected JavascriptEngineType EngineType
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
        protected bool DebugEnabled => false;
        protected bool AwaitDebugger => false;
        protected JavascriptEngineType JavascriptEngineType => JavascriptEngineType.Auto;
#endif

        protected virtual void OnEnable()
        {
            Run();
        }

        public virtual void Run(VisualElement root = null)
        {
            if (hostElement != null) OnDestroy();
            hostElement = new ReactUnityElement(GetScript(), GetGlobals(), new DefaultMediaProvider("window"), EngineType, DebugEnabled, AwaitDebugger);
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

        public Action AddSelectionChange(object cb)
        {
            var cbObject = new Callback(cb);
            var callback = new Action<ReactWindow>((arg1) => cbObject.Call(arg1));
            SelectionChange += callback;
            return () => SelectionChange -= callback;
        }

        public Action AddSelectionChange(JsValue cb)
        {
            return AddSelectionChange(cb as object);
        }

        public Action AddPlayModeStateChange(object cb)
        {
            var cbObject = new Callback(cb);
            var callback = new Action<PlayModeStateChange>(x => cbObject.Call(x, this));
            EditorApplication.playModeStateChanged += callback;
            return () => EditorApplication.playModeStateChanged -= callback;
        }

        public Action AddPlayModeStateChange(JsValue cb)
        {
            return AddPlayModeStateChange(cb as object);
        }

        public Action AddVisibilityChange(object cb)
        {
            var cbObject = new Callback(cb);
            var callback = new Action<bool, ReactWindow>((arg1, arg2) => cbObject.Call(arg1, arg2));
            VisibilityChange += callback;
            return () => VisibilityChange -= callback;
        }

        public Action AddVisibilityChange(JsValue cb)
        {
            return AddVisibilityChange(cb as object);
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
            menu.AddItem(new GUIContent("Jint"), EngineType == JavascriptEngineType.Jint, () => EngineType = JavascriptEngineType.Jint);
            menu.AddItem(new GUIContent("ClearScript"), EngineType == JavascriptEngineType.ClearScript, () => EngineType = JavascriptEngineType.ClearScript);
#endif
        }
    }
}
