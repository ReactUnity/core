using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.Types;

namespace ReactUnity.Tests
{
    /// <summary>
    /// The grammars of <c>scroll-snap-type</c>, <c>scroll-snap-align</c> and <c>scroll-behavior</c>.
    /// What the container then does with them is <see cref="ScrollSnapTests"/>.
    /// </summary>
    public class ScrollSnapParsingTests : TestBase
    {
        public ScrollSnapParsingTests(JavascriptEngineType engineType) : base(engineType) { }

        const string BaseScript = @"
            function App() {
                return <view id='test' />;
            }
        ";

        const string NestedScript = @"
            function App() {
                return <view id='test'><view id='child' /></view>;
            }
        ";

        ScrollSnapType Type => Q("#test").ComputedStyle.scrollSnapType;
        ScrollSnapAlign Align => Q("#test").ComputedStyle.scrollSnapAlign;
        ScrollBehavior Behavior => Q("#test").ComputedStyle.scrollBehavior;

        [UGUITest(Script = BaseScript)]
        public IEnumerator SnapTypeTakesAnAxisAndAnOptionalStrictness()
        {
            yield return null;
            Assert.AreEqual(ScrollSnapType.None, Type);

            InsertStyle(@"#test { scroll-snap-type: y mandatory; }");
            yield return null;
            Assert.AreEqual(ScrollSnapAxis.Y, Type.Axis);
            Assert.IsTrue(Type.Mandatory);

            // The strictness is optional, and CSS's default for it is `proximity`.
            InsertStyle(@"#test { scroll-snap-type: x; }");
            yield return null;
            Assert.AreEqual(ScrollSnapAxis.X, Type.Axis);
            Assert.IsFalse(Type.Mandatory);

            InsertStyle(@"#test { scroll-snap-type: both proximity; }");
            yield return null;
            Assert.AreEqual(ScrollSnapAxis.Both, Type.Axis);
            Assert.IsFalse(Type.Mandatory);

            InsertStyle(@"#test { scroll-snap-type: none; }");
            yield return null;
            Assert.AreEqual(ScrollSnapType.None, Type);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator TheLogicalAxesAreThePhysicalOnes()
        {
            yield return null;

            // There are no writing modes here, so `block` is the vertical axis and `inline` the other.
            InsertStyle(@"#test { scroll-snap-type: block mandatory; }");
            yield return null;
            Assert.AreEqual(ScrollSnapAxis.Y, Type.Axis);

            InsertStyle(@"#test { scroll-snap-type: inline mandatory; }");
            yield return null;
            Assert.AreEqual(ScrollSnapAxis.X, Type.Axis);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator ASnapTypeWithoutAnAxisIsNotAValue()
        {
            yield return null;

            InsertStyle(@"#test { scroll-snap-type: y mandatory; }");
            yield return null;
            Assert.AreEqual(ScrollSnapAxis.Y, Type.Axis);

            // A bare strictness names nothing to snap, and neither of these is a value at all -- so
            // the declaration is dropped and the one before it stands.
            InsertStyle(@"#test { scroll-snap-type: mandatory; }", 1);
            yield return null;
            Assert.AreEqual(ScrollSnapAxis.Y, Type.Axis);

            InsertStyle(@"#test { scroll-snap-type: y sometimes; }", 2);
            yield return null;
            Assert.AreEqual(ScrollSnapAxis.Y, Type.Axis);

            InsertStyle(@"#test { scroll-snap-type: x y; }", 3);
            yield return null;
            Assert.AreEqual(ScrollSnapAxis.Y, Type.Axis);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator SnapAlignIsOneAlignmentPerAxis()
        {
            yield return null;
            Assert.AreEqual(ScrollSnapAlign.None, Align);

            // One value covers both axes.
            InsertStyle(@"#test { scroll-snap-align: center; }");
            yield return null;
            Assert.AreEqual(ScrollSnapAlignment.Center, Align.Block);
            Assert.AreEqual(ScrollSnapAlignment.Center, Align.Inline);

            // Two are block first, as every logical pair is.
            InsertStyle(@"#test { scroll-snap-align: start end; }");
            yield return null;
            Assert.AreEqual(ScrollSnapAlignment.Start, Align.Block);
            Assert.AreEqual(ScrollSnapAlignment.End, Align.Inline);

            InsertStyle(@"#test { scroll-snap-align: none center; }");
            yield return null;
            Assert.AreEqual(ScrollSnapAlignment.None, Align.Block);
            Assert.AreEqual(ScrollSnapAlignment.Center, Align.Inline);

            InsertStyle(@"#test { scroll-snap-align: none; }");
            yield return null;
            Assert.AreEqual(ScrollSnapAlign.None, Align);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator ScrollBehaviorIsAutoOrSmooth()
        {
            yield return null;
            Assert.AreEqual(ScrollBehavior.Auto, Behavior);

            InsertStyle(@"#test { scroll-behavior: smooth; }");
            yield return null;
            Assert.AreEqual(ScrollBehavior.Smooth, Behavior);

            InsertStyle(@"#test { scroll-behavior: auto; }");
            yield return null;
            Assert.AreEqual(ScrollBehavior.Auto, Behavior);
        }

        [UGUITest(Script = NestedScript)]
        public IEnumerator NoneOfTheThreeIsInherited()
        {
            yield return null;

            InsertStyle(@"#test { scroll-snap-type: y mandatory; scroll-snap-align: center; scroll-behavior: smooth; }");
            yield return null;

            Assert.AreEqual(ScrollSnapAxis.Y, Type.Axis);
            Assert.AreEqual(ScrollSnapAlignment.Center, Align.Block);
            Assert.AreEqual(ScrollBehavior.Smooth, Behavior);

            // A snap type describes one scroll box and an alignment one item in it, so neither is any
            // of a child's business -- and CSS inherits none of the three.
            var child = Q("#child").ComputedStyle;
            Assert.AreEqual(ScrollSnapType.None, child.scrollSnapType);
            Assert.AreEqual(ScrollSnapAlign.None, child.scrollSnapAlign);
            Assert.AreEqual(ScrollBehavior.Auto, child.scrollBehavior);
        }
    }
}
