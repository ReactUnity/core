using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using UnityEngine;

namespace ReactUnity.Tests
{
#if !UNITY_EDITOR
    [Ignore("These read the framebuffer and are only supported in editor")]
#endif
    [TestFixture(JavascriptEngineType.Auto, Category = "Filter")]
    public class MaskAndClipTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                return <view id='test'></view>;
            }
";

        const string BaseStyle = @"
            #test {
                background-color: red;
                width: 200px;
                height: 200px;
            }
        ";

        private UGUIComponent View => Q("#test");

        public MaskAndClipTests(JavascriptEngineType engineType) : base(engineType) { }

        static Color SampleAt(int x, int fromTop)
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

            // The React canvas puts the element in the top-left, so coordinates are given from the
            // top-left and flipped into the framebuffer's bottom-up space here.
            var c = tex.GetPixel(x, Screen.height - fromTop);

            Object.DestroyImmediate(tex);
            rt.Release();
            Object.DestroyImmediate(rt);
            return c;
        }

        static string Describe(Color c) => $"rgba({c.r:F2},{c.g:F2},{c.b:F2},{c.a:F2})";

        /// <summary>
        /// How much of the red element survived at a point. The page behind it is a light grey, so
        /// red's own channel is nearly the same either way -- it is the *absence* of green that says
        /// the element is there.
        /// </summary>
        static float Coverage(Color c) => 1f - c.g;

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator AGradientMaskFadesInsteadOfCuttingOff()
        {
            View.Style["mask-image"] = "linear-gradient(to right, black, transparent)";
            yield return null;
            yield return null;
            yield return null;
            yield return null;

            Assert.NotNull(View.ElementFilter, "a mask should have created the offscreen composite");

            var left = SampleAt(10, 100);
            var middle = SampleAt(100, 100);
            var right = SampleAt(190, 100);

            Debug.Log($"[MASK gradient] left={Describe(left)} middle={Describe(middle)} right={Describe(right)}");

            Assert.Greater(Coverage(left), 0.7f, "the black end of the mask should keep the element");
            Assert.Less(Coverage(right), 0.2f, "the transparent end should hide it");

            // The point of the whole exercise: a stencil could only give one of the two ends, and
            // the middle is what proves the coverage is a real gradient rather than a threshold.
            Assert.Greater(Coverage(middle), Coverage(right) + 0.15f, "the middle should be more visible than the far end");
            Assert.Less(Coverage(middle), Coverage(left) - 0.15f, "and less visible than the near end");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator AnOpaqueMaskChangesNothingAndAHalfOneHalvesIt()
        {
            View.Style["mask-image"] = "linear-gradient(black, black)";
            yield return null;
            yield return null;
            yield return null;
            yield return null;

            var opaque = SampleAt(100, 100);
            Debug.Log($"[MASK opaque] {Describe(opaque)}");
            Assert.Greater(Coverage(opaque), 0.98f, "a fully opaque mask should keep the element whole");

            View.Style["mask-image"] = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))";
            yield return null;
            yield return null;
            yield return null;

            var half = SampleAt(100, 100);
            Debug.Log($"[MASK half] {Describe(half)}");
            Assert.AreEqual(0.5f, half.a, 0.05f, "a half-transparent mask should leave half the element");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ASpriteMaskKeepsItsOwnAlpha()
        {
            // The test star is drawn at 50% alpha throughout. A stencil had no way to say that: the
            // whole silhouette came through opaque.
            View.Style["mask"] = "url(res:ReactUnity/tests/sprites/star) no-repeat center / cover";
            yield return null;
            yield return null;
            yield return null;
            yield return null;

            var c = SampleAt(100, 100);
            Debug.Log($"[MASK sprite] {Describe(c)}");
            Assert.AreEqual(0.5f, c.a, 0.05f, "the mask's own alpha should be the coverage");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator DroppingTheMaskGivesTheElementBack()
        {
            View.Style["mask-image"] = "linear-gradient(to right, black, transparent)";
            yield return null;
            yield return null;
            yield return null;

            Assert.Less(Coverage(SampleAt(190, 100)), 0.2f);

            View.Style["mask-image"] = null;
            yield return null;
            yield return null;
            yield return null;

            var c = SampleAt(190, 100);
            Debug.Log($"[MASK removed] {Describe(c)}");
            Assert.Greater(Coverage(c), 0.7f, "removing the mask should restore the element");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator AnInsetClipCutsTheHalfItNames()
        {
            View.Style["clip-path"] = "inset(0 50% 0 0)";
            yield return null;
            yield return null;
            yield return null;

            Assert.NotNull(View.ElementFilter, "a clip should have created the offscreen composite");

            var kept = SampleAt(40, 100);
            var cut = SampleAt(160, 100);
            Debug.Log($"[CLIP inset] kept={Describe(kept)} cut={Describe(cut)}");

            Assert.Greater(Coverage(kept), 0.7f, "the left half should survive");
            Assert.Less(Coverage(cut), 0.2f, "the right half is inset away");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ACircleClipKeepsTheMiddleAndDropsTheCorners()
        {
            View.Style["clip-path"] = "circle(50%)";
            yield return null;
            yield return null;
            yield return null;

            var centre = SampleAt(100, 100);
            var corner = SampleAt(6, 6);
            Debug.Log($"[CLIP circle] centre={Describe(centre)} corner={Describe(corner)}");

            Assert.Greater(Coverage(centre), 0.7f, "the middle of the circle should survive");
            Assert.Less(Coverage(corner), 0.2f, "a corner is outside a circle inscribed in the box");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator APolygonClipCutsAlongItsEdges()
        {
            // A triangle with its apex at the top centre: the top corners are outside it.
            View.Style["clip-path"] = "polygon(50% 0%, 100% 100%, 0% 100%)";
            yield return null;
            yield return null;
            yield return null;

            var inside = SampleAt(100, 180);
            var corner = SampleAt(6, 6);
            Debug.Log($"[CLIP polygon] inside={Describe(inside)} corner={Describe(corner)}");

            Assert.Greater(Coverage(inside), 0.7f, "the base of the triangle should survive");
            Assert.Less(Coverage(corner), 0.2f, "a top corner is outside it");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator APathClipRasterizesItsCurves()
        {
            // A circle drawn as two arcs. Flattened it is far past the ring the shader can hold in
            // uniforms, so this is the coverage-mask transport rather than the per-fragment walk --
            // the one clip shape that reaches the composite as a texture.
            View.Style["clip-path"] = "path('M 100 0 A 100 100 0 1 1 100 200 A 100 100 0 1 1 100 0 Z')";
            yield return null;
            yield return null;
            yield return null;
            yield return null;

            Assert.NotNull(View.ElementFilter, "a clip should have created the offscreen composite");

            var centre = SampleAt(100, 100);
            var corner = SampleAt(6, 6);
            Debug.Log($"[CLIP path] centre={Describe(centre)} corner={Describe(corner)}");

            Assert.Greater(Coverage(centre), 0.7f, "the middle of the circle should survive");
            Assert.Less(Coverage(corner), 0.2f, "a corner is outside a circle inscribed in the box");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator AShapeClipCutsWhereItsCommandsSay()
        {
            // The same triangle APolygonClipCutsAlongItsEdges draws, in the other grammar.
            View.Style["clip-path"] = "shape(from 50% 0, line to 100% 100%, line to 0 100%, close)";
            yield return null;
            yield return null;
            yield return null;

            var inside = SampleAt(100, 180);
            var corner = SampleAt(6, 6);
            Debug.Log($"[CLIP shape] inside={Describe(inside)} corner={Describe(corner)}");

            Assert.Greater(Coverage(inside), 0.7f, "the base of the triangle should survive");
            Assert.Less(Coverage(corner), 0.2f, "a top corner is outside it");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator AContentBoxClipCutsAtThePadding()
        {
            // Border-box sizing keeps the element 200x200 whatever the padding, so the content box
            // is the middle 100x100 and the clip is the padding frame coming off.
            View.Style["boxSizing"] = "border-box";
            View.Style["padding"] = "50px";
            View.Style["clip-path"] = "content-box";
            yield return null;
            yield return null;
            yield return null;
            yield return null;

            var centre = SampleAt(100, 100);
            var padding = SampleAt(20, 100);
            Debug.Log($"[CLIP content-box] centre={Describe(centre)} padding={Describe(padding)}");

            Assert.Greater(Coverage(centre), 0.7f, "the content box should survive");
            Assert.Less(Coverage(padding), 0.2f, "and the padding around it should not");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ClippingAndMaskingComposeRatherThanReplaceEachOther()
        {
            View.Style["clip-path"] = "inset(0 50% 0 0)";
            View.Style["mask-image"] = "linear-gradient(to bottom, black, transparent)";
            yield return null;
            yield return null;
            yield return null;
            yield return null;

            var top = SampleAt(40, 10);
            var bottom = SampleAt(40, 190);
            var clipped = SampleAt(160, 10);

            Debug.Log($"[CLIP+MASK] top={Describe(top)} bottom={Describe(bottom)} clipped={Describe(clipped)}");

            Assert.Greater(Coverage(top), 0.7f, "the kept half's masked-in end should be visible");
            Assert.Less(Coverage(bottom), 0.2f, "the same half's masked-out end should not");
            Assert.Less(Coverage(clipped), 0.2f, "and the clipped half should be gone whatever the mask says");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator NeitherOneLeavesTheCompositeBehind()
        {
            View.Style["clip-path"] = "circle(40%)";
            yield return null;
            yield return null;

            Assert.NotNull(View.ElementFilter);

            View.Style["clip-path"] = "none";
            yield return null;
            yield return null;

            Assert.IsNull(View.ElementFilter, "nothing left needs the offscreen pass");

            var c = SampleAt(6, 6);
            Debug.Log($"[CLIP none] corner={Describe(c)}");
            Assert.Greater(Coverage(c), 0.7f, "and the element draws in place again");
        }
    }
}
