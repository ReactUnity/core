using System.Collections;
using System.Text;
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
        public IEnumerator APolygonMayHaveMorePointsThanTheShaderHoldsAtOnce()
        {
            yield return null;

            // Twenty vertices around a circle, which is past MaxUniformPoints -- the point the list
            // used to be cut off at, for want of anywhere else to put them.
            var points = new StringBuilder();
            for (int i = 0; i < 20; i++)
            {
                var a = i * 2f * Mathf.PI / 20f;
                if (i > 0) points.Append(", ");
                points.Append(Mathf.RoundToInt(50 + 40 * Mathf.Cos(a)));
                points.Append("% ");
                points.Append(Mathf.RoundToInt(50 + 40 * Mathf.Sin(a)));
                points.Append("%");
            }

            InsertStyle("#test { clip-path: polygon(" + points + "); }");
            yield return null;

            var clip = Clip;
            Assert.AreEqual(20, clip.Points.Length);
            Assert.AreEqual(21, clip.Resolve(new Vector2(100, 100)).Contours[0].Length);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator RectGivesEachEdgesPositionFromTheTopLeft()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: rect(10px 180px 70px 40px); }");
            yield return null;

            var clip = Clip;
            Assert.AreEqual(ClipPathKind.Rect, clip.Kind);

            // Each value is where the edge *is* rather than how far in it sits, so `right: 180px`
            // is 20px in from a 200-wide box and not 180.
            var box = clip.Resolve(new Vector2(200, 100)).Box;
            Assert.AreEqual(40f, box.xMin, 0.001f);
            Assert.AreEqual(180f, box.xMax, 0.001f);
            Assert.AreEqual(30f, box.yMin, 0.001f);
            Assert.AreEqual(90f, box.yMax, 0.001f);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator RectTakesAutoForTheBoxsOwnEdge()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: rect(auto auto auto auto); }");
            yield return null;

            var box = Clip.Resolve(new Vector2(200, 100)).Box;
            Assert.AreEqual(0f, box.xMin, 0.001f);
            Assert.AreEqual(200f, box.xMax, 0.001f);
            Assert.AreEqual(0f, box.yMin, 0.001f);
            Assert.AreEqual(100f, box.yMax, 0.001f);

            InsertStyle(@"#test { clip-path: rect(20px auto auto 30px round 8px); }");
            yield return null;

            var resolved = Clip.Resolve(new Vector2(200, 100));
            Assert.AreEqual(30f, resolved.Box.xMin, 0.001f);
            Assert.AreEqual(200f, resolved.Box.xMax, 0.001f);
            Assert.AreEqual(0f, resolved.Box.yMin, 0.001f);
            Assert.AreEqual(80f, resolved.Box.yMax, 0.001f);
            Assert.AreEqual(8f, resolved.RadiiX.x, 0.001f);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator XywhIsACornerAndASize()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: xywh(20px 10px 100px 40px); }");
            yield return null;

            var clip = Clip;
            Assert.AreEqual(ClipPathKind.Xywh, clip.Kind);
            Assert.AreEqual(YogaValue.Point(20), clip.X);
            Assert.AreEqual(YogaValue.Point(100), clip.Width);

            // y is measured down from the top, so a 40-tall rectangle 10 from the top ends at 50.
            var box = clip.Resolve(new Vector2(200, 100)).Box;
            Assert.AreEqual(20f, box.xMin, 0.001f);
            Assert.AreEqual(120f, box.xMax, 0.001f);
            Assert.AreEqual(50f, box.yMin, 0.001f);
            Assert.AreEqual(90f, box.yMax, 0.001f);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator ARectangleThatIsNotFourValuesIsNotAShape()
        {
            yield return null;

            // inset() borrows an opposite side for a value it was not given; neither of the other
            // two has an opposite side to borrow from.
            InsertStyle(@"#test { clip-path: rect(10px 20px); }");
            yield return null;
            Assert.AreEqual(ClipPathKind.None, Clip.Kind);

            InsertStyle(@"#test { clip-path: xywh(1px 2px 3px); }");
            yield return null;
            Assert.AreEqual(ClipPathKind.None, Clip.Kind);

            // And `auto` is rect()'s alone: an inset or a size has nothing to mean by it.
            InsertStyle(@"#test { clip-path: xywh(auto 0 10px 10px); }");
            yield return null;
            Assert.AreEqual(ClipPathKind.None, Clip.Kind);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator PathReadsSvgDataFromTheBoxsTopLeft()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: path('M 0 0 L 100 0 L 100 50 Z'); }");
            yield return null;

            var clip = Clip;
            Assert.AreEqual(ClipPathKind.Path, clip.Kind);
            Assert.AreEqual(4, clip.Commands.Length);
            Assert.AreEqual(ClipPathCommandKind.Move, clip.Commands[0].Kind);
            Assert.AreEqual(ClipPathCommandKind.Close, clip.Commands[3].Kind);

            // Path data is y-down from the top-left corner, where a resolved shape is y-up from the
            // bottom -- so the ring comes back flipped.
            var contours = clip.Resolve(new Vector2(200, 100)).Contours;
            Assert.AreEqual(1, contours.Length);
            Assert.AreEqual(4, contours[0].Length);
            Assert.AreEqual(new Vector2(0, 100), contours[0][0]);
            Assert.AreEqual(new Vector2(100, 100), contours[0][1]);
            Assert.AreEqual(new Vector2(100, 50), contours[0][2]);
            Assert.AreEqual(contours[0][0], contours[0][3]);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator PathFlattensItsCurvesAndKeepsItsFillRule()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: path(evenodd, 'M 0 0 C 40 0 80 40 80 80 Z'); }");
            yield return null;

            var clip = Clip;
            Assert.IsTrue(clip.EvenOdd);
            Assert.AreEqual(ClipPathCommandKind.Cubic, clip.Commands[1].Kind);

            // A curve is a run of segments by the time anything draws it, so the ring carries far
            // more points than the three the commands name -- which is the whole reason a shape
            // this shape cannot ride in the shader's uniform ring.
            var contours = clip.Resolve(new Vector2(200, 200)).Contours;
            Assert.AreEqual(1, contours.Length);
            Assert.Greater(contours[0].Length, ClipPath.MaxUniformPoints);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator PathDataMayUseCommasAndRepeatACommand()
        {
            yield return null;

            // The data's own commas are not the fill rule's, and a repeated coordinate pair after a
            // moveto is a lineto -- both of which is how a minifier writes path data.
            InsertStyle(@"#test { clip-path: path('M0,0 100,0 100,100 Z'); }");
            yield return null;

            var clip = Clip;
            Assert.AreEqual(ClipPathKind.Path, clip.Kind);
            Assert.AreEqual(ClipPathCommandKind.Line, clip.Commands[1].Kind);
            Assert.AreEqual(4, clip.Resolve(new Vector2(200, 200)).Contours[0].Length);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator PathDataHasToOpenWithAMoveto()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: path('L 10 10 L 20 20'); }");
            yield return null;
            Assert.AreEqual(ClipPathKind.None, Clip.Kind);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator ShapeDrawsTheSameOutlineInCss()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: shape(from 0 0, line to 100% 0, line to 100% 100%, close); }");
            yield return null;

            var clip = Clip;
            Assert.AreEqual(ClipPathKind.Shape, clip.Kind);
            Assert.AreEqual(4, clip.Commands.Length);

            // Percentages are what shape() has and a path string cannot express.
            var contour = clip.Resolve(new Vector2(200, 100)).Contours[0];
            Assert.AreEqual(new Vector2(0, 100), contour[0]);
            Assert.AreEqual(new Vector2(200, 100), contour[1]);
            Assert.AreEqual(new Vector2(200, 0), contour[2]);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator ShapeCurveIsQuadraticWithOneControlAndCubicWithTwo()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: shape(from 0 0, curve to 100px 0 with 50px 40px, close); }");
            yield return null;
            Assert.AreEqual(ClipPathCommandKind.Quadratic, Clip.Commands[1].Kind);

            InsertStyle(@"#test { clip-path: shape(from 0 0, curve to 100px 0 with 20px 40px / 80px 40px, close); }");
            yield return null;

            var clip = Clip;
            Assert.AreEqual(ClipPathCommandKind.Cubic, clip.Commands[1].Kind);
            Assert.AreEqual(YogaValue2.Point(20, 40), clip.Commands[1].Control1);
            Assert.AreEqual(YogaValue2.Point(80, 40), clip.Commands[1].Control2);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator ShapeArcCarriesItsFlagsAndRotation()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: shape(from 0 0, arc to 50px 50px of 25px 40px large cw rotate 30deg, close); }");
            yield return null;

            var command = Clip.Commands[1];
            Assert.AreEqual(ClipPathCommandKind.Arc, command.Kind);
            Assert.AreEqual(YogaValue2.Point(25, 40), command.Radius);
            Assert.IsTrue(command.LargeArc);
            Assert.IsTrue(command.Clockwise);
            Assert.AreEqual(30f, command.Angle, 0.001f);

            // One radius is a circular arc, and the flags default to the other two.
            InsertStyle(@"#test { clip-path: shape(from 0 0, arc to 50px 50px of 25px, close); }");
            yield return null;

            command = Clip.Commands[1];
            Assert.AreEqual(YogaValue2.Point(25, 25), command.Radius);
            Assert.IsFalse(command.LargeArc);
            Assert.IsFalse(command.Clockwise);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator ShapeByIsAnOffsetFromTheCurrentPoint()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: shape(from 10px 10px, line by 30px 0, line by 0 30px, close); }");
            yield return null;

            var clip = Clip;
            Assert.IsTrue(clip.Commands[1].Relative);

            var contour = clip.Resolve(new Vector2(100, 100)).Contours[0];
            Assert.AreEqual(new Vector2(10, 90), contour[0]);
            Assert.AreEqual(new Vector2(40, 90), contour[1]);
            Assert.AreEqual(new Vector2(40, 60), contour[2]);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator AShapeCommandNobodyKnowsIsNotAShape()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: shape(from 0 0, wiggle to 10px 10px); }");
            yield return null;
            Assert.AreEqual(ClipPathKind.None, Clip.Kind);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator AGeometryBoxIsWhatTheShapeIsMeasuredAgainst()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: padding-box circle(30px); }");
            yield return null;
            Assert.AreEqual(ClipGeometryBox.PaddingBox, Clip.Box);
            Assert.AreEqual(ClipPathKind.Circle, Clip.Kind);

            // Either order, as CSS allows.
            InsertStyle(@"#test { clip-path: circle(30px) margin-box; }");
            yield return null;
            Assert.AreEqual(ClipGeometryBox.MarginBox, Clip.Box);

            // The three SVG boxes have nothing to measure on an element that is not SVG, so each
            // resolves to the box that does.
            InsertStyle(@"#test { clip-path: fill-box circle(30px); }");
            yield return null;
            Assert.AreEqual(ClipGeometryBox.ContentBox, Clip.Box);

            InsertStyle(@"#test { clip-path: view-box circle(30px); }");
            yield return null;
            Assert.AreEqual(ClipGeometryBox.BorderBox, Clip.Box);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator ABareGeometryBoxClipsToThatBox()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: content-box; }");
            yield return null;

            var clip = Clip;
            // The box itself is the shape, which is an inset of nothing measured against it.
            Assert.AreEqual(ClipPathKind.Inset, clip.Kind);
            Assert.AreEqual(ClipGeometryBox.ContentBox, clip.Box);

            // Which box that is falls to the element -- Resolve is handed the rectangle, in the
            // border box's own coordinates, so a shape lands where the padding and border leave it.
            var box = clip.Resolve(new Rect(10, 20, 100, 50)).Box;
            Assert.AreEqual(10f, box.xMin, 0.001f);
            Assert.AreEqual(110f, box.xMax, 0.001f);
            Assert.AreEqual(20f, box.yMin, 0.001f);
            Assert.AreEqual(70f, box.yMax, 0.001f);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator TwoGeometryBoxesIsNotAValue()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: padding-box content-box; }");
            yield return null;
            Assert.AreEqual(ClipPathKind.None, Clip.Kind);
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator ARasterizedShapeCoversWhatItsContoursEnclose()
        {
            yield return null;

            // What a shape past the uniform ring is transported as: a byte of coverage per texel of
            // the capture, which the composite samples in place of walking a ring per fragment.
            var square = new[] { Ring(new Vector2(0, 0), new Vector2(5, 0), new Vector2(5, 10), new Vector2(0, 10)) };
            var coverage = ClipPathGeometry.Rasterize(square, false, 10, 10, Vector2.one, Vector2.zero);

            Assert.AreEqual(100, coverage.Length);
            Assert.AreEqual(255, coverage[0], "inside the square");
            Assert.AreEqual(255, coverage[4]);
            Assert.AreEqual(0, coverage[5], "and outside it");
            Assert.AreEqual(0, coverage[9]);

            // A texel the edge runs through gets the fraction of it that is covered, which is the
            // antialiasing the signed-distance shapes get from their own gradient.
            var half = new[] { Ring(new Vector2(0, 0), new Vector2(4.5f, 0), new Vector2(4.5f, 10), new Vector2(0, 10)) };
            coverage = ClipPathGeometry.Rasterize(half, false, 10, 10, Vector2.one, Vector2.zero);
            Assert.AreEqual(128, coverage[4], 2, "half of the fifth texel");
        }

        /// <summary>The closed form every contour is in: the first point repeated at the end.</summary>
        static Vector2[] Ring(params Vector2[] points)
        {
            var ring = new Vector2[points.Length + 1];
            points.CopyTo(ring, 0);
            ring[points.Length] = points[0];
            return ring;
        }

        [UGUITest(Script = BaseScript)]
        public IEnumerator TwoPathsOfTheSameOutlineInterpolate()
        {
            yield return null;

            InsertStyle(@"#test { clip-path: path('M 0 0 L 10 0 L 10 10 Z'); }");
            yield return null;
            var from = Clip;

            InsertStyle(@"#test { clip-path: path('M 0 0 L 30 0 L 30 30 Z'); }");
            yield return null;

            var half = from.Interpolate(Clip, 0.5f) as ClipPath;
            Assert.AreEqual(YogaValue2.Point(20, 0), half.Commands[1].To);

            // A different outline has nothing to correspond to, which is where CSS gives up too.
            InsertStyle(@"#test { clip-path: path('M 0 0 L 30 0 Z'); }");
            yield return null;

            var other = Clip;
            Assert.AreEqual(from.Commands.Length, (from.Interpolate(other, 0.25f) as ClipPath).Commands.Length);
            Assert.AreEqual(other.Commands.Length, (from.Interpolate(other, 0.75f) as ClipPath).Commands.Length);
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
