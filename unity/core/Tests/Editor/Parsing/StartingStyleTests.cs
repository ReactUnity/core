using System.Linq;
using ExCSS;
using NUnit.Framework;

namespace ReactUnity.Tests.Editor
{
    /// <summary>The bundled parser reads @starting-style and @container itself, top-level and nested, so no rewrite runs first.</summary>
    [TestFixture]
    public class StartingStyleTests
    {
        static readonly StylesheetParser Parser = new StylesheetParser(true, true, true, true, true, false, true, true);

        [Test]
        public void StartingStyleIsItsOwnRuleAtTheTopLevel()
        {
            var sheet = Parser.Parse("@starting-style { .a { opacity: 0; } }");
            var rule = sheet.Children.OfType<IStartingStyleRule>().Single();
            Assert.AreEqual(".a", ((IStyleRule) rule.Rules[0]).SelectorText);
        }

        [Test]
        public void StartingStyleNestsInAStyleRule()
        {
            var sheet = Parser.Parse(".b { color: red; @starting-style { color: blue; } }");
            var parent = sheet.Children.OfType<IStyleRule>().Single();
            var rule = parent.NestedRules.OfType<IStartingStyleRule>().Single();
            Assert.AreEqual(":is(.b)", ((IStyleRule) rule.Rules[0]).SelectorText);
        }

        [TestCase("@container (width > 400px) { .a { color: red; } }", "", "(width > 400px)")]
        [TestCase("@container card style(--theme: dark) { .a { color: red; } }", "card", "style(--theme: dark)")]
        [TestCase("@container not (min-width: 10px) { .a { color: red; } }", "", "not (min-width: 10px)")]
        public void ContainerPreludeIsKeptAsWritten(string css, string name, string condition)
        {
            var rule = Parser.Parse(css).Children.OfType<IContainerRule>().Single();
            Assert.AreEqual(name, rule.Name);
            Assert.AreEqual(condition, rule.ConditionText);
        }

        [Test]
        public void ContainerNestsInAStyleRule()
        {
            var sheet = Parser.Parse(".b { @container sidebar (width > 400px) { color: blue; } }");
            var parent = sheet.Children.OfType<IStyleRule>().Single();
            var rule = parent.NestedRules.OfType<IContainerRule>().Single();
            Assert.AreEqual("sidebar", rule.Name);
            Assert.AreEqual("(width > 400px)", rule.ConditionText);
            Assert.AreEqual(":is(.b)", ((IStyleRule) rule.Rules[0]).SelectorText);
        }

        [Test]
        public void ContainerAndStartingStyleNestInEachOther()
        {
            var sheet = Parser.Parse("@container (min-width: 100px) { @starting-style { .a { opacity: 0; } } }");
            var container = sheet.Children.OfType<IContainerRule>().Single();
            var starting = container.Rules.OfType<IStartingStyleRule>().Single();
            Assert.AreEqual(".a", ((IStyleRule) starting.Rules[0]).SelectorText);
        }

        [TestCase(".a { content: '@starting-style {'; }")]
        [TestCase("/* @starting-style { */ .a { color: red; }")]
        [TestCase("@starting-styles { .x { color: blue; } } .a { color: red; }")]
        [TestCase("@starting-style; .a { color: red; }")]
        public void UnrelatedTextStillParsesTheRuleAfterIt(string css)
        {
            var rule = Parser.Parse(css).Children.OfType<IStyleRule>().Last();
            Assert.AreEqual(".a", rule.SelectorText);
        }
    }
}
