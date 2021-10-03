using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;
using UnityEngine;

namespace ReactUnity.Tests
{
    [TestFixture(JavascriptEngineType.Auto, RenderMode.ScreenSpaceCamera, Category = "RenderMode")]
    [TestFixture(JavascriptEngineType.Auto, RenderMode.ScreenSpaceOverlay, Category = "RenderMode")]
    [TestFixture(JavascriptEngineType.Auto, RenderMode.WorldSpace, Category = "RenderMode")]
    public class BoundingClientRectTests : TestBase
    {
        public BoundingClientRectTests(JavascriptEngineType engineType, RenderMode renderMode) : base(engineType, renderMode) { }

        [ReactInjectableTest]
        public IEnumerator BasicRect()
        {
            var view = Q("view");
            view.Style.Set("width", 300);
            view.Style.Set("height", 200);
            yield return null;

            var rect = view.GetBoundingClientRect();

            Assert.AreEqual(0, rect.x, 1);
            Assert.AreEqual(0, rect.y, 1);
            Assert.AreEqual(300, rect.width, 1);
            Assert.AreEqual(200, rect.height, 1);
        }

        [ReactInjectableTest]
        public IEnumerator ScaledRect()
        {
            var view = Q("view");
            view.Style.Set("width", 300);
            view.Style.Set("height", 200);
            view.Style.Set("scale", 1.5);
            yield return null;

            var rect = view.GetBoundingClientRect();

            Assert.AreEqual(-75, rect.x, 1);
            Assert.AreEqual(-50, rect.y, 1);
            Assert.AreEqual(450, rect.width, 1);
            Assert.AreEqual(300, rect.height, 1);
        }

        [ReactInjectableTest]
        public IEnumerator RectWithZIndex()
        {
            var view = Q("view");
            view.Style.Set("width", 300);
            view.Style.Set("height", 200);
            view.Style.Set("scale", 1.5);
            view.Style.Set("z-index", 100);
            yield return null;

            var rect = view.GetBoundingClientRect();

            Assert.AreEqual(-75, rect.x, 1);
            Assert.AreEqual(-50, rect.y, 1);
            Assert.AreEqual(450, rect.width, 1);
            Assert.AreEqual(300, rect.height, 1);
        }
    }
}
