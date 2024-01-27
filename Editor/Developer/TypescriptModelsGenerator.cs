using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using Newtonsoft.Json;
using ReactUnity.Helpers;
using ReactUnity.Helpers.TypescriptUtils;
using ReactUnity.Reactive;

namespace ReactUnity.Editor.Developer
{
    [ExcludeFromCodeCoverage]
    public class TypescriptModelsGenerator
    {
        [Flags]
        public enum MemberFlags
        {
            Constructor = 1,
            Methods = 2,
            Fields = 4,
            Properties = 8,
            Indexer = 16,

            Default = Constructor | Methods | Fields | Properties,
            All = Default | Indexer,
        }

        public enum EnumExportType
        {
            Enum = 0,
            Keys = 1,
            Values = 2,
        }

        #region Options

        public List<Assembly> Assemblies { get; set; } = new List<Assembly>();
        public List<string> IncludedNamespaces { get; set; } = null;
        public List<string> ExcludedNamespaces { get; set; } = null;
        public List<string> ExcludedTypes { get; set; } = null;
        public Dictionary<string, string> ImportNamespaces { get; set; } = new Dictionary<string, string>();
        public Dictionary<string, string> Remaps { get; set; } = new Dictionary<string, string>();
        public Dictionary<Type, Type> TypeRemaps { get; set; } = new Dictionary<Type, Type>();
        public Dictionary<string, string> Aliases { get; set; } = new Dictionary<string, string>();
        public bool ExportAsClass { get; set; } = true;
        public bool AllowGeneric { get; set; } = false;
        public bool AllowPointer { get; set; } = false;
        public bool WriteDocs { get; set; } = false;
        public bool IncludeExterns { get; set; } = false;
        public bool IsExternal { get; set; } = false;
        public MemberFlags Members { get; set; } = MemberFlags.Default;
        public EnumExportType EnumExport { get; set; } = EnumExportType.Enum;
        public string LineEnding = "\n";

        #endregion


        #region State

        readonly HashSet<string> Imports = new HashSet<string>();
        readonly HashSet<string> Helpers = new HashSet<string>();

        #endregion

        public string n => LineEnding;

        public void GenerateTo(string filePath)
        {
            var extension = Path.GetExtension(filePath);
            if (extension != ".ts")
            {
                throw new InvalidOperationException("File must have '.ts' extension");
            }

            var res = GetTypescriptForAllTypes();

            var directory = Path.GetDirectoryName(filePath);
            if (!Directory.Exists(directory)) Directory.CreateDirectory(directory);
            File.WriteAllText(filePath, res);
        }

        public string GetTypescriptForAllTypes()
        {
            var allTypes = Assemblies.Distinct()
                .SelectMany(a => a.GetTypes())
                .Distinct()
                .Where(x => filterType(x, AllowGeneric));

            var types = allTypes
                .OrderBy(x => x.Namespace ?? "")
                .GroupBy(x => GetHandle(x, true))
                .Select(x => x.OrderByDescending(t => t.GetGenericArguments().Length).First())
                .Append(null);

            return GetTypescriptFor(types.ToList());
        }

        public string GetTypescriptFor(List<Type> types)
        {
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
                    sb.Append(getEnumDefinition(type, bl, bl1, declare));
                }
                else
                {
                    var extends = type.GetCustomAttribute<TypescriptListInterfaces>() != null ? type.GetInterfaces() : new Type[0];
                    var extendsString = extends.Length == 0 ? "" : $" {(type.IsInterface ? "extends" : "implements")} " +
                        string.Join(", ", extends.Select(x => getTypesScriptType(x, true, true, AllowGeneric)));

                    var typeName = getTypesScriptType(type, false, true, AllowGeneric, " = any");
                    sb.Append($"{bl}{(ExportAsClass && !type.IsInterface ? $"export {declare}class" : $"export {declare}interface")} {typeName}{extendsString} {{{n}");

                    if (ExportAsClass)
                    {
                        var ctors = type.GetConstructors(BindingFlags.Instance | BindingFlags.Public).Where(x =>
                            !x.GetParameters().Any(p => p.ParameterType.IsByRef || (!AllowPointer && p.ParameterType.IsPointer)));
                        if (Members.HasFlag(MemberFlags.Constructor))
                            foreach (var info in ctors)
                                sb.Append($"{bl1}{getTypeScriptString(info)}{n}");
                    }

                    var includeStatic = type.IsInterface ? BindingFlags.Instance : BindingFlags.Static;
                    var props = type.GetProperties(BindingFlags.Instance | includeStatic | BindingFlags.Public | BindingFlags.NonPublic)
                        .Where(x => !x.IsSpecialName &&
                                    x.GetIndexParameters().Length == 0 &&
                                    !(!AllowPointer && x.PropertyType.IsPointer) &&
                                    (x.GetCustomAttribute<TypescriptExclude>() == null) &&
                                    (x.GetCustomAttribute<JsonIgnoreAttribute>() == null) &&
                                    ((x.GetCustomAttribute<TypescriptInclude>() != null) || (x.GetGetMethod()?.IsPublic ?? false) || (x.GetSetMethod()?.IsPublic ?? false))
                                    )
                        .GroupBy(x => x.Name)
                        .Select(g => g.First());

                    var fields = type.GetFields(BindingFlags.Instance | includeStatic | BindingFlags.Public | BindingFlags.NonPublic)
                        .Where(x => !x.IsSpecialName &&
                                    !(!AllowPointer && x.FieldType.IsPointer) &&
                                    (x.GetCustomAttribute<TypescriptExclude>() == null) &&
                                    (x.GetCustomAttribute<JsonIgnoreAttribute>() == null) &&
                                    ((x.GetCustomAttribute<TypescriptInclude>() != null) || x.IsPublic)
                                    );

                    var methods = type.GetMethods(BindingFlags.Instance | includeStatic | BindingFlags.Public | BindingFlags.NonPublic)
                        .Where(x => !x.IsSpecialName &&
                                    !(x.ReturnType.IsByRef || (!AllowPointer && x.ReturnType.IsPointer)) &&
                                    !x.GetParameters().Any(p => p.ParameterType.IsByRef || (!AllowPointer && p.ParameterType.IsPointer)) &&
                                    !x.IsGenericMethod &&
                                    (x.GetCustomAttribute<TypescriptExclude>() == null) &&
                                    (x.GetCustomAttribute<JsonIgnoreAttribute>() == null) &&
                                    ((x.GetCustomAttribute<TypescriptInclude>() != null) || x.IsPublic ||
                                        (IncludeExterns && x.IsStatic && x.GetMethodBody() == null))
                                    );

                    var indexer = type.GetProperties(BindingFlags.Instance | includeStatic | BindingFlags.Public)
                        .FirstOrDefault(x => x.GetIndexParameters().Length == 1);

                    var methodsGrouped = methods.GroupBy(x => x.Name);


                    if (Members.HasFlag(MemberFlags.Indexer) && indexer != null)
                        sb.Append($"{bl1}[key: string]: any;{n}");

                    if (Members.HasFlag(MemberFlags.Properties))
                        foreach (var info in props)
                            sb.Append($"{bl1}{getTypeScriptString(info)}{n}");

                    if (Members.HasFlag(MemberFlags.Fields))
                        foreach (var info in fields)
                            sb.Append($"{bl1}{getTypeScriptString(info)}{n}");

                    //foreach (var info in methodsGrouped)
                    //    sb.Append($"{bl1}{getTypeScriptString(info)}{n}");

                    if (Members.HasFlag(MemberFlags.Methods))
                        foreach (var info in methods)
                            sb.Append($"{bl1}{getTypeScriptString(info, bl1)}{n}");

                    sb.Append($"{bl}}}{n}");
                }
            }

            var importGroups = Imports.GroupBy(x => ImportNamespaces[x]);
            var remapGroups = Remaps.GroupBy(x => x.Value, x => x.Key);

            var helpers = "";

            if (Helpers.Contains("pointer"))
            {
                helpers += "interface Pointer<T> {" + n;
                helpers += "  type?: T;" + n;
                helpers += "  __pointer: true;" + n;
                helpers += "}" + n;
                helpers += n;
            }

            if (Helpers.Contains("ref"))
            {
                helpers += "interface Ref<T> {" + n;
                helpers += "  type?: T;" + n;
                helpers += "  __ref: true;" + n;
                helpers += "}" + n;
                helpers += n;
            }

            if (Helpers.Contains("byte"))
            {
                helpers += "type Byte = number;" + n;
                helpers += n;
            }

            var imports = importGroups.Concat(remapGroups).OrderBy(x => x.Key);

            if (Aliases != null && Aliases.Any())
            {
                sb.Append(n);

                foreach (var alias in Aliases)
                {
                    sb.Append($"export import {alias.Key} = {alias.Value};");
                    sb.Append(n);
                }
            }

            return $"//{n}" +
                $"// Types in assemblies: {string.Join(", ", types.Where(type => type != null).Select(type => type.Assembly).Select(x => x.GetName().Name).Distinct())}{n}" +
                $"// Generated {DateTime.Now}{n}" +
                $"//{n}" +
                $"/* eslint-disable */{n}{n}" +
                $"{string.Join(n, imports.Select(x => $"import {{ {string.Join(", ", x.OrderBy(y => y))} }} from '{x.Key}';"))}" +
                (imports.Any() ? (n + n) : "") +
                helpers +
                sb;
        }

        bool filterType(Type t, bool allowGeneric = false)
        {
            var fullName = t.FullName;

            return t != null &&
              (t.DeclaringType == null || filterType(t.DeclaringType, allowGeneric)) &&
              !fullName.Contains("<") &&
              (allowGeneric || !t.IsGenericType || t.IsEnum) &&
              (t.GetCustomAttribute<TypescriptExclude>() == null) &&
              (t.GetCustomAttribute<JsonIgnoreAttribute>() == null) &&
              ((t.GetCustomAttribute<TypescriptInclude>() != null) ||
                  (IncludedNamespaces == null || IncludedNamespaces.Any(x => fullName.FastStartsWith(x + "."))) &&
                  (ExcludedNamespaces == null || !ExcludedNamespaces.Any(x => (t.Namespace ?? "").FastStartsWith(x))) &&
                  (t.IsPublic || t.IsNestedPublic) &&
                  !typeof(Attribute).IsAssignableFrom(t)
              );
        }

        string getEnumDefinition(Type type, string bl, string bl1, string declare)
        {
            var sb = new StringBuilder();

            var fields = type.GetFields().Where(x => x.Name != "value__");

            var kvps = fields.Select(info => new KeyValuePair<string, string>(info.Name, getTypeScriptValue(info.GetRawConstantValue()))).ToList();

            var name = getTypesScriptType(type, false, true);

            if (EnumExport == EnumExportType.Keys)
            {
                var keys = string.Join(" | ", kvps.Select(x => $"'{x.Key}'").ToArray());
                sb.Append($"{bl}export {declare}type {name} = {keys};{n}");
            }
            else if (EnumExport == EnumExportType.Values)
            {
                var keys = string.Join(" | ", kvps.Select(x => $"{x.Value}").ToArray());
                sb.Append($"{bl}export {declare}type {name} = {keys};{n}");
            }
            else
            {
                sb.Append($"{bl}export {declare}enum {name} {{{n}");
                foreach (var info in fields)
                    sb.Append($"{bl1}{info.Name} = {getTypeScriptValue(info.GetRawConstantValue())},{n}");
                sb.Append($"{bl}}}");
            }

            sb.Append(n);

            return sb.ToString();
        }

        string getTypeScriptString(PropertyInfo info)
        {
            var isStatic = info.GetAccessors(true)[0].IsStatic;
            var remap = info.GetCustomAttribute<TypescriptRemap>();
            var remapType = info.GetCustomAttribute<TypescriptRemapType>()?.TargetType;
            var typeString = RegisterRemap(remap) ?? getTypesScriptType(remapType ?? info.PropertyType, true, false, AllowGeneric && !isStatic);
            var isNullable = info.PropertyType.ToString().Contains("Nullable");

            return string.Format("{3}{0}{4}: {1};{2}",
              getMemberName(info),
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
              getMemberName(info),
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
            var types = string.Join(" | ", list.Select(x => getTypeScriptStringForArgs(x, !isStatic)));

            return string.Format("{0}{1}: {2};",
              isStatic ? "static " : "",
              escapePropertyName(info.Name),
              types
            );
        }

        string getTypeScriptString(MethodInfo info, string indent)
        {
            var isStatic = info.IsStatic;
            var retType = getTypesScriptType(info.ReturnType, true, false, AllowGeneric && !isStatic);
            var args = string.Join(", ", info.GetParameters().Select(x => getTypeScriptString(x, AllowGeneric && !isStatic)));

            var docs = new List<string>();
            if (info.IsPrivate) docs.Add("@private");
            if (isStatic && info.GetMethodBody() == null) docs.Add("@external");
            var modifiers = FormatJSDocLines(docs, indent);

            return string.Format("{4}{0}{1}({2}): {3};",
              isStatic ? "static " : "",
              escapePropertyName(info.Name),
              args,
              retType,
              modifiers
            );
        }

        string getMemberName(MemberInfo info, bool allowQuoting = true)
        {
            var prop = info.GetCustomAttribute<JsonPropertyAttribute>();
            var name = prop?.PropertyName ?? info.Name;
            return escapePropertyName(name, allowQuoting);
        }

        string escapePropertyName(string originalName, bool allowQuoting = true)
        {
            var keywords = new HashSet<string> {
                "arguments", "function", "finally", "import", "export", "debugger",
                "const", "super", "extends", "implements", "instanceof", "typeof", "with",
                "new", "class", "throw", "catch", "if", "else", "do", "while", "for", "switch",
                "return", "this", "var", "true", "false", "void", "default", "case", "break",
                "continue", "enum", "null", "delete", "as", "public", "let", "package",
                "interface", "static", "private", "protected", "yield", "declare",
            };

            var isKeyword = keywords.Contains(originalName);

            var charsNeedEscape = new char[] { '<', '>', ':', ',', '.', '$', '@' };

            var needsEscape = charsNeedEscape.Any(x => originalName.Contains(x));

            if (isKeyword || needsEscape)
            {
                if (allowQuoting)
                {
                    return "'" + originalName + "'";
                }
                else
                {
                    if (isKeyword) return originalName + "CS";
                    return charsNeedEscape.Aggregate(originalName, (acc, cur) => originalName.Replace(cur, '_'));
                }
            }

            return originalName;
        }

        string getTypeScriptStringForArgs(MethodInfo info, bool allowGeneric)
        {
            var retType = getTypesScriptType(info.ReturnType, true, false, allowGeneric && AllowGeneric && !info.IsStatic);
            var args = string.Join(", ", info.GetParameters().Select(x => getTypeScriptString(x, allowGeneric && AllowGeneric && !info.IsStatic)));

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

            return string.Format("{3}{0}{2}: {1}",
                escapePropertyName(info.Name, false),
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
            if (!skipKnownTypes && TypeRemaps.TryGetValue(type, out var remappedType))
            {
                return getTypesScriptType(remappedType, withNs, skipKnownTypes, allowGeneric, suffixGeneric);
            }

            if (type.IsPointer)
            {
                Helpers.Add("pointer");
                var baseType = type.GetElementType();
                var baseTypeStr = getTypesScriptType(baseType, withNs, skipKnownTypes, allowGeneric, suffixGeneric);

                return $"Pointer<{baseTypeStr}>";
            }

            if (type.IsByRef)
            {
                Helpers.Add("ref");
                var baseType = type.GetElementType();
                var baseTypeStr = getTypesScriptType(baseType, withNs, skipKnownTypes, allowGeneric, suffixGeneric);

                return $"Ref<{baseTypeStr}>";
            }

            var remap = type.GetCustomAttribute<TypescriptRemap>();
            var remapType = type.GetCustomAttribute<TypescriptRemapType>()?.TargetType;

            if (remapType != null) type = remapType;


            if (!skipKnownTypes && type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Nullable<>))
            {
                var baseType = type.GetGenericArguments()[0];
                var baseTypeStr = getTypesScriptType(baseType, withNs, skipKnownTypes, allowGeneric, suffixGeneric);

                return $"{baseTypeStr} | undefined";
            }


            if (!skipKnownTypes && typeof(Delegate).IsAssignableFrom(type) && type != typeof(Delegate) && type != typeof(MulticastDelegate))
            {
                return getTypeScriptStringForArgs(type.GetMethod("Invoke"), allowGeneric);
            }

            var fullType = type.ToString();
            var genArgs = type.GetGenericArguments();
            var gens = genArgs.Select(x => getTypesScriptType(x, withNs, skipKnownTypes, allowGeneric)).ToList();
            var gn = string.Join(", ", gens.Select(x => x + suffixGeneric));

            var nameWithoutGeneric = GetNameWithoutGenericArity(withNs ? fullType : type.Name);

            var isRecord = type.IsGenericType &&
                (nameWithoutGeneric == "System.Collections.Generic.Dictionary" || nameWithoutGeneric == "System.Collections.Generic.IDictionary") &&
                (gens[0] == "string" || gens[0] == "number");


            if (!skipKnownTypes && remap != null) return RegisterRemap(remap);

            if (ExcludedTypes != null && ExcludedTypes.Contains(fullType)) return "any";

            if (!skipKnownTypes)
            {
                switch (fullType)
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
                    case "System.Int16":
                    case "System.Int32":
                    case "System.Int64":
                    case "System.UInt16":
                    case "System.UInt32":
                    case "System.UInt64":
                    case "System.Decimal":
                        return "number";

                    case "System.Boolean":
                        return "boolean";

                    default:
                        break;
                }

                if (!isRecord)
                {
                    if (type.IsArray) return getTypesScriptType(type.GetElementType(), withNs, skipKnownTypes, allowGeneric) + "[]";

                    var isList = type.IsGenericType &&
                        type.GetGenericTypeDefinition() == typeof(IList<>) &&
                        type.GetGenericTypeDefinition() != typeof(IReactive<>);

                    var hasGenericArguments = genArgs.Any();

                    if (isList && hasGenericArguments)
                        return getTypesScriptType(genArgs[0], withNs, skipKnownTypes, allowGeneric) + "[]";

                    var interfaces = type.GetTypeInfo().ImplementedInterfaces;
                    foreach (var intr in interfaces)
                    {
                        var intrIsList = intr.GetTypeInfo().IsGenericType &&
                            intr.GetGenericTypeDefinition() == typeof(IList<>) &&
                            intr.GetGenericTypeDefinition() != typeof(IReactive<>);

                        var intrGenArgs = intr.GetGenericArguments();

                        if (intrIsList && intrGenArgs.Any())
                            return getTypesScriptType(intrGenArgs[0], withNs, skipKnownTypes, allowGeneric) + "[]";
                    }
                }

                if (fullType.FastStartsWith("System.Action") || fullType.FastStartsWith("System.Func"))
                {
                    var retType = fullType.FastStartsWith("System.Action") || gens.Count == 0 ? "void" : gens.Last();
                    if (fullType.FastStartsWith("System.Func")) gens = gens.Take(gens.Count - 1).ToList();
                    var args = string.Join(", ", gens.Select((x, i) => $"arg{i}: {x}"));

                    return string.Format("(({0}) => {1})",
                      args,
                      retType
                    );
                }
            }

            if (!skipKnownTypes && ExcludedNamespaces != null && ExcludedNamespaces.Any(x => fullType.FastStartsWith(x + "."))) return "any";

            if (type.IsGenericParameter)
            {
                if (allowGeneric) return withNs ? fullType : type.Name;
                else return "any";
            }


            if (allowGeneric && isRecord) return $"Record<{gn}>";

            if (typeof(Attribute).IsAssignableFrom(type)) return "any";

            var fullName = GetHandle(type, withNs) +
                ((type.IsGenericType && allowGeneric) ? $"<{gn}>" : "");

            var importing = ImportNamespaces.FirstOrDefault(x => fullType.FastStartsWith(x.Key + "."));
            if (!string.IsNullOrWhiteSpace(importing.Key))
            {
                Imports.Add(importing.Key);
                return fullName;
            }

            if (IncludedNamespaces != null && IncludedNamespaces.Any(x => fullType.FastStartsWith(x + "."))) return fullName;

            if (IncludedNamespaces == null) return fullName;

            return "any";
        }

        string RegisterRemap(TypescriptRemap remap)
        {
            if (remap == null) return null;
            Remaps[remap.PropName] = IsExternal ? remap.ExternalFileName : remap.FileName;
            return remap.PropName;
        }

        string GetNameWithoutGenericArity(string name)
        {
            var index1 = name.IndexOf('`');
            var index2 = name.IndexOf('<');

            var index = index1 == -1 ? index2 : index2 == -1 ? index1 : Math.Min(index1, index2);
            return index == -1 ? name : name.Substring(0, index);
        }

        string GetHandle(Type type, bool withNs)
        {
            var handle = GetNameWithoutGenericArity(type.Name);

            var dt = type.DeclaringType;

            while (dt != null)
            {
                handle = GetNameWithoutGenericArity(dt.Name) + "_" + handle;
                dt = dt.DeclaringType;
            }

            if (withNs && !string.IsNullOrEmpty(type.Namespace)) handle = type.Namespace + "." + handle;

            return handle;
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
