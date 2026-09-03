using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UIToolkit;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Tests.Editor.Renderer
{
    public class LayerTests : EditorTestBase
    {
        const string BaseScript = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <>
<view id='v1' className='v1class'>
    <text id='t1' className='t1class'>t1content</text>
</view>
                </>;
            }
        ";

        public LayerTests(JavascriptEngineType engineType) : base(engineType) { }

        public IUIToolkitComponent<TextElement> Text(string selector) => Q(selector) as IUIToolkitComponent<TextElement>;

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator RulesInsideALayerApply()
        {
            var text = Text("#t1");

            var ss = InsertStyle(@"@layer base { #t1 { color: red; } }");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);

            // An anonymous layer holds rules just the same.
            ss = InsertStyle(@"@layer { #t1 { color: blue; } }");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);

            // A statement on its own declares order and contributes nothing.
            ss = InsertStyle(@"@layer a, b; #t1 { color: lime; }");
            yield return null;
            Assert.AreEqual(Color.green, text.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator ALaterLayerWins()
        {
            var text = Text("#t1");

            var ss = InsertStyle(@"
                @layer a { #t1 { color: red; } }
                @layer b { #t1 { color: blue; } }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);

            ss = InsertStyle(@"
                @layer b { #t1 { color: blue; } }
                @layer a { #t1 { color: red; } }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);

            // Reopening a layer puts the rules back in that layer's slot, not at the end.
            ss = InsertStyle(@"
                @layer a { #t1 { color: red; } }
                @layer b { #t1 { color: blue; } }
                @layer a { #t1 { color: lime; } }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator LayerOrderOutranksSpecificity()
        {
            var text = Text("#t1");

            // #t1 is far more specific than `text`, and loses anyway because its layer is earlier.
            var ss = InsertStyle(@"
                @layer a { #t1 { color: red; } }
                @layer b { text { color: blue; } }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);

            // Within one layer specificity decides as usual.
            ss = InsertStyle(@"
                @layer a { text { color: blue; } #t1 { color: red; } }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator UnlayeredRulesBeatEveryLayer()
        {
            var text = Text("#t1");

            var ss = InsertStyle(@"
                text { color: blue; }
                @layer a { #t1 { color: red; } }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);

            // Order on the page does not matter either.
            ss = InsertStyle(@"
                @layer a { #t1 { color: red; } }
                text { color: blue; }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator AStatementDecidesOrderBeforeTheBlocks()
        {
            var text = Text("#t1");

            // Without the statement, `first` would be the earlier layer and blue would win.
            var ss = InsertStyle(@"
                @layer second, first;
                @layer first { #t1 { color: red; } }
                @layer second { #t1 { color: blue; } }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);

            ss = InsertStyle(@"
                @layer first, second;
                @layer first { #t1 { color: red; } }
                @layer second { #t1 { color: blue; } }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator ASubLayerLosesToTheLayerHoldingIt()
        {
            var text = Text("#t1");

            var ss = InsertStyle(@"
                @layer outer {
                    #t1 { color: red; }
                    @layer inner { #t1 { color: blue; } }
                }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);

            // A sub-layer still sits inside its parent's slot, so a later top-level layer beats it.
            ss = InsertStyle(@"
                @layer outer { @layer inner { #t1 { color: blue; } } }
                @layer after { text { color: lime; } }
            ");
            yield return null;
            Assert.AreEqual(Color.green, text.ComputedStyle.color);
            RemoveStyle(ss);

            // The dotted name addresses the same sub-layer as nesting does.
            ss = InsertStyle(@"
                @layer outer.inner { #t1 { color: blue; } }
                @layer outer { #t1 { color: red; } }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator AnonymousLayersAreEachTheirOwn()
        {
            var text = Text("#t1");

            // Neither block can be reopened, so the second is simply a later layer.
            var ss = InsertStyle(@"
                @layer { #t1 { color: red; } }
                @layer { #t1 { color: blue; } }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator ImportantDeclarationsReverseTheLayerOrder()
        {
            var text = Text("#t1");

            // The earlier layer wins once both are important, which is the plain order reversed.
            var ss = InsertStyle(@"
                @layer a { #t1 { color: red !important; } }
                @layer b { #t1 { color: blue !important; } }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);

            // And an important declaration in a layer beats an important one outside every layer.
            ss = InsertStyle(@"
                @layer a { #t1 { color: red !important; } }
                #t1 { color: blue !important; }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);

            // Importance still outranks the layer order itself.
            ss = InsertStyle(@"
                @layer a { #t1 { color: red !important; } }
                @layer b { #t1 { color: blue; } }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator LayersNestWithMediaAndSupports()
        {
            var text = Text("#t1");

            var ss = InsertStyle(@"
                @layer a { @supports (color: red) { #t1 { color: red; } } }
                @layer b { @supports (float: left) { #t1 { color: blue; } } }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);

            // The layer is declared inside the @media here, and still orders normally.
            ss = InsertStyle(@"
                @layer a { #t1 { color: red; } }
                @media (min-width: 1px) { @layer b { #t1 { color: blue; } } }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator OneSelectorInTwoLayersStillOrders()
        {
            var text = Text("#t1");

            // Two rules with one selector, so only the layer rank separates them. Source order
            // would pick red here and the layer order picks blue.
            var ss = InsertStyle(@"
                @layer b, a;
                @layer a { text { color: blue; } }
                @layer b { text { color: red; } }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);

            // And source order would pick red here, where being unlayered picks blue.
            ss = InsertStyle(@"
                text { color: blue; }
                @layer a { text { color: red; } }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator TheShapeTailwindEmitsResolves()
        {
            var text = Text("#t1");

            // Tailwind v4's output in miniature: an ordering statement, the palette as variables in
            // one layer, and a utility in a later one reading them back.
            var ss = InsertStyle(@"
                @layer theme, base, components, utilities;
                @layer theme {
                    #v1 { --color-red-500: oklch(63.7% 0.237 25.331); }
                }
                @layer base {
                    text { color: lime; }
                }
                @layer utilities {
                    .t1class { color: var(--color-red-500); }
                }
            ");
            yield return null;
            Assert.AreEqual(new Color32(0xfb, 0x2c, 0x36, 0xff), (Color32) text.ComputedStyle.color);
            RemoveStyle(ss);
        }
        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator OneLayerOrderIsSharedByEveryStylesheet()
        {
            var text = Text("#t1");

            // #t1 is far more specific than `text`, and loses because its layer is earlier -- which
            // only holds if both sheets order their layers against the same list.
            var first = InsertStyle(@"@layer a { #t1 { color: red; } }");
            var second = InsertStyle(@"@layer b { text { color: blue; } }");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(second);
            RemoveStyle(first);

            // Reopening a layer in a later sheet lands in the slot the first sheet gave it, so the
            // rule in `b` still wins even though the one in `a` comes later in the document.
            first = InsertStyle(@"@layer a { text { color: blue; } }");
            second = InsertStyle(@"@layer b { text { color: red; } }");
            var third = InsertStyle(@"@layer a { text { color: lime; } }");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(third);
            RemoveStyle(second);
            RemoveStyle(first);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator AStatementInOneSheetOrdersAnother()
        {
            var text = Text("#t1");

            // The statement names the order; the sheet that fills the layers in has no say in it.
            var order = InsertStyle(@"@layer second, first;");
            var rules = InsertStyle(@"
                @layer first { text { color: red; } }
                @layer second { text { color: blue; } }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(rules);
            RemoveStyle(order);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator ASubLayerDeclaredLaterSlotsInsideItsParent()
        {
            var text = Text("#t1");

            var ss = InsertStyle(@"
                @layer outer { #t1 { color: red; } }
                @layer other { text { color: blue; } }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);

            // A sub-layer of `outer` moves both `outer` and `other` along the order, so the rules
            // already indexed in them are reranked. They keep their places relative to each other.
            var sub = InsertStyle(@"@layer outer.inner { text { color: lime; } }");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(sub);

            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator AParentLayerStillBeatsASubLayerDeclaredLater()
        {
            var text = Text("#t1");

            // `a` was the whole order when its rule was indexed, and the sub-layer takes the place
            // in front of it -- so the rule in `a` has to be reranked or the two end up tied, and
            // the later one would win on source order.
            var parent = InsertStyle(@"@layer a { text { color: red; } }");
            var sub = InsertStyle(@"@layer a.sub { text { color: blue; } }");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(sub);
            RemoveStyle(parent);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator ARemovedSheetGivesUpTheLayersItDeclared()
        {
            var text = Text("#t1");

            // `a` is named first here, so if the order outlived the sheet the next block would
            // inherit it and blue would win.
            var gone = InsertStyle(@"@layer a, b;");
            RemoveStyle(gone);

            var ss = InsertStyle(@"
                @layer b { text { color: blue; } }
                @layer a { text { color: red; } }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator RevertLayerRollsBackToTheEarlierLayer()
        {
            var text = Text("#t1");

            var ss = InsertStyle(@"
                @layer a { text { color: red; } }
                @layer b { #t1 { color: revert-layer; } }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);

            // The whole layer goes, not only the declaration that reverted it: the lime rule is in
            // `b` as well, and would have won had it been anywhere else.
            ss = InsertStyle(@"
                @layer a { text { color: red; } }
                @layer b { text { color: lime; } #t1 { color: revert-layer; } }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);

            // And it keeps rolling back through as many layers as revert it.
            ss = InsertStyle(@"
                @layer a { text { color: red; } }
                @layer b { text { color: revert-layer; } }
                @layer c { text { color: revert-layer; } }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator RevertLayerOutsideALayerRollsBackFurtherThanTheLayers()
        {
            var text = Text("#t1");
            var initial = text.ComputedStyle.color;

            // Unlayered, so there is no earlier layer to roll back to. It rolls back past every
            // rule of this origin, the layered ones included, the way `revert` does.
            var ss = InsertStyle(@"
                @layer a { text { color: red; } }
                #t1 { color: revert-layer; }
            ");
            yield return null;
            Assert.AreEqual(initial, text.ComputedStyle.color);
            RemoveStyle(ss);

            // Nothing behind it at all comes to the same thing.
            ss = InsertStyle(@"@layer a { #t1 { color: revert-layer; } }");
            yield return null;
            Assert.AreEqual(initial, text.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator RevertLayerRollsBackAnImportantLayerToo()
        {
            var text = Text("#t1");

            // Important declarations rank the layers in reverse, so `a` wins and reverts itself,
            // which leaves the important declaration in `b`.
            var ss = InsertStyle(@"
                @layer a { #t1 { color: revert-layer !important; } }
                @layer b { #t1 { color: blue !important; } }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);

            // A normal declaration reverting its layer cannot reach past an important one.
            ss = InsertStyle(@"
                @layer a { text { color: red !important; } }
                @layer b { text { color: revert-layer; } }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);

            // Two important declarations reverting their own layers, and the first of them has a
            // normal declaration as well: `x` is out of the cascade for good, so the normal rule
            // in it is passed over too and `f` is what is left.
            ss = InsertStyle(@"
                @layer f { text { color: red; } }
                @layer x { text { color: lime; } #t1 { color: revert-layer !important; } }
                @layer y { #t1 { color: revert-layer !important; } }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator RevertLayerReachesIntoAnotherStylesheet()
        {
            var text = Text("#t1");

            var first = InsertStyle(@"@layer a { text { color: red; } }");
            var second = InsertStyle(@"@layer b { #t1 { color: revert-layer; } }");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(second);
            RemoveStyle(first);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator AllRevertLayerRollsBackEveryProperty()
        {
            var text = Text("#t1");

            var ss = InsertStyle(@"
                @layer a { text { color: red; } }
                @layer b { text { color: lime; } #t1 { all: revert-layer; } }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);
        }
    }
}
