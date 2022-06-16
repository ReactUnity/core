using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class TextTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='root'>
                    <text richText={globals.richText} id='text'>
                        {globals.textContent ?? 'this is default text content'}
                    </text>
                </view>;
            }
        ";

        const string BaseStyle = @"
            #root {
                align-self: flex-start;
                width: auto;
                height: auto;
            }
        ";

        public UGUIComponent Cmp => Q("#root");
        public TextComponent Text => Q("#text") as TextComponent;

        public TextTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
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

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
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

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator OverflowAndMaskDoesNotBreakText()
        {
            InsertStyle(@"text {
                overflow: hidden;
                mask-image: url(res:star);
            }");
            yield return null;
            Assert.IsNotNull(Text);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
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

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator EmptyTextShouldHaveZeroSize()
        {
            Globals["textContent"] = "";
            yield return null;
            yield return null;

            Assert.AreEqual(0, Cmp.ClientHeight);

            InsertStyle(@"
                #root::before {
                    content: '';
                }
            ");
            yield return null;
            yield return null;

            Assert.AreEqual(0, Cmp.ClientHeight);


            Globals["textContent"] = "some text";
            yield return null;
            yield return null;

            Assert.AreEqual(29, Cmp.ClientHeight);


            InsertStyle(@"
                #root::before {
                    content: 'some before';
                }
            ");
            yield return null;
            yield return null;

            Assert.AreEqual(58, Cmp.ClientHeight);
        }


        [UGUITest(Script = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='root'>
                    <richtext id='text'>
                        <color value='red'>
                            Red
                            {!globals.hideBlue && <color value = 'blue'>
                                Blue
                            </color>}
                        </color> Normal <br />
                        Hey
                    </richtext>
                </view>;
            }
", Style = BaseStyle)]
        public IEnumerator InlineRichTextShouldWork()
        {
            Assert.AreEqual("<color=red>Red<color=blue>Blue</color></color> Normal <br>Hey", Text.Text.text);
            yield return null;

            Globals["hideBlue"] = true;
            yield return null;
            Assert.AreEqual("<color=red>Red</color> Normal <br>Hey", Text.Text.text);
        }

    }
}
