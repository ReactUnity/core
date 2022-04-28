using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;

namespace ReactUnity.Tests
{
    public class LayoutTests : TestBase
    {
        public LayoutTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest()]
        public IEnumerator WidthAndHeightPropertiesCanBeSetToUndefined()
        {
            var view = Q("view") as UGUI.UGUIComponent;

            var rt = view.RectTransform;
            var initialWidth = rt.rect.width;
            var initialHeight = rt.rect.height;


            view.Style.Set("width", 300);
            yield return null;
            Assert.AreEqual(300, rt.rect.width);

            view.Style.Set("width", "auto");
            yield return null;
            Assert.AreEqual(initialWidth, rt.rect.width);

            view.Style.Set("width", 300);
            yield return null;
            Assert.AreEqual(300, rt.rect.width);

            view.Style.Set("width", null);
            yield return null;
            Assert.AreEqual(initialWidth, rt.rect.width);



            view.Style.Set("maxWidth", 200);
            yield return null;
            Assert.AreEqual(200, rt.rect.width);

            view.Style.Set("maxWidth", "auto");
            yield return null;
            Assert.AreEqual(initialWidth, rt.rect.width);



            view.Style.Set("minWidth", 5000);
            yield return null;
            Assert.AreEqual(5000, rt.rect.width);

            view.Style.Set("minWidth", null);
            yield return null;
            Assert.AreEqual(initialWidth, rt.rect.width);



            view.Style.Set("height", 300);
            yield return null;
            Assert.AreEqual(300, rt.rect.height);

            view.Style.Set("height", "auto");
            yield return null;
            Assert.AreEqual(initialHeight, rt.rect.height);

            view.Style.Set("height", 300);
            yield return null;
            Assert.AreEqual(300, rt.rect.height);

            view.Style.Set("height", null);
            yield return null;
            Assert.AreEqual(initialHeight, rt.rect.height);



            view.Style.Set("maxHeight", 20);
            yield return null;
            Assert.AreEqual(20, rt.rect.height);

            view.Style.Set("maxHeight", "auto");
            yield return null;
            Assert.AreEqual(initialHeight, rt.rect.height);



            view.Style.Set("minHeight", 5000);
            yield return null;
            Assert.AreEqual(5000, rt.rect.height);

            view.Style.Set("minHeight", null);
            yield return null;
            Assert.AreEqual(initialHeight, rt.rect.height);
        }

        [ReactInjectableTest()]
        public IEnumerator RootRelativeUnitsShouldBeRecalculatedWhenSizeChanges()
        {
            RectTransform.SetSizeWithCurrentAnchors(UnityEngine.RectTransform.Axis.Horizontal, 300);

            var view = Q("view") as UGUI.UGUIComponent;
            view.Style["width"] = "10vw";

            yield return null;
            Assert.AreEqual(30, view.ClientWidth);

            RectTransform.SetSizeWithCurrentAnchors(UnityEngine.RectTransform.Axis.Horizontal, 200);
            yield return null;
            Assert.AreEqual(20, view.ClientWidth);

            RectTransform.SetSizeWithCurrentAnchors(UnityEngine.RectTransform.Axis.Horizontal, 300);
            yield return null;
            Assert.AreEqual(30, view.ClientWidth);
        }
    }
}
