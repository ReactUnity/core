using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;

namespace ReactUnity.Tests
{
    public class MotionTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test' className={globals.started ? 'started' : ''}>
                    Test text
                </view>;
            }
";

        const string BaseStyle = @"
            #test {
                background-color: red;
                color: white;
                width: 100px;
                motion: 1s 400ms linear;
            }
";

        public MotionTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest(Script = BaseScript, Style = BaseStyle, RealTimer = true)]
        public IEnumerator MotionShouldWorkWithRealTimer()
        {
            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;

            Assert.AreEqual(100, rt.rect.width);

            cmp.Style["width"] = 500;
            yield return null;
            yield return AdvanceTime(0.1f);
            Assert.AreEqual(100, rt.rect.width);

            yield return AdvanceTime(0.5f);
            Assert.IsTrue(rt.rect.width < 500 && rt.rect.width > 100);

            yield return AdvanceTime(1f);
            Assert.AreEqual(rt.rect.width, 500f, 1f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator MotionShouldWork()
        {
            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;

            Assert.AreEqual(100, rt.rect.width);

            cmp.Style["width"] = 500;
            cmp.Style["translate-z"] = 10;
            yield return null;
            yield return null;
            yield return AdvanceTime(0.1f);
            Assert.AreEqual(100, rt.rect.width);
            Assert.AreEqual(0, rt.localPosition.z);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(180, rt.rect.width);
            Assert.AreEqual(2, rt.localPosition.z, 0.1);

            yield return AdvanceTime(1f);
            Assert.AreEqual(500, rt.rect.width);
            Assert.AreEqual(10, rt.localPosition.z);
        }


        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator MotionShouldTransitionImmedialyFromDisplayNone()
        {
            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;

            Assert.AreEqual(100, rt.rect.width);

            cmp.Style["width"] = 500;
            yield return null;
            yield return null;
            yield return AdvanceTime(0.4f);
            Assert.AreEqual(100, rt.rect.width);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(300, rt.rect.width);

            yield return AdvanceTime(1f);
            Assert.AreEqual(500, rt.rect.width);

            cmp.Style["display"] = "none";
            yield return AdvanceTime(0.1f);
            Assert.AreEqual(0, rt.rect.width);


            cmp.Style["display"] = "flex";
            yield return AdvanceTime(0.1f);
            Assert.AreEqual(500, rt.rect.width);
        }
    }
}
