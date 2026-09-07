using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using TMPro;
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
                mask-image: url(res:ReactUnity/tests/sprites/star);
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

            Assert.AreEqual(19, Cmp.ClientHeight);


            InsertStyle(@"
                #root::before {
                    content: 'some before';
                }
            ");
            yield return null;
            yield return null;

            Assert.AreEqual(38, Cmp.ClientHeight);
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

        [UGUITest(Script = BaseScript, Style = BaseStyle, AutoRender = false)]
        public IEnumerator TextSizeShouldIncreaseImmediateOnLongerText()
        {
            yield return null;
            var str = "my text somewhat short";
            Component.Globals.Set("textContent", str);
            Render();
            yield return null;

            var initialWidth = Text.ClientWidth;

            Assert.Greater(initialWidth, 50);

            Component.Globals.Set("textContent", str + " but now longer");
            yield return null;

            var newWidth = Text.ClientWidth;

            Assert.Greater(newWidth, initialWidth);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator TextAlignAndVerticalAlignWorks()
        {
            var v = Q("#root");
            var t = (Q("#text") as TextComponent).Text;

            Assert.AreEqual(TextAlignmentOptions.TopLeft, t.alignment);
            yield return null;


            v.Style["text-align"] = "topleft";
            yield return null;
            Assert.AreEqual(TextAlignmentOptions.TopLeft, t.alignment);


            v.Style["text-align"] = "top";
            yield return null;
            Assert.AreEqual(TextAlignmentOptions.Top, t.alignment);

            v.Style["text-align"] = "bottom-right";
            yield return null;
            Assert.AreEqual(TextAlignmentOptions.BottomRight, t.alignment);


            v.Style["text-align"] = "bottom-right";
            v.Style["vertical-align"] = "geometry";
            yield return null;
            Assert.AreEqual(TextAlignmentOptions.BottomRight, t.alignment);

            v.Style["text-align"] = "right";
            v.Style["vertical-align"] = "baseline";
            yield return null;
            Assert.AreEqual(TextAlignmentOptions.BaselineRight, t.alignment);

            v.Style["text-align"] = null;
            v.Style["vertical-align"] = "baseline";
            yield return null;
            Assert.AreEqual(TextAlignmentOptions.BaselineLeft, t.alignment);

            v.Style["text-align"] = "right";
            v.Style["text-align"] = "";
            v.Style["vertical-align"] = "baseline";
            yield return null;
            Assert.AreEqual(TextAlignmentOptions.BaselineLeft, t.alignment);

            v.Style["text-align"] = "right";
            v.Style["text-align"] = "a";
            v.Style["vertical-align"] = "baseline";
            yield return null;
            Assert.AreEqual(TextAlignmentOptions.BaselineRight, t.alignment);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator TextShouldTakeMaxLinesIntoAccountWhenCalculatingSize()
        {
            var t = (Q("#text") as TextComponent).Text;

            Component.Globals.Set("textContent",
@"Line 1
Line 2
Line 3
Line 4
Line 5
Line 6");

            yield return null;

            var height = t.rectTransform.rect.height;
            Assert.AreEqual(113, height, 10);


            Text.Style["max-lines"] = "3";
            yield return null;
            yield return null;

            height = t.rectTransform.rect.height;
            Assert.AreEqual(55, height, 10);



            Text.Style["max-lines"] = "9";
            yield return null;
            yield return null;

            height = t.rectTransform.rect.height;
            Assert.AreEqual(113, height, 10);



            Text.Style["max-lines"] = "5";
            yield return null;
            yield return null;

            height = t.rectTransform.rect.height;
            Assert.AreEqual(94, height, 10);



            Text.Style["max-lines"] = "6";
            yield return null;
            yield return null;
            height = t.rectTransform.rect.height;
            Assert.AreEqual(113, height, 10);
        }

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator GlyphsPaintOverTheTextsOwnBackground()
        {
            if (TestHelpers.IsNoGraphics()) Assert.Inconclusive("Needs a graphics device to read pixels back.");

            InsertStyle(@"#text { background-color: red; color: white; font-size: 60px; padding: 10px; }");
            yield return null;
            yield return null;

            var corners = new Vector3[4];
            Text.RectTransform.GetWorldCorners(corners);
            var cam = Camera.main;
            var min = RectTransformUtility.WorldToScreenPoint(cam, corners[0]);
            var max = RectTransformUtility.WorldToScreenPoint(cam, corners[2]);

            // Sampled inside the padding, so an edge pixel of whatever is behind cannot pass for a glyph.
            var capture = Assertions.CaptureScreenshot();
            int red = 0, white = 0;
            for (int y = Mathf.CeilToInt(min.y) + 5; y < Mathf.FloorToInt(max.y) - 5; y++)
                for (int x = Mathf.CeilToInt(min.x) + 5; x < Mathf.FloorToInt(max.x) - 5; x++)
                {
                    var c = capture.GetPixel(x, y);
                    if (c.r > 0.8f && c.g < 0.2f && c.b < 0.2f) red++;
                    else if (c.r > 0.8f && c.g > 0.8f && c.b > 0.8f) white++;
                }
            Object.Destroy(capture);

            Assert.Greater(red, 0, "The background was not drawn");
            Assert.Greater(white, 0, "The glyphs are under the background");

            // They paint after it because they live on a child kept after the background object.
            var glyphs = Text.Text.transform;
            Assert.AreEqual(Text.RectTransform, glyphs.parent);
            Assert.AreEqual(Text.RectTransform.childCount - 1, glyphs.GetSiblingIndex());
        }
    }
}
