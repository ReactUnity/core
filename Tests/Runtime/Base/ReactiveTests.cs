using System.Collections;
using NUnit.Framework;
using ReactUnity.Helpers;
using ReactUnity.Reactive;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class ReactiveTests : TestBase
    {
        public ReactiveTests(JavascriptEngineType engineType) : base(engineType) { }


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
                const val = ReactUnity.useReactiveValue(globals.testReactive);
                return <text>{val + ''}</text>;
            }
        ")]
        public IEnumerator TestReactiveProperty()
        {
            yield return null;

            var text = (Host.QuerySelector("text") as UGUI.TextComponent).Text;
            Assert.AreEqual("undefined", text.text);

            var reactive = new ReactiveValue<string>("hey");

            Globals.Set("testReactive", reactive);
            yield return null;
            yield return null;
            Assert.AreEqual("hey", text.text);

            reactive.Value = "wah";
            yield return null;
            Assert.AreEqual("wah", text.text);

            reactive = new ReactiveValue<string>();
            Globals.Set("testReactive", reactive);
            yield return null;
            yield return null;
            Assert.AreEqual("null", text.text);

            Globals.Set("testReactive", null);
            yield return null;
            yield return null;
            Assert.AreEqual("undefined", text.text);

            Globals.Set("testReactive", 5);
            yield return null;
            yield return null;
            Assert.AreEqual("undefined", text.text);
        }


        [UGUITest(Script = @"
            export function App() {
                const globals = ReactUnity.useGlobals();
                const val = ReactUnity.useReactiveValue(globals.testReactive);
                return <text>{val?.x + ''}</text>;
            }
        ")]
        public IEnumerator TestReactiveStruct()
        {
            yield return null;

            var text = (Host.QuerySelector("text") as UGUI.TextComponent).Text;
            Assert.AreEqual("undefined", text.text);

            var reactive = new ReactiveValue<Rect>(new Rect(1, 2, 3, 4));

            Globals.Set("testReactive", reactive);
            yield return null;
            yield return null;
            Assert.AreEqual("1", text.text);

            reactive.Value = new Rect(5, 6, 7, 8);
            yield return null;
            Assert.AreEqual("5", text.text);

            reactive = new ReactiveValue<Rect>();
            Globals.Set("testReactive", reactive);
            yield return null;
            yield return null;
            Assert.AreEqual("0", text.text);

            Globals.Set("testReactive", null);
            yield return null;
            yield return null;
            Assert.AreEqual("undefined", text.text);

            Globals.Set("testReactive", 5);
            yield return null;
            yield return null;
            Assert.AreEqual("undefined", text.text);
        }

        [UGUITest(Script = @"
            export function App() {
                const globals = ReactUnity.useGlobals();
                const w = ReactUnity.useReactiveValue(globals.testReactive);
                const val = [...w || []];
                return <text>{val?.length + ''}</text>;
            }
        ")]
        public IEnumerator TestReactiveList()
        {
            yield return null;

            var text = (Host.QuerySelector("text") as UGUI.TextComponent).Text;
            Assert.AreEqual("0", text.text);

            var reactive = new ReactiveList<int>() { 1, 2, 3, 4 };

            Globals.Set("testReactive", reactive);
            yield return null;
            yield return null;
            Assert.AreEqual("4", text.text);

            reactive.Add(5);
            yield return null;
            yield return null;
            Assert.AreEqual("5", text.text);

            reactive.RemoveAt(0);
            reactive.RemoveAt(0);
            yield return null;
            yield return null;
            Assert.AreEqual("3", text.text);

            Globals.Set("testReactive", null);
            yield return null;
            yield return null;
            Assert.AreEqual("0", text.text);
        }

        [UGUITest(Script = @"
            export function App() {
                const globals = ReactUnity.useGlobals();
                const w = ReactUnity.useReactiveValue(globals.testReactive);
                return <text>{w?.Count + ''}</text>;
            }
        ")]
        public IEnumerator TestReactiveSet()
        {
            yield return null;

            var text = (Host.QuerySelector("text") as UGUI.TextComponent).Text;
            Assert.AreEqual("undefined", text.text);

            var reactive = new ReactiveSet<int>() { 1, 2, 3, 4 };

            Globals.Set("testReactive", reactive);
            yield return null;
            yield return null;
            Assert.AreEqual("4", text.text);

            reactive.Add(5);
            yield return null;
            yield return null;
            Assert.AreEqual("5", text.text);

            reactive.Remove(1);
            reactive.Remove(2);
            yield return null;
            yield return null;
            Assert.AreEqual("3", text.text);

            Globals.Set("testReactive", null);
            yield return null;
            yield return null;
            Assert.AreEqual("undefined", text.text);
        }
    }
}
