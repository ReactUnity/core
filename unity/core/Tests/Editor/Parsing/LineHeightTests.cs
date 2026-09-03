using NUnit.Framework;

namespace ReactUnity.Tests.Editor
{
    [TestFixture]
    public class LineHeightTests
    {
        // A number with no unit is a multiple of the font size rather than a length, which is what
        // CSS means by it and what a type scale is written in -- Tailwind's `text-base` asks for
        // `calc(1.5 / 1)`, and `leading-normal` for `1.5`.
        [TestCase("1.5", 30f)]
        [TestCase("0.5", 10f)]
        [TestCase("2", 40f)]
        [TestCase("30px", 30f)]
        [TestCase("1.5em", 30f)]
        [TestCase("150%", 30f)]
        [TestCase("calc(1.25 / 0.875)", 28.5714f)]
        [TestCase("calc(1.5 * 2)", 60f)]
        [TestCase("calc(1.5 + 0.5)", 40f)]
        // A calculation with a unit in it is a length, and a bare operand there is just a number.
        [TestCase("calc(10px * 2)", 20f)]
        [TestCase("calc(1em / 2)", 10f)]
        [TestCase("calc(1.5em + 4px)", 34f)]
        public void LineHeight(string value, float expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["font-size"] = "20px";
            collection["line-height"] = value;

            Assert.AreEqual(expected, style.lineHeight, 0.001f);
        }

        // The `font` shorthand reads its line height the same way the longhand does.
        [TestCase("16px / 1.5 sans-serif", 24f)]
        [TestCase("16px / 24px sans-serif", 24f)]
        public void FontShorthandLineHeight(string value, float expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["font"] = value;

            Assert.AreEqual(expected, style.lineHeight, 0.001f);
        }

        // Everywhere else a number with no unit is still pixels, in a calculation as much as alone.
        [TestCase("1.5", 1.5f)]
        [TestCase("calc(1.5 * 2)", 3f)]
        [TestCase("calc(100px / 2)", 50f)]
        [TestCase("calc(1em / 2)", 10f)]
        [TestCase("calc(1em * 2)", 40f)]
        public void ALengthKeepsReadingANumberAsPixels(string value, float expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["font-size"] = "20px";
            collection["letter-spacing"] = value;

            Assert.AreEqual(expected, style.letterSpacing, 0.001f);
        }
    }
}
