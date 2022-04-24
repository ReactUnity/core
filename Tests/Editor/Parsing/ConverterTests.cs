using System.Collections.Generic;
using Facebook.Yoga;
using NUnit.Framework;
using ReactUnity.Converters;
using ReactUnity.Styling;
using ReactUnity.Styling.Animations;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Editor.Tests
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
        public void TransitionConverter()
        {

            var collection = new InlineStyles();
            var style = new NodeStyle(null, null, new List<IDictionary<IStyleProperty, object>> { collection });

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
        public void AnimationConverter()
        {
            var collection = new InlineStyles();
            var style = new NodeStyle(null, null, new List<IDictionary<IStyleProperty, object>> { collection });

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
            var converted = AllConverters.CursorListConverter.Convert(
                "url(res:cursors/hand) 5 5, pointer, default, url(https://google.com), asdf 10 20") as CursorList;

            var url0 = converted.Items[0];
            Assert.IsTrue(url0.Valid);
            Assert.AreEqual(null, url0.Name);
            Assert.AreEqual(AssetReferenceType.Resource, url0.Image?.Type);
            Assert.AreEqual("cursors/hand", url0.Image?.Value);
            Assert.AreEqual(5, url0.Offset.x);
            Assert.AreEqual(5, url0.Offset.y);

            var url1 = converted.Items[1];
            Assert.IsTrue(url1.Valid);
            Assert.AreEqual("pointer", url1.Name);
            Assert.AreEqual(null, url1.Image);
            Assert.AreEqual(0, url1.Offset.x);
            Assert.AreEqual(0, url1.Offset.y);

            var url2 = converted.Items[2];
            Assert.IsTrue(url2.Valid);
            Assert.AreEqual("default", url2.Name);
            Assert.AreEqual(null, url2.Image);
            Assert.AreEqual(0, url2.Offset.x);
            Assert.AreEqual(0, url2.Offset.y);

            var url3 = converted.Items[3];
            Assert.IsTrue(url3.Valid);
            Assert.AreEqual(null, url3.Name);
            Assert.AreEqual(AssetReferenceType.Url, url3.Image?.Type);
            Assert.AreEqual("https://google.com", url3.Image?.Value);
            Assert.AreEqual(0, url3.Offset.x);
            Assert.AreEqual(0, url3.Offset.y);

            var url4 = converted.Items[4];
            Assert.IsFalse(url4.Valid);
        }

        [Test]
        public void AudioConverter()
        {
            var collection = new InlineStyles();
            var style = new NodeStyle(null, null, new List<IDictionary<IStyleProperty, object>> { collection });

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
        [TestCase("50ms1", CssKeyword.Invalid)]
        [TestCase("0a", CssKeyword.Invalid)]
        [TestCase("5as", CssKeyword.Invalid)]
        [TestCase("100", CssKeyword.Invalid)]
        public void DurationConverter(object input, object expected)
        {
            Assert.AreEqual(expected, AllConverters.DurationConverter.Convert(input));
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
        [TestCase("50ms1", CssKeyword.Invalid)]
        [TestCase("0a", CssKeyword.Invalid)]
        [TestCase("5as", CssKeyword.Invalid)]
        public void AngleConverter(object input, object expected)
        {
            Assert.AreEqual(expected, AllConverters.AngleConverter.Convert(input));
        }

        [TestCase("0", 0f)]
        [TestCase("172", 172)]
        [TestCase("72pt", 96)]
        [TestCase("172px", 172)]
        [TestCase("172%", 172f * (1f / 100))]
        [TestCase("50ms1", CssKeyword.Invalid)]
        [TestCase("0a", CssKeyword.Invalid)]
        [TestCase("5as", CssKeyword.Invalid)]
        public void LengthConverter(object input, object expected)
        {
            Assert.AreEqual(expected, AllConverters.LengthConverter.Convert(input));
        }

        [TestCase("0", 0f)]
        [TestCase("2", 2f)]
        [TestCase("172%", 172f * (1f / 100))]
        [TestCase("50px", CssKeyword.Invalid)]
        [TestCase("50ms1", CssKeyword.Invalid)]
        [TestCase("0a", CssKeyword.Invalid)]
        [TestCase("5as", CssKeyword.Invalid)]
        public void PercentageConverter(object input, object expected)
        {
            Assert.AreEqual(expected, AllConverters.PercentageConverter.Convert(input));
        }


        [TestCase(0, "000000ff")]
        [TestCase(1, "ffffffff")]
        [TestCase(0.5d, "808080ff")]
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
        [TestCase("rgba(112 189 153 / var(--tw-bg-opacity))", "70bd99ff")] // TODO: handle variables
        public void ColorConverter(object input, object expected)
        {
            var converted = AllConverters.ColorConverter.Convert(input);

            if (converted is Color c) Assert.AreEqual(expected, ColorUtility.ToHtmlStringRGBA(c).ToLowerInvariant());
            else Assert.AreEqual(expected, converted);
        }


        [Test]
        public void NoneAndDefaultWorksForSupportingTypes()
        {
            Assert.AreEqual(YogaDisplay.None, LayoutProperties.Display.Convert("none"));
            Assert.AreEqual(PointerEvents.None, StyleProperties.pointerEvents.Convert("none"));
            Assert.AreEqual(Appearance.None, StyleProperties.appearance.Convert("none"));
            Assert.AreEqual(ObjectFit.None, StyleProperties.objectFit.Convert("none"));
            Assert.AreEqual(CursorList.None, StyleProperties.cursor.Convert("none"));
            Assert.AreEqual(CursorList.Default, StyleProperties.cursor.Convert("default"));
        }
    }
}
