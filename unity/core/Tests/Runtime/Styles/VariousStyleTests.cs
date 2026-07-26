using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class VariousStyleTests : TestBase
    {
        public VariousStyleTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest(Script = @"
            function App() {
                return <view id='test'>
                    Sorting layer test
                </view>;
            }
")]
        public IEnumerator SortingLayerCanBeSetWithStyling()
        {
            yield return null;
            var view = Q("#test");
            Assert.IsNull(view.Canvas);

            InsertStyle(@"#test { sorting-layer: L1 }");
            yield return null;
            Assert.IsNotNull(view.Canvas);
            Assert.AreEqual(1, SortingLayer.GetLayerValueFromID(view.Canvas.sortingLayerID));

            InsertStyle(@"#test { sorting-layer: ""bogus"" }");
            yield return null;
            Assert.AreEqual(0, SortingLayer.GetLayerValueFromID(view.Canvas.sortingLayerID));

            InsertStyle(@"#test { sorting-layer: 2 }");
            yield return null;
            Assert.AreEqual(2, SortingLayer.GetLayerValueFromID(view.Canvas.sortingLayerID));

            InsertStyle(@"#test { sorting-layer: 999 }");
            yield return null;
            Assert.AreEqual(0, SortingLayer.GetLayerValueFromID(view.Canvas.sortingLayerID));

            InsertStyle(@"#test { sorting-layer: ""L3"" }");
            yield return null;
            Assert.AreEqual(3, SortingLayer.GetLayerValueFromID(view.Canvas.sortingLayerID));

            InsertStyle(@"#test { sorting-layer: default }");
            yield return null;
            Assert.AreEqual(0, SortingLayer.GetLayerValueFromID(view.Canvas.sortingLayerID));
        }
    }
}
