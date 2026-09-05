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
        ";

        const string BaseStyle = @"";

        public UGUIComponent View => Host.QuerySelector(".hey") as UGUIComponent;
        public UGUIComponent Text => Host.QuerySelector("text") as TextComponent;

        public PseudoTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator ShouldShowAfterContentOnView()
        {
            yield return null;

            Context.InsertStyle(@"
                .byy .hey::before {
                    color: red;
                }

                .byy .hey:after {
                    color: blue;
                }

                .byy .hey:before {
                    content: 'foo';
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

        const string AttrScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='card' data-label={globals.label || 'Hello'} data-count={3} data-size='12' data-on={true}>
                    <text>bar</text>
                </view>;
            }
        ";

        [UGUITest(Script = AttrScript)]
        public IEnumerator AttrReadsDataPropsIntoStyles()
        {
            yield return null;

            Context.InsertStyle(@"
                #card::before { content: attr(data-label); font-size: attr(data-size px); }
                #card::after { content: attr(data-missing, 'fallback'); }
            ");

            yield return null;
            var card = Q("#card");
            Assert.AreEqual("Hello", card.BeforePseudo?.TextContent);
            Assert.AreEqual(12, card.BeforePseudo?.ComputedStyle.fontSize);
            Assert.AreEqual("fallback", card.AfterPseudo?.TextContent);

            // A number or a boolean prop reads as its text, and the prop can be named without its prefix.
            Context.InsertStyle(@"
                #card::before { content: attr(count); }
                #card::after { content: attr(data-on); }
            ");
            yield return null;
            Assert.AreEqual("3", card.BeforePseudo?.TextContent);
            Assert.AreEqual("true", card.AfterPseudo?.TextContent);

            Context.InsertStyle(@"#card::before { content: attr(data-label); }");
            Globals["label"] = "Changed";
            yield return null;
            yield return null;
            Assert.AreEqual("Changed", card.BeforePseudo?.TextContent);
        }
    }
}
