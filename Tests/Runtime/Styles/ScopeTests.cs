using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.Styling;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class ScopeTests : TestBase
    {
        public ScopeTests(JavascriptEngineType engineType) : base(engineType) { }

        const string TargetingScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='root'>
                    <view id='outside' className='q' />
                    <view id='card' className={globals.cardIsCard === false ? 'q' : 'card q'}>
                        <view id='a' className='q' />
                        <view id='content' className={globals.contentIsLimit === false ? 'q' : 'content q'}>
                            <view id='b' className='q' />
                            <view id='inner' className='card q'>
                                <view id='c' className='q' />
                            </view>
                        </view>
                        <view id='wrapper'>
                            <view id='d' className='q' />
                        </view>
                    </view>
                </view>;
            }
        ";

        const string TargetingStyle = @"
            .q { color: black; }
            @scope (.card) to (.content) {
                .q { color: red; }
            }
        ";

        [UGUITest(Script = TargetingScript, Style = TargetingStyle)]
        public IEnumerator RulesReachTheRootAndItsSubtreeUpToALimitAndFollowChanges()
        {
            yield return null;

            Assert.AreEqual(Color.black, Q("#outside").ComputedStyle.color);
            // The scoping root is in scope; the limit and everything under it are not.
            Assert.AreEqual(Color.red, Q("#card").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#a").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#content").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#b").ComputedStyle.color);
            // A card inside the limit opens a scope of its own.
            Assert.AreEqual(Color.red, Q("#inner").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#c").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#d").ComputedStyle.color);

            Globals["contentIsLimit"] = false;
            yield return null;
            Assert.AreEqual(Color.red, Q("#content").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#b").ComputedStyle.color);

            Globals["cardIsCard"] = false;
            yield return null;
            Assert.AreEqual(Color.black, Q("#card").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#a").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#b").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#d").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#inner").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#c").ComputedStyle.color);

            Globals["cardIsCard"] = true;
            yield return null;
            Assert.AreEqual(Color.red, Q("#card").ComputedStyle.color);
            Assert.AreEqual(Color.red, Q("#d").ComputedStyle.color);
        }

        const string SelectorScript = @"
            function App() {
                return <view id='card' className='card'>
                    <view id='a' className='q' />
                    <view id='w'>
                        <view id='b' className='q' />
                    </view>
                </view>;
            }
        ";

        const string SelectorStyle = @"
            .q { color: black; }
            :scope { opacity: 0.75; }

            @scope (.card) {
                :scope { color: red; }
                & { opacity: 0.5; }
                > .q { color: blue; }
                :scope > .q { background-color: magenta; }
                :root #b { color: cyan; }
                .q { &:first-child { opacity: 0.25; } }
            }
        ";

        [UGUITest(Script = SelectorScript, Style = SelectorStyle)]
        public IEnumerator ScopeAndTheNestingSelectorAreTheRootAndTheRestOfASelectorIsUnrestricted()
        {
            yield return null;

            var card = Q("#card");
            Assert.AreEqual(Color.red, card.ComputedStyle.color);
            Assert.AreEqual(0.5f, card.ComputedStyle.opacity);

            // A relative selector is relative to the root, so `> .q` stops at its children.
            Assert.AreEqual(Color.blue, Q("#a").ComputedStyle.color);
            Assert.AreEqual(0.25f, Q("#a").ComputedStyle.opacity);
            // Spelling the root out reaches the same set, which is the form Sass and CSS minifiers
            // accept -- a selector may not start with a combinator anywhere else, and both refuse
            // it here rather than special-casing @scope.
            Assert.AreEqual(Color.magenta, Q("#a").ComputedStyle.backgroundColor);
            Assert.AreNotEqual(Color.magenta, Q("#b").ComputedStyle.backgroundColor);
            // Only the subject has to be in scope; :root is above it.
            Assert.AreEqual(Color.cyan, Q("#b").ComputedStyle.color);

            // Outside any @scope, and with no scope element, :scope is the root element.
            Assert.AreEqual(0.75f, Host.ComputedStyle.opacity);
        }

        const string CascadeScript = @"
            function App() {
                return <>
                    <view id='light' className='light'>
                        <view id='dark' className='dark'>
                            <view id='a' className='q' />
                            <view id='light2' className='light'>
                                <view id='b' className='q' />
                            </view>
                        </view>
                        <view id='c' className='q' />
                    </view>
                    <view id='e' className='q' />
                </>;
            }
        ";

        const string CascadeStyle = @"
            @scope (.dark) { .q { color: red; opacity: 0.25; } }
            @scope (.light) { .q { color: white; } .q.q { opacity: 0.5; } }
            @scope (.light) { #c { color: cyan !important; } }
            #c { color: blue !important; }
            .q { color: black; opacity: 1; }
        ";

        [UGUITest(Script = CascadeScript, Style = CascadeStyle)]
        public IEnumerator TheNearerRootWinsAfterSpecificityAndBeforeSourceOrder()
        {
            yield return null;

            // Both scopes hold for #a; the dark root is one hop up and the light root two, so the
            // earlier rule wins. For #b the light root is the nearer one.
            Assert.AreEqual(Color.red, Q("#a").ComputedStyle.color);
            Assert.AreEqual(Color.white, Q("#b").ComputedStyle.color);

            // Specificity is settled before proximity: the farther root's two-class rule wins.
            Assert.AreEqual(0.5f, Q("#a").ComputedStyle.opacity);

            // A scoped rule beats an unscoped one of equal specificity, wherever it is in the sheet, and
            // so does an important one.
            Assert.AreEqual(Color.cyan, Q("#c").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#e").ComputedStyle.color);
            Assert.AreEqual(1f, Q("#e").ComputedStyle.opacity);
        }

        const string NestingScript = @"
            function App() {
                return <>
                    <view id='a' className='a'>
                        <view id='b' className='b'>
                            <view id='x' className='q' />
                            <view id='c' className='c'>
                                <view id='y' className='q' />
                            </view>
                        </view>
                    </view>
                    <view id='b2' className='b'>
                        <view id='z' className='q' />
                    </view>
                </>;
            }
        ";

        const string NestingStyle = @"
            .q { color: black; opacity: 1; }

            .a {
                @scope (.b) to (.c) {
                    .q { color: red; }
                    color: blue;
                }
                @media (min-width: 1px) {
                    @scope (& > .b) { .q { opacity: 0.75; } }
                }
            }

            @scope (.a) { @scope (.b) { #x { opacity: 0.5; } } }
            @scope (.c) { @scope (.b) { #y { opacity: 0.25; } } }
        ";

        [UGUITest(Script = NestingScript, Style = NestingStyle)]
        public IEnumerator ScopesNestInStyleRulesConditionsAndEachOther()
        {
            yield return null;

            // The start selector nests in the enclosing rule: only a .b inside .a is a root.
            Assert.AreEqual(Color.red, Q("#x").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#y").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#z").ComputedStyle.color);

            // Declarations directly in the block style the root, at zero specificity.
            Assert.AreEqual(Color.blue, Q("#b").ComputedStyle.color);
            Assert.AreNotEqual(Color.blue, Q("#b2").ComputedStyle.color);

            // Inside a condition, and with the nesting selector in the start.
            Assert.AreEqual(0.75f, Q("#y").ComputedStyle.opacity);
            Assert.AreEqual(1f, Q("#z").ComputedStyle.opacity);

            // An inner scope's root has to be in the outer scope.
            Assert.AreEqual(0.5f, Q("#x").ComputedStyle.opacity);

            // A prelude-less @scope is rooted at the sheet's scope element.
            var sheet = new StyleSheet(Context.Style, "@scope { .q { color: cyan; } }", 0, Q("#b"));
            Context.InsertStyle(sheet);
            yield return null;
            Assert.AreEqual(Color.cyan, Q("#x").ComputedStyle.color);
            Assert.AreEqual(Color.cyan, Q("#y").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#z").ComputedStyle.color);

            Context.RemoveStyle(sheet);
            yield return null;
            Assert.AreEqual(Color.red, Q("#x").ComputedStyle.color);

            // Without one, the root element is. #x keeps the nearer root's color; #y is inside the limit.
            var rooted = InsertStyle("@scope to (.c) { .q { color: cyan; } }");
            yield return null;
            Assert.AreEqual(Color.red, Q("#x").ComputedStyle.color);
            Assert.AreEqual(Color.black, Q("#y").ComputedStyle.color);
            Assert.AreEqual(Color.cyan, Q("#z").ComputedStyle.color);
            Context.RemoveStyle(rooted);
        }
    }
}
