using System.Collections;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using ReactUnity.Editor;
using ReactUnity.Editor.Renderer;
using ReactUnity.Editor.UIToolkit;
using ReactUnity.Helpers;
using ReactUnity.Scheduling;
using ReactUnity.Scripting;
using ReactUnity.Styling;
using ReactUnity.Styling.Rules;
using ReactUnity.UIToolkit;
using UnityEditor;

namespace ReactUnity.Tests.Editor
{
    [TestFixture(JavascriptEngineType.Jint, Category = "Jint")]
    [TestFixture(JavascriptEngineType.ClearScript, Category = "ClearScript")]
    public abstract class EditorTestBase
    {
        protected TestReactWindow Window => EditorWindow.GetWindow<TestReactWindow>();
        protected ReactUnityEditorElement Component => Window?.HostElement;
        protected ReactContext Context => Component?.Context;
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
        public StyleSheet InsertStyle(string style, int importanceOffset = 0) => Context.InsertStyle(style, importanceOffset);
        public void RemoveStyle(StyleSheet sheet) => Context.RemoveStyle(sheet);
        public IUIToolkitComponent Q(string query, IReactComponent scope = null) =>
            (scope ?? Host).QuerySelector(query) as IUIToolkitComponent;
        public List<BaseReactComponent<UIToolkitContext>> QA(string query, IReactComponent scope = null) =>
            (scope ?? Host).QuerySelectorAll(query).OfType<BaseReactComponent<UIToolkitContext>>().ToList();
        public IEnumerator AdvanceTime(float advanceBy)
        {
            if (Context.Timer is ControlledTimer ct)
            {
                ct.AdvanceTime(advanceBy);
                yield return null;
            }
            else if (Context.Timer is EditorTimer)
            {
                yield return new EditModeWaitForSeconds(advanceBy).Perform();
            }
        }

        [OneTimeSetUp]
        [OneTimeTearDown]
        public void TearDownFixture()
        {
            if (EditorWindow.HasOpenInstances<TestReactWindow>())
                if (Window != null) Window.Close();
        }
    }
}
