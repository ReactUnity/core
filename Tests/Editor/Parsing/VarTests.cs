using NUnit.Framework;
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
        public void ColorWithVar(object input, object expected)
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
        public void VariableMultiWordTests(object input, object expected)
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
        public void NestedVariableTests(object input, object expected)
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
        public void ComplexBoxShadowTests()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["--tw-shadow"] = "0 35px 60px -15px rgba(0, 0, 0, 0.3)";
            collection["--tw-shadow-colored"] = "0 35px 60px -15px var(--tw-shadow-color)";
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
    }
}
