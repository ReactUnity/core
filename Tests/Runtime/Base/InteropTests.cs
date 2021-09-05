using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class InteropTests : TestBase
    {
        public InteropTests(JavascriptEngineType engineType) : base(engineType) { }

        public class MyComponent : MonoBehaviour
        {
            public void OnEnable()
            {
                var component = GetComponent<ReactUnity.UGUI.ReactUnityUGUI>();
                component.Globals["myComponent"] = this;
                component.Globals["myObject"] = new MyObject();
            }

            public string GetText() => "mycmp";
        }

        public class MyObject : UnityEngine.Object
        {
            public string GetText() => "myobj";
        }

        [ReactInjectableTest(@"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <text>
                    {globals.myObject?.GetText()} {globals.myComponent?.GetText()}
                </text>;
            }

            Renderer.render(<App />);
        ")]
        public IEnumerator MonobehaviorAndObjectMethodsAreVisible()
        {
            yield return null;

            Component.gameObject.AddComponent<MyComponent>();
            Assert.AreEqual("myobj mycmp", Q("text").TextContent);
        }
    }
}
