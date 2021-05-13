using System.Collections;
using NUnit.Framework;
using ReactUnity.Tests.Utils;
using UnityEngine;
using UnityEngine.TestTools;

namespace ReactUnity.Tests
{
    [TestFixture]
    public class IntroTests : TestBase
    {
        [UnityTest, ReactTest(TestPath)]
        public IEnumerator Base_HelloWorld()
        {
            yield return null;

            var tmp = Canvas.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.AreEqual("Hello world", tmp.text);
        }


        [UnityTest, ReactInjectableTest(style: "view { color: red; }")]
        public IEnumerator Injectable_HelloWorld()
        {
            yield return null;

            var tmp = Canvas.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.AreEqual("Hello world", tmp.text);
            Assert.AreEqual(Color.red, tmp.color);
        }
    }
}
