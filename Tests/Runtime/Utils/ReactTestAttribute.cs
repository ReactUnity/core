using System.IO;
using UnityEngine;

namespace ReactUnity.Tests
{
    public class ReactTestAttribute : BaseReactTestAttribute
    {
        protected string Script;

        public ReactTestAttribute(string script, string customScene = null) : base(customScene)
        {
            Script = script;
        }

        public override ScriptSource GetScript()
        {
            Debug.Assert(Script.EndsWith(".js"), "The script file must be an absolue path ending with .js");

            return new ScriptSource
            {
                UseDevServer = false,
                SourcePath = Path.Combine(Application.dataPath, "..", Script),
                Type = ScriptSourceType.File,
            };
        }
    }
}
