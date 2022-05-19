using System;
using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;

namespace ReactUnity.Tests
{
#if !UNITY_EDITOR
    [Ignore("Snapshot tests are only supported in editor")]
#endif
    [TestFixture(JavascriptEngineType.Auto, Category = "Snapshot")]
    public class SvgTests : TestBase
    {
        public SvgTests(JavascriptEngineType engineType) : base(engineType) { }

        const string BaseStyle = @"
            #test {
                background-color: white;
                width: 300px;
                height: 300px;
            }
        ";

        public static Tuple<string, string>[] svgs = new Tuple<string, string>[] {
            Tuple.Create("00",
                @"
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 93 107'>
  <path d='M74,74a42,42 0,1,0-57,0l28,29a42,41 0,0,0 0-57' fill='#00a3dc' fill-rule='evenodd'/>
</svg>
"),
            Tuple.Create("01",
                @"
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='black'>
  <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' />
</svg>
"),
        };


#if !REACT_VECTOR_GRAPHICS
        [Ignore("Unity.VectorGraphics is not enabled")]
#endif
        [UGUITest(Script = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                    <svg id='svg' />
                </view>;
            }
        ", Style = BaseStyle)]
        public IEnumerator SvgSnapshots([ValueSource("svgs")] Tuple<string, string> item)
        {
            var svgCmp = Q("#svg") as SvgComponent;
            svgCmp.Content = item.Item2;
            yield return null;
            Assertions.Snapshot("svgs/" + item.Item1);
        }
    }
}
