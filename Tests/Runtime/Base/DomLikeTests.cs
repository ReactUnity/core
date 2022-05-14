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
    }
}
