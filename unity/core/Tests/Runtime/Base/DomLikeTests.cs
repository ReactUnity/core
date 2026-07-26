using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;

namespace ReactUnity.Tests
{
    public class DomLikeTests : TestBase
    {
        public DomLikeTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest]
        public IEnumerator SizeAndScrollPropertiesWork()
        {
            var view = Q("view");
            view.Style.Set("width", 300);
            view.Style.Set("height", 200);
            yield return null;

            Assert.AreEqual(300, view.ClientWidth);
            Assert.AreEqual(300, view.ScrollWidth);
            Assert.AreEqual(200, view.ClientHeight);
            Assert.AreEqual(200, view.ScrollHeight);
            Assert.AreEqual(0, view.ScrollLeft);
            Assert.AreEqual(0, view.ScrollTop);
        }

        [UGUITest(Script = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test' aria-label='aa' data-d1='wow' data-d2={22}
                         data={{ d3: 5, d4: '11', d5: globals.d5 }}>
                    Hello world
                </view>;
            }
")]
        public IEnumerator DataPropertiesCanBeAssignedAsObject()
        {
            var view = Q("#test");
            var d1 = view.Data.GetValueOrDefault("d1");
            var d2 = view.Data.GetValueOrDefault("d2");
            var d3 = view.Data.GetValueOrDefault("d3");
            var d4 = view.Data.GetValueOrDefault("d4");
            var d5 = view.Data.GetValueOrDefault("d5");
            var label = view.Data.GetValueOrDefault("aria-label");

            Assert.AreEqual("wow", d1);
            Assert.AreEqual(22, d2);
            Assert.AreEqual(5, d3);
            Assert.AreEqual("11", d4);
            Assert.AreEqual(null, d5);
            Assert.AreEqual("aa", label);

            Globals.Set("d5", 19);
            yield return null;
            d5 = view.Data.GetValueOrDefault("d5");
            Assert.AreEqual(19, d5);
        }
    }
}
