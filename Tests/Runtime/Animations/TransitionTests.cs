using System.Collections;
using NUnit.Framework;
using ReactUnity.Helpers;
using ReactUnity.ScriptEngine;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class TransitionTests : TestBase
    {
        public TransitionTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest(@"
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
        ", @"
            #test {
                background-color: red;
                width: 100px;
            }
            #test.started {
                transition: width 1s 400ms;
                width: 500px;
            }
")]
        public IEnumerator TransitionShouldWorkOnLayoutStyles()
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



        [ReactInjectableTest(@"
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
        ", @"
            #test {
                background-color: red;
                color: white;
            }
            #test.started {
                transition: color 1s 400ms;
                color: black;
            }
")]
        public IEnumerator TransitionShouldWorkOnVisualStyles()
        {
            var text = (Q("#test") as UGUI.ContainerComponent).GameObject.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            Assert.AreEqual(Color.white, text.color);

            Globals["started"] = true;
            yield return AdvanceTime(0.1f);
            Assert.AreEqual(Color.white, text.color);

            yield return AdvanceTime(0.5f);
            Assert.IsTrue(text.color.grayscale < 1 && text.color.grayscale > 0);

            yield return AdvanceTime(1f);
            Assert.That(text.color.grayscale, Is.EqualTo(Color.black.grayscale).Within(0.01));
        }
    }
}
