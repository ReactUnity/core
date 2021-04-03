using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using ReactUnity.Tests.Utils;
using UnityEngine;
using UnityEngine.TestTools;

namespace ReactUnity.Tests
{
    [TestFixture]
    public class BaseTest
    {
        [UnityTest, ReactTest]
        public IEnumerator HelloWorldTestPasses()
        {
            yield return null;

            var go = GameObject.Find("REACT_CANVAS");

            var tmp = go.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.AreEqual("Hello world", tmp.text);
        }
    }
}
