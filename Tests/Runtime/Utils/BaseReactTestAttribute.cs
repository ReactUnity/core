using System;
using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using NUnit.Framework.Interfaces;
using ReactUnity.Scheduling;
using ReactUnity.Scripting;
using UnityEngine;
using UnityEngine.TestTools;

namespace ReactUnity.Tests
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public abstract class BaseReactTestAttribute : LoadSceneAttribute
    {
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

        public bool AutoRender = true;
        public bool SkipIfExisting;
        public bool RealTimer;

        public BaseReactTestAttribute() : base() { }

        public override IEnumerator BeforeTest(ITest test)
        {
            var canvas = GameObject.Find("REACT_CANVAS");
            var cmp = canvas?.GetComponentInChildren<ReactUnityBase>();
            if (cmp?.Context != null && SkipIfExisting) yield break;

            yield return base.BeforeTest(test);

            var engineType = TestHelpers.GetEngineTypeOfTest(test);

            var script = GetScript();
            while (script.MoveNext()) yield return null;

            var ru = CreateReactUnity(engineType, script.Current);
            ru.timer = RealTimer ? null : new ControlledTimer();
            ru.BeforeStart.AddListener(() => BeforeStart(ru.Context.Script));
            ru.AfterStart.AddListener(() => {
                if (engineType != JavascriptEngineType.Auto && ru.Context.Script.EngineFactory.EngineType != engineType)
                {
                    throw new Exception($"{engineType} not supported on this platform");
                }

                AfterStart(ru.Context.Script);
            });
            if (AutoRender) ru.Render();
        }

        static public ReactUnityBase CreateReactUnity(JavascriptEngineType engineType, ScriptSource script)
        {
            var canvas = GameObject.Find("REACT_CANVAS");
            Debug.Assert(canvas != null, "The scene must include a canvas object named as REACT_CANVAS");
            var ru = canvas.GetComponentInChildren<ReactUnityBase>();

            ru.EngineType = engineType;
            ru.Source = script;
            ru.AutoRender = false;
            ru.enabled = true;

            ru.Debug = IsDebugEnabled;
            ru.AwaitDebugger = IsDebugEnabled;

            return ru;
        }

        public override IEnumerator AfterTest(ITest test)
        {
            yield return null;
        }


        public virtual void BeforeStart(ScriptContext ctx)
        {
            ctx.Engine.SetGlobal("Assert", typeof(Assert));
            ctx.Engine.SetGlobal("Has", typeof(Has));
            ctx.Engine.SetGlobal("Is", typeof(Is));
            ctx.Engine.SetGlobal("Iz", typeof(Iz));
            ctx.Engine.SetGlobal("Contains", typeof(Contains));
            ctx.Engine.SetGlobal("Does", typeof(Does));
            ctx.Engine.SetGlobal("Assume", typeof(Assume));
            ctx.Engine.SetGlobal("Throws", typeof(Throws));
            ctx.Engine.SetGlobal("LogAssert", typeof(LogAssert));
        }


        public virtual void AfterStart(ScriptContext runner)
        {
        }

        public abstract IEnumerator<ScriptSource> GetScript();
    }
}
