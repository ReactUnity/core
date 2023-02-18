using NUnit.Framework;
using ReactUnity.Reactive;

namespace ReactUnity.Tests.Editor
{
    [TestFixture]
    public class ReactiveSetTests
    {
        [Test]
        public void TestMainFunctions()
        {
            var dc = new ReactiveSet<string>();

            dc.Add("test1");
            Assert.True(dc.Contains("test1"));

            dc.Add("test2");
            Assert.True(dc.Contains("test2"));
            Assert.AreEqual(2, dc.Count);

            dc.RemoveWithoutNotify("test2");
            Assert.False(dc.Contains("test2"));
            Assert.AreEqual(1, dc.Count);

            dc.Toggle("test2");
            Assert.True(dc.Contains("test2"));

            dc.Toggle("test2");
            Assert.False(dc.Contains("test2"));


            dc.Toggle("test2", true);
            Assert.True(dc.Contains("test2"));

            dc.Toggle("test2", true);
            Assert.True(dc.Contains("test2"));

            dc.Toggle("test2", false);
            Assert.False(dc.Contains("test2"));

            dc.Toggle("test2", false);
            Assert.False(dc.Contains("test2"));
        }
    }
}
