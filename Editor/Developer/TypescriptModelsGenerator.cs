using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System;
using System.Text;
using System.IO;

namespace ReactUnity.Editor.Developer
{
    public static class TypescriptModelsGenerator
    {
#if REACT_UNITY_DEVELOPER
        [UnityEditor.MenuItem("React/Developer/Generate Unity Typescript Models", priority = 0)]
        public static void GenerateUnity()
        {
            Generate(
                new List<Assembly> {
                    typeof(UnityEngine.GameObject).Assembly,
                    typeof(UnityEngine.Video.VideoPlayer).Assembly,
                    typeof(UnityEngine.AudioSource).Assembly,
                    typeof(UnityEngine.CanvasGroup).Assembly,
                    typeof(UnityEngine.UI.Selectable).Assembly,
                    typeof(UnityEngine.UIVertex).Assembly,
                    typeof(UnityEngine.Input).Assembly,
                    typeof(UnityEngine.Animator).Assembly,
                    typeof(UnityEngine.Event).Assembly,
                    typeof(UnityEngine.BuildCompression).Assembly,
                    typeof(UnityEngine.Analytics.Analytics).Assembly,
                    typeof(UnityEngine.UIElements.VisualElement).Assembly,
                    typeof(UnityEngine.AI.NavMesh).Assembly,
                    //#if REACT_INPUT_SYSTEM
                    //                    typeof(UnityEngine.InputSystem.InputSystem).Assembly,
                    //                    typeof(UnityEngine.InputSystem.UI.ExtendedPointerEventData).Assembly,
                    //#endif
                    //#if REACT_VECTOR_GRAPHICS
                    //                    typeof(Unity.VectorGraphics.VectorUtils).Assembly,
                    //#endif
                },
                new List<string> { "Unity", "UnityEngine" },
                new List<string> { },
                new Dictionary<string, string> { { "System", "system" } },
                new List<string> { },
                true,
                true
            );
        }

        [UnityEditor.MenuItem("React/Developer/Generate Editor Typescript Models", priority = 0)]
        public static void GenerateEditor()
        {
            Generate(
                new List<Assembly> {
                    typeof(UnityEditor.EditorWindow).Assembly,
                },
                new List<string> { "UnityEditor" },
                new List<string> { "UnityEngine.InputSystem", "UnityEngine.Experimental" },
                new Dictionary<string, string> { { "UnityEngine", "unity" }, { "Unity", "unity" }, { "System", "system" } },
                new List<string> { "UnityEngine.ConfigurableJointMotion", "UnityEngine.RaycastHit", "UnityEngine.Terrain", "UnityEngine.TerrainLayer" },
                true,
                true
            );
        }

        [UnityEditor.MenuItem("React/Developer/Generate React Unity Typescript Models", priority = 0)]
        public static void GenerateReactUnity()
        {
            Generate(
                new List<Assembly> { typeof(ReactUnity).Assembly, typeof(TypescriptModelsGenerator).Assembly },
                new List<string> { "ReactUnity" },
                new List<string> { "UnityEngine.InputSystem" },
                new Dictionary<string, string> { { "UnityEngine", "unity" }, { "Unity", "unity" }, { "System", "system" } },
                new List<string> { },
                true,
                true
            );
        }

        [UnityEditor.MenuItem("React/Developer/Generate System Typescript Models", priority = 0)]
        public static void GenerateSystem()
        {
            Generate(
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

        static List<string> IncludedNamespaces;
        static List<string> ExcludedNamespaces;
        static List<string> ExcludedTypes;
        static Dictionary<string, string> ImportNamespaces;
        static HashSet<string> Imports;
        static bool ExportAsClass;
        static bool AllowGeneric;

        static void Generate(List<Assembly> assemblies, List<string> include, List<string> exclude, Dictionary<string, string> import, List<string> excludeTypes,
            bool exportAsClass = true, bool generateGenericClasses = false)
        {
            var filePath = UnityEditor.EditorUtility.OpenFilePanel("Typescript file", "", "ts");
            if (string.IsNullOrWhiteSpace(filePath)) return;

            ExcludedTypes = excludeTypes;
            ImportNamespaces = import ?? new Dictionary<string, string>();
            IncludedNamespaces = include ?? new List<string>();
            ExcludedNamespaces = exclude ?? new List<string>();
            Imports = new HashSet<string>();
            ExportAsClass = exportAsClass;
            AllowGeneric = generateGenericClasses;

            var res = GetTypescript(assemblies);
            File.WriteAllText(filePath, res);

            UnityEngine.Debug.Log("Saved typescript models to: " + filePath);
        }

        static string GetTypescript(List<Assembly> assemblies)
        {
            var types = assemblies.Distinct().SelectMany(a => a.GetTypes()).Where(x => filterType(x, AllowGeneric)).OrderBy(x => x.Namespace)
                .GroupBy(x => GetNameWithoutGenericArity(x.ToString()))
                .Select(x => x.OrderByDescending(x => x.GetGenericArguments().Length).First())
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
                            curName = string.IsNullOrWhiteSpace(curName) ? split : $"{curName}.{split}";
                            sb.Append($"{spaces()}export namespace {split} {{{n}");
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

                if (type.IsEnum)
                {
                    sb.Append($"{bl}export enum {getTypesScriptType(type, false, true)} {{{n}");
                    var fields = type.GetFields().Where(x => x.Name != "value__");

                    foreach (var info in fields)
                        sb.Append($"{bl1}{info.Name} = {getTypeScriptValue(info.GetRawConstantValue())},{n}");
                }
                else
                {
                    sb.Append($"{bl}{(ExportAsClass && !type.IsInterface ? "export declare class" : "export interface")} {getTypesScriptType(type, false, true, AllowGeneric, " = any")} {{{n}");

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
                                    !x.PropertyType.IsPointer);
                    var fields = type.GetFields(BindingFlags.Instance | BindingFlags.Static | BindingFlags.Public)
                        .Where(x => !x.IsSpecialName &&
                                    !x.FieldType.IsPointer);
                    var methods = type.GetMethods(BindingFlags.Instance | BindingFlags.Static | BindingFlags.Public)
                        .Where(x => !x.IsSpecialName &&
                                    !(x.ReturnType.IsByRef || x.ReturnType.IsPointer) &&
                                    !x.GetParameters().Any(p => p.ParameterType.IsByRef || p.ParameterType.IsPointer) &&
                                    !x.IsGenericMethod)
                        .GroupBy(x => x.Name);

                    foreach (var info in props)
                        sb.Append($"{bl1}{getTypeScriptString(info)}{n}");

                    foreach (var info in fields)
                        sb.Append($"{bl1}{getTypeScriptString(info)}{n}");

                    foreach (var info in methods)
                        sb.Append($"{bl1}{getTypeScriptString(info)}{n}");
                }

                sb.Append($"{bl}}}{n}");
            }

            var importGroups = Imports.GroupBy(x => ImportNamespaces[x]);

            return $"//{n}" +
                $"// Types in assemblies: {string.Join(", ", assemblies.Select(x => x.GetName().Name))}{n}" +
                $"// Generated {DateTime.Now}{n}" +
                $"//{n}" +
                $"{string.Join(n, importGroups.Select(x => $"import {{ {string.Join(",", x)} }} from './{x.Key}';"))}{n}" +
                n +
                sb;
        }

        static bool filterType(Type t, bool allowGeneric = false)
        {
            return t != null &&
              IncludedNamespaces.Any(x => t.FullName.StartsWith(x + ".")) &&
              (t.DeclaringType == null || filterType(t.DeclaringType, allowGeneric)) &&
              (!ExcludedNamespaces.Any(x => t.Namespace.StartsWith(x))) &&
              (t.IsPublic || t.IsNestedPublic) &&
              !typeof(Attribute).IsAssignableFrom(t) &&
              !t.FullName.Contains("<") &&
              (allowGeneric || !t.IsGenericType || t.IsEnum);
        }

        static string getTypeScriptString(PropertyInfo info)
        {
            var isStatic = info.GetAccessors(true)[0].IsStatic;
            var typeString = getTypesScriptType(info.PropertyType, true, false, AllowGeneric && !isStatic);
            var isNullable = info.PropertyType.ToString().Contains("Nullable");

            return string.Format("{3}{0}{4}: {1};{2}",
              info.Name,
              typeString,
              typeString == "any" ? " // " + info.PropertyType : "",
              isStatic ? "static " : "",
              isNullable ? "?" : ""
            );
        }

        static string getTypeScriptString(FieldInfo info)
        {
            var isStatic = info.IsStatic;
            var typeString = getTypesScriptType(info.FieldType, true, false, AllowGeneric && !isStatic);
            var isNullable = info.FieldType.ToString().Contains("Nullable");

            return string.Format("{3}{0}{4}: {1};{2}",
              info.Name,
              typeString,
              typeString == "any" ? " // " + info.FieldType : "",
              isStatic ? "static " : "",
              isNullable ? "?" : ""
            );
        }

        static string getTypeScriptString(IGrouping<string, MethodInfo> list)
        {
            var info = list.First();
            var isStatic = info.IsStatic;
            var types = string.Join(" | ", list.Select(x => "(" + getTypeScriptString(x) + ")"));

            return string.Format("{0}{1}: {2};",
              isStatic ? "static " : "",
              info.Name,
              types
            );
        }

        static string getTypeScriptString(MethodInfo info)
        {
            var retType = getTypesScriptType(info.ReturnType, true, false, AllowGeneric && !info.IsStatic);
            var args = string.Join(", ", info.GetParameters().Select(x => getTypeScriptString(x, AllowGeneric && !info.IsStatic)));

            return string.Format("({0}) => {1}",
              args,
              retType
            );
        }

        static string getTypeScriptString(ConstructorInfo info)
        {
            var args = string.Join(", ", info.GetParameters().Select(x => getTypeScriptString(x, true)));

            return string.Format("constructor({0});", args);
        }

        static string getTypeScriptString(ParameterInfo info, bool allowGeneric)
        {
            var typeString = getTypesScriptType(info.ParameterType, true, false, allowGeneric);
            var isParams = info.GetCustomAttribute(typeof(ParamArrayAttribute), false) != null;

            var keywords = new HashSet<string> { "arguments", "function", "finally" };

            return string.Format("{3}{0}{2}: {1}",
                keywords.Contains(info.Name) ? info.Name + "CS" : info.Name,
                typeString,
                info.IsOptional ? "?" : "",
                isParams ? "..." : ""
            );
        }

        static string getTypeScriptValue(object val)
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


        static string getTypesScriptType(Type type, bool withNs, bool skipKnownTypes = false, bool allowGeneric = false, string suffixGeneric = "")
        {
            var propertyType = type.ToString();
            var genArgs = type.GetGenericArguments();

            if (ExcludedTypes.Contains(propertyType)) return "any";

            if (!skipKnownTypes)
            {
                switch (propertyType)
                {
                    case "System.Void":
                        return "void";

                    case "System.Dynamic.ExpandoObject":
                        return "Record<string, any>";

                    case "System.String":
                        return "string";

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

            if (allowGeneric && type.IsGenericParameter) return withNs ? propertyType : type.Name;

            if (allowGeneric && type.IsGenericType)
            {
                var gens = genArgs.Select(x => getTypesScriptType(x, withNs, skipKnownTypes, allowGeneric)).ToList();

                if (!skipKnownTypes)
                {
                    if (propertyType.StartsWith("System.Action") || propertyType.StartsWith("System.Func"))
                    {
                        var retType = propertyType.StartsWith("System.Action") || gens.Count == 0 ? "void" : gens.Last();
                        if (propertyType.StartsWith("System.Action")) gens = gens.Take(gens.Count - 1).ToList();
                        var args = string.Join(", ", gens.Select((x, i) => $"arg{i}: {x}"));

                        return string.Format("(({0}) => {1})",
                          args,
                          retType
                        );
                    }
                }

                var nameWithoutGeneric = GetNameWithoutGenericArity(withNs ? propertyType : type.Name);
                var gn = string.Join(", ", gens.Select(x => x + suffixGeneric));
                return $"{nameWithoutGeneric}<{gn}>";
            }

            if (typeof(Attribute).IsAssignableFrom(type)) return "any";
            if (!type.IsEnum && propertyType.Contains("`")) return "any";
            if (type.DeclaringType != null)
            {
                var parent = getTypesScriptType(type.DeclaringType, withNs, skipKnownTypes, allowGeneric);
                if (parent == "any") return "any";
                return parent + "_" + type.Name;
            }
            if (!skipKnownTypes && ExcludedNamespaces.Any(x => propertyType.StartsWith(x + "."))) return "any";
            if (IncludedNamespaces.Any(x => propertyType.StartsWith(x + "."))) return (withNs ? (type.Namespace + ".") : "") + type.Name;

            var importing = ImportNamespaces.FirstOrDefault(x => propertyType.StartsWith(x.Key + "."));
            if (!string.IsNullOrWhiteSpace(importing.Key))
            {
                Imports.Add(importing.Key);
                return (withNs ? (type.Namespace + ".") : "") + type.Name;
            }

            return "any";
        }

        public static string GetNameWithoutGenericArity(string name)
        {
            int index = name.IndexOf('`');
            return index == -1 ? name : name.Substring(0, index);
        }
    }
}
