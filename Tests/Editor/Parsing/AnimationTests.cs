using System.Linq;
using ExCSS;
using NUnit.Framework;
using ReactUnity.Styling;
using ReactUnity.Styling.Animations;
using ReactUnity.Styling.Computed;
using ReactUnity.Styling.Converters;
using UnityEngine;

namespace ReactUnity.Tests.Editor
{
    [TestFixture]
    public class AnimationTests
    {
        static StylesheetParser Parser = new StylesheetParser(true, true, true, true, true, false, true, true);

        [Test]
        public void KeyframesParser()
        {
            var parsed = Parser.Parse(@"
@keyframes appear {
  from {
    opacity: 0%;
    scale: 0.8 0.8;
  }
  to {
    opacity: 100%;
    scale: 1 1;
  }
}
");

            var kfs = KeyframeList.Create(parsed.Children.OfType<IKeyframesRule>().First());

            Assert.True(kfs.Valid);
            Assert.AreEqual(kfs.From, kfs.Steps[0]);
            Assert.AreEqual(kfs.To, kfs.Steps[1]);
            Assert.AreEqual(new ComputedConstant(0f), kfs.From.Rules[StyleProperties.opacity]);
            Assert.AreEqual(new ComputedConstant(new Vector3(0.8f, 0.8f, 1)), kfs.From.Rules[StyleProperties.scale]);

            Assert.AreEqual(new ComputedConstant(1f), kfs.To.Rules[StyleProperties.opacity]);
            Assert.AreEqual(new ComputedConstant(new Vector3(1, 1, 1)), kfs.To.Rules[StyleProperties.scale]);
        }

        [TestCase("linear(0, 1)", 0.25f, 0.25f)]
        [TestCase("linear(1)", 0.3f, 0.3f)]
        // Stops without a position are spread evenly between the ones that have one.
        [TestCase("linear(0, 0.25, 1)", 0.5f, 0.25f)]
        [TestCase("linear(0, 0.5 25%, 1)", 0.125f, 0.25f)]
        [TestCase("linear(0, 0.5 25%, 1)", 0.625f, 0.75f)]
        [TestCase("linear(0, 0.5 30%, 1)", 0.3f, 0.5f)]
        // Two positions on one stop hold its value between them.
        [TestCase("linear(0, 1 50% 75%, 0.5)", 0.6f, 1f)]
        [TestCase("linear(0, 1 50% 75%, 0.5)", 1f, 0.5f)]
        // Overshoot is allowed, inputs never go backwards, and the ends extrapolate.
        [TestCase("linear(0, 1.2 50%, 1)", 0.5f, 1.2f)]
        [TestCase("linear(0, 1 20%, 0.5 10%, 1)", 0.3f, 0.5625f)]
        [TestCase("linear(0 0%, 1 100%)", 1.5f, 1.5f)]
        [TestCase("linear(0.2 0%, 1 100%)", 0f, 0.2f)]
        public void LinearEasing(string input, float t, float expected)
        {
            var fn = AllConverters.TimingFunctionConverter.TryGetConstantValue<TimingFunction>(input, null);
            Assert.NotNull(fn);
            Assert.AreEqual(expected, fn(t), 0.0001f);
            Assert.AreEqual(expected * 10 + 5, fn(t, 5, 15), 0.001f);
        }

        [TestCase("linear()")]
        [TestCase("linear(0, a, 1)")]
        [TestCase("linear(0 10% 20% 30%, 1)")]
        [TestCase("linear(0 10px, 1)")]
        public void LinearEasingRejectsBadStops(string input)
        {
            Assert.IsNull(AllConverters.TimingFunctionConverter.TryGetConstantValue<TimingFunction>(input, null));
        }
    }
}
