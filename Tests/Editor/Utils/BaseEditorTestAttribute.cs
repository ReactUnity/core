using System;
using System.Collections;
using NUnit.Framework;
using NUnit.Framework.Interfaces;
using ReactUnity.Editor.Renderer;
using ReactUnity.ScriptEngine;
using ReactUnity.Timers;
using ReactUnity.UGUI;
using UnityEngine;
using UnityEngine.TestTools;
using UnityEngine.UIElements;

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
            var engineType = test.FullName.Contains("(Jint)") ? JavascriptEngineType.Jint : JavascriptEngineType.ClearScript;

            var window = Window = TestReactWindow.CreateWindow(GetScript, engineType);

            window.Timer = RealTimer ? UnityTimer.Instance as ITimer : new ControlledTimer();
            window.Globals["test"] = test;

            if (IsDebugEnabled)
            {
                window.DebugEnabled = true;
                window.AwaitDebugger = true;
            }

            //ru.BeforeStart.AddListener(BeforeStart);
            //ru.AfterStart.AddListener(AfterStart);
            if (AutoRender)
            {
                window.Run();

                var style = GetStyle();
                if (!string.IsNullOrWhiteSpace(style))
                {
                    window.context.InsertStyle(style);
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
    }
}
