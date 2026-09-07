using System.Collections;
using System.Linq;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.Types;
using UnityEngine;
using Yoga;

namespace ReactUnity.Tests
{
    public class ContainerQueryTests : TestBase
    {
        public ContainerQueryTests(JavascriptEngineType engineType) : base(engineType) { }

        const string SizeScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='outer' style={{ width: globals.outerWidth || 600, height: 300 }}>
                    <view id='card' style={{ width: globals.cardWidth || 300, height: 100 }}>
                        <view id='a' className='q' />
                        <view id='b' className='q' />
                        <view id='c' className='q' />
                        <view id='d' className='q' />
                        <view id='e' className='q' />
                        <view id='f' className='q' />
                        <view id='g' className='q' />
                    </view>
                </view>;
            }
        ";

        const string SizeStyle = @"
            #outer { container: outer / size; }
            #card { container-type: inline-size; }
            .q { color: black; }

            @container (min-width: 200px) { #a { color: red; } }
            @container outer (width > 500px) { #b { color: red; } }
            @container (height < 150px) { #c { color: red; } }
            @container outer (400px <= width < 800px) { #d { color: red; } }
            @container not (orientation: portrait) { #e { color: red; } }
            @container (aspect-ratio > 1.5) and (width >= 300px) { #f { color: red; } }
            @container (width >= 300px) or (width < 0px) { #g { color: red; } }
        ";

        [UGUITest(Script = SizeScript, Style = SizeStyle)]
        public IEnumerator SizeQueriesReadTheNearestEligibleContainerAndFollowItsSize()
        {
            yield return null;
            yield return null;

            var outer = Q("#outer");
            Assert.AreEqual("outer", outer.ComputedStyle.containerName);
            Assert.AreEqual(ContainerType.Size, outer.ComputedStyle.containerType);
            Assert.AreEqual(ContainerType.InlineSize, Q("#card").ComputedStyle.containerType);

            Assert.AreEqual(Color.red, Q("#a").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#b").ComputedStyle.color);
            // The card answers for its width only, so its height is not what a height query reads.
            Assert.AreEqual(Color.black, Q("#c").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#d").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#e").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#f").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#g").ComputedStyle.color);

            Globals["cardWidth"] = 150;
            yield return null;
            yield return null;
            Assert.AreEqual(Color.black, Q("#a").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#b").ComputedStyle.color);

            Globals["outerWidth"] = 400;
            yield return null;
            yield return null;
            Assert.AreEqual(Color.black, Q("#b").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#d").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#f").ComputedStyle.color);
            // The unnamed query reads the card, which is 150 wide now.
            Assert.AreEqual(Color.black, Q("#g").ComputedStyle.color);

            Globals["outerWidth"] = 300;
            yield return null;
            yield return null;
            Assert.AreEqual(Color.black, Q("#d").ComputedStyle.color);
            // A square is portrait, as it is for a media query, so the negated orientation rule lets go.
            Assert.AreEqual(Color.black, Q("#e").ComputedStyle.color);

            Globals["cardWidth"] = 300;
            yield return null;
            yield return null;
            Assert.AreEqual(Color.red, Q("#a").ComputedStyle.color);
        }

        const string NestedStyle = @"
            #outer { container: outer / size; }
            #card { container-type: inline-size; }
            .q { color: black; }

            #a { @container (min-width: 200px) { color: red; } }
            @media (min-width: 1px) { @container outer (width > 500px) { #b { color: red; } } }
            @container outer (width > 500px) { @container (min-width: 200px) { #c { color: red; } } }
            @container outer (width > 500px) { @container (min-width: 999px) { #d { color: red; } } }
            @container (min-width: 200px) { #e { color: red !important; } }
            #e { color: blue; }
        ";

        [UGUITest(Script = SizeScript, Style = NestedStyle)]
        public IEnumerator ContainerQueriesNestInStyleRulesMediaQueriesAndEachOther()
        {
            yield return null;
            yield return null;

            Assert.AreEqual(Color.red, Q("#a").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#b").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#c").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#d").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#e").ComputedStyle.color);

            Globals["cardWidth"] = 150;
            yield return null;
            yield return null;
            Assert.AreEqual(Color.black, Q("#a").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#c").ComputedStyle.color);
            Assert.AreEqual(Color.blue, Q("#e").ComputedStyle.color);
        }

        const string StyleScript = @"
            function App() {
                return <view id='theme'>
                    <view id='s1' className='q' />
                    <view id='s2' className='q' />
                    <view id='s3' className='q' />
                    <view id='s4' className='q' />
                    <view id='s5' className='q' />
                    <view id='s6' className='q' />
                    <view id='s7' className='q' />
                </view>;
            }
        ";

        const string StyleStyle = @"
            #theme { --theme: dark; --accent: red; color: red; container-name: theme; }
            .q { color: black; }

            @container style(--theme: dark) { #s1 { color: blue; } }
            @container theme style(--accent) { #s2 { color: blue; } }
            @container style(--missing) { #s3 { color: blue; } }
            @container style(color: red) { #s4 { color: blue; } }
            @container style(--theme: dark) and style(--accent: blue) { #s5 { color: blue; } }
            @container style(--theme: light) or style(--accent: red) { #s6 { color: blue; } }
            @container style(opacity: 0.5) { #s7 { color: blue; } }
        ";

        [UGUITest(Script = StyleScript, Style = StyleStyle)]
        public IEnumerator StyleQueriesReadTheContainerAndFollowItsChanges()
        {
            yield return null;
            var theme = Q("#theme");

            Assert.AreEqual(Color.blue, Q("#s1").ComputedStyle.color);
            Assert.AreEqual(Color.blue, Q("#s2").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#s3").ComputedStyle.color);
            Assert.AreEqual(Color.blue, Q("#s4").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#s5").ComputedStyle.color);
            Assert.AreEqual(Color.blue, Q("#s6").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#s7").ComputedStyle.color);

            theme.Style.Set("--theme", "light");
            yield return null;
            Assert.AreEqual(Color.black, Q("#s1").ComputedStyle.color);
            Assert.AreEqual(Color.blue, Q("#s6").ComputedStyle.color);

            theme.Style.Set("--accent", "blue");
            yield return null;
            Assert.AreEqual(Color.blue, Q("#s2").ComputedStyle.color);
            Assert.AreEqual(Color.blue, Q("#s6").ComputedStyle.color);

            theme.Style.Set("--theme", "dark");
            yield return null;
            Assert.AreEqual(Color.blue, Q("#s1").ComputedStyle.color);
            Assert.AreEqual(Color.blue, Q("#s5").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#s6").ComputedStyle.color);

            // Opacity is not inherited, so this reaches the children only because they query it.
            theme.Style.Set("opacity", 0.5f);
            yield return null;
            Assert.AreEqual(Color.blue, Q("#s7").ComputedStyle.color);

            theme.Style.Set("opacity", 1f);
            yield return null;
            Assert.AreEqual(Color.black, Q("#s7").ComputedStyle.color);
        }

        const string RegisteredScript = @"
            function App() {
                return <view id='theme'>
                    <view id='r1' className='q' />
                    <view id='r2' className='q' />
                    <view id='r3' className='q' />
                </view>;
            }
        ";

        const string RegisteredStyle = @"
            @property --gap { syntax: '<length>'; inherits: true; initial-value: 0px; }
            #theme { font-size: 20px; --gap: 1em; --pad: 1em; container-type: size scroll-state; }
            .q { color: black; }

            @container style(--gap: 20px) { #r1 { color: blue; } }
            @container style(--pad: 20px) { #r2 { color: blue; } }
            @container (width > 0px) { #r3 { color: blue; } }
        ";

        [UGUITest(Script = RegisteredScript, Style = RegisteredStyle)]
        public IEnumerator ARegisteredPropertyComparesByValueAndScrollStateIsAccepted()
        {
            yield return null;
            yield return null;

            // Both keywords are kept; the second is what a scroll-state() query reads.
            Assert.AreEqual(ContainerType.Size | ContainerType.ScrollState, Q("#theme").ComputedStyle.containerType);

            // Registered as a length, so 1em at 20px is 20px; unregistered, the text is what compares.
            Assert.AreEqual(Color.blue, Q("#r1").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#r2").ComputedStyle.color);
            Assert.AreEqual(Color.blue, Q("#r3").ComputedStyle.color);

            Q("#theme").Style.Set("--gap", "30px");
            yield return null;
            Assert.AreEqual(Color.black, Q("#r1").ComputedStyle.color);

            // Alone, it is a scroll-state container and no longer a size one.
            Q("#theme").Style.Set("containerType", "scroll-state");
            yield return null;
            Assert.AreEqual(ContainerType.ScrollState, Q("#theme").ComputedStyle.containerType);
        }

        const string TrackingScript = @"
            function App() {
                return <view id='outer' style={{ width: 300, height: 100 }}>
                    <view id='a' />
                </view>;
            }
        ";

        [UGUITest(Script = TrackingScript, Style = "#outer { container-type: size; }")]
        public IEnumerator AContainerNothingReadsAnyMoreStopsBeingMeasured()
        {
            yield return null;
            var outer = Q("#outer");
            Assert.IsFalse(Context.Style.SizeContainers.Contains(outer));

            var sheet = InsertStyle("@container (min-width: 200px) { #a { color: red; } }");
            yield return null;
            yield return null;
            Assert.AreEqual(Color.red, Q("#a").ComputedStyle.color);
            Assert.IsTrue(Context.Style.SizeContainers.Contains(outer));

            // Removing the sheet restyles the tree, nothing measures the container again, and the next layout drops it.
            Context.RemoveStyle(sheet);
            yield return null;
            yield return null;
            Assert.IsFalse(Context.Style.SizeContainers.Contains(outer));

            // Reading it again lists it once, not twice.
            var again = InsertStyle("@container (min-width: 200px) { #a { color: red; } }");
            yield return null;
            yield return null;
            Assert.AreEqual(1, Context.Style.SizeContainers.Count(x => x == outer));
            Context.RemoveStyle(again);
        }

        const string UnitScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <view id='outer' style={{ width: globals.outerWidth || 400, height: 300 }}>
                        <view id='inner'>
                            <view id='unit' />
                        </view>
                    </view>
                    <view id='free' />
                </>;
            }
        ";

        const string UnitStyle = @"
            #outer { container-type: size; }
            #inner { container-type: inline-size; width: 50%; height: 100%; }
            #unit { width: 50cqw; height: 25cqh; margin-left: 10cqmin; padding-top: 10cqmax; }
            #free { width: 10cqw; }
        ";

        [UGUITest(Script = UnitScript, Style = UnitStyle)]
        public IEnumerator ContainerUnitsMeasureTheNearestSizeContainerPerAxis()
        {
            yield return null;
            yield return null;

            var unit = Q("#unit");
            var layout = unit.Layout;

            // Inner answers for the inline axis at 200; its height is not queryable, so the block axis is outer's 300.
            Assert.AreEqual(100, layout.LayoutWidth, 0.01f);
            Assert.AreEqual(75, layout.LayoutHeight, 0.01f);
            Assert.AreEqual(20, layout.LayoutLeft, 0.01f);
            Assert.AreEqual(30, layout.LayoutGetPadding(YogaEdge.Top), 0.01f);

            // No container at all falls back to the viewport, the way vw would.
            Assert.AreEqual(Host.Width * 0.1f, Q("#free").Layout.LayoutWidth, 0.5f);

            Globals["outerWidth"] = 800;
            yield return null;
            yield return null;

            Assert.AreEqual(200, layout.LayoutWidth, 0.01f);
            Assert.AreEqual(75, layout.LayoutHeight, 0.01f);
            Assert.AreEqual(30, layout.LayoutLeft, 0.01f);
            Assert.AreEqual(40, layout.LayoutGetPadding(YogaEdge.Top), 0.01f);
        }

        const string ScrollScript = @"
            function App() {
                return <scroll id='sc' style={{ width: 200, height: 200 }}>
                    <view id='content' style={{ height: 600, flexShrink: 0 }}>
                        <view id='a' className='q' />
                        <view id='b' className='q' />
                        <view id='c' className='q' />
                        <view id='d' className='q' />
                        <view id='e' className='q' />
                        <view id='f' className='q' />
                        <view id='g' className='q' />
                    </view>
                </scroll>;
            }
        ";

        const string ScrollStyle = @"
            #sc { container-type: scroll-state; }
            .q { color: black; }

            @container scroll-state(scrollable: bottom) { #a { color: red; } }
            @container scroll-state(scrollable: top) { #b { color: red; } }
            @container scroll-state(scrollable: none) { #c { color: red; } }
            @container scroll-state((scrollable: top) and (scrollable: bottom)) { #d { color: red; } }
            @container scroll-state(scrollable) { #e { color: red; } }
            #f { @container scroll-state(not (scrollable: block-end)) { color: red; } }
            @container scroll-state(stuck: top) { #g { color: red; } }
        ";

        [UGUITest(Script = ScrollScript, Style = ScrollStyle)]
        public IEnumerator ScrollStateQueriesFollowTheContainersScrollPosition()
        {
            yield return null;
            yield return null;

            var scroll = Q("#sc");
            Assert.AreEqual(ContainerType.ScrollState, scroll.ComputedStyle.containerType);

            // At the top of 600px of content in a 200px view, only the bottom is left to scroll towards.
            Assert.AreEqual(Color.red, Q("#a").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#b").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#c").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#d").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#e").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#f").ComputedStyle.color);
            // Nothing is sticky, so stuck never holds.
            Assert.AreEqual(Color.black, Q("#g").ComputedStyle.color);

            scroll.ScrollTop = 200;
            yield return null;
            yield return null;

            Assert.AreEqual(Color.red, Q("#a").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#b").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#d").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#f").ComputedStyle.color);

            scroll.ScrollTop = 400;
            yield return null;
            yield return null;

            Assert.AreEqual(Color.black, Q("#a").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#b").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#d").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#e").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#f").ComputedStyle.color);

            // A container that does not declare scroll-state answers no scroll-state query.
            scroll.Style["container-type"] = "normal";
            yield return null;
            yield return null;

            Assert.AreEqual(Color.black, Q("#b").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#e").ComputedStyle.color);
        }
    }
}
