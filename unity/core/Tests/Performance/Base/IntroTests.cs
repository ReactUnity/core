using System.Collections;
using ReactUnity.Scripting;
using Unity.PerformanceTesting;

namespace ReactUnity.Tests.Performance
{
    public class IntroTests : PerfTestBase
    {
        public IntroTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest, Performance]
        public IEnumerator TestFramePerformance()
        {
            yield return Measure.Frames()
                .ProfilerMarkers(DrawCallsCount)
                .Run();
        }
    }
}
