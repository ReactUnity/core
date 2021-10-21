using System;
using System.Collections;
using NUnit.Framework.Interfaces;
using ReactUnity.Scheduling;
using ReactUnity.Scripting;
using UnityEditor;
using UnityEngine.TestTools;

namespace ReactUnity.Editor.Tests
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public abstract class BaseEditorTestAttribute : UnityTestAttribute, IOuterUnityTestAction
    {
#if UNITY_EDITOR
        #region Test Debug Toggle
        const string MenuName = "React/Tests/Debug Tests";
        public static bool IsDebugEnabled
        {
            get => UnityEditor.EditorPrefs.GetBool(MenuName, false);
            set => UnityEditor.EditorPrefs.SetBool(MenuName, value);
        }
        #endregion
#else
        public static bool IsDebugEnabled { get; set; } = false;
#endif

        public bool AutoRender;
        public bool SkipIfExisting;
        public bool RealTimer;

        public TestReactWindow Window;

        public BaseEditorTestAttribute(bool autoRender = true, bool skipIfExisting = false, bool realTimer = false) :
            base()
        {
            AutoRender = autoRender;
            SkipIfExisting = skipIfExisting;
            RealTimer = realTimer;
        }

        public IEnumerator BeforeTest(ITest test)
        {
            var engineType = GetEngineType(test);

            if (EditorWindow.HasOpenInstances<TestReactWindow>())
            {
                var existingWindow = EditorWindow.GetWindow<TestReactWindow>();

                if (existingWindow != null && SkipIfExisting)
                {
                    Window = existingWindow;
                    yield return null;
                    yield break;
                }
                else
                {
                    existingWindow.Close();
                    yield return null;
                }
            }

            var window = Window = TestReactWindow.CreateWindow(GetScript, engineType);

            window.Timer = RealTimer ? null : new ControlledTimer();
            window.Globals["test"] = test;

            if (IsDebugEnabled)
            {
                window.DebugEnabled = true;
                window.AwaitDebugger = true;
            }

            if (AutoRender)
            {
                window.Run();

                var style = GetStyle();
                if (!string.IsNullOrWhiteSpace(style))
                {
                    window.Context.InsertStyle(style);
                }

                yield return null;
                yield return null;
                yield return null;
            }
        }

        public IEnumerator AfterTest(ITest test)
        {
            if (Window) Window.Close();
            yield return null;
        }

        public abstract ScriptSource GetScript();
        public virtual string GetStyle() => null;

        static JavascriptEngineType GetEngineType(ITest test)
        {
            var parent = test;
            while (parent != null)
            {
                var fixture = test.Fixture as EditorTestBase;
                if (fixture != null) return fixture.EngineType;
                parent = parent.Parent;
            }

            return test.FullName.Contains("(Jint)") ? JavascriptEngineType.Jint : test.FullName.Contains("(ClearScript)") ? JavascriptEngineType.ClearScript : JavascriptEngineType.Auto;
        }
    }
}
