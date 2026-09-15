using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.Types;
using ReactUnity.UGUI;
using ReactUnity.UGUI.Behaviours;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace ReactUnity.Tests
{
    /// <summary><c>overscroll-behavior</c>: whether a scroll a box has no room left for goes on to the box above it.</summary>
    public class OverscrollTests : TestBase
    {
        const string NestedScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <scroll id='outer' smoothness={globals.smoothness}>
                    <view id='spacer' />
                    <scroll id='inner' smoothness={globals.smoothness} elasticity={globals.elasticity}>
                        <view id='content' />
                    </scroll>
                </scroll>;
            }
        ";

        const string NestedStyle = @"
            #outer { width: 200px; height: 200px; }
            #inner { width: 150px; height: 150px; flex-shrink: 0; }
            #spacer { height: 400px; flex-shrink: 0; }
            #content { height: 600px; flex-shrink: 0; }
        ";

        const string SidewaysStyle = @"
            #outer { width: 200px; height: 200px; overflow-y: hidden; }
            #inner { width: 150px; height: 150px; flex-shrink: 0; overflow-y: hidden; }
            #spacer { width: 400px; flex-shrink: 0; }
            #content { width: 600px; flex-shrink: 0; }
        ";

        const string FilteredScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <scroll id='outer' smoothness={globals.smoothness}>
                    <view id='spacer' />
                    <view id='veil'>
                        <scroll id='inner' smoothness={globals.smoothness}>
                            <view id='content' />
                        </scroll>
                    </view>
                </scroll>;
            }
        ";

        const string FilteredStyle = NestedStyle + @"
            #veil { filter: blur(2px); flex-shrink: 0; }
        ";

        public ScrollComponent Outer => Q("#outer") as ScrollComponent;
        public ScrollComponent Inner => Q("#inner") as ScrollComponent;

        public OverscrollTests(JavascriptEngineType engineType) : base(engineType) { }

        /// The smoothing is a separate feature with its own tests, and a scroll that lands where it was
        /// sent is what these have to read.
        private IEnumerator Settle()
        {
            Globals.Set("smoothness", 0);
            yield return null;
        }


        [UGUITest(Script = NestedScript, Style = NestedStyle)]
        public IEnumerator AWheelTheInnerBoxCanTakeStaysInIt()
        {
            yield return Settle();

            Wheel(Inner, 1);
            Assert.AreEqual(100, Inner.ScrollTop, 1, "the inner box took the tick");
            Assert.AreEqual(0, Outer.ScrollTop, 1, "and the outer one never saw it");
        }

        [UGUITest(Script = NestedScript, Style = NestedStyle)]
        public IEnumerator AWheelPastTheInnerEndReachesTheOuterBox()
        {
            yield return Settle();

            Inner.ScrollTop = 1000;
            Assert.AreEqual(450, Inner.ScrollTop, 1, "the inner box is at its end to begin with");

            Wheel(Inner, 1);
            Assert.AreEqual(450, Inner.ScrollTop, 1, "it has nothing left to give");
            Assert.AreEqual(100, Outer.ScrollTop, 1, "so the whole tick goes on to the box above");
        }

        [UGUITest(Script = NestedScript, Style = NestedStyle)]
        public IEnumerator ContainAndNoneBothKeepTheWheelInTheBox()
        {
            yield return Settle();
            Inner.ScrollTop = 1000;

            foreach (var value in new[] { "contain", "none" })
            {
                Outer.ScrollTop = 0;
                Inner.Style.Set("overscroll-behavior", value);
                yield return null;

                Wheel(Inner, 1);
                Assert.AreEqual(0, Outer.ScrollTop, 1, value + " keeps the tick to the inner box");
            }
        }

        [UGUITest(Script = NestedScript, Style = NestedStyle)]
        public IEnumerator ABoxWithNothingToScrollPassesTheWheelStraightOn()
        {
            yield return Settle();

            Q("#content").Style.Set("height", 50);
            yield return null;
            Assert.AreEqual(0, Inner.ScrollHeight - Inner.ClientHeight, 1, "the inner box has nowhere to go");

            Wheel(Inner, 1);
            Assert.AreEqual(100, Outer.ScrollTop, 1, "so the box above scrolls instead");
        }

        /// <summary>
        /// The axis a scroll runs along is the one whose `overscroll-behavior` decides, so containing
        /// the other leaves it free to chain.
        /// </summary>
        [UGUITest(Script = NestedScript, Style = SidewaysStyle)]
        public IEnumerator TheAxisThatChainsIsTheOneTheScrollRunsAlong()
        {
            yield return Settle();
            Assert.IsTrue(Inner.ScrollRect.horizontal, "a box with a hidden y axis scrolls sideways");
            Assert.IsFalse(Inner.ScrollRect.vertical);

            Inner.ScrollLeft = 1000;
            Inner.Style.Set("overscroll-behavior-y", "contain");
            yield return null;

            Wheel(Inner, 1);
            Assert.AreEqual(100, Outer.ScrollLeft, 1, "a contained y does not trap a sideways scroll");

            Outer.ScrollLeft = 0;
            Inner.Style.Set("overscroll-behavior-x", "contain");
            yield return null;

            Wheel(Inner, 1);
            Assert.AreEqual(0, Outer.ScrollLeft, 1, "containing the axis it runs along does");
        }

        /// <summary>
        /// A `filter` reparents its subtree onto an offscreen canvas of its own, so the box above is
        /// no longer above it in the transforms. The chain walks the element tree, which still is.
        /// </summary>
        [UGUITest(Script = FilteredScript, Style = FilteredStyle)]
        public IEnumerator AFilterInBetweenDoesNotBreakTheChain()
        {
            yield return Settle();
            Assert.IsFalse(Inner.RectTransform.IsChildOf(Outer.RectTransform), "the subtree is parked elsewhere");

            Inner.ScrollTop = 1000;
            Wheel(Inner, 1);
            Assert.AreEqual(100, Outer.ScrollTop, 1, "and the tick still finds the box above");
        }

        [UGUITest(Script = NestedScript, Style = NestedStyle)]
        public IEnumerator NoneTakesTheBounceAwayWhereContainKeepsIt()
        {
            Globals.Set("elasticity", 0.5f);
            yield return null;
            Assert.AreEqual(ScrollRect.MovementType.Elastic, Inner.ScrollRect.movementType);

            Inner.Style.Set("overscroll-behavior", "contain");
            yield return null;
            Assert.AreEqual(ScrollRect.MovementType.Elastic, Inner.ScrollRect.movementType, "contain keeps the local overscroll effect");
            Assert.AreEqual(0.5f, Inner.ScrollRect.elasticity);

            Inner.Style.Set("overscroll-behavior", "none");
            yield return null;
            Assert.AreEqual(ScrollRect.MovementType.Clamped, Inner.ScrollRect.movementType, "none asks for no overscroll at all");
            Assert.AreEqual(0, Inner.ScrollRect.elasticity);

            Inner.Style.Set("overscroll-behavior", "auto");
            yield return null;
            Assert.AreEqual(ScrollRect.MovementType.Elastic, Inner.ScrollRect.movementType, "and it comes back");
        }

        /// <summary>
        /// A box that can be pulled past its end does not use that to swallow a scroll it has no room
        /// for: the bounce is what it does when the box above refuses one, not instead of asking.
        /// </summary>
        [UGUITest(Script = NestedScript, Style = NestedStyle)]
        public IEnumerator AnElasticBoxStillChains()
        {
            Globals.Set("elasticity", 0.5f);
            yield return Settle();
            Assert.AreEqual(ScrollRect.MovementType.Elastic, Inner.ScrollRect.movementType);

            Inner.ScrollTop = 1000;
            Wheel(Inner, 1);
            Assert.AreEqual(100, Outer.ScrollTop, 1, "the tick went up rather than into the bounce");

            Outer.ScrollTop = 0;
            Inner.Style.Set("overscroll-behavior", "contain");
            yield return null;

            Wheel(Inner, 1);
            Assert.AreEqual(0, Outer.ScrollTop, 1, "and contain still keeps it");
        }

        [UGUITest(Script = NestedScript, Style = NestedStyle)]
        public IEnumerator TheLogicalNamesAreTheSameTwoPropertiesTheShorthandSets()
        {
            yield return null;
            Assert.AreEqual(OverscrollBehavior.Auto, Inner.ComputedStyle.overscrollBehaviorX);
            Assert.AreEqual(OverscrollBehavior.Auto, Inner.ComputedStyle.overscrollBehaviorY);

            // No vertical writing modes here, so inline is x and block is y whatever the direction.
            Inner.Style.Set("overscroll-behavior-inline", "none");
            Inner.Style.Set("overscroll-behavior-block", "contain");
            yield return null;
            Assert.AreEqual(OverscrollBehavior.None, Inner.ComputedStyle.overscrollBehaviorX);
            Assert.AreEqual(OverscrollBehavior.Contain, Inner.ComputedStyle.overscrollBehaviorY);

            Inner.Style.Set("overscroll-behavior", "contain");
            yield return null;
            Assert.AreEqual(OverscrollBehavior.Contain, Inner.ComputedStyle.overscrollBehaviorX, "one value is both axes");
            Assert.AreEqual(OverscrollBehavior.Contain, Inner.ComputedStyle.overscrollBehaviorY);

            Inner.Style.Set("overscroll-behavior", "none contain");
            yield return null;
            Assert.AreEqual(OverscrollBehavior.None, Inner.ComputedStyle.overscrollBehaviorX, "x comes first, as it does in `overflow`");
            Assert.AreEqual(OverscrollBehavior.Contain, Inner.ComputedStyle.overscrollBehaviorY);
        }

        [UGUITest(Script = NestedScript, Style = NestedStyle)]
        public IEnumerator ADragTheInnerBoxCanTakeStaysInIt()
        {
            yield return Settle();

            yield return Drag(Inner.ScrollRect, 60);
            Assert.AreEqual(60, Inner.ScrollTop, 1, "the inner box took the whole drag");
            Assert.AreEqual(0, Outer.ScrollTop, 1, "and the outer one never saw it");
        }

        [UGUITest(Script = NestedScript, Style = NestedStyle)]
        public IEnumerator ADragPastTheInnerEndIsHandedToTheOuterBox()
        {
            yield return Settle();

            Inner.ScrollTop = 1000;
            yield return null;

            yield return Drag(Inner.ScrollRect, 60, 5);
            Assert.AreEqual(450, Inner.ScrollTop, 1, "the inner box was already at its end");

            // The first step of the five is what discovers that, so the box above gets the other four.
            Assert.AreEqual(48, Outer.ScrollTop, 1, "so the drag carried on in the box above");
        }

        [UGUITest(Script = NestedScript, Style = NestedStyle)]
        public IEnumerator ContainKeepsADragInTheBoxToo()
        {
            yield return Settle();

            Inner.ScrollTop = 1000;
            Inner.Style.Set("overscroll-behavior", "contain");
            yield return null;

            yield return Drag(Inner.ScrollRect, 60);
            Assert.AreEqual(0, Outer.ScrollTop, 1);
        }

        /// <summary>
        /// A gesture stays with whichever box took it. Dragging the inner one to its end and on past it
        /// moves the outer one no further, where handing over at every end would scroll both at once.
        /// </summary>
        [UGUITest(Script = NestedScript, Style = NestedStyle)]
        public IEnumerator AGestureStaysWithTheBoxThatTookIt()
        {
            yield return Settle();

            Inner.ScrollTop = 400;
            yield return null;

            yield return Drag(Inner.ScrollRect, 200);
            Assert.AreEqual(450, Inner.ScrollTop, 1, "the drag took the inner box to its end");
            Assert.AreEqual(0, Outer.ScrollTop, 1, "and the rest of it went nowhere else");
        }


        /// Scroll down by <paramref name="ticks"/> ticks, which the wheel reports as a negative delta.
        private static void Wheel(ScrollComponent scroll, float ticks)
        {
            var module = EventSystem.current?.currentInputModule;
            var perUnit = module == null ? 1f : module.ConvertPointerEventScrollDeltaToTicks(Vector2.one).y;
            if (Mathf.Approximately(perUnit, 0)) perUnit = 1f;

            scroll.ScrollRect.OnScroll(new PointerEventData(EventSystem.current)
            { scrollDelta = new Vector2(0, -ticks / perUnit) });
        }

        /// <summary>
        /// Drag the content up by <paramref name="distance"/> pixels, which scrolls down by that much,
        /// in the steps a real gesture arrives in.
        /// </summary>
        private IEnumerator Drag(SmoothScrollRect rect, float distance, int steps = 5)
        {
            // The pointer has to carry the raycaster a real one would: the drag is measured by a
            // screen-to-local conversion, and this canvas is not an overlay, so without the camera
            // that comes off the module the conversion lands nowhere near where the drag was aimed.
            var raycaster = rect.GetComponentInParent<GraphicRaycaster>();
            var from = RectTransformUtility.WorldToScreenPoint(raycaster.eventCamera, rect.transform.position);

            var data = new PointerEventData(EventSystem.current)
            {
                button = PointerEventData.InputButton.Left,
                position = from,
                pressPosition = from,
                pointerPressRaycast = new RaycastResult { gameObject = rect.gameObject, module = raycaster, screenPosition = from },
            };

            // The module fires the begin and the first drag in the same frame, with the pointer still
            // where the begin recorded it. A helper that steps first never sees what that does.
            rect.OnBeginDrag(data);
            rect.OnDrag(data);
            yield return null;

            for (var i = 1; i <= steps; i++)
            {
                var at = from + new Vector2(0, distance * i / steps);
                data.delta = at - data.position;
                data.position = at;
                rect.OnDrag(data);
                yield return null;
            }

            // Read before the next frame: the base class coasts on the velocity it built during the
            // drag, and these are measuring the gesture rather than the inertia after it.
            rect.OnEndDrag(data);
        }
    }
}
