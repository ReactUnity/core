using NUnit.Framework;
using ReactUnity.Styling;
using Yoga;

namespace ReactUnity.Tests.Editor
{
    /// <summary>
    /// A calc() holding a percentage, on a property Yoga can hold a percentage for. Yoga has no
    /// calc(), but `calc(1/2 * 100%)` is not a calculation it needs one for -- it is 50%, and every
    /// fraction utility a CSS framework emits has exactly that shape.
    /// </summary>
    [TestFixture]
    public class CalcPercentageTests
    {
        private static YogaValue Width(string value)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["width"] = value;
            style.UpdateParent(null);
            return style.GetStyleValue<YogaValue>(LayoutProperties.Width);
        }

        [TestCase("50%", 50f)]
        [TestCase("calc(1/2 * 100%)", 50f)]
        [TestCase("calc(100% / 2)", 50f)]
        [TestCase("calc(0.5 * 100%)", 50f)]
        [TestCase("calc(100% * 0.25)", 25f)]
        [TestCase("calc(1/3 * 100%)", 33.3333f)]
        [TestCase("calc(2/3 * 100%)", 66.6667f)]
        [TestCase("calc(50% + 25%)", 75f)]
        [TestCase("calc(100% - 40%)", 60f)]
        [TestCase("calc(2 * -50%)", -100f)]
        [TestCase("calc(-1 * 100% / 2)", -50f)]
        [TestCase("calc(100%)", 100f)]
        [TestCase("calc((1/2) * 100%)", 50f)]
        public void APurePercentageStaysAPercentage(string input, float expected)
        {
            var value = Width(input);
            Assert.AreEqual(YogaUnit.Percent, value.Unit, input);
            Assert.AreEqual(expected, value.Value, 0.001f, input);
        }

        [TestCase("calc(2 * 8px)", 16f)]
        [TestCase("calc(10px + 2px)", 12f)]
        [TestCase("calc(1cm / 2)", 18.9f)]
        [TestCase("calc(20px / 4)", 5f)]
        public void ALengthIsStillALength(string input, float expected)
        {
            var value = Width(input);
            Assert.AreEqual(YogaUnit.Point, value.Unit, input);
            Assert.AreEqual(expected, value.Value, 0.001f, input);
        }

        /// <summary>
        /// The same, written with the sub-expression spelled out. A parenthesised group and a nested
        /// calc() are both worked out before the calculation around them, and what they came out as
        /// has to be an operand again -- `calc(calc(1 / 2 * 100%) * -1)` is what a CSS framework
        /// emits for every negative fraction utility.
        /// </summary>
        [TestCase("calc(calc(50%))", 50f)]
        [TestCase("calc((50%))", 50f)]
        [TestCase("calc((1 / 2 * 100%) * -1)", -50f)]
        [TestCase("calc(calc(1 / 2 * 100%) * -1)", -50f)]
        [TestCase("calc(calc(100%) / 2)", 50f)]
        [TestCase("calc(calc(100%) + calc(0%))", 100f)]
        [TestCase("calc(-1 * calc(1 / 4 * 100%))", -25f)]
        [TestCase("calc((100% - 40%) * 2)", 120f)]
        [TestCase("calc(calc(calc(100%) / 2) / 2)", 25f)]
        public void APercentageSurvivesASubExpression(string input, float expected)
        {
            var value = Width(input);
            Assert.AreEqual(YogaUnit.Percent, value.Unit, input);
            Assert.AreEqual(expected, value.Value, 0.001f, input);
        }

        // A length has to come back through a sub-expression as a length, not as a bare number that
        // happens to read the same.
        [TestCase("calc(calc(10px) * 2)", 20f)]
        [TestCase("calc((10px) * 2)", 20f)]
        [TestCase("calc(calc(10px) + calc(2px))", 12f)]
        [TestCase("calc((10px + 2px) * 2)", 24f)]
        public void ALengthSurvivesOneToo(string input, float expected)
        {
            var value = Width(input);
            Assert.AreEqual(YogaUnit.Point, value.Unit, input);
            Assert.AreEqual(expected, value.Value, 0.001f, input);
        }

        // `-translate-x-1/2`, as a CSS framework actually writes it.
        [Test]
        public void TranslateTakesANestedPercentageCalc()
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["translate"] = "calc(calc(1 / 2 * 100%) * -1) 0";
            style.UpdateParent(null);

            Assert.AreEqual(YogaUnit.Percent, style.translate.X.Unit);
            Assert.AreEqual(-50f, style.translate.X.Value, 0.001f);
        }

        /// <summary>
        /// The whole shape a framework emits it in: the calculation goes into a custom property and
        /// the layout property reads it back out.
        /// </summary>
        [Test]
        public void APercentageCalcSurvivesACustomProperty()
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["--tw-translate-x"] = "calc(calc(1 / 2 * 100%) * -1)";
            collection["translate"] = "var(--tw-translate-x) 0";
            collection["width"] = "var(--tw-translate-x)";
            style.UpdateParent(null);

            Assert.AreEqual(YogaUnit.Percent, style.translate.X.Unit);
            Assert.AreEqual(-50f, style.translate.X.Value, 0.001f);
            Assert.AreEqual(YogaValue.Percent(-50), style.GetStyleValue<YogaValue>(LayoutProperties.Width));
        }

        /// <summary>
        /// min(), max() and clamp() take their arguments as calculations, so a percentage reaches
        /// them the same way. Over percentages alone the comparison is exact and the answer is a
        /// percentage -- no size needed.
        /// </summary>
        [TestCase("max(50%, 60%)", 60f)]
        [TestCase("min(50%, 60%)", 50f)]
        [TestCase("clamp(20%, 10%, 80%)", 20f)]
        [TestCase("clamp(20%, 90%, 80%)", 80f)]
        [TestCase("clamp(20%, 50%, 80%)", 50f)]
        [TestCase("clamp(none, 90%, 80%)", 80f)]
        [TestCase("max(calc(1 / 2 * 100%), 30%)", 50f)]
        public void MinMaxOverPercentagesStaysAPercentage(string input, float expected)
        {
            var value = Width(input);
            Assert.AreEqual(YogaUnit.Percent, value.Unit, input);
            Assert.AreEqual(expected, value.Value, 0.001f, input);
        }

        /// <summary>
        /// A percentage held against a length is the one case that needs a size to compare in, so
        /// it is worth what a bare percentage on this property is worth -- against the parent's
        /// width here, and nothing at all where that is not a length.
        /// </summary>
        [Test]
        public void MinMaxMixingAPercentageAndALengthNeedsTheParent()
        {
            var (collection, style) = TestHelpers.CreateStyle();
            var (parentCollection, parent) = TestHelpers.CreateStyle();

            parentCollection["width"] = "200px";
            parent.UpdateParent(null);

            collection["width"] = "max(50%, 30px)";
            style.UpdateParent(parent);

            // 50% of the parent's 200px beats 30px.
            var value = style.GetStyleValue<YogaValue>(LayoutProperties.Width);
            Assert.AreEqual(YogaUnit.Point, value.Unit);
            Assert.AreEqual(100f, value.Value, 0.001f);

            collection["width"] = "min(50%, 30px)";
            style.UpdateParent(parent);
            Assert.AreEqual(30f, style.GetStyleValue<YogaValue>(LayoutProperties.Width).Value, 0.001f);
        }

        /// <summary>
        /// A percentage a calculation worked out to reaches a property the same way one written
        /// straight out does. Where the property can hold a percentage it stays one; where it can
        /// only hold a number -- `border-width`, and the rest of CSS's length-only properties --
        /// it is worth what the written percentage is worth there, which is sometimes nothing.
        /// </summary>
        [TestCase("border-left-width")]
        [TestCase("scroll-margin-left")]
        public void ACalculatedPercentageMatchesAWrittenOne(string property)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["width"] = "200px";

            collection[property] = "50%";
            style.UpdateParent(null);
            var direct = style.GetStyleValue<float>(CssProperties.GetKey(property) as IStyleProperty);

            collection[property] = "calc(50% * 1)";
            style.UpdateParent(null);
            var calculated = style.GetStyleValue<float>(CssProperties.GetKey(property) as IStyleProperty);

            Assert.AreEqual(direct, calculated, 0.001f, property);
        }

        /// <summary>
        /// The same, where nothing knows it is a percentage until a var() is resolved -- so the
        /// property is reached with a percentage rather than converted with one.
        /// </summary>
        [TestCase("calc(var(--pct) * 1)")]
        [TestCase("max(var(--pct), 10%)")]
        [TestCase("min(var(--pct), 90%)")]
        public void ALatePercentageReachesALengthOnlyPropertyToo(string input)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["width"] = "200px";
            collection["--pct"] = "50%";
            collection["border-left-width"] = input;
            style.UpdateParent(null);

            Assert.AreEqual(100f, style.GetStyleValue<float>(LayoutProperties.BorderLeftWidth), 0.001f, input);
        }

        // The boundary of what Yoga can hold. There is no unit for `100% - 10px`, and resolving the
        // percentage against a parent that has not been laid out is a wrong answer rather than a
        // late one -- so the declaration is dropped, and `StyleDiagnostics` says so out loud.
        [TestCase("calc(100% - 10px)")]
        [TestCase("calc(100% + 1cm)")]
        [TestCase("calc(50% * 50%)")]
        [TestCase("calc(10px / 50%)")]
        [TestCase("calc((100% - 10px) * 2)")]
        [TestCase("calc(calc(100%) - calc(10px))")]
        public void AMixOfPercentageAndLengthIsDropped(string input)
        {
            Assert.AreEqual(YogaUnit.Undefined, Width(input).Unit, input);
        }

        // `0%` is zero however it is spelled, so a calculation it cancels out of is a plain length.
        [TestCase("calc(0% + 10px)", 10f)]
        [TestCase("calc(100% - 100%)", 0f)]
        public void APercentageThatCancelsLeavesALength(string input, float expected)
        {
            var value = Width(input);
            Assert.AreEqual(YogaUnit.Point, value.Unit, input);
            Assert.AreEqual(expected, value.Value, 0.001f, input);
        }

        [Test]
        public void TheOtherLayoutPropertiesAgree()
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["left"] = "calc(1/2 * 100%)";
            collection["flex-basis"] = "calc(1/3 * 100%)";
            collection["margin-left"] = "calc(1/4 * -100%)";
            style.UpdateParent(null);

            Assert.AreEqual(YogaValue.Percent(50), style.GetStyleValue<YogaValue>(LayoutProperties.Left));
            Assert.AreEqual(YogaUnit.Percent, style.GetStyleValue<YogaValue>(LayoutProperties.FlexBasis).Unit);
            Assert.AreEqual(-25f, style.GetStyleValue<YogaValue>(LayoutProperties.MarginLeft).Value, 0.001f);
        }

        // `-translate-x-1/2`, which is a percentage of the element's own size on a YogaValue2.
        [Test]
        public void TranslateTakesAPercentageCalc()
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["translate"] = "calc(1/2 * -100%) calc(1/2 * -100%)";
            style.UpdateParent(null);

            var translate = style.translate;
            Assert.AreEqual(YogaUnit.Percent, translate.X.Unit);
            Assert.AreEqual(-50f, translate.X.Value, 0.001f);
            Assert.AreEqual(-50f, translate.Y.Value, 0.001f);
        }

        /// <summary>
        /// `infinity` is the largest value the implementation supports, not a real infinity --
        /// which is what `rounded-full` compiles to, and what used to take a NaN through the
        /// border-radius clamp and leave the element painting nothing at all.
        /// </summary>
        [Test]
        public void InfinityIsAFiniteLength()
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["border-radius"] = "calc(infinity * 1px)";
            style.UpdateParent(null);

            var radius = style.borderTopLeftRadius;
            Assert.AreEqual(YogaUnit.Point, radius.X.Unit);
            Assert.IsFalse(float.IsInfinity(radius.X.Value));
            Assert.IsFalse(float.IsNaN(radius.X.Value));
            Assert.Greater(radius.X.Value, 1000000f);
        }

        /// <summary>
        /// A percentage only survives a calculation where the property can hold one. `perspective`
        /// is a length and nothing else, so a percentage in it is dropped rather than handed on as
        /// a value its reader cannot take.
        /// </summary>
        [TestCase("50%")]
        [TestCase("calc(50% * 2)")]
        [TestCase("calc(1/2 * 100%)")]
        public void APercentageIsNotAPerspective(string input)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["perspective"] = input;
            style.UpdateParent(null);

            Assert.AreEqual(0f, style.GetStyleValue(StyleProperties.perspective), input);
        }

        [Test]
        public void InfinityStillWinsAMax()
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["width"] = "max(10px, calc(infinity * 1px))";
            style.UpdateParent(null);

            var value = style.GetStyleValue<YogaValue>(LayoutProperties.Width);
            Assert.AreEqual(YogaUnit.Point, value.Unit);
            Assert.Greater(value.Value, 1000000f);
        }
    }
}
