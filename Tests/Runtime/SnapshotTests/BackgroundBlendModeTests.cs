using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using UnityEngine;

namespace ReactUnity.Tests
{
#if !UNITY_EDITOR
    [Ignore("Blend mode tests read the framebuffer and are only supported in editor")]
#endif
    [TestFixture(JavascriptEngineType.Auto, Category = "Filter")]
    public class BackgroundBlendModeTests : TestBase
    {
        // A two-stop gradient of one colour is a flat background image layer that needs no asset,
        // so every sample below is one blend function applied to two known values.
        const string BaseScript = @"
            function App() {
                return <>
                    <view id='under'></view>
                    <view id='test'></view>
                </>;
            }
";

        const string BaseStyle = @"
            #under, #test {
                position: absolute;
                left: 0;
                top: 0;
                width: 200px;
                height: 200px;
            }
            #under { background-color: black; }
            #test {
                background-color: #C0C0C0;
                background-image: linear-gradient(#404040, #404040);
            }
        ";

        private UGUIComponent View => Q("#test");

        public BackgroundBlendModeTests(JavascriptEngineType engineType) : base(engineType) { }

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

            var c = tex.GetPixel(x, Screen.height - fromTop);

            Object.DestroyImmediate(tex);
            rt.Release();
            Object.DestroyImmediate(rt);
            return c;
        }

        static string Describe(Color c) => $"rgba({c.r:F2},{c.g:F2},{c.b:F2},{c.a:F2})";

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator NormalCoversTheColor()
        {
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[BG normal] {Describe(c)}");
            Assert.AreEqual(0.251f, c.r, 0.03f, "without a blend mode the image just covers the colour");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ASingleBlendedLayerNeedsNoCapture()
        {
            View.Style["backgroundBlendMode"] = "multiply";
            yield return null;
            yield return null;
            yield return null;

            // Its backdrop is the background colour, which is a value rather than something that
            // has to be read back, so nothing about the element has to be rendered offscreen.
            Assert.IsNull(View.ElementFilter, "one blended layer should not allocate a render target");

            var c = SampleCentre();
            Debug.Log($"[BG multiply / colour] {Describe(c)}");
            Assert.AreEqual(0.189f, c.r, 0.03f, "0xC0 multiplied by 0x40");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator TheBackgroundColorIsStillPaintedUnderneath()
        {
            // It used to be cleared the moment a blend mode was set, because the old approximation
            // was feeding it to the image as a tint instead of painting it.
            View.Style["backgroundImage"] = "linear-gradient(rgba(64, 64, 64, 0), rgba(64, 64, 64, 0))";
            View.Style["backgroundBlendMode"] = "multiply";
            yield return null;
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[BG transparent layer] {Describe(c)}");
            Assert.AreEqual(0.753f, c.r, 0.03f, "a fully transparent layer should leave the colour showing");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator NoBackgroundColorLeavesTheLayerAlone()
        {
            // CSS weights the blend by the backdrop's own alpha, so a layer with nothing behind it
            // comes through untouched. Ignoring that weight would multiply by black here.
            View.Style["backgroundColor"] = "transparent";
            View.Style["backgroundBlendMode"] = "multiply";
            yield return null;
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[BG multiply / no colour] {Describe(c)}");
            Assert.AreEqual(0.251f, c.r, 0.03f, "with a transparent backdrop the layer is its own result");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator HalfATransparentBackdropBlendsHalfway()
        {
            // Backdrop white at half alpha over black, source 0x40. CSS blends against straight
            // white weighted by 0.5 -- multiply gives 0.5*0.251 + 0.5*0.251 = 0.251 either way, so
            // this uses `screen`, where the two differ: 0.5*0.251 + 0.5*1 = 0.626.
            View.Style["backgroundColor"] = "rgba(255, 255, 255, 0.5)";
            View.Style["backgroundBlendMode"] = "screen";
            yield return null;
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[BG screen / half-alpha colour] {Describe(c)}");
            Assert.AreEqual(0.626f, c.r, 0.03f, "the blend is weighted by the backdrop's alpha");
        }

        // The same table the `mix-blend-mode` suite uses, and for the same reason: the flat cases
        // agree with several wrong formulas. Backdrop 0xC0, source 0x40, in gamma space.
        static readonly (string Mode, float Expected)[] MidToneCases =
        {
            ("multiply", 0.189f),
            ("screen", 0.815f),
            ("overlay", 0.630f),
            ("darken", 0.251f),
            ("lighten", 0.753f),
            ("color-dodge", 1f),
            ("color-burn", 0.016f),
            ("hard-light", 0.378f),
            ("soft-light", 0.660f),
            ("difference", 0.502f),
            ("exclusion", 0.626f),
        };

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator SeparableModesMatchTheSpecOnMidTones()
        {
            yield return null;
            yield return null;

            foreach (var (mode, expected) in MidToneCases)
            {
                View.Style["backgroundBlendMode"] = mode;
                yield return null;
                yield return null;

                var c = SampleCentre();
                Debug.Log($"[BG {mode}] {Describe(c)} expected {expected:F3}");
                Assert.AreEqual(expected, c.r, 0.03f, $"{mode} should land on the CSS value");
                Assert.AreEqual(c.r, c.g, 0.01f, $"{mode} of two greys should stay grey");
                Assert.AreEqual(c.g, c.b, 0.01f, $"{mode} of two greys should stay grey");
            }
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator PlusLighterAddsToTheColor()
        {
            View.Style["backgroundColor"] = "#606060";
            View.Style["backgroundImage"] = "linear-gradient(#606060, #606060)";
            View.Style["backgroundBlendMode"] = "plus-lighter";
            yield return null;
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[BG plus-lighter] {Describe(c)}");
            Assert.AreEqual(0.753f, c.r, 0.03f, "the layer is added to the colour rather than covering it");
        }

        const string StackStyle = @"
            #under, #test {
                position: absolute;
                left: 0;
                top: 0;
                width: 200px;
                height: 200px;
            }
            #under { background-color: black; }
            #test {
                background-image: linear-gradient(#404040, #404040), linear-gradient(#C0C0C0, #C0C0C0);
            }
        ";

        [UGUITest(Script = BaseScript, Style = StackStyle)]
        public IEnumerator StackedLayersBlendWithEachOther()
        {
            yield return null;
            yield return null;

            // No colour at all here, so the only thing the top layer can blend with is the layer
            // below it -- and it has to be that, not the black element behind the whole background.
            View.Style["backgroundBlendMode"] = "multiply";
            yield return null;
            yield return null;
            yield return null;

            Assert.NotNull(View.ElementFilter, "reading the layers below needs the element captured");

            var c = SampleCentre();
            Debug.Log($"[BG stacked multiply] {Describe(c)}");
            Assert.AreEqual(0.189f, c.r, 0.04f, "0x40 multiplied by the 0xC0 layer under it");
        }

        [UGUITest(Script = BaseScript, Style = StackStyle)]
        public IEnumerator EachLayerTakesItsOwnValue()
        {
            // One value per layer, in the order the images are given: the top one blends, the
            // bottom one does not.
            View.Style["backgroundBlendMode"] = "multiply, normal";
            yield return null;
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[BG per-layer list] {Describe(c)}");
            Assert.AreEqual(0.189f, c.r, 0.04f);

            // Swapped, the top layer is the one that does not blend, so it simply covers.
            View.Style["backgroundBlendMode"] = "normal, multiply";
            yield return null;
            yield return null;
            yield return null;

            // And with the bottom layer's backdrop being a transparent background colour, its own
            // multiply is a no-op -- so the top layer covering it is all that is left.
            Assert.IsNull(View.ElementFilter, "only the bottom layer blends now, so the capture goes away");

            var swapped = SampleCentre();
            Debug.Log($"[BG per-layer list, swapped] {Describe(swapped)}");
            Assert.AreEqual(0.251f, swapped.r, 0.03f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator TheListRepeatsToCoverEveryLayer()
        {
            View.Style["backgroundImage"] = "linear-gradient(#404040, #404040), linear-gradient(#C0C0C0, #C0C0C0)";
            View.Style["backgroundColor"] = "transparent";
            // One value for two layers, which CSS repeats rather than leaving the second at normal.
            View.Style["backgroundBlendMode"] = "multiply";
            yield return null;
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[BG repeated list] {Describe(c)}");
            Assert.AreEqual(0.189f, c.r, 0.04f, "the single value should apply to the top layer too");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator BlendIsRemovedWhenUnset()
        {
            View.Style["backgroundBlendMode"] = "difference";
            yield return null;
            yield return null;

            var blended = SampleCentre();
            Debug.Log($"[BG difference] {Describe(blended)}");
            Assert.AreEqual(0.502f, blended.r, 0.03f);

            View.Style["backgroundBlendMode"] = null;
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[BG removed] {Describe(c)}");
            Assert.AreEqual(0.251f, c.r, 0.03f, "the layer should just cover the colour again");
        }
    }
}
