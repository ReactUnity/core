using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using ReactUnity.Helpers.TypescriptUtils;

namespace ReactUnity.Editor.Developer
{
    [ExcludeFromCodeCoverage]
    public class TypescriptModelsGenerator
    {
        #region Generators

#if ENABLE_INPUT_SYSTEM && REACT_INPUT_SYSTEM
        const string IgnoreInputSystem = "BogusNamespace";
#else
        const string IgnoreInputSystem = "UnityEngine.InputSystem";
#endif

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
                ExcludedNamespaces = new List<string> { IgnoreInputSystem, "UnityEngine.InputSystem.LowLevel" },
                ImportNamespaces = new Dictionary<string, string> { { "System", "./system" } },
                ExcludedTypes = new List<string> { },
                ExportAsClass = true,
                AllowGeneric = true,
                AllowIndexer = true,
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
                ExcludedNamespaces = new List<string> { IgnoreInputSystem, "UnityEngine.InputSystem.LowLevel", "UnityEngine.Experimental", "UnityEngine.TerrainTools", "UnityEngine.TextCore" },
                ImportNamespaces = new Dictionary<string, string> { { "UnityEngine", "./unity" }, { "Unity", "./unity" }, { "System", "./system" } },
                ExcludedTypes = new List<string> { "UnityEngine.ConfigurableJointMotion", "UnityEngine.RaycastHit", "UnityEngine.Terrain", "UnityEngine.TerrainLayer" },
                ExportAsClass = true,
                AllowGeneric = true,
                AllowIndexer = true,
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
                ExcludedNamespaces = new List<string> { IgnoreInputSystem, "UnityEngine.InputSystem.LowLevel", "Unity.VectorGraphics" },
                ImportNamespaces = new Dictionary<string, string> { { "UnityEngine", "./unity" }, { "Unity", "./unity" }, { "Facebook", "./yoga" }, { "System", "./system" } },
                ExcludedTypes = new List<string> { },
                ExportAsClass = true,
                AllowGeneric = true,
                AllowIndexer = true,
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
                AllowIndexer = true,
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
                AllowIndexer = false,
                AllowPointer = false,
            };

            generator.PickFileAndGenerate();
        }

#if !REACT_DISABLE_QUICKJS && REACT_QUICKJS_AVAILABLE && (!UNITY_WEBGL || UNITY_EDITOR)
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
                    ExcludedNamespaces = new List<string> { IgnoreInputSystem, "UnityEngine.InputSystem.LowLevel", "Unity.VectorGraphics" },
                    ImportNamespaces = new Dictionary<string, string> { { "UnityEngine", "./unity" }, { "Unity", "./unity" }, { "Facebook", "./yoga" }, { "System", "./system" } },
                    ExcludedTypes = new List<string> { },
                    AllowGeneric = true,
                    AllowIndexer = true,
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
                ExcludedNamespaces = new List<string> { IgnoreInputSystem, "UnityEngine.InputSystem.LowLevel", "Unity.VectorGraphics" },
                ImportNamespaces = new Dictionary<string, string> {
                    { "UnityEngine", "@reactunity/renderer" }, { "UnityEditor", "@reactunity/renderer" }, { "Unity", "@reactunity/renderer" },
                    { "System", "@reactunity/renderer" }, { "ReactUnity", "@reactunity/renderer" }, { "Facebook", "@reactunity/renderer" } },
                ExcludedTypes = new List<string> { },
                ExportAsClass = true,
                AllowGeneric = true,
                AllowIndexer = true,
                AllowPointer = false
            };
        }

        #endregion


        #region Options

        public List<Assembly> Assemblies { get; set; } = new List<Assembly>();
        public List<string> IncludedNamespaces { get; set; } = null;
        public List<string> ExcludedNamespaces { get; set; } = null;
        public List<string> ExcludedTypes { get; set; } = null;
        public Dictionary<string, string> ImportNamespaces { get; set; } = new Dictionary<string, string>();
        public Dictionary<string, string> Remaps { get; set; } = new Dictionary<string, string>();
        public bool ExportAsClass { get; set; } = true;
        public bool AllowGeneric { get; set; } = false;
        public bool AllowIndexer { get; set; } = true;
        public bool AllowPointer { get; set; } = false;
        public bool WriteDocs { get; set; } = false;
        public bool IncludeExterns { get; set; } = false;

        #endregion


        #region State

        HashSet<string> Imports = new HashSet<string>();
        HashSet<string> Helpers = new HashSet<string>();

        #endregion


        private static string n = "\n";

        public string PickFileAndGenerate()
        {
            var filePath = UnityEditor.EditorUtility.OpenFilePanel("Typescript file", "", "ts");
            if (string.IsNullOrWhiteSpace(filePath)) return filePath;

            GenerateTo(filePath);

            return filePath;
        }

        public void GenerateTo(string filePath)
        {
            UnityEngine.Debug.Assert(!string.IsNullOrWhiteSpace(filePath));

            var res = GetTypescript();
            File.WriteAllText(filePath, res);

            UnityEngine.Debug.Log("Saved typescript models to: " + filePath);
        }

        public string GetTypescript()
        {
            var types = Assemblies.Distinct().SelectMany(a => a.GetTypes()).Where(x => filterType(x, AllowGeneric)).OrderBy(x => x.Namespace ?? "")
                .GroupBy(x => GetNameWithoutGenericArity(x.ToString()))
                .Select(x => x.OrderByDescending(t => t.GetGenericArguments().Length).First())
                .Append(null);
            var sb = new StringBuilder();

            var nsStack = new Stack<string>();

            string spaces(int depth = 0)
            {
                if ((nsStack.Count + depth) == 0) return "";
                return new String(' ', (nsStack.Count + depth) * 2);
            }

            foreach (var type in types)
            {
                var lastNs = nsStack.Count > 0 ? nsStack.Peek() : "";
                var ns = type?.Namespace ?? "";
                while (lastNs != ns)
                {
                    if (nsStack.Count == 0 || ns.Contains(lastNs + "."))
                    {
                        // Go deeper
                        var nsName = string.IsNullOrWhiteSpace(lastNs) ? ns : ns.Replace(lastNs + ".", "");
                        var splits = nsName.Split('.');

                        var curName = lastNs;
                        foreach (var split in splits)
                        {
                            var topLevel = nsStack.Count == 0;
                            var declareOrNot = topLevel ? "declare " : "";
                            curName = string.IsNullOrWhiteSpace(curName) ? split : $"{curName}.{split}";
                            sb.Append($"{spaces()}export {declareOrNot}namespace {split} {{{n}");
                            nsStack.Push(curName);
                        }
                        lastNs = ns;
                    }
                    else
                    {
                        nsStack.Pop();
                        lastNs = nsStack.Count > 0 ? nsStack.Peek() : "";
                        sb.Append($"{spaces()}}}{n}");
                    }
                }

                if (type == null) break;

                var bl = spaces();
                var bl1 = spaces(1);
                var isTopLevel = nsStack.Count == 0;
                var declare = isTopLevel ? "declare " : "";

                if (type.IsEnum)
                {
                    sb.Append($"{bl}export {declare}enum {getTypesScriptType(type, false, true)} {{{n}");
                    var fields = type.GetFields().Where(x => x.Name != "value__");

                    foreach (var info in fields)
                        sb.Append($"{bl1}{info.Name} = {getTypeScriptValue(info.GetRawConstantValue())},{n}");
                }
                else
                {
                    var extends = type.GetCustomAttribute<TypescriptListInterfaces>() != null ? type.GetInterfaces() : new Type[0];
                    var extendsString = extends.Length == 0 ? "" : $" {(type.IsInterface ? "extends" : "implements")} " +
                        string.Join(", ", extends.Select(x => getTypesScriptType(x, true, true, AllowGeneric)));

                    sb.Append($"{bl}{(ExportAsClass && !type.IsInterface ? $"export {declare}class" : $"export {declare}interface")} {getTypesScriptType(type, false, true, AllowGeneric, " = any")}{extendsString} {{{n}");

                    if (ExportAsClass)
                    {
                        var ctors = type.GetConstructors(BindingFlags.Instance | BindingFlags.Public).Where(x =>
                            !x.GetParameters().Any(p => p.ParameterType.IsByRef || (!AllowPointer && p.ParameterType.IsPointer)));
                        foreach (var info in ctors)
                            sb.Append($"{bl1}{getTypeScriptString(info)}{n}");
                    }

                    var props = type.GetProperties(BindingFlags.Instance | BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic)
                        .Where(x => !x.IsSpecialName &&
                                    x.GetIndexParameters().Length == 0 &&
                                    !(!AllowPointer && x.PropertyType.IsPointer) &&
                                    (x.GetCustomAttribute<TypescriptExclude>() == null) &&
                                    ((x.GetCustomAttribute<TypescriptInclude>() != null) || (x.GetGetMethod()?.IsPublic ?? false) || (x.GetSetMethod()?.IsPublic ?? false))
                                    )
                        .GroupBy(x => x.Name)
                        .Select(g => g.First());

                    var fields = type.GetFields(BindingFlags.Instance | BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic)
                        .Where(x => !x.IsSpecialName &&
                                    !(!AllowPointer && x.FieldType.IsPointer) &&
                                    (x.GetCustomAttribute<TypescriptExclude>() == null) &&
                                    ((x.GetCustomAttribute<TypescriptInclude>() != null) || x.IsPublic)
                                    );

                    var methods = type.GetMethods(BindingFlags.Instance | BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic)
                        .Where(x => !x.IsSpecialName &&
                                    !(x.ReturnType.IsByRef || (!AllowPointer && x.ReturnType.IsPointer)) &&
                                    !x.GetParameters().Any(p => p.ParameterType.IsByRef || (!AllowPointer && p.ParameterType.IsPointer)) &&
                                    !x.IsGenericMethod &&
                                    (x.GetCustomAttribute<TypescriptExclude>() == null) &&
                                    ((x.GetCustomAttribute<TypescriptInclude>() != null) || x.IsPublic ||
                                        (IncludeExterns && x.IsStatic && x.GetMethodBody() == null))
                                    );

                    var indexer = type.GetProperties(BindingFlags.Instance | BindingFlags.Static | BindingFlags.Public)
                        .FirstOrDefault(x => x.GetIndexParameters().Length == 1);

                    var methodsGrouped = methods.GroupBy(x => x.Name);



                    if (AllowIndexer && indexer != null)
                        sb.Append($"{bl1}[key: string]: any;{n}");

                    foreach (var info in props)
                        sb.Append($"{bl1}{getTypeScriptString(info)}{n}");

                    foreach (var info in fields)
                        sb.Append($"{bl1}{getTypeScriptString(info)}{n}");

                    //foreach (var info in methodsGrouped)
                    //    sb.Append($"{bl1}{getTypeScriptString(info)}{n}");

                    foreach (var info in methods)
                        sb.Append($"{bl1}{getTypeScriptString(info, bl1)}{n}");
                }

                sb.Append($"{bl}}}{n}");
            }

            var importGroups = Imports.GroupBy(x => ImportNamespaces[x]);
            var remapGroups = Remaps.GroupBy(x => x.Value, x => x.Key);

            var helpers = "";

            if (Helpers.Contains("pointer"))
            {
                helpers += n;
                helpers += "export interface Pointer<T> {" + n;
                helpers += "  type?: T;" + n;
                helpers += "  __pointer: true;" + n;
                helpers += "}" + n;
                helpers += n;
            }

            if (Helpers.Contains("byte"))
            {
                helpers += n;
                helpers += "type Byte = number;" + n;
                helpers += n;
            }

            var imports = importGroups.Concat(remapGroups).OrderBy(x => x.Key);

            return $"//{n}" +
                $"// Types in assemblies: {string.Join(", ", Assemblies.Select(x => x.GetName().Name))}{n}" +
                $"// Generated {DateTime.Now}{n}" +
                $"//{n}" +
                $"/* eslint-disable */{n}{n}" +
                $"{string.Join(n, imports.Select(x => $"import {{ {string.Join(", ", x.OrderBy(y => y))} }} from '{x.Key}';"))}{n}" +
                n +
                helpers +
                sb;
        }

        bool filterType(Type t, bool allowGeneric = false)
        {
            return t != null &&
              (t.DeclaringType == null || filterType(t.DeclaringType, allowGeneric)) &&
              !t.FullName.Contains("<") &&
              (allowGeneric || !t.IsGenericType || t.IsEnum) &&
              (t.GetCustomAttribute<TypescriptExclude>() == null) &&
              ((t.GetCustomAttribute<TypescriptInclude>() != null) ||
                  (IncludedNamespaces == null || IncludedNamespaces.Any(x => t.FullName.StartsWith(x + "."))) &&
                  (!ExcludedNamespaces.Any(x => (t.Namespace ?? "").StartsWith(x))) &&
                  (t.IsPublic || t.IsNestedPublic) &&
                  !typeof(Attribute).IsAssignableFrom(t)
              );
        }

        string getTypeScriptString(PropertyInfo info)
        {
            var isStatic = info.GetAccessors(true)[0].IsStatic;
            var remap = info.GetCustomAttribute<TypescriptRemap>();
            var remapType = info.GetCustomAttribute<TypescriptRemapType>()?.TargetType;
            var typeString = RegisterRemap(remap) ?? getTypesScriptType(remapType ?? info.PropertyType, true, false, AllowGeneric && !isStatic);
            var isNullable = info.PropertyType.ToString().Contains("Nullable");

            return string.Format("{3}{0}{4}: {1};{2}",
              info.Name,
              typeString,
              typeString == "any" ? " // " + info.PropertyType : "",
              isStatic ? "static " : "",
              isNullable ? "?" : ""
            );
        }

        string getTypeScriptString(FieldInfo info)
        {
            var isStatic = info.IsStatic;
            var remap = info.GetCustomAttribute<TypescriptRemap>();
            var remapType = info.GetCustomAttribute<TypescriptRemapType>()?.TargetType;
            var typeString = RegisterRemap(remap) ?? getTypesScriptType(remapType ?? info.FieldType, true, false, AllowGeneric && !isStatic);
            var isNullable = info.FieldType.ToString().Contains("Nullable");

            return string.Format("{3}{0}{4}: {1};{2}",
              info.Name,
              typeString,
              typeString == "any" ? " // " + info.FieldType : "",
              isStatic ? "static " : "",
              isNullable ? "?" : ""
            );
        }

        string getTypeScriptString(IGrouping<string, MethodInfo> list)
        {
            var info = list.First();
            var isStatic = info.IsStatic;
            var types = string.Join(" | ", list.Select(getTypeScriptStringForArgs));

            return string.Format("{0}{1}: {2};",
              isStatic ? "static " : "",
              info.Name,
              types
            );
        }

        string getTypeScriptString(MethodInfo info, string indent)
        {
            var isStatic = info.IsStatic;
            var retType = getTypesScriptType(info.ReturnType, true, false, AllowGeneric && !info.IsStatic);
            var args = string.Join(", ", info.GetParameters().Select(x => getTypeScriptString(x, AllowGeneric && !info.IsStatic)));

            var docs = new List<string>();
            if (info.IsPrivate) docs.Add("@private");
            if (isStatic && info.GetMethodBody() == null) docs.Add("@external");
            var modifiers = FormatJSDocLines(docs, indent);

            return string.Format("{4}{0}{1}({2}): {3};",
              isStatic ? "static " : "",
              info.Name,
              args,
              retType,
              modifiers
            );
        }

        string getTypeScriptStringForArgs(MethodInfo info)
        {
            var retType = getTypesScriptType(info.ReturnType, true, false, AllowGeneric && !info.IsStatic);
            var args = string.Join(", ", info.GetParameters().Select(x => getTypeScriptString(x, AllowGeneric && !info.IsStatic)));

            return string.Format("(({0}) => {1})",
              args,
              retType
            );
        }

        string getTypeScriptString(ConstructorInfo info)
        {
            var args = string.Join(", ", info.GetParameters().Select(x => getTypeScriptString(x, true)));

            return string.Format("constructor({0});", args);
        }

        string getTypeScriptString(ParameterInfo info, bool allowGeneric)
        {
            var remap = info.GetCustomAttribute<TypescriptRemap>();
            var remapType = info.GetCustomAttribute<TypescriptRemapType>()?.TargetType;
            var typeString = RegisterRemap(remap) ?? getTypesScriptType(remapType ?? info.ParameterType, true, false, allowGeneric);
            var isParams = info.GetCustomAttribute(typeof(ParamArrayAttribute), false) != null;

            var keywords = new HashSet<string> {
                "arguments", "function", "finally", "import", "export", "debugger",
                "const", "super", "extends", "implements", "instanceof", "typeof", "with",
                "new", "class", "throw", "catch", "if", "else", "do", "while", "for", "switch",
                "return", "this", "var", "true", "false", "void", "default", "case", "break",
                "continue", "enum", "null", "delete", "as", "public", "let", "package",
                "interface", "static", "private", "protected", "yield", "declare",
            };

            return string.Format("{3}{0}{2}: {1}",
                keywords.Contains(info.Name) ? info.Name + "CS" : info.Name,
                typeString,
                info.IsOptional ? "?" : "",
                isParams ? "..." : ""
            );
        }

        string getTypeScriptValue(object val)
        {
            if (val == null) return "undefined";

            switch (val)
            {
                case string s:
                    return $"'{s.Replace("'", "\\'")}'";
                case int i:
                case long l:
                case uint ui:
                case short sh:
                case ushort ush:
                case float f:
                case double d:
                case ulong ul:
                case decimal dd:
                case byte b:
                    return val.ToString();
                default:
                    return "{}";
            }
        }


        string getTypesScriptType(Type type, bool withNs, bool skipKnownTypes = false, bool allowGeneric = false, string suffixGeneric = "")
        {
            if (type.IsPointer)
            {
                Helpers.Add("pointer");
                var baseType = type.Assembly.GetType(type.FullName.Replace("*", ""));
                var baseTypeStr = getTypesScriptType(baseType, withNs, skipKnownTypes, allowGeneric, suffixGeneric);

                return $"Pointer<{baseTypeStr}>";
            }

            var remap = type.GetCustomAttribute<TypescriptRemap>();
            var remapType = type.GetCustomAttribute<TypescriptRemapType>()?.TargetType;

            if (remapType != null) type = remapType;

            if (!skipKnownTypes && typeof(Delegate).IsAssignableFrom(type) && type != typeof(Delegate) && type != typeof(MulticastDelegate))
            {
                return getTypeScriptStringForArgs(type.GetMethod("Invoke"));
            }

            var propertyType = type.ToString();
            var genArgs = type.GetGenericArguments();


            if (!skipKnownTypes && remap != null) return RegisterRemap(remap);

            if (ExcludedTypes.Contains(propertyType)) return "any";

            if (!skipKnownTypes)
            {
                switch (propertyType)
                {
                    case "System.Void":
                        return "void";

                    case "System.Byte":
                        Helpers.Add("byte");
                        return "Byte";

                    case "System.Action":
                        return "(() => void)";

                    case "System.Dynamic.ExpandoObject":
                        return "Record<string, any>";

                    case "System.String":
                        return "string";

                    case "System.Object":
                        return "any";

                    case "Jint.Native.JsValue":
                        return "any";
                    case "Jint.Native.JsString":
                        return "string";
                    case "Jint.Native.JsNumber":
                        return "number";
                    case "Jint.Native.JsBoolean":
                        return "boolean";
                    case "Jint.Native.JsSymbol":
                        return "symbol";

                    case "System.Single":
                    case "System.Double":
                    case "System.Int32":
                        return "number";

                    case "System.Boolean":
                        return "boolean";

                    case "System.Nullable`1[System.Boolean]":
                        return "boolean";

                    case "System.Nullable`1[System.Double]":
                    case "System.Nullable`1[System.Single]":
                    case "System.Nullable`1[System.Int32]":
                        return "number";

                    default:
                        break;
                }

                if (type.IsArray) return getTypesScriptType(type.GetElementType(), withNs, skipKnownTypes, allowGeneric) + "[]";
                var isList = type.GetTypeInfo().ImplementedInterfaces.Any(x => x.GetTypeInfo().IsGenericType && x.GetGenericTypeDefinition() == typeof(IList<>));
                var hasGenericArguments = genArgs.Any();
                if (isList && hasGenericArguments) return getTypesScriptType(genArgs[0], withNs, skipKnownTypes, allowGeneric) + "[]";
            }

            if (!skipKnownTypes && ExcludedNamespaces.Any(x => propertyType.StartsWith(x + "."))) return "any";

            if (type.IsGenericParameter)
            {
                if (allowGeneric) return withNs ? propertyType : type.Name;
                else return "any";
            }

            if (type.IsGenericType)
            {
                var gens = genArgs.Select(x => getTypesScriptType(x, withNs, skipKnownTypes, allowGeneric)).ToList();

                if (!skipKnownTypes)
                {
                    if (propertyType.StartsWith("System.Action") || propertyType.StartsWith("System.Func"))
                    {
                        var retType = propertyType.StartsWith("System.Action") || gens.Count == 0 ? "void" : gens.Last();
                        if (propertyType.StartsWith("System.Func")) gens = gens.Take(gens.Count - 1).ToList();
                        var args = string.Join(", ", gens.Select((x, i) => $"arg{i}: {x}"));

                        return string.Format("(({0}) => {1})",
                          args,
                          retType
                        );
                    }
                }

                if (allowGeneric)
                {
                    var nameWithoutGeneric = GetNameWithoutGenericArity(withNs ? propertyType : type.Name);
                    if (nameWithoutGeneric == "System.Collections.Generic.Dictionary" && (gens[0] == "string" || gens[0] == "number")) nameWithoutGeneric = "Record";
                    var gn = string.Join(", ", gens.Select(x => x + suffixGeneric));
                    return $"{nameWithoutGeneric}<{gn}>";
                }
            }

            if (typeof(Attribute).IsAssignableFrom(type)) return "any";
            if (!type.IsEnum && propertyType.Contains("`")) return "any";
            if (type.DeclaringType != null)
            {
                var parent = getTypesScriptType(type.DeclaringType, withNs, skipKnownTypes, allowGeneric);
                if (parent == "any") return "any";
                return parent + "_" + type.Name;
            }

            var fullName = ((withNs && type.Namespace != null) ? (type.Namespace + ".") : "") + type.Name;
            if (IncludedNamespaces != null && IncludedNamespaces.Any(x => propertyType.StartsWith(x + "."))) return fullName;

            var importing = ImportNamespaces.FirstOrDefault(x => propertyType.StartsWith(x.Key + "."));
            if (!string.IsNullOrWhiteSpace(importing.Key))
            {
                Imports.Add(importing.Key);
                return fullName;
            }

            if (IncludedNamespaces == null) return fullName;

            return "any";
        }

        string RegisterRemap(TypescriptRemap remap)
        {
            if (remap == null) return null;
            Remaps[remap.PropName] = remap.FileName;
            return remap.PropName;
        }

        string GetNameWithoutGenericArity(string name)
        {
            int index = name.IndexOf('`');
            return index == -1 ? name : name.Substring(0, index);
        }

        string FormatJSDocLines(List<string> lines, string indent)
        {
            if (!WriteDocs || lines.Count == 0) return "";

            if (lines.Count == 1)
            {
                return $"/**{lines[0]} */{n}{indent}";
            }

            var content = string.Join("", lines.Select(x => $"{indent} * {x}{n}").ToArray());

            return $"/**{n}{content}{indent} */{n}{indent}";
        }
    }
}
