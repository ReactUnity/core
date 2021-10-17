using System;
using System.Collections;
using NUnit.Framework;
using NUnit.Framework.Interfaces;
using ReactUnity.Scheduling;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using UnityEngine;
using UnityEngine.TestTools;

namespace ReactUnity.Tests
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public abstract class BaseReactTestAttribute : LoadSceneAttribute
    {
        public const string DefaultSceneName = "Packages/com.reactunity.core/Tests/Runtime/TestScene.unity";
        public const string WorldSceneName = "Packages/com.reactunity.core/Tests/Runtime/TestScene_World.unity";

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
        public static bool IsDebugEnabled { get; set; } = false;
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
            var cmp = canvas?.GetComponentInChildren<ReactUnityUGUI>();
            if (cmp?.Context != null && SkipIfExisting) yield break;

            yield return base.BeforeTest(test);

            JavascriptEngineType engineType = JavascriptEngineType.Auto;
            // TODO: find out why is Fixture null
            var testBase = test.Fixture as TestBase;
            if (testBase != null) engineType = testBase.EngineType;
            else engineType = test.FullName.Contains("(Jint)") ? JavascriptEngineType.Jint : JavascriptEngineType.ClearScript;

            var ru = CreateReactUnity(engineType, GetScript());
            ru.timer = RealTimer ? null : new ControlledTimer();
            ru.BeforeStart.AddListener(() => BeforeStart(ru.Context.Script));
            ru.AfterStart.AddListener(() => AfterStart(ru.Context.Script));
            if (AutoRender) ru.Render();
        }

        static public ReactUnityUGUI CreateReactUnity(JavascriptEngineType engineType, ScriptSource script)
        {
            var canvas = GameObject.Find("REACT_CANVAS");
            Debug.Assert(canvas != null, "The scene must include a canvas object named as REACT_CANVAS");
            var ru = canvas.GetComponentInChildren<ReactUnityUGUI>();

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


        public virtual void BeforeStart(ScriptContext ctx)
        {
            ctx.Engine.SetValue("Assert", typeof(Assert));
            ctx.Engine.SetValue("Has", typeof(Has));
            ctx.Engine.SetValue("Is", typeof(Is));
            ctx.Engine.SetValue("Iz", typeof(Iz));
            ctx.Engine.SetValue("Contains", typeof(Contains));
            ctx.Engine.SetValue("Does", typeof(Does));
            ctx.Engine.SetValue("Assume", typeof(Assume));
            ctx.Engine.SetValue("Throws", typeof(Throws));
            ctx.Engine.SetValue("LogAssert", typeof(LogAssert));
        }


        public virtual void AfterStart(ScriptContext runner)
        {
        }

        public abstract ScriptSource GetScript();
    }
}
