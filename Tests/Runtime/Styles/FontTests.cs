using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;

namespace ReactUnity.Tests
{
    public class FontTests : TestBase
    {
        const string MultipleLevelsScript = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                    <view><view>Hello world</view></view>
                </view>;
            }
";

        public FontTests(JavascriptEngineType engineType) : base(engineType) { }


        [ReactInjectableTest(style: @"
    @font-face {
      font-family: ""Test Font Name"";
      src: url(resource:ReactUnity/fonts/monospace);
    }


    #test {
        font-family: ""Test Font Name"";
    }
")]
        public IEnumerator DefaultFontSizeWorks()
        {
            yield return null;

            var cmp = Q("#test") as UGUI.ContainerComponent;
            var rt = cmp.RectTransform;
            var text = rt.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            Assert.AreEqual(text.font.name, "monospace");
        }
    }
}
