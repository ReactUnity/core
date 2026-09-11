using NUnit.Framework;
using UnityEngine;

namespace ReactUnity.Tests.Editor
{
    [TestFixture]
    public class CalcTests
    {
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
            var (collection, style) = TestHelpers.CreateStyle();

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
            var (collection, style) = TestHelpers.CreateStyle();

            collection["--aa"] = "12";
            collection["animation-duration"] = input;

            var c = style.animationDuration;
            Assert.AreEqual(expected, c?.Get(0, -1), 0.00001f);
        }

        [TestCase("round(0.46, 0.1)", 0.5f)]
        [TestCase("round(nearest, 0.45, 0.1)", 0.5f)]
        [TestCase("round(down, 0.46, 0.1)", 0.4f)]
        [TestCase("round(up, 0.41, 0.1)", 0.5f)]
        [TestCase("round(to-zero, 0.49, 0.1)", 0.4f)]
        [TestCase("round(0.6)", 1f)]
        [TestCase("calc(mod(7, 3) / 10)", 0.1f)]
        [TestCase("calc(mod(-7, 3) / 10)", 0.2f)]
        [TestCase("calc(rem(7, -3) / 10)", 0.1f)]
        [TestCase("abs(-0.3)", 0.3f)]
        [TestCase("calc(sign(-3) + 1.5)", 0.5f)]
        [TestCase("calc(sign(0) + 0.5)", 0.5f)]
        [TestCase("sin(90deg)", 1f)]
        [TestCase("sin(pi / 2)", 1f)]
        [TestCase("cos(0)", 1f)]
        [TestCase("cos(1turn)", 1f)]
        [TestCase("tan(45deg)", 1f)]
        [TestCase("calc(asin(1) / 90)", 1f)]
        [TestCase("calc(acos(0) / 90)", 1f)]
        [TestCase("calc(atan(1) / 45)", 1f)]
        [TestCase("calc(atan2(1, 1) / 45)", 1f)]
        [TestCase("calc(pow(2, 3) / 8)", 1f)]
        [TestCase("calc(sqrt(16) / 4)", 1f)]
        [TestCase("calc(hypot(3, 4) / 5)", 1f)]
        [TestCase("calc(log(8, 2) / 3)", 1f)]
        [TestCase("log(e)", 1f)]
        [TestCase("exp(0)", 1f)]
        [TestCase("calc(pow(2, var(--aa)) / 16)", 1f)]
        [TestCase("round(var(--aa) / 10, 0.3)", 0.3f)]
        [TestCase("calc(-1 * -0.5)", 0.5f)]
        public void MathFunctions(string input, float expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["--aa"] = "4";
            collection["opacity"] = input;

            Assert.AreEqual(expected, style.opacity, 0.0001f);
        }

        [TestCase("round(1250ms, 1s)", 1)]
        [TestCase("round(up, 1250ms, 1s)", 2)]
        [TestCase("round(down, 1.25s, 500ms)", 1)]
        [TestCase("mod(1.25s, 1s)", 0.25)]
        [TestCase("rem(1.25s, -1s)", 0.25)]
        [TestCase("abs(-2s)", 2)]
        [TestCase("hypot(3s, 4s)", 5)]
        [TestCase("calc(2 * round(0.6s, 0.5s))", 1)]
        [TestCase("round(calc(0.3s + 0.4s), 0.5s)", 0.5)]
        [TestCase("max(abs(-2s), 1s)", 2)]
        // A rounding step is a strategy or a value, never both with a third; and sin() takes an angle.
        [TestCase("round(1s, 300ms, 1)", -1)]
        [TestCase("mod(1s)", -1)]
        [TestCase("sin(1s)", -1)]
        [TestCase("round(1s, 1)", -1)]
        public void MathFunctionsWithUnits(string input, double expected)
        {
            var (collection, style) = TestHelpers.CreateStyle();

            collection["animation-duration"] = input;

            var c = style.animationDuration;
            Assert.AreEqual(expected, c?.Get(0, -1), 0.00001f);
        }
    }
}
