using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.Types;
using ReactUnity.UIToolkit;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Tests.Editor.Renderer
{
    public class HtmlComponentTests : EditorTestBase
    {
        public HtmlComponentTests(JavascriptEngineType engineType) : base(engineType) { }

        [EditorInjectableTest(Script = @"
            const htmlContent = `
                <style scope=':root'>
                    #test { color: blue; }

                    [data-test='something'] { font-size: 23px; }
                </style>

                <view id='test' data-test='something'>
                    Test text
                </view>
            `;

            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <html content={htmlContent} />;
            }
        ")]
        public IEnumerator StyleTagShouldWorkInsideHtmlTag()
        {
            yield return null;
            var cmp = Q("#test") as UIToolkitComponent<VisualElement>;
            var rt = cmp.Element;

            Assert.AreEqual(Color.blue, rt.style.color.value);
            Assert.AreEqual(23, rt.style.fontSize.value.value);
        }

        [EditorInjectableTest(Script = @"
            const htmlContent = `
                <script>Globals.value = 5</script>
            `;

            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <html content={htmlContent} />;
            }
        ")]
        public IEnumerator ScriptTagShouldWorkInsideHtmlTag()
        {
            yield return null;
            Assert.AreEqual(5, Globals["value"]);
        }

        [EditorInjectableTest(Script = @"
            const htmlContent = `
                <button onCustomEvent='Globals.value = 5'>Click here</button>
            `;

            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <html content={htmlContent} />;
            }
        ")]
        public IEnumerator EventsShouldWorkInsideHtmlTag()
        {
            yield return null;
            var button = Q("button") as ButtonComponent<Button>;
            button.FireEvent("onCustomEvent", null);
            yield return null;
            Assert.AreEqual(5, Globals["value"]);
        }

        [EditorInjectableTest(Script = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <html source={globals.htmlSource} />;
            }
        ")]
        public IEnumerator HtmlCanBeSetFromSource()
        {
            Globals["htmlSource"] = new TextReference(AssetReferenceType.Procedural, "<button>Click here</button>");
            yield return null;
            yield return null;
            var button = Q("button") as ButtonComponent<Button>;
            Assert.AreEqual("Click here", button.TextContent);


            Globals["htmlSource"] = new TextReference(AssetReferenceType.Procedural, "<another>No never</another>");
            yield return null;
            yield return null;
            var another = Q("another") as IReactComponent;
            Assert.AreEqual("No never", another.TextContent);
        }

        [EditorInjectableTest(Script = @"
            <button onCustomEvent='Globals.value = 5'>Click here</button>
        ", Html = true)]
        public IEnumerator HtmlRendererWorks()
        {
            yield return null;
            var button = Q("button") as ButtonComponent<Button>;
            button.FireEvent("onCustomEvent", null);
            yield return null;
            Assert.AreEqual(5, Globals["value"]);
        }
    }
}
