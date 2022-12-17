using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
#if REACT_UNITY_DEVELOPER
using System.Reflection;
#endif

namespace ReactUnity.Editor.Developer
{
    [ExcludeFromCodeCoverage]
    public static class TypescriptModelsGeneratorPresets
    {
#if REACT_UNITY_DEVELOPER
        [UnityEditor.MenuItem("React/Developer/Generate Unity Typescript Models", priority = 0)]
        public static void GenerateUnity()
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
                    typeof(UnityEngine.UIElements.VisualElement).Assembly,
                    typeof(UnityEngine.ParticleSystem).Assembly,
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

            generator.PickFileAndGenerate();
        }

        [UnityEditor.MenuItem("React/Developer/Generate Editor Typescript Models", priority = 0)]
        public static void GenerateEditor()
        {
            var generator = new TypescriptModelsGenerator
            {
                Assemblies = new List<Assembly> { typeof(UnityEditor.EditorWindow).Assembly },
                IncludedNamespaces = new List<string> { "UnityEditor" },
                ExcludedNamespaces = new List<string> { "UnityEngine.InputSystem", "UnityEngine.InputSystem.LowLevel", "UnityEngine.Experimental", "UnityEngine.TerrainTools", "UnityEngine.TextCore" },
                ImportNamespaces = new Dictionary<string, string> { { "UnityEngine", "./unity" }, { "Unity", "./unity" }, { "System", "./system" } },
                ExcludedTypes = new List<string> { "UnityEngine.ConfigurableJointMotion", "UnityEngine.RaycastHit", "UnityEngine.Terrain", "UnityEngine.TerrainLayer" },
                ExportAsClass = true,
                AllowGeneric = true,
                Members = TypescriptModelsGenerator.MemberFlags.All,
                AllowPointer = false
            };

            generator.PickFileAndGenerate();
        }

        [UnityEditor.MenuItem("React/Developer/Generate React Unity Typescript Models", priority = 0)]
        public static void GenerateReactUnity()
        {
            var generator = new TypescriptModelsGenerator
            {
                Assemblies = new List<Assembly> { typeof(ReactContext).Assembly, typeof(TypescriptModelsGenerator).Assembly, typeof(ReactUnity.UGUI.UGUIContext).Assembly, typeof(ReactUnity.UIToolkit.UIToolkitContext).Assembly, },
                IncludedNamespaces = new List<string> { "ReactUnity" },
                ExcludedNamespaces = new List<string> { "UnityEngine.InputSystem", "UnityEngine.InputSystem.LowLevel", "Unity.VectorGraphics" },
                ImportNamespaces = new Dictionary<string, string> { { "UnityEngine", "./unity" }, { "Unity", "./unity" }, { "Facebook", "./yoga" }, { "System", "./system" } },
                ExcludedTypes = new List<string> { },
                ExportAsClass = true,
                AllowGeneric = true,
                Members = TypescriptModelsGenerator.MemberFlags.All,
                AllowPointer = false
            };

            generator.PickFileAndGenerate();
        }

        [UnityEditor.MenuItem("React/Developer/Generate Yoga Typescript Models", priority = 0)]
        public static void GenerateYoga()
        {
            var generator = new TypescriptModelsGenerator
            {
                Assemblies = new List<Assembly> { typeof(Facebook.Yoga.YogaNode).Assembly, },
                IncludedNamespaces = new List<string> { "Facebook.Yoga" },
                ExcludedNamespaces = new List<string> { },
                ImportNamespaces = new Dictionary<string, string> { { "System", "./system" } },
                ExcludedTypes = new List<string> { },
                ExportAsClass = true,
                AllowGeneric = true,
                Members = TypescriptModelsGenerator.MemberFlags.All,
                AllowPointer = false
            };

            generator.PickFileAndGenerate();
        }

        [UnityEditor.MenuItem("React/Developer/Generate System Typescript Models", priority = 0)]
        public static void GenerateSystem()
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

            generator.PickFileAndGenerate();
        }

#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE
        [UnityEditor.MenuItem("React/Developer/Generate QuickJS Typescript Models", priority = 0)]
        public static void GenerateQuickJS()
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
                    ImportNamespaces = new Dictionary<string, string> { { "UnityEngine", "./unity" }, { "Unity", "./unity" }, { "Facebook", "./yoga" }, { "System", "./system" } },
                    ExcludedTypes = new List<string> { },
                    AllowGeneric = true,
                    Members = TypescriptModelsGenerator.MemberFlags.All,
                    AllowPointer = true,
                    WriteDocs = true,
                    IncludeExterns = true,
                };
            generator.PickFileAndGenerate();
        }
#endif
#endif

        [UnityEditor.MenuItem("React/Generate Project Typescript Models", priority = 0)]
        public static void GenerateCurrentProject()
        {
            var compiledAssemblies = UnityEditor.Compilation.CompilationPipeline.GetAssemblies(UnityEditor.Compilation.AssembliesType.Editor);
            var compiledAssembliesInProject = compiledAssemblies.Where(x => x.sourceFiles.All(f => f.StartsWith("Assets/")));
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
                    { "System", "@reactunity/renderer" }, { "ReactUnity", "@reactunity/renderer" }, { "Facebook", "@reactunity/renderer" } },
                ExcludedTypes = new List<string> { },
                ExportAsClass = true,
                AllowGeneric = true,
                Members = TypescriptModelsGenerator.MemberFlags.All,
                AllowPointer = false,
                IsExternal = true,
            };

            generator.PickFileAndGenerate();
        }


        public static string PickFileAndGenerate(this TypescriptModelsGenerator generator)
        {
            var filePath = UnityEditor.EditorUtility.OpenFilePanel("Typescript file", "", "ts");
            if (string.IsNullOrWhiteSpace(filePath)) return filePath;

            generator.GenerateTo(filePath);
            UnityEngine.Debug.Log("Saved typescript models to: " + filePath);

            return filePath;
        }
    }
}
