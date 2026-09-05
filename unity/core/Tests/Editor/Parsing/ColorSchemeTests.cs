using NUnit.Framework;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Tests.Editor
{
    [TestFixture]
    public class ColorSchemeTests
    {
        [TestCase("normal", ColorScheme.Normal)]
        [TestCase("light", ColorScheme.Light)]
        [TestCase("dark", ColorScheme.Dark)]
        [TestCase("light dark", ColorScheme.LightDark)]
        [TestCase("dark light", ColorScheme.LightDark)]
        [TestCase("only light", ColorScheme.Light)]
        [TestCase("blue", ColorScheme.Normal)]
        public void ParsesColorScheme(string input, ColorScheme expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["color-scheme"] = input;
            Assert.AreEqual(expected, style.colorScheme);
        }

        // With no media provider around, only a single scheme can pick the dark arm.
        [TestCase(null, "ffffffff")]
        [TestCase("light", "ffffffff")]
        [TestCase("dark", "000000ff")]
        [TestCase("light dark", "ffffffff")]
        [TestCase("normal", "ffffffff")]
        public void LightDarkFollowsColorScheme(string scheme, string expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            if (scheme != null) collection["color-scheme"] = scheme;
            collection["color"] = "light-dark(white, black)";
            Assert.AreEqual(expected, ColorUtility.ToHtmlStringRGBA(style.color).ToLowerInvariant());
        }

        [TestCase("dark", "light-dark(red, var(--bg))", "0000ffff")]
        [TestCase("dark", "light-dark(var(--bg), rgba(255, 0, 0, 1))", "ff0000ff")]
        [TestCase("light", "light-dark(var(--bg), red)", "0000ffff")]
        [TestCase("light", "light-dark(rgb(255 0 0), var(--bg))", "ff0000ff")]
        public void LightDarkTakesNestedValues(string scheme, string input, string expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["--bg"] = "rgb(0 0 255)";
            collection["color-scheme"] = scheme;
            collection["color"] = input;
            Assert.AreEqual(expected, ColorUtility.ToHtmlStringRGBA(style.color).ToLowerInvariant());
        }

        [TestCase("light-dark(red)")]
        [TestCase("light-dark(red, blue, green)")]
        [TestCase("light-dark(red, 12px)")]
        public void LightDarkRejectsBadArguments(string input)
        {
            var (collection, style) = TestHelpers.CreateStyle();
            collection["color"] = input;
            Assert.AreEqual(Color.black, style.color);
        }
    }
}
