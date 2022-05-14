using UnityEngine;

namespace ReactUnity.Tests.Editor
{
    public class EditorInjectableTestAttribute : BaseEditorTestAttribute
    {
        public const string DefaultCode = @"
            export default function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                    Hello world
                </view>;
            }
";

        public string Code = DefaultCode;
        public string Style;
        public bool Html;
        public bool TransformCode = true;

        protected string TransformedCode;

        public EditorInjectableTestAttribute() : base() { }

        public override ScriptSource GetScript()
        {
            TransformedCode = (!Html && TransformCode) ? CodeTransformer.TransformCode(Code) : Code;

            Debug.Assert(!string.IsNullOrWhiteSpace(TransformedCode), "The code must be non-empty");

            if (Html)
            {
                return new ScriptSource
                {
                    UseDevServer = false,
                    Language = ScriptSourceLanguage.Html,
                    SourceText = TransformedCode,
                    Type = ScriptSourceType.Raw,
                };
            }
            else
            {
                var injectableText = Resources.Load<TextAsset>("ReactUnity/tests/injectable/index");
                var injectedText = injectableText.text.Replace("/*INJECT_CODE*/", TransformedCode);

                return new ScriptSource
                {
                    UseDevServer = false,
                    SourceText = injectedText,
                    Type = ScriptSourceType.Raw,
                };
            }
        }

        public override string GetStyle() => Style;
    }
}
