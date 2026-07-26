using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using ReactUnity.Helpers;
using UnityEditor;
#if REACT_UNITY_DEVELOPER
using System.IO;
using System.Reflection;
#endif

namespace ReactUnity.Editor.Developer
{
    [ExcludeFromCodeCoverage]
    public static class TypescriptModelsGeneratorPresets
    {
#if REACT_UNITY_DEVELOPER
        [MenuItem("React/Typescript Generator/Generate All", priority = 0)]
        public static string GenerateAll() => GenerateAll(null);
        public static string GenerateAll(string directory = null)
        {
            if (string.IsNullOrWhiteSpace(directory))
            {
                directory = EditorUtility.OpenFolderPanel("Directory to save all files", "", "");
                if (string.IsNullOrWhiteSpace(directory)) return directory;
            }

            GenerateUnity(Path.Combine(directory, "unity.ts"));
            GenerateEditor(Path.Combine(directory, "editor.ts"));
            GenerateReactUnity(Path.Combine(directory, "react.ts"));
            GenerateYoga(Path.Combine(directory, "yoga.ts"));
            GenerateSystem(Path.Combine(directory, "system.ts"));
            GenerateNUnit(Path.Combine(directory, "tests.ts"));

            return directory;
        }

        [MenuItem("React/Typescript Generator/Generate Unity", priority = 0)]
        public static string GenerateUnity() => GenerateUnity(null);
        public static string GenerateUnity(string filePath = null)
        {
            var assemblies = new List<Assembly> {
                    typeof(UnityEngine.GameObject).Assembly,
                    typeof(UnityEngine.Video.VideoPlayer).Assembly,
                    typeof(UnityEngine.AudioSource).Assembly,
                    typeof(UnityEngine.CanvasGroup).Assembly,
                    typeof(UnityEngine.UI.Selectable).Assembly,
                    typeof(UnityEngine.UIVertex).Assembly,
                    typeof(UnityEngine.Animator).Assembly,
                    typeof(UnityEngine.Event).Assembly,
                    typeof(UnityEngine.BuildCompression).Assembly,
                    typeof(UnityEngine.Analytics.Analytics).Assembly,
                    typeof(UnityEngine.Analytics.AnalyticsResult).Assembly,
                    typeof(UnityEngine.UIElements.VisualElement).Assembly,
                    typeof(UnityEngine.ParticleSystem).Assembly,
                    typeof(UnityEngine.Networking.DownloadHandler).Assembly,
#if UNITY_2023_2_OR_NEWER
                    typeof(Unity.Properties.TypeTraits).Assembly,
#endif
#if UNITY_2022_1_OR_NEWER
                    typeof(UnityEngine.UIElements.LineJoin).Assembly,
#endif
                    typeof(UnityEngine.AI.NavMesh).Assembly,
                    typeof(UnityEngine.TestTools.LogAssert).Assembly,
#if UNITY_2021_2_OR_NEWER
                    typeof(UnityEngine.TextCore.Glyph).Assembly,
                    typeof(UnityEngine.TextCore.Text.FontAsset).Assembly,
                    typeof(UnityEngine.XR.InputTrackingState).Assembly,
                    typeof(UnityEngine.MeshCollider).Assembly,
#endif
#if ENABLE_LEGACY_INPUT_MANAGER || (ENABLE_INPUT_SYSTEM && REACT_INPUT_SYSTEM)
                    typeof(UnityEngine.Input).Assembly,
#endif
#if ENABLE_INPUT_SYSTEM && REACT_INPUT_SYSTEM
                    typeof(UnityEngine.EventSystems.BaseInput).Assembly,
                    typeof(UnityEngine.InputSystem.InputSystem).Assembly,
                    typeof(UnityEngine.InputSystem.UI.ExtendedPointerEventData).Assembly,
#endif
#if REACT_VECTOR_GRAPHICS && REACT_ENABLE_ADVANCED_TYPES
                    typeof(Unity.VectorGraphics.VectorUtils).Assembly,
#endif
                };

            var generator = new TypescriptModelsGenerator
            {
                Assemblies = assemblies,
                IncludedNamespaces = new List<string> { "Unity", "UnityEngine" },
                ExcludedNamespaces = new List<string> { "UnityEngine.InputSystem", "UnityEngine.InputSystem.LowLevel" },
                ImportNamespaces = new Dictionary<string, string> { { "System", "./system" } },
                ExcludedTypes = new List<string> { },
                ExportAsClass = true,
                AllowGeneric = true,
                Members = TypescriptModelsGenerator.MemberFlags.All,
                AllowPointer = false
            };

            return PickFileAndGenerate(generator, filePath);
        }

        [MenuItem("React/Typescript Generator/Generate Editor", priority = 0)]
        public static string GenerateEditor() => GenerateEditor(null);
        public static string GenerateEditor(string filePath = null)
        {
            var generator = new TypescriptModelsGenerator
            {
                Assemblies = new List<Assembly> {
                    typeof(UnityEditor.EditorWindow).Assembly,
                },
                IncludedNamespaces = new List<string> { "UnityEditor" },
                ExcludedNamespaces = new List<string> { "UnityEngine.InputSystem", "UnityEngine.InputSystem.LowLevel", "UnityEngine.Experimental", "UnityEngine.TerrainTools", "UnityEditor.TerrainTools", "UnityEngine.TextCore" },
                ImportNamespaces = new Dictionary<string, string> { { "UnityEngine", "./unity" }, { "Unity", "./unity" }, { "System", "./system" } },
                ExcludedTypes = new List<string> { "UnityEngine.ConfigurableJointMotion", "UnityEngine.RaycastHit", "UnityEngine.Terrain", "UnityEngine.TerrainLayer", "UnityEngine.AssetBundleManifest" },
                ExportAsClass = true,
                AllowGeneric = true,
                Members = TypescriptModelsGenerator.MemberFlags.All,
                AllowPointer = false
            };

            return PickFileAndGenerate(generator, filePath);
        }

        [MenuItem("React/Typescript Generator/Generate React Unity", priority = 0)]
        public static string GenerateReactUnity() => GenerateReactUnity(null);
        public static string GenerateReactUnity(string filePath = null)
        {
            var generator = new TypescriptModelsGenerator
            {
                Assemblies = new List<Assembly> { typeof(ReactContext).Assembly, typeof(TypescriptModelsGenerator).Assembly, typeof(ReactUnity.UGUI.UGUIContext).Assembly, typeof(ReactUnity.UIToolkit.UIToolkitContext).Assembly, },
                IncludedNamespaces = new List<string> { "ReactUnity" },
                ExcludedNamespaces = new List<string> { "UnityEngine.InputSystem", "UnityEngine.InputSystem.LowLevel", "Unity.VectorGraphics" },
                ImportNamespaces = new Dictionary<string, string> { { "UnityEngine", "./unity" }, { "Unity", "./unity" }, { "Yoga", "./yoga" }, { "System", "./system" } },
                ExcludedTypes = new List<string> { },
                ExportAsClass = true,
                AllowGeneric = true,
                Members = TypescriptModelsGenerator.MemberFlags.All,
                AllowPointer = false
            };

            return PickFileAndGenerate(generator, filePath);
        }

        [MenuItem("React/Typescript Generator/Generate Yoga", priority = 0)]
        public static string GenerateYoga() => GenerateYoga(null);
        public static string GenerateYoga(string filePath = null)
        {
            var generator = new TypescriptModelsGenerator
            {
                Assemblies = new List<Assembly> { typeof(Yoga.YogaNode).Assembly, },
                IncludedNamespaces = new List<string> { "Yoga" },
                ExcludedNamespaces = new List<string> { },
                ImportNamespaces = new Dictionary<string, string> { { "System", "./system" } },
                ExcludedTypes = new List<string> { },
                ExportAsClass = true,
                AllowGeneric = true,
                Members = TypescriptModelsGenerator.MemberFlags.All,
                AllowPointer = false
            };

            return PickFileAndGenerate(generator, filePath);
        }

        [MenuItem("React/Typescript Generator/Generate System", priority = 0)]
        public static string GenerateSystem() => GenerateSystem(null);
        public static string GenerateSystem(string filePath = null)
        {
            var generator = new TypescriptModelsGenerator
            {
                Assemblies = new List<Assembly> {
                    typeof(System.Convert).Assembly,
                    typeof(System.Object).Assembly,
                    typeof(System.Collections.Generic.HashSet<>).Assembly,
                    typeof(System.Diagnostics.TraceFilter).Assembly,
                    typeof(System.Collections.IEnumerator).Assembly,
                    typeof(System.Collections.Specialized.StringDictionary).Assembly,
                    typeof(System.Reflection.Assembly).Assembly,
                },
                IncludedNamespaces = new List<string> { "System" },
                ExcludedNamespaces = new List<string> { "System.Configuration", "System.Xml", "System.Net" },
                ImportNamespaces = new Dictionary<string, string> { },
                ExcludedTypes = new List<string> { },
                ExportAsClass = true,
                AllowGeneric = true,
                AllowPointer = false,
            };

            return PickFileAndGenerate(generator, filePath);
        }

        [MenuItem("React/Typescript Generator/Generate NUnit", priority = 0)]
        public static string GenerateNUnit() => GenerateNUnit(null);
        public static string GenerateNUnit(string filePath = null)
        {
            var generator = new TypescriptModelsGenerator
            {
                Assemblies = new List<Assembly> { typeof(NUnit.Framework.Assert).Assembly },
                IncludedNamespaces = new List<string> { "NUnit.Framework" },
                ExcludedNamespaces = new List<string> { "System.Configuration", "System.Xml", "System.Net", "System.Web" },
                ImportNamespaces = new Dictionary<string, string> { { "System", "./system" } },
                ExcludedTypes = new List<string> { },
                ExportAsClass = true,
                AllowGeneric = true,
            };

            return PickFileAndGenerate(generator, filePath);
        }

#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE
        [MenuItem("React/Typescript Generator/Generate QuickJS", priority = 0)]
        public static string GenerateQuickJS() => GenerateQuickJS(null);
        public static string GenerateQuickJS(string filePath = null)
        {
            var generator =
                new TypescriptModelsGenerator()
                {
                    Assemblies = new List<Assembly> {
                        typeof(QuickJS.ScriptEngine).Assembly,
                        typeof(QuickJS.Native.JSApi).Assembly,
                        typeof(QuickJS.JSPayloadHeader).Assembly,
                    },
                    IncludedNamespaces = new List<string> { "QuickJS" },
                    ExcludedNamespaces = new List<string> { "UnityEngine.InputSystem", "UnityEngine.InputSystem.LowLevel", "Unity.VectorGraphics" },
                    ImportNamespaces = new Dictionary<string, string> { { "UnityEngine", "./unity" }, { "Unity", "./unity" }, { "Yoga", "./yoga" }, { "System", "./system" } },
                    ExcludedTypes = new List<string> { },
                    AllowGeneric = true,
                    Members = TypescriptModelsGenerator.MemberFlags.All,
                    AllowPointer = true,
                    WriteDocs = true,
                    IncludeExterns = true,
                };

            return PickFileAndGenerate(generator, filePath);
        }
#endif
#endif

        [MenuItem("React/Generate Project Typescript Models", priority = 0)]
        public static string GenerateCurrentProject() => GenerateCurrentProject(null);
        public static string GenerateCurrentProject(string filePath = null)
        {
            var compiledAssemblies = UnityEditor.Compilation.CompilationPipeline.GetAssemblies(UnityEditor.Compilation.AssembliesType.Editor);
            var compiledAssembliesInProject = compiledAssemblies.Where(x => x.sourceFiles.All(f => f.FastStartsWith("Assets/")));
            var assemblySet = new HashSet<string>(compiledAssembliesInProject.Select(x => x.name))
            {
                "Assembly-CSharp",
                "Assembly-CSharp-Editor",
            };

            var defaultAssemblies = AppDomain.CurrentDomain.GetAssemblies().Where(x => assemblySet.Contains(x.GetName().Name)).ToList();

            var generator = new TypescriptModelsGenerator
            {
                Assemblies = defaultAssemblies,
                IncludedNamespaces = null,
                ExcludedNamespaces = new List<string> { "UnityEngine.InputSystem", "UnityEngine.InputSystem.LowLevel", "Unity.VectorGraphics" },
                ImportNamespaces = new Dictionary<string, string> {
                    { "UnityEngine", "@reactunity/renderer" }, { "UnityEditor", "@reactunity/renderer" }, { "Unity", "@reactunity/renderer" },
                    { "System", "@reactunity/renderer" }, { "ReactUnity", "@reactunity/renderer" }, { "Yoga", "@reactunity/renderer" } },
                ExcludedTypes = new List<string> { },
                ExportAsClass = true,
                AllowGeneric = true,
                Members = TypescriptModelsGenerator.MemberFlags.All,
                AllowPointer = false,
                IsExternal = true,
            };

            return PickFileAndGenerate(generator, filePath);
        }

        public static string PickFileAndGenerate(this TypescriptModelsGenerator generator, string filePath = null)
        {
            if (string.IsNullOrWhiteSpace(filePath))
            {
                filePath = EditorUtility.OpenFilePanel("Typescript file", "", "ts");
                if (string.IsNullOrWhiteSpace(filePath)) return filePath;
            }

            generator.GenerateTo(filePath);
            UnityEngine.Debug.Log("Saved typescript models to: " + filePath);

            return filePath;
        }
    }
}
