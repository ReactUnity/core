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

            View.Style["background"] = $"linear-gradient(244deg, {bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/linear-angled-" + bg.Item1);

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



        protected static Tuple<string, string>[] boxShadows = new Tuple<string, string>[] {
            Tuple.Create("00", "none"),
            Tuple.Create("01", "1px 1px 4px 0 black"),
            Tuple.Create("02", "0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%)"),
            Tuple.Create("03", "0 0 4px 15px 3px -5px red"),
            Tuple.Create("04", "0 0 4px 15px 3px -5px black"),
            Tuple.Create("inset/00", "0 0 black inset"),
            Tuple.Create("inset/01", "1px 1px 4px 0 black inset"),
            Tuple.Create("inset/02", "1px 1px 14px 1px black inset"),
        };

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator BoxShadowSnapshots([ValueSource("boxShadows")] Tuple<string, string> bg)
        {
            View.Style["margin"] = 50;
            View.Style["width"] = 150;
            View.Style["height"] = 70;
            View.Style["box-shadow"] = bg.Item2;
            View.Style["border-radius"] = "0 5px 10px 20px";
            yield return null;
            Assertions.Snapshot("box-shadows/" + bg.Item1);
        }
    }
}
