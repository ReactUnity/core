using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using ReactUnity.Scripting;
using ReactUnity.UGUI;
using TMPro;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class InputTests : TestBase
    {
        const string BaseScript = @"
            function addEvent(eventName) {
                Globals.list?.Add(eventName);
            }

            function App() {
                const { list, ...globals } = ReactUnity.useGlobals();
                return <>
                    <input {...globals}
                        onEndEdit={() => addEvent('endEdit')}
                        onReturn={() => addEvent('return')}
                        onChange={() => addEvent('change')}
                        onTextSelection={() => addEvent('textSelection')}
                        onEndTextSelection={() => addEvent('endTextSelection')}
                    />
                </>;
            }
        ";

        public InputComponent InputEl => Q("input") as InputComponent;
        public TMP_InputField Field => InputEl.InputField;

        public InputTests(JavascriptEngineType engineType) : base(engineType) { }


        [ReactInjectableTest(BaseScript)]
        public IEnumerator InputPropertiesAreApplied()
        {
            yield return null;

            Globals["readonly"] = true;
            Globals["keyboardType"] = "social";
            Globals["richText"] = true;
            Globals["lineType"] = "multiline-submit";
            Globals["validation"] = "integer";
            Globals["placeholder"] = "some placeholder";
            Globals["value"] = "some value";
            Globals["disabled"] = true;
            Globals["characterLimit"] = 50;
            Globals["lineLimit"] = 5;
            Globals["contentType"] = TMP_InputField.ContentType.Custom;
            yield return null;

            Assert.AreEqual(true, InputEl.InputField.readOnly);
            Assert.AreEqual(true, InputEl.InputField.richText);
            Assert.AreEqual(TouchScreenKeyboardType.Social, InputEl.InputField.keyboardType);
            Assert.AreEqual(TMP_InputField.CharacterValidation.Integer, InputEl.InputField.characterValidation);
            Assert.AreEqual(TMP_InputField.LineType.MultiLineSubmit, InputEl.InputField.lineType);
            Assert.AreEqual(true, InputEl.Disabled);
            Assert.AreEqual("some value", InputEl.InputField.text);
            Assert.AreEqual("some placeholder", InputEl.Placeholder);
            Assert.AreEqual(50, InputEl.InputField.characterLimit);
            Assert.AreEqual(5, InputEl.InputField.lineLimit);
            Assert.AreEqual(TMP_InputField.ContentType.Custom, InputEl.InputField.contentType);


            InputEl.ReadOnly = false;
            InputEl.Placeholder = "a";
            InputEl.Value = "hey";
            InputEl.Disabled = false;

            Assert.AreEqual(false, InputEl.InputField.readOnly);
            Assert.AreEqual(false, InputEl.Disabled);
            Assert.AreEqual("hey", InputEl.InputField.text);
            Assert.AreEqual("a", InputEl.Placeholder);
            Assert.AreEqual(false, InputEl.PlaceholderShown);

            InputEl.Value = "";
            Assert.AreEqual(true, InputEl.PlaceholderShown);
        }


        [ReactInjectableTest(BaseScript)]
        public IEnumerator InputEventsWork()
        {
            var list = new List<string>();
            Globals["list"] = list;
            yield return null;

            Assert.IsEmpty(list);

            InputEl.Value = "foo";
            InputEl.Activate();
            yield return null;
            list.AssertListExhaustive("textSelection");

            // TODO: Input field ignores new Input System for now
            // var input = SetupInput();
            // var keyboard = InputSystem.AddDevice<Keyboard>();

            // var inputModule = GameObject.FindObjectOfType<InputSystemUIInputModule>();
            // input.Trigger(inputModule.actionsAsset.FindAction("UI/Submit", true));
            // yield return null;
            // list.AssertListExhaustive("return");
        }



        [ReactInjectableTest(BaseScript)]
        public IEnumerator PlaceholderWorks()
        {
            yield return null;
            var placeholder = InputEl.PlaceholderComponent;
            Assert.IsEmpty(placeholder.TextContent);

            InputEl.SetProperty("placeholder", "test_ph");
            Assert.AreEqual("test_ph", placeholder.TextContent);

            InsertStyle("input::placeholder { color: red; content: 'ph_test'; }");
            yield return null;

            Assert.AreEqual("ph_test", placeholder.TextContent);
            Assert.AreEqual(Color.red, placeholder.Text.color);
        }
    }
}
