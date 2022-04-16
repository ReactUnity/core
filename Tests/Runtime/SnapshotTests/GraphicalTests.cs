using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;

namespace ReactUnity.Tests
{
#if !UNITY_EDITOR
    [Ignore("Snapshot tests are only supported in editor")]
#endif
    [TestFixture(JavascriptEngineType.Auto, Category = "Snapshot")]
    public class GraphicalTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                </view>;
            }
";

        const string BaseStyle = @"
            #test {
                background-color: white;
                width: 300px;
                height: 300px;
            }
        ";

        const string DataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVQoU2P8z8DwnwEJMKLwGBhAfForYGD4j24rI4qbaK8AAClEFAHkdZU1AAAAAElFTkSuQmCC";

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
            Assertions.Snapshot("gradients/linear", bg.Item1);

            View.Style["background"] = $"repeating-linear-gradient({bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/repeating-linear", bg.Item1);

            View.Style["background"] = $"linear-gradient(244deg, {bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/linear-angled", bg.Item1);

            View.Style["background"] = $"radial-gradient({bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/radial", bg.Item1);

            View.Style["background"] = $"repeating-radial-gradient({bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/repeating-radial", bg.Item1);

            View.Style["background"] = $"radial-gradient(circle at 80% 24%, {bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/radial-off-center", bg.Item1);

            View.Style["background"] = $"radial-gradient(closest-corner at 32% 90%, {bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/radial-sized", bg.Item1);

            View.Style["background"] = $"conic-gradient({bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/conic", bg.Item1);

            View.Style["background"] = $"repeating-conic-gradient({bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/repeating-conic", bg.Item1);

            View.Style["background"] = $"conic-gradient(from 25deg at 10% 20%, {bg.Item2})";
            yield return null;
            Assertions.Snapshot("gradients/conic-off-center", bg.Item1);

            View.Style["background"] = $"linear-gradient(244deg, {bg.Item2})";
            View.Style["width"] = "300px";
            View.Style["height"] = "200px";
            yield return null;
            Assertions.Snapshot("gradients/linear-angled-resized", bg.Item1);
            View.Style["width"] = null;
            View.Style["height"] = null;
        }


        protected static Tuple<string, List<string>>[] multiGradients = new Tuple<string, List<string>>[] {
            Tuple.Create("01",
                new List<string> { "rgba(0,0,0,0.5) 0% 6%, transparent 6% 18%, rgba(0,0,0,0.5) 18% 24%", "rgba(0,0,0,0.5) 0% 6%, transparent 6% 18%, rgba(0,0,0,0.5) 18% 24%" }),
        };

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator MultiGradientSnapshots([ValueSource("multiGradients")] Tuple<string, List<string>> bg)
        {
            var linearParts = new List<string> { "45deg,", "-45deg," };
            var linearCombined = bg.Item2.Select((x, i) => linearParts[i % linearParts.Count] + x);

            View.Style["background"] = string.Join(",", linearCombined.Select(x => $"repeating-linear-gradient({x})"));
            yield return null;
            Assertions.Snapshot($"gradients/multi/repeating-linear", bg.Item1);

            View.Style["background"] = string.Join(",", linearCombined.Select(x => $"repeating-linear-gradient({x})")) + ", red";
            yield return null;
            Assertions.Snapshot($"gradients/multi/repeating-linear-bg", bg.Item1);


            var conicParts = new List<string> { "", "from 25deg at 10% 40%," };
            var conicCombined = bg.Item2.Select((x, i) => conicParts[i % conicParts.Count] + x);

            View.Style["background"] = string.Join(",", conicCombined.Select(x => $"repeating-conic-gradient({x})"));
            yield return null;
            Assertions.Snapshot($"gradients/multi/repeating-conic", bg.Item1);


            var radialParts = new List<string> { "", "at 10% 20%," };
            var radialCombined = bg.Item2.Select((x, i) => radialParts[i % radialParts.Count] + x);

            View.Style["background"] = string.Join(",", radialCombined.Select(x => $"repeating-radial-gradient({x})"));
            yield return null;
            Assertions.Snapshot($"gradients/multi/repeating-radial", bg.Item1);
        }



        protected static Tuple<string, string>[] advancedGradients = new Tuple<string, string>[] {
            Tuple.Create("japanese-cube",
                @"
    background-color: #556;
    background-image: linear-gradient(30deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),
      linear-gradient(150deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),
      linear-gradient(30deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),
      linear-gradient(150deg, #445 12%, transparent 12.5%, transparent 87%, #445 87.5%, #445),
      linear-gradient(60deg, #99a 25%, transparent 25.5%, transparent 75%, #99a 75%, #99a),
      linear-gradient(60deg, #99a 25%, transparent 25.5%, transparent 75%, #99a 75%, #99a);
    background-size: 80px 140px;
    background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;
"),

            Tuple.Create("waves",
                @"
    background: radial-gradient(
          circle at 100% 50%,
          transparent 20%,
          rgba(255, 255, 255, 0.3) 21%,
          rgba(255, 255, 255, 0.3) 34%,
          transparent 35%,
          transparent
        )
        0 0,
      radial-gradient(
          circle at 0% 50%,
          transparent 20%,
          rgba(255, 255, 255, 0.3) 21%,
          rgba(255, 255, 255, 0.3) 34%,
          transparent 35%,
          transparent
        )
        0 -50px;
    background-color: slategray;
    background-size: 75px 100px;
    background-position: 0 0, 0 -50px;
"
            ),

            Tuple.Create("steps", @"
    background-color: #ff7d9d;
    background-size: 58px 58px;
    background-position: 0px 2px, 4px 35px, 29px 31px, 33px 6px, 0px 36px, 4px 2px, 29px 6px, 33px 30px;
    background-image: linear-gradient(335deg, #c90032 23px, transparent 23px),
      linear-gradient(155deg, #c90032 23px, transparent 23px), linear-gradient(335deg, #c90032 23px, transparent 23px),
      linear-gradient(155deg, #c90032 23px, transparent 23px), linear-gradient(335deg, #c90032 10px, transparent 10px),
      linear-gradient(155deg, #c90032 10px, transparent 10px), linear-gradient(335deg, #c90032 10px, transparent 10px),
      linear-gradient(155deg, #c90032 10px, transparent 10px);
"),

            Tuple.Create("stars", @"
    background: linear-gradient(324deg, #232927 4%, transparent 4%) -70px 43px,
      linear-gradient(36deg, #232927 4%, transparent 4%) 30px 43px,
      linear-gradient(72deg, #e3d7bf 8.5%, transparent 8.5%) 30px 43px,
      linear-gradient(288deg, #e3d7bf 8.5%, transparent 8.5%) -70px 43px,
      linear-gradient(216deg, #e3d7bf 7.5%, transparent 7.5%) -70px 23px,
      linear-gradient(144deg, #e3d7bf 7.5%, transparent 7.5%) 30px 23px,
      linear-gradient(324deg, #232927 4%, transparent 4%) -20px 93px,
      linear-gradient(36deg, #232927 4%, transparent 4%) 80px 93px,
      linear-gradient(72deg, #e3d7bf 8.5%, transparent 8.5%) 80px 93px,
      linear-gradient(288deg, #e3d7bf 8.5%, transparent 8.5%) -20px 93px,
      linear-gradient(216deg, #e3d7bf 7.5%, transparent 7.5%) -20px 73px,
      linear-gradient(144deg, #e3d7bf 7.5%, transparent 7.5%) 80px 73px;
    background-color: #232927;
    background-size: 100px 100px;
"),
            Tuple.Create("weave", @"
    background: linear-gradient(
        135deg,
        #708090 21px,
        #d9ecff 22px,
        #d9ecff 24px,
        transparent 24px,
        transparent 67px,
        #d9ecff 67px,
        #d9ecff 69px,
        transparent 69px
      ),
      linear-gradient(
          225deg,
          #708090 21px,
          #d9ecff 22px,
          #d9ecff 24px,
          transparent 24px,
          transparent 67px,
          #d9ecff 67px,
          #d9ecff 69px,
          transparent 69px
        )
        0 64px;
    background-color: #708090;
    background-size: 64px 128px;
"),

            Tuple.Create("blueprint", @"
    background-color: #269;
    background-image: linear-gradient(white 2px, transparent 2px), linear-gradient(90deg, white 2px, transparent 2px),
      linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
    background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
    background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
"),
    };

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator AdvancedGradientSnapshots([ValueSource("advancedGradients")] Tuple<string, string> bg)
        {
            InsertStyle("#test {" + bg.Item2 + "}");
            yield return null;

            Assertions.Snapshot($"gradients/advanced/" + bg.Item1);

            Q("#test").Style["height"] = 200;
            yield return null;
            Assertions.Snapshot($"gradients/advanced/short", bg.Item1);
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



        protected static Tuple<string, string, string, string>[] borders = new Tuple<string, string, string, string>[] {
            Tuple.Create("00", "0", "0", "black"),
            Tuple.Create("01", "0", "5px", "black"),
            Tuple.Create("02", "0 5px 10px 20px", "5px 10px", "red blue"),
            Tuple.Create("03", "0 5px 10px 20px", "5px 10px 3px", "red blue lime"),
            Tuple.Create("04", "0 5px 10px 20px", "5px 10px 15px", "red blue lime"),
            Tuple.Create("05", "0 5px 10px 20px", "5px 10px 15px 22px", "red blue lime purple"),
            Tuple.Create("06", "6px", "0 0 20px 10px", "black red black black"),
            Tuple.Create("07", "6px 90% 40% 6px", "12px 40px", "black red black black"),
            Tuple.Create("side_t", "0", "10px 0 0 0", "red blue lime purple"),
            Tuple.Create("side_r", "0", "0 10px 0 0", "red blue lime purple"),
            Tuple.Create("side_b", "0", "0 0 10px 0", "red blue lime purple"),
            Tuple.Create("side_l", "0", "0 0 0 10px", "red blue lime purple"),
            Tuple.Create("side_tl", "0", "10px 0 0 10px", "red blue lime purple"),
            Tuple.Create("side_tr", "0", "10px 10px 0 0", "red blue lime purple"),
            Tuple.Create("side_rb", "0", "0 10px 10px 0", "red blue lime purple"),
        };

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator BorderSnapshots([ValueSource("borders")] Tuple<string, string, string, string> bg)
        {
            View.Style["margin"] = 50;
            View.Style["width"] = 150;
            View.Style["height"] = 70;
            View.Style["border-radius"] = bg.Item2;
            View.Style["border-width"] = bg.Item3;
            View.Style["border-color"] = bg.Item4;
            yield return null;
            Assertions.Snapshot("borders/" + bg.Item1);
        }

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator BackgroundBlendSnapshots()
        {
            View.Style["background"] = "url(res:star)";
            yield return null;
            Assertions.Snapshot("backgrounds/blend/colorless");

            View.Style["background"] = "url(res:star) rgba(0, 0, 200, 0.4)";
            yield return null;
            Assertions.Snapshot("backgrounds/blend/normal-blend");

            View.Style["background-blend-mode"] = "multiply";
            yield return null;
            Assertions.Snapshot("backgrounds/blend/multiply-blend");

            View.Style["background-blend-mode"] = "color";
            yield return null;
            Assertions.Snapshot("backgrounds/blend/color-blend");
        }


        protected static Tuple<string, string>[] backgrounds = new Tuple<string, string>[] {
            Tuple.Create("01", "url(res:star)"),
            Tuple.Create("02", "url(res:star) 100% 0"),
            Tuple.Create("03", "url(res:star) 0 100%"),
            Tuple.Create("04", "url(res:star) 0 0/cover"),
            Tuple.Create("05", "url(res:star) center/cover"),
            Tuple.Create("06", "url(res:star) center/contain"),
            Tuple.Create("07", "url(res:star) bottom right / contain"),
            Tuple.Create("08", "url(res:star) 0 0 / 10% 10%"),
            Tuple.Create("09", "url(res:star) 0 0 / 10%"),
            Tuple.Create("10", "url(res:star) 20% 90% / 500px 500px"),
            Tuple.Create("11", "url(res:star) top /100px 20px"),
            Tuple.Create("12", "url(res:star) space round top / 35% 35%"),
            Tuple.Create("13", "url(res:star) round space top / 35%"),
            Tuple.Create("14", "url(res:star) repeat-y top / 35%"),
            Tuple.Create("15", "url(res:star) repeat-x top / 35%"),
            Tuple.Create("16", "url(res:star) space bottom right / cover"),
            Tuple.Create("17", "url(res:star) space bottom right / contain"),
            Tuple.Create("18", $"url({DataUrl})"),
            Tuple.Create("19", $"url(\"{DataUrl}\")"),
        };

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator BackgroundSnapshots([ValueSource("backgrounds")] Tuple<string, string> bg)
        {
            View.Style["width"] = "160px";
            View.Style["height"] = "250px";
            View.Style["background"] = bg.Item2;
            View.Style["background-color"] = "blue";
            yield return null;
            Assertions.Snapshot("backgrounds/bg", bg.Item1);
        }


        protected static Tuple<string, string>[] masks = new Tuple<string, string>[] {
            Tuple.Create("01", "url(res:star)"),
            Tuple.Create("02", "url(res:star) 100% 0"),
            Tuple.Create("03", "url(res:star) 0 100%"),
            Tuple.Create("04", "url(res:star) 0 0/cover"),
            Tuple.Create("05", "url(res:star) center/cover"),
            Tuple.Create("06", "url(res:star) center/contain"),
            Tuple.Create("07", "url(res:star) bottom right / contain"),
            Tuple.Create("08", "url(res:star) 0 0 / 10% 10%"),
            Tuple.Create("09", "url(res:star) 0 0 / 10%"),
            Tuple.Create("10", "url(res:star) 20% 90% / 500px 500px"),
            Tuple.Create("11", "url(res:star) top /100px 20px"),
            Tuple.Create("12", "url(res:star) space round top / 35% 35%"),
            Tuple.Create("13", "url(res:star) round space top / 35%"),
            Tuple.Create("14", "url(res:star) repeat-y top / 35%"),
            Tuple.Create("15", "url(res:star) repeat-x top / 35%"),
            Tuple.Create("16", "url(res:star) space bottom right / cover"),
            Tuple.Create("17", "url(res:star) space bottom right / contain"),
            Tuple.Create("18", "url(res:star) no-repeat bottom right / 70%, url(res:star) no-repeat bottom left / 70%"),
        };

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator MaskSnapshots([ValueSource("masks")] Tuple<string, string> bg)
        {
            View.Style["width"] = "160px";
            View.Style["height"] = "250px";
            View.Style["mask"] = bg.Item2;
            View.Style["background-color"] = "blue";
            yield return null;
            Assertions.Snapshot("masks/mask", bg.Item1);
        }
    }
}
