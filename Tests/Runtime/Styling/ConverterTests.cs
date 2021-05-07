using NUnit.Framework;
using ReactUnity.Styling;

namespace ReactUnity.Tests
{
    [TestFixture]
    public class ConverterTests
    {
        [Test]
        public void TransitionIsParsedCorrectly()
        {
            var converted = ConverterMap.TransitionListConverter.Convert("width 2s, height 400ms ease-in-out, 500 300ms smooth-step, bbb") as TransitionList;

            var widthTr = converted.Transitions["width"];
            Assert.IsTrue(widthTr.Valid);
            Assert.AreEqual(2000, widthTr.Duration);
            Assert.AreEqual(0, widthTr.Delay);
            Assert.AreEqual("width", widthTr.Property);
            Assert.AreEqual(0, widthTr.TimingFunction(0));
            Assert.AreEqual(0.25f, widthTr.TimingFunction(0.25f));
            Assert.AreEqual(0.5f, widthTr.TimingFunction(0.5f));
            Assert.AreEqual(0.75f, widthTr.TimingFunction(0.75f));
            Assert.AreEqual(1, widthTr.TimingFunction(1));


            var heightTr = converted.Transitions["height"];
            Assert.IsTrue(heightTr.Valid);
            Assert.AreEqual(400, heightTr.Duration);
            Assert.AreEqual(0, heightTr.Delay);
            Assert.AreEqual("height", heightTr.Property);
            Assert.AreEqual(0, heightTr.TimingFunction(0));
            Assert.AreEqual(0.0625f, heightTr.TimingFunction(0.25f));
            Assert.AreEqual(0.25f, heightTr.TimingFunction(0.5f));
            Assert.AreEqual(0.5625f, heightTr.TimingFunction(0.75f));
            Assert.AreEqual(1, heightTr.TimingFunction(1));


            var allTr = converted.Transitions["all"];
            Assert.IsTrue(allTr.Valid);
            Assert.AreEqual(converted.All, allTr);
            Assert.AreEqual(500, allTr.Duration);
            Assert.AreEqual(300, allTr.Delay);
            Assert.AreEqual("all", allTr.Property);
            Assert.AreEqual(0, allTr.TimingFunction(0));
            Assert.AreEqual(0.15625f, allTr.TimingFunction(0.25f));
            Assert.AreEqual(0.5f, allTr.TimingFunction(0.5f));
            Assert.AreEqual(0.84375f, allTr.TimingFunction(0.75f));
            Assert.AreEqual(1, allTr.TimingFunction(1));


            var invalidTr = converted.Transitions["bbb"];
            Assert.IsFalse(invalidTr.Valid);
        }
    }
}
