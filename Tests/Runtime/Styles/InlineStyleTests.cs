using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class InlineStyleTests : TestBase
    {
        public InlineStyleTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest(@"
            function App() {
                const viewRef = React.useCallback((v) => {
                    if(!v) return;
                    v.Style.color = 'red';
                });

                return <view id='test' ref={viewRef}>
                    Hello world
                </view>;
            }

            Renderer.render(<GlobalsProvider children={<App />} />);
")]
        public IEnumerator InlineStylesCanBeSet()
        {
            yield return null;

            var tmp = Canvas.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.AreEqual("Hello world", tmp.text);
            Assert.AreEqual(Color.red, tmp.color);
        }
    }
}
