using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using ReactUnity.UGUI.Internal;
using UnityEngine;
using UnityEngine.EventSystems;

namespace ReactUnity.Tests
{
#if !UNITY_EDITOR
    [Ignore("These read the framebuffer and are only supported in editor")]
#endif
    [TestFixture(JavascriptEngineType.Auto, Category = "Filter")]
    public class PerspectiveTests : TestBase
    {
        // A stage twice the card's size, so the projection has room to grow inside it -- except in
        // the one test below that deliberately gives it none.
        const string BaseScript = @"
            export default function App() {
                return <view id='stage'><view id='card' /></view>;
            }
";

        const string BaseStyle = @"
            #stage {
                width: 240px;
                height: 240px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            #card {
                width: 120px;
                height: 120px;
                background-color: red;
            }
        ";

        private UGUIComponent Stage => Q("#stage");
        private UGUIComponent Card => Q("#card");

        public PerspectiveTests(JavascriptEngineType engineType) : base(engineType) { }

        /// <summary>
        /// Whether the card covers a point, given from the top-left in CSS pixels.
        /// </summary>
        /// <remarks>
        /// The green channel decides it rather than the red one: the card is red and the page behind
        /// it is a light grey, so red is high in both and only green tells them apart.
        /// </remarks>
        static bool CardCovers(int x, int fromTop)
        {
            var cam = Camera.main;
            var rt = new RenderTexture(Screen.width, Screen.height, 24);
            cam.targetTexture = rt;
            cam.Render();
            cam.targetTexture = null;

            var prev = RenderTexture.active;
            RenderTexture.active = rt;
            var tex = new Texture2D(Screen.width, Screen.height, TextureFormat.RGBA32, false);
            tex.ReadPixels(new Rect(0, 0, Screen.width, Screen.height), 0, 0);
            tex.Apply();
            RenderTexture.active = prev;

            // The React canvas puts the root in the top-left, so coordinates are given from there
            // and flipped into the framebuffer's bottom-up space here.
            var c = tex.GetPixel(x, Screen.height - fromTop);

            Object.DestroyImmediate(tex);
            rt.Release();
            Object.DestroyImmediate(rt);

            Debug.Log($"[perspective] ({x},{fromTop}) rgba({c.r:F2},{c.g:F2},{c.b:F2},{c.a:F2})");
            return c.g < 0.4f;
        }

        // Three frames: one for the style to resolve, one for the filter's LateUpdate to capture,
        // and one for the composite to be drawn with what it captured.
        IEnumerator Settle()
        {
            yield return null;
            yield return null;
            yield return null;
        }

        // The stage's centre, which is where the card sits and where the viewer stands by default.
        const int CentreX = 120;
        const int CentreY = 120;

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ATranslateZTowardsTheViewerDrawsLarger()
        {
            yield return Settle();

            // A third of the way to the eye, so everything at that depth draws half again as wide:
            // the card's 120 becomes 180, reaching 90 either side of the stage's centre.
            Stage.Style.Set("perspective", "300px");
            Card.Style.Set("transform", "translateZ(100px)");
            yield return Settle();

            Assert.IsTrue(CardCovers(CentreX + 80, CentreY), "80px out is inside a 90px half-width");
            Assert.IsFalse(CardCovers(CentreX + 110, CentreY), "and 110px out is not");
        }

        // The same distance the other way shrinks it, which is the whole of the sign convention:
        // an unprojected card would cover both points and a backwards one neither.
        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ATranslateZAwayFromTheViewerDrawsSmaller()
        {
            yield return Settle();

            Stage.Style.Set("perspective", "300px");
            Card.Style.Set("transform", "translateZ(-100px)");
            yield return Settle();

            // 120 wide over a divisor of 4/3 is 90, so 45 either side.
            Assert.IsTrue(CardCovers(CentreX + 35, CentreY));
            Assert.IsFalse(CardCovers(CentreX + 55, CentreY), "the far card has pulled in past 55px");
        }

        /// <summary>
        /// The projection converges on wherever <c>perspective-origin</c> stands the viewer, so
        /// moving it to the left edge drags everything the projection magnifies away from it.
        /// </summary>
        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator PerspectiveOriginMovesTheVanishingPoint()
        {
            yield return Settle();

            Stage.Style.Set("perspective", "300px");
            Card.Style.Set("transform", "translateZ(100px)");
            yield return Settle();

            Assert.IsTrue(CardCovers(CentreX - 80, CentreY), "centred, the card reaches both ways");
            Assert.IsTrue(CardCovers(CentreX + 80, CentreY));

            // Standing the viewer over the stage's left edge pushes the magnified card right by
            // half the 120 that separates them, so it spans -30 to +150 instead of -90 to +90.
            Stage.Style.Set("perspective-origin", "0% 50%");
            yield return Settle();

            Assert.IsFalse(CardCovers(CentreX - 80, CentreY), "and off-centre it has left the left");
            Assert.IsTrue(CardCovers(CentreX + 80, CentreY));
            Assert.IsTrue(CardCovers(CentreX + 130, CentreY), "for the right");
        }

        /// <summary>
        /// The one thing an orthographic capture can never show: a rotation whose near edge draws
        /// taller than its far one.
        /// </summary>
        /// <remarks>
        /// A `rotateY` sends the right edge away and brings the left edge nearer, so the card comes
        /// out a trapezoid. Both points below are the same distance above the centre and the same
        /// distance either side of it -- flat, either both would be covered or neither would.
        /// </remarks>
        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ARotationProjectsToATrapezoid()
        {
            yield return Settle();

            Card.Style.Set("transform", "rotateY(50deg)");
            yield return Settle();
            Assert.IsFalse(CardCovers(CentreX - 40, CentreY - 65), "flat, the card is only 60 tall");

            Stage.Style.Set("perspective", "300px");
            yield return Settle();

            Assert.IsTrue(CardCovers(CentreX - 40, CentreY - 65), "the near edge has grown past 60");
            Assert.IsFalse(CardCovers(CentreX + 40, CentreY - 65), "while the far edge has not");
        }

        /// <summary>
        /// A viewer further away than the offscreen surfaces are parked apart is still a viewer, and
        /// a very weak projection is still one.
        /// </summary>
        /// <remarks>
        /// The camera stands its own distance back, which is well past the neighbouring slot, but it
        /// only ever draws the band between its clip planes -- and that band is tight around the
        /// element's plane however far back it is standing.
        /// </remarks>
        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator AVeryDistantViewerStillDrawsTheSubtree()
        {
            yield return Settle();

            Stage.Style.Set("perspective", "20000px");
            Card.Style.Set("transform", "rotateY(40deg)");
            yield return Settle();

            // 120 across a 40 degree turn is 92, so 46 either side -- and at this distance the
            // projection moves that by well under a pixel.
            Assert.IsTrue(CardCovers(CentreX + 40, CentreY), "still drawn");
            Assert.IsFalse(CardCovers(CentreX + 55, CentreY), "and still foreshortened");
        }

        /// <summary>
        /// A pointer has to land where the projection *drew* the element, not where its flat
        /// geometry says it is -- which is the whole difference between the two.
        /// </summary>
        /// <remarks>
        /// The point picked is 80px out from the centre. The card is 120 wide, so flat it stops at
        /// 60 and the point misses; magnified half again by the projection it stops at 90, and the
        /// same point is well inside it.
        /// </remarks>
        [UGUITest(Script = BaseScript, Style = BaseStyle + @"
            #card { pointer-events: auto; }
        ")]
        public IEnumerator APointerLandsWhereTheProjectionDrewIt()
        {
            yield return Settle();

            Card.Style.Set("transform", "translateZ(100px)");
            yield return Settle();

            var ownEventSystem = !EventSystem.current;
            var es = EventSystem.current ?? new GameObject("[PerspectiveTestEventSystem]").AddComponent<EventSystem>();
            var results = new List<RaycastResult>();

            var centre = RectTransformUtility.WorldToScreenPoint(
                CanvasCmp.worldCamera, Stage.RectTransform.TransformPoint(Stage.RectTransform.rect.center));
            var point = centre + new Vector2(80, 0);

            RaycastResult Top()
            {
                results.Clear();
                es.RaycastAll(new PointerEventData(es) { position = point }, results);
                return results.Count > 0 ? results[0] : default;
            }

            var before = Top();
            Assert.IsFalse(before.gameObject && before.gameObject.transform.IsChildOf(Card.RectTransform),
                "flat, the card stops well short of this point");

            Stage.Style.Set("perspective", "300px");
            for (int i = 0; i < 4; i++) yield return null;

            var after = Top();
            Debug.Log($"[perspective raycast] before={before.gameObject?.name} after={after.gameObject?.name}/{after.module?.GetType().Name}");

            Assert.IsInstanceOf<FilterRaycaster>(after.module, "the hit has to arrive through the projected composite");
            Assert.IsTrue(after.gameObject && after.gameObject.transform.IsChildOf(Card.RectTransform),
                $"expected the card, hit {after.gameObject?.name}");

            if (ownEventSystem) Object.DestroyImmediate(es.gameObject);
        }

        /// <summary>
        /// And the capture has to reach wherever the projection sends a child, which is past the
        /// element's own box as soon as the two are the same size.
        /// </summary>
        [UGUITest(Script = BaseScript, Style = @"
            #stage {
                width: 120px;
                height: 120px;
                margin: 60px;
            }
            #card {
                width: 120px;
                height: 120px;
                background-color: red;
            }
        ")]
        public IEnumerator AProjectionLeaningOutOfItsBoxIsNotClipped()
        {
            yield return Settle();

            Stage.Style.Set("perspective", "300px");
            Card.Style.Set("transform", "rotateY(50deg)");
            yield return Settle();

            // The stage's box stops 60 above its centre and the near edge of the card reaches 70.
            Assert.IsTrue(CardCovers(CentreX - 40, CentreY - 65), "the lean survives the box");
        }
    }
}
