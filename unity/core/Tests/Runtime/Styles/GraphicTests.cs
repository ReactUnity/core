using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;

namespace ReactUnity.Tests
{
    public class GraphicTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                    <view><view>Hello world</view></view>
                </view>;
            }
";

        const string BaseStyle = @"
            #test {
                background-color: white;
            }
        ";

        private UGUIComponent View => Q("#test");

        public GraphicTests(JavascriptEngineType engineType) : base(engineType) { }


        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator BoxShadowWorks()
        {
            View.Style["box-shadow"] = "2px 6px 10px -5px red";
            yield return null;

            Assert.AreEqual(1, View.BorderAndBackground.ShadowGraphics.Count);
            var sh0 = View.BorderAndBackground.ShadowGraphics[0];

            //Assert.AreEqual(10 * Vector2.one, sh0.Shadow.blur);
            //Assert.AreEqual(-5 * Vector2.one, sh0.Shadow.spread);
            //Assert.AreEqual(2, sh0.Shadow.offset.x);
            //Assert.AreEqual(6, sh0.Shadow.offset.y);
            //Assert.AreEqual(false, sh0.Shadow.inset);
            //Assert.AreEqual(Color.red, sh0.Shadow.color);


            View.Style["box-shadow"] = "0 0 20px rgba(0, 0, 0, 0.5), 3px 4px black inset";
            yield return null;

            Assert.AreEqual(2, View.BorderAndBackground.ShadowGraphics.Count);

            sh0 = View.BorderAndBackground.ShadowGraphics[1];
            var sh1 = View.BorderAndBackground.ShadowGraphics[0];

            //Assert.AreEqual(20 * Vector2.one, sh0.Shadow.blur);
            //Assert.AreEqual(0 * Vector2.one, sh0.Shadow.spread);
            //Assert.AreEqual(0, sh0.Shadow.offset.x);
            //Assert.AreEqual(0, sh0.Shadow.offset.y);
            //Assert.AreEqual(false, sh0.Shadow.inset);
            //Assert.AreEqual(new Color(0, 0, 0, 0.5f), sh0.Shadow.color);

            //Assert.AreEqual(0 * Vector2.one, sh1.Shadow.blur);
            //Assert.AreEqual(0 * Vector2.one, sh1.Shadow.spread);
            //Assert.AreEqual(3, sh1.Shadow.offset.x);
            //Assert.AreEqual(4, sh1.Shadow.offset.y);
            //Assert.AreEqual(true, sh1.Shadow.inset);
            //Assert.AreEqual(Color.black, sh1.Shadow.color);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ASurplusShadowIsParkedAndReused()
        {
            View.Style["box-shadow"] = "0 0 20px black, 3px 4px red";
            yield return null;

            var shadows = View.BorderAndBackground.ShadowGraphics;
            Assert.AreEqual(2, shadows.Count);
            var second = shadows[1];

            View.Style["box-shadow"] = "0 0 20px black";
            yield return null;

            Assert.AreEqual(1, shadows.Count);
            Assert.IsTrue(second, "a shadow the style dropped should be kept");
            Assert.IsFalse(second.enabled, "but not drawn");

            View.Style["box-shadow"] = "0 0 20px black, 3px 4px blue";
            yield return null;

            Assert.AreEqual(2, shadows.Count);
            Assert.AreSame(second, shadows[1], "and should be the one that comes back");
            Assert.IsTrue(second.enabled);
            Assert.AreEqual(UnityEngine.Color.black, shadows[1].color, "drawing the first CSS shadow, which the last graphic holds");
        }

        const string BorderStyle = @"
            #test {
                background-color: white;
                border: 4px inset red;
            }
        ";

        [UGUITest(Script = BaseScript, Style = BorderStyle)]
        public IEnumerator BorderStyleLookupTextureIsBoundOnFirstRender()
        {
            yield return null;

            var bg = View.BorderAndBackground.BorderGraphic;
            Assert.IsTrue(bg.mainTexture != null, "Border style lookup texture was not bound on the first render");
        }
    }
}
