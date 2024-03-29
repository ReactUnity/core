using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;

namespace ReactUnity.Tests.Editor.Renderer
{
    public class OrderTests : EditorTestBase
    {
        const string BaseScript = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                    {!!globals.show0 && <v0>0</v0>}
                    <v1>1</v1>
                    <v2>2</v2>
                    <v3>3</v3>
                    {!!globals.show9 && <v9>9</v9>}
                    <v4>4</v4>
                    <v5>5</v5>
                    <v6>6</v6>
                    <v7>7</v7>
                    {!!globals.show8 && <v8>8</v8>}
                </view>;
            }
";

        const string BaseStyle = @"
            v1 { order: 1; }
            v4 { order: -3; }
";

        public OrderTests(JavascriptEngineType engineType) : base(engineType) { }

        [EditorInjectableTest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator OrderWorksCorrectly()
        {
            yield return null;
            AssertOrder(4, 2, 3, 5, 6, 7, 1);

            Q("v3").Style["order"] = 0;
            yield return null;
            AssertOrder(4, 2, 3, 5, 6, 7, 1);

            Q("v3").Style["order"] = 5;
            yield return null;
            AssertOrder(4, 2, 5, 6, 7, 1, 3);

            Q("v1").Style["order"] = -1;
            yield return null;
            AssertOrder(4, 1, 2, 5, 6, 7, 3);

            Q("v3").Style["order"] = 0;
            yield return null;
            AssertOrder(4, 1, 2, 3, 5, 6, 7);

            Q("v1").Style["order"] = 7;
            Q("v3").Style["order"] = 5;
            yield return null;
            Globals["show8"] = true;
            Globals["show9"] = true;
            yield return null;
            AssertOrder(4, 2, 9, 5, 6, 7, 8, 3, 1);

            Globals["show0"] = true;
            Q("v3").Style["order"] = -4;
            yield return null;
            AssertOrder(3, 4, 0, 2, 9, 5, 6, 7, 8, 1);
        }

        private void AssertOrder(params int[] expectedOrder)
        {
            var firstItem = Q("v" + expectedOrder[0]);
            var min = firstItem.Element.layout.y;

            for (int i = 1; i < expectedOrder.Length; i++)
            {
                var item = expectedOrder[i];
                var itemCmp = Q("v" + item);

                var top = itemCmp.Element.layout.y;
                Assert.Greater(top, min, $"Expected {item} to come after {expectedOrder[i - 1]}");
                min = top;
            }
        }
    }
}
