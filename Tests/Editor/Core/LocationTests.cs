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
            var lc = new Location(href, null);

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
            var lc = new Location(href, null);

            Assert.AreEqual(href, lc.href);
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
            var lc = new Location(href, null);

            Assert.AreEqual(href, lc.href);
            Assert.AreEqual(null, lc.origin);
            Assert.AreEqual(null, lc.protocol);
            Assert.AreEqual(null, lc.host);
            Assert.AreEqual(null, lc.hostname);
            Assert.AreEqual(null, lc.port);
            Assert.AreEqual("/react/index.js", lc.pathname);
            Assert.AreEqual("?param1=5&param2=hello", lc.search);
            Assert.AreEqual("#test-hash", lc.hash);
        }
    }
}
