using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;
using ReactUnity.UIToolkit;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Tests.Renderer
{
    public class StyleComponentTests : EditorTestBase
    {
        public StyleComponentTests(JavascriptEngineType engineType) : base(engineType) { }


        [EditorInjectableTest(@"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    {!globals.disable && <style>{'#test { color: blue; }'}</style>}
                    <view id='test'>
                        Test text
                    </view>
                </>;
            }

            Renderer.render(
                <GlobalsProvider>
                    <App />
                </GlobalsProvider>
            );
        ")]
        public IEnumerator StyleTagShouldStyleComponents()
        {
            yield return null;
            var cmp = Q("#test") as UIToolkitComponent<VisualElement>;
            var rt = cmp.Element;

            Assert.AreEqual(Color.blue, rt.style.color.value);

            Globals["disable"] = true;
            yield return null;
            Assert.AreEqual(Color.clear, rt.style.color.value);
        }
    }
}
