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
        public IEnumerator WhereMatchesAnyOfItsArguments()
        {
            var t1 = Text("#t1");
            var t2 = Text("#t2");

            var ss = InsertStyle(@":where(.t1class, .t2class) { color: red; }");
            yield return null;
            Assert.AreEqual(Color.red, t1.ComputedStyle.color);
            Assert.AreEqual(Color.red, t2.ComputedStyle.color);
            RemoveStyle(ss);

            ss = InsertStyle(@":where(#v2) text { color: blue; }");
            yield return null;
            Assert.AreEqual(Color.blue, t2.ComputedStyle.color);
            Assert.AreNotEqual(Color.blue, t1.ComputedStyle.color);
            RemoveStyle(ss);

            ss = InsertStyle(@":where(#v1, #v2) > .t2class { color: lime; }");
            yield return null;
            Assert.AreEqual(Color.green, t2.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator WhereAddsNoSpecificity()
        {
            var t1 = Text("#t1");

            // The id inside :where() weighs nothing, so one class outranks it -- and the :where()
            // rule is second here, so source order would have gone the other way.
            var ss = InsertStyle(@"
                .t1class { color: blue; }
                :where(#t1) { color: red; }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, t1.ComputedStyle.color);
            RemoveStyle(ss);

            // The same rule with :is() in its place wins, which is the whole difference.
            ss = InsertStyle(@"
                .t1class { color: blue; }
                :is(#t1) { color: red; }
            ");
            yield return null;
            Assert.AreEqual(Color.red, t1.ComputedStyle.color);
            RemoveStyle(ss);

            // Mid-compound, so what is left of the compound is all that counts: the two rules tie
            // and the later one wins.
            ss = InsertStyle(@"
                text:where(#t1) { color: red; }
                text { color: blue; }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, t1.ComputedStyle.color);
            RemoveStyle(ss);

            // An !important declaration is indexed as a leaf of its own hanging off this one, so
            // the discount has to carry over to it.
            ss = InsertStyle(@"
                .t1class { color: blue !important; }
                :where(#t1) { color: red !important; }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, t1.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator WhereDiscountsEverythingInsideIt()
        {
            var t1 = Text("#t1");

            // Every compound of the argument is discounted, not only the one :where() sits in.
            var ss = InsertStyle(@"
                :where(#v1 > .t1class) { color: red; }
                text { color: blue; }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, t1.ComputedStyle.color);
            RemoveStyle(ss);

            // Including an :is() that is expanded after the :where() around it was.
            ss = InsertStyle(@"
                text { color: blue; }
                :where(:is(#t1, #t2)) { color: red; }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, t1.ComputedStyle.color);
            RemoveStyle(ss);

            // A nested rule is resolved to `:is(#v1) :where(.t1class)`, which weighs the same as
            // `#v1` alone -- so the descendant rule above it, with a tag as well, still wins.
            ss = InsertStyle(@"
                #v1 text { color: blue; }
                #v1 { :where(.t1class) { color: red; } }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, t1.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator AnUnsupportedNestedAtRuleIsIgnoredRatherThanUniversal()
        {
            var t1 = Text("#t1");
            var v1 = Q("#v1");

            // An at-rule that cannot nest here, @scope among them, is handed over as a rule with
            // no selector -- which would match every element if it were taken at face value. It is
            // dropped instead, and the declarations around it still apply.
            var ss = InsertStyle(@"
                #v1 { background-color: red; @scope (.x) { background-color: lime; } }
            ");
            yield return null;
            Assert.AreEqual(Color.red, v1.ComputedStyle.backgroundColor);
            Assert.AreNotEqual(Color.green, t1.ComputedStyle.backgroundColor);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator ANestedContainerQueryWithNoContainerMatchesNothing()
        {
            var t1 = Text("#t1");
            var v1 = Q("#v1");

            // No ancestor is a size container, so the block applies to nothing -- and to nothing else either.
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
