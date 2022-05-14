using System.Collections.Generic;
using ReactUnity.Scripting;

namespace ReactUnity.Tests
{
    public class ReactInjectableTestAttribute : BaseReactTestAttribute
    {
        public const string DefaultScript = @"
            function App() {
                const globals = ReactUnity.useGlobals();
                return <view id='test'>
                    Hello world
                </view>;
            }
";

        public string Script = DefaultScript;
        public string Style;
        public bool Html;
        public bool TransformCode = true;

        public ReactInjectableTestAttribute() : base() { }

        public override IEnumerator<ScriptSource> GetScript() => TestHelpers.GetScriptSource(Script, Html, TransformCode);

        public override void AfterStart(ScriptContext ctx)
        {
            base.AfterStart(ctx);

            if (!string.IsNullOrWhiteSpace(Style))
                ctx.Context.InsertStyle(Style);
        }
    }
}
