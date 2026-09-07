using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class SelectorTests : TestBase
    {
        public SelectorTests(JavascriptEngineType engineType) : base(engineType) { }

        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='root' className={globals.dark ? 'dark' : ''}>
                    <view id='a' className='a'>
                        <view id='b' className='b x' />
                    </view>
                    <view id='c' className='c x' />
                    <view id='d' className='d' />
                    <view id='e' className='x' />
                </view>;
            }
        ";

        const string BaseStyle = @"
            view { color: black; font-size: 10px; }

            #b:is(.a .b) { color: red; }
            #b:not(.a .b) { color: lime; }
            #d:not(.a .b) { color: lime; }
            #root > :not(:is(.a, .c)) { font-size: 20px; }

            .x:where(.dark, .dark *) { color: blue; }
            .c:is(.dark *) { color: red; }
            .c { color: yellow; }
        ";

        [UGUITest(Script = BaseScript, Style = BaseStyle)]
        public IEnumerator IsWhereAndNotTakeComplexSelectorsAnywhereInACompound()
        {
            yield return null;

            // :is() after another simple selector, with an argument spanning a combinator.
            Assert.AreEqual(Color.red, Q("#b").ComputedStyle.color);
            // :not() with a complex selector holds for what is not under .a, and not for what is.
            Assert.AreEqual(Color.red, Q("#b").ComputedStyle.color);
            Assert.AreEqual(Color.green, Q("#d").ComputedStyle.color);
            // :is() inside :not(): neither .a nor .c.
            Assert.AreEqual(10, Q("#a").ComputedStyle.fontSize);
            Assert.AreEqual(10, Q("#c").ComputedStyle.fontSize);
            Assert.AreEqual(20, Q("#d").ComputedStyle.fontSize);
            Assert.AreEqual(20, Q("#e").ComputedStyle.fontSize);

            // Without the dark class neither :where() branch holds.
            Assert.AreEqual(new Color(1, 1, 0), Q("#c").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#e").ComputedStyle.color);

            Globals["dark"] = true;
            yield return null;

            // .x:where(...) weighs one class and loses to the later .c; .c:is(.dark *) weighs two and wins.
            Assert.AreEqual(Color.red, Q("#c").ComputedStyle.color);
            Assert.AreEqual(Color.blue, Q("#e").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#b").ComputedStyle.color);

            Globals["dark"] = false;
            yield return null;

            Assert.AreEqual(new Color(1, 1, 0), Q("#c").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#e").ComputedStyle.color);
        }

        [UGUITest(Script = BaseScript, Style = @"
            view { color: black; }
            #d:state(busy) { color: cyan; }
            #e:busy { color: cyan; }
        ")]
        public IEnumerator StatePseudoClassIsTheDeclaredFormOfACustomState()
        {
            yield return null;
            var d = Q("#d");
            var e = Q("#e");
            Assert.AreEqual(Color.black, d.ComputedStyle.color);

            d.StateStyles.StartState("busy");
            e.StateStyles.StartState("busy");
            yield return null;
            Assert.AreEqual(Color.cyan, d.ComputedStyle.color);
            Assert.AreEqual(Color.cyan, e.ComputedStyle.color);

            d.StateStyles.EndState("busy");
            yield return null;
            Assert.AreEqual(Color.black, d.ComputedStyle.color);
            Assert.AreEqual(Color.cyan, e.ComputedStyle.color);
        }

        const string ScrollScript = @"
            function App() {
                return <scroll id='sc' style={{ width: 200, height: 200 }}>
                    <view style={{ height: 600, flexShrink: 0 }} />
                </scroll>;
            }
        ";

        [UGUITest(Script = ScrollScript, Style = @"
            scroll::-webkit-scrollbar { color: red; }
            scroll::-webkit-scrollbar-thumb { color: blue; }
            scroll::scrollbar[horizontal] { color: lime; }
        ")]
        public IEnumerator WebkitScrollbarPseudoElementsAliasTheScrollbarParts()
        {
            yield return null;
            yield return null;

            var scroll = Q("#sc") as ScrollComponent;
            Assert.AreEqual(Color.red, scroll.VerticalScrollbar.ComputedStyle.color);
            Assert.AreEqual(Color.blue, scroll.VerticalScrollbar.Thumb.ComputedStyle.color);
            // The double-colon form is the same element, so the two spellings cascade together.
            Assert.AreEqual(Color.green, scroll.HorizontalScrollbar.ComputedStyle.color);
        }
    }
}
