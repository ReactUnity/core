using NUnit.Framework;
using ReactUnity.Animations;
using ReactUnity.Styling;
using ReactUnity.Styling.Types;
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
            var converted = ConverterMap.TransitionListConverter.Convert("width 2s, height 400ms ease-in-out, 500ms 300ms smooth-step, bbb") as TransitionList;

            var widthTr = converted.Transitions["width"];
            Assert.IsTrue(widthTr.Valid);
            Assert.AreEqual(2000, widthTr.Duration);
            Assert.AreEqual(0, widthTr.Delay);
            Assert.AreEqual("width", widthTr.Property);
            AssertTimingFunction(TimingFunctions.SmoothStep, widthTr.TimingFunction);


            var heightTr = converted.Transitions["height"];
            Assert.IsTrue(heightTr.Valid);
            Assert.AreEqual(400, heightTr.Duration);
            Assert.AreEqual(0, heightTr.Delay);
            Assert.AreEqual("height", heightTr.Property);
            AssertTimingFunction(TimingFunctions.EaseInOutQuad, heightTr.TimingFunction);


            var allTr = converted.Transitions["all"];
            Assert.IsTrue(allTr.Valid);
            Assert.AreEqual(converted.All, allTr);
            Assert.AreEqual(500, allTr.Duration);
            Assert.AreEqual(300, allTr.Delay);
            Assert.AreEqual("all", allTr.Property);
            AssertTimingFunction(TimingFunctions.SmoothStep, allTr.TimingFunction);

            var invalidTr = converted.Transitions["bbb"];
            Assert.IsFalse(invalidTr.Valid);
        }

        [Test]
        public void AnimationConverter()
        {
            var converted = ConverterMap.AnimationListConverter.Convert("roll 3s 1s ease-in 2 reverse both, 500ms linear alternate-reverse slidein, slideout 4s infinite, something not existing") as AnimationList;

            var roll = converted.Animations["roll"];
            Assert.IsTrue(roll.Valid);
            Assert.AreEqual(3000, roll.Duration);
            Assert.AreEqual(1000, roll.Delay);
            Assert.AreEqual(2, roll.IterationCount);
            Assert.AreEqual(AnimationFillMode.Both, roll.FillMode);
            Assert.AreEqual(AnimationDirection.Reverse, roll.Direction);
            AssertTimingFunction(TimingFunctions.EaseInQuad, roll.TimingFunction);

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
            AssertTimingFunction(TimingFunctions.SmoothStep, slideout.TimingFunction);

            var something = converted.Animations["something"];
            Assert.IsFalse(something.Valid);
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
            Assert.AreEqual(expected, ConverterMap.DurationConverter.Convert(input));
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
            Assert.AreEqual(expected, ConverterMap.AngleConverter.Convert(input));
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
            Assert.AreEqual(expected, ConverterMap.LengthConverter.Convert(input));
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
            Assert.AreEqual(expected, ConverterMap.PercentageConverter.Convert(input));
        }
    }
}
