using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;

namespace ReactUnity.Tests
{
    public class ScrollSnapTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                return <scroll id='sc'>
                    <view className='item' id='i0'></view>
                    <view className='item' id='i1'></view>
                    <view className='item' id='i2'></view>
                    <view className='item' id='i3'></view>
                    <view className='item' id='i4'></view>
                </scroll>;
            }
        ";

        // A 200 tall port over 500 of content, so the offsets run 0 to 300 and a `start` snap on every
        // item lands on 0, 100, 200 and 300 -- the last two items sharing the end of the travel.
        const string BaseStyle = @"
            #sc {
                width: 200px;
                height: 200px;
            }
            .item {
                flex-shrink: 0;
                height: 100px;
            }
        ";

        public ScrollComponent Scroll => Q("#sc") as ScrollComponent;

        public ScrollSnapTests(JavascriptEngineType engineType) : base(engineType) { }

        /// <summary>
        /// Snaps animate like any other scroll, which every test here but the smooth one would rather
        /// not wait for.
        /// </summary>
        private void SnapInstantly() => Scroll.SetProperty("smoothness", 0f);

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator AProximitySnapTakesTheItemItIsLeftNear()
        {
            InsertStyle("#sc { scroll-snap-type: y proximity; } .item { scroll-snap-align: start; }");
            yield return null;
            SnapInstantly();

            Scroll.ScrollTop = 120;
            yield return null;
            Assert.AreEqual(100, Scroll.ScrollTop, 1, "the item 20 away should have taken it");

            Scroll.ScrollTop = 290;
            yield return null;
            Assert.AreEqual(300, Scroll.ScrollTop, 1);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ProximityLeavesAScrollThatIsNearNothingAlone()
        {
            // Only the first item snaps, so past half a port from the top there is nothing in reach.
            InsertStyle("#sc { scroll-snap-type: y proximity; } #i0 { scroll-snap-align: start; }");
            yield return null;
            SnapInstantly();

            Scroll.ScrollTop = 60;
            yield return null;
            Assert.AreEqual(0, Scroll.ScrollTop, 1, "60 is within half a port of the top");

            Scroll.ScrollTop = 250;
            yield return null;
            Assert.AreEqual(250, Scroll.ScrollTop, 1, "and 250 is not, so the scroll keeps it");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator MandatoryTakesTheNearestOneHoweverFarItIs()
        {
            InsertStyle("#sc { scroll-snap-type: y mandatory; } #i0 { scroll-snap-align: start; }");
            yield return null;
            SnapInstantly();

            Scroll.ScrollTop = 250;
            yield return null;
            Assert.AreEqual(0, Scroll.ScrollTop, 1, "the only snap point wins whatever the distance");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator AlignmentPicksWhichEdgesMeet()
        {
            InsertStyle("#sc { scroll-snap-type: y mandatory; } #i1 { scroll-snap-align: start; }");
            yield return null;
            SnapInstantly();

            // The second item's box runs 100 to 200 in a 200 tall port.
            Scroll.ScrollTop = 130;
            yield return null;
            Assert.AreEqual(100, Scroll.ScrollTop, 1, "start puts the item's top at the port's top");

            InsertStyle("#i1 { scroll-snap-align: center; }", 1);
            yield return null;
            Scroll.ScrollTop = 130;
            yield return null;
            Assert.AreEqual(50, Scroll.ScrollTop, 1, "center puts the item's middle at the port's middle");

            InsertStyle("#i1 { scroll-snap-align: end; }", 2);
            yield return null;
            Scroll.ScrollTop = 130;
            yield return null;
            Assert.AreEqual(0, Scroll.ScrollTop, 1, "end puts the item's bottom at the port's bottom");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator OnlyTheNamedAxisSnaps()
        {
            InsertStyle(@"
                #sc { scroll-snap-type: x mandatory; }
                .item { width: 400px; }
                #i0 { scroll-snap-align: start; }
            ");
            yield return null;
            SnapInstantly();

            Scroll.ScrollTop = 250;
            Scroll.ScrollLeft = 150;
            yield return null;

            Assert.AreEqual(0, Scroll.ScrollLeft, 1, "the x axis snaps back to the only point on it");
            Assert.AreEqual(250, Scroll.ScrollTop, 1, "and the y axis is not asked to");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator NothingSnapsWithoutAnAlignedChild()
        {
            InsertStyle("#sc { scroll-snap-type: y mandatory; }");
            yield return null;
            SnapInstantly();

            Scroll.ScrollTop = 137;
            yield return null;
            Assert.AreEqual(137, Scroll.ScrollTop, 1, "a snap type with no targets is nothing to snap to");
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator DroppingTheSnapTypeStopsSnapping()
        {
            InsertStyle("#sc { scroll-snap-type: y mandatory; } .item { scroll-snap-align: start; }");
            yield return null;
            SnapInstantly();

            Scroll.ScrollTop = 120;
            yield return null;
            Assert.AreEqual(100, Scroll.ScrollTop, 1);

            InsertStyle("#sc { scroll-snap-type: none; }", 1);
            yield return null;

            Scroll.ScrollTop = 120;
            yield return null;
            Assert.AreEqual(120, Scroll.ScrollTop, 1);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator TheSnapportIsThePaddingBox()
        {
            // A `start` snap on the first child of a padded container is the top of the travel, not the
            // offset that would scroll the padding away.
            InsertStyle(@"
                #sc { scroll-snap-type: y mandatory; padding-top: 30px; }
                #i0 { scroll-snap-align: start; }
            ");
            yield return null;
            SnapInstantly();

            Scroll.ScrollTop = 20;
            yield return null;
            Assert.AreEqual(0, Scroll.ScrollTop, 1);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle, RealTimer = true)]
        public IEnumerator ScrollBehaviorSmoothAnimatesAnAskedForScroll()
        {
            yield return null;

            // `auto` is a jump, which is what every other test here relies on.
            Scroll.ScrollTop = 200;
            Assert.AreEqual(200, Scroll.ScrollTop, 1);

            InsertStyle("#sc { scroll-behavior: smooth; }");
            yield return null;

            Scroll.ScrollTop = 0;
            Assert.AreEqual(200, Scroll.ScrollTop, 1, "the scroll has not moved on the frame it was asked");

            yield return AdvanceTime(0.15f);
            var midway = Scroll.ScrollTop;
            Assert.Greater(midway, 10, "half way through it is between the two");
            Assert.Less(midway, 190);

            yield return AdvanceTime(0.25f);
            Assert.AreEqual(0, Scroll.ScrollTop, 1, "and it arrives");
        }
    }
}
