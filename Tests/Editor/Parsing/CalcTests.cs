using System.Collections.Generic;
using NUnit.Framework;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.Editor.Tests
{
    [TestFixture]
    public class CalcTests
    {
        private (InlineStyles, NodeStyle) CreateStyle()
        {
            var collection = new InlineStyles();
            var style = new NodeStyle(null, null, new List<IDictionary<IStyleProperty, object>> { collection });
            return (collection, style);
        }

        [TestCase("rgb(calc(112), 189, 153)", "70bd99ff")]
        [TestCase("rgb(calc(100 + 12), 189, 153)", "70bd99ff")]
        [TestCase("rgb(calc(100 + var(--aa)), 189, 153)", "70bd99ff")]
        [TestCase("rgb(calc(var(--aa) + 100), 189, 153)", "70bd99ff")]
        [TestCase("rgb(calc(1.5 * (var(--aa) + 100)), 189, 153)", "a8bd99ff")]
        [TestCase("rgb(calc(1.5 * calc(var(--aa) + 100)), 189, 153)", "a8bd99ff")]
        [TestCase("rgb(calc(1.5 * calc(var(--aa)+100)), 189, 153)", "000000ff")]
        [TestCase("rgb(calc(1.5 * calc(var(--aa) + 100)), 189ms, 153)", "000000ff")]
        [TestCase("rgb(100ms), 189, 153)", "000000ff")]
        [TestCase("rgb(100px), 189, 153)", "000000ff")]
        public void ColorWithCalc(object input, object expected)
        {
            var (collection, style) = CreateStyle();

            collection["--aa"] = "12";
            collection["color"] = input;

            var c = style.color;
            Assert.AreEqual(expected, ColorUtility.ToHtmlStringRGBA(c).ToLowerInvariant());
        }

        [TestCase("300", -1)]
        [TestCase("300ms", 0.3f)]
        [TestCase("calc(300)", -1)]
        [TestCase("calc(300px)", -1)]
        [TestCase("calc(300ms)", 0.3f)]
        [TestCase("calc(200ms * 3)", 0.6f)]
        [TestCase("calc(200ms + 300ms * 3)", 1.1f)]
        [TestCase("calc(200ms + 300ms * 3s)", -1)]
        [TestCase("calc(100 * 5ms)", 0.5)]
        [TestCase("calc(100ms * 5ms)", -1)]
        [TestCase("calc(100 / 5ms)", -1)]
        [TestCase("calc(100 / 5 * 1ms)", 0.02)]
        public void DurationWithCalc(object input, double expected)
        {
            var (collection, style) = CreateStyle();

            collection["--aa"] = "12";
            collection["animation-duration"] = input;

            var c = style.animationDuration;
            Assert.AreEqual(expected, c?.Get(0, -1), 0.00001f);
        }
    }
}
