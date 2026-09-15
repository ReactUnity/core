using System;
using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using NUnit.Framework.Interfaces;
using ReactUnity.Scheduling;
using ReactUnity.Scripting;
using ReactUnity.UIToolkit;
using UnityEditor;
using UnityEngine.TestTools;

namespace ReactUnity.Tests.Editor
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public abstract class BaseEditorTestAttribute : UnityTestAttribute, IOuterUnityTestAction
    {
        public bool AutoRender = true;
        public bool SkipIfExisting;
        public bool RealTimer;

        public TestReactWindow Window;

        public BaseEditorTestAttribute() : base() { }

        public IEnumerator BeforeTest(ITest test)
        {
            var engineType = TestHelpers.GetEngineTypeOfTest(test);

            var existing = TestReactWindow.Existing;
            if (existing && existing.Context != null && SkipIfExisting)
            {
                Window = existing;
                yield return null;
                yield break;
            }

            // The window is kept open for the whole fixture and restarted per test -- closing and
            // reopening one cost more than everything else the Editor suite did. Nothing else takes
            // the previous test's context down, so it goes here, before this test's script is even
            // transformed.
            if (existing) existing.Clear();

            var script = GetScript();
            // Only the null steps are worth a frame: stopping on the source itself, rather than
            // driving the enumerator to its end, takes a whole frame out of every test.
            while (script.MoveNext() && script.Current == null) yield return null;

            var window = Window = TestReactWindow.CreateWindow(() => script.Current, engineType);

            window.Timer = RealTimer ? null : new ControlledTimer();
            // A reused window carries whatever the last test wrote here.
            window.Globals.ClearWithoutNotify();
            window.Globals["test"] = test;

            window.DebugEnabled = TestHelpers.IsDebugEnabled;
            window.AwaitDebugger = TestHelpers.IsDebugEnabled;

            window.AdvancedOptions = new ReactUnityElement.ReactAdvancedOptions
            {
                BeforeStart = () => BeforeStart(window.Context.Script),
                AfterStart = () => AfterStart(window.Context.Script),
            };

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
            yield return null;
        }

        public abstract IEnumerator<ScriptSource> GetScript();
        public virtual string GetStyle() => null;

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
    }
}
