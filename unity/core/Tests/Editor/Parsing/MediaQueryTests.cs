using NUnit.Framework;
using ReactUnity.Styling.Rules;

namespace ReactUnity.Tests.Editor
{
    [TestFixture(TestOf = typeof(MediaQueryList))]
    public class MediaQueryTests
    {
        [Test]
        public void AllQueryWorks()
        {
            var provider = new DefaultMediaProvider("runtime");

            var query = "all";
            var mq = MediaQueryList.Create(provider, query);
            Assert.AreEqual(query, mq.media);

            Assert.True(mq.matches);
        }

        [Test]
        public void DefaultTypesWorks()
        {
            var provider = DefaultMediaProvider.CreateMediaProvider("runtime", "ugui", false);

            var mq = MediaQueryList.Create(provider, "screen");
            Assert.True(mq.matches);

            mq = MediaQueryList.Create(provider, "runtime");
            Assert.True(mq.matches);

            mq = MediaQueryList.Create(provider, "ugui");
            Assert.True(mq.matches);

            mq = MediaQueryList.Create(provider, "(framework: ugui)");
            Assert.True(mq.matches);

            mq = MediaQueryList.Create(provider, "all");
            Assert.True(mq.matches);


            provider = DefaultMediaProvider.CreateMediaProvider("inspector", "uitoolkit", true);

            mq = MediaQueryList.Create(provider, "inspector");
            Assert.True(mq.matches);

            mq = MediaQueryList.Create(provider, "editor");
            Assert.True(mq.matches);

            mq = MediaQueryList.Create(provider, "uitoolkit");
            Assert.True(mq.matches);

            mq = MediaQueryList.Create(provider, "(framework: uitoolkit)");
            Assert.True(mq.matches);
        }


        [Test]
        public void NotCondition()
        {
            var provider = new DefaultMediaProvider("runtime");

            var query = "not (min-width: 600px)";
            var mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 601);
            Assert.False(mq.matches);

            provider.SetNumber("width", 600);
            Assert.False(mq.matches);

            provider.SetNumber("width", 599);
            Assert.True(mq.matches);
        }

        [Test]
        public void AndCondition()
        {
            var provider = new DefaultMediaProvider("runtime");

            var query = "runtime and (min-width: 600px)";
            var mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 601);
            Assert.True(mq.matches);

            provider.SetNumber("width", 600);
            Assert.True(mq.matches);

            provider.SetNumber("width", 599);
            Assert.False(mq.matches);


            query = "editor and (min-width: 600px)";
            mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 601);
            Assert.False(mq.matches);

            provider.SetNumber("width", 600);
            Assert.False(mq.matches);

            provider.SetNumber("width", 599);
            Assert.False(mq.matches);
        }

        [Test]
        public void OrCondition()
        {
            var provider = new DefaultMediaProvider("runtime");

            var query = "runtime, (min-width: 600px)";
            var mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 601);
            Assert.True(mq.matches);

            provider.SetNumber("width", 600);
            Assert.True(mq.matches);

            provider.SetNumber("width", 599);
            Assert.True(mq.matches);


            query = "runtime or (min-width: 600px)";
            mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 601);
            Assert.True(mq.matches);

            provider.SetNumber("width", 600);
            Assert.True(mq.matches);

            provider.SetNumber("width", 599);
            Assert.True(mq.matches);



            query = "editor or (min-width: 600px)";
            mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 601);
            Assert.True(mq.matches);

            provider.SetNumber("width", 600);
            Assert.True(mq.matches);

            provider.SetNumber("width", 599);
            Assert.False(mq.matches);


            query = "editor, (min-width: 600px)";
            mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 601);
            Assert.True(mq.matches);

            provider.SetNumber("width", 600);
            Assert.True(mq.matches);

            provider.SetNumber("width", 599);
            Assert.False(mq.matches);
        }

        [Test]
        public void MinMaxQuery()
        {
            var provider = new DefaultMediaProvider("runtime");

            var query = "(min-width: 600px)";
            var mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 601);
            Assert.True(mq.matches);

            provider.SetNumber("width", 600);
            Assert.True(mq.matches);

            provider.SetNumber("width", 599);
            Assert.False(mq.matches);


            query = "(max-width: 600px)";
            mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 601);
            Assert.False(mq.matches);

            provider.SetNumber("width", 600);
            Assert.True(mq.matches);

            provider.SetNumber("width", 599);
            Assert.True(mq.matches);


            // Invalid Query

            query = "max-width: 600px";
            mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 601);
            Assert.False(mq.matches);

            provider.SetNumber("width", 600);
            Assert.False(mq.matches);

            provider.SetNumber("width", 599);
            Assert.False(mq.matches);
        }

        [Test]
        public void SingleRangeQuery_RegularOrder()
        {
            var provider = new DefaultMediaProvider("runtime");

            var query = "(width >= 600px)";
            var mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 601);
            Assert.True(mq.matches);

            provider.SetNumber("width", 600);
            Assert.True(mq.matches);

            provider.SetNumber("width", 599);
            Assert.False(mq.matches);



            query = "(width > 600px)";
            mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 601);
            Assert.True(mq.matches);

            provider.SetNumber("width", 600);
            Assert.False(mq.matches);

            provider.SetNumber("width", 599);
            Assert.False(mq.matches);



            query = "(width <= 300px)";
            mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 299);
            Assert.True(mq.matches);

            provider.SetNumber("width", 300);
            Assert.True(mq.matches);

            provider.SetNumber("width", 301);
            Assert.False(mq.matches);


            query = "(width < 300px)";
            mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 299);
            Assert.True(mq.matches);

            provider.SetNumber("width", 300);
            Assert.False(mq.matches);

            provider.SetNumber("width", 301);
            Assert.False(mq.matches);


            query = "(width = 600px)";
            mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 601);
            Assert.False(mq.matches);

            provider.SetNumber("width", 600);
            Assert.True(mq.matches);

            provider.SetNumber("width", 599);
            Assert.False(mq.matches);
        }

        [Test]
        public void SingleRangeQuery_ReversedOrder()
        {
            var provider = new DefaultMediaProvider("runtime");

            var query = "(600px <= width)";
            var mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 601);
            Assert.True(mq.matches);

            provider.SetNumber("width", 600);
            Assert.True(mq.matches);

            provider.SetNumber("width", 599);
            Assert.False(mq.matches);



            query = "(600px < width)";
            mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 601);
            Assert.True(mq.matches);

            provider.SetNumber("width", 600);
            Assert.False(mq.matches);

            provider.SetNumber("width", 599);
            Assert.False(mq.matches);



            query = "(300px >= width)";
            mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 299);
            Assert.True(mq.matches);

            provider.SetNumber("width", 300);
            Assert.True(mq.matches);

            provider.SetNumber("width", 301);
            Assert.False(mq.matches);


            query = "(300px > width)";
            mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 299);
            Assert.True(mq.matches);

            provider.SetNumber("width", 300);
            Assert.False(mq.matches);

            provider.SetNumber("width", 301);
            Assert.False(mq.matches);



            query = "(600px = width)";
            mq = MediaQueryList.Create(provider, query);

            provider.SetNumber("width", 601);
            Assert.False(mq.matches);

            provider.SetNumber("width", 600);
            Assert.True(mq.matches);

            provider.SetNumber("width", 599);
            Assert.False(mq.matches);
        }

        [Test]
        public void MultiRangeQuery()
        {
            var provider = new DefaultMediaProvider("runtime");

            var query = "(600px <= width <= 800px)";
            var mq = MediaQueryList.Create(provider, query);


            provider.SetNumber("width", 801);
            Assert.False(mq.matches);

            provider.SetNumber("width", 800);
            Assert.True(mq.matches);

            provider.SetNumber("width", 601);
            Assert.True(mq.matches);

            provider.SetNumber("width", 600);
            Assert.True(mq.matches);

            provider.SetNumber("width", 599);
            Assert.False(mq.matches);

        }

        [Test]
        public void DetectsFeatureOrMediaType()
        {
            var provider = new DefaultMediaProvider("runtime");

            var query = "(runtime and a)";
            var mq = MediaQueryList.Create(provider, query);


            Assert.False(mq.matches);

            provider.SetValue("a", null);
            Assert.False(mq.matches);


            provider.SetValue("a", "hello");
            Assert.True(mq.matches);


            query = "(runtime and (a: bye))";
            mq = MediaQueryList.Create(provider, query);

            Assert.False(mq.matches);

            provider.SetValue("a", "hello");
            Assert.False(mq.matches);

            provider.SetValue("a", "bye");
            Assert.True(mq.matches);
        }

        [Test]
        public void CanParseDoubleParensCorrectly()
        {
            var provider = new DefaultMediaProvider("runtime");

            var query = "(runtime) and (a)";
            var mq = MediaQueryList.Create(provider, query);


            Assert.False(mq.matches);

            provider.SetValue("a", null);
            Assert.False(mq.matches);


            provider.SetValue("a", "hello");
            Assert.True(mq.matches);
        }

        [Test]
        public void AndOrComposedQuery()
        {
            var provider = new DefaultMediaProvider("runtime");

            var query = "(a and b and c or d and e)";
            var mq = MediaQueryList.Create(provider, query);

            provider.SetValue("a", "true");
            provider.SetValue("b", "true");
            provider.SetValue("c", "true");
            provider.SetValue("d", "true");
            provider.SetValue("e", null);
            Assert.False(mq.matches);


            provider.SetValue("a", null);
            provider.SetValue("b", "true");
            provider.SetValue("c", "true");
            provider.SetValue("d", "true");
            provider.SetValue("e", "true");
            Assert.True(mq.matches);


            provider.SetValue("a", null);
            provider.SetValue("b", "true");
            provider.SetValue("c", "true");
            provider.SetValue("d", null);
            provider.SetValue("e", "true");
            Assert.False(mq.matches);
        }

        [Test]
        public void HoverAndPointerAreAlwaysDefined()
        {
            var provider = new DefaultMediaProvider("runtime");

            foreach (var feature in new[] { "hover", "any-hover", "pointer", "any-pointer" })
                Assert.NotNull(provider.GetValue(feature), feature);

            // Whatever the machine has, the boolean form agrees with the keyword forms.
            var hover = MediaQueryList.Create(provider, "(hover)");
            Assert.AreEqual(MediaQueryList.Create(provider, "(hover: hover)").matches, hover.matches);
            Assert.AreNotEqual(MediaQueryList.Create(provider, "(hover: none)").matches, hover.matches);

            var pointer = MediaQueryList.Create(provider, "(pointer)");
            Assert.AreNotEqual(MediaQueryList.Create(provider, "(pointer: none)").matches, pointer.matches);

            provider.SetValue("hover", "none");
            Assert.False(hover.matches);
            provider.SetValue("hover", "hover");
            Assert.True(hover.matches);

            provider.SetValue("pointer", "coarse");
            Assert.True(pointer.matches);
            Assert.True(MediaQueryList.Create(provider, "(pointer: coarse)").matches);
            provider.SetValue("pointer", "none");
            Assert.False(pointer.matches);
        }

        [Test]
        public void SeedValueDefersToExplicitValues()
        {
            var provider = new DefaultMediaProvider("runtime");
            var dark = MediaQueryList.Create(provider, "(prefers-color-scheme: dark)");
            Assert.False(dark.matches);

            provider.SeedValue("prefers-color-scheme", "dark");
            Assert.True(dark.matches);
            Assert.AreEqual("dark", provider.GetValue("prefers-color-scheme"));

            // Withdrawing the seed hands the feature back: here, to being unset.
            provider.SeedValue("prefers-color-scheme", null);
            Assert.IsNull(provider.GetValue("prefers-color-scheme"));
            Assert.False(dark.matches);

            provider.SetValue("prefers-color-scheme", "light");
            provider.SeedValue("prefers-color-scheme", "dark");
            Assert.AreEqual("light", provider.GetValue("prefers-color-scheme"));
            Assert.False(dark.matches);
        }

        [Test]
        public void SeedValueRestoresTheValueItReplaced()
        {
            var provider = new DefaultMediaProvider("runtime", null, new System.Collections.Generic.Dictionary<string, string> { { "prefers-color-scheme", "light" } });

            provider.SeedValue("prefers-color-scheme", "dark");
            Assert.AreEqual("dark", provider.GetValue("prefers-color-scheme"));

            provider.SeedValue("prefers-color-scheme", "light");
            Assert.AreEqual("light", provider.GetValue("prefers-color-scheme"));

            provider.SeedValue("prefers-color-scheme", "dark");
            provider.SeedValue("prefers-color-scheme", null);
            Assert.AreEqual("light", provider.GetValue("prefers-color-scheme"));
        }
    }
}
