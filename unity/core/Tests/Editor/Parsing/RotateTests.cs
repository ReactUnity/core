using NUnit.Framework;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.Tests.Editor
{
    /// <summary>The rotate property reads the web's grammar, and three angles as Euler angles.</summary>
    [TestFixture]
    public class RotateTests
    {
        [TestCase("45deg", 0, 0, 45)]
        [TestCase("0.5turn", 0, 0, 180)]
        [TestCase("none", 0, 0, 0)]
        [TestCase("x 90deg", 90, 0, 0)]
        [TestCase("90deg y", 0, 90, 0)]
        [TestCase("Z 2turn", 0, 0, 720)]
        [TestCase("0 1 0 45deg", 0, 45, 0)]
        [TestCase("45deg 0 0 -1", 0, 0, -45)]
        [TestCase("2 0 0 30deg", 30, 0, 0)]
        [TestCase("0 0 0 45deg", 0, 0, 0)]
        [TestCase("10deg 20deg 30deg", 10, 20, 30)]
        public void RotateReadsAxisAndAngle(string input, float x, float y, float z)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["rotate"] = input;
            AssertEuler(new Vector3(x, y, z), style.rotate);
        }

        [Test]
        public void ArbitraryAxisIsTheSameTurn()
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["rotate"] = "1 1 0 90deg";
            AssertEuler(Quaternion.AngleAxis(90, new Vector3(1, 1, 0).normalized).eulerAngles, style.rotate);
        }

        [TestCase("x 45deg foo")]
        [TestCase("45deg 45deg")]
        [TestCase("w 45deg")]
        [TestCase("1 0 0 45deg 1")]
        public void UnreadableValueLeavesTheInitial(string input)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["rotate"] = input;
            AssertEuler(Vector3.zero, style.rotate);
        }

        [Test]
        public void TransformRotate3dTakesAnAxisAndAngle()
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["transform"] = "rotate3d(0, 1, 0, 30deg) rotate3d(0, 0, 0, 90deg)";
            AssertEuler(new Vector3(0, 30, 0), style.rotate);
        }

        static void AssertEuler(Vector3 expected, Vector3 actual)
        {
            Assert.AreEqual(expected.x, actual.x, 0.001f);
            Assert.AreEqual(expected.y, actual.y, 0.001f);
            Assert.AreEqual(expected.z, actual.z, 0.001f);
        }
    }
}
