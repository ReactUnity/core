using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Editor.Tests.Renderer
{
    public class FontSizeTests : EditorTestBase
    {
        public FontSizeTests(JavascriptEngineType engineType) : base(engineType) { }

        [EditorInjectableTest(style: @"view { width: 10rem; }")]
        public IEnumerator LayoutChangesBasedOnFontSize()
        {
            yield return null;
            yield return null;
            yield return null;

            var view = Q("#test") as ReactUnity.UIToolkit.UIToolkitComponent<VisualElement>;

            Assert.AreEqual(120, view.Element.layout.width);

            Context.InsertStyle(@":root { font-size: 16px; }");
            yield return null;

            Assert.AreEqual(160, view.Element.layout.width);
        }
    }
}
