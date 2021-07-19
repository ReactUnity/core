using System;
using System.Collections;
using NUnit.Framework;
using NUnit.Framework.Interfaces;
using ReactUnity.ScriptEngine;
using ReactUnity.Timers;
using ReactUnity.UGUI;
using UnityEngine;
using UnityEngine.TestTools;

namespace ReactUnity.Tests
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public abstract class BaseReactTestAttribute : LoadSceneAttribute
    {
        public const string DefaultSceneName = "Packages/com.reactunity.core/Tests/Runtime/TestScene.unity";

#if UNITY_EDITOR
        #region Test Debug Toggle
        const string MenuName = "React/Tests/Debug Tests";
        public static bool IsDebugEnabled
        {
            get => UnityEditor.EditorPrefs.GetBool(MenuName, false);
            set => UnityEditor.EditorPrefs.SetBool(MenuName, value);
        }

        [UnityEditor.MenuItem(MenuName)]
        private static void ToggleTests()
        {
            IsDebugEnabled = !IsDebugEnabled;
        }

        [UnityEditor.MenuItem(MenuName, true)]
        private static bool ToggleTestsValidate()
        {
            UnityEditor.Menu.SetChecked(MenuName, IsDebugEnabled);
            return true;
        }
        #endregion
#else
        public static bool IsDebugEnabled => false;
#endif

        public bool AutoRender;
        public bool SkipIfExisting;
        public bool RealTimer;

        public BaseReactTestAttribute(string customScene = null, bool autoRender = true, bool skipIfExisting = false, bool realTimer = false) :
            base(customScene ?? DefaultSceneName)
        {
            AutoRender = autoRender;
            SkipIfExisting = skipIfExisting;
            RealTimer = realTimer;
        }

        public override IEnumerator BeforeTest(ITest test)
        {
            var canvas = GameObject.Find("REACT_CANVAS");
            var cmp = canvas?.GetComponent<ReactUnityUGUI>();
            if (cmp?.Context != null && SkipIfExisting) yield break;

            yield return base.BeforeTest(test);

            JavascriptEngineType engineType = JavascriptEngineType.Auto;
            // TODO: find out why is Fixture null
            var testBase = test.Fixture as TestBase;
            if (testBase != null) engineType = testBase.EngineType;
            else engineType = test.FullName.Contains("(Jint)") ? JavascriptEngineType.Jint : JavascriptEngineType.ClearScript;

            var ru = CreateReactUnity(engineType, GetScript());
            ru.timer = RealTimer ? UnityTimer.Instance as ITimer : new ControlledTimer();
            ru.Globals["test"] = test;
            ru.BeforeStart.AddListener(BeforeStart);
            ru.AfterStart.AddListener(AfterStart);
            if (AutoRender) ru.Render();
        }

        static public ReactUnityUGUI CreateReactUnity(JavascriptEngineType engineType, ScriptSource script)
        {
            var canvas = GameObject.Find("REACT_CANVAS");
            Debug.Assert(canvas != null, "The scene must include a canvas object named as REACT_CANVAS");
            var ru = canvas.GetComponent<ReactUnityUGUI>();

            ru.EngineType = engineType;
            ru.Script = script;
            ru.AutoRender = false;
            ru.enabled = true;

            if (IsDebugEnabled)
            {
                ru.Debug = true;
                ru.AwaitDebugger = true;
            }

            return ru;
        }

        public override IEnumerator AfterTest(ITest test)
        {
            yield return null;
        }


        public virtual void BeforeStart(ReactUnityRunner runner)
        {
            runner.engine.SetValue("Assert", typeof(Assert));
            runner.engine.SetValue("Has", typeof(Has));
            runner.engine.SetValue("Is", typeof(Is));
            runner.engine.SetValue("Iz", typeof(Iz));
            runner.engine.SetValue("Contains", typeof(Contains));
            runner.engine.SetValue("Does", typeof(Does));
            runner.engine.SetValue("Assume", typeof(Assume));
            runner.engine.SetValue("Throws", typeof(Throws));
            runner.engine.SetValue("LogAssert", typeof(LogAssert));
        }


        public virtual void AfterStart(ReactUnityRunner runner)
        {
        }

        public abstract ScriptSource GetScript();
    }
}
