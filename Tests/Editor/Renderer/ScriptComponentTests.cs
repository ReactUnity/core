using System.Collections;
using System.Text.RegularExpressions;
using NUnit.Framework;
using ReactUnity.Scripting;
using UnityEngine.TestTools;

namespace ReactUnity.Tests.Editor.Renderer
{
    public class ScriptComponentTests : EditorTestBase
    {
        public ScriptComponentTests(JavascriptEngineType engineType) : base(engineType) { }

        const string BaseScript = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <script>
                        {globals.scriptContent}
                    </script>
                </>;
            }
        ";

        [EditorInjectableTest(Script = BaseScript)]
        public IEnumerator ScriptTagExecutesOnChange()
        {
            Globals["scriptContent"] = "Globals.val = 5";
            yield return null;

            Assert.AreEqual(5, Globals["val"]);

            Globals["scriptContent"] = "Globals.val= 6";
            yield return null;
            Assert.AreEqual(6, Globals["val"]);
        }


        [EditorInjectableTest(Script = BaseScript)]
        public IEnumerator ScriptTagDoesNotCrashOnError()
        {
            LogAssert.Expect(UnityEngine.LogType.Exception, new Regex("==="));
            Globals["scriptContent"] = "Globals.val ====== 5";
            yield return null;

            Globals["scriptContent"] = "Globals.val = 6";
            yield return null;
            Assert.AreEqual(6, Globals["val"]);
        }
    }
}
