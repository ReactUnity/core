using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;
using ReactUnity.UIToolkit;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Tests.Renderer
{
    public class AnimationTests : EditorTestBase
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


        [EditorInjectableTest(BaseScript, BaseStyle, realTimer: true)]
        public IEnumerator AnimationShouldWorkWithRealTimer()
        {
            var cmp = Q("#test") as UIToolkitComponent<VisualElement>;
            var rt = cmp.Element;

            cmp.Style.Set("animation", "growWidth 1s 400ms both");
            yield return null;
            Assert.AreEqual(100, rt.layout.width);

            yield return AdvanceTime(0.5f);
            Assert.IsTrue(rt.layout.width < 500 && rt.layout.width > 100);

            yield return AdvanceTime(1f);
            Assert.That(rt.layout.width, Is.EqualTo(500).Within(1));
        }



        [EditorInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator AnimationShouldWorkOnLayoutStyles()
        {
            var cmp = Q("#test") as UIToolkitComponent<VisualElement>;
            var rt = cmp.Element;

            cmp.Style.Set("animation", "growWidth 1s 400ms both linear");
            yield return null;
            Assert.AreEqual(100, rt.layout.width);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(140, rt.layout.width);

            yield return AdvanceTime(1f);
            Assert.That(rt.layout.width, Is.EqualTo(500));
        }
    }
}
