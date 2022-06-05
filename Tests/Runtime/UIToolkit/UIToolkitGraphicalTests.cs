using System;
using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UIToolkit;

namespace ReactUnity.Tests.UIToolkit
{
#if !UNITY_EDITOR
    [Ignore("Snapshot tests are only supported in editor")]
#endif
#if !REACT_UITOOLKIT
    [Ignore("UIToolkit is not enabled")]
#endif
    [TestFixture(JavascriptEngineType.Auto, Category = "Snapshot")]
    public class UIToolkitGraphicalTests : UIToolkitTestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                </view>;
            }
";

        const string BaseStyle = @"
            #test {
                background-color: white;
                width: 300px;
                height: 300px;
            }
        ";

        public UIToolkitGraphicalTests(JavascriptEngineType engineType) : base(engineType) { }


        protected static Tuple<string, string>[] svgs = SvgTests.svgs;

#if !REACT_VECTOR_GRAPHICS
        [Ignore("Unity.VectorGraphics is not enabled")]
#endif
        [UIToolkitTest(Script = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                    <svg id='svg' />
                </view>;
            }
        ", Style = BaseStyle)]
        public IEnumerator SvgSnapshots([ValueSource("svgs")] Tuple<string, string> item)
        {
            var svgCmp = Q<SvgElement>("#svg") as SvgComponent;
            svgCmp.Content = item.Item2;
            yield return null;
            Assertions.Snapshot("uitoolkit/svgs/" + item.Item1);
        }
    }
}
