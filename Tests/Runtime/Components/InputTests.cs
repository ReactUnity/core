using System.Collections;
using NUnit.Framework;
using ReactUnity.ScriptEngine;
using ReactUnity.UGUI;
using TMPro;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class InputTests : TestBase
    {
        const string BaseScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <>
                    <input {...globals} />
                </>;
            }

            Renderer.render(<GlobalsProvider children={<App />} />);
        ";

        const string BaseStyle = @"
            scroll {
                height: 200px;
                width: 200px;
            }
        ";

        public InputComponent Input => Q("input") as InputComponent;
        public TMP_InputField Field => Input.InputField;

        public InputTests(JavascriptEngineType engineType) : base(engineType) { }


        [ReactInjectableTest(BaseScript, BaseStyle)]
        public IEnumerator InputPropertiesAreApplied()
        {
            yield return null;

            Globals["readonly"] = true;
            Globals["keyboardType"] = "social";
            Globals["richText"] = true;
            Globals["lineType"] = "multiline-submit";
            Globals["validation"] = "integer";
            yield return null;

            Assert.AreEqual(true, Input.InputField.readOnly);
            Assert.AreEqual(true, Input.InputField.richText);
            Assert.AreEqual(TouchScreenKeyboardType.Social, Input.InputField.keyboardType);
            Assert.AreEqual(TMP_InputField.CharacterValidation.Integer, Input.InputField.characterValidation);
            Assert.AreEqual(TMP_InputField.LineType.MultiLineSubmit, Input.InputField.lineType);
        }
    }
}
