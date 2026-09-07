using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using UnityEngine;

namespace ReactUnity.Tests
{
#if !UNITY_EDITOR
    [Ignore("Filter tests read the framebuffer and are only supported in editor")]
#endif
    [TestFixture(JavascriptEngineType.Auto, Category = "Filter")]
    public class FilterTests : TestBase
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

        public FilterTests(JavascriptEngineType engineType) : base(engineType) { }

        static Color SampleCentre() => SampleAt(100, 100);

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

            // The React canvas puts the element in the top-left, so coordinates are given from
            // the top-left and flipped into the framebuffer's bottom-up space here.
            var c = tex.GetPixel(x, Screen.height - fromTop);

            Object.DestroyImmediate(tex);
            rt.Release();
            Object.DestroyImmediate(rt);
            return c;
        }

        static string Describe(Color c) => $"rgba({c.r:F2},{c.g:F2},{c.b:F2},{c.a:F2})";

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator NoFilterRendersRed()
        {
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[FILTER none] {Describe(c)}");
            Assert.Greater(c.r, 0.5f, "unfiltered element should be red");
            Assert.Less(c.g, 0.5f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator InvertProducesCyan()
        {
            View.Style["filter"] = "invert(1)";
            yield return null;
            yield return null;
            yield return null;

            Assert.NotNull(View.ElementFilter, "an ElementFilter should have been created");

            var c = SampleCentre();
            Debug.Log($"[FILTER invert(1)] {Describe(c)}");
            Assert.Less(c.r, 0.3f, "inverted red should have little red");
            Assert.Greater(c.g, 0.7f, "inverted red should be green-heavy");
            Assert.Greater(c.b, 0.7f, "inverted red should be blue-heavy");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator GrayscaleProducesGray()
        {
            View.Style["filter"] = "grayscale(1)";
            yield return null;
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[FILTER grayscale(1)] {Describe(c)}");
            // Rec.601 luma of pure red is 0.299.
            Assert.AreEqual(c.r, c.g, 0.05f, "grayscale should equalise channels");
            Assert.AreEqual(c.g, c.b, 0.05f, "grayscale should equalise channels");
            Assert.AreEqual(0.299f, c.r, 0.08f, "grayscale of red should land near its luma");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator AllDefaultFilterCreatesNoRenderTarget()
        {
            // Every function at its identity value. FilterDefinition overrides Equals but not
            // operator ==, so this is the case a reference comparison would get wrong.
            View.Style["filter"] = "brightness(1) saturate(1) opacity(1)";
            yield return null;
            yield return null;

            Assert.IsNull(View.ElementFilter, "an all-identity filter should not allocate anything");

            var c = SampleCentre();
            Debug.Log($"[FILTER identity] {Describe(c)}");
            Assert.Greater(c.r, 0.5f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator BlurBleedsPastTheElementBox()
        {
            // The element spans x 0..200. Blur must soften the inside of the edge and spill past it.
            yield return null;
            yield return null;
            var outsideBefore = SampleAt(204, 100);
            var insideBefore = SampleAt(196, 100);

            View.Style["filter"] = "blur(8px)";
            yield return null;
            yield return null;
            yield return null;
            var outsideAfter = SampleAt(204, 100);
            var insideAfter = SampleAt(196, 100);
            var centre = SampleCentre();

            Debug.Log($"[FILTER blur(8px)] outside {Describe(outsideBefore)} -> {Describe(outsideAfter)}");
            Debug.Log($"[FILTER blur(8px)] inside  {Describe(insideBefore)} -> {Describe(insideAfter)}");
            Debug.Log($"[FILTER blur(8px)] centre  {Describe(centre)}");

            // Coverage, not colour: what is behind the element decides how much its rgb moves, but
            // alpha says how much of the element landed on a pixel either way.
            Assert.Greater(outsideAfter.a, outsideBefore.a + 0.05f, "blur should spill coverage past the element's box");
            Assert.Less(insideAfter.a, insideBefore.a - 0.05f, "blur should soften the inside of the edge");
            Assert.Less(outsideAfter.g, outsideBefore.g - 0.05f, "the spill should be red, darkening the light backdrop");
            Assert.Greater(centre.r, 0.9f, "a large flat region should keep its colour at the centre");
            Assert.Less(centre.g, 0.1f, "and should not be tinted by its own blur");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator FilterIsRemovedWhenUnset()
        {
            View.Style["filter"] = "invert(1)";
            yield return null;
            yield return null;
            Assert.NotNull(View.ElementFilter);

            View.Style["filter"] = null;
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[FILTER removed] {Describe(c)}");
            Assert.Greater(c.r, 0.5f, "element should be red again once the filter is gone");
            Assert.Less(c.g, 0.5f);
        }
    }
}
