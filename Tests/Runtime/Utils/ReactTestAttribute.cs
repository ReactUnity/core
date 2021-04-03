using NUnit.Framework;
using NUnit.Framework.Interfaces;
using System.Collections;
using System.IO;
using UnityEngine;
using UnityEngine.TestTools;

namespace ReactUnity.Tests.Utils
{
    public class ReactTestAttribute : LoadSceneAttribute
    {
        protected string Script;

        public ReactTestAttribute(string script = "Packages/com.reactunity.core/Tests/Runtime/.scripts/tests/index.js", string customScene = null) :
            base(customScene ?? "Packages/com.reactunity.core/Tests/Runtime/TestScene.unity")
        {
            Script = script;
        }

        public override IEnumerator BeforeTest(ITest test)
        {
            Debug.Assert(Script.EndsWith(".js"), "The script file must be an absolue path ending with .js");

            yield return base.BeforeTest(test);

            var canvas = GameObject.Find("REACT_CANVAS");
            Debug.Assert(canvas != null, "The scene must include a canvas object named as REACT_CANVAS");
            var ru = canvas.GetComponent<ReactUnity>();

            ru.Script = new ReactScript
            {
                UseDevServer = false,
                SourcePath = Path.Combine(Application.dataPath, "..", Script),
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
