using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using UnityEngine.UIElements;

namespace ReactUnity.Tests
{
    public class LogicalPropertyTests : TestBase
    {
        const string BaseScript = @"
            export default function App() {
                return <view id='outer'>
                    <view id='test'>
                        <view id='inner' />
                    </view>
                </view>;
            }
        ";

        public LogicalPropertyTests(JavascriptEngineType engineType) : base(engineType) { }

        [UGUITest(Script = BaseScript, Style = @"
          #test {
            padding-inline: 4px 8px;
            padding-block: 12px 16px;
          }
")]
        public IEnumerator TheTwoAxisShorthandsSplitIntoStartAndEnd()
        {
            yield return null;

            var layout = Q("#test").Layout;
            Assert.AreEqual(4, layout.LayoutPaddingLeft);
            Assert.AreEqual(8, layout.LayoutPaddingRight);
            Assert.AreEqual(12, layout.LayoutPaddingTop);
            Assert.AreEqual(16, layout.LayoutPaddingBottom);
        }

        [UGUITest(Script = BaseScript, Style = @"
          #test {
            direction: rtl;
            padding-inline: 4px 8px;
            padding-block: 12px 16px;
          }
")]
        public IEnumerator DirectionSwapsTheInlineAxisAndLeavesTheBlockOneAlone()
        {
            yield return null;

            var layout = Q("#test").Layout;
            Assert.AreEqual(8, layout.LayoutPaddingLeft);
            Assert.AreEqual(4, layout.LayoutPaddingRight);
            Assert.AreEqual(12, layout.LayoutPaddingTop);
            Assert.AreEqual(16, layout.LayoutPaddingBottom);
        }

        // Nothing in ReactUnity's own cascade inherits `direction` -- Yoga does, which is the whole
        // reason the inline edges are handed to it rather than resolved here.
        [UGUITest(Script = BaseScript, Style = @"
          #outer { direction: rtl; }
          #inner { padding-inline-start: 4px; margin-inline-start: 6px; }
")]
        public IEnumerator DirectionIsInheritedFromAnAncestor()
        {
            yield return null;

            var layout = Q("#inner").Layout;
            Assert.AreEqual(0, layout.LayoutPaddingLeft);
            Assert.AreEqual(4, layout.LayoutPaddingRight);
            Assert.AreEqual(0, layout.LayoutMarginLeft);
            Assert.AreEqual(6, layout.LayoutMarginRight);
        }

        [UGUITest(Script = BaseScript, Style = @"
          #test {
            margin-inline: 3px 7px;
            margin-block: 9px;
            border-inline-width: 2px 6px;
            border-block-width: 1px 5px;
          }
")]
        public IEnumerator MarginAndBorderTakeTheLogicalShorthandsToo()
        {
            yield return null;

            var layout = Q("#test").Layout;
            Assert.AreEqual(3, layout.LayoutMarginLeft);
            Assert.AreEqual(7, layout.LayoutMarginRight);
            Assert.AreEqual(9, layout.LayoutMarginTop);
            Assert.AreEqual(9, layout.LayoutMarginBottom);

            Assert.AreEqual(2, layout.LayoutBorderLeft);
            Assert.AreEqual(6, layout.LayoutBorderRight);
            Assert.AreEqual(1, layout.LayoutBorderTop);
            Assert.AreEqual(5, layout.LayoutBorderBottom);
        }

        [UGUITest(Script = BaseScript, Style = @"
          #test {
            position: absolute;
            inset-inline: 20px 40px;
            inset-block-start: 30px;
          }
")]
        public IEnumerator InsetTakesTheLogicalShorthandsToo()
        {
            yield return null;

            var layout = Q("#test").Layout;
            Assert.AreEqual(20, layout.LayoutLeft);
            Assert.AreEqual(30, layout.LayoutTop);
        }

        // Yoga keeps the inline edges as their own values and prefers them over the physical ones,
        // so a logical declaration wins whatever order the two appear in. CSS would let the later
        // one win; mixing the two on one edge is the only place the difference shows.
        [UGUITest(Script = BaseScript, Style = @"
          #test {
            padding-inline-start: 9px;
            padding-left: 2px;
          }
")]
        public IEnumerator ALogicalEdgeBeatsThePhysicalOneItOverlaps()
        {
            yield return null;

            Assert.AreEqual(9, Q("#test").Layout.LayoutPaddingLeft);
        }

        // The inline edges have to read as undefined when unset, not as a defined zero -- Yoga
        // prefers them over the physical edge either way, so a zero would swallow `padding-left`.
        [UGUITest(Script = BaseScript, Style = @"
          #test { padding-left: 3px; }
")]
        public IEnumerator RemovingALogicalEdgeUncoversThePhysicalOne()
        {
            yield return null;

            var cmp = Q("#test");
            Assert.AreEqual(3, cmp.Layout.LayoutPaddingLeft);

            cmp.Style["paddingInlineStart"] = 9;
            yield return null;
            Assert.AreEqual(9, cmp.Layout.LayoutPaddingLeft);

            cmp.Style["paddingInlineStart"] = null;
            yield return null;
            Assert.AreEqual(3, cmp.Layout.LayoutPaddingLeft);
        }
        // Tailwind's `space-x-*`, verbatim: a zero-specificity `:where`, `:not(:last-child)`, a
        // registered property and a logical margin whose value is a length times a unitless var.
        [UGUITest(Script = @"
            export default function App() {
                return <view id='test' class='space-x-4'>
                    <view id='first' />
                    <view id='second' />
                    <view id='third' />
                </view>;
            }
        ", Style = @"
          @property --tw-space-x-reverse {
            syntax: ""*"";
            inherits: false;
          }

          :where(.space-x-4 > :not(:last-child)) {
            --tw-space-x-reverse: 0;
            margin-inline-start: calc(10px * var(--tw-space-x-reverse));
            margin-inline-end: calc(10px * calc(1 - var(--tw-space-x-reverse)));
          }
")]
        public IEnumerator TheShapeSpaceXCompilesToResolves()
        {
            yield return null;

            Assert.AreEqual(10, Q("#first").Layout.LayoutMarginRight);
            Assert.AreEqual(0, Q("#first").Layout.LayoutMarginLeft);
            Assert.AreEqual(10, Q("#second").Layout.LayoutMarginRight);
            Assert.AreEqual(0, Q("#third").Layout.LayoutMarginRight);
        }
    }

    // UIElements has no start/end edge, so the inline axis is folded into left and right here
    // instead of being handed over -- always as if the direction were ltr.
    public class LogicalPropertyUIToolkitTests : UIToolkitTestBase
    {
        public LogicalPropertyUIToolkitTests(JavascriptEngineType engineType) : base(engineType) { }

        [UIToolkitTest(Style = @"
          #test {
            padding-inline: 4px 8px;
            padding-block: 12px 16px;
            margin-inline: 3px 7px;
          }
")]
        public IEnumerator TheInlineAxisLandsOnLeftAndRight()
        {
            yield return null;

            var style = Q<VisualElement>("#test").Element.resolvedStyle;
            Assert.AreEqual(4, style.paddingLeft);
            Assert.AreEqual(8, style.paddingRight);
            Assert.AreEqual(12, style.paddingTop);
            Assert.AreEqual(16, style.paddingBottom);
            Assert.AreEqual(3, style.marginLeft);
            Assert.AreEqual(7, style.marginRight);
        }
    }
}
