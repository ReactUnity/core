using System.Collections;
using NUnit.Framework;
using ReactUnity.Helpers;
using ReactUnity.ScriptEngine;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class AnimationTests : TestBase
    {
        public AnimationTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest(@"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
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
                animation: growWidth 1s 400ms both;
            }

            @keyframes growWidth {
                from {
                    width: 100px;
                }
                to {
                    width: 500px;
                }
            }
")]
        public IEnumerator AnimationShouldWorkOnLayoutStyles()
        {
            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;

            Assert.AreEqual(100, rt.rect.width);

            yield return new WaitForSecondsRealtime(0.5f);
            Assert.IsTrue(rt.rect.width < 500 && rt.rect.width > 100);

            yield return new WaitForSecondsRealtime(1f);
            Assert.That(rt.rect.width, Is.EqualTo(500).Within(1));
        }



        [ReactInjectableTest(@"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
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
                animation: fadeColor 1s 400ms both;
            }

            @keyframes fadeColor {
                from {
                    color: black;
                }
                to {
                    color: white;
                }
            }
")]
        public IEnumerator AnimationShouldWorkOnVisualStyles()
        {
            var text = (Q("#test") as UGUI.ContainerComponent).GameObject.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            Assert.AreEqual(Color.black, text.color);

            yield return new WaitForSecondsRealtime(0.5f);
            Assert.IsTrue(text.color.grayscale < 1 && text.color.grayscale > 0);

            yield return new WaitForSecondsRealtime(1f);
            Assert.That(text.color.grayscale, Is.EqualTo(Color.white.grayscale).Within(0.01));
        }
    }
}
