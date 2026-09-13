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

        [UGUITest(Script = BaseScript, Style = @"
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

        [UGUITest(Script = BaseScript, Style = @"
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

        [UGUITest(Script = BaseScript, Style = @"
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

        [UGUITest(Script = BaseScript, Style = @"
            :root {
                --x: 10px;
                --a: 45deg;
            }
            #test {
                width: 100px;
                height: 100px;
                transform: translateX(var(--x)) rotate(var(--a));
            }
")]
        public IEnumerator TransformFollowsTheVariablesItIsBuiltFrom()
        {
            yield return null;

            var cmp = Q("#test") as UGUI.ContainerComponent;
            Assert.AreEqual(10, cmp.ComputedStyle.translate.X.Value);
            Assert.AreEqual(45, cmp.ComputedStyle.rotate.z, 0.001f);

            // The shorthand is re-read when a variable it names changes, rather than being fixed
            // at the value it had when the rule was parsed.
            Context.Host.Style.Set("--x", "40px");
            yield return null;
            Assert.AreEqual(40, cmp.ComputedStyle.translate.X.Value);
            Assert.AreEqual(45, cmp.ComputedStyle.rotate.z, 0.001f, "the other one is untouched");
        }

        const string TransformTransitionScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test' className={globals.started ? 'started' : ''} />;
            }
";

        [UGUITest(Script = TransformTransitionScript, Style = @"
            :root { --x: 100px; }
            #test {
                width: 100px;
                height: 100px;
                transform: translateX(0px);
                transition: transform 1s linear;
            }
            #test.started { transform: translateX(var(--x)); }
")]
        public IEnumerator ATransformTransitionCanRunTowardsAVariable()
        {
            yield return null;

            var cmp = Q("#test") as UGUI.ContainerComponent;
            Assert.AreEqual(0, cmp.ComputedStyle.translate.X.Value);

            Globals["started"] = true;
            yield return null;

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(50, cmp.ComputedStyle.translate.X.Value, 1, "it interpolates rather than snapping");

            yield return AdvanceTime(1f);
            Assert.AreEqual(100, cmp.ComputedStyle.translate.X.Value, 1);
        }
    }
}
