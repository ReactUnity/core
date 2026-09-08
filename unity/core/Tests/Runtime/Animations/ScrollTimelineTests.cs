using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.Styling.Animations;

namespace ReactUnity.Tests
{
    public class ScrollTimelineTests : TestBase
    {
        // 640px of content in a 200px view, so the scrollable range is 440px and the middle of it
        // is 220px. Opacity carries the progress, since it interpolates exactly, and the easing is
        // linear so that the number read back is the progress itself.
        const string BaseScript = @"
            function App() {
                return <scroll id='sc' style={{ width: 200, height: 200 }}>
                    <view id='bar' style={{ height: 40, flexShrink: 0 }} />
                    <view id='filler' style={{ height: 600, flexShrink: 0 }} />
                </scroll>;
            }
        ";

        const string BaseStyle = @"
            @keyframes fade {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            #bar {
                opacity: 0.5;
                animation-name: fade;
                animation-timeline: scroll();
                animation-timing-function: linear;
            }
        ";

        public ScrollTimelineTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ScrollProgressDrivesTheAnimationInPlaceOfTheClock()
        {
            yield return null;
            yield return null;

            var scroll = Q("#sc");
            var bar = Q("#bar");

            Assert.AreEqual(440, scroll.ScrollHeight - scroll.ClientHeight, 0.5f);

            // At the start of the range the first keyframe holds, whatever the declared opacity is.
            Assert.AreEqual(0, bar.ComputedStyle.opacity, 0.001f);

            scroll.ScrollTop = 220;
            yield return null;

            Assert.AreEqual(0.5f, bar.ComputedStyle.opacity, 0.01f);

            // The end of the range keeps the last keyframe rather than wrapping to the first.
            scroll.ScrollTop = 440;
            yield return null;

            Assert.AreEqual(1, bar.ComputedStyle.opacity, 0.001f);

            // Time does not move it: the animation has no duration and never ends.
            yield return null;
            yield return null;

            Assert.AreEqual(1, bar.ComputedStyle.opacity, 0.001f);

            scroll.ScrollTop = 110;
            yield return null;

            Assert.AreEqual(0.25f, bar.ComputedStyle.opacity, 0.01f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator AnInactiveTimelineLeavesTheElementUnanimated()
        {
            yield return null;
            yield return null;

            var scroll = Q("#sc");
            var bar = Q("#bar");

            scroll.ScrollTop = 440;
            yield return null;
            Assert.AreEqual(1, bar.ComputedStyle.opacity, 0.001f);

            // `none` names no timeline, so the animation has no effect and not even its fill shows.
            bar.Style["animation-timeline"] = "none";
            yield return null;
            yield return null;

            Assert.AreEqual(0.5f, bar.ComputedStyle.opacity, 0.001f);

            // `self` is the element itself, which does not scroll, so it is inactive too.
            bar.Style["animation-timeline"] = "scroll(self)";
            yield return null;
            yield return null;

            Assert.AreEqual(0.5f, bar.ComputedStyle.opacity, 0.001f);

            // Back to the nearest ancestor, and the progress it was already at applies again.
            bar.Style["animation-timeline"] = "scroll(nearest block)";
            yield return null;
            yield return null;

            Assert.AreEqual(1, bar.ComputedStyle.opacity, 0.001f);
        }

        const string NamedScript = @"
            function App() {
                return <view>
                    <scroll id='sc' style={{ width: 200, height: 200 }}>
                        <view id='filler' style={{ height: 600, flexShrink: 0 }} />
                    </scroll>
                    <view id='outside' />
                </view>;
            }
        ";

        const string NamedStyle = @"
            @keyframes fade {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            #sc { scroll-timeline: --track block; }

            #filler, #outside {
                opacity: 0.5;
                animation-name: fade;
                animation-timeline: --track;
                animation-timing-function: linear;
            }
        ";

        [UGUITest(Script = NamedScript, Style = NamedStyle)]
        public IEnumerator ANamedTimelineIsReadByTheContainerAndItsDescendants()
        {
            yield return null;
            yield return null;

            var scroll = Q("#sc");
            var filler = Q("#filler");
            var outside = Q("#outside");

            Assert.AreEqual(0, filler.ComputedStyle.opacity, 0.001f);

            // The name is declared above #filler but nowhere above #outside, whose timeline is
            // inactive and leaves it unanimated.
            Assert.AreEqual(0.5f, outside.ComputedStyle.opacity, 0.001f);

            scroll.ScrollTop = 200;
            yield return null;

            Assert.AreEqual(0.5f, filler.ComputedStyle.opacity, 0.01f);
            Assert.AreEqual(0.5f, outside.ComputedStyle.opacity, 0.001f);

            // A name on something that does not scroll names no timeline.
            scroll.Style["scroll-timeline-name"] = "none";
            Q("#outside").Style["scroll-timeline"] = "--track";
            yield return null;
            yield return null;

            Assert.AreEqual(0.5f, filler.ComputedStyle.opacity, 0.001f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator TheParsedFormsAndWhatTheAnimationShorthandResets()
        {
            yield return null;

            var bar = Q("#bar");

            Assert.AreEqual(AnimationTimelineKind.Scroll, bar.ComputedStyle.animationTimeline.Get(0).Kind);
            Assert.AreEqual(TimelineScroller.Nearest, bar.ComputedStyle.animationTimeline.Get(0).Scroller);
            Assert.AreEqual(TimelineAxis.Block, bar.ComputedStyle.animationTimeline.Get(0).Axis);

            bar.Style["animation-timeline"] = "scroll(root inline)";
            yield return null;

            var timeline = bar.ComputedStyle.animationTimeline.Get(0);
            Assert.AreEqual(TimelineScroller.Root, timeline.Scroller);
            Assert.AreEqual(TimelineAxis.Inline, timeline.Axis);

            bar.Style["animation-timeline"] = "scroll(x)";
            yield return null;

            timeline = bar.ComputedStyle.animationTimeline.Get(0);
            Assert.AreEqual(TimelineScroller.Nearest, timeline.Scroller);
            Assert.AreEqual(TimelineAxis.X, timeline.Axis);

            bar.Style["animation-timeline"] = "--track";
            yield return null;

            timeline = bar.ComputedStyle.animationTimeline.Get(0);
            Assert.AreEqual(AnimationTimelineKind.Named, timeline.Kind);
            Assert.AreEqual("--track", timeline.Name);

            // A timeline is a dashed identifier, so a bare word names nothing and the declaration
            // is dropped, which leaves the one before it standing.
            bar.Style["animation-timeline"] = "track";
            yield return null;

            Assert.AreEqual("--track", bar.ComputedStyle.animationTimeline.Get(0).Name);

            // The shorthand takes no timeline, so it resets one the way it resets every other
            // sub-property it leaves out.
            bar.Style["animation"] = "fade 1s";
            yield return null;

            Assert.AreEqual(AnimationTimelineKind.Auto, bar.ComputedStyle.animationTimeline.Get(0).Kind);
            Assert.AreEqual(1, bar.ComputedStyle.animationDuration.Get(0), 0.001f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator IterationCountDividesTheRangeAndDirectionStillApplies()
        {
            yield return null;
            yield return null;

            var scroll = Q("#sc");
            var bar = Q("#bar");

            bar.Style["animation-iteration-count"] = "2";
            scroll.ScrollTop = 110;
            yield return null;
            yield return null;

            // Two cycles over the range, so a quarter of the way through is halfway through the first.
            Assert.AreEqual(0.5f, bar.ComputedStyle.opacity, 0.01f);

            scroll.ScrollTop = 330;
            yield return null;

            // Three quarters of the range is halfway through the second cycle.
            Assert.AreEqual(0.5f, bar.ComputedStyle.opacity, 0.01f);

            scroll.ScrollTop = 440;
            yield return null;

            Assert.AreEqual(1, bar.ComputedStyle.opacity, 0.001f);

            // Alternate turns the second cycle around, so the end of the range is back at the start.
            bar.Style["animation-direction"] = "alternate";
            yield return null;
            yield return null;

            Assert.AreEqual(0, bar.ComputedStyle.opacity, 0.001f);

            scroll.ScrollTop = 110;
            yield return null;

            Assert.AreEqual(0.5f, bar.ComputedStyle.opacity, 0.01f);
        }
    }
}
