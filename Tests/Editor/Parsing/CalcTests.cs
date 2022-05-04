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
        public void ColorWithCalc(object input, object expected)
        {
            var (collection, style) = CreateStyle();

            collection["--aa"] = "12";
            collection["color"] = input;

            var c = style.color;
            Assert.AreEqual(expected, ColorUtility.ToHtmlStringRGBA(c).ToLowerInvariant());
        }
    }
}
