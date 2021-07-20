using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using ReactUnity.Editor.Renderer;
using ReactUnity.Editor.UIToolkit;
using ReactUnity.Helpers;
using ReactUnity.ScriptEngine;
using ReactUnity.StyleEngine;
using ReactUnity.Timers;
using ReactUnity.UIToolkit;
using UnityEditor;

namespace ReactUnity.Editor.Tests
{
    [TestFixture(JavascriptEngineType.Jint, Category = "Jint")]
    [TestFixture(JavascriptEngineType.ClearScript, Category = "ClearScript")]
    public abstract class EditorTestBase
    {
        protected TestReactWindow Window => EditorWindow.GetWindow<TestReactWindow>();
        protected ReactUnityEditorElement Component => Window?.hostElement;
        protected ReactUnityRunner Runner => Component?.runner;
        protected ReactContext Context => Component?.context;
        protected EditorContext EditorContext => Context as EditorContext;
        protected IMediaProvider MediaProvider => Context?.MediaProvider;
        protected HostComponent Host => Context?.Host as HostComponent;
        protected GlobalRecord Globals => Context?.Globals;
        internal ReactUnityBridge Bridge => ReactUnityBridge.Instance;

        public readonly JavascriptEngineType EngineType;

        public EditorTestBase(JavascriptEngineType engineType)
        {
            EngineType = engineType;
        }

        public void Render() => Component.Run();
        public void InsertStyle(string style, int importanceOffset = 0) => Context.InsertStyle(style, importanceOffset);
        public IReactComponent Q(string query, IReactComponent scope = null) => (scope ?? Host).QuerySelector(query);
        public List<IReactComponent> QA(string query, IReactComponent scope = null) => (scope ?? Host).QuerySelectorAll(query);
        public IEnumerator AdvanceTime(float advanceBy)
        {
            if (Context.Timer is ControlledTimer ct)
            {
                ct.AdvanceTime(advanceBy);
                yield return null;
            }
            else if (Context.Timer is UnityTimer)
            {
                yield return new EditModeWaitForSeconds(advanceBy);
            }
        }

        [OneTimeSetUp]
        public void InitializeFixture()
        {
            if (Context != null) Window.Close();
        }
    }
}
