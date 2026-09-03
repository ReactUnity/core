using NUnit.Framework;
using ReactUnity.Styling;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Converters;
using ReactUnity.Types;
using UnityEngine;
using Yoga;

namespace ReactUnity.Tests.Editor
{
    [TestFixture]
    public class ConverterTests
    {
        private void AssertTimingFunction(TimingFunction expected, TimingFunction actual)
        {
            Assert.IsNotNull(actual);
            var values = new float[] { 0, 0.1f, 0.25f, 0.4f, 0.5f, 0.6f, 0.75f, 0.9f, 1f };

            foreach (var val in values)
            {
                Assert.AreEqual(expected(val), actual(val));
            }
        }

        [Test]
        public void TransitionShorthandConverter()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["transition"] =
                "width 2s, height 400ms ease-in-out, 500ms 300ms step-start, bbb, bg paused, 3s 400ms linear";

            var Duration = style.transitionDuration;
            var Delay = style.transitionDelay;
            var TimingFunction = style.transitionTimingFunction;
            var Property = style.transitionProperty;
            var PlayState = style.transitionPlayState;

            Assert.AreEqual("width", Property.Get(0).Definition);
            Assert.IsFalse(Property.Get(0).IsAll);
            Assert.AreEqual(2, Duration.Get(0));
            Assert.AreEqual(0, Delay.Get(0));
            AssertTimingFunction(TimingFunctions.Ease, TimingFunction.Get(0) ?? TimingFunctions.Default);


            Assert.AreEqual("height", Property.Get(1).Definition);
            Assert.IsFalse(Property.Get(1).IsAll);
            Assert.AreEqual(0.4f, Duration.Get(1));
            Assert.AreEqual(0, Delay.Get(1));
            AssertTimingFunction(TimingFunctions.EaseInOut, TimingFunction.Get(1));


            Assert.AreEqual("all", Property.Get(2).Definition);
            Assert.IsTrue(Property.Get(2).IsAll);
            Assert.AreEqual(0.5f, Duration.Get(2));
            Assert.AreEqual(0.3f, Delay.Get(2));
            AssertTimingFunction(TimingFunctions.StepStart, TimingFunction.Get(2));

            Assert.IsFalse(Property.Get(3).IsAll);
            Assert.AreEqual("bbb", Property.Get(3).Definition);

            Assert.AreEqual("bg", Property.Get(4).Definition);
            Assert.IsFalse(Property.Get(4).IsAll);
            Assert.AreEqual(AnimationPlayState.Paused, PlayState.Get(4));

            Assert.AreEqual("all", Property.Get(5).Definition);
            Assert.IsTrue(Property.Get(5).IsAll);
            Assert.AreEqual(3, Duration.Get(5));
            Assert.AreEqual(0.4f, Delay.Get(5));
            AssertTimingFunction(TimingFunctions.Linear, TimingFunction.Get(5));
        }

        [Test]
        public void TransitionConverter()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["transition-property"] = "width, height, all, bbb, bg, all";
            collection["transition-duration"] = "2s, 400ms, 500ms, 0, 0, 3s";
            collection["transition-delay"] = "0, 0, 300ms, 0, 0, 400ms";
            collection["transition-play-state"] = "running, running, running, running, paused, running";
            collection["transition-timing-function"] = "ease, ease-in-out, step-start, ease, ease, linear";

            var Duration = style.transitionDuration;
            var Delay = style.transitionDelay;
            var TimingFunction = style.transitionTimingFunction;
            var Property = style.transitionProperty;
            var PlayState = style.transitionPlayState;

            Assert.AreEqual("width", Property.Get(0).Definition);
            Assert.IsFalse(Property.Get(0).IsAll);
            Assert.AreEqual(2, Duration.Get(0));
            Assert.AreEqual(0, Delay.Get(0));
            AssertTimingFunction(TimingFunctions.Ease, TimingFunction.Get(0) ?? TimingFunctions.Default);


            Assert.AreEqual("height", Property.Get(1).Definition);
            Assert.IsFalse(Property.Get(1).IsAll);
            Assert.AreEqual(0.4f, Duration.Get(1));
            Assert.AreEqual(0, Delay.Get(1));
            AssertTimingFunction(TimingFunctions.EaseInOut, TimingFunction.Get(1));


            Assert.AreEqual("all", Property.Get(2).Definition);
            Assert.IsTrue(Property.Get(2).IsAll);
            Assert.AreEqual(0.5f, Duration.Get(2));
            Assert.AreEqual(0.3f, Delay.Get(2));
            AssertTimingFunction(TimingFunctions.StepStart, TimingFunction.Get(2));

            Assert.IsFalse(Property.Get(3).IsAll);
            Assert.AreEqual("bbb", Property.Get(3).Definition);

            Assert.AreEqual("bg", Property.Get(4).Definition);
            Assert.IsFalse(Property.Get(4).IsAll);
            Assert.AreEqual(AnimationPlayState.Paused, PlayState.Get(4));

            Assert.AreEqual("all", Property.Get(5).Definition);
            Assert.IsTrue(Property.Get(5).IsAll);
            Assert.AreEqual(3, Duration.Get(5));
            Assert.AreEqual(0.4f, Delay.Get(5));
            AssertTimingFunction(TimingFunctions.Linear, TimingFunction.Get(5));
        }

        [Test]
        public void AnimationConverter()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["animation"] =
                "roll 3s 1s ease-in 2 reverse both, 500ms linear alternate-reverse slidein, slideout 4s infinite";


            var Delay = style.animationDelay;
            var Direction = style.animationDirection;
            var Duration = style.animationDuration;
            var FillMode = style.animationFillMode;
            var IterationCount = style.animationIterationCount;
            var Name = style.animationName;
            var PlayState = style.animationPlayState;
            var TimingFunction = style.animationTimingFunction;

            Assert.AreEqual("roll", Name.Get(0));
            Assert.AreEqual(3, Duration.Get(0));
            Assert.AreEqual(1, Delay.Get(0));
            Assert.AreEqual(2, IterationCount.Get(0));
            Assert.AreEqual(AnimationFillMode.Both, FillMode.Get(0));
            Assert.AreEqual(AnimationDirection.Reverse, Direction.Get(0));
            AssertTimingFunction(TimingFunctions.EaseIn, TimingFunction.Get(0));

            Assert.AreEqual("slidein", Name.Get(1));
            Assert.AreEqual(0.5f, Duration.Get(1));
            Assert.AreEqual(0, Delay.Get(1));
            Assert.AreEqual(1, IterationCount.Get(1));
            Assert.AreEqual(AnimationFillMode.None, FillMode.Get(1));
            Assert.AreEqual(AnimationDirection.AlternateReverse, Direction.Get(1));
            AssertTimingFunction(TimingFunctions.Linear, TimingFunction.Get(1));

            Assert.AreEqual("slideout", Name.Get(2));
            Assert.AreEqual(4, Duration.Get(2));
            Assert.AreEqual(-1, IterationCount.Get(2));
            AssertTimingFunction(TimingFunctions.Ease, TimingFunction.Get(2) ?? TimingFunctions.Default);
        }

        [Test]
        public void CursorConverter()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["cursor"] = "url(res:cursors/hand) 5 5, pointer, default, url(https://google.com)";
            var converted = style.cursor;

            var url0 = converted.Get(0);
            Assert.IsTrue(url0.Valid);
            Assert.AreEqual(null, url0.Name);
            Assert.AreEqual(AssetReferenceType.Resource, url0.Image?.Type);
            Assert.AreEqual("cursors/hand", url0.Image?.Value);
            Assert.AreEqual(5, url0.Offset.x);
            Assert.AreEqual(5, url0.Offset.y);

            var url1 = converted.Get(1);
            Assert.IsTrue(url1.Valid);
            Assert.AreEqual("pointer", url1.Name);
            Assert.AreEqual(null, url1.Image);
            Assert.AreEqual(0, url1.Offset.x);
            Assert.AreEqual(0, url1.Offset.y);

            var url2 = converted.Get(2);
            Assert.IsTrue(url2.Valid);
            Assert.AreEqual("default", url2.Name);
            Assert.AreEqual(null, url2.Image);
            Assert.AreEqual(0, url2.Offset.x);
            Assert.AreEqual(0, url2.Offset.y);

            var url3 = converted.Get(3);
            Assert.IsTrue(url3.Valid);
            Assert.AreEqual(null, url3.Name);
            Assert.AreEqual(AssetReferenceType.Url, url3.Image?.Type);
            Assert.AreEqual("https://google.com", url3.Image?.Value);
            Assert.AreEqual(0, url3.Offset.x);
            Assert.AreEqual(0, url3.Offset.y);
        }

        [Test]
        public void AudioConverter()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["audio"] =
                "url(res:click) 3s 5, url(https://example.com) infinite 2s, url(res:something)";

            var Clip = style.audioClip;
            var Delay = style.audioDelay;
            var IterationCount = style.audioIterationCount;

            Assert.AreEqual(AssetReferenceType.Resource, Clip.Get(0).Type);
            Assert.AreEqual("click", Clip.Get(0).Value);
            Assert.AreEqual(3, Delay.Get(0));
            Assert.AreEqual(5, IterationCount.Get(0));

            Assert.AreEqual(AssetReferenceType.Url, Clip.Get(1).Type);
            Assert.AreEqual("https://example.com", Clip.Get(1).Value);
            Assert.AreEqual(2, Delay.Get(1));
            Assert.AreEqual(-1, IterationCount.Get(1));

            Assert.AreEqual(AssetReferenceType.Resource, Clip.Get(2).Type);
            Assert.AreEqual("something", Clip.Get(2).Value);
            Assert.AreEqual(0, Delay.Get(2));
            Assert.AreEqual(1, IterationCount.Get(2, 1));
        }


        [TestCase("0", 0f)]
        [TestCase("0s", 0f)]
        [TestCase("0ms", 0f)]
        [TestCase("400ms", 0.4f)]
        [TestCase("1s", 1f)]
        [TestCase("2s", 2f)]
        [TestCase("50ms1", float.NaN)]
        [TestCase("0a", float.NaN)]
        [TestCase("5as", float.NaN)]
        [TestCase("100", float.NaN)]
        public void DurationConverter(object input, object expected)
        {
            Assert.AreEqual(expected, AllConverters.DurationConverter.TryGetConstantValue(input, float.NaN));
        }

        [TestCase("0", 0f)]
        [TestCase("172", 172)]
        [TestCase("172deg", 172)]
        [TestCase("0rad", 0f)]
        [TestCase("1rad", 180f / Mathf.PI)]
        [TestCase("1grad", 200f / 180f)]
        [TestCase("1turn", 360f)]
        [TestCase("4turn", 360f * 4)]
        [TestCase("0.1turn", 36f)]
        [TestCase("50ms1", float.NaN)]
        [TestCase("0a", float.NaN)]
        [TestCase("5as", float.NaN)]
        public void AngleConverter(object input, object expected)
        {
            Assert.AreEqual(expected, AllConverters.AngleConverter.TryGetConstantValue(input, float.NaN));
        }

        [TestCase("0", 0f)]
        [TestCase("172", 172)]
        [TestCase(" 172", 172)]
        [TestCase(" 172 ", 172)]
        [TestCase("172 ", 172)]
        [TestCase("72pt", 96)]
        [TestCase("172px", 172)]
        [TestCase("50ms1", float.NaN)]
        [TestCase("0a", float.NaN)]
        [TestCase("5as", float.NaN)]
        [TestCase("172 12", float.NaN)]
        public void LengthConverter(object input, object expected)
        {
            Assert.AreEqual(expected, AllConverters.LengthConverter.TryGetConstantValue(input, float.NaN));
        }

        [TestCase("0", 0f)]
        [TestCase("2", 2f)]
        [TestCase("172%", 172f * (1f / 100))]
        [TestCase("50px", float.NaN)]
        [TestCase("50ms1", float.NaN)]
        [TestCase("0a", float.NaN)]
        [TestCase("5as", float.NaN)]
        public void PercentageConverter(object input, object expected)
        {
            Assert.AreEqual(expected, AllConverters.PercentageConverter.TryGetConstantValue(input, float.NaN));
        }


        [TestCase("#70bd99", "70bd99ff")]
        [TestCase("#70bd99be", "70bd99be")]
        [TestCase("hsl(152, 37%, 59%)", "70bd99ff")]
        [TestCase("hsl(152, 37%, 59%, 0.746)", "70bd99be")]
        [TestCase("hsla(152, 37%, 59%, 0.746)", "70bd99be")]
        [TestCase("hsla(152 37% 59% / 0.746)", "70bd99be")]
        [TestCase("hsla(152 37% 59% / 74.6%)", "70bd99be")]
        [TestCase("rgb(112, 189, 153)", "70bd99ff")]
        [TestCase("rgb(112, 189, 153, 0.745)", "70bd99be")]
        [TestCase("rgba(112, 189, 153, 0.745)", "70bd99be")]
        [TestCase("rgba(112 189 153 / 0.745)", "70bd99be")]
        [TestCase("rgba(112 189 153 / 74.5%)", "70bd99be")]
        [TestCase("hsv(240, 51%, 72%, 74.5%)", "5a5ab8be")]
        [TestCase("hsva(240 51% 72% / 74.5%)", "5a5ab8be")]
        [TestCase("hsl(2, 57%, 40%)", "a0302cff")]
        [TestCase("rgba(112 189 153 / var(--tw-bg-opacity))", null)]
        // Reference values come from a browser. oklch(63.7% 0.237 25.331) is Tailwind's red-500.
        [TestCase("oklch(63.7% 0.237 25.331)", "fb2c36ff")]
        [TestCase("oklch(0.637 0.237 25.331)", "fb2c36ff")]
        [TestCase("oklch(0.637, 0.237, 25.331)", "fb2c36ff")]
        [TestCase("oklch(0.637 59.25% 25.331)", "fb2c36ff")]
        [TestCase("oklch(0 0 0)", "000000ff")]
        [TestCase("oklch(1 0 0)", "ffffffff")]
        [TestCase("oklch(0.7 0.1 200)", "40b1b7ff")]
        [TestCase("oklch(0.7 0.1 200deg)", "40b1b7ff")]
        [TestCase("oklch(0.7 0.1 0.5turn)", "4bb3a1ff")]
        [TestCase("oklch(0.7 none 200)", "9e9e9eff")]
        [TestCase("oklch(0.5 0.2 30 / 0.5)", "ba0d0180")]
        [TestCase("oklch(0.5 0.2 30 / 50%)", "ba0d0180")]
        [TestCase("oklch(0.7 0.1 var(--hue))", null)]
        [TestCase("oklch(0.7 0.1)", null)]
        [TestCase("oklab(0.5 0.1 -0.1)", "81459aff")]
        // The same red-500, given in oklab instead of oklch.
        [TestCase("oklab(0.637 0.2142 0.1014)", "fb2c36ff")]
        // CIE lab()/lch(). Lightness is 0..100 here rather than 0..1, so a percentage is itself.
        // CSS Color 4 publishes red as lab(54.29% 80.8 69.89) and lch(54.29% 106.84 40.86).
        [TestCase("lab(54.2905 80.8049 69.891)", "ff0000ff")]
        [TestCase("lab(54.29% 80.8 69.89)", "ff0000ff")]
        [TestCase("lab(50 40 -30)", "a55babff")]
        [TestCase("lab(50, 40, -30)", "a55babff")]
        // The a/b axes take 125 as their 100%, and lch()'s chroma takes 150.
        [TestCase("lab(50 32% -24%)", "a55babff")]
        [TestCase("lab(100 0 0)", "ffffffff")]
        [TestCase("lab(0 0 0)", "000000ff")]
        [TestCase("lab(50 none none)", "777777ff")]
        [TestCase("lab(50 40 -30 / 50%)", "a55bab80")]
        [TestCase("lab(50 40)", null)]
        [TestCase("lab(50 40 var(--b))", null)]
        [TestCase("lch(54.2905 106.8372 40.8577)", "ff0000ff")]
        [TestCase("lch(50 50 180)", "008c75ff")]
        [TestCase("lch(50 33.3333% 180)", "008c75ff")]
        [TestCase("lch(70 30 0.5turn)", "66baaaff")]
        // Tailwind's red-500 and green-400 again, this time through CIE Lab, so the two
        // families are pinned to the same two colors.
        [TestCase("lab(55.5764 75.1391 49.157)", "fb2c36ff")]
        [TestCase("lch(78.4347 76.1655 148.4604)", "05df72ff")]
        public void ColorConverter(object input, object expected)
        {
            var converted = AllConverters.ColorConverter.TryGetConstantValue<Color>(input, out var c);

            if (converted) Assert.AreEqual(expected, ColorUtility.ToHtmlStringRGBA(c).ToLowerInvariant());
            else Assert.AreEqual(expected, null);
        }

        // Reference values come from a browser, except where noted.
        [TestCase("color-mix(in srgb, red, blue)", "800080ff")]
        [TestCase("color-mix(in srgb, red 25%, blue)", "4000bfff")]
        [TestCase("color-mix(in srgb, 25% red, blue)", "4000bfff")]
        [TestCase("color-mix(in srgb, red, blue 75%)", "4000bfff")]
        [TestCase("color-mix(in srgb-linear, red, blue)", "bc00bcff")]
        [TestCase("color-mix(in hsl, red, blue)", "ff00ffff")]
        [TestCase("color-mix(in oklab, red, blue)", "8c53a2ff")]
        [TestCase("color-mix(in oklab, red 30%, blue)", "5d4bc8ff")]
        [TestCase("color-mix(in oklab, red, white)", "ffa191ff")]
        [TestCase("color-mix(in oklch, red, blue)", "ba00c2ff")]
        [TestCase("color-mix(in oklch shorter hue, red, blue)", "ba00c2ff")]
        [TestCase("color-mix(in oklch longer hue, red, blue)", "009300ff")]
        // Mixing with a transparent color must not drag the result towards black.
        [TestCase("color-mix(in srgb, red 50%, transparent)", "ff000080")]
        [TestCase("color-mix(in srgb, red, rgba(0, 0, 255, 0))", "ff000080")]
        // Percentages summing under 100% scale the alpha by that sum.
        [TestCase("color-mix(in srgb, red 20%, blue 20%)", "80008066")]
        [TestCase("color-mix(in srgb, rgb(255, 0, 0), rgb(0, 0, 255))", "800080ff")]
        [TestCase("color-mix(in srgb, oklch(0 0 0), oklch(1 0 0))", "808080ff")]
        // Invalid: unknown space, missing space, both percentages zero, wrong argument count.
        [TestCase("color-mix(in cielab, red, blue)", null)]
        [TestCase("color-mix(red, blue)", null)]
        [TestCase("color-mix(in srgb, red 0%, blue 0%)", null)]
        [TestCase("color-mix(in srgb, red)", null)]
        [TestCase("color-mix(in srgb, red, notacolor)", null)]
        // A hue method is only meaningful in a polar space.
        [TestCase("color-mix(in oklab longer hue, red, blue)", null)]
        // Tailwind v4's opacity utilities, verbatim. Its published hex for red-500 is #fb2c36 and
        // for green-400 #05df72, so these also pin the oklch conversion to Tailwind's own palette.
        [TestCase("color-mix(in srgb, oklch(63.7% 0.237 25.331) 50%, transparent)", "fb2c3680")]
        [TestCase("color-mix(in srgb, oklch(79.2% 0.209 151.711) 25%, transparent)", "05df7240")]
        [TestCase("color-mix(in oklab, oklch(63.7% 0.237 25.331) 50%, transparent)", "fb2c3680")]
        // CIE lab and lch as interpolation spaces. The first two are CSS Color 5's own worked
        // examples, which publish lch(79.7256% 40.448 84.771) and lch(49.4429% 40.483 162.5452).
        [TestCase("color-mix(in lch, peru 40%, palegoldenrod)", "dfc279ff")]
        [TestCase("color-mix(in lch, teal 65%, olive)", "14865fff")]
        [TestCase("color-mix(in lab, red, blue)", "c10088ff")]
        [TestCase("color-mix(in lab, red 25%, blue)", "9100c2ff")]
        [TestCase("color-mix(in lab, white, black)", "777777ff")]
        [TestCase("color-mix(in lab, red 50%, transparent)", "ff000080")]
        [TestCase("color-mix(in lch, red, blue)", "f50086ff")]
        [TestCase("color-mix(in lch shorter hue, red, blue)", "f50086ff")]
        [TestCase("color-mix(in lch longer hue, red, blue)", "008240ff")]
        // lab has no hue channel, so a hue method is a syntax error there.
        [TestCase("color-mix(in lab longer hue, red, blue)", null)]
        [TestCase("color-mix(in lab, lch(54.2905 106.8372 40.8577) 50%, transparent)", "ff000080")]
        public void ColorMixConverter(object input, object expected)
        {
            var converted = AllConverters.ColorConverter.TryGetConstantValue<Color>(input, out var c);

            if (converted) Assert.AreEqual(expected, ColorUtility.ToHtmlStringRGBA(c).ToLowerInvariant());
            else Assert.AreEqual(expected, null);
        }

        [Test]
        public void ColorMixResolvesVariablesLazily()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["--brand"] = "blue";
            collection["color"] = "color-mix(in srgb, red, var(--brand))";

            Assert.AreEqual("800080ff", ColorUtility.ToHtmlStringRGBA(style.color).ToLowerInvariant());
        }

        [Test]
        public void OklchResolvesVariablesLazily()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["--hue"] = "25.331";
            collection["color"] = "oklch(0.637 0.237 var(--hue))";

            Assert.AreEqual("fb2c36ff", ColorUtility.ToHtmlStringRGBA(style.color).ToLowerInvariant());
        }

        // The shape a Tailwind v4 theme uses: the palette lives in variables holding oklch().
        [Test]
        public void OklchWorksThroughAVariableHoldingTheWholeColor()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["--color-blue-600"] = "oklch(54.6% 0.245 262.881)";
            collection["color"] = "var(--color-blue-600)";

            Assert.AreEqual("155dfcff", ColorUtility.ToHtmlStringRGBA(style.color).ToLowerInvariant());
        }

        [Test]
        public void ColorMixTakesAVariableHoldingTheWholeColor()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["--color-red-500"] = "oklch(63.7% 0.237 25.331)";
            collection["color"] = "color-mix(in oklab, var(--color-red-500) 50%, transparent)";

            Assert.AreEqual("fb2c3680", ColorUtility.ToHtmlStringRGBA(style.color).ToLowerInvariant());
        }


        [Test]
        public void NoneAndDefaultWorksForSupportingTypes()
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["display"] = "none";
            collection["pointer-events"] = "none";
            collection["appearance"] = "none";
            collection["object-fit"] = "none";
            collection["cursor"] = "none";

            Assert.AreEqual(YogaDisplay.None, style.GetStyleValue(LayoutProperties.Display));
            Assert.AreEqual(PointerEvents.None, style.pointerEvents);
            Assert.AreEqual(Appearance.None, style.appearance);
            Assert.AreEqual(ObjectFit.None, style.objectFit);
            Assert.AreEqual(Types.Cursor.None, style.cursor?.Get(0));

            (collection, style) = TestHelpers.CreateStyle();
            collection["cursor"] = "default";
            Assert.AreEqual(Types.Cursor.Default, style.cursor?.Get(0));
        }
    }
}
