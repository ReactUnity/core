using NUnit.Framework;
using ReactUnity.Styling;
using TMPro;
using UnityEngine;

namespace ReactUnity.Tests.Editor
{
    /// <summary>
    /// The <c>text-decoration</c> shorthand: it reads the line and the colour, and drops the style
    /// and thickness components TextMeshPro cannot draw rather than invalidating the rule over them.
    /// </summary>
    [TestFixture]
    public class TextDecorationTests
    {
        [TestCase("underline", FontStyles.Underline)]
        [TestCase("line-through", FontStyles.Strikethrough)]
        [TestCase("underline line-through", FontStyles.Underline | FontStyles.Strikethrough)]
        [TestCase("none", FontStyles.Normal)]
        // The style and thickness components are read and dropped, so the line survives them.
        [TestCase("underline dotted", FontStyles.Underline)]
        [TestCase("underline wavy 2px", FontStyles.Underline)]
        [TestCase("underline from-font", FontStyles.Underline)]
        [TestCase("line-through double red", FontStyles.Strikethrough)]
        // A colour alone leaves the line alone, because `fontStyle` also carries italic and bold.
        [TestCase("red", FontStyles.Normal)]
        // Nothing can draw these, so the whole declaration stays invalid.
        [TestCase("overline", FontStyles.Normal)]
        [TestCase("blink", FontStyles.Normal)]
        [TestCase("underline nonsense", FontStyles.Normal)]
        public void TheLineComponentReachesFontStyle(string input, FontStyles expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["text-decoration"] = input;
            Assert.AreEqual(expected, style.GetStyleValue(StyleProperties.fontStyle));
        }

        [TestCase("underline red", 1f, 0f, 0f)]
        [TestCase("red underline", 1f, 0f, 0f)]
        [TestCase("underline dotted #00ff00", 0f, 1f, 0f)]
        [TestCase("blue", 0f, 0f, 1f)]
        public void TheColourComponentReachesTextDecorationColor(string input, float r, float g, float b)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["text-decoration"] = input;
            Assert.AreEqual(new Color(r, g, b), style.GetStyleValue(StyleProperties.textDecorationColor));
        }

        [Test]
        public void AnOmittedColourStaysCurrentColor()
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["color"] = "rgb(10, 20, 30)";
            collection["text-decoration"] = "underline";
            Assert.AreEqual(new Color32(10, 20, 30, 255), (Color32) style.GetStyleValue(StyleProperties.textDecorationColor));
        }

        [Test]
        public void TheLonghandsAreAddressableOnTheirOwn()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["text-decoration-line"] = "line-through";
            collection["text-decoration-color"] = "red";
            Assert.AreEqual(FontStyles.Strikethrough, style.GetStyleValue(StyleProperties.fontStyle));
            Assert.AreEqual(Color.red, style.GetStyleValue(StyleProperties.textDecorationColor));

            // `solid` used to be mapped in as an underline so that `underline solid` survived this
            // converter. The shorthand reads the style component itself now, so it is invalid here.
            collection["text-decoration-line"] = "solid";
            Assert.AreEqual(FontStyles.Strikethrough, style.GetStyleValue(StyleProperties.fontStyle));
        }
    }
}
