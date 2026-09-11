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

        [UGUITest(Style = @"
            view { color: white; font-size: 7; opacity: 1; }
            @supports selector(#root:has(> .a ~ .b)) { view { color: red; } }
            @supports selector(.a:popover-open) { view { color: blue; } }
            @supports selector(::marker) { view { color: blue; } }
            @supports selector(.a, .b) { view { color: blue; } }
            @supports selector(> .a) { view { color: blue; } }
            @supports selector(.a >) { view { color: blue; } }
            @supports selector(::-webkit-scrollbar) and selector(text:hover) and selector(:state(busy)) { view { font-size: 13; } }
            @supports not selector(view::before:nth-child(2n of .a)) { view { opacity: 0.5; } }
        ")]
        public IEnumerator SelectorQueriesAnswerForTheSelectorsThisEngineMatches()
        {
            yield return null;
            var view = Q("view");

            Assert.AreEqual(Color.red, view.ComputedStyle.color);
            Assert.AreEqual(13, view.ComputedStyle.fontSize);
            Assert.AreEqual(1, view.ComputedStyle.opacity);
        }
    }
}
