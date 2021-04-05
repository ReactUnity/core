using System.Collections;
using NUnit.Framework;
using ReactUnity.Tests.Utils;
using UnityEngine;
using UnityEngine.TestTools;

namespace ReactUnity.Tests
{
    [TestFixture]
    public class BaseTest
    {
        public const string TestPath = "Packages/com.reactunity.core/Tests/Runtime/.scripts/tests/index.js";

        [UnityTest, ReactTest(TestPath)]
        public IEnumerator HelloWorldTestPasses()
        {
            yield return null;

            var go = GameObject.Find("REACT_CANVAS");

            var tmp = go.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.AreEqual("Hello world", tmp.text);
        }
    }
}
