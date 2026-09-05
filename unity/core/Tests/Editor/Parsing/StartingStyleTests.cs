using NUnit.Framework;
using ReactUnity.Styling.Rules;

namespace ReactUnity.Tests.Editor
{
    [TestFixture]
    public class StartingStyleTests
    {
        [Test]
        public void StartingStyleBlocksAreDressedAsMediaForTheParser()
        {
            var css = "@starting-style { .a { opacity: 0; } }\n.b { color: red; @starting-style { color: blue; } }";
            var expected = "@media --rx-starting-style { .a { opacity: 0; } }\n.b { color: red; @media --rx-starting-style { color: blue; } }";

            Assert.AreEqual(expected, ContainerQuery.PrepareForParser(css));
            Assert.AreEqual("@media --rx-starting-style {}", ContainerQuery.PrepareForParser("@STARTING-STYLE{}"));
        }

        [TestCase(".a { content: '@starting-style {'; }")]
        [TestCase("/* @starting-style { */ .a { color: red; }")]
        [TestCase("@starting-styles { .a { color: red; } }")]
        [TestCase("@starting-style;")]
        [TestCase(".a { color: red; }")]
        public void UnrelatedTextIsLeftAlone(string css)
        {
            Assert.AreEqual(css, ContainerQuery.PrepareForParser(css));
        }

        [Test]
        public void ContainerAndStartingStyleCoexist()
        {
            var css = "@container (min-width: 100px) { @starting-style { .a { opacity: 0; } } }";
            var prepared = ContainerQuery.PrepareForParser(css);

            Assert.True(prepared.StartsWith("@media --rx-container-"));
            Assert.True(prepared.Contains("{ @media --rx-starting-style { .a { opacity: 0; } } }"));
        }
    }
}
