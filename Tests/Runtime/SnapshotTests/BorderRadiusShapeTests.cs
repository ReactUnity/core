using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using UnityEngine;

namespace ReactUnity.Tests
{
#if !UNITY_EDITOR
    [Ignore("Border radius shape tests read the framebuffer and are only supported in editor")]
#endif
    [TestFixture(JavascriptEngineType.Auto, Category = "Visual")]
    public class BorderRadiusShapeTests : TestBase
    {
        const string BarScript = @"
            function App() {
                return <view id='test' />;
            }
";

        // A wide, short bar -- the shape a meter or a progress track is, and the one a radius of
        // half its height turns into a pill.
        const string TallStyle = @"
            #test {
                position: absolute;
                left: 0;
                top: 0;
                width: 200px;
                height: 40px;
                background-color: red;
            }
        ";

        // The bar the report was made on, where the radius is a few pixels and the arc has very
        // little room to be wrong in. 5px is exactly half of it.
        const string ThinStyle = @"
            #test {
                position: absolute;
                left: 0;
                top: 0;
                width: 200px;
                height: 10px;
                background-color: red;
            }
        ";

        const int Width = 200;

        private UGUIComponent View => Q("#test");

        public BorderRadiusShapeTests(JavascriptEngineType engineType) : base(engineType) { }

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

        static bool IsRed(Color c) => c.r > 0.5f && c.g < 0.4f && c.b < 0.4f;

        /// <summary>How many rows of a bar that tall are painted in each of its columns.</summary>
        static int[] Profile(int height)
        {
            var tex = Capture();
            var heights = new int[Width];

            for (int x = 0; x < Width; x++)
                for (int y = 0; y < height; y++)
                    if (IsRed(tex.GetPixel(x, Screen.height - 1 - y))) heights[x]++;

            Object.DestroyImmediate(tex);
            return heights;
        }

        /// <summary>
        /// The column heights a bar with these corner radii has, from the geometry alone -- the
        /// four quarter-ellipses eat into it from each end and nothing else does.
        /// </summary>
        static float[] Stadium(float rx, float ry, int height)
        {
            rx = Mathf.Min(rx, Width * 0.5f);
            ry = Mathf.Min(ry, height * 0.5f);

            var expected = new float[Width];

            for (int x = 0; x < Width; x++)
            {
                var into = Mathf.Min(x + 0.5f, Width - (x + 0.5f));
                var t = rx <= 0 ? 1 : (rx - into) / rx;
                var dy = into >= rx ? 0 : ry * (1 - Mathf.Sqrt(Mathf.Max(0, 1 - t * t)));
                expected[x] = height - 2 * dy;
            }

            return expected;
        }

        /// <summary>
        /// How far the painted shape is from the one the radius describes, in rows. A radius that
        /// was not reduced, reduced per corner, or taken through the reduction as a NaN all leave
        /// a shape this does not fit -- an empty box most of all.
        /// </summary>
        static void AssertStadium(string label, float rx, float ry, int height, float tolerance = 1.5f)
        {
            var actual = Profile(height);
            var expected = Stadium(rx, ry, height);

            var worst = 0f;
            var worstAt = 0;
            var sum = 0f;

            for (int x = 0; x < Width; x++)
            {
                var d = Mathf.Abs(actual[x] - expected[x]);
                sum += d;
                if (d > worst) { worst = d; worstAt = x; }
            }

            Debug.Log($"[radius {label} on {height}px] worst {worst:F2} rows at column {worstAt}, mean {sum / Width:F2}; " +
                $"ends {actual[0]}/{actual[Width - 1]}, middle {actual[Width / 2]}");

            Assert.Less(worst, tolerance, $"{label}: the painted shape is not the stadium that radius describes");
        }

        [UGUITest(Script = BarScript, Style = TallStyle)]
        public IEnumerator ARadiusPaintsItsStadium(
            [Values("6px", "18px", "20px", "50%", "200px", "calc(infinity * 1px)")] string radius)
        {
            View.Style["borderRadius"] = radius;
            yield return null;
            yield return null;
            yield return null;

            // A percentage is of the box on its own axis, so `50%` is an ellipse rather than a
            // pill. Anything at or over half the height is the pill, which is 20 on a bar this tall.
            if (radius == "50%") { AssertStadium(radius, 100, 20, 40); yield break; }

            var asked = radius == "6px" ? 6f : radius == "18px" ? 18f : 20f;
            AssertStadium(radius, asked, asked, 40);
        }

        [UGUITest(Script = BarScript, Style = ThinStyle)]
        public IEnumerator AThinBarPaintsItsStadiumToo(
            [Values("3px", "4px", "4.5px", "5px", "calc(infinity * 1px)")] string radius)
        {
            View.Style["borderRadius"] = radius;
            yield return null;
            yield return null;
            yield return null;

            var asked = radius == "3px" ? 3f : radius == "4px" ? 4f : radius == "4.5px" ? 4.5f : 5f;
            AssertStadium(radius, asked, asked, 10);
        }

        // What a meter is actually made of: a track that clips its fill, with the inset shadows
        // that give it depth. Each of those takes its own copy of the rounding.
        [UGUITest(Script = BarScript, Style = ThinStyle)]
        public IEnumerator AClippedBarWithInsetShadowsKeepsTheSameShape(
            [Values("3px", "4.5px", "5px", "calc(infinity * 1px)")] string radius)
        {
            View.Style["overflow"] = "hidden";
            View.Style["boxShadow"] = "inset 0 1px 2px rgba(0,0,0,0.6), inset 0 -1px 1px rgba(0,0,0,0.4)";
            View.Style["borderRadius"] = radius;
            yield return null;
            yield return null;
            yield return null;

            // The shadows darken the top and bottom rows past the red test, so only the outline is
            // worth asserting on -- which is the part the report was about.
            var asked = radius == "3px" ? 3f : radius == "4.5px" ? 4.5f : 5f;
            AssertStadium($"{radius} clipped", asked, asked, 10, 3.5f);
        }
    }
}
