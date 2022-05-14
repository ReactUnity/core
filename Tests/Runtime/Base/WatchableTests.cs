using System.Collections;
using NUnit.Framework;
using ReactUnity.Helpers;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class WatchableTests : TestBase
    {
        public WatchableTests(JavascriptEngineType engineType) : base(engineType) { }


        [UGUITest(Code = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <image source={globals.image} />;
            }
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


        [UGUITest(Code = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <image source={globals.image} />;
            }
        ")]
        public IEnumerator TestGlobalsChangeOnComponent()
        {
            yield return null;

            var imgCmp = (Host.QuerySelector("image") as UGUI.ImageComponent).Image;
            Assert.AreEqual(Texture2D.whiteTexture, imgCmp.mainTexture);

            var tx = new Texture2D(1, 1);
            Component.Globals["image"] = tx;
            Assert.AreEqual(tx, imgCmp.mainTexture);
        }

        [UGUITest(Code = @"
            const watcher = ReactUnity.createDictionaryWatcher(Globals.inner, 'innerSerializable');
            function App() {
                const globals = watcher.useContext();
                return <image source={globals.image} />;
            }

            render(
                <watcher.Provider>
                    <App />
                </watcher.Provider>
            );
        ", AutoRender = false)]
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



        [UGUITest(Code = @"
            export function App() {
                const globals = ReactUnity.useGlobals();
                const val = ReactUnity.useWatchable(globals.testWatchable);
                return <text>{val + ''}</text>;
            }
        ")]
        public IEnumerator TestWatchableProperty()
        {
            yield return null;

            var text = (Host.QuerySelector("text") as UGUI.TextComponent).Text;
            Assert.AreEqual("undefined", text.text);

            var watchable = new Watchable<string>("hey");

            Globals.Set("testWatchable", watchable);
            yield return null;
            yield return null;
            Assert.AreEqual("hey", text.text);

            watchable.Value = "wah";
            yield return null;
            Assert.AreEqual("wah", text.text);

            watchable = new Watchable<string>();
            Globals.Set("testWatchable", watchable);
            yield return null;
            yield return null;
            Assert.AreEqual("null", text.text);

            Globals.Set("testWatchable", null);
            yield return null;
            yield return null;
            Assert.AreEqual("undefined", text.text);

            Globals.Set("testWatchable", 5);
            yield return null;
            yield return null;
            Assert.AreEqual("undefined", text.text);
        }

    }
}
