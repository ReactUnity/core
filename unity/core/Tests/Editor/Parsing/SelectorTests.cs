using NUnit.Framework;
using ReactUnity.Styling.Rules;

namespace ReactUnity.Tests.Editor
{
    [TestFixture]
    public class SelectorTests
    {
        [TestCase("2n+1", 2, 1, false)]
        [TestCase("even", 2, 0, false)]
        [TestCase("3 of .a", 0, 3, true)]
        [TestCase("2n + 1 of .a, .b", 2, 1, true)]
        [TestCase("odd OF text", 2, 1, true)]
        [TestCase("-n+2 of :not(.a)", -1, 2, true)]
        public void NthChildParameterReadsTheOfClause(string input, int a, int b, bool hasOf)
        {
            var parameter = new NthChildParameter(input);
            Assert.AreEqual(a, parameter.A);
            Assert.AreEqual(b, parameter.B);
            Assert.AreEqual(hasOf, parameter.Of != null);
        }

        [Test]
        public void OfClauseKeepsCompoundBranchesAndWeighsTheHeaviest()
        {
            var parameter = new NthChildParameter("2n of .a, #b, text");
            Assert.AreEqual(3, parameter.Of.Count);
            Assert.AreEqual(1 << 12, parameter.OfSpecificity);

            // A branch with a combinator cannot be tested against one sibling, so it is dropped.
            parameter = new NthChildParameter("1 of .a .b, .c");
            Assert.AreEqual(1, parameter.Of.Count);
            Assert.AreEqual(1 << 6, parameter.OfSpecificity);

            // Nothing left to count: the clause is kept, and matches nothing.
            parameter = new NthChildParameter("1 of .a .b");
            Assert.NotNull(parameter.Of);
            Assert.AreEqual(0, parameter.Of.Count);
        }

        [Test]
        public void OfClauseAddsToTheSelectorSpecificity()
        {
            var tree = new RuleTree<string>();
            var plain = tree.AddSelector("view:nth-child(2)")[0];
            var withClass = tree.AddSelector("view:nth-child(2 of .a, text)")[0];
            var withId = tree.AddSelector("view:nth-last-child(2 of #a)")[0];

            Assert.AreEqual(plain.Specifity + (1 << 6), withClass.Specifity);
            Assert.AreEqual(plain.Specifity + (1 << 12), withId.Specifity);
        }
    }
}
