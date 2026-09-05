using NUnit.Framework;
using ReactUnity.Styling;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using ReactUnity.Styling.Rules;
using ReactUnity.Types;
using UnityEngine;
using Yoga;

namespace ReactUnity.Tests.Editor
{
    /// <summary>
    /// The property names, keywords and units that used to be dropped silently: what Tailwind emits,
    /// and what the web spells differently from the property ReactUnity already had.
    /// </summary>
    [TestFixture]
    public class PropertyAliasTests
    {
        static string TmpEnumName(NodeStyle style, string property) => style.GetStyleValue<object>(CssProperties.GetProperty(property))?.ToString();

        [Test]
        public void VendorPrefixesAreStripped()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["-webkit-line-clamp"] = "3";
            Assert.AreEqual(3, style.maxLines);

            Assert.AreSame(CssProperties.GetKey("text-stroke"), CssProperties.GetKey("-webkit-text-stroke"));
            Assert.AreSame(CssProperties.GetProperty("text-stroke-width"), CssProperties.GetProperty("-moz-text-stroke-width"));
            Assert.IsInstanceOf<VariableProperty>(CssProperties.GetKey("--webkit-color"));
            Assert.IsNull(CssProperties.GetKey("-webkit-box-orient"));
        }

        // TMP enums are compared by name: the Editor test assembly does not reference TextMeshPro.
        [TestCase("underline", "Underline")]
        [TestCase("line-through", "Strikethrough")]
        [TestCase("underline line-through", "Underline, Strikethrough")]
        [TestCase("none", "Normal")]
        public void TextDecorationLineSetsTheFontStyle(string value, string expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["text-decoration-line"] = value;
            Assert.AreEqual(expected, TmpEnumName(style, "font-style"));
        }

        [TestCase("auto", YogaOverflow.Scroll)]
        [TestCase("clip", YogaOverflow.Hidden)]
        [TestCase("scroll", YogaOverflow.Scroll)]
        [TestCase("hidden", YogaOverflow.Hidden)]
        [TestCase("visible", YogaOverflow.Visible)]
        public void OverflowKeywordsReachBothAxes(string value, YogaOverflow expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["overflow"] = value;
            Assert.AreEqual(expected, style.GetStyleValue(LayoutProperties.Overflow));
            Assert.AreEqual(expected, style.overflowX);
            Assert.AreEqual(expected, style.overflowY);
        }

        [Test]
        public void OverflowTakesTwoValuesAndTheAxesStandAlone()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["overflow"] = "hidden auto";
            Assert.AreEqual(YogaOverflow.Hidden, style.overflowX);
            Assert.AreEqual(YogaOverflow.Scroll, style.overflowY);
            Assert.AreEqual(YogaOverflow.Scroll, style.GetStyleValue(LayoutProperties.Overflow));

            collection["overflow-y"] = "visible";
            style.UpdateParent(null);
            Assert.AreEqual(YogaOverflow.Visible, style.overflowY);

            var (only, onlyStyle) = TestHelpers.CreateStyle();
            only["overflow-x"] = "hidden";
            Assert.AreEqual(YogaOverflow.Hidden, onlyStyle.overflowX);
            Assert.AreEqual(YogaOverflow.Visible, onlyStyle.overflowY);
            Assert.AreEqual(YogaOverflow.Visible, onlyStyle.GetStyleValue(LayoutProperties.Overflow));
        }

        [TestCase("dvh")]
        [TestCase("svh")]
        [TestCase("lvh")]
        [TestCase("dvw")]
        [TestCase("svmin")]
        [TestCase("lvmax")]
        [TestCase("vi")]
        [TestCase("vb")]
        public void ViewportUnitVariantsParseAsViewportLengths(string unit)
        {
            Assert.IsTrue(AllConverters.LengthConverter.TryParse("50" + unit, out var length));
            Assert.IsInstanceOf<ComputedRootRelative>(length);

            Assert.IsTrue(AllConverters.FontSizeConverter.TryParse("50" + unit, out var fontSize));
            Assert.IsInstanceOf<ComputedRootRelative>(fontSize);
        }

        [TestCase("font-variant", "small-caps", TextTransform.SmallCaps)]
        [TestCase("font-variant-caps", "all-small-caps", TextTransform.SmallCaps)]
        [TestCase("font-variant", "petite-caps", TextTransform.SmallCaps)]
        [TestCase("font-variant", "normal", TextTransform.None)]
        public void FontVariantIsATextTransform(string property, string value, TextTransform expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["text-transform"] = "uppercase";
            collection[property] = value;
            Assert.AreEqual(expected, style.textTransform);
        }

        [TestCase("justify", "Justified")]
        [TestCase("start", "Left")]
        [TestCase("end", "Right")]
        [TestCase("center", "Center")]
        public void TextAlignKeywords(string value, string expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["text-align"] = value;
            Assert.AreEqual(expected, TmpEnumName(style, "text-align"));
        }

        [TestCase("clip", "Masking")]
        [TestCase("ellipsis", "Ellipsis")]
        public void TextOverflowKeywords(string value, string expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["text-overflow"] = value;
            Assert.AreEqual(expected, TmpEnumName(style, "text-overflow"));
        }

        [TestCase("white-space", "normal", WhiteSpace.Normal)]
        [TestCase("white-space", "nowrap", WhiteSpace.NoWrap)]
        [TestCase("white-space", "pre", WhiteSpace.Pre)]
        [TestCase("white-space", "pre-wrap", WhiteSpace.PreWrap)]
        [TestCase("white-space", "pre-line", WhiteSpace.PreLine)]
        [TestCase("white-space", "break-spaces", WhiteSpace.BreakSpaces)]
        [TestCase("text-wrap", "wrap", WhiteSpace.Normal)]
        [TestCase("text-wrap", "nowrap", WhiteSpace.NoWrap)]
        [TestCase("text-wrap", "balance", WhiteSpace.Normal)]
        [TestCase("text-wrap", "pretty", WhiteSpace.Normal)]
        public void WhiteSpaceAndTextWrapKeywords(string property, string value, WhiteSpace expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection[property] = value;
            Assert.AreEqual(expected, style.whiteSpace);
        }

        [Test]
        public void WhiteSpaceSplitsIntoWrappingAndPreservation()
        {
            Assert.IsTrue(WhiteSpace.Normal.Wraps());
            Assert.IsFalse(WhiteSpace.Normal.PreservesWhitespace());
            Assert.IsFalse(WhiteSpace.NoWrap.Wraps());
            Assert.IsFalse(WhiteSpace.Pre.Wraps());
            Assert.IsTrue(WhiteSpace.Pre.PreservesWhitespace());
            Assert.IsTrue(WhiteSpace.PreWrap.Wraps());
            Assert.IsTrue(WhiteSpace.PreWrap.PreservesWhitespace());
            Assert.IsTrue(WhiteSpace.PreLine.Wraps());
            Assert.IsFalse(WhiteSpace.PreLine.PreservesWhitespace());
        }

        [Test]
        public void TextShadowIsAShadowList()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            Assert.AreEqual(0, style.textShadow.Count);
            Assert.AreEqual(0, style.textShadow.Get(0).color.a);

            collection["text-shadow"] = "1px 2px 3px red, 0 0 blue";
            style.UpdateParent(null);

            var shadows = style.textShadow;
            Assert.AreEqual(2, shadows.Count);
            Assert.AreEqual(new Vector2(1, 2), shadows.Get(0).offset);
            Assert.AreEqual(new Vector2(3, 3), shadows.Get(0).blur);
            Assert.AreEqual(Color.red, shadows.Get(0).color);
            Assert.AreEqual(Color.blue, shadows.Get(1).color);
        }

        [Test]
        public void CaretColorDefaultsToCurrentColor()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["color"] = "blue";
            Assert.AreEqual(Color.blue, style.caretColor);

            collection["caret-color"] = "red";
            style.UpdateParent(null);
            Assert.AreEqual(Color.red, style.caretColor);

            collection["caret-color"] = "auto";
            style.UpdateParent(null);
            Assert.AreEqual(Color.blue, style.caretColor);
        }

        [TestCase("min(10px, 20px)", 10)]
        [TestCase("max(10px, 20px)", 20)]
        [TestCase("clamp(10px, 5px, 20px)", 10)]
        [TestCase("clamp(10px, 25px, 20px)", 20)]
        [TestCase("clamp(10px, 15px, 20px)", 15)]
        [TestCase("clamp(20px, 5px, 10px)", 20)]
        [TestCase("clamp(none, 25px, 20px)", 20)]
        [TestCase("clamp(10px, 5px, none)", 10)]
        [TestCase("min(30px, 2px * 10)", 20)]
        [TestCase("min(30px, calc(2px * 10))", 20)]
        [TestCase("calc(min(10px, 20px) * 2)", 20)]
        [TestCase("max(2px, var(--aa))", 8)]
        [TestCase("min(2px + var(--aa), 5px)", 5)]
        public void MinMaxClampOnLengths(string value, float expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["--aa"] = "8px";
            collection["font-size"] = value;
            Assert.AreEqual(expected, style.fontSize, 0.0001f);
        }

        [TestCase("clamp(0, 2, 1)", 1)]
        [TestCase("min(0.5, 0.25)", 0.25f)]
        [TestCase("max(50%, 0.25)", 0.5f)]
        [TestCase("min(0.5, 2s)", 1)]
        [TestCase("clamp(0, 0.5)", 1)]
        public void MinMaxClampOnNumbers(string value, float expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["opacity"] = value;
            Assert.AreEqual(expected, style.opacity, 0.0001f);
        }

        [TestCase("min(300ms, 1s)", 0.3f)]
        [TestCase("max(300ms, 1s)", 1)]
        [TestCase("clamp(100ms, 2s, 1s)", 1)]
        public void MinMaxClampOnDurations(string value, float expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["animation-duration"] = value;
            Assert.AreEqual(expected, style.animationDuration.Get(0), 0.0001f);
        }

        [Test]
        public void FilterResolvesAChainOfEmptyFallbackVariables()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["--tw-blur"] = "blur(8px)";
            collection["filter"] = "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,)";

            var filter = style.GetStyleValue(StyleProperties.filter);
            Assert.IsNotNull(filter);
            Assert.AreEqual(8, filter.Blur);
            Assert.AreEqual(1, filter.Brightness);
        }

        [TestCase("linear-gradient(to right in oklab, red, blue)", "linear-gradient(to right, red, blue)")]
        [TestCase("linear-gradient(in oklab, red, blue)", "linear-gradient(red, blue)")]
        [TestCase("linear-gradient(to right in oklch longer hue, red, blue)", "linear-gradient(to right, red, blue)")]
        [TestCase("linear-gradient(45deg in srgb, red, blue)", "linear-gradient(45deg, red, blue)")]
        [TestCase("radial-gradient(in oklab, red, blue)", "radial-gradient(red, blue)")]
        [TestCase("radial-gradient(circle in oklab, red, blue)", "radial-gradient(circle, red, blue)")]
        [TestCase("conic-gradient(in oklab, red, blue)", "conic-gradient(red, blue)")]
        [TestCase("conic-gradient(from 45deg in oklab, red, blue)", "conic-gradient(from 45deg, red, blue)")]
        public void GradientsAcceptAColorInterpolationHint(string hinted, string plain)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["background"] = hinted;
            style.UpdateParent(null);
            var withHint = style.backgroundImage?.Get(0) as GradientImageDefinition;
            Assert.IsNotNull(withHint, hinted);

            collection["background"] = plain;
            style.UpdateParent(null);
            var withoutHint = style.backgroundImage?.Get(0) as GradientImageDefinition;

            Assert.AreEqual(withoutHint.Gradient.GetType(), withHint.Gradient.GetType());
            Assert.AreEqual(withoutHint.Gradient.GetRamp(Vector2.one * 100).Texture.imageContentsHash, withHint.Gradient.GetRamp(Vector2.one * 100).Texture.imageContentsHash);
        }

        [Test]
        public void ScrollbarColorAndWidthFeedTheScrollbarVariables()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["color"] = "var(--scrollbar-thumb-color, lime)";
            collection["background-color"] = "var(--scrollbar-track-color, lime)";
            collection["font-size"] = "var(--scrollbar-width, 12px)";

            collection["scrollbar-color"] = "red rgb(0, 0, 255)";
            collection["scrollbar-width"] = "thin";
            Assert.AreEqual(Color.red, style.color);
            Assert.AreEqual(Color.blue, style.backgroundColor);
            Assert.AreEqual(6, style.fontSize);

            collection["scrollbar-width"] = "none";
            style.UpdateParent(null);
            Assert.AreEqual(0, style.fontSize);

            collection["scrollbar-size"] = "8px";
            style.UpdateParent(null);
            Assert.AreEqual(8, style.fontSize);

            collection["scrollbar-width"] = "auto";
            collection["scrollbar-color"] = "auto";
            style.UpdateParent(null);
            Assert.AreEqual(12, style.fontSize);
            Assert.AreEqual(Color.green, style.color);
            Assert.AreEqual(Color.green, style.backgroundColor);

            collection["scrollbar-color"] = "red";
            style.UpdateParent(null);
            Assert.AreEqual(Color.red, style.color);
            Assert.AreEqual(Color.green, style.backgroundColor);
        }

        [Test]
        public void PreferenceMediaFeaturesExistAndCanBeSet()
        {
            var provider = DefaultMediaProvider.CreateMediaProvider("runtime", "ugui", false);

            // In the Editor the default follows the skin, so the assertion is against whatever it is.
            var scheme = provider.GetValue("prefers-color-scheme");
            var other = scheme == "dark" ? "light" : "dark";
            Assert.IsTrue(MediaQueryList.Create(provider, $"(prefers-color-scheme: {scheme})").matches);
            Assert.IsFalse(MediaQueryList.Create(provider, $"(prefers-color-scheme: {other})").matches);

            provider.SetValue("prefers-color-scheme", other);
            Assert.IsTrue(MediaQueryList.Create(provider, $"(prefers-color-scheme: {other})").matches);

            Assert.IsTrue(MediaQueryList.Create(provider, "(prefers-reduced-motion: no-preference)").matches);
            Assert.IsFalse(MediaQueryList.Create(provider, "(prefers-reduced-motion: reduce)").matches);

            provider.SetValue("prefers-reduced-motion", "reduce");
            Assert.IsTrue(MediaQueryList.Create(provider, "(prefers-reduced-motion: reduce)").matches);
        }
    }
}
