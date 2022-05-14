using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UIToolkit;
using UnityEngine.UIElements;

namespace ReactUnity.Tests.Editor.Renderer
{
    public class AnimationTests : EditorTestBase
    {
        const string BaseScript = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                    Test text
                </view>;
            }
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


        [EditorInjectableTest(Code = BaseScript, Style = BaseStyle, RealTimer = true)]
        public IEnumerator AnimationShouldWorkWithRealTimer()
        {
            var cmp = Q("#test") as UIToolkitComponent<VisualElement>;
            var rt = cmp.Element;

            cmp.Style.Set("animation", "growWidth 1s 400ms both");
            yield return null;
            Assert.AreEqual(100, rt.layout.width, 0.5f);

            yield return AdvanceTime(0.5f);
            Assert.IsTrue(rt.layout.width < 500 && rt.layout.width > 100);

            yield return AdvanceTime(1f);
            Assert.AreEqual(500, rt.layout.width, 1);
        }



        [EditorInjectableTest(Code = BaseScript, Style = BaseStyle)]
        public IEnumerator AnimationShouldWorkOnLayoutStyles()
        {
            var cmp = Q("#test") as UIToolkitComponent<VisualElement>;
            var rt = cmp.Element;

            cmp.Style.Set("animation", "growWidth 1s 400ms both linear");
            yield return null;
            Assert.AreEqual(100, rt.layout.width, 0.5f);

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(140, rt.layout.width);

            yield return AdvanceTime(1f);
            Assert.AreEqual(500, rt.layout.width);
        }
    }
}
