using NUnit.Framework;
using ReactUnity.Styling.Rules;

namespace ReactUnity.Editor.Tests
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
    }
}
