using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using UnityEngine;

namespace ReactUnity.Tests
{
#if !UNITY_EDITOR
    [Ignore("Background clip tests read the framebuffer and are only supported in editor")]
#endif
    [TestFixture(JavascriptEngineType.Auto, Category = "Filter")]
    public class BackgroundClipTests : TestBase
    {
        // A block of solid glyphs at a size where a stroke is several pixels wide, so counting the
        // pixels the background survived on is a stable measure of what it was clipped to.
        const string BaseScript = @"
            function App() {
                return <view id='test'>MMMM</view>;
            }
";

        const string BaseStyle = @"
            #test {
                position: absolute;
                left: 0;
                top: 0;
                width: 200px;
                height: 100px;
                font-size: 64px;
                color: transparent;
                background-color: red;
            }
        ";

        private UGUIComponent View => Q("#test");

        public BackgroundClipTests(JavascriptEngineType engineType) : base(engineType) { }

        /// <summary>How much of a 200x100 box at the origin the background is still painting on.</summary>
        static float RedCoverage()
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

            var hits = 0;
            var total = 0;

            for (int x = 0; x < 200; x++)
            {
                for (int y = 0; y < 100; y++)
                {
                    total++;
                    var c = tex.GetPixel(x, Screen.height - 1 - y);
                    if (c.r > 0.5f && c.g < 0.4f && c.b < 0.4f) hits++;
                }
            }

            Object.DestroyImmediate(tex);
            rt.Release();
            Object.DestroyImmediate(rt);
            return total == 0 ? 0 : (float) hits / total;
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator WithoutTheClipTheWholeBoxIsPainted()
        {
            yield return null;
            yield return null;
            yield return null;

            var coverage = RedCoverage();
            Debug.Log($"[clip none] coverage {coverage:P1}");
            Assert.Greater(coverage, 0.95f, "an unclipped background colour fills its box");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator TextClipsTheBackgroundToTheGlyphs()
        {
            View.Style["backgroundClip"] = "text";
            yield return null;
            yield return null;
            yield return null;

            var coverage = RedCoverage();
            Debug.Log($"[clip text] coverage {coverage:P1}");

            Assert.Greater(coverage, 0.05f, "the glyphs should still be painted");
            Assert.Less(coverage, 0.4f, "everything between and around the glyphs should be gone");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator NoTextLeavesNothingToPaint()
        {
            View.Style["backgroundClip"] = "text";
            View.Children[0].Remove();
            yield return null;
            yield return null;
            yield return null;

            var coverage = RedCoverage();
            Debug.Log($"[clip text, no text] coverage {coverage:P1}");
            Assert.Less(coverage, 0.01f, "with no glyphs there is nothing for the background to survive on");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator AnImageLayerIsClippedTheSameWay()
        {
            View.Style["backgroundColor"] = "transparent";
            View.Style["backgroundImage"] = "linear-gradient(red, red)";
            View.Style["backgroundClip"] = "text";
            yield return null;
            yield return null;
            yield return null;

            var coverage = RedCoverage();
            Debug.Log($"[clip text, gradient] coverage {coverage:P1}");

            Assert.Greater(coverage, 0.05f, "the gradient should still be painted on the glyphs");
            Assert.Less(coverage, 0.4f, "and nowhere else");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator EachLayerTakesItsOwnClip()
        {
            // The top layer is cut to the glyphs and the one under it is not, so the box stays
            // filled -- with green where the clipped layer did not survive.
            View.Style["backgroundColor"] = "transparent";
            View.Style["backgroundImage"] = "linear-gradient(red, red), linear-gradient(lime, lime)";
            View.Style["backgroundClip"] = "text, border-box";
            yield return null;
            yield return null;
            yield return null;

            var coverage = RedCoverage();
            Debug.Log($"[clip per layer] red coverage {coverage:P1}");

            Assert.Greater(coverage, 0.05f, "the clipped layer should still be painted on the glyphs");
            Assert.Less(coverage, 0.4f, "and nowhere else");
        }

        // The same glyphs twice, one painted as text and one as a background clipped to text. If the
        // coverage were flipped, offset or resampled off its own pixels, these would not line up.
        const string PairScript = @"
            function App() {
                return <>
                    <view id='plain'>Wg</view>
                    <view id='clipped'>Wg</view>
                </>;
            }
";

        const string PairStyle = @"
            #plain, #clipped {
                position: absolute;
                left: 0;
                width: 200px;
                height: 100px;
                font-size: 64px;
            }
            #plain { top: 0; color: red; }
            #clipped {
                top: 100px;
                color: transparent;
                background-color: red;
                background-clip: text;
            }
        ";

        [UGUITest(Script = PairScript, Style = PairStyle)]
        public IEnumerator TheClippedBackgroundLandsOnTheSamePixelsAsTheText()
        {
            yield return null;
            yield return null;
            yield return null;

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

            var painted = 0;
            var off = 0;
            var worst = 0f;
            var sum = 0f;

            for (int x = 0; x < 200; x++)
            {
                for (int y = 0; y < 100; y++)
                {
                    var a = tex.GetPixel(x, Screen.height - 1 - y);
                    var b = tex.GetPixel(x, Screen.height - 1 - (y + 100));
                    var d = Mathf.Abs(a.g - b.g);

                    sum += d;
                    if (d > worst) worst = d;
                    // The page behind both is light grey, so a red channel says nothing on its own.
                    if (a.g < 0.4f || b.g < 0.4f) painted++;
                    if (d > 0.2f) off++;
                }
            }

            Object.DestroyImmediate(tex);
            rt.Release();
            Object.DestroyImmediate(rt);

            Debug.Log($"[clip vs text] painted {painted}px, {off}px off by more than 0.2, worst {worst:F3}, mean {sum / 20000:F4}");

            Assert.Greater(painted, 500, "the fixture should have drawn some glyphs at all");
            Assert.Less(off / 20000f, 0.01f, "the clipped background should land where the text does");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator TheCoverageIsOnlyRedrawnWhenTheGlyphsChange()
        {
            View.Style["backgroundClip"] = "text";
            yield return null;
            yield return null;
            yield return null;

            var clip = View.GameObject.GetComponent<UGUI.Internal.BackgroundTextClip>();
            Assert.NotNull(clip, "asking for the clip should have built one");

            var idle = clip.RenderCount;
            yield return null;
            yield return null;
            Assert.AreEqual(idle, clip.RenderCount, "text that is sitting still should not be rasterised again");

            (View.Children[0] as UGUI.TextComponent).SetText("WW");
            yield return null;
            yield return null;
            Assert.Greater(clip.RenderCount, idle, "changing the text should redraw the coverage");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator GoingBackToABoxPaintsTheWholeBoxAgain()
        {
            View.Style["backgroundClip"] = "text";
            yield return null;
            yield return null;
            yield return null;

            Assert.Less(RedCoverage(), 0.4f);

            View.Style["backgroundClip"] = "border-box";
            yield return null;
            yield return null;
            yield return null;

            var coverage = RedCoverage();
            Debug.Log($"[clip back to border-box] coverage {coverage:P1}");
            Assert.Greater(coverage, 0.95f, "dropping the clip should put the whole background back");
        }
    }
}
