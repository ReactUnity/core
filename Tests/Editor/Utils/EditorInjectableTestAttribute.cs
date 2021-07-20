using ReactUnity.Tests;
using UnityEngine;

namespace ReactUnity.Editor.Tests
{
    public class EditorInjectableTestAttribute : BaseEditorTestAttribute
    {
        public const string DefaultCode = @"Renderer.render(React.createElement(""view"", null, ""Hello world""))";

        protected string OriginalCode;
        protected string Code;
        protected string Style;

        public EditorInjectableTestAttribute(
            string code = DefaultCode, string style = "", bool autoRender = true,
            bool transform = true, bool skipIfExisting = false, bool realTimer = false
        ) : base(autoRender, skipIfExisting, realTimer)
        {
            OriginalCode = code ?? DefaultCode;
            Code = transform ? CodeTransformer.TransformCode(OriginalCode) : OriginalCode;
            Style = style;
        }

        public override ScriptSource GetScript()
        {
            Debug.Assert(!string.IsNullOrWhiteSpace(Code), "The code must be non-empty");

            var injectableText = Resources.Load<TextAsset>("ReactUnity/tests/injectable/index");
            var injectedText = injectableText.text.Replace("/*INJECT_CODE*/", Code);

            return new ScriptSource
            {
                UseDevServer = false,
                SourceText = injectedText,
                Type = ScriptSourceType.Raw,
            };
        }

        public override string GetStyle() => Style;
    }
}
