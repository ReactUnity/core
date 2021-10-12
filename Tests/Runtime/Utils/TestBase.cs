using System.Collections;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using ReactUnity.Helpers;
using ReactUnity.Scheduling;
using ReactUnity.Scripting;
using ReactUnity.StyleEngine;
using ReactUnity.UGUI;
using UnityEngine;
using UnityEngine.InputSystem;

namespace ReactUnity.Tests
{
    [TestFixture(JavascriptEngineType.Jint, Category = "Jint")]
    [TestFixture(JavascriptEngineType.ClearScript, Category = "ClearScript")]
    public abstract class TestBase
    {
        protected InputTestFixture Input { get; private set; }
        protected Mouse Mouse { get; private set; }

        protected GameObject Canvas => GameObject.Find("REACT_CANVAS");
        protected ReactUnityUGUI Component => Canvas?.GetComponentInChildren<ReactUnityUGUI>();
        protected ReactContext Context => Component?.Context;
        protected UGUIContext UGUIContext => Context as UGUIContext;
        protected IMediaProvider MediaProvider => Context?.MediaProvider;
        protected HostComponent Host => Context?.Host as HostComponent;
        protected SerializableDictionary Globals => Component?.Globals;
        internal ReactUnityBridge Bridge => ReactUnityBridge.Instance;

        public readonly JavascriptEngineType EngineType;
        public readonly RenderMode RenderMode;

        public TestBase(JavascriptEngineType engineType, RenderMode renderMode = RenderMode.ScreenSpaceCamera)
        {
            EngineType = engineType;
            RenderMode = renderMode;
        }

        public void Render() => Component.Render();
        public void InsertStyle(string style, int importanceOffset = 0) => Context.InsertStyle(style, importanceOffset);
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

        [SetUp]
        public void Setup()
        {
            Canvas.GetComponent<Canvas>().renderMode = RenderMode;
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

        public InputTestFixture SetupInput()
        {
            TeardownInput();
            Input = new InputTestFixture();
            Input.Setup();

            Mouse = InputSystem.AddDevice<Mouse>();

            return Input;
        }

        public void TeardownInput()
        {
            if (Mouse != null) InputSystem.RemoveDevice(Mouse);
            Mouse = null;
            Input?.TearDown();
            Input = null;
        }

        [TearDown]
        public void TearDown()
        {
            TeardownInput();
        }
    }
}
