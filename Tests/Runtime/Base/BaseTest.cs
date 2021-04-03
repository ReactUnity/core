using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.TestTools;

namespace ReactUnity.Tests
{
    [TestFixture]
    public class BaseTest
    {
        [Test]
        public void BaseTestSimplePasses()
        {
            Assert.IsTrue(true);
        }

        [UnityTest]
        public IEnumerator BaseTestWithEnumeratorPasses()
        {
            yield return null;
        }
    }
}
