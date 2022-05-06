using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UIToolkit;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Tests.Editor.Renderer
{
    public class MediaQueryTests : EditorTestBase
    {
        public MediaQueryTests(JavascriptEngineType engineType) : base(engineType) { }


        [EditorInjectableTest(style: @"
            view { color: red; }
            @media (min-width: 50000px) {
                view { color: white; }
            }
")]
        public IEnumerator MqShouldNotAffectNonMqStyles()
        {
            yield return null;

            var cmp = Q("#test") as UIToolkitComponent<VisualElement>;
            var rt = cmp.Children[0] as TextComponent<TextElement>;

            var text = rt.Element;

            Assert.AreEqual(Color.red, text.resolvedStyle.color);
        }
    }
}
