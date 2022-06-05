using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Reflection;

namespace QuickJS.Binding
{
    public class TSModuleCodeGen : IDisposable
    {
        protected CodeGenerator cg;
        protected TypeBindingInfo typeBindingInfo;

        protected static HashSet<Type> _noImportTypes = new HashSet<Type>(new Type[]
        {
            typeof(void),
            typeof(string),
        });

        /// <summary>
        /// 当前模块名
        /// </summary>
        protected string tsModule;
        protected TSModuleBindingInfo moduleBindingInfo;

        public class ModuleInfo
        {
            // entry-name => alias-name
            // 引用此模块中类型的命名映射表 
            public Dictionary<string, string> alias = new Dictionary<string, string>();
        }

        protected bool _jsbImport;

        // module-name => module-info
        // 引用的模块列表
        protected Dictionary<string, ModuleInfo> _modules = new Dictionary<string, ModuleInfo>();

        // unique alias-name
        protected HashSet<string> _uniqueNames = new HashSet<string>();

        public TSModuleCodeGen(CodeGenerator cg, TypeBindingInfo typeBindingInfo)
        {
            this.cg = cg;
            this.typeBindingInfo = typeBindingInfo;
            this.tsModule = string.IsNullOrEmpty(typeBindingInfo.tsTypeNaming.jsModule) ? cg.bindingManager.prefs.defaultJSModule : typeBindingInfo.tsTypeNaming.jsModule;
            this.moduleBindingInfo = cg.bindingManager.GetExportedModule(typeBindingInfo.tsTypeNaming.jsModule);

            this.cg.tsDeclare.BeginPart();
            this.cg.tsDeclare.AppendLine($"declare module \"{this.tsModule}\" {{");
            this.cg.tsDeclare.AddTabLevel();

            CollectImports();
            WriteImports();
        }

        public void Dispose()
        {
            this.cg.tsDeclare.DecTabLevel();
            this.cg.tsDeclare.AppendLine("}");
            this.cg.tsDeclare.EndPart();
        }

        private void CollectImports()
        {
            if (typeBindingInfo.transform.requiredDefines != null)
            {
                _jsbImport = true;
            }

            AddModuleAlias(typeBindingInfo.super);

            foreach (var @interface in typeBindingInfo.interfaces)
            {
                AddModuleAlias(@interface);
            }

            foreach (var entry in typeBindingInfo.fields)
            {
                AddModuleAlias(entry.Value.fieldType);
            }

            foreach (var entry in typeBindingInfo.properties)
            {
                AddModuleAlias(entry.Value.propertyType);
            }

            foreach (var entry in typeBindingInfo.events)
            {
                AddModuleAlias(entry.Value.eventInfo.EventHandlerType);
            }

            foreach (var @delegate in typeBindingInfo.delegates)
            {
                AddModuleAlias(@delegate.Value.delegateType);
            }

            // 处理构造函数中产生的类型引用
            foreach (var entryVariant in typeBindingInfo.constructors.variants)
            {
                foreach (var method in entryVariant.Value.plainMethods)
                {
                    foreach (var p in method.method.GetParameters())
                    {
                        AddModuleAlias(p.ParameterType);
                    }
                }

                foreach (var method in entryVariant.Value.varargMethods)
                {
                    foreach (var p in method.method.GetParameters())
                    {
                        AddModuleAlias(p.ParameterType);
                    }
                }
            }

            // 处理其他方法中产生的类型引用
            var methods = typeBindingInfo.staticMethods.Select(s => s.Value)
                .Concat(typeBindingInfo.methods.Select(s => s.Value));

            foreach (var entry in methods)
            {
                foreach (var entryVariant in entry.variants)
                {
                    foreach (var method in entryVariant.Value.plainMethods)
                    {
                        AddModuleAlias(method.method.ReturnType);
                        foreach (var p in method.method.GetParameters())
                        {
                            AddModuleAlias(p.ParameterType);
                        }
                    }

                    foreach (var method in entryVariant.Value.varargMethods)
                    {
                        AddModuleAlias(method.method.ReturnType);
                        foreach (var p in method.method.GetParameters())
                        {
                            AddModuleAlias(p.ParameterType);
                        }
                    }
                }
            }
        }

        private void WriteImports()
        {
            if (_jsbImport)
            {
                this.cg.tsDeclare.AppendLine($"import * as jsb from \"jsb\";");
            }

            foreach (var me in _modules)
            {
                var moduleName = me.Key;
                var moduleInfo = me.Value;
                var count = moduleInfo.alias.Count;

                if (count > 0)
                {
                    var index = 0;

                    this.cg.tsDeclare.Append($"import {{ ");
                    foreach (var pair in moduleInfo.alias)
                    {
                        var entry = pair.Key;
                        var alias = pair.Value;

                        if (entry != alias)
                        {
                            this.cg.tsDeclare.AppendL($"{entry} as {alias}");
                        }
                        else
                        {
                            this.cg.tsDeclare.AppendL($"{entry}");
                        }

                        if (index != count - 1)
                        {
                            this.cg.tsDeclare.AppendL(", ");
                        }
                        ++index;
                    }
                    this.cg.tsDeclare.AppendL($" }} from \"{moduleName}\";");
                    this.cg.tsDeclare.AppendLine();
                }
            }
        }

        private void AddModuleAlias(Type type)
        {
            if (type == null)
            {
                return;
            }

            if (type.IsPrimitive)
            {
                if (type == typeof(byte))
                {
                    _jsbImport = true;
                }
                return;
            }

            if (_noImportTypes.Contains(type))
            {
                return;
            }

            if (type == typeof(Enum))
            {
                AddModuleAlias("System", "Enum");
                return;
            }

            if (BindingManager.IsConstructedGenericType(type))
            {
                if (type.GetGenericTypeDefinition() == typeof(Nullable<>))
                {
                    _jsbImport = true;
                }

                foreach (var g in type.GetGenericArguments())
                {
                    AddModuleAlias(g);
                }
                
                AddModuleAlias(type.GetGenericTypeDefinition());
            }

            if (type.IsArray || type.IsByRef)
            {
                _jsbImport = true;
                AddModuleAlias("System", "Array");
                AddModuleAlias(type.GetElementType());
                return;
            }

            if (!_jsbImport)
            {
                var defs = new HashSet<string>();
                this.cg.bindingManager.CollectTypeRequiredDefines(defs, type);
                this.cg.bindingManager.CollectTypeRequiredDefines(defs, type.DeclaringType);
                if (defs.Count != 0)
                {
                    _jsbImport = true;
                }
            }

            if (type.BaseType == typeof(MulticastDelegate))
            {
                var delegateBindingInfo = this.cg.bindingManager.GetDelegateBindingInfo(type);

                if (delegateBindingInfo != null)
                {
                    if (!_jsbImport && !string.IsNullOrEmpty(delegateBindingInfo.requiredDefines))
                    {
                        _jsbImport = true;
                    }
                    AddModuleAlias(delegateBindingInfo.returnType);
                    foreach (var p in delegateBindingInfo.parameters)
                    {
                        AddModuleAlias(p.ParameterType);
                    }
                }
                return;
            }

            var tsTypeNaming = cg.bindingManager.GetTSTypeNaming(type);

            if (tsTypeNaming != null)
            {
                // 避免引入自身
                if (tsTypeNaming.jsModule != this.typeBindingInfo.tsTypeNaming.jsModule)
                {
                    AddModuleAlias(tsTypeNaming.jsModule, tsTypeNaming.jsModuleImportAccess);
                }
            }
            else
            {
                AddModuleAlias(type.BaseType);
            }
        }

        private void AddModuleAlias(string moduleName, string accessName)
        {
            // 手工添加的模块访问需要过滤掉本模块自身 
            // 例如: AddModuleAlias("System", "Array")
            if (moduleName == this.tsModule)
            {
                return;
            }

            ModuleInfo reg;
            if (!_modules.TryGetValue(moduleName, out reg))
            {
                reg = _modules[moduleName] = new ModuleInfo();
            }

            if (!reg.alias.ContainsKey(accessName))
            {
                var uniqueName = GetUniqueAccess(accessName, 0);
                reg.alias.Add(accessName, uniqueName);
            }
        }

        // 如果是当前模块中的命名, 则拥有绝对优先权
        private string GetUniqueAccess(string uname, int index)
        {
            var rename = index == 0 ? uname : uname + index;

            if (this.moduleBindingInfo.ContainsKey(rename) || _uniqueNames.Contains(rename))
            {
                return GetUniqueAccess(uname, index + 1);
            }

            _uniqueNames.Add(rename);
            return rename;
        }

        #region TS 命名辅助

        public string GetAlias(Type type)
        {
            var tsTypeNaming = this.cg.bindingManager.GetTSTypeNaming(type);
            ModuleInfo moduleInfo;
            if (_modules.TryGetValue(tsTypeNaming.jsModule, out moduleInfo))
            {
                string alias;
                if (moduleInfo.alias.TryGetValue(tsTypeNaming.jsModuleAccess, out alias))
                {
                    return alias;
                }
            }

            return null;
        }

        // 获取 type 在 typescript 中对应类型名
        public string GetTSTypeFullName(Type type)
        {
            return GetTSTypeFullName(type, false);
        }

        public string GetTSTypeFullName(Type type, bool isOut)
        {
            if (type == null || type == typeof(void))
            {
                return "void";
            }

            if (type.IsByRef)
            {
                if (isOut)
                {
                    return $"{this.cg.bindingManager.GetDefaultTypePrefix()}Out<{GetTSTypeFullName(type.GetElementType())}>";
                }
                return $"{this.cg.bindingManager.GetDefaultTypePrefix()}Ref<{GetTSTypeFullName(type.GetElementType())}>";
                // return GetTSTypeFullName(type.GetElementType());
            }

            List<string> names;
            if (this.cg.bindingManager.GetTSTypeNameMap(type, out names))
            {
                return names.Count > 1 ? $"({String.Join(" | ", names)})" : names[0];
            }

            if (type == typeof(Array))
            {
                return "Array<any>";
            }

            if (type == typeof(ScriptPromise))
            {
                return "Promise<void>";
            }

            if (type.IsSubclassOf(typeof(ScriptPromise)))
            {
                if (type.IsGenericType)
                {
                    var gt = type.GetGenericArguments()[0];
                    return "Promise<" + GetTSTypeFullName(gt) + ">";
                }
                return "Promise<any>";
            }

            if (type.IsArray)
            {
                var elementType = type.GetElementType();
                var tsFullName = GetTSTypeFullName(elementType);
                var rank = type.GetArrayRank();

                if (rank == 1)
                {
                    return "Array<" + tsFullName + ">";
                }
                return "Array<" + tsFullName + ", " + rank + ">";
            }

            var info = this.cg.bindingManager.GetExportedType(type);
            if (info != null)
            {
                var gDef = GetTSGenericTypeDefinition(type);
                if (!string.IsNullOrEmpty(gDef))
                {
                    return gDef;
                }

                var tsTypeNaming = info.tsTypeNaming;
                if (tsTypeNaming.jsModule == this.tsModule)
                {
                    return CodeGenUtils.Concat(".", tsTypeNaming.jsModuleAccess, tsTypeNaming.jsLocalName);
                }

                var localAlias = GetAlias(type);
                if (localAlias != null)
                {
                    return CodeGenUtils.Concat(".", localAlias, tsTypeNaming.jsLocalName);
                }
                return tsTypeNaming.jsFullName;
            }

            if (type.BaseType == typeof(MulticastDelegate))
            {
                var delegateBindingInfo = this.cg.bindingManager.GetDelegateBindingInfo(type);
                if (delegateBindingInfo != null)
                {
                    // var nargs = delegateBindingInfo.parameters.Length;
                    var ret = GetTSTypeFullName(delegateBindingInfo.returnType);
                    // var t_arglist = (nargs > 0 ? ", " : "") + GetTSArglistTypes(delegateBindingInfo.parameters, false);
                    var v_arglist = GetTSArglistTypes(delegateBindingInfo.parameters, true);
                    // return $"{CodeGenerator.NamespaceOfInternalScriptTypes}.Delegate{nargs}<{ret}{t_arglist}> | (({v_arglist}) => {ret})";
                    return $"({v_arglist}) => {ret}";
                }
            }

            if (type.IsGenericType)
            {
                if (type.GetGenericTypeDefinition() == typeof(Nullable<>))
                {
                    var gArgs = type.GetGenericArguments();
                    var gArgsTS = GetTSTypeFullName(gArgs[0]);
                    return $"{this.cg.bindingManager.GetDefaultTypePrefix()}Nullable<{gArgsTS}>";
                }
            }
            else
            {
                if (type.IsGenericParameter)
                {
                    return type.Name;
                }
            }

            return "any";
        }

        // 生成参数对应的字符串形式参数列表定义 (typescript)
        public string GetTSArglistTypes(ParameterInfo[] parameters, bool withVarName)
        {
            var size = parameters.Length;
            var arglist = "";
            if (size == 0)
            {
                return arglist;
            }
            for (var i = 0; i < size; i++)
            {
                var parameter = parameters[i];
                var typename = GetTSTypeFullName(parameter.ParameterType, parameter.IsOut);
                if (withVarName)
                {
                    arglist += this.cg.bindingManager.GetTSVariable(parameter) + ": ";
                }
                arglist += typename;
                if (i != size - 1)
                {
                    arglist += ", ";
                }
            }
            return arglist;
        }

        // 获取实现的接口的ts声明
        public string GetTSInterfacesName(Type type)
        {
            var interfaces = type.GetInterfaces();
            var str = "";

            foreach (var @interface in interfaces)
            {
                var interfaceBindingInfo = this.cg.bindingManager.GetExportedType(@interface);
                if (interfaceBindingInfo != null)
                {
                    // Debug.Log($"{type.Name} implements {@interface.Name}");
                    str += GetTSTypeFullName(interfaceBindingInfo.type) + ", ";
                }
            }

            var gDef = GetTSGenericTypeDefinition(type);
            if (gDef.Length > 0)
            {
                str += gDef + ", ";
            }

            if (str.Length > 0)
            {
                str = str.Substring(0, str.Length - 2);
            }
            return str;
        }

        // 如果 type 是一个具体泛型类, 则返回 Sample<String> 形式的字符串表示
        public string GetTSGenericTypeDefinition(Type type)
        {
            var str = "";

            if (BindingManager.IsConstructedGenericType(type))
            {
                var gType = type.GetGenericTypeDefinition();
                var gTypeInfo = this.cg.bindingManager.GetExportedType(gType);
                if (gTypeInfo != null)
                {
                    var templateArgs = "";
                    var tArgs = type.GetGenericArguments();
                    for (var i = 0; i < tArgs.Length; i++)
                    {
                        templateArgs += GetTSTypeFullName(tArgs[i]);
                        if (i != tArgs.Length - 1)
                        {
                            templateArgs += ", ";
                        }
                    }

                    str += gTypeInfo.tsTypeNaming.MakeGenericJSFullTypeName(templateArgs);
                }
            }

            if (str.Length > 0)
            {
                str = str.Substring(0, str.Length - 2);
            }
            return str;
        }

        #endregion
    }
}