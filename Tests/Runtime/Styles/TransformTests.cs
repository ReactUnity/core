using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class TransformTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view />;
            }
";

        const string BaseStyle = @"
            view {
                width: 200px;
                height: 200px;
                background-color: red;
            }
";

        public UGUIComponent View => Q("view") as UGUIComponent;
        public Rect Rect => View.GetBoundingClientRect();

        public TransformTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest(Code = BaseScript, Style = BaseStyle)]
        public IEnumerator TransformOriginWorksCorrectly()
        {
            yield return null;

            var rt = View.RectTransform;

            View.Style.Set("transform-origin", "bottom right");
            View.Style.Set("rotate", "45deg");
            yield return null;
            Assert.AreEqual(-200, rt.rect.x, 1);
            Assert.AreEqual(0, rt.rect.y, 1);


            View.Style.Set("transform-origin", "100% 100%");
            View.Style.Set("rotate", "45deg");
            yield return null;
            Assert.AreEqual(-200, rt.rect.x, 1);
            Assert.AreEqual(0, rt.rect.y, 1);


            View.Style.Set("transform-origin", "top right");
            View.Style.Set("rotate", "60deg");
            yield return null;
            Assert.AreEqual(-200, rt.rect.x, 1);
            Assert.AreEqual(-200, rt.rect.y, 1);


            View.Style.Set("transform-origin", "top left");
            View.Style.Set("rotate", "30deg");
            yield return null;
            Assert.AreEqual(0, rt.rect.x, 1);
            Assert.AreEqual(-200, rt.rect.y, 1);


            View.Style.Set("transform-origin", "bottom left");
            View.Style.Set("rotate", "22deg");
            yield return null;
            Assert.AreEqual(0, rt.rect.x, 1);
            Assert.AreEqual(0, rt.rect.y, 1);


            View.Style.Set("transform-origin", "66% 66%");
            View.Style.Set("rotate", "22deg");
            yield return null;
            Assert.AreEqual(-132, rt.rect.x, 1);
            Assert.AreEqual(-68, rt.rect.y, 1);
        }


        [ReactInjectableTest(Code = BaseScript, Style = BaseStyle)]
        public IEnumerator DefaultScaleZIsIdentity()
        {
            yield return null;

            var rt = View.RectTransform;

            View.Style.Set("scale", "1.2 1.4");
            yield return null;
            Assert.AreEqual(1.2f, rt.localScale.x);
            Assert.AreEqual(1.4f, rt.localScale.y);
            Assert.AreEqual(1, rt.localScale.z);
        }
    }
}
