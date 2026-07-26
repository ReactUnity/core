using NUnit.Framework;
using ReactUnity.Scripting;
using Unity.PerformanceTesting;
using UnityEngine;

namespace ReactUnity.Tests.Performance
{
    [TestFixture(JavascriptEngineType.Auto)]
    public class PerfTestBase : TestBase
    {
        public static SampleGroup DrawCallsCount => new SampleGroup("Draw Calls Count", SampleUnit.Byte);

        public PerfTestBase(JavascriptEngineType engineType = JavascriptEngineType.Auto, RenderMode renderMode = RenderMode.ScreenSpaceCamera, bool usesInput = false)
            : base(engineType, renderMode, usesInput) { }
    }
}
