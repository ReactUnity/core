using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UIToolkit;
using UnityEngine.UIElements;

namespace ReactUnity.Tests.Editor.Renderer
{
    public class MiscTests : EditorTestBase
    {
        public MiscTests(JavascriptEngineType engineType) : base(engineType) { }

        [EditorInjectableTest(style: "#test { background-image: none; }")]
        public IEnumerator BackgroundImageNoneDoesNotCrash()
        {
            var cmp = Q("#test") as UIToolkitComponent<VisualElement>;

            cmp.Style["backgroundImage"] = "none";
            yield return null;
            yield return null;
            Assert.AreEqual(null, cmp.Element.style.backgroundImage.value.texture);
        }
    }
}
