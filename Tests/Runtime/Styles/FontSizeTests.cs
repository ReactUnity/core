using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;

namespace ReactUnity.Tests
{
    public class FontSizeTests : TestBase
    {
        const string MultipleLevelsScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                    <view><view>Hello world</view></view>
                </view>;
            }

            Renderer.render(<GlobalsProvider children={<App />} />);
";

        public FontSizeTests(JavascriptEngineType engineType) : base(engineType) { }


        [ReactInjectableTest(MultipleLevelsScript)]
        public IEnumerator DefaultFontSizeWorks()
        {
            yield return null;

            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;
            var text = rt.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            Assert.AreEqual(24, text.fontSize);
        }

        [ReactInjectableTest(style: @"
            #test {
                font-size: 1.5rem;
            }
")]
        public IEnumerator RemWorks()
        {
            yield return null;

            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;
            var text = rt.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            Assert.AreEqual(36, text.fontSize);
        }

        [ReactInjectableTest(MultipleLevelsScript,
@"
            view {
                font-size: 1.5em;
            }
")]
        public IEnumerator EmWorksOnMultipleLevels()
        {
            yield return null;

            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;
            var text = rt.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            Assert.AreEqual(81, text.fontSize);
        }
    }
}
