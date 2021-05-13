using ReactUnity.Helpers;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class ReactInjectableTestAttribute : BaseReactTestAttribute
    {
        public const string DefaultCode = @"Renderer.render(React.createElement(""view"", null, ""Hello world""))";

        protected string Code;
        protected string Style;

        public ReactInjectableTestAttribute(string code = DefaultCode, string style = "", string customScene = null) : base(customScene)
        {
            Code = code ?? DefaultCode;
            Style = style;
        }

        public override ReactScript GetScript()
        {
            Debug.Assert(!string.IsNullOrWhiteSpace(Code), "The code must be non-empty");

            return new ReactScript
            {
                UseDevServer = false,
                SourceText = ResourcesHelper.InjectCode(Code),
                ScriptSource = ScriptSource.Text,
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
