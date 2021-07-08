using System.Collections;
using NUnit.Framework;
using ReactUnity.Helpers;
using ReactUnity.ScriptEngine;
using UnityEngine;
using UnityEngine.TestTools;
using UnityEngine.UI;

namespace ReactUnity.Tests
{
    public class IntroTests : TestBase
    {
        public IntroTests(JavascriptEngineType engineType) : base(engineType) { }

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


        [UnityTest, ReactInjectableTest(@"
function App(){var globals=ReactUnity.useGlobals();return/*#__PURE__*/react.createElement('image',{source:globals.image});}ReactUnity.Renderer.render(/*#__PURE__*/react.createElement(ReactUnity.GlobalsProvider,null,/*#__PURE__*/react.createElement(App,null)),RootContainer,null)
")]
        public IEnumerator TestGlobalsChange()
        {
            yield return null;

            var imgCmp = (Host.QuerySelector("image") as UGUI.ImageComponent).Image;
            Assert.AreEqual(Texture2D.whiteTexture, imgCmp.mainTexture);

            var tx = new Texture2D(1, 1);
            Component.Globals.Set("image", tx);
            Assert.AreEqual(tx, imgCmp.mainTexture);
        }

        [UnityTest, ReactInjectableTest(@"
var watcher = ReactUnity.createDictionaryWatcher(Globals.inner, 'innerSerializable');
function App(){var sd=watcher.useContext();debugger;return/*#__PURE__*/react.createElement('image',{source:sd.image});}ReactUnity.Renderer.render(/*#__PURE__*/react.createElement(watcher.Provider,null,/*#__PURE__*/react.createElement(App,null)),RootContainer,null)
")]
        public IEnumerator TestArbitraryWatcher()
        {
            yield return null;

            var sd = Component.Globals["inner"] as SerializableDictionary;

            var imgCmp = (Host.QuerySelector("image") as UGUI.ImageComponent).Image;
            Assert.AreEqual(Texture2D.whiteTexture, imgCmp.mainTexture);

            var tx = new Texture2D(1, 1);
            sd.Set("image", tx);
            Assert.AreEqual(tx, imgCmp.mainTexture);
        }
    }
}
