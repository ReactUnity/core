using NUnit.Framework;
using ReactUnity.Styling;
using UnityEngine;
using Yoga;

namespace ReactUnity.Tests.Editor
{
    /// <summary>
    /// A var() anywhere in a transform. The shorthand never sees one itself -- the base class turns a
    /// value carrying var() into a lazy substitution and re-reads the result -- so what these cover is
    /// that the substitution puts back text this grammar can still read.
    /// </summary>
    [TestFixture]
    public class TransformVarTests
    {
        static NodeStyle Styled(string transform, params string[] vars)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            for (int i = 0; i < vars.Length; i += 2) collection[vars[i]] = vars[i + 1];
            collection["transform"] = transform;
            return style;
        }

        [Test]
        public void TheWholeValueCanBeAVariable()
        {
            var style = Styled("var(--t)", "--t", "translateX(10px)");
            Assert.AreEqual(YogaValue.Point(10), style.translate.X);
        }

        [Test]
        public void AnArgumentCanBeAVariable()
        {
            var style = Styled("translateX(var(--x))", "--x", "10px");
            Assert.AreEqual(YogaValue.Point(10), style.translate.X);
        }

        [Test]
        public void AVariableCanCarrySeveralWholeFunctions()
        {
            var style = Styled("scale(2) var(--t)", "--t", "translateX(10px) rotate(45deg)");
            Assert.AreEqual(YogaValue.Point(10), style.translate.X);
            Assert.AreEqual(45, style.rotate.z, 0.001f);
            Assert.AreEqual(2, style.scale.x, 0.001f);
        }

        [Test]
        public void AVariableCanCarryBothArgumentsIncludingTheComma()
        {
            var style = Styled("translate(var(--args))", "--args", "10px, 20px");
            Assert.AreEqual(YogaValue.Point(10), style.translate.X);
            Assert.AreEqual(YogaValue.Point(20), style.translate.Y);
        }

        [Test]
        public void AVariableCanEvenCarryTheFunctionName()
        {
            var style = Styled("var(--fn)(10px)", "--fn", "translateX");
            Assert.AreEqual(YogaValue.Point(10), style.translate.X);
        }

        [Test]
        public void AVariableResolvesThroughAnotherVariable()
        {
            var style = Styled("translateX(var(--a))", "--a", "var(--b)", "--b", "30px");
            Assert.AreEqual(YogaValue.Point(30), style.translate.X);
        }

        [Test]
        public void AVariableInsideCalcIsMeasuredAfterSubstitution()
        {
            var style = Styled("translateX(calc(calc(var(--x) + 5px) * 2))", "--x", "10px");
            Assert.AreEqual(YogaValue.Point(30), style.translate.X);
        }

        [Test]
        public void EachAxisOfATranslate3dCanHaveItsOwn()
        {
            var style = Styled("translate3d(var(--x), var(--y), var(--z))", "--x", "1px", "--y", "2px", "--z", "3px");
            Assert.AreEqual(YogaValue.Point(1), style.translate.X);
            Assert.AreEqual(YogaValue.Point(2), style.translate.Y);
            Assert.AreEqual(YogaValue.Point(3), style.translateZ);
        }

        /// <summary>The space between two calls is optional, and a minifier drops it.</summary>
        [Test]
        public void TwoCallsRunTogetherStillReadAsTwo()
        {
            var style = Styled("translateX(var(--x))rotate(var(--a))", "--x", "10px", "--a", "45deg");
            Assert.AreEqual(YogaValue.Point(10), style.translate.X);
            Assert.AreEqual(45, style.rotate.z, 0.001f);
        }

        [Test]
        public void APercentageSurvivesTheSubstitution()
        {
            var style = Styled("translateX(var(--p))", "--p", "50%");
            Assert.AreEqual(YogaValue.Percent(50), style.translate.X);
        }

        [Test]
        public void AVariableCanSupplyTheNoneKeyword()
        {
            var style = Styled("var(--t)", "--t", "none");
            Assert.AreEqual(YogaValue.Point(0), style.translate.X);
            Assert.AreEqual(Vector3.one, style.scale);
        }

        /// <summary>
        /// An unset variable with no fallback is invalid at computed-value time, which in CSS throws
        /// away the whole declaration rather than just the call it appears in.
        /// </summary>
        [Test]
        public void AnUnsetVariableDropsTheWholeDeclaration()
        {
            var style = Styled("translateX(10px) rotate(var(--nope))");
            Assert.AreEqual(YogaValue.Point(0), style.translate.X);
            Assert.AreEqual(0, style.rotate.z, 0.001f);
        }

        [Test]
        public void AFallbackAppliesWhenTheVariableIsUnset()
        {
            var style = Styled("translateX(var(--nope, 10px))");
            Assert.AreEqual(YogaValue.Point(10), style.translate.X);
        }

        /// <summary>
        /// A variable holding something this call cannot read leaves that call alone. Scale used to
        /// fall back to zero here, which collapsed the element rather than ignoring the value.
        /// </summary>
        [Test]
        public void AnUnreadableScaleIsIgnoredRatherThanCollapsing()
        {
            var style = Styled("translateX(10px) scale(var(--s))", "--s", "red");
            Assert.AreEqual(Vector3.one, style.scale);
        }
    }
}
