using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UIToolkit;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Tests.Editor.Renderer
{
    public class NestingTests : EditorTestBase
    {
        const string BaseScript = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <>
<view id='v1' className='v1class'>
    <text id='t1' className='t1class hover:underline 2xl:flex'>t1content</text>
    <view id='v2' className='v2class'>
        <text id='t2' className='t2class'>t2content</text>
    </view>
</view>
                </>;
            }
        ";

        public NestingTests(JavascriptEngineType engineType) : base(engineType) { }

        public IUIToolkitComponent<TextElement> Text(string selector) => Q(selector) as IUIToolkitComponent<TextElement>;

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator ADescendantNestsUnderItsParent()
        {
            var t1 = Text("#t1");
            var t2 = Text("#t2");

            var ss = InsertStyle(@"#v1 { .t1class { color: red; } }");
            yield return null;
            Assert.AreEqual(Color.red, t1.ComputedStyle.color);
            RemoveStyle(ss);

            // Only the descendants of the outer selector are matched.
            ss = InsertStyle(@"#v2 { text { color: red; } }");
            yield return null;
            Assert.AreEqual(Color.red, t2.ComputedStyle.color);
            Assert.AreNotEqual(Color.red, t1.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator TheParentSelectorAttachesToTheParent()
        {
            var t1 = Text("#t1");

            var ss = InsertStyle(@"text { &.t1class { color: red; } }");
            yield return null;
            Assert.AreEqual(Color.red, t1.ComputedStyle.color);
            RemoveStyle(ss);

            // And the parent may appear anywhere in the nested selector, not only at its start.
            ss = InsertStyle(@".t1class { #v1 & { color: blue; } }");
            yield return null;
            Assert.AreEqual(Color.blue, t1.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator ACombinatorSurvivesResolution()
        {
            var t1 = Text("#t1");
            var t2 = Text("#t2");

            var ss = InsertStyle(@"#v1 { > text { color: red; } }");
            yield return null;
            Assert.AreEqual(Color.red, t1.ComputedStyle.color);
            Assert.AreNotEqual(Color.red, t2.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator NestingGoesAsDeepAsItLikes()
        {
            var t2 = Text("#t2");

            var ss = InsertStyle(@"#v1 { .v2class { text { color: red; } } }");
            yield return null;
            Assert.AreEqual(Color.red, t2.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator TheParentsOwnDeclarationsStillApply()
        {
            var t1 = Text("#t1");
            var v1 = Q("#v1");

            var ss = InsertStyle(@"#v1 { background-color: red; .t1class { color: blue; } }");
            yield return null;
            Assert.AreEqual(Color.red, v1.ComputedStyle.backgroundColor);
            Assert.AreEqual(Color.blue, t1.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator ANestedRuleComesAfterThePlainOne()
        {
            var t1 = Text("#t1");

            // Equal specificity, so the later of the two wins -- and a nested rule is always later
            // than the declarations it sits among.
            var ss = InsertStyle(@"
                .t1class { color: red; }
                text { &.t1class { color: blue; } }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, t1.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator ASelectorListNestsAcrossEveryBranch()
        {
            var t1 = Text("#t1");
            var t2 = Text("#t2");

            var ss = InsertStyle(@"#v1, #v2 { > text { color: red; } }");
            yield return null;
            Assert.AreEqual(Color.red, t1.ComputedStyle.color);
            Assert.AreEqual(Color.red, t2.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator IsMatchesAnyOfItsArguments()
        {
            var t1 = Text("#t1");
            var t2 = Text("#t2");

            var ss = InsertStyle(@":is(.t1class, .t2class) { color: red; }");
            yield return null;
            Assert.AreEqual(Color.red, t1.ComputedStyle.color);
            Assert.AreEqual(Color.red, t2.ComputedStyle.color);
            RemoveStyle(ss);

            ss = InsertStyle(@":is(#v2) text { color: blue; }");
            yield return null;
            Assert.AreEqual(Color.blue, t2.ComputedStyle.color);
            Assert.AreNotEqual(Color.blue, t1.ComputedStyle.color);
            RemoveStyle(ss);

            // A list on the left of a combinator expands to one selector per branch.
            ss = InsertStyle(@":is(#v1, #v2) > .t2class { color: lime; }");
            yield return null;
            Assert.AreEqual(Color.green, t2.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator AnUnsupportedNestedAtRuleIsIgnoredRatherThanUniversal()
        {
            var t1 = Text("#t1");
            var v1 = Q("#v1");

            // An at-rule that cannot nest here, @container among them, is handed over as a rule with
            // no selector -- which would match every element if it were taken at face value. It is
            // dropped instead, and the declarations around it still apply.
            var ss = InsertStyle(@"
                #v1 { background-color: red; @container (width > 1px) { background-color: lime; } }
            ");
            yield return null;
            Assert.AreEqual(Color.red, v1.ComputedStyle.backgroundColor);
            Assert.AreNotEqual(Color.green, t1.ComputedStyle.backgroundColor);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator AnEscapedClassNameSurvivesResolution()
        {
            var t1 = Text("#t1");

            var ss = InsertStyle(@".hover\:underline { color: red; }");
            yield return null;
            Assert.AreEqual(Color.red, t1.ComputedStyle.color);
            RemoveStyle(ss);

            // The escape has to survive being resolved against the parent, which is what nesting
            // under any Tailwind variant utility depends on.
            ss = InsertStyle(@".hover\:underline { .nothing { color: lime; } #t1& { color: blue; } }");
            yield return null;
            Assert.AreEqual(Color.blue, t1.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator AHexEscapeNamesTheSameClass()
        {
            var t1 = Text("#t1");

            // A class name that starts with a digit can only be written this way.
            var ss = InsertStyle(@".\32 xl\:flex { color: red; }");
            yield return null;
            Assert.AreEqual(Color.red, t1.ComputedStyle.color);
            RemoveStyle(ss);

            ss = InsertStyle(@".\32 xl\:flex { &.t1class { color: blue; } }");
            yield return null;
            Assert.AreEqual(Color.blue, t1.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator ANestedConditionalRuleGatesItsDeclarations()
        {
            var t1 = Text("#t1");

            var ss = InsertStyle(@"#t1 { color: red; @supports (color: blue) { color: blue; } }");
            yield return null;
            Assert.AreEqual(Color.blue, t1.ComputedStyle.color);
            RemoveStyle(ss);

            // A condition that does not hold leaves the surrounding declaration alone.
            ss = InsertStyle(@"#t1 { color: red; @supports (float: left) { color: blue; } }");
            yield return null;
            Assert.AreEqual(Color.red, t1.ComputedStyle.color);
            RemoveStyle(ss);

            ss = InsertStyle(@"#t1 { color: red; @media (min-width: 1px) { color: lime; } }");
            yield return null;
            Assert.AreEqual(Color.green, t1.ComputedStyle.color);
            RemoveStyle(ss);

            // The implicit rule carries the enclosing selector, so it reaches no one else. Tested on
            // a property that does not inherit, or the child would pick it up legitimately.
            ss = InsertStyle(@"#v1 { @supports (color: blue) { background-color: blue; } }");
            yield return null;
            Assert.AreEqual(Color.blue, Q("#v1").ComputedStyle.backgroundColor);
            Assert.AreNotEqual(Color.blue, t1.ComputedStyle.backgroundColor);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator ARuleNestsInsideANestedConditionalRule()
        {
            var t1 = Text("#t1");
            var t2 = Text("#t2");

            var ss = InsertStyle(@"
                #v1 {
                    @supports (color: blue) {
                        color: red;
                        .t2class { color: blue; }
                    }
                }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, t2.ComputedStyle.color);
            Assert.AreNotEqual(Color.blue, t1.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator TheShapeTailwindEmitsForVariantsResolves()
        {
            var t1 = Text("#t1");

            // Tailwind v4's own shape: layered utilities, an escaped class name, the variant as a
            // nested `&` rule, and the refined color behind the `@supports` guard it writes.
            var ss = InsertStyle(@"
                @layer utilities {
                    .\32 xl\:flex { color: red; }
                    .hover\:underline {
                        color: color-mix(in srgb, red 50%, transparent);
                        @supports (color: color-mix(in lab, red, red)) {
                            color: lime;
                        }
                    }
                }
            ");
            yield return null;
            Assert.AreEqual(Color.green, t1.ComputedStyle.color);
            RemoveStyle(ss);
        }
    }
}
