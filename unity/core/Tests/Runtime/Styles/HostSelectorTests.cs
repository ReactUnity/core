using System.Collections;
using NUnit.Framework;
using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class HostSelectorTests : TestBase
    {
        public HostSelectorTests(JavascriptEngineType engineType) : base(engineType) { }

        const string BaseScript = @"
            function App() {
                return <view id='child' />;
            }
        ";

        [UGUITest(Script = BaseScript, Style = @"
            :host { background-color: red; }
        ")]
        public IEnumerator HostSelectsTheRootElement()
        {
            yield return null;

            Assert.AreEqual(Color.red, Host.ComputedStyle.backgroundColor);
            Assert.AreEqual(Color.clear, Q("#child").ComputedStyle.backgroundColor);
        }

        // How Tailwind opens its theme block. One branch the parser could not read used to cost the
        // whole list, so the variables in it reached nothing -- :root included.
        [UGUITest(Script = BaseScript, Style = @"
            :root, :host { --bg: red; }
            #child { background-color: var(--bg); }
        ")]
        public IEnumerator HostIsReadAlongsideRootInOneList()
        {
            yield return null;

            Assert.AreEqual(Color.red, Q("#child").ComputedStyle.backgroundColor);
        }

        [UGUITest(Script = BaseScript, Style = @"
            :host(.dark) { background-color: red; }
        ")]
        public IEnumerator HostWithAnArgumentMatchesOnlyWhenTheArgumentDoes()
        {
            yield return null;
            Assert.AreEqual(Color.clear, Host.ComputedStyle.backgroundColor);

            Host.ClassList.Add("dark");
            yield return null;
            Assert.AreEqual(Color.red, Host.ComputedStyle.backgroundColor);

            Host.ClassList.Remove("dark");
            yield return null;
            Assert.AreEqual(Color.clear, Host.ComputedStyle.backgroundColor);
        }

        // The argument weighs what it would on its own, so this wins over the bare :host below it.
        [UGUITest(Script = BaseScript, Style = @"
            :host(.dark) { background-color: lime; }
            :host { background-color: red; }
        ")]
        public IEnumerator HostCountsItsArgumentTowardsSpecificity()
        {
            yield return null;
            Assert.AreEqual(Color.red, Host.ComputedStyle.backgroundColor);

            Host.ClassList.Add("dark");
            yield return null;
            Assert.AreEqual(Color.green, Host.ComputedStyle.backgroundColor);
        }

        // The argument is one condition, not one per simple selector in it: negated, an element with
        // only .a still is not :host(.a.b).
        [UGUITest(Script = BaseScript, Style = @"
            :root:not(:host(.a.b)) { background-color: red; }
        ")]
        public IEnumerator HostIsNegatedAsAWhole()
        {
            yield return null;
            Assert.AreEqual(Color.red, Host.ComputedStyle.backgroundColor);

            Host.ClassList.Add("a");
            yield return null;
            Assert.AreEqual(Color.red, Host.ComputedStyle.backgroundColor);

            Host.ClassList.Add("b");
            yield return null;
            Assert.AreEqual(Color.clear, Host.ComputedStyle.backgroundColor);
        }

        [UGUITest(Script = BaseScript, Style = @"
            :host([data-theme=""dark""]) { background-color: red; }
        ")]
        public IEnumerator HostTakesAnyCompoundAsItsArgument()
        {
            yield return null;
            Assert.AreEqual(Color.clear, Host.ComputedStyle.backgroundColor);

            Host.SetData("theme", "dark");
            yield return null;
            Assert.AreEqual(Color.red, Host.ComputedStyle.backgroundColor);
        }

        // A child arriving marks its new parent and that parent's children. The host is a parent like
        // any other, so a top-level child arriving has to restyle the top-level children beside it.
        [UGUITest(Script = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    {globals.extra ? <view id='extra' /> : null}
                    <view id='a' />
                </>;
            }
        ", Style = @"
            view:first-child { background-color: red; }
        ")]
        public IEnumerator TopLevelChildrenRestyleWhenOneArrives()
        {
            yield return null;
            Assert.AreEqual(Color.red, Q("#a").ComputedStyle.backgroundColor);

            Globals["extra"] = true;
            yield return null;
            Assert.AreEqual(Color.red, Q("#extra").ComputedStyle.backgroundColor);
            Assert.AreEqual(Color.clear, Q("#a").ComputedStyle.backgroundColor);

            Globals["extra"] = false;
            yield return null;
            Assert.AreEqual(Color.red, Q("#a").ComputedStyle.backgroundColor);
        }
    }
}
