#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT) && REACT_CLEARSCRIPT_AVAILABLE
#define REACT_CLEARSCRIPT
#endif

#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE
#define REACT_QUICKJS
#endif

using System.Collections;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using ReactUnity.Helpers;
using ReactUnity.Scheduling;
using ReactUnity.Scripting;
using ReactUnity.Styling.Rules;
using ReactUnity.UIToolkit;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UIElements;

namespace ReactUnity.Tests
{
#if !REACT_UITOOLKIT
    [Ignore("UIToolkit is not enabled")]
#endif
    [TestFixture(JavascriptEngineType.Jint, Category = "Jint")]
#if REACT_CLEARSCRIPT
    [TestFixture(JavascriptEngineType.ClearScript, Category = "ClearScript")]
#endif
#if REACT_QUICKJS
    [TestFixture(JavascriptEngineType.QuickJS, Category = "QuickJS")]
#endif
    public abstract class UIToolkitTestBase : InputTestFixture
    {
        protected InputTestFixture Input => this;

        private Mouse mouse;
        protected Mouse Mouse => mouse ?? (mouse = InputSystem.AddDevice<Mouse>());

        private Keyboard keyboard;
        protected Keyboard Keyboard => keyboard ?? (keyboard = InputSystem.AddDevice<Keyboard>());

        protected GameObject Canvas => GameObject.Find("REACT_CANVAS");
        protected ReactUnityBase Component => Canvas?.GetComponentInChildren<ReactUnityBase>();
        protected RectTransform RectTransform => Component.transform as RectTransform;
        protected ReactContext Context => Component?.Context;
        protected UIToolkitContext UGUIContext => Context as UIToolkitContext;
        protected IMediaProvider MediaProvider => Context?.MediaProvider;
        protected HostComponent Host => Context?.Host as HostComponent;
        protected SerializableDictionary Globals => Component?.Globals;
        internal ReactUnityBridge Bridge => ReactUnityBridge.Instance;

        public readonly JavascriptEngineType EngineType;
        public readonly RenderMode RenderMode;
        public readonly bool UsesInput;

        public UIToolkitTestBase(JavascriptEngineType engineType, RenderMode renderMode = RenderMode.ScreenSpaceCamera, bool usesInput = false)
        {
            EngineType = engineType;
            RenderMode = renderMode;
            UsesInput = usesInput;
        }

        public void Render() => Component.Render();

        public Styling.StyleSheet InsertStyle(string style, int importanceOffset = 0) => Context.InsertStyle(style, importanceOffset);

        public UIToolkitComponent<T> Q<T>(string query, IReactComponent scope = null) where T : VisualElement, new() =>
            (scope ?? Host).QuerySelector(query) as UIToolkitComponent<T>;
        public List<UIToolkitComponent<T>> QA<T>(string query, IReactComponent scope = null) where T : VisualElement, new() =>
            (scope ?? Host).QuerySelectorAll(query).OfType<UIToolkitComponent<T>>().ToList();

        public IEnumerator AdvanceTime(float advanceBy)
        {
            if (Context.Timer is ControlledTimer ct)
            {
                ct.AdvanceTime(advanceBy);
                yield return null;
            }
            else if (Context.Timer is UnityTimer)
            {
                yield return new WaitForSeconds(advanceBy);
            }
        }

        [OneTimeSetUp]
        public void InitializeFixture()
        {
            if (Context != null) GameObject.DestroyImmediate(Component);
        }

        public override void Setup()
        {
            if (UsesInput) base.Setup();
        }

        public override void TearDown()
        {
            if (UsesInput) base.TearDown();
            if (mouse != null) mouse = null;
            if (keyboard != null) keyboard = null;
        }

        public IEnumerator Pause()
        {
            Debug.Break();
            yield return null;
        }

        public IEnumerator WaitForEndOfFrame()
        {
            yield return Application.isBatchMode ? null : new WaitForEndOfFrame();
        }
    }
}
