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

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
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


        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator PositiveRotationIsClockwise()
        {
            yield return null;

            var rt = View.RectTransform;

            // The web turns a positive angle clockwise, so the right edge ends up at the bottom.
            View.Style.Set("rotate", "90deg");
            yield return null;
            AssertDirection(Vector3.down, rt.TransformDirection(Vector3.right));

            View.Style.Set("rotate", "-90deg");
            yield return null;
            AssertDirection(Vector3.up, rt.TransformDirection(Vector3.right));

            View.Style.Set("transform", "rotate(45deg) rotate(45deg)");
            yield return null;
            AssertDirection(Vector3.down, rt.TransformDirection(Vector3.right));

            // rotateX tilts the top edge away from the viewer, which on a canvas is +z.
            View.Style.Set("transform", "rotateX(90deg)");
            yield return null;
            AssertDirection(Vector3.forward, rt.TransformDirection(Vector3.up));

            // rotateY sends the right edge away from the viewer too.
            View.Style.Set("transform", "rotateY(90deg)");
            yield return null;
            AssertDirection(Vector3.forward, rt.TransformDirection(Vector3.right));
        }

        static void AssertDirection(Vector3 expected, Vector3 actual)
        {
            Assert.AreEqual(expected.x, actual.x, 0.001f);
            Assert.AreEqual(expected.y, actual.y, 0.001f);
            Assert.AreEqual(expected.z, actual.z, 0.001f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
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
