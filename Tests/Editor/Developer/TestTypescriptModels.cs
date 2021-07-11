using NUnit.Framework;
using ReactUnity.Editor.Developer;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;

namespace ReactUnity.Editor.Tests.Developer
{
    [ExcludeFromCodeCoverage]
    public static class TestTypescriptModels
    {
#if REACT_UNITY_DEVELOPER
        [UnityEditor.MenuItem("React/Developer/Generate NUnit Typescript Models", priority = 0)]
        public static void GenerateEditor()
        {
            TypescriptModelsGenerator.GenerateWith(
                new List<Assembly> {
                    typeof(Assert).Assembly,
                },
                new List<string> { "NUnit.Framework" },
                new List<string> { "System.Configuration", "System.Xml", "System.Net", "System.Web" },
                new Dictionary<string, string> { { "System", "./system" } },
                new List<string> { },
                true,
                true
            );
        }
#endif
    }
}
