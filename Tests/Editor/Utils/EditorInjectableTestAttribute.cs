using System.Collections.Generic;
using ReactUnity.Scripting;

namespace ReactUnity.Tests.Editor
{
    public class EditorInjectableTestAttribute : BaseEditorTestAttribute
    {
        public const string DefaultScript = @"
            export default function App() {
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

        protected string TransformedCode;

        public EditorInjectableTestAttribute() : base() { }

        public override IEnumerator<ScriptSource> GetScript() => TestHelpers.GetScriptSource(Script, Html, TransformCode);

        public override void BeforeStart(ScriptContext ctx)
        {
            base.BeforeStart(ctx);
            if (!Html) ctx.ExecuteScript(TestHelpers.InjectableBundle, "ReactUnity/tests/injectable");
        }

        public override string GetStyle() => Style;
    }
}
