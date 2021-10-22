using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class ReactInjectableTestAttribute : BaseReactTestAttribute
    {
        public const string DefaultCode = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                    Hello world
                </view>;
            }

            Renderer.render(<GlobalsProvider children={<App />} />);
";

        protected string OriginalCode;
        protected string Code;
        protected string Style;
        protected bool Html;

        public ReactInjectableTestAttribute(
            string code = DefaultCode, string style = "", string customScene = null,
            bool autoRender = true, bool transform = true, bool skipIfExisting = false, bool realTimer = false, bool html = false
        ) : base(customScene, autoRender, skipIfExisting, realTimer)
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
                    Language = ScriptSourceLanguage.Html,
                    UseDevServer = false,
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

        public override void AfterStart(ScriptContext ctx)
        {
            base.AfterStart(ctx);

            if (!string.IsNullOrWhiteSpace(Style))
                ctx.Context.InsertStyle(Style);
        }
    }
}
