using System.Collections;
using NUnit.Framework;
using UnityEngine.TestTools;

namespace ReactUnity.Tests.Editor
{
    public class BaseTest
    {
        // A Test behaves as an ordinary method
        [Test]
        public void BaseTestSimplePasses()
        {
            // Use the Assert class to test conditions
        }

        // A UnityTest behaves like a coroutine in Play Mode. In Edit Mode you can use
        // `yield return null;` to skip a frame.
        [UnityTest]
        public IEnumerator BaseTestWithEnumeratorPasses()
        {
            // Use the Assert class to test conditions.
            // Use yield to skip a frame.
            yield return null;
        }
    }
}
