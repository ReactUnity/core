using NUnit.Framework;
using ReactUnity.Styling;
using ReactUnity.Types;
using Yoga;

namespace ReactUnity.Tests.Editor
{
    /// <summary>The web's layout defaults: flex-direction follows display, items shrink, and the flex shorthand fills in.</summary>
    [TestFixture]
    public class LayoutDefaultsTests
    {
        [TestCase("block", DisplayType.Block)]
        [TestCase("inline-block", DisplayType.Block)]
        [TestCase("flow-root", DisplayType.Block)]
        [TestCase("flex", DisplayType.Flex)]
        [TestCase("inline-flex", DisplayType.Flex)]
        [TestCase("none", DisplayType.None)]
        [TestCase("contents", DisplayType.Contents)]
        [TestCase("grid", DisplayType.Block)]
        public void DisplayReadsTheWebsValues(string input, DisplayType expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["display"] = input;
            Assert.AreEqual(expected, style.GetStyleValue(LayoutProperties.Display, true));
        }

        [TestCase(null, null, YogaFlexDirection.Column)]
        [TestCase("block", null, YogaFlexDirection.Column)]
        [TestCase("flex", null, YogaFlexDirection.Row)]
        [TestCase("inline-flex", null, YogaFlexDirection.Row)]
        [TestCase("none", null, YogaFlexDirection.Column)]
        [TestCase("flex", "column", YogaFlexDirection.Column)]
        [TestCase("block", "row", YogaFlexDirection.Row)]
        [TestCase("flex", "initial", YogaFlexDirection.Row)]
        [TestCase("flex", "unset", YogaFlexDirection.Row)]
        public void FlexDirectionFollowsDisplay(string display, string direction, YogaFlexDirection expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            if (display != null) collection["display"] = display;
            if (direction != null) collection["flex-direction"] = direction;
            Assert.AreEqual(expected, style.GetStyleValue(LayoutProperties.FlexDirection, true));
        }

        [Test]
        public void ItemsShrinkByDefault()
        {
            var (_, style) = TestHelpers.CreateStyle();
            Assert.AreEqual(1f, style.GetStyleValue(LayoutProperties.FlexShrink, true));

            var (collection, explicitStyle) = TestHelpers.CreateStyle();
            collection["flex-shrink"] = "0";
            Assert.AreEqual(0f, explicitStyle.GetStyleValue(LayoutProperties.FlexShrink, true));
        }

        [TestCase("1", 1, 1, YogaUnit.Percent, 0)]
        [TestCase("2 3", 2, 3, YogaUnit.Percent, 0)]
        [TestCase("1 30px", 1, 1, YogaUnit.Point, 30)]
        [TestCase("30px", 1, 1, YogaUnit.Point, 30)]
        [TestCase("0 0 auto", 0, 0, YogaUnit.Auto, 0)]
        [TestCase("1 auto", 1, 1, YogaUnit.Auto, 0)]
        [TestCase("2 0 50%", 2, 0, YogaUnit.Percent, 50)]
        [TestCase("auto", 1, 1, YogaUnit.Auto, 0)]
        [TestCase("none", 0, 0, YogaUnit.Auto, 0)]
        public void FlexShorthandFillsInTheWebsValues(string input, float grow, float shrink, YogaUnit unit, float basis)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["flex"] = input;
            Assert.AreEqual(grow, style.GetStyleValue(LayoutProperties.FlexGrow, true));
            Assert.AreEqual(shrink, style.GetStyleValue(LayoutProperties.FlexShrink, true));
            var value = style.GetStyleValue(LayoutProperties.FlexBasis, true);
            Assert.AreEqual(unit, value.Unit);
            if (unit != YogaUnit.Auto) Assert.AreEqual(basis, value.Value);
        }

        [TestCase("1 2 3 4")]
        [TestCase("red")]
        [TestCase("1px 2px")]
        public void UnreadableFlexLeavesTheDefaults(string input)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["flex"] = input;
            Assert.AreEqual(1f, style.GetStyleValue(LayoutProperties.FlexShrink, true));
            Assert.AreNotEqual(YogaUnit.Percent, style.GetStyleValue(LayoutProperties.FlexBasis, true).Unit);
        }
    }
}
