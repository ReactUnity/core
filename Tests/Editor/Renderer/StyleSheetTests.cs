using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;
using ReactUnity.UIToolkit;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Tests.Renderer
{
    public class StyleSheetTests : EditorTestBase
    {
        public StyleSheetTests(JavascriptEngineType engineType) : base(engineType) { }


        [EditorInjectableTest()]
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
    }
}
