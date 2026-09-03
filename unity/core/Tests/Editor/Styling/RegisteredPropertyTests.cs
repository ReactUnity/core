using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UIToolkit;
using UnityEngine;
using UnityEngine.UIElements;

namespace ReactUnity.Tests.Editor.Renderer
{
    public class RegisteredPropertyTests : EditorTestBase
    {
        const string BaseScript = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <>
<view id='v1'>
    <text id='t1'>t1content</text>
</view>
                </>;
            }
        ";

        public RegisteredPropertyTests(JavascriptEngineType engineType) : base(engineType) { }

        public IUIToolkitComponent<TextElement> Text(string selector) => Q(selector) as IUIToolkitComponent<TextElement>;

        private float TranslateX() => Text("#t1").ComputedStyle.translate.X.Value;

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator AnInitialValueStandsInWhereThePropertyIsNotDeclared()
        {
            var text = Text("#t1");

            var ss = InsertStyle(@"
                @property --x { syntax: ""*""; inherits: false; initial-value: 8px; }
                #t1 { --y: 4px; translate: var(--x) var(--y); }
            ");
            yield return null;
            Assert.AreEqual(8f, text.ComputedStyle.translate.X.Value);
            Assert.AreEqual(4f, text.ComputedStyle.translate.Y.Value);
            RemoveStyle(ss);

            // Without the registration the variable is the guaranteed-invalid value, which takes the
            // whole declaration with it -- the state every Tailwind utility built this way was in.
            ss = InsertStyle(@"#t1 { --y: 4px; translate: var(--x) var(--y); }");
            yield return null;
            Assert.AreEqual(0f, text.ComputedStyle.translate.X.Value);
            Assert.AreEqual(0f, text.ComputedStyle.translate.Y.Value);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator TheShadowPatternFromTailwindWorks()
        {
            var text = Text("#t1");

            // `shadow-md` sets one of these and leaves the rest to their initial values, so a list
            // of five reads as one shadow plus four transparent ones rather than as nothing.
            var ss = InsertStyle(@"
                @property --tw-shadow { syntax: ""*""; inherits: false; initial-value: 0 0 #0000; }
                @property --tw-ring-shadow { syntax: ""*""; inherits: false; initial-value: 0 0 #0000; }
                #t1 {
                    --tw-shadow: 0 4px 6px #000;
                    box-shadow: var(--tw-ring-shadow), var(--tw-shadow);
                }
            ");
            yield return null;
            Assert.AreEqual(2, text.ComputedStyle.boxShadow.Count);
            RemoveStyle(ss);

            ss = InsertStyle(@"#t1 { --tw-shadow: 0 4px 6px #000; box-shadow: var(--tw-ring-shadow), var(--tw-shadow); }");
            yield return null;
            Assert.AreEqual(0, text.ComputedStyle.boxShadow.Count);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator AnInitialValueComesAheadOfTheVarFallback()
        {
            var text = Text("#t1");

            var ss = InsertStyle(@"
                @property --c { syntax: ""<color>""; inherits: true; initial-value: blue; }
                #t1 { color: var(--c, red); }
            ");
            yield return null;
            Assert.AreEqual(Color.blue, text.ComputedStyle.color);
            RemoveStyle(ss);

            // Registered without one, so the property has no initial value at all and the fallback
            // applies -- which is how Tailwind reads `var(--tw-shadow-color, …)`.
            ss = InsertStyle(@"
                @property --c { syntax: ""*""; inherits: true; }
                #t1 { color: var(--c, red); }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator ANonInheritingPropertyIsNotInherited()
        {
            var text = Text("#t1");

            // A variable is inherited otherwise, so `inherits: false` is the registration deciding
            // that the parent's value is not this element's: it gets the initial value instead.
            var ss = InsertStyle(@"
                @property --x { syntax: ""*""; inherits: false; initial-value: 8px; }
                #v1 { --x: 2px; }
                #t1 { translate: var(--x) 0; }
            ");
            yield return null;
            Assert.AreEqual(8f, text.ComputedStyle.translate.X.Value);
            RemoveStyle(ss);

            ss = InsertStyle(@"
                @property --x { syntax: ""*""; inherits: true; initial-value: 8px; }
                #v1 { --x: 2px; }
                #t1 { translate: var(--x) 0; }
            ");
            yield return null;
            Assert.AreEqual(2f, text.ComputedStyle.translate.X.Value);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator AnInvalidRuleLeavesTheRestOfTheSheetAlone()
        {
            var text = Text("#t1");

            // No initial value for a syntax that is not the universal one, so the rule is dropped.
            var ss = InsertStyle(@"
                @property --x { syntax: ""<length>""; inherits: false; }
                #t1 { color: red; translate: var(--x) 0; }
            ");
            yield return null;
            Assert.AreEqual(Color.red, text.ComputedStyle.color);
            Assert.AreEqual(0f, text.ComputedStyle.translate.X.Value);
            RemoveStyle(ss);
        }

        [EditorInjectableTest(Script = BaseScript, SkipIfExisting = true)]
        public IEnumerator ARegistrationReachesAndLeavesWithItsStylesheet()
        {
            var text = Text("#t1");

            // The registration belongs to the context, so one sheet can register what another reads.
            var registration = InsertStyle(@"@property --x { syntax: ""*""; inherits: false; initial-value: 8px; }");
            var user = InsertStyle(@"#t1 { translate: var(--x) 0; }");
            yield return null;
            Assert.AreEqual(8f, text.ComputedStyle.translate.X.Value);

            RemoveStyle(registration);
            yield return null;
            Assert.AreEqual(0f, text.ComputedStyle.translate.X.Value);
            RemoveStyle(user);
        }
    }
}
