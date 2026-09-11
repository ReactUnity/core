using System.Linq;
using ExCSS;
using NUnit.Framework;
using ReactUnity.Styling.Rules;

namespace ReactUnity.Tests.Editor
{
    /// <summary>
    /// What an <c>@property</c> rule is read as, and which ones are invalid and so ignored.
    /// </summary>
    [TestFixture]
    public class PropertyRuleTests
    {
        private static readonly StylesheetParser Parser = new StylesheetParser(true, true, true, true, true, false, true, true);

        /// <summary>
        /// The registration the sheet's first <c>@property</c> rule yields, or null when the rule is
        /// invalid -- which also covers a prelude the parser refuses to read as one at all.
        /// </summary>
        private static RegisteredProperty Read(string css)
        {
            var rule = Parser.Parse(css).Children.OfType<IPropertyRule>().FirstOrDefault();
            return rule == null ? null : RegisteredProperty.Create(rule);
        }

        [Test]
        public void TheThreeDescriptorsAreRead()
        {
            var registered = Read(@"@property --brand { syntax: ""<color>""; inherits: true; initial-value: red; }");

            Assert.NotNull(registered);
            Assert.AreEqual("--brand", registered.Name);
            Assert.AreEqual("<color>", registered.Syntax);
            Assert.AreEqual(true, registered.Inherits);
            Assert.AreEqual("red", registered.InitialValue);
        }

        [Test]
        public void TheInitialValueIsKeptAsWritten()
        {
            // Whatever the syntax says it is, the value is converted where it is used, so it is not
            // parsed here -- and this one has to survive whole for `box-shadow` to read it.
            var registered = Read(@"@property --tw-shadow { syntax: ""*""; inherits: false; initial-value: 0 0 #0000; }");

            Assert.NotNull(registered);
            Assert.AreEqual("0 0 #0000", registered.InitialValue);
            Assert.AreEqual(false, registered.Inherits);
        }

        [Test]
        public void TheUniversalSyntaxNeedsNoInitialValue()
        {
            var registered = Read(@"@property --tw-shadow-color { syntax: ""*""; inherits: false; }");

            Assert.NotNull(registered);
            Assert.IsNull(registered.InitialValue);
        }

        [Test]
        public void ASingleQuotedSyntaxIsTheSameSyntax()
        {
            var registered = Read(@"@property --x { syntax: '*'; inherits: false; }");

            Assert.NotNull(registered);
            Assert.AreEqual("*", registered.Syntax);
        }

        [Test]
        public void ARuleMissingWhatItNeedsIsInvalid()
        {
            // Every syntax but the universal one has to say what the property starts as.
            Assert.IsNull(Read(@"@property --x { syntax: ""<length>""; inherits: false; }"));

            // Both descriptors are required, and `inherits` only takes the two words.
            Assert.IsNull(Read(@"@property --x { inherits: false; initial-value: 0; }"));
            Assert.IsNull(Read(@"@property --x { syntax: ""*""; initial-value: 0; }"));
            Assert.IsNull(Read(@"@property --x { syntax: ""*""; inherits: yes; initial-value: 0; }"));

            // A custom property name is a dashed identifier.
            Assert.IsNull(Read(@"@property x { syntax: ""*""; inherits: false; }"));
            Assert.IsNull(Read(@"@property -- { syntax: ""*""; inherits: false; }"));
        }
    }
}
