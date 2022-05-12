using ReactUnity.Scripting;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class CodeTransformer
    {
        private static CodeTransformer instance;
        public static CodeTransformer Instance => instance = instance ?? new CodeTransformer();

        public IJavaScriptEngine Engine;
        private IJavaScriptEngineFactory EngineFactory;

        public CodeTransformer(JavascriptEngineType type = JavascriptEngineType.Auto)
        {
            EngineFactory = JavascriptEngineHelpers.GetEngineFactory(type);
            Engine = EngineFactory.Create(null, false, false, (res) => { });
            Engine.Execute(Resources.Load<TextAsset>("ReactUnity/tests/scripts/babel-standalone").text);
        }

        public static string TransformCode(string code)
        {
            return Instance.Transform(code);
        }

        public string Transform(string code)
        {
            Engine.SetValue("_codeToTransform", new { code });
            return Engine.Evaluate("Babel.transform(_codeToTransform.code, { presets: ['es2015', 'react'], parserOpts: { allowReturnOutsideFunction: true } }).code")?.ToString();
        }
    }
}
