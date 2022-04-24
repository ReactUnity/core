using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;

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
                font-size: 100%;
            }
")]
        public IEnumerator PercentageIsRelativeToFontSize()
        {
            yield return null;

            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;
            var text = rt.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            Assert.AreEqual(24, text.fontSize);

            cmp.Style["font-size"] = "150%";
            yield return null;
            Assert.AreEqual(36, text.fontSize);
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

        [ReactInjectableTest(style: @"
            #test {
                font-size: 23px;
                font-size: bogus-value;
            }
")]
        public IEnumerator InvalidValuesAreIgnored()
        {
            yield return null;
            var text = Canvas.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.AreEqual(23, text.fontSize);
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

        [ReactInjectableTest(MultipleLevelsScript,
@"
            #test {
                font-size: 2rem;
            }
            view {
                font-size: 1.5em;
            }
")]
        public IEnumerator RemAndEmCombinedWorks()
        {
            yield return null;

            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;
            var text = rt.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            Assert.AreEqual(108, text.fontSize);
        }

        [ReactInjectableTest(MultipleLevelsScript,
@"
            #test {
                font-size: 2rem;
                width: 20rem;
                height: 4em;
                align-self: flex-start;
            }
")]
        public IEnumerator RemAndEmWorksOnLayout()
        {
            yield return null;

            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;
            var text = rt.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            Assert.AreEqual(48, text.fontSize);
            Assert.AreEqual(480, rt.rect.width);
            Assert.AreEqual(48 * 4, rt.rect.height);
        }
    }
}
