using NUnit.Framework;
using ReactUnity.Helpers;
using ReactUnity.ScriptEngine;
using ReactUnity.StyleEngine;
using ReactUnity.UGUI;
using System.Collections.Generic;
using UnityEngine;

namespace ReactUnity.Tests
{
    [TestFixture(JavascriptEngineType.Jint, Category = "Jint")]
    [TestFixture(JavascriptEngineType.ClearScript, Category = "ClearScript")]
    public abstract class TestBase
    {
        public const string TestPath = "Packages/com.reactunity.core/Tests/Runtime/.scripts/tests/index.js";
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
        public IReactComponent Q(string query, IReactComponent scope = null) => (scope ?? Host).QuerySelector(query);
        public List<IReactComponent> QA(string query, IReactComponent scope = null) => (scope ?? Host).QuerySelectorAll(query);

        [OneTimeSetUp]
        public void InitializeFixture()
        {
            if (Context != null) GameObject.DestroyImmediate(Component);
        }
    }
}
