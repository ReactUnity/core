using NUnit.Framework;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.Tests.Editor
{
    [TestFixture]
    public class VarTests
    {
        [TestCase("rgb(var(--aa), 189, 153)", "70bd99ff")]
        [TestCase("rgb(var(--cc, 112), 189, 153)", "70bd99ff")]
        [TestCase("rgb(var(--cc), 189, 153)", "000000ff")]
        [TestCase("rgb(calc(var(--bb) * 2), 189, 153)", "70bd99ff")]
        [TestCase("rgb(calc(var(--cc, 56) * 2), 189, 153)", "70bd99ff")]
        [TestCase("rgb(calc(var(--cc) * 2), 189, 153)", "000000ff")]
        public void VariableWorksOnFunctions(object input, object expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["--bb"] = "56";
            collection["--aa"] = "112";
            collection["color"] = input;

            var c = style.color;
            Assert.AreEqual(expected, ColorUtility.ToHtmlStringRGBA(c).ToLowerInvariant());
        }


        [TestCase("rgb(var(--aa), 153)", "70bd99ff")]
        [TestCase("rgb(var(--aa, 112 189), 153)", "70bd99ff")]
        [TestCase("rgb(var(--cc, 112, 189), 153)", "70bd99ff")]
        [TestCase("rgb(var(--cc, 112 189), 153)", "000000ff")]
        [TestCase("rgb(calc(var(--bb) * 2), 189, 153)", "000000ff")]
        public void VariableWorksWithMultiWords(object input, object expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["--bb"] = "56 189";
            collection["--aa"] = "112, 189";
            collection["color"] = input;

            var c = style.color;
            Assert.AreEqual(expected, ColorUtility.ToHtmlStringRGBA(c).ToLowerInvariant());
        }


        [TestCase("rgb(var(--cc, var(--aa)), 153)", "70bd99ff")]
        [TestCase("rgb(var(--cc, var(--dd), 189), 153)", "70bd99ff")]
        [TestCase("rgb(var(--ee), 153)", "70bd99ff")]
        [TestCase("rgb(var(--cc, var(--bb)), 153)", "000000ff")]
        public void VariableWorksWhenNested(object input, object expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["--bb"] = "56 189";
            collection["--aa"] = "112, 189";
            collection["--dd"] = "112";
            collection["--ee"] = "var(--dd), 189";
            collection["color"] = input;

            var c = style.color;
            Assert.AreEqual(expected, ColorUtility.ToHtmlStringRGBA(c).ToLowerInvariant());
        }


        [Test]
        public void VariableWorksOnComplexBoxShadow()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["--tw-shadow"] = "0 35px 60px -15px rgba(0, 0, 0, 0.3)";
            collection["box-shadow"] = "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)";

            var bs = style.boxShadow?.Get(2);
            Assert.AreEqual(new Color(0, 0, 0, 0.3f), bs.color);
            Assert.AreEqual(0, bs.offset.x);
            Assert.AreEqual(35, bs.offset.y);
            Assert.AreEqual(60, bs.blur.x);
            Assert.AreEqual(60, bs.blur.y);
            Assert.AreEqual(-15, bs.spread.x);
            Assert.AreEqual(-15, bs.spread.y);
        }


        [TestCase("var(--aa)", 3, 6, 9, 6)]
        [TestCase("var(--aa) 12px", 3, 6, 9, 12)]
        [TestCase("var(--bb) var(--bb)", 4, 8, 4, 8)]
        public void VariableWorksOnShorthands(object input, object top, object right, object bottom, object left)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["--aa"] = "3px 6px 9px";
            collection["--bb"] = "4px 8px";
            collection["border-width"] = input;

            Assert.AreEqual(top, style.GetStyleValue(LayoutProperties.BorderTopWidth));
            Assert.AreEqual(right, style.GetStyleValue(LayoutProperties.BorderRightWidth));
            Assert.AreEqual(bottom, style.GetStyleValue(LayoutProperties.BorderBottomWidth));
            Assert.AreEqual(left, style.GetStyleValue(LayoutProperties.BorderLeftWidth));
        }
    }
}
