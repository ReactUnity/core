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
    }
}
