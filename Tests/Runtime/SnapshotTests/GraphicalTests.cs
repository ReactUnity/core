using System;
using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;
using ReactUnity.UGUI;
using UnityEngine;

namespace ReactUnity.Tests
{
    [TestFixture(JavascriptEngineType.Auto, Category = "Snapshot")]
    public class GraphicalTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                </view>;
            }

            Renderer.render(<App />);
";

        const string BaseStyle = @"
            #test {
                background-color: white;
                width: 300px;
                height: 300px;
            }
        ";

        private UGUIComponent View => Q("#test");

        public GraphicalTests(JavascriptEngineType engineType) : base(engineType) { }


        protected static Tuple<string, string>[] gradients = new Tuple<string, string>[] {
            Tuple.Create("01", "red, blue"),
            Tuple.Create("02", "red, 10%, blue"),
            Tuple.Create("03", "red, 10%, blue 30%"),
            Tuple.Create("04", "red 30%, green, blue"),
            Tuple.Create("05", "red 30%, transparent, blue"),
            Tuple.Create("06", "red, green, blue"),
            Tuple.Create("07", "red, green, yellow, white, blue"),
            Tuple.Create("08", "red, green, yellow 30% 60%, white, blue"),
        };

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator GradientSnapshots([ValueSource("gradients")] Tuple<string, string> bg)
        {
            View.Style["background"] = $"linear-gradient({bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/linear-" + bg.Item1);

            View.Style["background"] = $"repeating-linear-gradient({bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/repeating-linear-" + bg.Item1);

            View.Style["background"] = $"radial-gradient({bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/radial-" + bg.Item1);

            View.Style["background"] = $"repeating-radial-gradient({bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/repeating-radial-" + bg.Item1);

            View.Style["background"] = $"radial-gradient(circle at 80% 24%, {bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/radial-off-center-" + bg.Item1);

            View.Style["background"] = $"radial-gradient(closest-corner at 32% 90%, {bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/radial-sized-" + bg.Item1);

            View.Style["background"] = $"conic-gradient({bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/conic-" + bg.Item1);

            View.Style["background"] = $"repeating-conic-gradient({bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/repeating-conic-" + bg.Item1);

            View.Style["background"] = $"conic-gradient(from 25deg at 10% 20%, {bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/conic-off-center-" + bg.Item1);

        }
    }
}
