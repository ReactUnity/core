using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.Styling.Animations;
using Yoga;

namespace ReactUnity.Tests
{
    public class ViewTimelineTests : TestBase
    {
        // A 100px subject 300px down a 700px column in a 200px view, so cover runs from a scroll
        // position of 100 to one of 400, contain from 200 to 300, and the whole scrollable range is
        // 500. The easing is linear so that the number read back is the progress itself.
        const string BaseScript = @"
            function App() {
                return <view>
                    <scroll id='sc' style={{ width: 200, height: 200 }}>
                        <view id='top' style={{ height: 300, flexShrink: 0 }} />
                        <view id='subject' style={{ height: 100, flexShrink: 0 }}>
                            <view id='inner' style={{ height: 20, flexShrink: 0 }} />
                        </view>
                        <view id='bottom' style={{ height: 300, flexShrink: 0 }} />
                    </scroll>
                    <view id='outside' />
                </view>;
            }
        ";

        const string BaseStyle = @"
            @keyframes fade {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            #subject {
                opacity: 0.5;
                animation-name: fade;
                animation-timeline: view();
                animation-timing-function: linear;
            }
        ";

        public ViewTimelineTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ViewProgressFollowsTheSubjectThroughTheScrollport()
        {
            yield return null;
            yield return null;

            var scroll = Q("#sc");
            var subject = Q("#subject");

            Assert.AreEqual(500, scroll.ScrollHeight - scroll.ClientHeight, 0.5f);

            // The subject is still below the scrollport, which is before the cover range begins.
            Assert.AreEqual(0, subject.ComputedStyle.opacity, 0.001f);

            scroll.ScrollTop = 100;
            yield return null;
            Assert.AreEqual(0, subject.ComputedStyle.opacity, 0.001f);

            scroll.ScrollTop = 250;
            yield return null;
            Assert.AreEqual(0.5f, subject.ComputedStyle.opacity, 0.01f);

            scroll.ScrollTop = 400;
            yield return null;
            Assert.AreEqual(1, subject.ComputedStyle.opacity, 0.001f);

            // Past the far end of cover the subject is gone, and the last keyframe holds.
            scroll.ScrollTop = 500;
            yield return null;
            Assert.AreEqual(1, subject.ComputedStyle.opacity, 0.001f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator TheNamedRangesCarveUpTheCoverRange()
        {
            yield return null;
            yield return null;

            var scroll = Q("#sc");
            var subject = Q("#subject");

            // entry runs from 100 to 200, which is the subject coming in from the far edge.
            subject.Style["animation-range"] = "entry";
            scroll.ScrollTop = 150;
            yield return null;
            yield return null;
            Assert.AreEqual(0.5f, subject.ComputedStyle.opacity, 0.01f);

            scroll.ScrollTop = 200;
            yield return null;
            Assert.AreEqual(1, subject.ComputedStyle.opacity, 0.001f);

            // contain runs from 200 to 300, the subject fully inside the scrollport.
            subject.Style["animation-range"] = "contain";
            scroll.ScrollTop = 250;
            yield return null;
            yield return null;
            Assert.AreEqual(0.5f, subject.ComputedStyle.opacity, 0.01f);

            // exit runs from 300 to 400, the subject leaving past the near edge.
            subject.Style["animation-range"] = "exit";
            scroll.ScrollTop = 350;
            yield return null;
            yield return null;
            Assert.AreEqual(0.5f, subject.ComputedStyle.opacity, 0.01f);

            // The subject is no taller than the scrollport, so crossing an edge is the whole of
            // entering or leaving and the crossing ranges match.
            subject.Style["animation-range"] = "entry-crossing";
            scroll.ScrollTop = 150;
            yield return null;
            yield return null;
            Assert.AreEqual(0.5f, subject.ComputedStyle.opacity, 0.01f);

            // Two ends from different ranges: 50% of entry is 150, 50% of exit is 350.
            subject.Style["animation-range"] = "entry 50% exit 50%";
            scroll.ScrollTop = 250;
            yield return null;
            yield return null;
            Assert.AreEqual(0.5f, subject.ComputedStyle.opacity, 0.01f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator AnInsetShrinksTheScrollportTheSubjectIsWatchedIn()
        {
            yield return null;
            yield return null;

            var scroll = Q("#sc");
            var subject = Q("#subject");

            // 20px off each end leaves cover running from 120 to 380, whose middle is still 250.
            subject.Style["animation-timeline"] = "view(20px)";
            scroll.ScrollTop = 250;
            yield return null;
            yield return null;
            Assert.AreEqual(0.5f, subject.ComputedStyle.opacity, 0.01f);

            scroll.ScrollTop = 120;
            yield return null;
            Assert.AreEqual(0, subject.ComputedStyle.opacity, 0.001f);

            scroll.ScrollTop = 380;
            yield return null;
            Assert.AreEqual(1, subject.ComputedStyle.opacity, 0.001f);

            // A percentage inset is of the scrollport, so 10% of 200px is the same 20px.
            subject.Style["animation-timeline"] = "view(10%)";
            scroll.ScrollTop = 120;
            yield return null;
            yield return null;
            Assert.AreEqual(0, subject.ComputedStyle.opacity, 0.001f);

            scroll.ScrollTop = 250;
            yield return null;
            Assert.AreEqual(0.5f, subject.ComputedStyle.opacity, 0.01f);
        }

        const string NamedStyle = @"
            @keyframes fade {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            #subject { view-timeline: --sub block; }

            #inner, #outside {
                opacity: 0.5;
                animation-name: fade;
                animation-timeline: --sub;
                animation-timing-function: linear;
            }
        ";

        [UGUITest(Script = BaseScript, Style = NamedStyle)]
        public IEnumerator ANamedViewTimelineIsTheSubjectItDeclaredNotTheElementReadingIt()
        {
            yield return null;
            yield return null;

            var scroll = Q("#sc");
            var inner = Q("#inner");
            var outside = Q("#outside");

            // #inner is 20px tall but reads #subject, so its progress is the subject's cover range.
            Assert.AreEqual(0, inner.ComputedStyle.opacity, 0.001f);

            // The name is declared nowhere above #outside, whose timeline is inactive.
            Assert.AreEqual(0.5f, outside.ComputedStyle.opacity, 0.001f);

            scroll.ScrollTop = 250;
            yield return null;

            Assert.AreEqual(0.5f, inner.ComputedStyle.opacity, 0.01f);
            Assert.AreEqual(0.5f, outside.ComputedStyle.opacity, 0.001f);

            scroll.ScrollTop = 400;
            yield return null;

            Assert.AreEqual(1, inner.ComputedStyle.opacity, 0.001f);
        }

        const string ScrollRangeScript = @"
            function App() {
                return <scroll id='sc' style={{ width: 200, height: 200 }}>
                    <view id='bar' style={{ height: 40, flexShrink: 0 }} />
                    <view id='filler' style={{ height: 600, flexShrink: 0 }} />
                </scroll>;
            }
        ";

        const string ScrollRangeStyle = @"
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

        [UGUITest(Script = ScrollRangeScript, Style = ScrollRangeStyle)]
        public IEnumerator ARangeNarrowsAScrollTimelineButItsNamesDoNot()
        {
            yield return null;
            yield return null;

            var scroll = Q("#sc");
            var bar = Q("#bar");

            Assert.AreEqual(440, scroll.ScrollHeight - scroll.ClientHeight, 0.5f);

            // 20% to 70% of 440 is 88 to 308, whose middle is 198.
            bar.Style["animation-range"] = "20% 70%";
            scroll.ScrollTop = 198;
            yield return null;
            yield return null;
            Assert.AreEqual(0.5f, bar.ComputedStyle.opacity, 0.01f);

            scroll.ScrollTop = 88;
            yield return null;
            Assert.AreEqual(0, bar.ComputedStyle.opacity, 0.001f);

            scroll.ScrollTop = 308;
            yield return null;
            Assert.AreEqual(1, bar.ComputedStyle.opacity, 0.001f);

            // A length measures from the start of the range at both ends.
            bar.Style["animation-range"] = "100px 300px";
            scroll.ScrollTop = 200;
            yield return null;
            yield return null;
            Assert.AreEqual(0.5f, bar.ComputedStyle.opacity, 0.01f);

            // A scroll timeline has the one range, so a name that carves up a view timeline is the
            // whole of this one.
            bar.Style["animation-range"] = "entry";
            scroll.ScrollTop = 220;
            yield return null;
            yield return null;
            Assert.AreEqual(0.5f, bar.ComputedStyle.opacity, 0.01f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator TheParsedFormsAndWhatTheAnimationShorthandResets()
        {
            yield return null;

            var subject = Q("#subject");

            var timeline = subject.ComputedStyle.animationTimeline.Get(0);
            Assert.AreEqual(AnimationTimelineKind.View, timeline.Kind);
            Assert.AreEqual(TimelineAxis.Block, timeline.Axis);

            subject.Style["animation-timeline"] = "view(inline 10px 20%)";
            yield return null;

            timeline = subject.ComputedStyle.animationTimeline.Get(0);
            Assert.AreEqual(TimelineAxis.Inline, timeline.Axis);
            Assert.AreEqual(YogaUnit.Point, timeline.Inset.X.Unit);
            Assert.AreEqual(10, timeline.Inset.X.Value, 0.001f);
            Assert.AreEqual(YogaUnit.Percent, timeline.Inset.Y.Unit);
            Assert.AreEqual(20, timeline.Inset.Y.Value, 0.001f);

            // A range name on its own covers the whole of that range, so both ends take it.
            subject.Style["animation-range"] = "entry";
            yield return null;

            Assert.AreEqual(TimelineRangeName.Entry, subject.ComputedStyle.animationRangeStart.Get(0).Name);
            Assert.AreEqual(TimelineRangeName.Entry, subject.ComputedStyle.animationRangeEnd.Get(0).Name);
            Assert.AreEqual(YogaUnit.Undefined, subject.ComputedStyle.animationRangeStart.Get(0).Offset.Unit);

            // Anything else leaves the end at normal, which is the far edge of the whole timeline.
            subject.Style["animation-range"] = "20%";
            yield return null;

            Assert.AreEqual(TimelineRangeName.Normal, subject.ComputedStyle.animationRangeStart.Get(0).Name);
            Assert.AreEqual(20, subject.ComputedStyle.animationRangeStart.Get(0).Offset.Value, 0.001f);
            Assert.AreEqual(TimelineRangeName.Normal, subject.ComputedStyle.animationRangeEnd.Get(0).Name);
            Assert.AreEqual(YogaUnit.Undefined, subject.ComputedStyle.animationRangeEnd.Get(0).Offset.Unit);

            subject.Style["animation-range-end"] = "exit-crossing 25%";
            yield return null;

            Assert.AreEqual(TimelineRangeName.ExitCrossing, subject.ComputedStyle.animationRangeEnd.Get(0).Name);
            Assert.AreEqual(25, subject.ComputedStyle.animationRangeEnd.Get(0).Offset.Value, 0.001f);

            // The shorthand takes neither a timeline nor a range, so it resets both the way it
            // resets every other sub-property it leaves out.
            subject.Style["animation"] = "fade 1s";
            yield return null;

            Assert.AreEqual(AnimationTimelineKind.Auto, subject.ComputedStyle.animationTimeline.Get(0).Kind);
            Assert.AreEqual(TimelineRangeName.Normal, subject.ComputedStyle.animationRangeStart.Get(0).Name);
            Assert.AreEqual(YogaUnit.Undefined, subject.ComputedStyle.animationRangeEnd.Get(0).Offset.Unit);
        }
    }
}
