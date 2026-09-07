using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Tests
{
    // UIToolkit owns the layout here, so the content box has to come from the element rather than
    // from Yoga, and a container resized by the framework is seen a frame later.
    public class UIToolkitContainerQueryTests : UIToolkitTestBase
    {
        public UIToolkitContainerQueryTests(JavascriptEngineType engineType) : base(engineType) { }

        const string Script = @"
            function App() {
                return <view id='outer'>
                    <view id='a' />
                </view>;
            }
        ";

        // The border box is 300 by 200; the query and the unit read the 250 by 150 inside the padding and border.
        const string Style = @"
            #outer { container-type: size; width: 300px; height: 200px; padding: 20px; border-width: 5px; border-color: black; }
            #a { color: black; width: 50cqw; height: 10px; }
            @container (width > 240px) and (width < 260px) and (height > 140px) and (height < 160px) { #a { color: red; } }
        ";

        [UIToolkitTest(Script = Script, Style = Style)]
        public IEnumerator SizeQueriesAndUnitsMeasureTheContentBox()
        {
            for (int i = 0; i < 5; i++) yield return null;

            var a = Q<VisualElement>("#a");
            Assert.AreEqual(Color.red, a.ComputedStyle.color);
            Assert.AreEqual(125, a.Element.resolvedStyle.width, 0.5f);
        }
    }
}
