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

            Renderer.render(<App />);
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

            Renderer.render(<App />);
        ";

        public ButtonComponent Button => Q("button") as ButtonComponent;
        public AnchorComponent Anchor => Q("anchor") as AnchorComponent;

        public ButtonTests(JavascriptEngineType engineType) : base(engineType, usesInput: true) { }


        [ReactInjectableTest(BaseScript)]
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

        [ReactInjectableTest(BaseScript)]
        public IEnumerator ButtonClickEventWorks()
        {
            var list = new List<string>();
            Globals["list"] = list;
            yield return null;

            Assert.IsEmpty(list);

            Button.Activate();
            list.AssertListExhaustive("click");

            Input.Move(Mouse.position, new Vector2(20, Screen.height - 20));
            Input.Click(Mouse.leftButton);

            yield return null;
            list.AssertListExhaustive("click");
        }

        [ReactInjectableTest(BaseScript)]
        public IEnumerator ButtonShouldBeClickableWithoutBackground()
        {
            Button.Style["background"] = null;

            var list = new List<string>();
            Globals["list"] = list;
            yield return null;
            Assert.IsEmpty(list);

            Input.Move(Mouse.position, new Vector2(20, Screen.height - 20));
            Input.Click(Mouse.leftButton);
            yield return null;
            list.AssertListExhaustive("click");

            Button.Style["background-blend-mode"] = "multiply";
            yield return null;
            Input.Click(Mouse.leftButton);
            yield return null;
            list.AssertListExhaustive("click");

            Button.Style["background-blend-mode"] = "color";
            yield return null;
            Input.Click(Mouse.leftButton);
            yield return null;
            list.AssertListExhaustive("click");
        }


        [ReactInjectableTest(AnchorScript)]
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
