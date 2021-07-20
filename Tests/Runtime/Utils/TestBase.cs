using System.Collections;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using ReactUnity.Helpers;
using ReactUnity.ScriptEngine;
using ReactUnity.StyleEngine;
using ReactUnity.Timers;
using ReactUnity.UGUI;
using UnityEngine;

namespace ReactUnity.Tests
{
    [TestFixture(JavascriptEngineType.Jint, Category = "Jint")]
    [TestFixture(JavascriptEngineType.ClearScript, Category = "ClearScript")]
    public abstract class TestBase
    {
        protected GameObject Canvas => GameObject.Find("REACT_CANVAS");
        protected ReactUnityUGUI Component => Canvas?.GetComponent<ReactUnityUGUI>();
        protected ReactUnityRunner Runner => Component?.runner;
        protected ReactContext Context => Component?.Context;
        protected UGUIContext UGUIContext => Context as UGUIContext;
        protected IMediaProvider MediaProvider => Context?.MediaProvider;
        protected HostComponent Host => Context?.Host as HostComponent;
        protected SerializableDictionary Globals => Component?.Globals;
        internal ReactUnityBridge Bridge => ReactUnityBridge.Instance;

        public readonly JavascriptEngineType EngineType;

        public TestBase(JavascriptEngineType engineType)
        {
            EngineType = engineType;
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
    }
}
