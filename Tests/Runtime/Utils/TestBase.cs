#if !(ENABLE_IL2CPP || REACT_DISABLE_CLEARSCRIPT || (UNITY_ANDROID && !UNITY_EDITOR)) && REACT_CLEARSCRIPT_AVAILABLE
#define REACT_CLEARSCRIPT
#endif

#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE
#define REACT_QUICKJS
#endif

#if !REACT_DISABLE_JINT && REACT_JINT_AVAILABLE && (!UNITY_WEBGL || UNITY_EDITOR)
#define REACT_JINT
#endif

using System.Collections;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using ReactUnity.Helpers;
using ReactUnity.Scheduling;
using ReactUnity.Scripting;
using ReactUnity.Styling;
using ReactUnity.Styling.Rules;
using ReactUnity.UGUI;
using UnityEngine;
using UnityEngine.InputSystem;

namespace ReactUnity.Tests
{
#if REACT_JINT
    [TestFixture(JavascriptEngineType.Jint, Category = "Jint")]
#endif
#if REACT_CLEARSCRIPT && !UNITY_2021_2_OR_NEWER
    [TestFixture(JavascriptEngineType.ClearScript, Category = "ClearScript")]
#endif
#if REACT_QUICKJS
    [TestFixture(JavascriptEngineType.QuickJS, Category = "QuickJS")]
#endif
    public abstract class TestBase : InputTestFixture
    {
        protected InputTestFixture Input => this;

        private Mouse mouse;
        protected Mouse Mouse => mouse ?? (mouse = InputSystem.AddDevice<Mouse>());

        private Keyboard keyboard;
        protected Keyboard Keyboard => keyboard ?? (keyboard = InputSystem.AddDevice<Keyboard>());

        protected GameObject Canvas => GameObject.Find("REACT_CANVAS");
        protected Canvas CanvasCmp => Canvas.GetComponent<Canvas>();
        protected ReactUnityUGUI Component => Canvas?.GetComponentInChildren<ReactUnityUGUI>();
        protected RectTransform RectTransform => Component.transform as RectTransform;
        protected ReactContext Context => Component?.Context;
        protected UGUIContext UGUIContext => Context as UGUIContext;
        protected IMediaProvider MediaProvider => Context?.MediaProvider;
        protected HostComponent Host => Context?.Host as HostComponent;
        protected SerializableDictionary Globals => Component?.Globals;
        internal ReactUnityBridge Bridge => ReactUnityBridge.Instance;

        public readonly JavascriptEngineType EngineType;
        public readonly RenderMode RenderMode;
        public readonly bool UsesInput;

        public TestBase(JavascriptEngineType engineType, RenderMode renderMode = RenderMode.ScreenSpaceCamera, bool usesInput = false)
        {
            EngineType = engineType;
            RenderMode = renderMode;
            UsesInput = usesInput;
        }

        public void Render() => Component.Render();
        public StyleSheet InsertStyle(string style, int importanceOffset = 0) => Context.InsertStyle(style, importanceOffset);
        public UGUIComponent Q(string query, IReactComponent scope = null) =>
            (scope ?? Host).QuerySelector(query) as UGUIComponent;
        public List<UGUIComponent> QA(string query, IReactComponent scope = null) =>
            (scope ?? Host).QuerySelectorAll(query).OfType<UGUIComponent>().ToList();
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
            if (Canvas) Canvas.GetComponent<Canvas>().renderMode = RenderMode;
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

        public void IgnoreForEngine(JavascriptEngineType engine)
        {
            if (EngineType == engine)
                Assert.Ignore("This test does not work for " + engine);
        }
    }
}
