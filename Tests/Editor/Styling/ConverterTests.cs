using NUnit.Framework;
using ReactUnity.Animations;
using ReactUnity.Styling;
using ReactUnity.Styling.Types;
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
            var converted = Converters.TransitionListConverter.Convert("width 2s, height 400ms ease-in-out, 500ms 300ms step-start, bbb") as TransitionList;

            var widthTr = converted.Transitions["width"];
            Assert.IsTrue(widthTr.Valid);
            Assert.AreEqual(2000, widthTr.Duration);
            Assert.AreEqual(0, widthTr.Delay);
            Assert.AreEqual("width", widthTr.Property);
            AssertTimingFunction(TimingFunctions.Ease, widthTr.TimingFunction);


            var heightTr = converted.Transitions["height"];
            Assert.IsTrue(heightTr.Valid);
            Assert.AreEqual(400, heightTr.Duration);
            Assert.AreEqual(0, heightTr.Delay);
            Assert.AreEqual("height", heightTr.Property);
            AssertTimingFunction(TimingFunctions.EaseInOut, heightTr.TimingFunction);


            var allTr = converted.Transitions["all"];
            Assert.IsTrue(allTr.Valid);
            Assert.AreEqual(converted.All, allTr);
            Assert.AreEqual(500, allTr.Duration);
            Assert.AreEqual(300, allTr.Delay);
            Assert.AreEqual("all", allTr.Property);
            AssertTimingFunction(TimingFunctions.StepStart, allTr.TimingFunction);

            var invalidTr = converted.Transitions["bbb"];
            Assert.IsFalse(invalidTr.Valid);
        }

        [Test]
        public void AnimationConverter()
        {
            var converted = Converters.AnimationListConverter.Convert("roll 3s 1s ease-in 2 reverse both, 500ms linear alternate-reverse slidein, slideout 4s infinite, something not existing") as AnimationList;

            var roll = converted.Animations["roll"];
            Assert.IsTrue(roll.Valid);
            Assert.AreEqual(3000, roll.Duration);
            Assert.AreEqual(1000, roll.Delay);
            Assert.AreEqual(2, roll.IterationCount);
            Assert.AreEqual(AnimationFillMode.Both, roll.FillMode);
            Assert.AreEqual(AnimationDirection.Reverse, roll.Direction);
            AssertTimingFunction(TimingFunctions.EaseIn, roll.TimingFunction);

            var slidein = converted.Animations["slidein"];
            Assert.IsTrue(slidein.Valid);
            Assert.AreEqual(500, slidein.Duration);
            Assert.AreEqual(0, slidein.Delay);
            Assert.AreEqual(1, slidein.IterationCount);
            Assert.AreEqual(AnimationFillMode.None, slidein.FillMode);
            Assert.AreEqual(AnimationDirection.AlternateReverse, slidein.Direction);
            AssertTimingFunction(TimingFunctions.Linear, slidein.TimingFunction);

            var slideout = converted.Animations["slideout"];
            Assert.IsTrue(slideout.Valid);
            Assert.AreEqual(4000, slideout.Duration);
            Assert.AreEqual(-1, slideout.IterationCount);
            AssertTimingFunction(TimingFunctions.Ease, slideout.TimingFunction);

            var something = converted.Animations["something"];
            Assert.IsFalse(something.Valid);
        }

        [Test]
        public void AudioConverter()
        {
            var converted = Converters.AudioListConverter.Convert("url(res:click) 3s 5 local, url(https://example.com) infinite 2s, url(res:something), sound3 5 5 5 5 5") as AudioList;

            var part0 = converted.Parts[0];
            Assert.IsTrue(part0.Valid);
            Assert.AreEqual(AssetReferenceType.Resource, part0.AudioClip.type);
            Assert.AreEqual("click", part0.AudioClip.value);
            Assert.AreEqual(3000, part0.Delay);
            Assert.AreEqual(5, part0.IterationCount);
            Assert.True(part0.Local);

            var part1 = converted.Parts[1];
            Assert.IsTrue(part1.Valid);
            Assert.AreEqual(AssetReferenceType.Url, part1.AudioClip.type);
            Assert.AreEqual("https://example.com", part1.AudioClip.value);
            Assert.AreEqual(2000, part1.Delay);
            Assert.AreEqual(-1, part1.IterationCount);
            Assert.False(part1.Local);

            var part2 = converted.Parts[2];
            Assert.IsTrue(part2.Valid);
            Assert.AreEqual(AssetReferenceType.Resource, part2.AudioClip.type);
            Assert.AreEqual("something", part2.AudioClip.value);
            Assert.AreEqual(0, part2.Delay);
            Assert.AreEqual(1, part2.IterationCount);
            Assert.False(part2.Local);

            var part3 = converted.Parts[3];
            Assert.IsFalse(part3.Valid);
        }


        [TestCase("0", 0f)]
        [TestCase("0s", 0f)]
        [TestCase("0ms", 0f)]
        [TestCase("400ms", 400f)]
        [TestCase("1s", 1000f)]
        [TestCase("2s", 2000f)]
        [TestCase("50ms1", SpecialNames.CantParse)]
        [TestCase("0a", SpecialNames.CantParse)]
        [TestCase("5as", SpecialNames.CantParse)]
        [TestCase("100", SpecialNames.CantParse)]
        public void DurationConverter(object input, object expected)
        {
            Assert.AreEqual(expected, Converters.DurationConverter.Convert(input));
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
        [TestCase("50ms1", SpecialNames.CantParse)]
        [TestCase("0a", SpecialNames.CantParse)]
        [TestCase("5as", SpecialNames.CantParse)]
        public void AngleConverter(object input, object expected)
        {
            Assert.AreEqual(expected, Converters.AngleConverter.Convert(input));
        }

        [TestCase("0", 0f)]
        [TestCase("172", 172)]
        [TestCase("172pt", 172)]
        [TestCase("172px", 172)]
        [TestCase("172%", 172f * (1f / 100))]
        [TestCase("50ms1", SpecialNames.CantParse)]
        [TestCase("0a", SpecialNames.CantParse)]
        [TestCase("5as", SpecialNames.CantParse)]
        public void LengthConverter(object input, object expected)
        {
            Assert.AreEqual(expected, Converters.LengthConverter.Convert(input));
        }

        [TestCase("0", 0f)]
        [TestCase("2", 2f)]
        [TestCase("172%", 172f * (1f / 100))]
        [TestCase("50px", SpecialNames.CantParse)]
        [TestCase("50ms1", SpecialNames.CantParse)]
        [TestCase("0a", SpecialNames.CantParse)]
        [TestCase("5as", SpecialNames.CantParse)]
        public void PercentageConverter(object input, object expected)
        {
            Assert.AreEqual(expected, Converters.PercentageConverter.Convert(input));
        }
    }
}
