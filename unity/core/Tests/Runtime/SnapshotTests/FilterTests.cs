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

        const string ChildScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                    <view id='child' style={{ width: globals.w || 50, height: 50 }} />
                </view>;
            }
";

        const string ChildStyle = BaseStyle + @"
            #child { background-color: blue; }
        ";

        [UGUITest(Script = ChildScript, Style = ChildStyle)]
        public IEnumerator StaticFilterStopsRendering()
        {
            View.Style["filter"] = "grayscale(1)";
            yield return null;
            yield return null;
            yield return null;
            yield return null;

            var settled = View.ElementFilter.RenderCount;
            Assert.Greater(settled, 0, "it should have rendered at least once");

            for (int i = 0; i < 5; i++) yield return null;

            Debug.Log($"[FILTER dirty] settled={settled} after 5 idle frames={View.ElementFilter.RenderCount}");
            Assert.AreEqual(settled, View.ElementFilter.RenderCount, "a static filtered element should not re-render");
        }

        [UGUITest(Script = ChildScript, Style = ChildStyle)]
        public IEnumerator MovingAChildRerenders()
        {
            View.Style["filter"] = "grayscale(1)";
            for (int i = 0; i < 4; i++) yield return null;
            var before = View.ElementFilter.RenderCount;

            // A child resizing only moves its transform -- no graphic goes dirty, which is the
            // case naive invalidation misses and shows a stale frame for.
            Globals["w"] = 120;
            for (int i = 0; i < 3; i++) yield return null;

            Debug.Log($"[FILTER dirty] before={before} after child resize={View.ElementFilter.RenderCount}");
            Assert.Greater(View.ElementFilter.RenderCount, before, "moving a child must re-render");
        }

        [UGUITest(Script = ChildScript, Style = ChildStyle)]
        public IEnumerator ChangingTheFilterRerenders()
        {
            View.Style["filter"] = "grayscale(1)";
            for (int i = 0; i < 4; i++) yield return null;
            var before = View.ElementFilter.RenderCount;

            View.Style["filter"] = "grayscale(0.5)";
            for (int i = 0; i < 3; i++) yield return null;

            Debug.Log($"[FILTER dirty] before={before} after filter change={View.ElementFilter.RenderCount}");
            Assert.Greater(View.ElementFilter.RenderCount, before, "a new filter value must re-render");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator WideBlurStaysSmooth()
        {
            View.Style["filter"] = "blur(24px)";
            for (int i = 0; i < 4; i++) yield return null;

            // Across the soft edge of a wide blur, coverage should fall monotonically. A kernel
            // that undersamples gives back ripples instead.
            var prev = 1.1f;
            var samples = "";
            for (int x = 170; x <= 230; x += 6)
            {
                var a = SampleAt(x, 100).a;
                samples += $"{x}:{a:F2} ";
                Assert.LessOrEqual(a, prev + 0.06f, $"coverage rose again at x={x} -- the blur is banding");
                prev = a;
            }

            Debug.Log($"[FILTER blur(24px)] {samples}");
        }

        const string ButtonScript = @"
            function App() {
                return <view id='test'>
                    <button id='btn'>Click</button>
                </view>;
            }
";

        const string ButtonStyle = BaseStyle + @"
            #btn { width: 200px; height: 200px; }
        ";

        [UGUITest(Script = ButtonScript, Style = ButtonStyle)]
        public IEnumerator FilteredSubtreeStillReceivesPointerEvents()
        {
            yield return null;
            yield return null;

            var ownEventSystem = !EventSystem.current;
            var es = EventSystem.current ?? new GameObject("[FilterTestEventSystem]").AddComponent<EventSystem>();
            var results = new List<RaycastResult>();

            var btn = Q("#btn");
            var point = RectTransformUtility.WorldToScreenPoint(
                CanvasCmp.worldCamera, btn.RectTransform.TransformPoint(btn.RectTransform.rect.center));

            RaycastResult Top()
            {
                results.Clear();
                es.RaycastAll(new PointerEventData(es) { position = point }, results);
                return results.Count > 0 ? results[0] : default;
            }

            var before = Top();
            Assert.NotNull(before.gameObject, "sanity: something should be hit with no filter at all");
            Assert.IsTrue(before.gameObject.transform.IsChildOf(btn.RectTransform),
                $"sanity: expected the button, hit {before.gameObject.name}");
            Assert.IsNotInstanceOf<FilterRaycaster>(before.module, "sanity: no filter is set yet");

            View.Style["filter"] = "grayscale(1)";
            for (int i = 0; i < 4; i++) yield return null;

            var after = Top();
            Debug.Log($"[FILTER raycast] before={before.gameObject?.name}/{before.module?.GetType().Name}" +
                $" after={after.gameObject?.name}/{after.module?.GetType().Name}");

            // The subtree now lives on an offscreen canvas, so the hit has to arrive through the
            // composite -- and land on the same graphic it did in place.
            Assert.IsInstanceOf<FilterRaycaster>(after.module, "the hit must be routed through the filter's raycaster");
            Assert.AreEqual(before.gameObject, after.gameObject, "the same screen point must hit the same graphic");

            if (ownEventSystem) Object.DestroyImmediate(es.gameObject);
        }

        const string ClippedScript = @"
            function App() {
                return <view id='wrap'>
                    <view id='test'>
                        <button id='btn'>Click</button>
                    </view>
                </view>;
            }
";

        const string ClippedStyle = ButtonStyle + @"
            #wrap { overflow: hidden; width: 100px; height: 100px; }
            #test, #btn { flex-shrink: 0; }
        ";

        [UGUITest(Script = ClippedScript, Style = ClippedStyle)]
        public IEnumerator AncestorOverflowClipsHitsTooNotJustPixels()
        {
            yield return null;
            yield return null;

            var ownEventSystem = !EventSystem.current;
            var es = EventSystem.current ?? new GameObject("[FilterTestEventSystem]").AddComponent<EventSystem>();
            var results = new List<RaycastResult>();
            var btn = Q("#btn");
            var rect = btn.RectTransform.rect;

            // Screen points have to be taken while the button is still in place -- once it is
            // reparented onto the offscreen canvas its world position says nothing about the screen.
            Vector2 ScreenPointAt(float fromLeft, float fromTop) =>
                RectTransformUtility.WorldToScreenPoint(CanvasCmp.worldCamera,
                    btn.RectTransform.TransformPoint(new Vector3(rect.xMin + fromLeft, rect.yMax - fromTop, 0)));

            // The button spans 200px but its wrapper clips at 100px. A point in the visible corner
            // must hit; one past the clip must not, even though the button's rect covers it.
            var insidePoint = ScreenPointAt(50, 50);
            var clippedPoint = ScreenPointAt(150, 150);

            bool Hits(Vector2 point)
            {
                results.Clear();
                es.RaycastAll(new PointerEventData(es) { position = point }, results);
                return results.Count > 0 && results[0].gameObject.transform.IsChildOf(btn.RectTransform);
            }

            Assert.AreEqual(new Vector2(200, 200), rect.size, "sanity: the button should overflow its wrapper");
            Assert.IsTrue(Hits(insidePoint), "sanity: the unfiltered button should be hit inside the clip");
            Assert.IsFalse(Hits(clippedPoint), "sanity: overflow should already clip hits without a filter");

            View.Style["filter"] = "grayscale(1)";
            for (int i = 0; i < 4; i++) yield return null;

            var inside = Hits(insidePoint);
            var clipped = Hits(clippedPoint);
            Debug.Log($"[FILTER clip] inside={inside} clipped={clipped}");

            Assert.IsTrue(inside, "a point inside the clip should still reach the filtered button");
            Assert.IsFalse(clipped, "a point past the ancestor's overflow should not reach it");

            if (ownEventSystem) Object.DestroyImmediate(es.gameObject);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator RotationTurnsTheFilteredResultToo()
        {
            // The element spans 0..200. Rotated 45deg about its centre it becomes a diamond whose
            // edge runs |dx| + |dy| = 141, so its old corner region falls outside it.
            View.Style["rotate"] = "45deg";
            for (int i = 0; i < 3; i++) yield return null;

            var cornerBefore = SampleAt(20, 20).a;
            var centreBefore = SampleCentre().a;

            View.Style["filter"] = "grayscale(1)";
            for (int i = 0; i < 4; i++) yield return null;

            var cornerAfter = SampleAt(20, 20).a;
            var centreAfter = SampleCentre().a;
            Debug.Log($"[FILTER rotate] corner {cornerBefore:F2} -> {cornerAfter:F2}  centre {centreBefore:F2} -> {centreAfter:F2}");

            // Capturing with the element's rotation and compositing without it would hand back an
            // upright square, filling the corner the rotation had emptied.
            Assert.Less(cornerBefore, 0.1f, "sanity: the rotated element should not cover its old corner");
            Assert.Less(cornerAfter, 0.1f, "the filter must not undo the rotation");
            Assert.Greater(centreBefore, 0.9f, "sanity: the centre stays covered under a rotation");
            Assert.Greater(centreAfter, 0.9f, "the filtered centre should still be covered");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ScaleGrowsTheFilteredResultToo()
        {
            // Scaled 2x about its centre the element spans -100..300, so 250 lands inside it.
            View.Style["scale"] = "2";
            for (int i = 0; i < 3; i++) yield return null;

            var outerBefore = SampleAt(250, 100).a;

            View.Style["filter"] = "grayscale(1)";
            for (int i = 0; i < 4; i++) yield return null;

            var outerAfter = SampleAt(250, 100).a;
            Debug.Log($"[FILTER scale] outer {outerBefore:F2} -> {outerAfter:F2}");

            // A composite left at the unscaled box would cut the element back to 0..200 here.
            Assert.Greater(outerBefore, 0.9f, "sanity: the scaled element should reach 250px");
            Assert.Greater(outerAfter, 0.9f, "the filtered element should reach just as far");
        }

        // A margin so the element sits away from the screen corner and a shadow has room to fall
        // on any side of it. The element spans 60..260 on both axes.
        const string ShadowStyle = @"
            #test {
                background-color: red;
                width: 200px;
                height: 200px;
                margin: 60px;
            }
        ";

        [UGUITest(Script = BaseScript, Style = ShadowStyle)]
        public IEnumerator DropShadowFallsOnTheOffsetSide()
        {
            yield return null;
            yield return null;
            Assert.Greater(SampleAt(160, 160).r, 0.5f, "sanity: the element should be red at its centre");
            Assert.Less(SampleAt(270, 270).a, 0.1f, "sanity: nothing past its bottom-right yet");

            // Offset 20px right and down, so the shadow spans 80..280.
            View.Style["filter"] = "drop-shadow(20px 20px 0px blue)";
            for (int i = 0; i < 4; i++) yield return null;

            var onShadow = SampleAt(270, 270);
            var offShadow = SampleAt(70, 70);
            var overElement = SampleAt(160, 160);
            Debug.Log($"[FILTER drop-shadow] shadow {Describe(onShadow)} corner {Describe(offShadow)} centre {Describe(overElement)}");

            Assert.Greater(onShadow.b, 0.5f, "the shadow should fall past the element's bottom-right");
            Assert.Less(onShadow.r, 0.3f, "and should be the shadow's blue, not the element's red");
            Assert.Greater(offShadow.r, 0.5f, "the top-left corner is the element, which the shadow has left");
            Assert.Less(offShadow.b, 0.3f, "the shadow must not fall on the side it moved away from");
            Assert.Greater(overElement.r, 0.5f, "the shadow belongs behind the element, not over it");
            Assert.Less(overElement.b, 0.3f);
        }

        [UGUITest(Script = BaseScript, Style = ShadowStyle)]
        public IEnumerator DropShadowTakesAFunctionalColour()
        {
            // A colour with its own parens and commas inside a filter function inside a filter
            // list: three levels for the splitter to keep straight, and what the docs recommend.
            View.Style["filter"] = "drop-shadow(20px 20px 0px rgba(0, 0, 255, 0.5))";
            for (int i = 0; i < 4; i++) yield return null;

            var onShadow = SampleAt(270, 270);
            Debug.Log($"[FILTER drop-shadow rgba] {Describe(onShadow)}");

            Assert.Greater(onShadow.b, 0.5f, "the shadow should be blue");
            Assert.AreEqual(0.5f, onShadow.a, 0.1f, "and half transparent, as its alpha asked");
        }

        [UGUITest(Script = BaseScript, Style = ShadowStyle)]
        public IEnumerator DropShadowDoesNotSmearOutOfTheCapture()
        {
            // Half-transparent, so anything wrongly drawn behind the element shows through it.
            View.Style["backgroundColor"] = "rgba(255, 0, 0, 0.5)";
            View.Style["filter"] = "drop-shadow(20px 20px 0px blue)";
            for (int i = 0; i < 4; i++) yield return null;

            // The shadow moved 20px off this strip, and the capture has no room to its left -- so
            // the sampler lands outside it here, where a clamp would repeat the element's own edge.
            var strip = SampleAt(70, 160);
            var onShadow = SampleAt(270, 270);
            Debug.Log($"[FILTER drop-shadow smear] strip {Describe(strip)} shadow {Describe(onShadow)}");

            Assert.Greater(onShadow.b, 0.5f, "sanity: the shadow should still fall where it belongs");
            Assert.Greater(strip.r, 0.8f, "the strip the shadow left should show the pale backdrop, not a smeared shadow");
        }

        [UGUITest(Script = BaseScript, Style = ShadowStyle)]
        public IEnumerator DropShadowFallsOnNegativeOffsetsToo()
        {
            yield return null;
            yield return null;
            Assert.Less(SampleAt(50, 50).a, 0.1f, "sanity: nothing past its top-left yet");

            // Offset up and left, so the shadow spans 40..240 and the region grows the other way.
            View.Style["filter"] = "drop-shadow(-20px -20px 0px blue)";
            for (int i = 0; i < 4; i++) yield return null;

            var onShadow = SampleAt(50, 50);
            var offShadow = SampleAt(270, 270);
            Debug.Log($"[FILTER drop-shadow -] shadow {Describe(onShadow)} opposite {Describe(offShadow)}");

            Assert.Greater(onShadow.b, 0.5f, "the shadow should fall past the element's top-left");
            Assert.Less(offShadow.a, 0.1f, "and the region should not have grown the other way");
        }

        [UGUITest(Script = BaseScript, Style = ShadowStyle)]
        public IEnumerator DropShadowKeepsItsOwnColourThroughTheOps()
        {
            View.Style["filter"] = "grayscale(1) drop-shadow(20px 20px 0px blue)";
            for (int i = 0; i < 4; i++) yield return null;

            var onShadow = SampleAt(270, 270);
            var element = SampleAt(160, 160);
            Debug.Log($"[FILTER drop-shadow grey] shadow {Describe(onShadow)} element {Describe(element)}");

            // The shadow is composited after the colour ops, so `grayscale` reaches the element only.
            Assert.AreEqual(element.r, element.g, 0.05f, "the element itself should be grey");
            Assert.Greater(onShadow.b - onShadow.r, 0.3f, "the shadow should still be blue");
        }

        [UGUITest(Script = BaseScript, Style = ShadowStyle)]
        public IEnumerator DropShadowBlurSoftensOutward()
        {
            View.Style["filter"] = "drop-shadow(0px 0px 12px black)";
            for (int i = 0; i < 4; i++) yield return null;

            // No offset, so the shadow rings the element and fades outward from its edge at 260.
            var prev = 1.1f;
            var samples = "";
            for (int x = 252; x <= 300; x += 4)
            {
                var a = SampleAt(x, 160).a;
                samples += $"{x}:{a:F2} ";
                Assert.LessOrEqual(a, prev + 0.06f, $"coverage rose again at x={x} -- the shadow is banding");
                prev = a;
            }
            Debug.Log($"[FILTER drop-shadow blur] {samples}");

            Assert.Greater(SampleAt(264, 160).a, 0.2f, "the shadow should reach past the element's edge");
            Assert.Less(SampleAt(300, 160).a, 0.05f, "and should have faded out well inside its 36px region");
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
