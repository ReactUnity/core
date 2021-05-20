using NUnit.Framework;
using System.Collections;
using UnityEngine;
using UnityEngine.TestTools;

namespace ReactUnity.Tests
{
    [TestFixture(Description = "Tests related to css media queries")]
    public class MediaQueryTests : TestBase
    {
        [UnityTest, ReactInjectableTest(style: "view { color: white; } @media (min-asd: 600px) { view { color: red; } }")]
        public IEnumerator Injectable_HelloWorld()
        {
            yield return null;

            MediaProvider.SetNumber("asd", 600);

            var tmp = Canvas.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.AreEqual("Hello world", tmp.text);
            Assert.AreEqual(Color.red, tmp.color);
        }
    }
}
