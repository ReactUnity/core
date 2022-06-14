using System.Collections;
using System.Linq;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.Styling;
using ReactUnity.UIToolkit;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Tests.Editor.Renderer
{
    public class StyleSheetTests : EditorTestBase
    {
        public StyleSheetTests(JavascriptEngineType engineType) : base(engineType) { }


        [EditorInjectableTest(Style = ":root { color: black !important; }")]
        public IEnumerator StyleSheetsCanBeInsertedAndRemoved()
        {
            yield return null;

            var cmp = Q("#test") as UIToolkitComponent<VisualElement>;
            var rt = cmp.Children[0] as TextComponent<TextElement>;
            var text = rt.Element;

            Assert.AreEqual(Color.black, text.resolvedStyle.color);


            var sheet = Context.InsertStyle("view { color: red; }");
            yield return null;
            Assert.AreEqual(Color.red, text.resolvedStyle.color);


            Context.RemoveStyle(sheet);
            yield return null;
            Assert.AreEqual(Color.black, text.resolvedStyle.color);
        }


        [EditorInjectableTest(Style = "view { color: white; }")]
        public IEnumerator StyleSheetsCanHaveMediaConditions()
        {
            yield return null;
            var cmp = Q("#test") as UIToolkitComponent<VisualElement>;
            var rt = cmp.Children[0] as TextComponent<TextElement>;
            var text = rt.Element;

            var sheet = new Styling.StyleSheet(Context.Style, "view { color: red; }", 0, null, "(min-asd: 600px)");
            Context.InsertStyle(sheet);

            yield return null;
            Assert.AreEqual(Color.white, text.resolvedStyle.color);

            MediaProvider.SetNumber("asd", 600);
            yield return null;
            Assert.AreEqual(Color.red, text.resolvedStyle.color);

            sheet.Enabled = false;
            yield return null;
            Assert.AreEqual(Color.white, text.resolvedStyle.color);
        }



        [EditorInjectableTest(Style = "view { color: white; }")]
        public IEnumerator StyleSheetsCanBeEnabledAndDisabled()
        {
            yield return null;
            var cmp = Q("#test") as UIToolkitComponent<VisualElement>;
            var rt = cmp.Children[0] as TextComponent<TextElement>;
            var text = rt.Element;

            var sheet = new Styling.StyleSheet(Context.Style, "view { color: red; }");
            sheet.Enabled = false;
            Context.InsertStyle(sheet);

            yield return null;
            Assert.AreEqual(Color.white, text.resolvedStyle.color);

            sheet.Enabled = true;
            yield return null;
            Assert.AreEqual(Color.red, text.resolvedStyle.color);

            sheet.Enabled = false;
            yield return null;
            Assert.AreEqual(Color.white, text.resolvedStyle.color);

            sheet.Enabled = true;
            yield return null;
            Assert.AreEqual(Color.red, text.resolvedStyle.color);
        }


        [EditorInjectableTest(Script = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <view id='test'>
                        {globals.show && <text></text>}
                    </view>
                    <view id='test2' />
                </>;
            }
        ", Style = @"
            view { background-color: black; color: white; }
            view:empty { background-color: red; color: blue; }
            #test + #test2 { background-color: lime; }
            #test:empty + #test2 { background-color: blue; }
        ")]
        public IEnumerator ParentBecomesEmptyWhenChildIsRemoved()
        {
            yield return null;

            var cmp = Q("#test") as UIToolkitComponent<VisualElement>;
            var cmp2 = Q("#test2") as UIToolkitComponent<VisualElement>;
            var rt = cmp.Children.FirstOrDefault() as TextComponent<TextElement>;

            Assert.AreEqual(Color.red, cmp.Element.resolvedStyle.backgroundColor);
            Assert.IsNull(rt);
            Assert.AreEqual(Color.blue, cmp2.Element.resolvedStyle.backgroundColor);

            Globals.Set("show", true);
            yield return null;

            rt = cmp.Children.FirstOrDefault() as TextComponent<TextElement>;
            Assert.AreEqual(Color.black, cmp.Element.resolvedStyle.backgroundColor);
            Assert.AreEqual(Color.white, rt.Element.resolvedStyle.color);
            Assert.AreEqual(Color.green, cmp2.Element.resolvedStyle.backgroundColor);

            Globals.Set("show", false);
            yield return null;

            rt = cmp.Children.FirstOrDefault() as TextComponent<TextElement>;
            Assert.AreEqual(Color.red, cmp.Element.resolvedStyle.backgroundColor);
            Assert.IsNull(rt);
            Assert.AreEqual(Color.blue, cmp2.Element.resolvedStyle.backgroundColor);
        }

        [EditorInjectableTest(Script = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <view className='class+1'>
                        Hey
                    </view>
                    <view className='hover:button'>
                        Hey
                    </view>
                </>;
            }
        ", Style = @"
            .class\+1 { color: red; }

            .hover\:button {
                color: blue;
            }
        ")]
        public IEnumerator EscapedCharactersCanBeParsedCorrect()
        {
            yield return null;

            var cmp = Q(".class\\+1") as UIToolkitComponent<VisualElement>;
            var rt = cmp.Children.FirstOrDefault() as TextComponent<TextElement>;
            Assert.AreEqual(Color.red, rt.Element.resolvedStyle.color);

            cmp = Q(".hover\\:button") as UIToolkitComponent<VisualElement>;
            rt = cmp.Children.FirstOrDefault() as TextComponent<TextElement>;
            Assert.AreEqual(Color.blue, rt.Element.resolvedStyle.color);
        }


        [EditorInjectableTest(Script = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <view className='c1'>
                        Hey
                    </view>
                    <view className='c2'>
                        Hey
                    </view>
                </>;
            }
        ", Style = @"
            .c1 + .c2 { --v1: 1px; }
            .c1+ .c2 { --v2: 2px; }
            .c1 +.c2 { --v3: 3px; }
            .c1+.c2 { --v4: 4px; }
            * + .c2 { --v5: 5px; }
            *+.c2 { --v6: 6px; }
            *+view { --v7: 7px; }
        ")]
        public IEnumerator AdjacencySelectorsParsesCorrectly()
        {
            yield return null;

            var cmp = Q(".c2") as UIToolkitComponent<VisualElement>;

            Assert.AreEqual("1px", cmp.ComputedStyle.GetStyleValue<string>(CssProperties.GetProperty("--v1")));
            Assert.AreEqual("2px", cmp.ComputedStyle.GetStyleValue<string>(CssProperties.GetProperty("--v2")));
            Assert.AreEqual("3px", cmp.ComputedStyle.GetStyleValue<string>(CssProperties.GetProperty("--v3")));
            Assert.AreEqual("4px", cmp.ComputedStyle.GetStyleValue<string>(CssProperties.GetProperty("--v4")));
            Assert.AreEqual("5px", cmp.ComputedStyle.GetStyleValue<string>(CssProperties.GetProperty("--v5")));
            Assert.AreEqual("6px", cmp.ComputedStyle.GetStyleValue<string>(CssProperties.GetProperty("--v6")));
            Assert.AreEqual("7px", cmp.ComputedStyle.GetStyleValue<string>(CssProperties.GetProperty("--v7")));
        }
    }
}
