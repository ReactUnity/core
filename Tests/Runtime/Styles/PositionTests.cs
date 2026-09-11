using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.Styling.Rules;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class PositionTests : TestBase
    {
        public PositionTests(JavascriptEngineType engineType) : base(engineType) { }

        /// <summary>Where a box sits relative to another, in CSS directions.</summary>
        private Rect RectIn(UGUI.UGUIComponent cmp, UGUI.UGUIComponent reference)
        {
            var rect = cmp.GetBoundingClientRect();
            var origin = reference.GetBoundingClientRect();
            return new Rect(rect.x - origin.x, rect.y - origin.y, rect.width, rect.height);
        }

        /// <summary>
        /// Anything measured against a scroll container needs a pixel of slack: the ScrollRect drives a
        /// viewport a pixel larger than the scroll box, so the offset it applies is a fraction off the
        /// one asked for. Two boxes in the same content share that offset, so measuring against a
        /// sibling or the containing block instead is exact.
        /// </summary>
        private void AssertRectIn(Rect expected, UGUI.UGUIComponent cmp, UGUI.UGUIComponent reference, float tolerance = 0.01f)
        {
            var rect = RectIn(cmp, reference);
            Assert.AreEqual(expected.x, rect.x, tolerance, "x");
            Assert.AreEqual(expected.y, rect.y, tolerance, "y");
            Assert.AreEqual(expected.width, rect.width, tolerance, "width");
            Assert.AreEqual(expected.height, rect.height, tolerance, "height");
        }

        const string StickyScript = @"
            function App() {
                return <scroll id='sc' style={{ width: 200, height: 200 }}>
                    <view id='before' style={{ height: 100, flexShrink: 0 }} />
                    <view id='sticky' style={{ height: 40, flexShrink: 0, position: 'sticky', top: 10 }} />
                    <view id='after' style={{ height: 400, flexShrink: 0 }} />
                </scroll>;
            }
        ";

        [UGUITest(Script = StickyScript)]
        public IEnumerator StickyHoldsAtItsInsetOnceTheScrollReachesIt()
        {
            yield return null;
            yield return null;

            var scroll = Q("#sc");
            var sticky = Q("#sticky");
            var before = Q("#before");

            // 540px of content in a 200px port, so 340px of travel.
            Assert.AreEqual(540, scroll.ScrollHeight, 0.01f);

            // Above its inset it is exactly where flow put it, and nothing is stuck.
            AssertRectIn(new Rect(0, 100, 200, 40), sticky, before);
            Assert.AreEqual(ScrollEdge.None, sticky.StuckEdges);

            // Scrolling its in-flow position under the inset is the moment it starts being held.
            scroll.ScrollTop = 100;
            yield return null;
            AssertRectIn(new Rect(0, 10, 200, 40), sticky, scroll, 1f);
            Assert.AreEqual(ScrollEdge.Top, sticky.StuckEdges);

            // Still held at the far end of the travel: the scroll content is its containing block.
            scroll.ScrollTop = 340;
            yield return null;
            AssertRectIn(new Rect(0, 10, 200, 40), sticky, scroll, 1f);
            Assert.AreEqual(ScrollEdge.Top, sticky.StuckEdges);

            // And it lets go on the way back up.
            scroll.ScrollTop = 0;
            yield return null;
            AssertRectIn(new Rect(0, 100, 200, 40), sticky, before);
            Assert.AreEqual(ScrollEdge.None, sticky.StuckEdges);

            // The siblings never moved for any of it.
            AssertRectIn(new Rect(0, 0, 200, 100), before, scroll);
            AssertRectIn(new Rect(0, 140, 200, 400), Q("#after"), before);
        }

        const string ClampScript = @"
            function App() {
                return <scroll id='sc' style={{ width: 200, height: 200 }}>
                    <view id='section' style={{ height: 150, flexShrink: 0 }}>
                        <view id='sticky' style={{ height: 40, flexShrink: 0, position: 'sticky', top: 0 }} />
                    </view>
                    <view id='after' style={{ height: 400, flexShrink: 0 }} />
                </scroll>;
            }
        ";

        [UGUITest(Script = ClampScript)]
        public IEnumerator StickyIsPushedOffTheEdgeByItsContainingBlock()
        {
            yield return null;
            yield return null;

            var scroll = Q("#sc");
            var sticky = Q("#sticky");
            var section = Q("#section");

            scroll.ScrollTop = 100;
            yield return null;
            AssertRectIn(new Rect(0, 0, 200, 40), sticky, scroll, 1f);
            Assert.AreEqual(ScrollEdge.Top, sticky.StuckEdges);

            // Past the last place a 40px box fits inside a 150px section, the section takes it along --
            // and it stops counting as stuck once the containing block, not the inset, is what decides.
            scroll.ScrollTop = 150;
            yield return null;
            AssertRectIn(new Rect(0, 110, 200, 40), sticky, section);
            Assert.AreEqual(ScrollEdge.None, sticky.StuckEdges);

            scroll.ScrollTop = 0;
            yield return null;
            AssertRectIn(new Rect(0, 0, 200, 40), sticky, section);
            Assert.AreEqual(ScrollEdge.None, sticky.StuckEdges);
        }

        const string BottomScript = @"
            function App() {
                return <scroll id='sc' style={{ width: 200, height: 200 }}>
                    <view id='before' style={{ height: 400, flexShrink: 0 }} />
                    <view id='sticky' style={{ height: 40, flexShrink: 0, position: 'sticky', bottom: 0 }} />
                    <view id='after' style={{ height: 100, flexShrink: 0 }} />
                </scroll>;
            }
        ";

        [UGUITest(Script = BottomScript)]
        public IEnumerator StickyHoldsAgainstTheBottomEdgeToo()
        {
            yield return null;
            yield return null;

            var scroll = Q("#sc");
            var sticky = Q("#sticky");
            var before = Q("#before");

            // Its in-flow top is at 400, far past a port showing 0..200, so it is held against the bottom.
            AssertRectIn(new Rect(0, 160, 200, 40), sticky, scroll, 1f);
            Assert.AreEqual(ScrollEdge.Bottom, sticky.StuckEdges);

            // Scrolled past its in-flow position, it is back in flow and 400 below its sibling as written.
            scroll.ScrollTop = 300;
            yield return null;
            AssertRectIn(new Rect(0, 400, 200, 40), sticky, before);
            Assert.AreEqual(ScrollEdge.None, sticky.StuckEdges);
        }

        [UGUITest(Script = @"
            function App() {
                return <view id='parent' style={{ width: 200, height: 160 }}>
                    <view id='first' style={{ height: 20, flexShrink: 0 }} />
                    <view id='test' style={{ height: 20, flexShrink: 0 }} />
                </view>;
            }
        ")]
        public IEnumerator StickyInsetsNeverShiftTheBoxInFlow()
        {
            var parent = Q("#parent");
            var cmp = Q("#test");

            cmp.Style.Set("position", "sticky");
            cmp.Style.Set("top", "50px");
            yield return null;
            yield return null;

            // With no scrollable ancestor there is nothing to stick to, and the inset does not apply at all.
            AssertRectIn(new Rect(0, 20, 200, 20), cmp, parent);
            Assert.AreEqual(ScrollEdge.None, cmp.StuckEdges);

            // The same inset on a relative box is a plain offset, which is what sticky must not become.
            cmp.Style.Set("position", "relative");
            yield return null;
            AssertRectIn(new Rect(0, 70, 200, 20), cmp, parent);

            cmp.Style.Set("position", "sticky");
            yield return null;
            AssertRectIn(new Rect(0, 20, 200, 20), cmp, parent);
        }

        [UGUITest(Script = @"
            function App() {
                return <view id='outer' style={{ width: 100, height: 100, marginTop: 40, marginLeft: 30, overflow: 'hidden' }}>
                    <view id='test' style={{ position: 'absolute', top: 10, left: 20, width: 20, height: 20 }} />
                </view>;
            }
        ")]
        public IEnumerator FixedIsPositionedAgainstTheViewportRatherThanItsParent()
        {
            yield return null;
            yield return null;

            var outer = Q("#outer");
            var cmp = Q("#test");

            // Absolute answers to its parent, which sits 30 across and 40 down.
            AssertRectIn(new Rect(50, 50, 20, 20), cmp, Host);
            Assert.AreSame(outer.Container, cmp.RectTransform.parent);

            cmp.Style.Set("position", "fixed");
            yield return null;
            yield return null;

            // Fixed answers to the viewport, and has left the parent that would have clipped it.
            AssertRectIn(new Rect(20, 10, 20, 20), cmp, Host);
            AssertRectIn(new Rect(30, 40, 100, 100), outer, Host);
            Assert.AreSame(Host.Container, cmp.RectTransform.parent);

            // A stand-in keeps its slot in the parent, while the node itself now hangs off the host.
            // YogaNode is enumerable, so identity here has to be asked for by reference.
            Assert.AreEqual(1, outer.Layout.Count);
            Assert.AreNotSame(cmp.Layout, outer.Layout[0]);
            Assert.AreEqual(Yoga.YogaDisplay.None, outer.Layout[0].Display);
            Assert.AreSame(Host.Layout, cmp.Layout.Parent);

            cmp.Style.Set("position", "absolute");
            yield return null;
            yield return null;

            AssertRectIn(new Rect(50, 50, 20, 20), cmp, Host);
            Assert.AreSame(outer.Container, cmp.RectTransform.parent);
            Assert.AreSame(cmp.Layout, outer.Layout[0]);
        }

        [UGUITest(Script = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='outer'>
                    {!globals.gone && <view id='test' style={{ position: 'fixed', top: 0, left: 0, width: 20, height: 20 }} />}
                </view>;
            }
        ")]
        public IEnumerator AFixedElementLeavesNothingBehindWhenItIsRemoved()
        {
            yield return null;
            yield return null;

            var outer = Q("#outer");
            Assert.AreSame(Host.Container, Q("#test").RectTransform.parent);
            Assert.AreEqual(1, outer.Layout.Count);

            Globals["gone"] = true;
            yield return null;
            yield return null;

            Assert.IsNull(Q("#test"));
            Assert.AreEqual(0, outer.Layout.Count);
        }
    }
}
