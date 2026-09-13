using NUnit.Framework;
using ReactUnity.Types;
using ReactUnity.UGUI.Shapes;
using UnityEngine;

namespace ReactUnity.Tests.Editor
{
    /// <summary>
    /// CSS Backgrounds 3 section 5.5: a <c>border-radius</c> too large for its box is reduced by one
    /// factor over the whole box, the smallest of (edge length / the two radii on that edge). Taken
    /// per corner instead, a bar asked for a pill kept the corners its short edge did not reach.
    /// </summary>
    [TestFixture]
    public class BorderRadiusClampTests
    {
        private static WebRoundingProperties Uniform(float radius) => new WebRoundingProperties
        {
            Type = WebRoundingProperties.RoundedType.Uniform,
            UniformRadius = YogaValue2.Point(radius, radius),
        };

        private static WebRoundingProperties Corners(float tl, float tr, float br, float bl) => new WebRoundingProperties(
            new[] { YogaValue2.Point(tl, tl), YogaValue2.Point(tr, tr), YogaValue2.Point(br, br), YogaValue2.Point(bl, bl) });

        private static WebRoundingProperties Adjust(WebRoundingProperties rounding, float width, float height)
        {
            var size = new Vector2(width, height);
            rounding.UpdateAdjusted(size, size);
            return rounding;
        }

        // Half the shorter side is the cap, whatever is asked for past it.
        [TestCase(3f, 3f)]
        [TestCase(5f, 5f)]
        [TestCase(8f, 5f)]
        [TestCase(9999f, 5f)]
        [TestCase(float.PositiveInfinity, 5f)]
        public void AUniformRadiusIsCappedAtHalfTheShorterSide(float radius, float expected)
        {
            var rounding = Adjust(Uniform(radius), 200, 10);

            foreach (var corner in new[] { rounding.AdjustedTLRadius, rounding.AdjustedTRRadius, rounding.AdjustedBRRadius, rounding.AdjustedBLRadius })
            {
                Assert.IsFalse(float.IsNaN(corner.x) || float.IsNaN(corner.y), $"radius {radius} produced NaN");
                Assert.AreEqual(expected, corner.x, 0.01f);
                Assert.AreEqual(expected, corner.y, 0.01f);
            }
        }

        // What the per-corner factor got wrong: one edge forcing a reduction reduces every corner,
        // so the shape stays the one that was asked for.
        [Test]
        public void OneTightEdgeShrinksEveryCorner()
        {
            var rounding = Adjust(Corners(100, 100, 10, 10), 100, 100);

            // f = min(100/200 top, 100/110 right, 100/20 bottom, 100/110 left) = 0.5
            Assert.AreEqual(50f, rounding.AdjustedTLRadius.x, 0.01f);
            Assert.AreEqual(50f, rounding.AdjustedTRRadius.x, 0.01f);
            Assert.AreEqual(5f, rounding.AdjustedBRRadius.x, 0.01f);
            Assert.AreEqual(5f, rounding.AdjustedBLRadius.x, 0.01f);
        }

        [Test]
        public void ARadiusThatFitsIsLeftAlone()
        {
            var rounding = Adjust(Corners(4, 8, 12, 16), 100, 100);

            Assert.AreEqual(4f, rounding.AdjustedTLRadius.x, 0.01f);
            Assert.AreEqual(8f, rounding.AdjustedTRRadius.x, 0.01f);
            Assert.AreEqual(12f, rounding.AdjustedBRRadius.x, 0.01f);
            Assert.AreEqual(16f, rounding.AdjustedBLRadius.x, 0.01f);
        }

        // A percentage is of the box on its own axis, so 50% on an oblong is an ellipse quadrant
        // rather than a circle -- and needs no reduction at all.
        [Test]
        public void FiftyPercentIsAnEllipseQuadrant()
        {
            var rounding = new WebRoundingProperties
            {
                Type = WebRoundingProperties.RoundedType.Uniform,
                UniformRadius = YogaValue2.Percent(50, 50),
            };
            Adjust(rounding, 200, 100);

            Assert.AreEqual(100f, rounding.AdjustedTLRadius.x, 0.01f);
            Assert.AreEqual(50f, rounding.AdjustedTLRadius.y, 0.01f);
        }
    }
}
