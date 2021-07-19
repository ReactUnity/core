using System.Collections;
using NUnit.Framework;
using ReactUnity.Helpers;
using ReactUnity.ScriptEngine;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class TransitionTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test' className={globals.started ? 'started' : ''}>
                    Test text
                </view>;
            }

            Renderer.render(
                <GlobalsProvider>
                    <App />
                </GlobalsProvider>
            );
";

        const string BaseStyle = @"
            #test {
                background-color: red;
                color: white;
                width: 100px;
            }
            #test.started {
                transition: color 1s 400ms linear, width 1s 400ms linear;
                color: black;
                width: 500px;
            }
";

        public TransitionTests(JavascriptEngineType engineType) : base(engineType) { }


        [ReactInjectableTest(BaseScript, BaseStyle, realTimer: true)]
        public IEnumerator TransitionShouldWorkWithRealTimer()
        {
            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;

            Assert.AreEqual(100, rt.rect.width);

            Globals["started"] = true;
            yield return AdvanceTime(0.1f);
            Assert.AreEqual(100, rt.rect.width);

            yield return AdvanceTime(0.5f);
            Assert.IsTrue(rt.rect.width < 500 && rt.rect.width > 100);

            yield return AdvanceTime(1f);
            Assert.That(rt.rect.width, Is.EqualTo(500).Within(1));
        }

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator TransitionShouldWorkOnLayoutStyles()
        {
            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;

            Assert.AreEqual(100, rt.rect.width);

            Globals["started"] = true;
            yield return AdvanceTime(0.1f);
            Assert.AreEqual(100, rt.rect.width);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(180, rt.rect.width);

            yield return AdvanceTime(1f);
            Assert.AreEqual(500, rt.rect.width);
        }

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator TransitionShouldWorkOnVisualStyles()
        {
            var text = (Q("#test") as UGUI.ContainerComponent).GameObject.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            Assert.AreEqual(Color.white, text.color);

            Globals["started"] = true;
            yield return AdvanceTime(0.1f);
            Assert.AreEqual(Color.white, text.color);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(0.8f, text.color.grayscale);

            yield return AdvanceTime(1f);
            Assert.AreEqual(Color.black, text.color);
        }
    }
}
