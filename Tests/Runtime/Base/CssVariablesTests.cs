using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class CssVariablesTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                    Test text
                </view>;
            }
";

        public CssVariablesTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest(Code = BaseScript, Style = @"
            :root {
                --my-color: red;
            }
            #test {
                color: var(--my-color);
            }
")]
        public IEnumerator BasicCssVariableAppliesToColor()
        {
            yield return null;

            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;
            var text = rt.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            Assert.AreEqual(Color.red, text.color);
        }

        [UGUITest(Code = BaseScript, Style = @"
            :root {
                color: red;
            }
            #test {
                color: currentColor;
            }
")]
        public IEnumerator CurrentColorCanBeUsed()
        {
            yield return null;

            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;
            var text = rt.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            Assert.AreEqual(Color.red, text.color);
        }

        [UGUITest(Code = BaseScript, Style = @"
            :root {
                --my-color: red;
                --my-other-color: magenta;
            }
            #test {
                color: var(--my-color);
            }
")]
        public IEnumerator VariableChangesAreReflectedOnElementStyle()
        {
            yield return null;

            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;
            var text = rt.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            cmp.Style.Set("--my-color", "blue");
            yield return null;
            Assert.AreEqual(Color.blue, text.color);

            cmp.Style.Set("color", "var(--my-other-color)");
            yield return null;
            Assert.AreEqual(Color.magenta, text.color);
        }
    }
}
