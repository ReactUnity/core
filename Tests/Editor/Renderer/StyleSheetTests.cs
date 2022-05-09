using System.Collections;
using System.Linq;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UIToolkit;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Tests.Editor.Renderer
{
    public class StyleSheetTests : EditorTestBase
    {
        public StyleSheetTests(JavascriptEngineType engineType) : base(engineType) { }


        [EditorInjectableTest(style: ":root { color: black !important; }")]
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

        [EditorInjectableTest(@"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <view id='test'>
                        {globals.show && <text></text>}
                    </view>
                    <view id='test2' />
                </>;
            }
        ", @"
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

        [EditorInjectableTest(@"
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
        ", @"
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
    }
}
