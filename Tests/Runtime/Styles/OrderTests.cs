using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;

namespace ReactUnity.Tests
{
    public class OrderTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                    <v1>1</v1>
                    <v2>2</v2>
                    <v3>3</v3>
                    <v4>4</v4>
                    <v5>5</v5>
                    <v6>6</v6>
                    <v7>7</v7>
                </view>;
            }

            Renderer.render(<App />);
";

        const string BaseStyle = @"
            v1 { order: 1; }
            v4 { order: -3; }
";

        public OrderTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest(BaseScript, BaseStyle)]
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
        }

        private void AssertOrder(params int[] expectedOrder)
        {
            var firstItem = Q("v" + expectedOrder[0]);
            var min = firstItem.GetBoundingClientRect().y;

            for (int i = 1; i < expectedOrder.Length; i++)
            {
                var item = expectedOrder[i];
                var itemCmp = Q("v" + item);

                var top = itemCmp.GetBoundingClientRect().y;
                Assert.Greater(top, min, $"Expected {item} to come after {expectedOrder[i - 1]}");
                min = top;
            }
        }
    }
}
