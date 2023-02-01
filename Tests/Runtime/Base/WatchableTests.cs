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


        [UGUITest(Script = @"
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


        [UGUITest(Script = @"
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

        [UGUITest(Script = @"
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



        [UGUITest(Script = @"
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


        [UGUITest(Script = @"
            export function App() {
                const globals = ReactUnity.useGlobals();
                const val = ReactUnity.useWatchable(globals.testWatchable);
                return <text>{val?.x + ''}</text>;
            }
        ")]
        public IEnumerator TestWatchableStruct()
        {
            yield return null;

            var text = (Host.QuerySelector("text") as UGUI.TextComponent).Text;
            Assert.AreEqual("undefined", text.text);

            var watchable = new Watchable<Rect>(new Rect(1, 2, 3, 4));

            Globals.Set("testWatchable", watchable);
            yield return null;
            yield return null;
            Assert.AreEqual("1", text.text);

            watchable.Value = new Rect(5, 6, 7, 8);
            yield return null;
            Assert.AreEqual("5", text.text);

            watchable = new Watchable<Rect>();
            Globals.Set("testWatchable", watchable);
            yield return null;
            yield return null;
            Assert.AreEqual("0", text.text);

            Globals.Set("testWatchable", null);
            yield return null;
            yield return null;
            Assert.AreEqual("undefined", text.text);

            Globals.Set("testWatchable", 5);
            yield return null;
            yield return null;
            Assert.AreEqual("undefined", text.text);
        }

        [UGUITest(Script = @"
            export function App() {
                const globals = ReactUnity.useGlobals();
                const w = ReactUnity.useWatchable(globals.testWatchable);
                const val = [...w || []];
                return <text>{val?.length + ''}</text>;
            }
        ")]
        public IEnumerator TestWatchableList()
        {
            yield return null;

            var text = (Host.QuerySelector("text") as UGUI.TextComponent).Text;
            Assert.AreEqual("0", text.text);

            var watchable = new WatchableList<int>() { 1, 2, 3, 4 };

            Globals.Set("testWatchable", watchable);
            yield return null;
            yield return null;
            Assert.AreEqual("4", text.text);

            watchable.Add(5);
            yield return null;
            yield return null;
            Assert.AreEqual("5", text.text);

            watchable.RemoveAt(0);
            watchable.RemoveAt(0);
            yield return null;
            yield return null;
            Assert.AreEqual("3", text.text);

            Globals.Set("testWatchable", null);
            yield return null;
            yield return null;
            Assert.AreEqual("0", text.text);
        }

        [UGUITest(Script = @"
            export function App() {
                const globals = ReactUnity.useGlobals();
                const w = ReactUnity.useWatchable(globals.testWatchable);
                return <text>{w?.Count + ''}</text>;
            }
        ")]
        public IEnumerator TestWatchableSet()
        {
            yield return null;

            var text = (Host.QuerySelector("text") as UGUI.TextComponent).Text;
            Assert.AreEqual("undefined", text.text);

            var watchable = new WatchableSet<int>() { 1, 2, 3, 4 };

            Globals.Set("testWatchable", watchable);
            yield return null;
            yield return null;
            Assert.AreEqual("4", text.text);

            watchable.Add(5);
            yield return null;
            yield return null;
            Assert.AreEqual("5", text.text);

            watchable.Remove(1);
            watchable.Remove(2);
            yield return null;
            yield return null;
            Assert.AreEqual("3", text.text);

            Globals.Set("testWatchable", null);
            yield return null;
            yield return null;
            Assert.AreEqual("undefined", text.text);
        }
    }
}
