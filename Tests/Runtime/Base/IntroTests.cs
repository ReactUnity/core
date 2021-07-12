using System.Collections;
using NUnit.Framework;
using ReactUnity.Helpers;
using ReactUnity.ScriptEngine;
using UnityEngine;
using UnityEngine.TestTools;

namespace ReactUnity.Tests
{
    public class IntroTests : TestBase
    {
        public IntroTests(JavascriptEngineType engineType) : base(engineType) { }

#if UNITY_EDITOR
        [UnityTest, ReactTest(TestPath)]
        public IEnumerator Base_HelloWorld()
        {
            yield return null;

            var tmp = Canvas.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.AreEqual("Hello world", tmp.text);
        }
#endif

        [UnityTest, ReactInjectableTest(style: "view { color: red; }")]
        public IEnumerator Injectable_HelloWorld()
        {
            yield return null;

            var tmp = Canvas.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.AreEqual("Hello world", tmp.text);
            Assert.AreEqual(Color.red, tmp.color);
        }


        [UnityTest, ReactInjectableTest(@"
            Renderer.render(
                <view>
                    Hello world
                    <view>Hello again</view>
                    <view>
                        Somehow
                        <view> just hello</view>
                    </view>
                </view>
            );
        ")]
        public IEnumerator TextContent_IsCorrect()
        {
            yield return null;

            Assert.AreEqual("Hello worldHello againSomehow just hello", Host.TextContent);
        }


        [UnityTest, ReactInjectableTest(@"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <image source={globals.image} />;
            }

            Renderer.render(
                <GlobalsProvider>
                    <App />
                </GlobalsProvider>
            );
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
            const watcher = ReactUnity.createDictionaryWatcher(Globals.inner, 'innerSerializable');
            function App() {
                const globals = watcher.useContext();
                return <image source={globals.image} />;
            }

            Renderer.render(
                <watcher.Provider>
                    <App />
                </watcher.Provider>
            );
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
