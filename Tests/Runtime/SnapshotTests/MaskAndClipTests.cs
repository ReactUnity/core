using System.Collections;
using System.Text;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.Types;
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

        static Texture2D Capture()
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

            rt.Release();
            Object.DestroyImmediate(rt);
            return tex;
        }

        static Color SampleAt(int x, int fromTop)
        {
            var tex = Capture();

            // The React canvas puts the element in the top-left, so coordinates are given from the
            // top-left and flipped into the framebuffer's bottom-up space here.
            var c = tex.GetPixel(x, Screen.height - fromTop);

            Object.DestroyImmediate(tex);
            return c;
        }

        static string Describe(Color c) => $"rgba({c.r:F2},{c.g:F2},{c.b:F2},{c.a:F2})";

        /// <summary>
        /// How much of the red element survived at a point. The page behind it is a light grey, so
        /// red's own channel is nearly the same either way -- it is the *absence* of green that says
        /// the element is there.
        /// </summary>
        static float Coverage(Color c) => 1f - c.g;

        /// <summary>
        /// Coverage across a horizontal run of pixels, from one capture. Scanning an edge rather
        /// than probing one pixel of it is what keeps a test off the exact place the edge fell,
        /// which is a device pixel nobody should have to predict.
        /// </summary>
        static float[] CoverageRow(int fromLeft, int count, int fromTop)
        {
            var tex = Capture();

            var row = new float[count];
            for (int i = 0; i < count; i++) row[i] = Coverage(tex.GetPixel(fromLeft + i, Screen.height - fromTop));

            Object.DestroyImmediate(tex);
            return row;
        }

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

        /// <summary>
        /// The same rectangle through both transports. Four points are a couple of uniforms the
        /// fragment shader evaluates directly; enough vertices to overflow the uniform ring are
        /// rasterized to a coverage mask instead, whose scale and offset come from the capture's own
        /// region -- so a mistake there misplaces the edge without ever losing the shape. Probing
        /// across the edge is what sees that; probing the middle and a corner is not.
        /// </summary>
        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator TheTwoClipTransportsPutTheEdgeInTheSamePlace()
        {
            View.Style["clip-path"] = "inset(0 50% 0 0)";
            yield return null;
            yield return null;
            yield return null;

            var analyticKept = Coverage(SampleAt(94, 100));
            var analyticCut = Coverage(SampleAt(106, 100));

            // The left half again, walked in 20px steps so its ring is 22 points rather than four.
            var points = new StringBuilder("0 0");
            for (int y = 0; y <= 200; y += 20) points.Append(", 100px ").Append(y).Append("px");
            for (int y = 200; y > 0; y -= 20) points.Append(", 0 ").Append(y).Append("px");

            View.Style["clip-path"] = "polygon(" + points + ")";
            yield return null;
            yield return null;
            yield return null;
            yield return null;

            var ring = View.ComputedStyle.clipPath.Resolve(new Vector2(200, 200)).Ring;
            Assert.Greater(ring.Length - 1, ClipPath.MaxUniformPoints,
                "the polygon has to be past the uniform ring, or this test is not about the mask at all");

            var maskKept = Coverage(SampleAt(94, 100));
            var maskCut = Coverage(SampleAt(106, 100));

            Debug.Log($"[CLIP transports] analytic kept={analyticKept:F2} cut={analyticCut:F2} mask kept={maskKept:F2} cut={maskCut:F2}");

            Assert.Greater(analyticKept, 0.7f, "the analytic rectangle keeps its own half");
            Assert.Less(analyticCut, 0.2f, "and cuts the other one");
            Assert.AreEqual(analyticKept, maskKept, 0.15f, "the mask should keep what the uniforms kept, 6px inside the edge");
            Assert.AreEqual(analyticCut, maskCut, 0.15f, "and cut what they cut, 6px outside it");
        }

        /// <summary>
        /// A rasterized edge has to arrive filtered as well as aligned. The mask is built with
        /// subsamples and exact span ends and sampled bilinearly, so the pixels an edge runs through
        /// come out part covered; nearest sampling, or a rasterizer that rounded each span to whole
        /// texels, would make the same edge a staircase of nothing and everything.
        /// </summary>
        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ARasterizedEdgeIsAntialiasedRatherThanStepped()
        {
            // A 1-in-10 slope from (0, 100) to (200, 120), keeping everything below it, in steps so
            // it goes through the mask. A shallow edge is deliberate: it leaves ten pixels of a row
            // partly covered rather than one, so the scan below cannot miss the transition by
            // landing a pixel to either side of it.
            var points = new StringBuilder("0 100px");
            for (int x = 10; x <= 200; x += 10) points.Append(", ").Append(x).Append("px ").Append(100 + x / 10).Append("px");
            points.Append(", 200px 200px, 0 200px");

            View.Style["clip-path"] = "polygon(" + points + ")";
            yield return null;
            yield return null;
            yield return null;
            yield return null;

            var ring = View.ComputedStyle.clipPath.Resolve(new Vector2(200, 200)).Ring;
            Assert.Greater(ring.Length - 1, ClipPath.MaxUniformPoints, "this edge has to be rasterized for the test to be about the mask");

            // The slope crosses this row inside the scan, so the run starts kept and ends cut.
            var row = CoverageRow(80, 45, 110);

            float min = 1f, max = 0f;
            var partial = 0;
            foreach (var v in row)
            {
                min = Mathf.Min(min, v);
                max = Mathf.Max(max, v);
                if (v > 0.25f && v < 0.75f) partial++;
            }

            Debug.Log($"[CLIP antialiasing] min={min:F2} max={max:F2} partial={partial} of {row.Length}");

            Assert.Greater(max, 0.7f, "the scan should start on the kept side of the edge");
            Assert.Less(min, 0.2f, "and end on the cut side");
            Assert.GreaterOrEqual(partial, 2, "with the pixels the edge runs through neither, which is what an antialiased edge means");
        }

        /// <summary>
        /// Two subpaths, one inside the other, under each fill rule. Both are wound the same way, so
        /// nonzero fills the middle twice over where even-odd cancels it to a hole -- and the rule is
        /// the only thing that differs between the two runs. Several contours never fit the uniform
        /// ring, so this is the fill rule as the rasterizer applies it.
        /// </summary>
        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator AnEvenOddPathMakesAHoleWhereNonzeroDoesNot()
        {
            const string Data = "'M 0 0 L 200 0 L 200 200 L 0 200 Z M 60 60 L 140 60 L 140 140 L 60 140 Z'";

            View.Style["clip-path"] = "path(nonzero, " + Data + ")";
            yield return null;
            yield return null;
            yield return null;
            yield return null;

            var nonzeroMiddle = Coverage(SampleAt(100, 100));

            View.Style["clip-path"] = "path(evenodd, " + Data + ")";
            yield return null;
            yield return null;
            yield return null;
            yield return null;

            var evenOddMiddle = Coverage(SampleAt(100, 100));
            var evenOddBand = Coverage(SampleAt(20, 100));

            Debug.Log($"[CLIP fill rule] nonzero middle={nonzeroMiddle:F2} evenodd middle={evenOddMiddle:F2} band={evenOddBand:F2}");

            Assert.Greater(nonzeroMiddle, 0.7f, "wound the same way, the inner square adds to the outer one");
            Assert.Less(evenOddMiddle, 0.2f, "and under even-odd the same two squares leave a hole");
            Assert.Greater(evenOddBand, 0.7f, "the band between them is kept either way");
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
