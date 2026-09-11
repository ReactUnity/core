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
    public class MixBlendModeTests : TestBase
    {
        // The backdrop is painted first and the blended element sits exactly on top of it, so every
        // sample below reads one blend function applied to two flat colours.
        const string BaseScript = @"
            function App() {
                return <>
                    <view id='backdrop'></view>
                    <view id='test'></view>
                </>;
            }
";

        const string BaseStyle = @"
            #backdrop, #test {
                position: absolute;
                left: 0;
                top: 0;
                width: 200px;
                height: 200px;
            }
            #backdrop { background-color: white; }
            #test { background-color: red; }
        ";

        private UGUIComponent View => Q("#test");
        private UGUIComponent Backdrop => Q("#backdrop");

        public MixBlendModeTests(JavascriptEngineType engineType) : base(engineType) { }

        // The centre of the 200x200 overlap the backdrop and the element share.
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

            // The React canvas puts the elements in the top-left, so coordinates are given from
            // the top-left and flipped into the framebuffer's bottom-up space here.
            var c = tex.GetPixel(x, Screen.height - fromTop);

            Object.DestroyImmediate(tex);
            rt.Release();
            Object.DestroyImmediate(rt);
            return c;
        }

        static string Describe(Color c) => $"rgba({c.r:F2},{c.g:F2},{c.b:F2},{c.a:F2})";

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator NormalAllocatesNothing()
        {
            View.Style["mixBlendMode"] = "normal";
            yield return null;
            yield return null;

            Assert.IsNull(View.ElementFilter, "the default blend mode should not allocate a render target");

            var c = SampleCentre();
            Debug.Log($"[BLEND normal] {Describe(c)}");
            Assert.Greater(c.r, 0.5f, "the element should just cover the backdrop");
            Assert.Less(c.g, 0.3f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator BlendAloneCapturesOffscreen()
        {
            View.Style["mixBlendMode"] = "multiply";
            yield return null;
            yield return null;
            yield return null;

            // Blending needs the element as one image the same way `filter` does, so it goes
            // through the same offscreen capture even with no filter functions at all.
            Assert.NotNull(View.ElementFilter, "a blend mode alone should create an ElementFilter");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator MultiplyOverWhiteKeepsTheSource()
        {
            View.Style["mixBlendMode"] = "multiply";
            yield return null;
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[BLEND multiply / white] {Describe(c)}");
            Assert.Greater(c.r, 0.7f, "multiplying by white is the identity, so red stays red");
            Assert.Less(c.g, 0.3f);
            Assert.Less(c.b, 0.3f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator MultiplyOverBlackIsBlack()
        {
            Backdrop.Style["backgroundColor"] = "black";
            View.Style["mixBlendMode"] = "multiply";
            yield return null;
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[BLEND multiply / black] {Describe(c)}");
            Assert.Less(c.r, 0.2f, "multiplying by black takes every channel to zero");
            Assert.Less(c.g, 0.2f);
            Assert.Less(c.b, 0.2f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ScreenOverWhiteIsWhite()
        {
            View.Style["mixBlendMode"] = "screen";
            yield return null;
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[BLEND screen / white] {Describe(c)}");
            Assert.Greater(c.r, 0.8f, "screen against white saturates every channel");
            Assert.Greater(c.g, 0.8f);
            Assert.Greater(c.b, 0.8f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator DifferenceAgainstWhiteInvertsTheSource()
        {
            View.Style["mixBlendMode"] = "difference";
            yield return null;
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[BLEND difference / white] {Describe(c)}");
            Assert.Less(c.r, 0.2f, "|white - red| is cyan");
            Assert.Greater(c.g, 0.8f);
            Assert.Greater(c.b, 0.8f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ColorTakesTheBackdropLuminosity()
        {
            // The non-separable path: `color` keeps the source's hue and saturation but the
            // backdrop's luminosity, and a white backdrop's is high enough to clip red to white.
            View.Style["mixBlendMode"] = "color";
            yield return null;
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[BLEND color / white] {Describe(c)}");
            Assert.Greater(c.r, 0.8f, "red carried up to white's luminosity clips to white");
            Assert.Greater(c.g, 0.8f);
            Assert.Greater(c.b, 0.8f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator LuminosityOfBlackIsBlack()
        {
            // The other half of the non-separable path: `luminosity` keeps the backdrop's colour
            // and takes the source's brightness, and black has none.
            View.Style["backgroundColor"] = "black";
            View.Style["mixBlendMode"] = "luminosity";
            yield return null;
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[BLEND luminosity / black source] {Describe(c)}");
            Assert.Less(c.r, 0.2f, "white pulled down to black's luminosity is black");
            Assert.Less(c.g, 0.2f);
            Assert.Less(c.b, 0.2f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator FilterRunsBeforeTheBlend()
        {
            // CSS filters the element and blends the result, so this is invert(red) = cyan
            // multiplied by white, not invert of red multiplied by white.
            View.Style["filter"] = "invert(1)";
            View.Style["mixBlendMode"] = "multiply";
            yield return null;
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[BLEND multiply after invert] {Describe(c)}");
            Assert.Less(c.r, 0.2f, "the inverted colour is what gets multiplied");
            Assert.Greater(c.g, 0.8f);
            Assert.Greater(c.b, 0.8f);
        }

        // Every separable mode against one mid-tone pair, which is where a formula that is only
        // right at the ends gives itself away -- the flat black/white cases above agree with
        // several wrong ones. Backdrop 0xC0, source 0x40, worked through the CSS definitions.
        // The project renders in gamma space, so these are the sRGB values the shader sees.
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
            Backdrop.Style["backgroundColor"] = "#C0C0C0";
            View.Style["backgroundColor"] = "#404040";
            yield return null;
            yield return null;

            foreach (var (mode, expected) in MidToneCases)
            {
                View.Style["mixBlendMode"] = mode;
                yield return null;
                yield return null;
                yield return null;

                var c = SampleCentre();
                Debug.Log($"[BLEND {mode} / mid] {Describe(c)} expected {expected:F3}");
                Assert.AreEqual(expected, c.r, 0.03f, $"{mode} should land on the CSS value");
                Assert.AreEqual(c.r, c.g, 0.01f, $"{mode} of two greys should stay grey");
                Assert.AreEqual(c.g, c.b, 0.01f, $"{mode} of two greys should stay grey");
            }
        }

        const string GroupScript = @"
            function App() {
                return <>
                    <view id='backdrop'></view>
                    <view id='test'><view id='child'></view></view>
                </>;
            }
";

        const string GroupStyle = BaseStyle + @"
            #child {
                position: absolute;
                left: 0;
                top: 0;
                width: 100px;
                height: 200px;
                background-color: lime;
            }
        ";

        [UGUITest(Script = GroupScript, Style = GroupStyle)]
        public IEnumerator TheSubtreeBlendsAsOneImage()
        {
            View.Style["mixBlendMode"] = "difference";
            yield return null;
            yield return null;
            yield return null;

            // Sampling inside the child. Blended as a group its colour is the one that meets the
            // white backdrop, giving magenta; had the child blended against its parent instead it
            // would have hit the parent's own cyan result and come out blue.
            var c = SampleAt(50, 100);
            Debug.Log($"[BLEND group child] {Describe(c)}");
            Assert.Greater(c.r, 0.8f, "the child should blend with the backdrop, not with its parent");
            Assert.Less(c.g, 0.2f);
            Assert.Greater(c.b, 0.8f);

            // And the parent's own half is unchanged by the child being there.
            var parent = SampleAt(150, 100);
            Debug.Log($"[BLEND group parent] {Describe(parent)}");
            Assert.Less(parent.r, 0.2f);
            Assert.Greater(parent.g, 0.8f);
            Assert.Greater(parent.b, 0.8f);
        }

        const string NestedScript = @"
            function App() {
                return <>
                    <view id='page'></view>
                    <view id='group'>
                        <view id='test'></view>
                    </view>
                </>;
            }
";

        // Nothing is painted inside the group behind the blended element, so what it blends with
        // says which backdrop it reached: the group's own empty capture, or the red page below.
        const string NestedStyle = @"
            #page, #group, #test {
                position: absolute;
                left: 0;
                top: 0;
                width: 200px;
                height: 200px;
            }
            #page { background-color: red; }
            #test { background-color: white; mix-blend-mode: difference; }
        ";

        [UGUITest(Script = NestedScript, Style = NestedStyle)]
        public IEnumerator AnAncestorCaptureContainsTheBlend()
        {
            yield return null;
            yield return null;
            yield return null;

            var leaked = SampleCentre();
            Debug.Log($"[BLEND nested, no group filter] {Describe(leaked)}");
            Assert.Less(leaked.r, 0.2f, "with nothing above it the element blends with the page, giving cyan");
            Assert.Greater(leaked.g, 0.8f);

            // A filter on the ancestor captures the subtree, and the blend can only read that
            // capture -- which is empty here, so difference leaves the element's own white.
            Q("#group").Style["filter"] = "opacity(0.99)";
            yield return null;
            yield return null;
            yield return null;

            var contained = SampleCentre();
            Debug.Log($"[BLEND nested, group filtered] {Describe(contained)}");
            Assert.Greater(contained.r, 0.8f, "the capture above it is the backdrop now, and it is empty");
            Assert.Greater(contained.g, 0.8f);
            Assert.Greater(contained.b, 0.8f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator PlusLighterAddsToTheBackdrop()
        {
            // Two equal 0x60 greys. Adding them lands on 0.753, which no blend function reaches
            // from here -- `screen` gives 0.611 and `lighten` the 0.376 it started with.
            Backdrop.Style["backgroundColor"] = "#606060";
            View.Style["backgroundColor"] = "#606060";
            View.Style["mixBlendMode"] = "plus-lighter";
            yield return null;
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[BLEND plus-lighter] {Describe(c)}");
            Assert.AreEqual(0.753f, c.r, 0.03f, "plus-lighter should add the two");
            Assert.AreEqual(0.753f, c.g, 0.03f);
            Assert.AreEqual(0.753f, c.b, 0.03f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator PlusLighterFadesTheSourceBeforeAddingIt()
        {
            // Adding is the one mode where the group's own opacity has to reach the backdrop
            // rather than the result: half of white on top of 0.690 clamps to 1, where fading the
            // already-added result would have given 0.845. Every unclamped case is the same
            // either way, so this is the one that can tell them apart.
            Backdrop.Style["backgroundColor"] = "#B0B0B0";
            View.Style["backgroundColor"] = "white";
            View.Style["mixBlendMode"] = "plus-lighter";
            View.Style["filter"] = "opacity(0.5)";
            yield return null;
            yield return null;
            yield return null;

            var c = SampleCentre();
            Debug.Log($"[BLEND plus-lighter + opacity(0.5)] {Describe(c)}");
            Assert.AreEqual(1f, c.r, 0.03f, "half of white added to 0.690 clamps to white");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator IsolateAloneCapturesButChangesNothing()
        {
            yield return null;
            yield return null;
            var before = SampleCentre();

            View.Style["isolation"] = "isolate";
            yield return null;
            yield return null;
            yield return null;

            Assert.NotNull(View.ElementFilter, "isolating should create the capture that does the isolating");

            // The chain runs with every value at its default, so the element has to come back out
            // of the render target as the pixels that went in.
            var after = SampleCentre();
            Debug.Log($"[ISOLATION identity] before {Describe(before)} after {Describe(after)}");
            Assert.AreEqual(before.r, after.r, 0.02f, "isolating on its own must not alter the element");
            Assert.AreEqual(before.g, after.g, 0.02f);
            Assert.AreEqual(before.b, after.b, 0.02f);
        }

        [UGUITest(Script = NestedScript, Style = NestedStyle)]
        public IEnumerator IsolateContainsADescendantsBlend()
        {
            yield return null;
            yield return null;
            yield return null;

            var leaked = SampleCentre();
            Debug.Log($"[ISOLATION auto] {Describe(leaked)}");
            Assert.Less(leaked.r, 0.2f, "`isolation: auto` lets the blend reach the red page, giving cyan");
            Assert.Greater(leaked.g, 0.8f);

            Q("#group").Style["isolation"] = "isolate";
            yield return null;
            yield return null;
            yield return null;

            var contained = SampleCentre();
            Debug.Log($"[ISOLATION isolate] {Describe(contained)}");
            Assert.Greater(contained.r, 0.8f, "isolating stops it at the group, whose capture is empty");
            Assert.Greater(contained.g, 0.8f);
            Assert.Greater(contained.b, 0.8f);
        }

        const string SiblingsScript = @"
            function App() {
                return <>
                    <view id='page'></view>
                    <view id='group'>
                        <view id='under'></view>
                        <view id='over'></view>
                    </view>
                </>;
            }
";

        // Two blending siblings inside the isolated group. `under` has nothing but the group's own
        // empty capture behind it, `over` has `under`.
        const string SiblingsStyle = @"
            #page, #group, #under, #over {
                position: absolute;
                left: 0;
                top: 0;
                width: 200px;
                height: 200px;
            }
            #page { background-color: red; }
            #group { isolation: isolate; }
            #under { background-color: white; mix-blend-mode: difference; }
            #over { width: 100px; background-color: white; mix-blend-mode: difference; }
        ";

        [UGUITest(Script = SiblingsScript, Style = SiblingsStyle)]
        public IEnumerator IsolationDoesNotStopSiblingsBlendingWithEachOther()
        {
            yield return null;
            yield return null;
            yield return null;

            // Only `under` reaches here: white against the empty capture stays white.
            var alone = SampleAt(150, 100);
            Debug.Log($"[ISOLATION sibling, alone] {Describe(alone)}");
            Assert.Greater(alone.r, 0.8f);
            Assert.Greater(alone.g, 0.8f);
            Assert.Greater(alone.b, 0.8f);

            // And where they overlap, |white - white| is black -- so a group contains its
            // descendants' blending without switching it off between them.
            var overlap = SampleAt(50, 100);
            Debug.Log($"[ISOLATION sibling, overlap] {Describe(overlap)}");
            Assert.Less(overlap.r, 0.2f, "the upper sibling should blend with the lower one");
            Assert.Less(overlap.g, 0.2f);
            Assert.Less(overlap.b, 0.2f);
        }

        const string IsolatedOpacityScript = @"
            function App() {
                return <>
                    <view id='backdrop'></view>
                    <view id='faded'><view id='test'></view></view>
                </>;
            }
";

        const string IsolatedOpacityStyle = BaseStyle + @"
            #faded { opacity: 0.5; }
        ";

        [UGUITest(Script = IsolatedOpacityScript, Style = IsolatedOpacityStyle)]
        public IEnumerator IsolateStillIgnoresParentGroups()
        {
            yield return null;
            yield return null;

            var faded = SampleCentre();
            Debug.Log($"[ISOLATION parent opacity, auto] {Describe(faded)}");
            Assert.AreEqual(0.5f, faded.g, 0.1f, "the parent's opacity should show red at half over white");

            // `isolation: isolate` has always meant "do not inherit parent CanvasGroups" here as
            // well, and the capture must not quietly take that away -- the element's own group goes
            // offscreen with it, so the flag is carried to the composite left behind.
            View.Style["isolation"] = "isolate";
            yield return null;
            yield return null;
            yield return null;

            var full = SampleCentre();
            Debug.Log($"[ISOLATION parent opacity, isolate] {Describe(full)}");
            Assert.Greater(full.r, 0.8f, "an isolated element should not take its parent's opacity");
            Assert.Less(full.g, 0.2f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator BlendIsRemovedWhenUnset()
        {
            View.Style["mixBlendMode"] = "difference";
            yield return null;
            yield return null;
            Assert.NotNull(View.ElementFilter);

            View.Style["mixBlendMode"] = null;
            yield return null;
            yield return null;

            Assert.IsNull(View.ElementFilter, "going back to normal should release the capture");

            var c = SampleCentre();
            Debug.Log($"[BLEND removed] {Describe(c)}");
            Assert.Greater(c.r, 0.5f, "the element should draw normally again");
            Assert.Less(c.g, 0.5f);
        }
    }
}
