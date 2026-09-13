using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.Types;
using UnityEngine;
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

        // The painted halves of a border -- its colour, its style and its corners -- are not Yoga's,
        // so unlike the edges above these are resolved against the direction on this side. The rule
        // they follow is the same one: a logical declaration wins over the physical edge it covers.
        [UGUITest(Script = BaseScript, Style = @"
          #test {
            border-inline-color: red blue;
            border-inline-style: dashed dotted;
            border-block-color: cyan magenta;
            border-start-start-radius: 4px;
            border-start-end-radius: 8px;
            border-end-start-radius: 12px;
            border-end-end-radius: 16px;
          }
")]
        public IEnumerator ThePaintedBorderEdgesTakeTheLogicalSpellingsToo()
        {
            yield return null;

            var style = Q("#test").ComputedStyle;
            Assert.AreEqual(Color.red, style.borderLeftColor);
            Assert.AreEqual(Color.blue, style.borderRightColor);
            Assert.AreEqual(Color.cyan, style.borderTopColor);
            Assert.AreEqual(Color.magenta, style.borderBottomColor);

            Assert.AreEqual(BorderStyle.Dashed, style.borderLeftStyle);
            Assert.AreEqual(BorderStyle.Dotted, style.borderRightStyle);

            // A logical corner is named block edge first, so `start-end` is the top right one.
            Assert.AreEqual(4, style.borderTopLeftRadius.X.Value);
            Assert.AreEqual(8, style.borderTopRightRadius.X.Value);
            Assert.AreEqual(12, style.borderBottomLeftRadius.X.Value);
            Assert.AreEqual(16, style.borderBottomRightRadius.X.Value);
        }

        [UGUITest(Script = BaseScript, Style = @"
          #outer { direction: rtl; }
          #test {
            border-inline-color: red blue;
            border-block-color: cyan magenta;
            border-start-start-radius: 4px;
            border-end-end-radius: 16px;
          }
")]
        public IEnumerator DirectionSwapsThePaintedInlineEdgesAndIsInherited()
        {
            yield return null;

            var style = Q("#test").ComputedStyle;
            Assert.AreEqual(Color.blue, style.borderLeftColor, "inline-end is the left edge now");
            Assert.AreEqual(Color.red, style.borderRightColor);

            // The block axis is the same either way -- there is no writing-mode to turn it.
            Assert.AreEqual(Color.cyan, style.borderTopColor);
            Assert.AreEqual(Color.magenta, style.borderBottomColor);

            Assert.AreEqual(4, style.borderTopRightRadius.X.Value);
            Assert.AreEqual(16, style.borderBottomLeftRadius.X.Value);
        }

        [UGUITest(Script = BaseScript, Style = @"
          #test {
            border-inline-start-color: red;
            border-left-color: blue;
          }
")]
        public IEnumerator ALogicalPaintedEdgeBeatsThePhysicalOneItOverlaps()
        {
            yield return null;

            Assert.AreEqual(Color.red, Q("#test").ComputedStyle.borderLeftColor, "and wins whatever order the two came in");
        }

        [UGUITest(Script = BaseScript, Style = @"
          #test { border-left-color: blue; }
")]
        public IEnumerator RemovingALogicalPaintedEdgeUncoversThePhysicalOne()
        {
            yield return null;

            var cmp = Q("#test");
            Assert.AreEqual(Color.blue, cmp.ComputedStyle.borderLeftColor);

            cmp.Style["borderInlineStartColor"] = "red";
            yield return null;
            Assert.AreEqual(Color.red, cmp.ComputedStyle.borderLeftColor);

            // Falling back to the physical edge, not to the initial colour: an undeclared logical
            // property has to read as absent rather than as its own default.
            cmp.Style["borderInlineStartColor"] = null;
            yield return null;
            Assert.AreEqual(Color.blue, cmp.ComputedStyle.borderLeftColor);
        }

        // These are plain aliases, not edges: which axis is inline is `writing-mode`'s to say and
        // there is none here, so the inline axis stays horizontal however the direction runs.
        [UGUITest(Script = BaseScript, Style = @"
          #outer { direction: rtl; }
          #test {
            inline-size: 120px;
            block-size: 60px;
            min-inline-size: 30px;
            max-block-size: 200px;
          }
")]
        public IEnumerator TheLogicalSizesAreAliasesThatDirectionDoesNotTurn()
        {
            yield return null;

            var layout = Q("#test").Layout;
            Assert.AreEqual(120, layout.LayoutWidth);
            Assert.AreEqual(60, layout.LayoutHeight);
            Assert.AreEqual(30, layout.MinWidth.Value);
            Assert.AreEqual(200, layout.MaxHeight.Value);
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

        // Tailwind's border utilities, verbatim: every one of them routes the style through a
        // registered property, so `border-x-*` lands a `var()` on a logical property that used to be
        // dropped for being unknown. Resolving it to the wrong thing would take the border off.
        [UGUITest(Script = @"
            export default function App() {
                return <view>
                    <view id='plain' class='border-2 border-x-4 border-s-red rounded-s' />
                    <view id='dashed' class='border-2 border-dashed border-x-4' />
                </view>;
            }
        ", Style = @"
          @property --tw-border-style {
            syntax: ""*"";
            inherits: false;
            initial-value: solid;
          }

          .border-2 { border-style: var(--tw-border-style); border-width: 2px; }
          .border-x-4 { border-inline-style: var(--tw-border-style); border-inline-width: 4px; }
          .border-dashed { --tw-border-style: dashed; border-style: dashed; }
          .border-s-red { border-inline-start-color: red; }
          .rounded-s { border-start-start-radius: 8px; border-end-start-radius: 8px; }
")]
        public IEnumerator TheShapeTailwindsBorderUtilitiesCompileToResolves()
        {
            yield return null;

            var plain = Q("#plain");
            // The logical width and style both beat the four-way ones they cover.
            Assert.AreEqual(4, plain.Layout.LayoutBorderLeft);
            Assert.AreEqual(2, plain.Layout.LayoutBorderTop);
            Assert.AreEqual(BorderStyle.Solid, plain.ComputedStyle.borderLeftStyle, "the registered property's initial value");
            Assert.AreEqual(Color.red, plain.ComputedStyle.borderLeftColor);
            Assert.AreEqual(8, plain.ComputedStyle.borderTopLeftRadius.X.Value);
            Assert.AreEqual(8, plain.ComputedStyle.borderBottomLeftRadius.X.Value);
            Assert.AreEqual(0, plain.ComputedStyle.borderTopRightRadius.X.Value);

            // `border-dashed` sets the variable, so the logical style follows the physical one.
            var dashed = Q("#dashed").ComputedStyle;
            Assert.AreEqual(BorderStyle.Dashed, dashed.borderLeftStyle);
            Assert.AreEqual(BorderStyle.Dashed, dashed.borderTopStyle);
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

        // The painted border properties are the exception: those are resolved before they ever reach
        // UIElements, so they follow `direction` here the same way they do under UGUI.
        [UIToolkitTest(Style = @"
          :root { direction: rtl; }
          #test { border-inline-color: red blue; border-start-start-radius: 4px; }
")]
        public IEnumerator ThePaintedEdgesStillFollowDirection()
        {
            yield return null;

            var style = Q<VisualElement>("#test").Element.resolvedStyle;
            Assert.AreEqual(Color.blue, style.borderLeftColor);
            Assert.AreEqual(Color.red, style.borderRightColor);
            Assert.AreEqual(4, style.borderTopRightRadius);
        }
    }
}
