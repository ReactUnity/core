using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class StyleInvalidationTests : TestBase
    {
        public StyleInvalidationTests(JavascriptEngineType engineType) : base(engineType) { }

        const string ClassScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='parent' className={globals.cls || ''}>
                    <view id='child' />
                </view>;
            }
        ";

        [UGUITest(Script = ClassScript, Style = @"
            #parent { color: black; }
            #parent.hit { color: red; }
            #child { font-size: 12px; }
        ")]
        public IEnumerator AClassNoRuleReadsKeepsTheStyle()
        {
            yield return null;

            var parent = Q("#parent").ComputedStyle;
            var child = Q("#child").ComputedStyle;

            // Nothing matches .unrelated, so neither element is restyled.
            Globals["cls"] = "unrelated";
            yield return null;

            Assert.AreSame(parent, Q("#parent").ComputedStyle);
            Assert.AreSame(child, Q("#child").ComputedStyle);

            // A class a rule does read restyles the element and what inherits from it.
            Globals["cls"] = "unrelated hit";
            yield return null;

            Assert.AreNotSame(parent, Q("#parent").ComputedStyle);
            Assert.AreEqual(Color.red, Q("#parent").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#child").ComputedStyle.color);

            Globals["cls"] = "";
            yield return null;

            Assert.AreEqual(Color.black, Q("#child").ComputedStyle.color);
        }

        [UGUITest(Script = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                const items = Array.from({ length: globals.count || 2 }, (_, i) => i);
                return <view id='list'>
                    {items.map(i => <view key={i} id={'item' + i} className='item' />)}
                </view>;
            }
        ", Style = @"
            .item { font-size: 10px; }
            .item:last-child { font-size: 20px; }
            .item + .item { color: red; }
        ")]
        public IEnumerator AnArrivingSiblingRestylesPositionalRules()
        {
            yield return null;

            Assert.AreEqual(10, Q("#item0").ComputedStyle.fontSize);
            Assert.AreEqual(20, Q("#item1").ComputedStyle.fontSize);

            Globals["count"] = 3;
            yield return null;

            Assert.AreEqual(10, Q("#item1").ComputedStyle.fontSize);
            Assert.AreEqual(20, Q("#item2").ComputedStyle.fontSize);
            Assert.AreEqual(Color.red, Q("#item2").ComputedStyle.color);
            Assert.AreNotEqual(Color.red, Q("#item0").ComputedStyle.color);

            Globals["count"] = 2;
            yield return null;

            Assert.AreEqual(20, Q("#item1").ComputedStyle.fontSize);
        }

        [UGUITest(Script = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='parent' style={{ '--w': globals.w || '100px', '--pad': globals.pad || '4px' }}>
                    <view id='child' />
                </view>;
            }
        ", Style = @"
            #child { width: var(--w); padding: var(--pad) 8px; }
        ")]
        public IEnumerator AVariableIsReadAgainWhenItChanges()
        {
            yield return null;

            var child = Q("#child") as UGUI.UGUIComponent;
            Assert.AreEqual(100, child.RectTransform.rect.width);
            Assert.AreEqual(4, child.Layout.PaddingTop.Value);

            // Each text is parsed once and kept, so going back to one seen before must still apply it.
            Globals["w"] = "200px";
            Globals["pad"] = "6px";
            yield return null;

            Assert.AreEqual(200, child.RectTransform.rect.width);
            Assert.AreEqual(6, child.Layout.PaddingTop.Value);
            Assert.AreEqual(8, child.Layout.PaddingLeft.Value);

            Globals["w"] = "100px";
            Globals["pad"] = "4px";
            yield return null;

            Assert.AreEqual(100, child.RectTransform.rect.width);
            Assert.AreEqual(4, child.Layout.PaddingTop.Value);
        }

        [UGUITest(Script = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='parent' style={{ '--d': globals.d || '1s' }}>
                    <view id='child' />
                </view>;
            }
        ", Style = @"
            @keyframes grow { from { width: 100px; } to { width: 200px; } }
            #child { animation: grow var(--d) linear forwards; }
        ")]
        public IEnumerator AnAnimationTimingVariableIsReadAgainWhenItChanges()
        {
            yield return null;
            var child = Q("#child") as UGUI.UGUIComponent;

            yield return AdvanceTime(0.5f);
            Assert.AreEqual(150, child.RectTransform.rect.width, 1);

            // The timing is kept between ticks, and has to be let go of when an inherited variable moves.
            Globals["d"] = "2s";
            yield return null;
            yield return AdvanceTime(0.5f);

            Assert.AreEqual(150, child.RectTransform.rect.width, 1);
        }
    }
}
