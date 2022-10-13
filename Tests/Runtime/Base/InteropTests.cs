using System;
using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class InteropTests : TestBase
    {
        public InteropTests(JavascriptEngineType engineType) : base(engineType) { }

        public class MyComponent : MonoBehaviour
        {
            public string type;
            public bool started;
            public void Start()
            {
                var component = GetComponent<UGUI.ReactUnityUGUI>();
                if (type == "start_before" || type == "update_before") component.Render();

                if (type != "update_before")
                {
                    component.Globals["myComponent"] = this;
                    component.Globals["myObject"] = new MyObject();
                }
                if (type == "start_after") component.Render();
            }

            public void Update()
            {
                if (!started)
                {
                    var component = GetComponent<UGUI.ReactUnityUGUI>();
                    if (type == "update_before")
                    {
                        component.Globals["myComponent"] = this;
                        component.Globals["myObject"] = new MyObject();
                    }

                    if (type == "update_after")
                    {
                        component.Render();
                    }

                    started = true;
                }
            }

            public string GetText() => "mycmp";
        }

        public class MyObject
        {
            public string GetText() => "myobj";
        }

        [UGUITest(Script = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <text>
                    {globals.myObject?.GetText()} {globals.myComponent?.GetText()}
                </text>;
            }
        ", AutoRender = false)]
        public IEnumerator GlobalsGetUpdatedWhenChangedOnSameFrameAsRender()
        {
            var types = new string[] { "start_before", "start_after", "update_before", "update_after" };

            // start_before: Render in start, then set Globals in start
            // start_after: set Globals in start, then render in start
            // update_before: Render in start, then set Globals in Update
            // update_after: set Globals in Start, then render in Update

            foreach (var type in types)
            {
                var cmp = Component.gameObject.AddComponent<MyComponent>();
                cmp.type = type;
                yield return null;
                Assert.AreEqual("myobj mycmp", Q("text").TextContent, type + " has failed");
                GameObject.DestroyImmediate(cmp);
                Component.enabled = false;
                Component.AdvancedOptions.AutoRender = false;
                Component.enabled = true;
            }
        }


        [UGUITest(Script = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <text>
                    SomeLogTest{console.log('Test')}
                </text>;
            }
        ")]
        public IEnumerator ConsoleLogShouldNotBreakUIWhenItsReturnValueIsPassedAsChildren()
        {
            yield return null;
            var text = Q("text").TextContent;
            Assert.AreEqual("SomeLogTest", text);
        }


        [UGUITest(Script = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <text>
                    SomeLogTest{globals.VoidFn()}
                </text>;
            }
        ", AutoRender = false)]
        public IEnumerator VoidResultShouldNotBreakUIWhenItsReturnValueIsPassedAsChildren()
        {
            Globals["VoidFn"] = new Action(() => { });
            Render();
            yield return null;
            var text = Q("text").TextContent;
            Assert.AreEqual("SomeLogTest", text);
        }


        [UGUITest(Script = @"
            function App() {  };

            Assert.AreEqual(5, Globals.a);
        ", AutoRender = false)]
        public IEnumerator GlobalsKeysCanBeAccessedNaturally()
        {
            Globals["a"] = 5;
            yield return null;
            Render();
        }


        [UGUITest(Script = @"
            function App() {  };

            Assert.AreEqual(2, Globals.list.length);
            Assert.AreEqual(5, Globals.list[0]);
            Assert.AreEqual(7, Globals.list[1]);

            Assert.AreEqual(12, [...Globals.list].reduce((acc, x) => acc + x));
        ", AutoRender = false)]
        public IEnumerator ListItemsCanBeAccessedNaturally()
        {
            IgnoreForEngine(JavascriptEngineType.ClearScript);

            Globals["list"] = new List<int>() { 5, 7 };
            yield return null;
            Render();
        }

        [UGUITest(Script = @"
            function App() {  };

            Assert.AreEqual(12, Globals.list.reduce((acc, x) => acc + x));
            Globals.list.splice(1, 1, 9, 11);
            Assert.AreEqual(3, Globals.list.length);
            Assert.AreEqual(25, Globals.list.reduce((acc, x) => acc + x));

            Globals.list.length = 2;
            Assert.AreEqual(14, Globals.list.reduce((acc, x) => acc + x));

            Globals.list.length = 4;
            Assert.AreEqual(4, Globals.list.length);
            Assert.AreEqual(0, Globals.list[3]);

            Globals.list.push(3);
            Assert.AreEqual(3, Globals.list[4]);
        ", AutoRender = false)]
        public IEnumerator ListsCanHaveArrayPrototypeMethods()
        {
            IgnoreForEngine(JavascriptEngineType.ClearScript);
            IgnoreForEngine(JavascriptEngineType.Jint);

            Globals["list"] = new List<int>() { 5, 7 };
            yield return null;
            Render();
        }


        [UGUITest(Script = @"
            function App() {  };

            Assert.AreEqual(2, Globals.list.length);
            Assert.AreEqual(5, Globals.list[0]);
            Assert.AreEqual(7, Globals.list[1]);

            Assert.AreEqual(12, [...Globals.list].reduce((acc, x) => acc + x));
            Assert.AreEqual(12, Globals.list.reduce((acc, x) => acc + x));
        ", AutoRender = false)]
        public IEnumerator ArrayItemsCanBeAccessedNaturally()
        {
            IgnoreForEngine(JavascriptEngineType.ClearScript);

            Globals["list"] = new int[] { 5, 7 };
            yield return null;
            Render();
        }
    }
}
