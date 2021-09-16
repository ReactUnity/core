using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;
using ReactUnity.UGUI;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class TextTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <text richText={globals.richText}>
                        {globals.textContent || 'this is default text content'}
                    </text>
                </>;
            }

            Renderer.render(<App />);
        ";

        const string BaseStyle = @"";

        public TextComponent Text => Q("text") as TextComponent;

        public TextTests(JavascriptEngineType engineType) : base(engineType) { }

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator TextPropertiesAppliedCorrectly()
        {
            yield return null;
            Assert.AreEqual(false, Text.Text.richText);
            Assert.AreEqual("this is default text content", Text.TextContent);

            Component.Globals.Set("richText", true);
            Component.Globals.Set("textContent", "some other text content");
            yield return null;

            Assert.AreEqual(true, Text.Text.richText);
            Assert.AreEqual("some other text content", Text.TextContent);
        }

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator TextStrokeWorks()
        {
            InsertStyle(@"text { text-stroke: 0.5 red; }");
            yield return null;
            Assert.AreEqual(0.5f, Text.Text.outlineWidth);
            Assert.AreEqual(new Color32(255, 0, 0, 255), Text.Text.outlineColor);

            InsertStyle(@"text { text-stroke-width: 0.4; }");
            yield return null;
            Assert.AreEqual(0.4f, Text.Text.outlineWidth);
            Assert.AreEqual(new Color32(255, 0, 0, 255), Text.Text.outlineColor);

            InsertStyle(@"text { text-stroke-color: blue; }");
            yield return null;
            Assert.AreEqual(0.4f, Text.Text.outlineWidth);
            Assert.AreEqual(new Color32(0, 0, 255, 255), Text.Text.outlineColor);
        }

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator OverflowAndMaskDoesNotBreakText()
        {
            InsertStyle(@"text {
                overflow: hidden;
                mask-image: url(res:star);
            }");
            yield return null;
            Assert.IsNotNull(Text);
        }

        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator TextCanBeWrappedWithLinkedStyle()
        {
            var textContent = "this is default text content";
            Globals["textContent"] = textContent;

            Text.Style["text-overflow"] = "linked";
            Assert.IsNull(Text.LinkedTextWatcher?.LinkedText);
            yield return null;
            Assert.IsNull(Text.LinkedTextWatcher?.LinkedText);

            Text.Style["width"] = 80;
            Text.Style["max-height"] = "2em";
            yield return null;
            // TODO: make this able to render in 1 frame
            yield return null;
            Assert.IsNotNull(Text.LinkedTextWatcher?.LinkedText);

            var overflowAt = Text.Text.firstOverflowCharacterIndex;
            Assert.AreEqual(1, Text.LinkedTextWatcher.LinkedText.Text.pageToDisplay);
            Assert.AreEqual(overflowAt, Text.LinkedTextWatcher.LinkedText.Text.firstVisibleCharacter);
            Assert.AreEqual(textContent, Text.LinkedTextWatcher.LinkedText.Text.text);


            Text.Style["text-overflow"] = null;
            yield return null;
            Assert.IsNull(Text.LinkedTextWatcher?.LinkedText);
        }
    }
}
