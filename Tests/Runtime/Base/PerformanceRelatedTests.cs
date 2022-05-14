using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;

namespace ReactUnity.Tests
{
    public class PerformanceRelatedTests : TestBase
    {
        public PerformanceRelatedTests(JavascriptEngineType engineType) : base(engineType) { }

        UGUIComponent View => Q("#test");

        [UGUITest]
        public IEnumerator ShouldNotGenerateBackgroundWhenNotNecessary()
        {
            yield return null;
            Assert.IsNull(View.BorderAndBackground);

            View.Style["background"] = "none";
            yield return null;
            Assert.IsNull(View.BorderAndBackground.BackgroundGraphics);
            Assert.IsNull(View.BorderAndBackground.ShadowGraphics);
        }

        [UGUITest]
        public IEnumerator ShouldNotGenerateOverflowMaskWhenNotNecessary()
        {
            yield return null;
            Assert.IsNull(View.OverflowMask);
        }
    }
}
