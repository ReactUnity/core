using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Linq;
using System.Reflection;

namespace QuickJS.Binding
{
    public abstract class MethodBaseCodeGen<T> : IDisposable
    where T : MethodBase
    {
        protected CodeGenerator cg;

        // 方法参数数比较, 用于列表排序
        public static int MethodComparer(T a, T b)
        {
            var va = a.GetParameters().Length;
            var vb = b.GetParameters().Length;
            return va > vb ? 1 : ((va == vb) ? 0 : -1);
        }

        public MethodBaseCodeGen(CodeGenerator cg)
        {
            this.cg = cg;
        }

        protected virtual void OnBegin()
        {
        }

        public virtual void Dispose()
        {
        }

        protected virtual IEnumerable<string> GetRequiredDefines(MethodBase methodBase)
        {
            return null;
        }

        public string GetParamArrayMatchType(T method)
        {
            var parameters = method.GetParameters();
            var parameter = parameters[parameters.Length - 1];
            var typename = this.cg.bindingManager.GetCSTypeFullName(parameter.ParameterType.GetElementType());
            return $"typeof({typename})";
        }

        // 生成定参部分 type 列表 (首参前也会补",")
        public string GetFixedMatchTypes(T method, bool isVararg, bool isExtension)
        {
            var snippet = "";
            var parameters = method.GetParameters();
            var pIndex = isExtension ? 1 : 0;
            var length = isVararg ? parameters.Length - 1 : parameters.Length;
            var argIndex = 0;

            for (; pIndex < length; pIndex++)
            {
                var parameter = parameters[pIndex];
                var typename = this.cg.bindingManager.GetCSTypeFullName(parameter.ParameterType);

                if (parameter.ParameterType.IsByRef)
                {
                    snippet += $"Values.js_match_type_hint(ctx, argv[{argIndex}], typeof({typename}))";
                }
                else
                {
                    snippet += $"Values.js_match_type(ctx, argv[{argIndex}], typeof({typename}))";
                }

                if (pIndex != length - 1)
                {
                    snippet += " && ";
                }

                argIndex++;
            }

            return snippet;
        }

        public string Concat(List<string> args, string sp = ", ")
        {
            var len = args.Count;
            var res = "";
            for (var i = 0; i < len; i++)
            {
                res += args[i];
                if (i != len - 1)
                {
                    res += sp;
                }
            }

            return res;
        }

        // hasParams: 是否包含变参 (最后一个参数将按数组处理)
        public List<string> AppendGetParameters(bool hasParams, string nargs, MethodBase methodBase, ParameterInfo[] parameters)
        {
            var arglist = new List<string>();
            var assignIndex = 0;
            for (var i = 0; i < parameters.Length; i++)
            {
                var argitem = "";
                var parameter = parameters[i];
                if (parameter.ParameterType.IsByRef)
                {
                    if (parameter.IsOut)
                    {
                        argitem += "out ";
                    }
                    else
                    {
                        argitem += "ref ";
                    }
                }
                argitem += "arg" + i;
                arglist.Add(argitem);
                if (hasParams && i == parameters.Length - 1)
                {
                    // 处理数组
                    var argType = this.cg.bindingManager.GetCSTypeFullName(parameter.ParameterType);
                    var argElementType = this.cg.bindingManager.GetCSTypeFullName(parameter.ParameterType.GetElementType());
                    var argElementIndex = i == 0 ? nargs : nargs + " - " + i;
                    this.cg.cs.AppendLine($"{argType} arg{i} = null;");
                    this.cg.cs.AppendLine($"if ({argElementIndex} > 0)");
                    using (this.cg.cs.CodeBlockScope())
                    {
                        this.cg.cs.AppendLine($"arg{i} = new {argElementType}[{argElementIndex}];");
                        this.cg.cs.AppendLine($"for (var i = {i}; i < {nargs}; i++)");
                        using (this.cg.cs.CodeBlockScope())
                        {
                            var argElementOffset = i == 0 ? "" : " - " + i;
                            var argName = $"arg{i}[i{argElementOffset}]";
                            var argGetter = this.cg.bindingManager.GetScriptObjectGetter(parameter.ParameterType.GetElementType(), "ctx", "argv[i]", argName);
                            this.cg.cs.AppendLine("{0};", argGetter);
                        }
                    }
                }
                else
                {
                    if (this.cg.WriteParameterGetter(parameter, assignIndex, $"arg{i}", methodBase))
                    {
                        assignIndex++;
                    }
                }
            }
            return arglist;
        }

        protected virtual void InvokeVoidReturn()
        {
            cg.cs.AppendLine("return JSApi.JS_UNDEFINED;");
        }

        // 输出所有变体绑定
        protected void WriteCSAllVariants(TypeBindingInfo typeBindingInfo, MethodBaseBindingInfo<T> methodBindingInfo) // SortedDictionary<int, MethodBaseVariant<T>> variants)
        {
            var transform = typeBindingInfo.transform;
            var variants = methodBindingInfo.variants;
            var prefs = cg.bindingManager.prefs;

            if (prefs.alwaysCheckArgc || /*hasOverrides*/ methodBindingInfo.count > 1)
            {
                // 需要处理重载
                GenMethodVariants(methodBindingInfo, variants);
            }
            else
            {
                // 没有重载的情况 (variants.Count == 1)
                foreach (var variantKV in variants)
                {
                    var args = variantKV.Key;
                    var variant = variantKV.Value;
                    var argc = cg.AppendGetArgCount(variant.isVararg);

                    if (variant.isVararg)
                    {
                        var method = variant.varargMethods[0];

                        using (new CSEditorOnlyCodeGen(cg, GetRequiredDefines(method.method)))
                        {
                            WriteCSBindingMethodBody(methodBindingInfo, method.method, argc, true, method.isExtension);
                        }
                    }
                    else
                    {
                        var method = variant.plainMethods[0];

                        using (new CSEditorOnlyCodeGen(cg, GetRequiredDefines(method.method)))
                        {
                            WriteCSBindingMethodBody(methodBindingInfo, method.method, argc, false, method.isExtension);
                        }
                    }
                }
            }
        }

        protected void WriteTSAllVariants(TypeBindingInfo typeBindingInfo, MethodBaseBindingInfo<T> bindingInfo)
        {
            var variants = bindingInfo.variants;
            //NOTE: 如果产生了无法在 typescript 中声明的方法, 则作标记, 并输出一条万能声明 
            //      [key: string]: any
            foreach (var variantKV in variants)
            {
                foreach (var method in variantKV.Value.plainMethods)
                {
                    WriteTSDeclaration(typeBindingInfo, method.method, bindingInfo, method.isExtension);
                }

                foreach (var method in variantKV.Value.varargMethods)
                {
                    WriteTSDeclaration(typeBindingInfo, method.method, bindingInfo, method.isExtension);
                }
            }
        }

        // 写入返回类型声明
        protected virtual void WriteTSReturn(T method, List<ParameterInfo> returnParameters)
        {
            var returnType = GetReturnType(method);
            var outParametersCount = returnParameters.Count;
            if (returnType != null && returnType != typeof(void))
            {
                if (outParametersCount != 0)
                {
                    this.cg.tsDeclare.AppendL(": { ");

                    var returnTypeTS = this.cg.currentTSModule.GetTSTypeFullName(returnType);
                    var returnVarName = this.cg.bindingManager.GetTSVariable("return");
                    this.cg.tsDeclare.AppendL($"\"{returnVarName}\": {returnTypeTS}");

                    for (var i = 0; i < outParametersCount; i++)
                    {
                        var rp = returnParameters[i];
                        var name = this.cg.bindingManager.GetTSVariable(rp.Name);
                        var ts = this.cg.currentTSModule.GetTSTypeFullName(rp.ParameterType);
                        if (i != outParametersCount - 1)
                        {
                            this.cg.tsDeclare.AppendL($", \"{name}\": {ts}");
                        }
                        else
                        {
                            this.cg.tsDeclare.AppendL($", \"{name}\": {ts}");
                        }
                    }
                    this.cg.tsDeclare.AppendL(" }");
                    this.cg.tsDeclare.AppendLine();
                }
                else
                {
                    var returnTypeTS = this.cg.currentTSModule.GetTSTypeFullName(returnType);
                    this.cg.tsDeclare.AppendL($": {returnTypeTS}");
                    this.cg.tsDeclare.AppendLine();
                }
            }
            else
            {
                if (outParametersCount != 0)
                {
                    this.cg.tsDeclare.AppendL(": { ");
                    for (var i = 0; i < outParametersCount; i++)
                    {
                        var rp = returnParameters[i];
                        var name = rp.Name;
                        var ts = this.cg.currentTSModule.GetTSTypeFullName(rp.ParameterType);
                        if (i != outParametersCount - 1)
                        {
                            this.cg.tsDeclare.AppendL($"\"{name}\": {ts}, ");
                        }
                        else
                        {
                            this.cg.tsDeclare.AppendL($"\"{name}\": {ts}");
                        }
                    }
                    this.cg.tsDeclare.AppendL(" }");
                    this.cg.tsDeclare.AppendLine();
                }
                else
                {
                    if (method.IsConstructor)
                    {
                        this.cg.tsDeclare.AppendLine();
                    }
                    else
                    {
                        this.cg.tsDeclare.AppendL(": void");
                        this.cg.tsDeclare.AppendLine();
                    }
                }
            }
        }

        protected void GenMethodVariants(MethodBaseBindingInfo<T> methodBindingInfo, SortedDictionary<int, MethodBaseVariant<T>> variants)
        {
            var argc = cg.AppendGetArgCount(true);
            using (cg.cs.DoWhileBlockScope(methodBindingInfo.count > 1))
            {
                foreach (var variantKV in variants)
                {
                    var expectedArgCount = variantKV.Key;
                    var variant = variantKV.Value;
                    var gecheck = expectedArgCount > 0 && variant.isVararg; // 最后一组分支且存在变参时才需要判断 >= 

                    if (gecheck)
                    {
                        cg.cs.AppendLine("if (argc >= {0})", expectedArgCount);
                        cg.cs.AppendLine("{");
                        cg.cs.AddTabLevel();
                    }

                    // 处理定参
                    if (variant.plainMethods.Count > 0)
                    {
                        cg.cs.AppendLine("if (argc == {0})", expectedArgCount);
                        using (cg.cs.CodeBlockScope())
                        {
                            var prefs = cg.bindingManager.prefs;
                            if (prefs.alwaysCheckArgType || (variant.plainMethods.Count + variant.varargMethods.Count) > 1)
                            {
                                foreach (var method in variant.plainMethods)
                                {
                                    using (new CSEditorOnlyCodeGen(cg, GetRequiredDefines(method.method)))
                                    {
                                        var fixedMatchers = GetFixedMatchTypes(method.method, false, method.isExtension);
                                        if (fixedMatchers.Length != 0)
                                        {
                                            cg.cs.AppendLine($"if ({fixedMatchers})");
                                            using (cg.cs.CodeBlockScope())
                                            {
                                                this.WriteCSBindingMethodBody(methodBindingInfo, method.method, argc, false, method.isExtension);
                                            }
                                        }
                                        else
                                        {
                                            this.WriteCSBindingMethodBody(methodBindingInfo, method.method, argc, false, method.isExtension);
                                        }
                                    }
                                }

                                // if (methodBindingInfo.count > 1 && expectedArgCount != 0)
                                // {
                                //     cg.cs.AppendLine("break;");
                                // }
                            }
                            else
                            {
                                // 只有一个定参方法时, 不再判定类型匹配
                                var method = variant.plainMethods[0];
                                using (new CSEditorOnlyCodeGen(cg, GetRequiredDefines(method.method)))
                                {
                                    this.WriteCSBindingMethodBody(methodBindingInfo, method.method, argc, false, method.isExtension);
                                }
                            }
                        }
                    }

                    // 处理变参
                    if (variant.varargMethods.Count > 0)
                    {
                        foreach (var method in variant.varargMethods)
                        {
                            using (new CSEditorOnlyCodeGen(cg, GetRequiredDefines(method.method)))
                            {
                                var fixedMatchers = GetFixedMatchTypes(method.method, true, method.isExtension);
                                var variantMatchers = GetParamArrayMatchType(method.method);

                                if (fixedMatchers.Length > 0)
                                {
                                    cg.cs.AppendLine($"if ({fixedMatchers} && Values.js_match_param_types(ctx, {expectedArgCount}, argv, {variantMatchers}))");
                                }
                                else
                                {
                                    cg.cs.AppendLine($"if (Values.js_match_param_types(ctx, {expectedArgCount}, argv, {variantMatchers}))");
                                }

                                using (cg.cs.CodeBlockScope())
                                {
                                    this.WriteCSBindingMethodBody(methodBindingInfo, method.method, argc, true, method.isExtension);
                                }
                            }
                        }
                    }

                    if (gecheck)
                    {
                        cg.cs.DecTabLevel();
                        cg.cs.AppendLine("}");
                    }
                }
            }

            cg.cs.AppendLine($"throw new NoSuitableMethodException(\"{methodBindingInfo.jsName}\", {argc});");
        }

        protected List<ParameterInfo> WriteTSDeclaration(TypeBindingInfo typeBindingInfo, T method, MethodBaseBindingInfo<T> bindingInfo, bool isExtension)
        {
            var refParameters = new List<ParameterInfo>();
            string tsMethodDeclaration;
            this.cg.AppendJSDoc(method);

            if (typeBindingInfo.transform.GetTSMethodDeclaration(method, out tsMethodDeclaration)
             || this.cg.bindingManager.GetTSMethodDeclaration(method, out tsMethodDeclaration))
            {
                this.cg.tsDeclare.AppendLine(tsMethodDeclaration);
                return refParameters;
            }

            var tsMethodRename = bindingInfo.jsName;
            var isRaw = method.IsDefined(typeof(JSCFunctionAttribute), false);
            //TODO: 需要处理参数类型归并问题, 因为如果类型没有导入 ts 中, 可能会在声明中出现相同参数列表的定义
            //      在 MethodVariant 中创建每个方法对应的TS类型名参数列表, 完全相同的不再输出
            var prefix = "";
            // if (method.Name.StartsWith("op_"))
            if (bindingInfo is OperatorBindingInfo)
            {
                prefix += "// js_op_overloading: ";
            }

            if (method.IsStatic && !isExtension)
            {
                prefix += "static ";
            }

            this.cg.tsDeclare.Append($"{prefix}{tsMethodRename}(");

            if (this.cg.bindingManager.prefs.verboseLog)
            {
                this.cg.bindingManager.Info($"WriteTSDeclaration: {method.Name} <isExtension: {isExtension}> => {tsMethodRename} {this.cg.tsDeclare.enabled}");
            }

            if (isRaw)
            {
                this.cg.tsDeclare.AppendL("...uncertain: any[]): any /* uncertain */");
                this.cg.tsDeclare.AppendLine();
            }
            else
            {
                var parameters = method.GetParameters();
                if (isExtension)
                {
                    CodeGenUtils.RemoveAt(ref parameters, 0);
                }

                for (int i = 0, len = parameters.Length; i < len;)
                {
                    var parameter = parameters[i];
                    var parameterType = parameter.ParameterType;
                    if (Binding.Values.IsContextualType(parameterType))
                    {
                        // 剔除 JSContext, JSRuntime
                        CodeGenUtils.RemoveAt(ref parameters, i);
                        len--;
                    }
                    // else if (parameter.IsOut)
                    // {
                    //     ArrayUtility.RemoveAt(ref parameters, i);
                    //     len--;
                    //     refParameters.Add(parameter);
                    // }
                    else
                    {
                        // if (parameterType.IsByRef)
                        // {
                        //     refParameters.Add(parameter);
                        // }
                        i++;
                    }
                }

                for (int i = 0, len = parameters.Length; i < len; i++)
                {
                    var parameter = parameters[i];
                    var parameter_prefix = "";
                    var parameterType = parameter.ParameterType;

                    if (parameter.IsDefined(typeof(ParamArrayAttribute), false) && i == parameters.Length - 1)
                    {
                        var elementType = parameterType.GetElementType();
                        var elementTS = this.cg.currentTSModule.GetTSTypeFullName(elementType);
                        var parameterVarName = this.cg.bindingManager.GetTSVariable(parameter);
                        this.cg.tsDeclare.AppendL($"{parameter_prefix}...{parameterVarName}: {elementTS}[]");
                    }
                    else
                    {
                        var parameterTS = this.cg.currentTSModule.GetTSTypeFullName(parameter.ParameterType, parameter.IsOut);
                        var parameterVarName = this.cg.bindingManager.GetTSVariable(parameter);
                        this.cg.tsDeclare.AppendL($"{parameter_prefix}{parameterVarName}: {parameterTS}");
                    }

                    if (i != parameters.Length - 1)
                    {
                        this.cg.tsDeclare.AppendL(", ");
                    }
                }
                this.cg.tsDeclare.AppendL($")");
                WriteTSReturn(method, refParameters);
            }

            return refParameters;
        }

        // 获取返回值类型
        protected abstract Type GetReturnType(T method);

        // 获取方法调用
        protected abstract string GetInvokeBinding(string caller, T method, bool hasParams, bool isExtension, string nargs, ParameterInfo[] parameters);

        protected virtual void BeginInvokeBinding() { }

        protected virtual void EndInvokeBinding() { }

        protected virtual void OnBeforeExceptionReturn() { }

        protected void SplitParamters(ParameterInfo[] parameters, int index, List<ParameterInfo> out_params)
        {
            for (int i = index, len = parameters.Length; i < len; i++)
            {
                var p = parameters[i];

                if (p.IsOut || p.ParameterType.IsByRef)
                {
                    out_params.Add(p);
                }
            }
        }

        private void WriteRebindThis(MethodBase method, Type callerType, string caller)
        {
            if (!method.IsStatic && method.DeclaringType.IsValueType) // struct 非静态方法 检查 Mutable 属性
            {
                if (!string.IsNullOrEmpty(caller))
                {
                    var js_rebind_this = this.cg.bindingManager.GetRebindOperation(callerType);
                    cg.cs.AppendLine($"{js_rebind_this}(ctx, this_obj, ref {caller});");
                }
            }
        }

        // 写入绑定代码
        protected void WriteCSBindingMethodBody(MethodBaseBindingInfo<T> bindingInfo, T method, string argc, bool isVararg, bool isExtension)
        {
            if (this.cg.bindingManager.prefs.verboseLog)
            {
                cg.bindingManager.Info($"WriteCSMethodBinding: {method.Name} {isExtension}");
            }

            var parameters = method.GetParameters();
            Type callerType;
            var caller = this.cg.AppendGetThisCS(method, isExtension, out callerType);
            var returnType = GetReturnType(method);

            if (returnType == null || returnType == typeof(void))
            {
                // 方法本身没有返回值
                this.BeginInvokeBinding();
                cg.cs.AppendLine($"{this.GetInvokeBinding(caller, method, isVararg, isExtension, argc, parameters)};");
                this.EndInvokeBinding();

                _WriteBackParameters(isExtension, parameters);
                WriteRebindThis(method, callerType, caller);
                InvokeVoidReturn();
            }
            else
            {
                var retVar = "ret"; // cs return value var name
                this.BeginInvokeBinding();
                cg.cs.AppendLine($"var {retVar} = {this.GetInvokeBinding(caller, method, isVararg, isExtension, argc, parameters)};");
                this.EndInvokeBinding();

                var retPusher = cg.AppendMethodReturnValuePusher(method, returnType, retVar);

                _WriteBackParameters(isExtension, parameters);
                cg.cs.AppendLine("return {0};", retPusher);
            }
        }

        // 回填 ref/out 参数
        // 扩展方法参数索引需要偏移
        protected void _WriteBackParameters(bool isExtension, ParameterInfo[] parameters)
        {
            var pIndex = isExtension ? 1 : 0;
            var oIndex = 0;
            var pBase = pIndex;
            var getContext = false;
            for (; pIndex < parameters.Length; pIndex++)
            {
                var parameter = parameters[pIndex];
                var pType = parameter.ParameterType;

                if (!pType.IsByRef || Binding.Values.IsContextualType(pType))
                {
                    continue;
                }

                var baseIndex = pIndex - pBase;
                var pusher = cg.AppendValuePusher(parameter.ParameterType, $"arg{baseIndex}");

                cg.cs.AppendLine("var out{0} = {1};", oIndex, pusher);
                cg.cs.AppendLine("if (JSApi.JS_IsException(out{0}))", oIndex);
                using (cg.cs.CodeBlockScope())
                {
                    // for (var j = 0; j < oIndex; j++)
                    // {
                    //     cg.cs.AppendLine("JSApi.JS_FreeValue(ctx, out{0});", j);
                    // }
                    OnBeforeExceptionReturn();
                    cg.cs.AppendLine("return out{0};", oIndex);
                }

                if (!getContext)
                {
                    cg.cs.AppendLine("var context = ScriptEngine.GetContext(ctx);");
                    getContext = true;
                }

                cg.cs.AppendLine("JSApi.JS_SetProperty(ctx, argv[{0}], context.GetAtom(\"value\"), out{1});", baseIndex, oIndex);
                oIndex++;
            }
        }
    }

    public class ConstructorCodeGen : MethodBaseCodeGen<ConstructorInfo>
    {
        private TypeBindingInfo typeBindingInfo;
        private ConstructorBindingInfo methodBindingInfo;

        private bool disposable => typeBindingInfo.disposable;

        protected override Type GetReturnType(ConstructorInfo method)
        {
            return null;
        }

        // 写入默认构造函数 (struct 无参构造)
        private void WriteDefaultConstructorBinding()
        {
            var decalringTypeName = this.cg.bindingManager.GetCSTypeFullName(this.methodBindingInfo.decalringType);
            var castOperation = this.cg.bindingManager.GetNewOperation(this.methodBindingInfo.decalringType);
            this.cg.cs.AppendLine("var o = new {0}();", decalringTypeName);
            this.cg.cs.AppendLine("var val = {0}(ctx, new_target, o, magic, {1});", castOperation, CodeGenUtils.ToLiteral(this.disposable));
            this.cg.cs.AppendLine("return val;");

            this.cg.tsDeclare.AppendLine($"{this.methodBindingInfo.jsName}()");
        }

        protected override string GetInvokeBinding(string caller, ConstructorInfo method, bool hasParams, bool isExtension, string nargs, ParameterInfo[] parameters)
        {
            var arglist = Concat(AppendGetParameters(hasParams, nargs, method, parameters));
            var decalringTypeName = this.cg.bindingManager.GetCSTypeFullName(this.methodBindingInfo.decalringType);
            // // 方法本身有返回值
            // var transform = cg.bindingManager.GetTypeTransform(method.DeclaringType);
            // if (transform == null || !transform.OnBinding(BindingPoints.METHOD_BINDING_BEFORE_INVOKE, method, cg, arglist))
            // {
            // }
            return $"var o = new {decalringTypeName}({arglist})";
        }

        protected override void EndInvokeBinding()
        {
            var castOperation = this.cg.bindingManager.GetNewOperation(this.methodBindingInfo.decalringType);
            this.cg.cs.AppendLine("var val = {0}(ctx, new_target, o, magic, {1});", castOperation, CodeGenUtils.ToLiteral(this.disposable));
        }

        protected override void InvokeVoidReturn()
        {
            this.cg.cs.AppendLine("return val;");
        }

        protected override void OnBeforeExceptionReturn()
        {
            this.cg.cs.AppendLine("JSApi.JS_FreeValue(ctx, val);");
        }

        public ConstructorCodeGen(CodeGenerator cg, TypeBindingInfo typeBindingInfo)
        : base(cg)
        {
            this.typeBindingInfo = typeBindingInfo;
            this.methodBindingInfo = typeBindingInfo.constructors;
            if (this.methodBindingInfo.count > 0)
            {

                WriteCSAllVariants(this.typeBindingInfo, this.methodBindingInfo);
                // WriteTSAllVariants(typeBindingInfo, this.methodBindingInfo);
            }
            else
            {
                WriteDefaultConstructorBinding();
            }
        }
    }

    // 生成成员方法绑定代码
    public class CSMethodCodeGen : MethodBaseCodeGen<MethodInfo>
    {
        protected TypeBindingInfo typeBindingInfo;
        protected MethodBindingInfo methodBindingInfo;

        public CSMethodCodeGen(CodeGenerator cg, TypeBindingInfo typeBindingInfo, MethodBindingInfo methodBindingInfo)
        : base(cg)
        {
            this.typeBindingInfo = typeBindingInfo;
            this.methodBindingInfo = methodBindingInfo;
            WriteCSAllVariants(this.typeBindingInfo, this.methodBindingInfo);
        }

        protected override IEnumerable<string> GetRequiredDefines(MethodBase methodBase)
        {
            return typeBindingInfo.transform.GetRequiredDefinesOfMethod(methodBase);
        }

        protected override Type GetReturnType(MethodInfo method)
        {
            return method.ReturnType;
        }

        private string WriteSetterBinding(string caller, MethodBase method, ParameterInfo[] parameters)
        {
            var last = parameters.Length - 1;
            var arglist_t = "";
            var assignIndex = 0;
            for (var i = 0; i < last; i++)
            {
                var argname = $"arg{i}";
                if (this.cg.WriteParameterGetter(parameters[i], assignIndex, argname, method))
                {
                    assignIndex++;
                }
                arglist_t += argname;
                if (i != last - 1)
                {
                    arglist_t += ", ";
                }
            }
            var argname_last = $"arg{last}";
            this.cg.WriteParameterGetter(parameters[last], assignIndex, argname_last, method);
            return $"{caller}[{arglist_t}] = {argname_last}"; // setter
        }

        private string WriteGetterBinding(string caller, MethodBase method, ParameterInfo[] parameters)
        {
            var last = parameters.Length;
            var arglist_t = "";
            var assignIndex = 0;
            for (var i = 0; i < last; i++)
            {
                var argname = $"arg{i}";
                if (this.cg.WriteParameterGetter(parameters[i], assignIndex, argname, method))
                {
                    assignIndex++;
                }
                arglist_t += argname;
                if (i != last - 1)
                {
                    arglist_t += ", ";
                }
            }
            return $"{caller}[{arglist_t}]"; // getter
        }

        protected override string GetInvokeBinding(string caller, MethodInfo method, bool hasParams, bool isExtension, string nargs, ParameterInfo[] parameters)
        {
            if (method.IsSpecialName) // if (bindingInfo.isIndexer)
            {
                if (method.Name == "set_Item") // if (method.ReturnType == typeof(void))
                {
                    return WriteSetterBinding(caller, method, parameters); // setter
                }
                else if (method.Name == "get_Item")
                {
                    return WriteGetterBinding(caller, method, parameters);
                }
            }

            var paramsToGet = isExtension ? parameters.Skip(1).ToArray() : parameters;
            var arglist = AppendGetParameters(hasParams, nargs, method, paramsToGet);
            var arglistSig = Concat(arglist);
            // var transform = cg.bindingManager.GetTypeTransform(method.DeclaringType);
            // // 在生成调用前插入代码 
            // if (transform == null || !transform.OnBinding(BindingPoints.METHOD_BINDING_BEFORE_INVOKE, method, cg))
            // {
            // }

            // 扩展方法调用实际静态类方法
            if (isExtension)
            {
                var methodDeclType = this.cg.bindingManager.GetCSTypeFullName(method.DeclaringType);
                if (arglistSig.Length > 0)
                {
                    arglistSig = ", " + arglistSig;
                }

                return $"{methodDeclType}.{method.Name}({caller}{arglistSig})";
            }

            // 处理运算符方式调用
            if (method.IsSpecialName)
            {
                switch (method.Name)
                {
                    case "op_Addition":
                        return $"{arglist[0]} + {arglist[1]}";
                    case "op_Subtraction":
                        return $"{arglist[0]} - {arglist[1]}";
                    case "op_Modulus":
                        return $"{arglist[0]} % {arglist[1]}";
                    case "op_Equality":
                        return $"{arglist[0]} == {arglist[1]}";
                    case "op_Inequality":
                        return $"{arglist[0]} != {arglist[1]}";
                    case "op_LessThan":
                        return $"{arglist[0]} < {arglist[1]}";
                    case "op_LessThanOrEqual":
                        return $"{arglist[0]} <= {arglist[1]}";
                    case "op_GreaterThan":
                        return $"{arglist[0]} > {arglist[1]}";
                    case "op_GreaterThanOrEqual":
                        return $"{arglist[0]} >= {arglist[1]}";
                    case "op_Division":
                        return $"{arglist[0]} / {arglist[1]}";
                    case "op_Multiply":
                        return $"{arglist[0]} * {arglist[1]}";
                    case "op_UnaryNegation":
                        return $"-{arglist[0]}";
                    case "op_Explicit":
                    case "op_Implicit":
                        var implicitTypeName = this.cg.bindingManager.GetCSTypeFullName(GetReturnType(method));
                        return $"({implicitTypeName}){arglist[0]}";
                    case "op_BitwiseAnd":
                        return $"{arglist[0]} & {arglist[1]}";
                    case "op_BitwiseOr":
                        return $"{arglist[0]} | {arglist[1]}";
                }
            }

            // 普通成员调用
            return $"{caller}.{method.Name}({arglistSig})";
        }
    }

    public class TSConstructorCodeGen : MethodBaseCodeGen<ConstructorInfo>
    {
        protected MethodBaseBindingInfo<ConstructorInfo> bindingInfo;

        protected override Type GetReturnType(ConstructorInfo method)
        {
            return null;
        }

        protected override string GetInvokeBinding(string caller, ConstructorInfo method, bool hasParams, bool isExtension, string nargs, ParameterInfo[] parameters)
        {
            return null;
        }

        public TSConstructorCodeGen(CodeGenerator cg, TypeBindingInfo typeBindingInfo, MethodBaseBindingInfo<ConstructorInfo> bindingInfo)
            : base(cg)
        {
            this.bindingInfo = bindingInfo;
            WriteTSAllVariants(typeBindingInfo, this.bindingInfo);
        }
    }

    public class TSMethodCodeGen<T> : MethodBaseCodeGen<T>
        where T : MethodInfo
    {
        protected MethodBaseBindingInfo<T> bindingInfo;

        protected override Type GetReturnType(T method)
        {
            return method.ReturnType;
        }

        protected override string GetInvokeBinding(string caller, T method, bool hasParams, bool isExtension, string nargs, ParameterInfo[] parameters)
        {
            return null;
        }

        public TSMethodCodeGen(CodeGenerator cg, TypeBindingInfo typeBindingInfo, MethodBaseBindingInfo<T> bindingInfo)
            : base(cg)
        {
            this.bindingInfo = bindingInfo;
            WriteTSAllVariants(typeBindingInfo, this.bindingInfo);
        }
    }
}
