using NUnit.Framework;
using Yoga;

namespace ReactUnity.Tests.Editor
{
    /// <summary>
    /// The sizing keyword units. The binding carries them; the pinned Yoga's layout algorithm does
    /// not read them, which is why no CSS property accepts <c>max-content</c>, <c>fit-content</c> or
    /// <c>stretch</c> yet.
    /// </summary>
    [TestFixture]
    public class YogaSizingUnitsTests
    {
        static readonly YogaValue[] Keywords = { YogaValue.MaxContent(), YogaValue.FitContent(), YogaValue.Stretch() };

        [Test]
        public void KeywordUnitsRoundTripThroughTheNativeStyle()
        {
            var node = new YogaNode();

            foreach (var keyword in Keywords)
            {
                var unit = keyword.Unit;

                node.Width = keyword;
                Assert.AreEqual(unit, node.Width.Unit, "width");
                Assert.AreEqual(keyword, node.Width, "width");

                node.Height = keyword;
                Assert.AreEqual(unit, node.Height.Unit, "height");

                node.MinWidth = keyword;
                Assert.AreEqual(unit, node.MinWidth.Unit, "min-width");

                node.MinHeight = keyword;
                Assert.AreEqual(unit, node.MinHeight.Unit, "min-height");

                node.MaxWidth = keyword;
                Assert.AreEqual(unit, node.MaxWidth.Unit, "max-width");

                node.MaxHeight = keyword;
                Assert.AreEqual(unit, node.MaxHeight.Unit, "max-height");

                node.FlexBasis = keyword;
                Assert.AreEqual(unit, node.FlexBasis.Unit, "flex-basis");
            }

            // A length still lands after one, so the keyword branch is not swallowing the setter.
            node.Width = 40;
            Assert.AreEqual(YogaUnit.Point, node.Width.Unit);
            Assert.AreEqual(40, node.Width.Value);
        }

        [Test]
        public void KeywordUnitsStillLayOutAsAuto()
        {
            // The tripwire. A 180-wide child in a 100-wide parent that does not stretch it: `auto`
            // sizes to content and so measures 180, where `fit-content` and `stretch` both owe 100.
            // Yoga reads none of the three, so all of them measure the same. When this starts
            // failing Yoga has implemented them, and the CSS layer can begin accepting them.
            var asAuto = MeasureBox(YogaValue.Auto());
            Assert.AreEqual(180, asAuto);

            foreach (var keyword in Keywords)
                Assert.AreEqual(asAuto, MeasureBox(keyword), keyword.Unit.ToString());
        }

        private static float MeasureBox(YogaValue width)
        {
            var parent = new YogaNode { Width = 100, Height = 100, AlignItems = YogaAlign.FlexStart };
            var box = new YogaNode { Width = width, Height = 20 };
            box.AddChild(new YogaNode { Width = 180, Height = 10 });
            parent.AddChild(box);

            parent.CalculateLayout();
            return box.LayoutWidth;
        }
    }
}
