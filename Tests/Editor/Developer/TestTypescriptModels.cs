using System.Diagnostics.CodeAnalysis;
#if REACT_UNITY_DEVELOPER
using System.Collections.Generic;
using System.Reflection;
using NUnit.Framework;
using ReactUnity.Editor.Developer;
#endif

namespace ReactUnity.Tests.Editor.Developer
{
    [ExcludeFromCodeCoverage]
    public static class TestTypescriptModels
    {
#if REACT_UNITY_DEVELOPER
        [UnityEditor.MenuItem("React/Developer/Generate NUnit Typescript Models", priority = 0)]
        public static void GenerateEditor()
        {
            var generator = new TypescriptModelsGenerator
            {
                Assemblies = new List<Assembly> { typeof(Assert).Assembly },
                IncludedNamespaces = new List<string> { "NUnit.Framework" },
                ExcludedNamespaces = new List<string> { "System.Configuration", "System.Xml", "System.Net", "System.Web" },
                ImportNamespaces = new Dictionary<string, string> { { "System", "./system" } },
                ExcludedTypes = new List<string> { },
                ExportAsClass = true,
                AllowGeneric = true,
            };

            generator.PickFileAndGenerate();
        }
#endif
    }
}
