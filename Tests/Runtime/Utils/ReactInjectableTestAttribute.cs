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

        public ReactInjectableTestAttribute(
            string code = DefaultCode, string style = "", string customScene = null,
            bool autoRender = true, bool transform = true, bool skipIfExisting = false, bool realTimer = false
        ) : base(customScene, autoRender, skipIfExisting, realTimer)
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

        public override void AfterStart(ScriptContext ctx)
        {
            base.AfterStart(ctx);

            if (!string.IsNullOrWhiteSpace(Style))
                ctx.Context.InsertStyle(Style);
        }
    }
}
