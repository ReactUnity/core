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

        [ReactInjectableTest(style: @"
            view { color: red; }
            view.blueClass { color: blue; }
            view.greenClass { color: magenta; }
            #test-id { color: white; }
")]
        public IEnumerator ClassListChangesCausesRerender()
        {
            var view = Q("view");

            var tmp = Canvas.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.AreEqual("Hello world", tmp.text);
            Assert.AreEqual(Color.red, tmp.color);

            view.ClassList.Add("blueClass");
            yield return null;
            Assert.AreEqual(Color.blue, tmp.color);

            view.ClassName = "class-something another-class greenClass";
            yield return null;
            Assert.AreEqual(Color.magenta, tmp.color);

            view.Id = "test-id";
            yield return null;
            Assert.AreEqual(Color.white, tmp.color);
        }

        [ReactInjectableTest(@"
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


        [ReactInjectableTest(@"
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

        [ReactInjectableTest(@"
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
        ", autoRender: false)]
        public IEnumerator TestArbitraryWatcher()
        {
            var sd = new SerializableDictionary();
            Globals["inner"] = sd;
            Render();
            yield return null;
            yield return null;

            var imgCmp = (Host.QuerySelector("image") as UGUI.ImageComponent).Image;
            Assert.AreEqual(Texture2D.whiteTexture, imgCmp.mainTexture);

            var tx = new Texture2D(1, 1);
            sd.Set("image", tx);
            Assert.AreEqual(tx, imgCmp.mainTexture);
        }
    }
}
