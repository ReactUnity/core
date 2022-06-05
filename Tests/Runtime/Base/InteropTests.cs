using System.Collections;
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
                GameObject.Destroy(cmp);
                Component.enabled = false;
                Component.AutoRender = false;
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
    }
}
