using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;

namespace ReactUnity.Tests
{
    public class IconTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <icon>{globals.icon}</icon>
                </>;
            }
        ";

        const string BaseStyle = @"
            icon {
            }
        ";

        public IconComponent Icon => Host.QuerySelector("icon") as IconComponent;

        public IconTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator IconHasCorrectCharacter()
        {
            Assert.AreEqual(string.Empty, Icon.TextContent);

            Globals["icon"] = "search";
            yield return null;
            Assert.AreEqual("\ue8b6", Icon.TextContent);

            Globals["icon"] = "people_outline";
            yield return null;
            Assert.AreEqual("\ue7fc", Icon.TextContent);
        }

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator IconShouldBeEmptyForIncorrectIcon()
        {
            Globals["icon"] = "searchss";
            yield return null;
            Assert.AreEqual(string.Empty, Icon.TextContent);
        }


        [ReactInjectableTest(@"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <icon onPointerClick={() => null}>search</icon>
                </>;
            }
        ")]
        public IEnumerator RerenderingIconsKeepsTheTextContent()
        {
            Assert.AreEqual("\ue8b6", Icon.TextContent);

            Globals["test"] = "something";
            yield return null;

            Assert.AreEqual("\ue8b6", Icon.TextContent);
        }


        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator OverflowAndMaskDoesNotBreakIcon()
        {
            InsertStyle(@"icon {
                overflow: hidden;
                mask-image: url(res:star);
            }");
            yield return null;
            Assert.IsNotNull(Icon);
        }
    }
}
