using NUnit.Framework;
using ReactUnity.Animations;
using ReactUnity.Converters;
using ReactUnity.Styling;
using ReactUnity.Types;
using UnityEngine;

namespace ReactUnity.Editor.Tests
{
    [TestFixture]
    public class ConverterTests
    {
        private void AssertTimingFunction(TimingFunction expected, TimingFunction actual)
        {
            var values = new float[] { 0, 0.1f, 0.25f, 0.4f, 0.5f, 0.6f, 0.75f, 0.9f, 1f };

            foreach (var val in values)
            {
                Assert.AreEqual(expected(val), actual(val));
            }
        }

        [Test]
        public void TransitionConverter()
        {
            var converted = AllConverters.TransitionListConverter.Convert("width 2s, height 400ms ease-in-out, 500ms 300ms step-start, bbb, bg paused, 3s 400ms linear") as TransitionList;

            var widthTr = converted.Items[0];
            Assert.IsTrue(widthTr.Valid);
            Assert.AreEqual("width", widthTr.Property);
            Assert.IsFalse(widthTr.All);
            Assert.AreEqual(2000, widthTr.Duration);
            Assert.AreEqual(0, widthTr.Delay);
            Assert.AreEqual("width", widthTr.Property);
            AssertTimingFunction(TimingFunctions.Ease, widthTr.TimingFunction);


            var heightTr = converted.Items[1];
            Assert.IsTrue(heightTr.Valid);
            Assert.AreEqual("height", heightTr.Property);
            Assert.IsFalse(heightTr.All);
            Assert.AreEqual(400, heightTr.Duration);
            Assert.AreEqual(0, heightTr.Delay);
            Assert.AreEqual("height", heightTr.Property);
            AssertTimingFunction(TimingFunctions.EaseInOut, heightTr.TimingFunction);


            var allTr = converted.Items[2];
            Assert.IsTrue(allTr.Valid);
            Assert.AreEqual("all", allTr.Property);
            Assert.IsTrue(allTr.All);
            Assert.AreEqual(500, allTr.Duration);
            Assert.AreEqual(300, allTr.Delay);
            Assert.AreEqual("all", allTr.Property);
            AssertTimingFunction(TimingFunctions.StepStart, allTr.TimingFunction);

            var invalidTr = converted.Items[3];
            Assert.IsTrue(invalidTr.Valid);
            Assert.IsFalse(invalidTr.All);
            Assert.AreEqual("bbb", invalidTr.Property);

            var pausedTr = converted.Items[4];
            Assert.IsTrue(pausedTr.Valid);
            Assert.AreEqual("bg", pausedTr.Property);
            Assert.IsFalse(pausedTr.All);
            Assert.AreEqual(AnimationPlayState.Paused, pausedTr.PlayState);

            var namelessTr = converted.Items[5];
            Assert.IsTrue(namelessTr.Valid);
            Assert.AreEqual("all", namelessTr.Property);
            Assert.IsTrue(namelessTr.All);
            Assert.AreEqual(3000, namelessTr.Duration);
            Assert.AreEqual(400, namelessTr.Delay);
            AssertTimingFunction(TimingFunctions.Linear, namelessTr.TimingFunction);
        }

        [Test]
        public void AnimationConverter()
        {
            var converted = AllConverters.AnimationListConverter.Convert(
                "roll 3s 1s ease-in 2 reverse both, 500ms linear alternate-reverse slidein, slideout 4s infinite, something not existing, 2s") as AnimationList;

            var roll = converted.Items[0];
            Assert.IsTrue(roll.Valid);
            Assert.AreEqual("roll", roll.Name);
            Assert.AreEqual(3000, roll.Duration);
            Assert.AreEqual(1000, roll.Delay);
            Assert.AreEqual(2, roll.IterationCount);
            Assert.AreEqual(AnimationFillMode.Both, roll.FillMode);
            Assert.AreEqual(AnimationDirection.Reverse, roll.Direction);
            AssertTimingFunction(TimingFunctions.EaseIn, roll.TimingFunction);

            var slidein = converted.Items[1];
            Assert.IsTrue(slidein.Valid);
            Assert.AreEqual("slidein", slidein.Name);
            Assert.AreEqual(500, slidein.Duration);
            Assert.AreEqual(0, slidein.Delay);
            Assert.AreEqual(1, slidein.IterationCount);
            Assert.AreEqual(AnimationFillMode.None, slidein.FillMode);
            Assert.AreEqual(AnimationDirection.AlternateReverse, slidein.Direction);
            AssertTimingFunction(TimingFunctions.Linear, slidein.TimingFunction);

            var slideout = converted.Items[2];
            Assert.IsTrue(slideout.Valid);
            Assert.AreEqual("slideout", slideout.Name);
            Assert.AreEqual(4000, slideout.Duration);
            Assert.AreEqual(-1, slideout.IterationCount);
            AssertTimingFunction(TimingFunctions.Ease, slideout.TimingFunction);

            var something = converted.Items[3];
            Assert.IsFalse(something.Valid);
            Assert.AreEqual("something", something.Name);


            var nameless = converted.Items[4];
            Assert.IsFalse(nameless.Valid);
            Assert.AreEqual(2000, nameless.Duration);
        }

        [Test]
        public void AudioConverter()
        {
            var converted = AllConverters.AudioListConverter.Convert("url(res:click) 3s 5 local, url(https://example.com) infinite 2s, url(res:something), sound3 5 5 5 5 5") as AudioList;

            var part0 = converted.Items[0];
            Assert.IsTrue(part0.Valid);
            Assert.AreEqual(AssetReferenceType.Resource, part0.AudioClip.Type);
            Assert.AreEqual("click", part0.AudioClip.Value);
            Assert.AreEqual(3000, part0.Delay);
            Assert.AreEqual(5, part0.IterationCount);
            Assert.True(part0.Local);

            var part1 = converted.Items[1];
            Assert.IsTrue(part1.Valid);
            Assert.AreEqual(AssetReferenceType.Url, part1.AudioClip.Type);
            Assert.AreEqual("https://example.com", part1.AudioClip.Value);
            Assert.AreEqual(2000, part1.Delay);
            Assert.AreEqual(-1, part1.IterationCount);
            Assert.False(part1.Local);

            var part2 = converted.Items[2];
            Assert.IsTrue(part2.Valid);
            Assert.AreEqual(AssetReferenceType.Resource, part2.AudioClip.Type);
            Assert.AreEqual("something", part2.AudioClip.Value);
            Assert.AreEqual(0, part2.Delay);
            Assert.AreEqual(1, part2.IterationCount);
            Assert.False(part2.Local);

            var part3 = converted.Items[3];
            Assert.IsFalse(part3.Valid);
        }


        [TestCase("0", 0f)]
        [TestCase("0s", 0f)]
        [TestCase("0ms", 0f)]
        [TestCase("400ms", 400f)]
        [TestCase("1s", 1000f)]
        [TestCase("2s", 2000f)]
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
        [TestCase("172pt", 172)]
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


        [TestCase("0", "000000ff")]
        [TestCase("1", "ffffffff")]
        [TestCase("0.5", "808080ff")]
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
        public void ColorConverter(object input, object expected)
        {
            var converted = AllConverters.ColorConverter.Convert(input);

            if (converted is Color c) Assert.AreEqual(expected, ColorUtility.ToHtmlStringRGBA(c).ToLowerInvariant());
            else Assert.AreEqual(expected, converted);
        }
    }
}
