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

        [EditorInjectableTest(Style = "#test { background-image: none; }")]
        public IEnumerator BackgroundImageNoneDoesNotCrash()
        {
            var cmp = Q("#test") as UIToolkitComponent<VisualElement>;

            cmp.Style["backgroundImage"] = "none";
            yield return null;
            yield return null;
            Assert.AreEqual(null, cmp.Element.style.backgroundImage.value.texture);
        }


        [EditorInjectableTest()]
        public IEnumerator EncodingHelpersWork()
        {
            yield return null;

            Assert.AreEqual(
                "bla%26bla%26bla",
                Context.Script.EvaluateScript(@"encodeURI('bla&bla&bla')")
            );

            Assert.AreEqual(
                "bla%26bla%26bla",
                Context.Script.EvaluateScript(@"encodeURIComponent('bla&bla&bla')")
            );



            Assert.AreEqual(
                "%5c%25+%2b",
                Context.Script.EvaluateScript(@"encodeURI('\\% +')")
            );


            Assert.AreEqual(
                "%5c%25%20%2b",
                Context.Script.EvaluateScript(@"encodeURIComponent('\\% +')")
            );

        }
    }
}
