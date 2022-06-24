using NUnit.Framework;
using ReactUnity.Scripting.DomProxies;

namespace ReactUnity.Tests.Editor
{
    [TestFixture]
    public class LocationTests
    {
        [Test]
        public void TestFullLocation()
        {
            var href = "https://localhost:3000/folder/index.js?param1=5&param2=hello#test-hash";
            var lc = new Location(href);

            Assert.AreEqual(href, lc.href);
            Assert.AreEqual("https://localhost:3000", lc.origin);
            Assert.AreEqual("https:", lc.protocol);
            Assert.AreEqual("localhost:3000", lc.host);
            Assert.AreEqual("localhost", lc.hostname);
            Assert.AreEqual("3000", lc.port);
            Assert.AreEqual("/folder/index.js", lc.pathname);
            Assert.AreEqual("?param1=5&param2=hello", lc.search);
            Assert.AreEqual("#test-hash", lc.hash);
        }

        [Test]
        public void TestLocationWithoutPath()
        {
            var href = "http://localhost:3000";
            var lc = new Location(href);

            Assert.AreEqual("http://localhost:3000/", lc.href);
            Assert.AreEqual("http://localhost:3000", lc.origin);
            Assert.AreEqual("http:", lc.protocol);
            Assert.AreEqual("localhost:3000", lc.host);
            Assert.AreEqual("localhost", lc.hostname);
            Assert.AreEqual("3000", lc.port);
            Assert.AreEqual("/", lc.pathname);
            Assert.AreEqual("", lc.search);
            Assert.AreEqual("", lc.hash);
        }

        [Test]
        public void TestLocationWithoutHost()
        {
            var href = "react/index.js?param1=5&param2=hello#test-hash";
            var lc = new Location(href);

            Assert.AreEqual(href, lc.href);
            Assert.AreEqual(null, lc.origin);
            Assert.AreEqual(null, lc.protocol);
            Assert.AreEqual(null, lc.host);
            Assert.AreEqual(null, lc.hostname);
            Assert.AreEqual(null, lc.port);
            Assert.AreEqual("react/index.js", lc.pathname);
            Assert.AreEqual("?param1=5&param2=hello", lc.search);
            Assert.AreEqual("#test-hash", lc.hash);
        }


        [TestCase("static/media/bg.png", "react/index.js", "react/static/media/bg.png")]
        [TestCase("static/media/bg.png", "react/index.js?param1=test#myhash", "react/static/media/bg.png")]
        [TestCase("https://reactunity.io", null, "https://reactunity.io/")]
        [TestCase("https://reactunity.io/", null, "https://reactunity.io/")]
        [TestCase("https://reactunity.io/a", null, "https://reactunity.io/a")]
        [TestCase("https://reactunity.io/a/b/c/../d", null, "https://reactunity.io/a/b/d")]
        [TestCase("https://reactunity.io/a/b/c/../d/", null, "https://reactunity.io/a/b/d/")]
        [TestCase("https://reactunity.io/a/b/c/../../d/e", null, "https://reactunity.io/a/d/e")]
        [TestCase("https://reactunity.io/a", "https://reactunity.io", "https://reactunity.io/a")]
        [TestCase(null, "https://reactunity.io/a/b/c", "https://reactunity.io/a/b/c")]
        [TestCase("", "https://reactunity.io/a/b/c", "https://reactunity.io/a/b/c")]
        [TestCase("a", "https://reactunity.io", "https://reactunity.io/a")]
        [TestCase("a", "https://reactunity.io/b", "https://reactunity.io/a")]
        [TestCase("a", "https://reactunity.io/b/c", "https://reactunity.io/b/a")]
        [TestCase("./a", "https://reactunity.io/b/c", "https://reactunity.io/b/a")]
        [TestCase("../a", "https://reactunity.io/b/c", "https://reactunity.io/a")]
        [TestCase("a", "https://reactunity.io/b/c/", "https://reactunity.io/b/c/a")]
        [TestCase("./../a/../d", "https://reactunity.io/b/c/", "https://reactunity.io/b/d")]
        [TestCase("/e", "https://reactunity.io/b/c/", "https://reactunity.io/e")]
        [TestCase("/e/f", "https://reactunity.io/b/c/", "https://reactunity.io/e/f")]
        [TestCase("/e/../f/", "https://reactunity.io/b/c/", "https://reactunity.io/f/")]
        public void UrlConstructorWithBaseUrl(string url, string baseUrl, string expectedResult)
        {
            var lc = new URL(url, baseUrl);
            Assert.AreEqual(expectedResult, lc.href);
        }
    }
}
