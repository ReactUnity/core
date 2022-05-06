using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using UnityEngine.UIElements;

namespace ReactUnity.Tests.Editor.Renderer
{
    public class FontSizeTests : EditorTestBase
    {
        public FontSizeTests(JavascriptEngineType engineType) : base(engineType) { }

        [EditorInjectableTest()]
        public IEnumerator LayoutChangesBasedOnFontSize()
        {
            var view = Q("#test") as ReactUnity.UIToolkit.UIToolkitComponent<VisualElement>;

            view.Style["width"] = "10rem";

            yield return null;
            yield return null;
            yield return null;


            Assert.AreEqual(120, view.Element.layout.width, 0.5f);

            Context.InsertStyle(@":root { font-size: 16px; }");
            yield return null;

            Assert.AreEqual(160, view.Element.layout.width, 0.5f);
        }
    }
}
