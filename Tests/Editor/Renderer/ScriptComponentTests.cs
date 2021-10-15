using System.Collections;
using System.Text.RegularExpressions;
using NUnit.Framework;
using ReactUnity.Scripting;
using UnityEngine.TestTools;

namespace ReactUnity.Editor.Tests.Renderer
{
    public class ScriptComponentTests : EditorTestBase
    {
        public ScriptComponentTests(JavascriptEngineType engineType) : base(engineType) { }

        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <script>
                        {globals.scriptContent}
                    </script>
                </>;
            }

            Renderer.render(<App />);
        ";

        [EditorInjectableTest(BaseScript)]
        public IEnumerator ScriptTagExecutesOnChange()
        {
            Globals["scriptContent"] = "Globals.value = 5";
            yield return null;

            Assert.AreEqual(5, Globals["value"]);

            Globals["scriptContent"] = "Globals.value = 6";
            yield return null;
            Assert.AreEqual(6, Globals["value"]);
        }


        [EditorInjectableTest(BaseScript)]
        public IEnumerator ScriptTagDoesNotCrashOnError()
        {
            LogAssert.Expect(UnityEngine.LogType.Exception, new Regex("==="));
            Globals["scriptContent"] = "Globals.value ====== 5";
            yield return null;

            Globals["scriptContent"] = "Globals.value = 6";
            yield return null;
            Assert.AreEqual(6, Globals["value"]);
        }
    }
}
