using NUnit.Framework;
using ReactUnity.Types;
using Yoga;

namespace ReactUnity.Tests.Editor
{
    /// <summary>
    /// A conic gradient's stops are angles, not lengths -- <c>conic-gradient(red 0deg, blue 223deg)</c>.
    /// They were read with the same converter the linear and radial ones use, so any stop carrying a
    /// unit took the whole declaration down with it and the element painted no gradient at all.
    /// </summary>
    [TestFixture]
    public class ConicGradientTests
    {
        private static ConicGradient Parse(string def)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["background"] = def;
            style.UpdateParent(null);
            return (style.backgroundImage?.Get(0) as GradientImageDefinition)?.Gradient as ConicGradient;
        }

        // A stop is a fraction of the turn however it was written, so the two spellings agree.
        [TestCase("conic-gradient(#22d3ee 0deg, #a5f3fc 223deg)", 0f, 61.944f)]
        [TestCase("conic-gradient(#22d3ee 0%, #a5f3fc 61.944%)", 0f, 61.944f)]
        [TestCase("conic-gradient(red 0turn, blue 0.5turn)", 0f, 50f)]
        [TestCase("conic-gradient(red 0rad, blue 3.14159265rad)", 0f, 50f)]
        [TestCase("conic-gradient(from 45deg, red 90deg, blue 270deg)", 25f, 75f)]
        public void AnAngleStopIsAFractionOfTheTurn(string def, float first, float last)
        {
            var gradient = Parse(def);
            Assert.IsNotNull(gradient, def);
            Assert.IsTrue(gradient.Valid, def);

            Assert.AreEqual(YogaUnit.Percent, gradient.Keys[0].Offset.Unit);
            Assert.AreEqual(first, gradient.Keys[0].Offset.Value, 0.01f);
            Assert.AreEqual(last, gradient.Keys[gradient.Keys.Count - 1].Offset.Value, 0.01f);
        }

        [Test]
        public void TheStartingAngleStillParses()
        {
            var gradient = Parse("conic-gradient(from 90deg at 25% 75%, red 0deg, blue 180deg)");
            Assert.IsNotNull(gradient);
            Assert.AreEqual(Radians(90), gradient.From, 0.0001f);
            Assert.AreEqual(YogaValue.Percent(25), gradient.At.X);
            Assert.AreEqual(50f, gradient.Keys[1].Offset.Value, 0.01f);
        }

        // A length is not an angle, so it takes the declaration with it -- as it does on the web.
        [Test]
        public void ALengthStopIsRejected()
        {
            Assert.IsNull(Parse("conic-gradient(red 0px, blue 20px)"));
        }

        private static float Radians(float degrees) => degrees * UnityEngine.Mathf.Deg2Rad;
    }
}
