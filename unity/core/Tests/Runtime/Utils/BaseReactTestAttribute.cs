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
        public bool AutoRender = true;
        public bool SkipIfExisting;
        public bool RealTimer;
        // The runtime default, so the suite runs what a project gets without choosing.
        public ReactContext.PoolingType Pooling = ReactContext.PoolingType.Basic;

        public BaseReactTestAttribute() : base() { }

        public override IEnumerator BeforeTest(ITest test)
        {
            var canvas = GameObject.Find("REACT_CANVAS");
            var cmp = canvas?.GetComponentInChildren<ReactRendererBase>();
            if (cmp?.Context != null && SkipIfExisting) yield break;

            // Before the scene, not after: resetting it destroys roots the last test left behind --
            // a filter's offscreen surface, a portal's target -- and a context that is still ticking
            // would walk into them on the next frame.
            if (cmp) cmp.enabled = false;

            yield return base.BeforeTest(test);

            var engineType = TestHelpers.GetEngineTypeOfTest(test);

            var script = GetScript();
            // Only the null steps are worth a frame: stopping on the source itself, rather than
            // driving the enumerator to its end, takes a whole frame out of every test.
            while (script.MoveNext() && script.Current == null) yield return null;

            var ru = CreateReactUnity(engineType, script.Current);
            ru.Timer = RealTimer ? null : new ControlledTimer();
            ru.AdvancedOptions.Pooling = Pooling;
            ru.AdvancedOptions.BeforeStart.AddListener(() => BeforeStart(ru.Context.Script));
            ru.AdvancedOptions.AfterStart.AddListener(() => {
                if (engineType != JavascriptEngineType.Auto && ru.Context.Script.EngineFactory.EngineType != engineType)
                    Assert.Inconclusive($"{engineType} not supported on this platform");
                else AfterStart(ru.Context.Script);
            });
            if (AutoRender) ru.Render();
        }

        static public ReactRendererBase CreateReactUnity(JavascriptEngineType engineType, ScriptSource script)
        {
            var canvas = GameObject.Find("REACT_CANVAS");
            Debug.Assert(canvas != null, "The scene must include a canvas object named as REACT_CANVAS");
            var ru = canvas.GetComponentInChildren<ReactRendererBase>();

            // A reset scene hands back the previous test's renderer, where a reload used to build a
            // new one, so everything a test can leave on it is put back here. Disabling runs its
            // Clean(); the listeners are added per test and would otherwise pile up until the first
            // test's closure answered for every later one; and Globals is what fixtures write to,
            // so `Globals["cardWidth"] = 150` at the end of one test used to die with the scene.
            ru.enabled = false;
            ru.AdvancedOptions.BeforeStart.RemoveAllListeners();
            ru.AdvancedOptions.AfterStart.RemoveAllListeners();
            ru.Globals.ClearWithoutNotify();

            ru.EngineType = engineType;
            ru.Source = script;
            ru.AdvancedOptions.AutoRender = false;
            ru.enabled = true;

            ru.AdvancedOptions.DebugMode = TestHelpers.IsDebugEnabled ? ReactRendererBase.DebugMode.DebugAndAwait : ReactRendererBase.DebugMode.None;

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
