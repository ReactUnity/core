using System.Collections;
using ReactUnity.Scripting;
using Unity.PerformanceTesting;

namespace ReactUnity.Tests.Performance
{
    public class BackgroundTests : PerfTestBase
    {
        const string BaseScript = @"
const arr = new Array(1500).fill(0);

function App() {
    return <view className='host'>
        {arr.map((x,i) => <bg key={i} />)}
    </view>;
}
";

        const string BaseStyle = @"
.host {
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 800px;
}

bg {
    width: 20px;
    height: 20px;
    margin: 20px;
    background-color: yellow;
}
";

        public BackgroundTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest(Script = BaseScript, Style = BaseStyle), Performance]
        public IEnumerator TestFramePerformanceWithMultipleBackgrounds()
        {
            yield return Measure.Frames()
                .ProfilerMarkers(DrawCallsCount)
                .Run();
        }
    }
}
