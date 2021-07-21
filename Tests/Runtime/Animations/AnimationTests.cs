using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class AnimationTests : TestBase
    {
        const string BaseScript = @"
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
        ";

        const string BaseStyle = @"
            #test {
                background-color: red;
            }

            @keyframes growWidth {
                from {
                    width: 100px;
                }
                to {
                    width: 500px;
                }
            }

            @keyframes fadeColor {
                from {
                    color: black;
                }
                to {
                    color: white;
                }
            }
";

        public AnimationTests(JavascriptEngineType engineType) : base(engineType) { }


        [ReactInjectableTest(BaseScript, BaseStyle, realTimer: true)]
        public IEnumerator AnimationShouldWorkWithRealTimer()
        {
            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;

            cmp.Style.Set("animation", "growWidth 1s 400ms both");
            yield return null;
            Assert.AreEqual(100, rt.rect.width);

            yield return AdvanceTime(0.5f);
            Assert.IsTrue(rt.rect.width < 500 && rt.rect.width > 100);

            yield return AdvanceTime(1f);
            Assert.That(rt.rect.width, Is.EqualTo(500).Within(1));
        }




        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator AnimationShouldWorkOnLayoutStyles()
        {
            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;

            cmp.Style.Set("animation", "growWidth 1s 400ms both linear");
            yield return null;
            Assert.AreEqual(100, rt.rect.width);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(140, rt.rect.width);

            yield return AdvanceTime(1f);
            Assert.That(rt.rect.width, Is.EqualTo(500));
        }



        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator AnimationCanBePaused()
        {
            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;

            cmp.Style.Set("animation", "growWidth 1s 400ms linear both paused");
            yield return null;
            Assert.AreEqual(100, rt.rect.width);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(100, rt.rect.width);


            cmp.Style.Set("animation", "growWidth 1s 400ms linear both");
            yield return AdvanceTime(0.5f);
            Assert.AreEqual(140, rt.rect.width);

            cmp.Style.Set("animation", "growWidth 1s 400ms linear both paused");
            yield return AdvanceTime(1f);
            Assert.AreEqual(140, rt.rect.width);
            cmp.Style.Set("animation", "growWidth 1s 400ms linear both");

            yield return AdvanceTime(1f);
            Assert.AreEqual(500, rt.rect.width);
        }



        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator AnimationShouldWorkOnVisualStyles()
        {
            var view = (Q("#test") as UGUI.ContainerComponent);
            var text = view.GameObject.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            view.Style.Set("animation", "fadeColor 1s 400ms linear both");
            yield return null;
            Assert.AreEqual(Color.black, text.color);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(0.1f, text.color.grayscale);

            yield return AdvanceTime(1f);
            Assert.AreEqual(Color.white, text.color);
        }



        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator CssVariablesShouldBeAnimatableForVisualStyles()
        {
            Context.InsertStyle(@"
                @keyframes changeVar {
                    from {
                        --my-color: black;
                    }
                    to {
                        --my-color: white;
                    }
                }");

            var view = (Q("#test") as UGUI.ContainerComponent);
            var text = view.GameObject.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            view.Style.Set("color", "var(--my-color)");
            view.Style.Set("animation", "changeVar 1s 400ms linear both");
            yield return null;
            Assert.AreEqual(Color.black, text.color);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(0.1f, text.color.grayscale);

            yield return AdvanceTime(1f);
            Assert.AreEqual(Color.white, text.color);
        }
    }
}
