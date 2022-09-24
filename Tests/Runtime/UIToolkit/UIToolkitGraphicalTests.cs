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


#if !REACT_VECTOR_GRAPHICS
        [Ignore("Unity.VectorGraphics is not enabled")]
#endif
        [UIToolkitTest(Style = BaseStyle, AutoRender = false)]
        public IEnumerator InlineSvgSnapshots([ValueSource("svgs")] Tuple<string, string> item)
        {
            var script = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                  " + item.Item2 + @"
                </view>;
            }
            ";

            var source = TestHelpers.GetScriptSource(script, false, true);
            while (source.MoveNext()) yield return null;
            Component.Source = source.Current;
            Render();

            yield return null;
            yield return null;
            Assertions.Snapshot("uitoolkit/svgs/" + item.Item1);
        }


#if !REACT_VECTOR_GRAPHICS
        [Ignore("Unity.VectorGraphics is not enabled")]
#endif
        [UIToolkitTest(Script = @"

function generatePolylineArray(arrayX, arrayY) {
  let polyline = '';
  arrayX.map((coordX, i) => {
    return polyline += `${coordX}, ${arrayY[i]} `;
  })
  return polyline;
}

const Graph = ({ arrayX, arrayY, lineWidth }) => {
  const polyline = React.useMemo(() => {
    return generatePolylineArray(arrayX, arrayY);
  }, [arrayX, arrayY]);

  return (
    <svg x='0px' y='0px' viewBox='0 0 1000 2' width='300px'>
      <polyline points={polyline} fill='none' stroke={'black'} strokeWidth={lineWidth} />

      {arrayX.map((coordX, i) =>
        <circle key={i} cx={coordX} cy={arrayY[i]} r={6} fill={'red'} />)}
    </svg>
  )
};


const xPoints = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000];
const yPoints = [5, 30, -5, -10, 15, -15, 20, 5, 8, -12, -20, 2, 3, -5, 8, -2, 22, -30, -15, -35, -20];

export function App() {
  const globals = ReactUnity.useGlobals();
  const points = globals.points || 7;
  const lineWidth = globals.lineWidth || 4;

  const [arrayX, arrayY] = React.useMemo(() => {
    return [xPoints.slice(0, points), yPoints.slice(0, points)];
  }, [points]);

  return <div id='test'>
    <Graph arrayX={arrayX} arrayY={arrayY} lineWidth={lineWidth} />
  </div>;
}

        ", Style = BaseStyle)]
        public IEnumerator DynamicSVG()
        {
            Assertions.Snapshot("uitoolkit/svgs/dynamic1");
            yield return null;
            Globals["points"] = 10;
            yield return null;
            Assertions.Snapshot("uitoolkit/svgs/dynamic2");

            Globals["lineWidth"] = 6;
            yield return null;
            Assertions.Snapshot("uitoolkit/svgs/dynamic3");
        }
    }
}
