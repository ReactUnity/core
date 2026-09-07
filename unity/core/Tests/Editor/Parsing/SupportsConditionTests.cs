using NUnit.Framework;
using ReactUnity.Styling.Rules;

namespace ReactUnity.Tests.Editor
{
    [TestFixture]
    public class SupportsConditionTests
    {
        [TestCase("(color: red)", true)]
        [TestCase("(display: flex)", true)]
        [TestCase("(COLOR: RED)", true)]
        [TestCase("  (color: red)  ", true)]
        [TestCase("(color: red !important)", true)]
        [TestCase("(--brand: red)", true)]
        // A property ReactUnity does not have, and a value it cannot parse for one it does.
        [TestCase("(float: left)", false)]
        [TestCase("(color: notacolor)", false)]
        // The answer differs from a browser's in both directions: motion-duration is ReactUnity's
        // and no browser has it, while float is the web's and ReactUnity does not implement it.
        [TestCase("(motion-duration: 1s)", true)]
        [TestCase("(motion-duration: notaduration)", false)]
        [TestCase("(color:)", false)]
        [TestCase("(color)", false)]
        // The functions this change adds, which is what Tailwind gates its output on.
        [TestCase("(color: color-mix(in lab, red, red))", true)]
        [TestCase("(color: color-mix(in oklab, red, red))", true)]
        [TestCase("(color: color-mix(in rec2020, red, red))", false)]
        [TestCase("(color: oklch(0.5 0.1 200))", true)]
        [TestCase("(color: lch(50 50 200))", true)]
        [TestCase("(color: lab(50 40 -30))", true)]
        [TestCase("not (color: oklch(0.5 0.1 200))", false)]
        [TestCase("not (float: left)", true)]
        [TestCase("not not (color: red)", true)]
        // Grouping.
        [TestCase("(color: red) and (display: flex)", true)]
        [TestCase("(color: red) and (float: left)", false)]
        [TestCase("(float: left) or (color: red)", true)]
        [TestCase("(float: left) or (float: right)", false)]
        [TestCase("((color: red) and (display: flex))", true)]
        [TestCase("((color: red) and (float: left)) or (display: flex)", true)]
        [TestCase("(not (float: left)) and (color: red)", true)]
        [TestCase("(color: red) and (display: flex) and (opacity: 0.5)", true)]
        // selector() answers for the selectors this engine matches. Without a context every
        // pseudo-class is a state; which ones a framework handles is checked in PlayMode.
        [TestCase("selector(:hover)", true)]
        [TestCase("selector(#root:has(> .a ~ .b))", true)]
        [TestCase("selector(.a:is(.b .c, #d))", true)]
        [TestCase("selector(view::before:nth-child(2n of .a))", true)]
        [TestCase("selector(::-webkit-scrollbar)", true)]
        [TestCase("selector(:state(busy))", true)]
        [TestCase("selector(::marker)", false)]
        [TestCase("selector(.a, .b)", false)]
        [TestCase("selector(> .a)", false)]
        [TestCase("selector(.a >)", false)]
        [TestCase("selector()", false)]
        [TestCase("not selector(::marker)", true)]
        [TestCase("selector(::marker) or (color: red)", true)]
        // font-tech() and font-format() are not answered, so they are false.
        [TestCase("font-tech(color-COLRv1)", false)]
        // Malformed input must not be treated as supported.
        [TestCase("", false)]
        [TestCase(null, false)]
        [TestCase("(color: red", false)]
        [TestCase("color: red)", false)]
        [TestCase("(color: red) and", false)]
        [TestCase("(color: red) (display: flex)", false)]
        [TestCase("and (color: red)", false)]
        public void Evaluate(string condition, bool expected)
        {
            Assert.AreEqual(expected, SupportsCondition.Evaluate(condition));
        }
    }
}
