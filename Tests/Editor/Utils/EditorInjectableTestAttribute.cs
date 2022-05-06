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

        protected string OriginalCode;
        protected string Code;
        protected string Style;
        protected bool Html;

        public EditorInjectableTestAttribute(
            string code = DefaultCode, string style = "", bool autoRender = true,
            bool transform = true, bool skipIfExisting = false, bool realTimer = false, bool html = false
        ) : base(autoRender, skipIfExisting, realTimer)
        {
            OriginalCode = code ?? DefaultCode;
            Html = html;
            Code = (!html && transform) ? CodeTransformer.TransformCode(OriginalCode) : OriginalCode;
            Style = style;
        }

        public override ScriptSource GetScript()
        {
            Debug.Assert(!string.IsNullOrWhiteSpace(Code), "The code must be non-empty");

            if (Html)
            {
                return new ScriptSource
                {
                    UseDevServer = false,
                    Language = ScriptSourceLanguage.Html,
                    SourceText = Code,
                    Type = ScriptSourceType.Raw,
                };
            }
            else
            {
                var injectableText = Resources.Load<TextAsset>("ReactUnity/tests/injectable/index");
                var injectedText = injectableText.text.Replace("/*INJECT_CODE*/", Code);

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
