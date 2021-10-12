using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;

namespace ReactUnity.Tests
{
    public class PseudoTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <view>
                        <text>bar</text>
                    </view>
                </>;
            }

            Renderer.render(<GlobalsProvider children={<App />} />);
        ";

        const string BaseStyle = @"";

        public UGUIComponent View => Host.QuerySelector("view") as UGUIComponent;
        public UGUIComponent Text => Host.QuerySelector("text") as TextComponent;

        public PseudoTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator ShouldShowAfterContentOnView()
        {
            yield return null;

            Context.InsertStyle(@"
                view:before {
                    content: 'foo';
                }

                view::after {
                    content: 'hey';
                }
            ");

            yield return null;
            Assert.AreEqual("foo", View.BeforePseudo?.TextContent);
            Assert.AreEqual("hey", View.AfterPseudo?.TextContent);
        }
    }
}
