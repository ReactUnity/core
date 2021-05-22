using System.Collections;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.TestTools;

namespace ReactUnity.Tests
{
    [TestFixture(Description = "General hello world tests")]
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


        [UnityTest, ReactInjectableTest(@"
Renderer.render( /*#__PURE__*/React.createElement('view', null, 'Hello world', /*#__PURE__*/React.createElement('view', null, 'Hello again'), /*#__PURE__*/React.createElement('view', null, 'Somehow ', /*#__PURE__*/React.createElement('view', null, 'just hello'))));
")]
        public IEnumerator TextContent_IsCorrect()
        {
            yield return null;

            Assert.AreEqual("Hello worldHello againSomehow just hello", Host.TextContent);
        }
    }
}
