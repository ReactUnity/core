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
#if ENABLE_INPUT_SYSTEM && REACT_INPUT_SYSTEM
        const string IgnoreInputSystem = "BogusNamespace";
#else
        const string IgnoreInputSystem = "UnityEngine.InputSystem";
#endif

#if REACT_UNITY_DEVELOPER
        [UnityEditor.MenuItem("React/Developer/Generate Unity Typescript Models", priority = 0)]
        public static void GenerateUnity()
        {
            GenerateWith(
                new List<Assembly> {
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
                },
                new List<string> { "Unity", "UnityEngine" },
                new List<string> { IgnoreInputSystem, "UnityEngine.InputSystem.LowLevel" },
                new Dictionary<string, string> { { "System", "./system" } },
                new List<string> { },
                true,
                true
            );
        }

        [UnityEditor.MenuItem("React/Developer/Generate Editor Typescript Models", priority = 0)]
        public static void GenerateEditor()
        {
            GenerateWith(
                new List<Assembly> {
                    typeof(UnityEditor.EditorWindow).Assembly,
                },
                new List<string> { "UnityEditor" },
                new List<string> { IgnoreInputSystem, "UnityEngine.InputSystem.LowLevel", "UnityEngine.Experimental", "UnityEngine.TerrainTools", "UnityEngine.TextCore" },
                new Dictionary<string, string> { { "UnityEngine", "./unity" }, { "Unity", "./unity" }, { "System", "./system" } },
                new List<string> { "UnityEngine.ConfigurableJointMotion", "UnityEngine.RaycastHit", "UnityEngine.Terrain", "UnityEngine.TerrainLayer" },
                true,
                true
            );
        }

        [UnityEditor.MenuItem("React/Developer/Generate React Unity Typescript Models", priority = 0)]
        public static void GenerateReactUnity()
        {
            GenerateWith(
                new List<Assembly> { typeof(ReactContext).Assembly, typeof(TypescriptModelsGenerator).Assembly, typeof(ReactUnity.UGUI.UGUIContext).Assembly, typeof(ReactUnity.UIToolkit.UIToolkitContext).Assembly, },
                new List<string> { "ReactUnity", "Facebook.Yoga" },
                new List<string> { IgnoreInputSystem, "UnityEngine.InputSystem.LowLevel", "Unity.VectorGraphics" },
                new Dictionary<string, string> { { "UnityEngine", "./unity" }, { "Unity", "./unity" }, { "System", "./system" } },
                new List<string> { },
                true,
                true
            );
        }

        [UnityEditor.MenuItem("React/Developer/Generate System Typescript Models", priority = 0)]
        public static void GenerateSystem()
        {
            GenerateWith(
                new List<Assembly> {
                    typeof(System.Convert).Assembly,
                    typeof(System.Object).Assembly,
                    typeof(System.Collections.Generic.HashSet<>).Assembly,
                    typeof(System.Diagnostics.TraceFilter).Assembly,
                    typeof(System.Collections.IEnumerator).Assembly,
                    typeof(System.Collections.Specialized.StringDictionary).Assembly,
                    typeof(System.Reflection.Assembly).Assembly,
                },
                new List<string> { "System" },
                new List<string> { "System.Configuration", "System.Xml", "System.Net" },
                new Dictionary<string, string> { },
                new List<string> { },
                true,
                true
            );
        }
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
            GenerateWith(
                defaultAssemblies,
                null,
                new List<string> { IgnoreInputSystem, "UnityEngine.InputSystem.LowLevel", "Unity.VectorGraphics" },
                new Dictionary<string, string> {
                    { "UnityEngine", "@reactunity/renderer" }, { "UnityEditor", "@reactunity/renderer" }, { "Unity", "@reactunity/renderer" },
                    { "System", "@reactunity/renderer" }, { "ReactUnity", "@reactunity/renderer" }, { "Facebook", "@reactunity/renderer" } },
                new List<string> { },
                true,
                true
            );
        }

        List<Assembly> Assemblies;
        List<string> IncludedNamespaces;
        List<string> ExcludedNamespaces;
        List<string> ExcludedTypes;
        Dictionary<string, string> ImportNamespaces;
        HashSet<string> Imports;
        Dictionary<string, string> Remaps;
        bool ExportAsClass;
        bool AllowGeneric;
        bool AllowIndexer;

        public static void GenerateWith(List<Assembly> assemblies, List<string> include, List<string> exclude, Dictionary<string, string> import, List<string> excludeTypes,
            bool exportAsClass = true, bool generateGenericClasses = false, bool allowIndexer = true)
        {
            var generator =
                new TypescriptModelsGenerator(
                    assemblies,
                    include,
                    exclude,
                    import,
                    excludeTypes,
                    exportAsClass,
                    generateGenericClasses,
                    allowIndexer
                );
            generator.Generate();
        }

        public TypescriptModelsGenerator(
            List<Assembly> assemblies,
            List<string> include,
            List<string> exclude,
            Dictionary<string, string> import,
            List<string> excludeTypes,
            bool exportAsClass = true,
            bool generateGenericClasses = false,
            bool allowIndexer = true
        )
        {
            Assemblies = assemblies;
            ExcludedTypes = excludeTypes;
            ImportNamespaces = import ?? new Dictionary<string, string>();
            Remaps = new Dictionary<string, string>();
            IncludedNamespaces = include;
            ExcludedNamespaces = exclude ?? new List<string>();
            Imports = new HashSet<string>();
            ExportAsClass = exportAsClass;
            AllowGeneric = generateGenericClasses;
            AllowIndexer = allowIndexer;

        }

        public void Generate()
        {
            var filePath = UnityEditor.EditorUtility.OpenFilePanel("Typescript file", "", "ts");
            if (string.IsNullOrWhiteSpace(filePath)) return;


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
            var n = "\n";

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
                            !x.GetParameters().Any(p => p.ParameterType.IsByRef || p.ParameterType.IsPointer));
                        foreach (var info in ctors)
                            sb.Append($"{bl1}{getTypeScriptString(info)}{n}");
                    }

                    var props = type.GetProperties(BindingFlags.Instance | BindingFlags.Static | BindingFlags.Public)
                        .Where(x => !x.IsSpecialName &&
                                    x.GetIndexParameters().Length == 0 &&
                                    !x.PropertyType.IsPointer)
                        .GroupBy(x => x.Name)
                        .Select(g => g.First());
                    var fields = type.GetFields(BindingFlags.Instance | BindingFlags.Static | BindingFlags.Public)
                        .Where(x => !x.IsSpecialName &&
                                    !x.FieldType.IsPointer);
                    var methods = type.GetMethods(BindingFlags.Instance | BindingFlags.Static | BindingFlags.Public)
                        .Where(x => !x.IsSpecialName &&
                                    !(x.ReturnType.IsByRef || x.ReturnType.IsPointer) &&
                                    !x.GetParameters().Any(p => p.ParameterType.IsByRef || p.ParameterType.IsPointer) &&
                                    !x.IsGenericMethod);

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
                        sb.Append($"{bl1}{getTypeScriptString(info)}{n}");
                }

                sb.Append($"{bl}}}{n}");
            }

            var importGroups = Imports.GroupBy(x => ImportNamespaces[x]);
            var remapGroups = Remaps.GroupBy(x => x.Value, x => x.Key);

            var imports = importGroups.Concat(remapGroups).OrderBy(x => x.Key);

            return $"//{n}" +
                $"// Types in assemblies: {string.Join(", ", Assemblies.Select(x => x.GetName().Name))}{n}" +
                $"// Generated {DateTime.Now}{n}" +
                $"//{n}" +
                $"{string.Join(n, imports.Select(x => $"import {{ {string.Join(", ", x.OrderBy(y => y))} }} from '{x.Key}';"))}{n}" +
                n +
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
            var typeString = RegisterRemap(remap) ?? getTypesScriptType(info.PropertyType, true, false, AllowGeneric && !isStatic);
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
            var typeString = RegisterRemap(remap) ?? getTypesScriptType(info.FieldType, true, false, AllowGeneric && !isStatic);
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
            var types = string.Join(" | ", list.Select(x => "(" + getTypeScriptStringForArgs(x) + ")"));

            return string.Format("{0}{1}: {2};",
              isStatic ? "static " : "",
              info.Name,
              types
            );
        }

        string getTypeScriptString(MethodInfo info)
        {
            var isStatic = info.IsStatic;
            var types = getTypeScriptStringForArgs(info);

            var retType = getTypesScriptType(info.ReturnType, true, false, AllowGeneric && !info.IsStatic);
            var args = string.Join(", ", info.GetParameters().Select(x => getTypeScriptString(x, AllowGeneric && !info.IsStatic)));

            return string.Format("{0}{1}({2}): {3};",
              isStatic ? "static " : "",
              info.Name,
              args,
              retType
            );
        }

        string getTypeScriptStringForArgs(MethodInfo info)
        {
            var retType = getTypesScriptType(info.ReturnType, true, false, AllowGeneric && !info.IsStatic);
            var args = string.Join(", ", info.GetParameters().Select(x => getTypeScriptString(x, AllowGeneric && !info.IsStatic)));

            return string.Format("({0}) => {1}",
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
            var typeString = RegisterRemap(remap) ?? getTypesScriptType(info.ParameterType, true, false, allowGeneric);
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
            var propertyType = type.ToString();
            var genArgs = type.GetGenericArguments();

            var remap = type.GetCustomAttribute<TypescriptRemap>();

            if (!skipKnownTypes && remap != null) return RegisterRemap(remap);

            if (ExcludedTypes.Contains(propertyType)) return "any";

            if (!skipKnownTypes)
            {
                switch (propertyType)
                {
                    case "System.Void":
                        return "void";

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
    }
}
