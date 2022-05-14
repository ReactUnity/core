using System.Collections.Generic;
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

        public bool Initialized { get; private set; } = false;

        public CodeTransformer(JavascriptEngineType type = JavascriptEngineType.Auto)
        {
            EngineFactory = JavascriptEngineHelpers.GetEngineFactory(type);
            Engine = EngineFactory.Create(null, false, false, (res) => {
                res.Execute(Resources.Load<TextAsset>("ReactUnity/tests/scripts/babel-standalone").text);
                Initialized = true;
            });
        }

        public static IEnumerator<string> TransformCode(string code)
        {
            return Instance.Transform(code);
        }

        private string TransformNow(string code)
        {
            Engine.SetGlobal("_codeToTransform", new { code });
            return Engine.Evaluate("Babel.transform(_codeToTransform.code, { presets: ['es2015', 'react'], parserOpts: { allowReturnOutsideFunction: true } }).code")?.ToString();
        }

        public IEnumerator<string> Transform(string code)
        {
            while (!Initialized) yield return null;
            yield return TransformNow(code);
        }
    }
}
