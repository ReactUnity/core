using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.Types;
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
        public IEnumerator ABackFaceIsHiddenOnceARotationTurnsItOver()
        {
            yield return null;

            View.Style.Set("backface-visibility", "hidden");
            yield return null;
            Assert.IsFalse(View.BackfaceCuller.IsBackFacing, "square on");

            View.Style.Set("transform", "rotateY(180deg)");
            yield return null;
            Assert.IsTrue(View.BackfaceCuller.IsBackFacing);
            Assert.AreEqual(0, View.CanvasGroup.alpha, "not drawn");
            Assert.IsFalse(View.CanvasGroup.blocksRaycasts, "and not hit either");

            // Turning back round uncovers it again -- the state is polled, not latched.
            View.Style.Set("transform", "rotateY(340deg)");
            yield return null;
            Assert.IsFalse(View.BackfaceCuller.IsBackFacing);
            Assert.AreEqual(1, View.CanvasGroup.alpha);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator TheDefaultKeepsDrawingABackFace()
        {
            yield return null;

            View.Style.Set("transform", "rotateY(180deg)");
            yield return null;
            Assert.IsNull(View.BackfaceCuller, "nothing watches until something asks");
            Assert.IsTrue(!View.CanvasGroup || View.CanvasGroup.alpha == 1);

            // And asking for it later starts the watch already turned over.
            View.Style.Set("backface-visibility", "hidden");
            yield return null;
            Assert.IsTrue(View.BackfaceCuller.IsBackFacing);
            Assert.AreEqual(0, View.CanvasGroup.alpha);

            View.Style.Set("backface-visibility", "visible");
            yield return null;
            Assert.IsNull(View.BackfaceCuller, "and the watch goes with it");
            Assert.AreEqual(1, View.CanvasGroup.alpha);
        }

        // A mirror shows the back of a face without rotating it anywhere, which is the one case a
        // rotation angle would miss and a winding catches for free.
        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator AMirroredElementIsShowingItsBack()
        {
            yield return null;

            View.Style.Set("backface-visibility", "hidden");
            View.Style.Set("transform", "scaleX(-1)");
            yield return null;
            Assert.IsTrue(View.BackfaceCuller.IsBackFacing);

            // Both axes mirrored is a half turn in the plane, which is a front face again.
            View.Style.Set("transform", "scale(-1, -1)");
            yield return null;
            Assert.IsFalse(View.BackfaceCuller.IsBackFacing);
        }

        // The rotation an ancestor carries counts as much as the element's own, and nothing resolves
        // this element's style when that ancestor turns -- so the watch has to notice on its own.
        [UGUITest(Script = @"
            export default function App() {
                return <view id='outer'><view id='inner' /></view>;
            }
        ", Style = @"
          #outer { width: 200px; height: 200px; }
          #inner { width: 100px; height: 100px; backface-visibility: hidden; }
")]
        public IEnumerator AnAncestorsRotationTurnsTheFaceOver()
        {
            yield return null;

            var inner = Q("#inner") as UGUIComponent;
            Assert.IsFalse(inner.BackfaceCuller.IsBackFacing);

            (Q("#outer") as UGUIComponent).Style.Set("transform", "rotateY(180deg)");
            yield return null;
            Assert.IsTrue(inner.BackfaceCuller.IsBackFacing);
            Assert.AreEqual(0, inner.CanvasGroup.alpha);
        }

        // CSS points +z at the viewer, a canvas points it away. Nothing shows the difference under
        // an orthographic overlay, which is why it went unnoticed -- a `perspective` shows it at once.
        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator PositiveTranslateZComesTowardsTheViewer()
        {
            yield return null;

            var rt = View.RectTransform;

            View.Style.Set("transform", "translateZ(20px)");
            yield return null;
            Assert.AreEqual(-20, rt.localPosition.z);

            View.Style.Set("transform", "translate3d(5px, 10px, -30px)");
            yield return null;
            Assert.AreEqual(30, rt.localPosition.z);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator PerspectiveTakesTheOffscreenPassAndGivesItBack()
        {
            yield return null;
            Assert.IsNull(View.ElementFilter, "nothing to project through yet");

            View.Style.Set("perspective", "400px");
            yield return null;
            Assert.NotNull(View.ElementFilter);
            Assert.AreEqual(400, View.ElementFilter.Perspective);

            View.Style.Set("perspective", "none");
            yield return null;
            Assert.IsNull(View.ElementFilter, "and `none` is worth nothing at all");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator PerspectiveOriginTakesTheSameValuesTransformOriginDoes()
        {
            yield return null;

            View.Style.Set("perspective", "400px");
            yield return null;
            Assert.AreEqual(YogaValue2.Center, View.ElementFilter.PerspectiveOrigin, "centred by default");

            View.Style.Set("perspective-origin", "left center");
            yield return null;
            Assert.AreEqual(YogaValue2.Percent(0, 50), View.ElementFilter.PerspectiveOrigin);

            View.Style.Set("perspective-origin", "25% 75%");
            yield return null;
            Assert.AreEqual(YogaValue2.Percent(25, 75), View.ElementFilter.PerspectiveOrigin);
        }

        // A distance behind the viewer is not one anything could draw, and CSS does not accept it
        // either -- so it reads as `none` rather than turning the subtree inside out.
        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ANegativePerspectiveIsNoPerspective()
        {
            yield return null;

            View.Style.Set("perspective", "-400px");
            yield return null;
            Assert.AreEqual(0, View.ComputedStyle.perspective);
            Assert.IsNull(View.ElementFilter);
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
