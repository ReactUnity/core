using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class TextRelatedTests : TestBase
    {
        const string MultipleLevelsScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                    <view>
                        <text>Hello world</text>
                        I am here
                    </view>
                </view>;
            }
";

        public TextRelatedTests(JavascriptEngineType engineType) : base(engineType) { }


        [ReactInjectableTest(Code = MultipleLevelsScript)]
        public IEnumerator TextElementCanBeSelectedInVariousWays()
        {
            var view = Q("#test");
            var cts = view.RectTransform.GetComponentsInChildren<TMPro.TextMeshProUGUI>();
            var t1 = cts[0];
            var t2 = cts[1];

            Assert.AreEqual("Hello world", t1.text);
            Assert.AreEqual("I am here", t2.text);

            InsertStyle(@":text { color: red }");
            yield return null;

            Assert.AreEqual(Color.red, t1.color);
            Assert.AreEqual(Color.red, t2.color);


            InsertStyle(@"text { color: blue }", 1);
            yield return null;

            Assert.AreEqual(Color.blue, t1.color);
            Assert.AreEqual(Color.red, t2.color);


            InsertStyle(@"_text { color: white }", 1);
            yield return null;

            Assert.AreEqual(Color.blue, t1.color);
            Assert.AreEqual(Color.white, t2.color);


            InsertStyle(@"view:text { color: black }", 1);
            yield return null;

            Assert.AreEqual(Color.blue, t1.color);
            Assert.AreEqual(Color.white, t2.color);


            InsertStyle(@"view::text { color: black }", 1);
            yield return null;

            Assert.AreEqual(Color.blue, t1.color);
            Assert.AreEqual(Color.black, t2.color);


            InsertStyle(@"view *:text:not(text) { color: lime }", 1);
            yield return null;

            Assert.AreEqual(Color.blue, t1.color);
            Assert.AreEqual(Color.green, t2.color);
        }

        [ReactInjectableTest(Code = MultipleLevelsScript)]
        public IEnumerator MaxLinesWorks()
        {
            InsertStyle(@"#test { max-lines: 5 }");

            yield return null;

            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;
            var text = rt.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            Assert.AreEqual(5, text.maxVisibleLines);

            cmp.Style["max-lines"] = 10;
            yield return null;
            Assert.AreEqual(10, text.maxVisibleLines);

            cmp.Style["max-lines"] = null;
            yield return null;
            Assert.AreEqual(5, text.maxVisibleLines);

            cmp.Style["max-lines"] = "initial";
            yield return null;
            Assert.AreEqual(short.MaxValue, text.maxVisibleLines);
        }
    }
}
