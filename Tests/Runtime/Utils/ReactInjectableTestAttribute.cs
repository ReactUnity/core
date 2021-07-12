using ReactUnity.Helpers;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class ReactInjectableTestAttribute : BaseReactTestAttribute
    {
        public const string DefaultCode = @"Renderer.render(React.createElement(""view"", null, ""Hello world""))";

        protected string OriginalCode;
        protected string Code;
        protected string Style;

        public ReactInjectableTestAttribute(string code = DefaultCode, string style = "", string customScene = null, bool autoRender = true, bool transform = true) : base(customScene, autoRender)
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

        public override void AfterStart(ReactUnityRunner runner)
        {
            base.AfterStart(runner);

            if (!string.IsNullOrWhiteSpace(Style))
                runner.context.InsertStyle(Style);
        }
    }
}
