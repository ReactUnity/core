using NUnit.Framework;
using NUnit.Framework.Interfaces;
using System.Collections;
using UnityEngine;
using UnityEngine.TestTools;

namespace ReactUnity.Tests.Utils
{
    public class ReactTestAttribute : LoadSceneAttribute
    {
        protected string Script;

        public ReactTestAttribute(string script, string customScene = null) : base(customScene ?? "Packages/React Unity/Tests/Runtime/TestScene.scene")
        {
            Script = script;
        }

        public override IEnumerator BeforeTest(ITest test)
        {
            yield return base.BeforeTest(test);

            Debug.Assert(Script.EndsWith(".js"));


            var canvas = GameObject.Find("REACT_CANVAS");
            var ru = canvas.GetComponent<ReactUnity>();

            ru.Script = new ReactScript
            {
                UseDevServer = false,
                SourcePath = Script,
                ScriptSource = ScriptSource.File,
            };

            ru.BeforeStart.AddListener(BeforeStart);
            ru.AfterStart.AddListener(AfterStart);
            ru.AutoRender = false;
            ru.enabled = true;
            ru.Render();
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
    }
}
