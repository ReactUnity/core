using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using UnityEngine;
using UnityEngine.InputSystem;

namespace ReactUnity.Tests
{
    public class ButtonTests : TestBase
    {
        const string BaseScript = @"
            function addEvent(eventName) {
                Globals.list?.Add(eventName);
            }

            function App() {
                const { list, ...globals } = ReactUnity.useGlobals();
                return <>
                    <button {...globals}
                        onClick={() => addEvent('click')}
                    >
                        Button text content
                    </button>
                </>;
            }
        ";

        const string AnchorScript = @"
            function addEvent(eventName) {
                Globals.list?.Add(eventName);
            }

            function App() {
                const { list, ...globals } = ReactUnity.useGlobals();
                return <>
                    <anchor {...globals}
                        onClick={() => addEvent('click')}
                    >
                        Anchor text content
                    </anchor>
                </>;
            }
        ";

        public ButtonComponent Button => Q("button") as ButtonComponent;
        public AnchorComponent Anchor => Q("anchor") as AnchorComponent;

        public ButtonTests(JavascriptEngineType engineType) : base(engineType) { }


        [UGUITest(Script = BaseScript)]
        public IEnumerator ButtonCanBeDisabled()
        {
            Globals["disabled"] = true;
            yield return null;

            Assert.IsTrue(Button.Disabled);
            Assert.IsFalse(Button.Button.interactable);

            Globals["disabled"] = null;
            yield return null;

            Assert.IsFalse(Button.Disabled);
            Assert.IsTrue(Button.Button.interactable);
        }

        [UGUITest(Script = AnchorScript)]
        public IEnumerator AnchorPropertiesCanBeSet()
        {
            Globals["disabled"] = true;
            Globals["openInThisTab"] = true;
            Globals["url"] = "https://github.com/ReactUnity/core";
            yield return null;

            Assert.IsTrue(Anchor.Disabled);
            Assert.IsTrue(Anchor.OpenInThisTab);
            Assert.AreEqual("https://github.com/ReactUnity/core", Anchor.Url);

            Globals["disabled"] = null;
            yield return null;

            Assert.IsFalse(Anchor.Disabled);

            Anchor.Disabled = true;
            Assert.IsTrue(Anchor.Disabled);
        }

    }
}
