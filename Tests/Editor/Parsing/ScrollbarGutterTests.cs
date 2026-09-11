using NUnit.Framework;
using ReactUnity.Types;

namespace ReactUnity.Tests.Editor
{
    [TestFixture]
    public class ScrollbarGutterTests
    {
        [TestCase("auto", ScrollbarGutter.Auto)]
        [TestCase("stable", ScrollbarGutter.Stable)]
        [TestCase("stable both-edges", ScrollbarGutter.StableBothEdges)]
        [TestCase("both-edges stable", ScrollbarGutter.StableBothEdges)]
        [TestCase("STABLE", ScrollbarGutter.Stable)]
        [TestCase("both-edges", ScrollbarGutter.Auto)]
        [TestCase("stable stable", ScrollbarGutter.Auto)]
        [TestCase("always", ScrollbarGutter.Auto)]
        public void ParsesScrollbarGutter(string input, ScrollbarGutter expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["scrollbar-gutter"] = input;
            Assert.AreEqual(expected, style.scrollbarGutter);
        }

        [Test]
        public void CamelCaseNameIsAccepted()
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["scrollbarGutter"] = "stable";
            Assert.AreEqual(ScrollbarGutter.Stable, style.scrollbarGutter);
        }
    }
}
