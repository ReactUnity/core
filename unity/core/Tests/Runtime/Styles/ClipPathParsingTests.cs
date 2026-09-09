using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.Types;
using UnityEngine;
using Yoga;

namespace ReactUnity.Tests
{
    /// <summary>
    /// The `clip-path` basic-shape grammar, and what each shape resolves to against a known box.
    /// Resolution is tested alongside parsing because both the shader uniforms and hit testing go
    /// through <see cref="ClipPath.Resolve"/> -- a value parsed right but resolved wrong clips the
    /// wrong pixels either way.
    /// </summary>
    public class ClipPathParsingTests : TestBase
    {
        public ClipPathParsingTests(JavascriptEngineType engineType) : base(engineType) { }

        const string BaseScript = @"
            function App() {
                return <view id='test' />;
            }
        ";

        ClipPath Clip => Q("#test").ComputedStyle.clipPath;

        [UGUITest(Script = BaseScript)]
        public IEnumerator NoneIsTheInitialValueAndTheKeyword()
        {
            yield return null;

            Assert.AreEqual(ClipPathKind.None, Clip.Kind);

            InsertStyle(@"#test { clip-path: circle(40%); }");
            yield return null;
            Assert.AreEqual(ClipPathKind.Circle, Clip.Kind);

            InsertStyle(@"#test { clip-path: none; }");
            yield return null;
            Assert.AreEqual(ClipPathKind.None, Clip.Kind);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator InsetTakesTheOneToFourEdgeShorthand()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: inset(10px); }");
            yield return null;
            var clip = Clip;
            Assert.AreEqual(ClipPathKind.Inset, clip.Kind);
            Assert.AreEqual(YogaValue.Point(10), clip.Top);
            Assert.AreEqual(YogaValue.Point(10), clip.Left);

            InsertStyle(@"#test { clip-path: inset(1px 2px); }");
            yield return null;
            clip = Clip;
            Assert.AreEqual(YogaValue.Point(1), clip.Top);
            Assert.AreEqual(YogaValue.Point(2), clip.Right);
            Assert.AreEqual(YogaValue.Point(1), clip.Bottom);
            Assert.AreEqual(YogaValue.Point(2), clip.Left);

            InsertStyle(@"#test { clip-path: inset(1px 2px 3px 4px); }");
            yield return null;
            clip = Clip;
            Assert.AreEqual(YogaValue.Point(1), clip.Top);
            Assert.AreEqual(YogaValue.Point(2), clip.Right);
            Assert.AreEqual(YogaValue.Point(3), clip.Bottom);
            Assert.AreEqual(YogaValue.Point(4), clip.Left);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator InsetResolvesTopFromTheTopEdge()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: inset(10px 20px 30px 40px); }");
            yield return null;

            var box = Clip.Resolve(new Vector2(200, 100)).Box;

            // y grows upwards here, so `top: 10px` is the box's *upper* edge at 90.
            Assert.AreEqual(40f, box.xMin, 0.001f);
            Assert.AreEqual(180f, box.xMax, 0.001f);
            Assert.AreEqual(30f, box.yMin, 0.001f);
            Assert.AreEqual(90f, box.yMax, 0.001f);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator InsetRoundTakesTheBorderRadiusGrammar()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: inset(0 round 10px); }");
            yield return null;
            var clip = Clip;
            Assert.AreEqual(new YogaValue2(YogaValue.Point(10), YogaValue.Point(10)), clip.TopLeftRadius);
            Assert.AreEqual(new YogaValue2(YogaValue.Point(10), YogaValue.Point(10)), clip.BottomRightRadius);

            InsertStyle(@"#test { clip-path: inset(0 round 10px 20px 30px 40px / 5px); }");
            yield return null;
            clip = Clip;
            Assert.AreEqual(new YogaValue2(YogaValue.Point(10), YogaValue.Point(5)), clip.TopLeftRadius);
            Assert.AreEqual(new YogaValue2(YogaValue.Point(20), YogaValue.Point(5)), clip.TopRightRadius);
            Assert.AreEqual(new YogaValue2(YogaValue.Point(30), YogaValue.Point(5)), clip.BottomRightRadius);
            Assert.AreEqual(new YogaValue2(YogaValue.Point(40), YogaValue.Point(5)), clip.BottomLeftRadius);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator RadiiThatOverflowASideAreScaledDownTogether()
        {
            yield return null;

            // Two 100% corners on a 200-wide box want the whole side each, so both halve -- the
            // reduction border-radius gets, which is what makes this a stadium.
            InsertStyle(@"#test { clip-path: inset(0 round 100%); }");
            yield return null;

            var resolved = Clip.Resolve(new Vector2(200, 100));
            Assert.AreEqual(100f, resolved.RadiiX.x, 0.001f);
            Assert.AreEqual(50f, resolved.RadiiY.x, 0.001f);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator CircleDefaultsToClosestSideAtTheCentre()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: circle(); }");
            yield return null;
            var clip = Clip;
            Assert.AreEqual(ClipPathKind.Circle, clip.Kind);
            Assert.AreEqual(ClipRadiusExtent.ClosestSide, clip.ExtentX);

            var resolved = clip.Resolve(new Vector2(200, 100));
            Assert.AreEqual(new Vector2(100, 50), resolved.Center);
            Assert.AreEqual(50f, resolved.Radius.x, 0.001f);
            Assert.AreEqual(50f, resolved.Radius.y, 0.001f);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator CircleTakesAnExtentKeywordAndAPosition()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: circle(farthest-side at 25% 100%); }");
            yield return null;

            var clip = Clip;
            Assert.AreEqual(ClipRadiusExtent.FarthestSide, clip.ExtentX);

            // A CSS position measures y from the top, and the resolved centre from the bottom.
            var resolved = clip.Resolve(new Vector2(200, 100));
            Assert.AreEqual(new Vector2(50, 0), resolved.Center);

            // The farthest of all four sides, not one per axis -- a circle has a single radius.
            Assert.AreEqual(150f, resolved.Radius.x, 0.001f);
            Assert.AreEqual(150f, resolved.Radius.y, 0.001f);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator ABareAtPositionIsItsOwnArgument()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: circle(at left top); }");
            yield return null;

            var resolved = Clip.Resolve(new Vector2(200, 100));
            Assert.AreEqual(new Vector2(0, 100), resolved.Center);
            // Closest side from a corner is no radius at all, which is the shape CSS describes.
            Assert.AreEqual(0f, resolved.Radius.x, 0.001f);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator ACirclePercentageResolvesAgainstTheDiagonal()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: circle(50%); }");
            yield return null;

            // Half of sqrt((w^2 + h^2) / 2), which is 141.42 on a 120x160 box -- so neither half a
            // side (60 or 80) nor half the diagonal (100).
            var resolved = Clip.Resolve(new Vector2(120, 160));
            Assert.AreEqual(70.7107f, resolved.Radius.x, 0.001f);
            Assert.AreEqual(70.7107f, resolved.Radius.y, 0.001f);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator EllipseTakesARadiusPerAxis()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: ellipse(30px 40% at center); }");
            yield return null;

            var clip = Clip;
            Assert.AreEqual(ClipPathKind.Ellipse, clip.Kind);

            var resolved = clip.Resolve(new Vector2(200, 100));
            Assert.AreEqual(30f, resolved.Radius.x, 0.001f);
            Assert.AreEqual(40f, resolved.Radius.y, 0.001f);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator PolygonClosesItsOwnRing()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: polygon(50% 0%, 100% 100%, 0% 100%); }");
            yield return null;

            var clip = Clip;
            Assert.AreEqual(ClipPathKind.Polygon, clip.Kind);
            Assert.AreEqual(3, clip.Points.Length);
            Assert.IsFalse(clip.EvenOdd);

            var ring = clip.Resolve(new Vector2(200, 100)).Ring;
            Assert.AreEqual(4, ring.Length);
            Assert.AreEqual(new Vector2(100, 100), ring[0]);
            Assert.AreEqual(new Vector2(200, 0), ring[1]);
            Assert.AreEqual(new Vector2(0, 0), ring[2]);
            Assert.AreEqual(ring[0], ring[3]);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator PolygonReadsAFillRuleAheadOfThePoints()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%); }");
            yield return null;
            var clip = Clip;
            Assert.AreEqual(4, clip.Points.Length);
            Assert.IsTrue(clip.EvenOdd);

            InsertStyle(@"#test { clip-path: polygon(nonzero, 0 0, 100% 0, 50% 100%); }");
            yield return null;
            clip = Clip;
            Assert.AreEqual(3, clip.Points.Length);
            Assert.IsFalse(clip.EvenOdd);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator FewerThanThreePointsIsNotAShape()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: polygon(0 0, 100% 100%); }");
            yield return null;
            Assert.AreEqual(ClipPathKind.None, Clip.Kind);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator AGeometryBoxParsesAndIsDropped()
        {
            yield return null;

            // Only the border box is drawn against, so the keyword is accepted rather than taking
            // the declaration down with it.
            InsertStyle(@"#test { clip-path: padding-box circle(30px); }");
            yield return null;

            var clip = Clip;
            Assert.AreEqual(ClipPathKind.Circle, clip.Kind);
            Assert.AreEqual(30f, clip.Resolve(new Vector2(200, 100)).Radius.x, 0.001f);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator ABadShapeLeavesTheDeclarationsAroundItAlone()
        {
            yield return null;

            InsertStyle(@"#test { color: red; clip-path: banana(2px); opacity: 0.5; }");
            yield return null;

            var view = Q("#test");
            Assert.AreEqual(Color.red, view.ComputedStyle.color);
            Assert.AreEqual(0.5f, view.ComputedStyle.opacity);
            Assert.AreEqual(ClipPathKind.None, view.ComputedStyle.clipPath.Kind);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator TwoShapesOfOneKindInterpolate()
        {
            yield return null;

            var from = ClipPath.Circle(YogaValue.Point(10), ClipRadiusExtent.Length, YogaValue2.Center);
            var to = ClipPath.Circle(YogaValue.Point(30), ClipRadiusExtent.Length, YogaValue2.Center);

            var half = from.Interpolate(to, 0.5f) as ClipPath;
            Assert.AreEqual(YogaValue.Point(20), half.RadiusX);

            // Different kinds have nothing in common to move along, so CSS makes the change discrete.
            var square = ClipPath.Inset(YogaValue.Point(0), YogaValue.Point(0), YogaValue.Point(0), YogaValue.Point(0));
            Assert.AreEqual(ClipPathKind.Circle, (from.Interpolate(square, 0.25f) as ClipPath).Kind);
            Assert.AreEqual(ClipPathKind.Inset, (from.Interpolate(square, 0.75f) as ClipPath).Kind);
        }
    }
}
