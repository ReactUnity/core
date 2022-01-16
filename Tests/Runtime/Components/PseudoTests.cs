using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class PseudoTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <view className='byy'>
                        <view className='hey' />
                        <text>bar</text>
                    </view>
                </>;
            }

            Renderer.render(<GlobalsProvider children={<App />} />);
        ";

        const string BaseStyle = @"";

        public UGUIComponent View => Host.QuerySelector(".hey") as UGUIComponent;
        public UGUIComponent Text => Host.QuerySelector("text") as TextComponent;

        public PseudoTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator ShouldShowAfterContentOnView()
        {
            yield return null;

            Context.InsertStyle(@"
                .byy .hey:before {
                    content: 'foo';
                }

                .byy .hey::before {
                    color: red;
                }

                .byy .hey:after {
                    color: blue;
                }

                .byy .hey::after {
                    content: 'hey';
                }
            ");

            yield return null;
            Assert.AreEqual(Color.red, View.BeforePseudo?.ComputedStyle.color);
            Assert.AreEqual(Color.blue, View.AfterPseudo?.ComputedStyle.color);
            Assert.AreEqual("foo", View.BeforePseudo?.TextContent);
            Assert.AreEqual("hey", View.AfterPseudo?.TextContent);
        }
    }
}
