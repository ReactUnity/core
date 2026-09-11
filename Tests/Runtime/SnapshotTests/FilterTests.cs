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
        public IEnumerator ChangingTheBlurRerenders()
        {
            View.Style["filter"] = "blur(2px)";
            for (int i = 0; i < 4; i++) yield return null;
            var before = View.ElementFilter.RenderCount;

            View.Style["filter"] = "blur(6px)";
            for (int i = 0; i < 3; i++) yield return null;

            Debug.Log($"[FILTER dirty] before={before} after blur change={View.ElementFilter.RenderCount}");
            Assert.Greater(View.ElementFilter.RenderCount, before, "a new blur radius must re-render");
        }

        [UGUITest(Script = ChildScript, Style = ChildStyle)]
        public IEnumerator ChangingAColourOpDoesNotRerender()
        {
            View.Style["filter"] = "grayscale(1)";
            for (int i = 0; i < 4; i++) yield return null;
            var before = View.ElementFilter.RenderCount;

            // A colour op is a uniform the composite reads at draw time, so the capture it reads
            // from is still good -- but the picture has to change all the same.
            View.Style["filter"] = "invert(1)";
            for (int i = 0; i < 3; i++) yield return null;

            var c = SampleCentre();
            Debug.Log($"[FILTER dirty] before={before} after colour op={View.ElementFilter.RenderCount} {Describe(c)}");
            Assert.AreEqual(before, View.ElementFilter.RenderCount, "a colour op must not re-capture the subtree");
            Assert.Greater(c.g, 0.7f, "the composite must still be redrawn with the new value");
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

        // A gradient, a rounding and a text child, all load-bearing: applying a style re-assigns
        // each of those, and each used to dirty a graphic the filter watches whether or not it moved.
        const string AnimatedScript = @"
            function App() {
                return <view id='test'>hello</view>;
            }
";

        // Declared in the stylesheet: an animation added afterwards does not start.
        const string AnimatedStyle = BaseStyle + @"
            @keyframes spin { from { filter: hue-rotate(0deg); } to { filter: hue-rotate(360deg); } }
            #test { animation: spin 4s linear infinite; background-image: linear-gradient(red, blue); border-radius: 12px; }
        ";

        [UGUITest(Script = AnimatedScript, Style = AnimatedStyle)]
        public IEnumerator AnimatingAColourOpDoesNotRerender()
        {
            // The context drives its own clock in tests, so frames alone leave the animation at zero.
            yield return AdvanceTime(0.5f);
            for (int i = 0; i < 3; i++) yield return null;
            Assert.NotNull(View.ElementFilter, "sanity: the animation should have brought a filter into being");

            var before = View.ElementFilter.RenderCount;
            for (int i = 0; i < 4; i++) { yield return AdvanceTime(0.1f); yield return null; }

            Debug.Log($"[FILTER animated] {before} -> {View.ElementFilter.RenderCount} over 10 frames");
            Assert.AreEqual(before, View.ElementFilter.RenderCount, "an animated colour op must not re-capture every frame");
        }

        // A white subject, so a channel that a shifted tap loses is visible as its complement --
        // on red, pulling blue off a pixel that has none changes nothing.
        const string WhiteStyle = @"
            #test { background-color: white; width: 200px; height: 200px; }
        ";

        // Mid-grey, so noise shows in both directions instead of clipping at each end.
        const string GreyStyle = @"
            #test { background-color: rgb(128, 128, 128); width: 200px; height: 200px; }
        ";

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator TintMultipliesTheResult()
        {
            View.Style["filter"] = "tint(rgb(0, 255, 255))";
            for (int i = 0; i < 3; i++) yield return null;

            var c = SampleCentre();
            Debug.Log($"[FILTER tint] {Describe(c)}");
            Assert.Less(c.r, 0.1f, "a tint with no red must take the red out");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator PosterizeRoundsToWholeLevels()
        {
            // Two levels are black and white, so 0.4 falls to one and 0.6 rises to the other --
            // which pins the level maths rather than just showing that something was quantised.
            View.Style["filter"] = "brightness(0.4) posterize(2)";
            for (int i = 0; i < 3; i++) yield return null;
            var low = SampleCentre();

            View.Style["filter"] = "brightness(0.6) posterize(2)";
            for (int i = 0; i < 3; i++) yield return null;
            var high = SampleCentre();

            Debug.Log($"[FILTER posterize(2)] 0.4 -> {Describe(low)}  0.6 -> {Describe(high)}");
            Assert.Less(low.r, 0.2f, "below the midpoint should land on the lower level");
            Assert.Greater(high.r, 0.8f, "above it should land on the upper level");
        }

        static List<float> RedDown(int x, int fromTop, int rows)
        {
            var samples = new List<float>();
            for (int i = 0; i < rows; i++) samples.Add(SampleAt(x, fromTop + i).r);
            return samples;
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ScanlinesDarkenAlternatingRows()
        {
            View.Style["filter"] = "scanlines(1 4px)";
            for (int i = 0; i < 3; i++) yield return null;

            var rows = RedDown(100, 90, 12);
            Debug.Log($"[FILTER scanlines] {string.Join(", ", rows.ConvertAll(r => r.ToString("F2")))}");
            Assert.Less(Mathf.Min(rows.ToArray()), 0.2f, "a full-intensity scanline should black its rows out");
            Assert.Greater(Mathf.Max(rows.ToArray()), 0.8f, "and leave the rows between it alone");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ScanlinePhaseRollsThemWithoutRecapturing()
        {
            View.Style["filter"] = "scanlines(1 4px 0px)";
            for (int i = 0; i < 4; i++) yield return null;
            var before = RedDown(100, 90, 8);
            var renders = View.ElementFilter.RenderCount;

            // Half a period, so every row swaps -- and the phase is only a uniform, which is what
            // makes rolling them affordable to animate.
            View.Style["filter"] = "scanlines(1 4px 2px)";
            for (int i = 0; i < 3; i++) yield return null;
            var after = RedDown(100, 90, 8);

            Debug.Log($"[FILTER scanline phase] {string.Join(",", before.ConvertAll(r => r > 0.5f ? "1" : "0"))}" +
                $" -> {string.Join(",", after.ConvertAll(r => r > 0.5f ? "1" : "0"))}");

            var moved = 0;
            for (int i = 0; i < before.Count; i++) if ((before[i] > 0.5f) != (after[i] > 0.5f)) moved++;
            Assert.Greater(moved, before.Count / 2, "half a period out of phase should swap the rows over");
            Assert.AreEqual(renders, View.ElementFilter.RenderCount, "a phase change must not re-capture the subtree");
        }

        [UGUITest(Script = BaseScript, Style = GreyStyle)]
        public IEnumerator GrainPhaseResamplesWithoutRecapturing()
        {
            View.Style["filter"] = "grain(1 0)";
            for (int i = 0; i < 4; i++) yield return null;
            var before = RedDown(100, 90, 8);
            var renders = View.ElementFilter.RenderCount;

            // The noise is a hash of the coordinate, so any shift of it is a new field rather than
            // the same one moved -- which is what lets a keyframe animation flicker it.
            View.Style["filter"] = "grain(1 1)";
            for (int i = 0; i < 3; i++) yield return null;
            var after = RedDown(100, 90, 8);

            var changed = 0;
            for (int i = 0; i < before.Count; i++) if (Mathf.Abs(before[i] - after[i]) > 0.05f) changed++;
            Debug.Log($"[FILTER grain phase] changed {changed}/{before.Count} renders {renders} -> {View.ElementFilter.RenderCount}");
            Assert.Greater(changed, before.Count / 2, "a new phase should give a new noise field");
            Assert.AreEqual(renders, View.ElementFilter.RenderCount, "a phase change must not re-capture the subtree");
        }

        [UGUITest(Script = BaseScript, Style = WhiteStyle)]
        public IEnumerator ChromaticAberrationFringesTheEdges()
        {
            View.Style["filter"] = "chromatic-aberration(8px)";
            for (int i = 0; i < 4; i++) yield return null;

            // Red is read from 8px to the right and blue from 8px to the left, so near the left
            // edge the blue tap has fallen off the element and near the right edge the red one has.
            var left = SampleAt(4, 100);
            var right = SampleAt(196, 100);
            var centre = SampleCentre();

            Debug.Log($"[FILTER aberration] left {Describe(left)} centre {Describe(centre)} right {Describe(right)}");
            Assert.Less(left.b, left.r - 0.3f, "the left edge should lose blue");
            Assert.Less(right.r, right.b - 0.3f, "the right edge should lose red");
            Assert.Greater(centre.r, 0.8f, "and the middle, where every tap lands on the element, should be untouched");
            Assert.Greater(centre.b, 0.8f);
        }

        // `backdrop-filter` is a different path from `filter`: nothing is captured offscreen, and
        // the panel reads what is already on the screen behind it -- so it needs its own subject,
        // with something under the panel to read.
        const string BackdropScript = @"
            function App() {
                return <view id='host'>
                    <view id='half'></view>
                    <view id='test'></view>
                </view>;
            }
";

        const string BackdropStyle = @"
            #host {
                width: 200px;
                height: 200px;
                background-color: red;
            }

            #half {
                position: absolute;
                left: 0;
                top: 0;
                width: 100px;
                height: 200px;
                background-color: #00ff00;
            }

            #test {
                position: absolute;
                left: 0;
                top: 0;
                width: 200px;
                height: 200px;
            }
";

        [UGUITest(Script = BackdropScript, Style = BackdropStyle)]
        public IEnumerator BackdropBlurPullsTheColourAcrossTheEdgeBehindIt()
        {
            for (int i = 0; i < 3; i++) yield return null;

            // 5px onto the red side of the boundary, which is well inside a 8px blur's reach.
            var sharp = SampleAt(105, 100);
            Assert.Less(sharp.g, 0.2f, $"unblurred, the red side should be red -- was {Describe(sharp)}");

            View.Style["backdrop-filter"] = "blur(8px)";
            for (int i = 0; i < 3; i++) yield return null;

            var blurred = SampleAt(105, 100);
            // Halfway between the boundary and the panel's own right edge, so the 32px the kernel
            // reaches finds neither the green half nor whatever is beside the panel.
            var far = SampleAt(150, 100);
            Debug.Log($"[BACKDROP blur] near the edge {Describe(blurred)} far from it {Describe(far)}");
            Assert.Greater(blurred.g, sharp.g + 0.15f, "the green half should bleed onto the red side");
            Assert.Less(far.g, 0.2f, "and out of the kernel's reach, nothing should have moved");
        }

        [UGUITest(Script = BackdropScript, Style = BackdropStyle)]
        public IEnumerator BackdropScanlinesDarkenAlternatingRows()
        {
            View.Style["backdrop-filter"] = "scanlines(1 4px)";
            for (int i = 0; i < 3; i++) yield return null;

            // Rows down the screen. The backdrop's own texel size cannot supply them -- Unity
            // negates it for a flipped grab -- so this is what catches that regression.
            var rows = RedDown(150, 90, 12);
            Debug.Log($"[BACKDROP scanlines] {string.Join(", ", rows.ConvertAll(r => r.ToString("F2")))}");
            Assert.Less(Mathf.Min(rows.ToArray()), 0.2f, "a full-intensity scanline should black its rows out");
            Assert.Greater(Mathf.Max(rows.ToArray()), 0.8f, "and leave the rows between it alone");
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

        // A scroll around it, which is where a real page puts a filtered element -- and the shape
        // the hit-testing missed: the scroll's viewport is a raycast target of its own, and the
        // event system does not compare depth across two root raycasters, so the viewport was
        // taking every click by being fractionally nearer the camera.
        const string ScrolledScript = @"
            function App() {
                return <scroll id='wrap'>
                    <view id='test'>
                        <button id='btn'>Click</button>
                    </view>
                </scroll>;
            }
";

        const string ScrolledStyle = ButtonStyle + @"
            #wrap { width: 400px; height: 400px; }
            #test { height: 900px; }
            #test, #btn { flex-shrink: 0; }
        ";

        [UGUITest(Script = ScrolledScript, Style = ScrolledStyle)]
        public IEnumerator AFilteredSubtreeInAScrollIsStillOnTop()
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
            Assert.IsTrue(before.gameObject && before.gameObject.transform.IsChildOf(btn.RectTransform),
                $"sanity: expected the button through the scroll, hit {before.gameObject?.name}");

            Q("#test").Style["filter"] = "grayscale(1)";
            for (int i = 0; i < 4; i++) yield return null;

            var after = Top();
            Debug.Log($"[FILTER scroll raycast] before={before.gameObject?.name} after={after.gameObject?.name}" +
                $"/{after.module?.GetType().Name} dist={after.distance}");

            Assert.IsTrue(after.gameObject && after.gameObject.transform.IsChildOf(btn.RectTransform),
                $"the filtered button should still be the first hit, but {after.gameObject?.name} was");

            if (ownEventSystem) Object.DestroyImmediate(es.gameObject);
        }

        [UGUITest(Script = ScrolledScript, Style = ScrolledStyle)]
        public IEnumerator ScrollingOverAFilteredSubtreeStillScrolls()
        {
            yield return null;
            yield return null;

            var ownEventSystem = !EventSystem.current;
            var es = EventSystem.current ?? new GameObject("[FilterTestEventSystem]").AddComponent<EventSystem>();
            var btn = Q("#btn");
            var scroll = Q("#wrap").GameObject.GetComponentInChildren<UnityEngine.UI.ScrollRect>();
            Assert.NotNull(scroll, "sanity: the wrapper should be a scroll");

            // Taken while the button is still in place: once filtered it hangs off a canvas parked
            // a hundred thousand units away, where its world position says nothing about the screen.
            var point = RectTransformUtility.WorldToScreenPoint(
                CanvasCmp.worldCamera, btn.RectTransform.TransformPoint(btn.RectTransform.rect.center));

            Q("#test").Style["filter"] = "grayscale(1)";
            for (int i = 0; i < 4; i++) yield return null;

            var results = new List<RaycastResult>();
            es.RaycastAll(new PointerEventData(es) { position = point }, results);
            var hit = results.Find(r => r.gameObject && r.gameObject.transform.IsChildOf(btn.RectTransform)).gameObject;
            Assert.NotNull(hit, "sanity: the wheel has to land inside the filtered subtree");

            // The subtree hangs off its own canvas, so the walk up the hierarchy that finds a
            // scroll handler ends inside the filter unless the top of it carries the event on.
            var handler = ExecuteEvents.GetEventHandler<IScrollHandler>(hit);
            Debug.Log($"[FILTER scroll] hit={hit.name} handler={handler?.name}");
            Assert.NotNull(handler, "a wheel over a filtered element should still find a scroll handler");

            var before = scroll.verticalNormalizedPosition;
            ExecuteEvents.ExecuteHierarchy(hit,
                new PointerEventData(es) { position = point, scrollDelta = new Vector2(0, -3) },
                ExecuteEvents.scrollHandler);
            for (int i = 0; i < 2; i++) yield return null;

            Debug.Log($"[FILTER scroll] {before} -> {scroll.verticalNormalizedPosition}");
            Assert.AreNotEqual(before, scroll.verticalNormalizedPosition, "the page under the filter should have scrolled");

            if (ownEventSystem) Object.DestroyImmediate(es.gameObject);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator DisposingTheContextTakesTheOffscreenSurfaceWithIt()
        {
            View.Style["filter"] = "blur(4px)";
            yield return null;
            yield return null;

            var surface = View.ElementFilter.transform.parent.gameObject;
            Assert.AreEqual("[FilterSurface]", surface.name, "sanity: the subtree should hang off a surface");

            // The surface is a scene root -- a nested canvas would inherit the render mode -- so
            // destroying the context's own hierarchy never reaches it.
            Object.DestroyImmediate(Component);
            yield return null;

            Assert.IsTrue(!surface, "disposing the context must take the offscreen surface with it");
        }

        // A masking ancestor that does not clip the element, so only the substituted material is
        // under test. `overflow: hidden` is a stencil Mask, and UGUI draws a copy of the material
        // when one is above -- so anything written to the composite's own material is dropped.
        const string MaskedScript = @"
            function App() {
                return <view id='wrap'>
                    <view id='test'></view>
                </view>;
            }
";

        // Declared in the stylesheet rather than set afterwards, so the composite is masked from
        // the frame it appears -- which is when UGUI makes the copy it then caches forever.
        const string MaskedStyle = BaseStyle + @"
            #wrap { overflow: hidden; width: 400px; height: 400px; }
            #test { filter: grayscale(1); }
        ";

        [UGUITest(Script = MaskedScript, Style = MaskedStyle)]
        public IEnumerator ColourOpsSurviveAMaskingAncestor()
        {
            for (int i = 0; i < 4; i++) yield return null;

            var c = SampleCentre();
            Debug.Log($"[FILTER masked grayscale(1)] {Describe(c)}");
            Assert.AreEqual(c.r, c.g, 0.05f, "grayscale should equalise channels under a mask too");
            Assert.AreEqual(0.299f, c.r, 0.08f, "grayscale of red should land near its luma");
        }

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
