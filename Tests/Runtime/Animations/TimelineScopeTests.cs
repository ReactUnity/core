using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;

namespace ReactUnity.Tests
{
    public class TimelineScopeTests : TestBase
    {
        // #header is not under either scroll, so without a scope it can see neither. #sc holds 700px
        // of content in a 200px view, which is a scrollable range of 500, and #card sits 300px down
        // it, so the card covers scroll positions 100 to 400.
        const string BaseScript = @"
            function App() {
                return <view id='root'>
                    <view id='header' style={{ height: 20, flexShrink: 0 }} />
                    <scroll id='sc' style={{ width: 200, height: 200, flexShrink: 0 }}>
                        <view id='top' style={{ height: 300, flexShrink: 0 }} />
                        <view id='card' style={{ height: 100, flexShrink: 0 }} />
                        <view id='bottom' style={{ height: 300, flexShrink: 0 }} />
                    </scroll>
                    <scroll id='other' style={{ width: 200, height: 200, flexShrink: 0 }}>
                        <view id='pad' style={{ height: 600, flexShrink: 0 }} />
                    </scroll>
                </view>;
            }
        ";

        const string BaseStyle = @"
            @keyframes fade {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            #root { timeline-scope: --feed; }
            #sc { scroll-timeline: --feed; }

            #header {
                opacity: 0.5;
                animation-name: fade;
                animation-timeline: --feed;
                animation-timing-function: linear;
            }
        ";

        public TimelineScopeTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator AScopeLetsAnElementReadATimelineFromAnotherSubtree()
        {
            yield return null;
            yield return null;

            var scroll = Q("#sc");
            var header = Q("#header");

            Assert.AreEqual(500, scroll.ScrollHeight - scroll.ClientHeight, 0.5f);
            Assert.AreEqual(0, header.ComputedStyle.opacity, 0.001f);

            scroll.ScrollTop = 500;
            yield return null;
            Assert.AreEqual(1, header.ComputedStyle.opacity, 0.001f);

            // Without the scope the name is declared nowhere above #header, so it is inactive again.
            Q("#root").Style["timeline-scope"] = "none";
            yield return null;
            yield return null;
            Assert.AreEqual(0.5f, header.ComputedStyle.opacity, 0.001f);

            Q("#root").Style["timeline-scope"] = "--feed";
            yield return null;
            yield return null;
            Assert.AreEqual(1, header.ComputedStyle.opacity, 0.001f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator TwoTimelinesAnsweringToAScopedNameAreNoTimeline()
        {
            yield return null;
            yield return null;

            var scroll = Q("#sc");
            var header = Q("#header");

            scroll.ScrollTop = 500;
            yield return null;
            Assert.AreEqual(1, header.ComputedStyle.opacity, 0.001f);

            Q("#other").Style["scroll-timeline-name"] = "--feed";
            yield return null;
            yield return null;
            Assert.AreEqual(0.5f, header.ComputedStyle.opacity, 0.001f);

            Q("#other").Style["scroll-timeline-name"] = "none";
            yield return null;
            yield return null;
            Assert.AreEqual(1, header.ComputedStyle.opacity, 0.001f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator AScopedNameNothingDeclaresIsInactive()
        {
            yield return null;
            yield return null;

            var scroll = Q("#sc");
            var header = Q("#header");

            scroll.ScrollTop = 500;
            yield return null;
            Assert.AreEqual(1, header.ComputedStyle.opacity, 0.001f);

            // The scope still claims the name, so the lookup stops there rather than carrying on.
            scroll.Style["scroll-timeline-name"] = "--elsewhere";
            yield return null;
            yield return null;
            Assert.AreEqual(0.5f, header.ComputedStyle.opacity, 0.001f);
        }

        const string ViewStyle = @"
            @keyframes fade {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            #root { timeline-scope: --card; }
            #card { view-timeline: --card block; }

            #header {
                opacity: 0.5;
                animation-name: fade;
                animation-timeline: --card;
                animation-timing-function: linear;
            }
        ";

        [UGUITest(Script = BaseScript, Style = ViewStyle)]
        public IEnumerator AScopeCarriesAViewTimelineTheSameWay()
        {
            yield return null;
            yield return null;

            var scroll = Q("#sc");
            var header = Q("#header");

            // The card is still below the scrollport, which is before its cover range begins.
            Assert.AreEqual(0, header.ComputedStyle.opacity, 0.001f);

            scroll.ScrollTop = 250;
            yield return null;
            Assert.AreEqual(0.5f, header.ComputedStyle.opacity, 0.01f);

            scroll.ScrollTop = 400;
            yield return null;
            Assert.AreEqual(1, header.ComputedStyle.opacity, 0.001f);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator TheParsedForms()
        {
            yield return null;

            var root = Q("#root");

            Assert.AreEqual("--feed", root.ComputedStyle.timelineScope);

            // Several names are kept as one space-separated string.
            root.Style["timeline-scope"] = "--feed, --card";
            yield return null;
            Assert.AreEqual("--feed --card", root.ComputedStyle.timelineScope);

            root.Style["timeline-scope"] = "none";
            yield return null;
            Assert.IsNull(root.ComputedStyle.timelineScope);

            // A scoped timeline is a dashed identifier, so a bare word names nothing and the
            // declaration is dropped, which leaves the one before it standing.
            root.Style["timeline-scope"] = "--kept";
            yield return null;
            root.Style["timeline-scope"] = "feed";
            yield return null;
            Assert.AreEqual("--kept", root.ComputedStyle.timelineScope);
        }
    }
}
