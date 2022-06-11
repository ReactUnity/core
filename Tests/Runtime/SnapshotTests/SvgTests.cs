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
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 93 107' id='svg'>
  <path d='M74,74a42,42 0,1,0-57,0l28,29a42,41 0,0,0 0-57' fill='#00a3dc' fill-rule='evenodd'/>
</svg>
"),
            Tuple.Create("01",
                @"
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='black' id='svg'>
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


#if !REACT_VECTOR_GRAPHICS
        [Ignore("Unity.VectorGraphics is not enabled")]
#endif
        [UGUITest(Style = BaseStyle, AutoRender = false)]
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
            Assertions.Snapshot("svgs/" + item.Item1);
        }



#if !REACT_VECTOR_GRAPHICS
        [Ignore("Unity.VectorGraphics is not enabled")]
#endif
        [UGUITest(Script = @"

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
    <svg x='0px' y='0px' viewBox='0 0 1000 2'>
      <polyline points={polyline} fill='none' stroke={'black'} strokeWidth={lineWidth} />

      {arrayX.map((coordX, i) =>
        <circle key={i} cx={coordX} cy={arrayY[i]} r={6} fill={'red'} />)}
    </svg>
  )
};


const xPoints = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000];
const yPoints = [5, 30, -5, -10, 15, -15, 20, 5, 8, -12, -20, 2, 3, -5, 8, -2, 22, -30, -15, -35, -20];

export function App() {
  const globals = useGlobals();
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
            Assertions.Snapshot("svgs/dynamic1");
            yield return null;
            Globals["points"] = 10;
            yield return null;
            Assertions.Snapshot("svgs/dynamic2");

            Globals["lineWidth"] = 6;
            yield return null;
            Assertions.Snapshot("svgs/dynamic3");
        }
    }
}
