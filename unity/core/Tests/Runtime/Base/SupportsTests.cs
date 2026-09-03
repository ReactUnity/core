using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class SupportsTests : TestBase
    {
        public SupportsTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest(Style = @"
            view { color: white; }
            @supports (color: oklch(0.5 0.1 200)) { view { color: red; } }
            @supports (float: left) { view { color: blue; } }
            @supports (color: color-mix(in oklab, red, red)) { view { font-size: 13; } }
        ")]
        public IEnumerator SupportedBlocksApplyAndUnsupportedOnesAreSkipped()
        {
            yield return null;
            var tmp = Canvas.GetComponentInChildren<TMPro.TextMeshProUGUI>();

            Assert.AreEqual(Color.red, tmp.color);
            Assert.AreEqual(13, tmp.fontSize);
        }

        [UGUITest(Style = @"
            view { color: white; }
            @supports (color: red) {
                @media (min-asd: 600px) { view { color: red; } }
            }
            @media (min-asd: 600px) {
                @supports (color: red) { view { font-size: 13; } }
            }
        ")]
        public IEnumerator SupportsNestsWithMediaInBothDirections()
        {
            yield return null;
            var tmp = Canvas.GetComponentInChildren<TMPro.TextMeshProUGUI>();
            Assert.AreEqual(Color.white, tmp.color);

            MediaProvider.SetNumber("asd", 600);
            yield return null;

            Assert.AreEqual(Color.red, tmp.color);
            Assert.AreEqual(13, tmp.fontSize);
        }
    }
}
