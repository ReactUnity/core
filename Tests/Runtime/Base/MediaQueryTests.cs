using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class MediaQueryTests : TestBase
    {
        public MediaQueryTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest(style: "view { color: white; } @media (min-asd: 600px) { view { color: red; } }")]
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
