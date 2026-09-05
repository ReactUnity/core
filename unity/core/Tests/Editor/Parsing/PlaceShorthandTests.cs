using NUnit.Framework;
using ReactUnity.Styling;
using Yoga;

namespace ReactUnity.Tests.Editor
{
    [TestFixture]
    public class PlaceShorthandTests
    {
        [TestCase("center", YogaAlign.Center, YogaJustify.Center)]
        [TestCase("start end", YogaAlign.FlexStart, YogaJustify.FlexEnd)]
        [TestCase("space-between center", YogaAlign.SpaceBetween, YogaJustify.Center)]
        [TestCase("center space-evenly", YogaAlign.Center, YogaJustify.SpaceEvenly)]
        [TestCase("flex-end left", YogaAlign.FlexEnd, YogaJustify.FlexStart)]
        // Yoga's justify axis has no stretch, so both fall back to start on that side.
        [TestCase("stretch", YogaAlign.Stretch, YogaJustify.FlexStart)]
        [TestCase("normal", YogaAlign.Stretch, YogaJustify.FlexStart)]
        // A single value only the align side knows leaves justify at its initial value.
        [TestCase("baseline", YogaAlign.Baseline, YogaJustify.FlexStart)]
        // Anything the pair cannot read leaves both untouched.
        [TestCase("center foo", YogaAlign.Auto, YogaJustify.FlexStart)]
        [TestCase("center center center", YogaAlign.Auto, YogaJustify.FlexStart)]
        [TestCase("baseline center", YogaAlign.Baseline, YogaJustify.Center)]
        public void PlaceContent(string input, YogaAlign align, YogaJustify justify)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["place-content"] = input;
            Assert.AreEqual(align, style.GetStyleValue(LayoutProperties.AlignContent));
            Assert.AreEqual(justify, style.GetStyleValue(LayoutProperties.JustifyContent));
        }

        [TestCase("center start", YogaAlign.Center)]
        [TestCase("end", YogaAlign.FlexEnd)]
        [TestCase("self-start", YogaAlign.FlexStart)]
        [TestCase("baseline", YogaAlign.Baseline)]
        [TestCase("center foo", YogaAlign.Auto)]
        public void PlaceItemsAndSelfSetTheAlignSide(string input, YogaAlign align)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["place-items"] = input;
            Assert.AreEqual(align, style.GetStyleValue(LayoutProperties.AlignItems));

            collection["placeSelf"] = input;
            Assert.AreEqual(align, style.GetStyleValue(LayoutProperties.AlignSelf));
        }

        [TestCase("start", YogaJustify.FlexStart)]
        [TestCase("end", YogaJustify.FlexEnd)]
        [TestCase("left", YogaJustify.FlexStart)]
        [TestCase("right", YogaJustify.FlexEnd)]
        [TestCase("flex-end", YogaJustify.FlexEnd)]
        [TestCase("space-around", YogaJustify.SpaceAround)]
        public void LonghandsTakeTheWebSpellings(string input, YogaJustify justify)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["justify-content"] = input;
            Assert.AreEqual(justify, style.GetStyleValue(LayoutProperties.JustifyContent));

            collection["align-items"] = input;
            var align = justify == YogaJustify.FlexStart ? YogaAlign.FlexStart : justify == YogaJustify.FlexEnd ? YogaAlign.FlexEnd : YogaAlign.SpaceAround;
            Assert.AreEqual(align, style.GetStyleValue(LayoutProperties.AlignItems));
        }
    }
}
