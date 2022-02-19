using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
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

                return <view id='test' ref={viewRef} style={{ fontSize: 23 }}>
                    Hello world
                </view>;
            }
")]
        public IEnumerator InlineStylesCanBeSet()
        {
            yield return null;

            var tmp = Canvas.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.AreEqual("Hello world", tmp.text);
            Assert.AreEqual(Color.red, tmp.color);

            Assert.AreEqual(23, tmp.fontSize);
        }

        [ReactInjectableTest(@"
            function App() {
                return <view id='test' style='font-size: 23px'>
                    Hello world
                </view>;
            }
")]
        public IEnumerator InlineStylesCanBeSetAsText()
        {
            yield return null;

            var tmp = Canvas.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.AreEqual(23, tmp.fontSize);
        }



        [ReactInjectableTest(@"
            function App() {
                var globals = useGlobals();

                return <view id='test' style={globals.asObject ? { fontSize: 25, color: 'red' } : 'font-size: 23px; font-weight: bold;'}>
                    Hello world
                </view>;
            }
")]
        public IEnumerator InlineStylesCanBeSwitchedBetweenTextAndObject()
        {
            yield return null;

            var tmp = Canvas.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.AreEqual(23, tmp.fontSize);
            Assert.AreNotEqual(Color.red, tmp.color);
            Assert.AreEqual(TMPro.FontStyles.Bold, tmp.fontStyle);

            Globals["asObject"] = true;
            yield return null;
            Assert.AreEqual(25, tmp.fontSize);
            Assert.AreEqual(Color.red, tmp.color);
            Assert.AreNotEqual(TMPro.FontStyles.Bold, tmp.fontStyle);

            Globals["asObject"] = false;
            yield return null;
            Assert.AreEqual(23, tmp.fontSize);
            Assert.AreNotEqual(Color.red, tmp.color);
            Assert.AreEqual(TMPro.FontStyles.Bold, tmp.fontStyle);
        }
    }
}
