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

            Renderer.render(<App />);
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

        [ReactInjectableTest(BaseScript, BaseStyle, realTimer: true)]
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

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator MotionShouldWork()
        {
            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;

            Assert.AreEqual(100, rt.rect.width);

            cmp.Style["width"] = 500;
            yield return null;
            yield return null;
            yield return AdvanceTime(0.1f);
            Assert.AreEqual(100, rt.rect.width);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(180, rt.rect.width);

            yield return AdvanceTime(1f);
            Assert.AreEqual(500, rt.rect.width);
        }
    }
}
