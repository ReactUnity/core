using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Linq;
using System.Reflection;

namespace QuickJS.Binding
{
    public class DelegateCodeGen : IDisposable
    {
        protected CodeGenerator cg;

        protected string delegateName;
        protected Type returnType;
        protected ParameterInfo[] parameters;
        protected HashSet<Type> delegateTypeRefs;

        private ParameterInfo[] GetInputParameters(ParameterInfo[] parameters)
        {
            // return parameters.Where(p => !p.IsOut).ToArray();
            return parameters;
        }

        public DelegateCodeGen(CodeGenerator cg, DelegateBridgeBindingInfo delegateBindingInfo, int index)
        {
            this.cg = cg;
            this.delegateName = CodeGenerator.NameOfDelegates + index;
            this.returnType = delegateBindingInfo.returnType;
            this.parameters = delegateBindingInfo.parameters;
            this.delegateTypeRefs = delegateBindingInfo.types;
            _Emit();
        }

        public DelegateCodeGen(CodeGenerator cg, string delegateName, Type returnType, ParameterInfo[] parameters)
        {
            this.cg = cg;
            this.delegateName = delegateName;
            this.returnType = returnType;
            this.parameters = parameters;
            this.delegateTypeRefs = null;
            _Emit();
        }

        protected void _Emit()
        {
            var inputParameters = GetInputParameters(parameters);
            var nargs = inputParameters.Length;
            var retName = this.cg.bindingManager.GetUniqueName(parameters, "ret");
            var firstArgument = typeof(ScriptDelegate) + " fn";
            var returnTypeName = this.cg.bindingManager.GetCSTypeFullName(returnType);
            var arglist = this.cg.bindingManager.GetCSArglistDecl(parameters);

            if (delegateTypeRefs != null)
            {
                foreach (var target in delegateTypeRefs)
                {
                    this.cg.cs.AppendLine("[{0}(typeof({1}))]",
                        this.cg.bindingManager.GetCSTypeFullName(typeof(JSDelegateAttribute)),
                        this.cg.bindingManager.GetCSTypeFullName(target));
                    this.cg.bindingManager.Info("emitting delegate decl: {0}", target);
                }
            }
            if (!string.IsNullOrEmpty(arglist))
            {
                arglist = ", " + arglist;
            }
            this.cg.cs.AppendLine($"public static unsafe {returnTypeName} {delegateName}({firstArgument}{arglist})");
            this.cg.cs.AppendLine("{");
            this.cg.cs.AddTabLevel();
            this.cg.cs.AppendLine("var ctx = fn.ctx;");

            if (nargs > 0)
            {
                var getContext = false;
                this.cg.cs.AppendLine("var argv = stackalloc JSValue[{0}];", nargs);
                for (var i = 0; i < nargs; i++)
                {
                    var parameter = inputParameters[i];
                    if (parameter.ParameterType.IsByRef)
                    {
                        if (parameter.IsOut)
                        {
                            var pusher = "JSApi.JS_NewObject(ctx)";
                            this.cg.cs.AppendLine("argv[{0}] = {1};", i, pusher);
                            CheckParameterException(i);
                        }
                        else
                        {
                            var pusher = "JSApi.JS_NewObject(ctx)";
                            var value_pusher = this.cg.AppendValuePusher(parameter.ParameterType, parameter.Name);
                            this.cg.cs.AppendLine("argv[{0}] = {1};", i, pusher);
                            CheckParameterException(i);
                            if (!getContext)
                            {
                                getContext = true;
                                cg.cs.AppendLine("var context = ScriptEngine.GetContext(ctx);");
                            }
                            cg.cs.AppendLine("JSApi.JS_SetProperty(ctx, argv[{0}], context.GetAtom(\"value\"), {1});", i, value_pusher);
                        }
                    }
                    else
                    {
                        var pusher = this.cg.AppendValuePusher(parameter.ParameterType, parameter.Name);
                        this.cg.cs.AppendLine("argv[{0}] = {1};", i, pusher);
                        CheckParameterException(i);
                    }
                }
                this.cg.cs.AppendLine("var rval = fn.Invoke(ctx, {0}, argv);", nargs);
            }
            else
            {
                this.cg.cs.AppendLine("var rval = fn.Invoke(ctx);");
            }

            CheckReturnValue(nargs);
            _WriteBackParameters(nargs, inputParameters);

            if (returnType != typeof(void))
            {
                this.cg.cs.AppendLine($"{this.cg.bindingManager.GetCSTypeFullName(returnType)} {retName};");
                var getter = this.cg.bindingManager.GetScriptObjectGetter(returnType, "ctx", "rval", retName);

                this.cg.cs.AppendLine("var succ = {0};", getter);
                FreeRVal();
                FreeArgs(nargs);

                this.cg.cs.AppendLine("if (succ)");
                this.cg.cs.AppendLine("{");
                this.cg.cs.AddTabLevel();
                this.cg.cs.AppendLine($"return {retName};");
                this.cg.cs.DecTabLevel();
                this.cg.cs.AppendLine("}");
                this.cg.cs.AppendLine("else");
                this.cg.cs.AppendLine("{");
                this.cg.cs.AddTabLevel();
                this.cg.cs.AppendLine($"throw new System.Exception(\"js exception caught\");");
                this.cg.cs.DecTabLevel();
                this.cg.cs.AppendLine("}");
            }
            else
            {
                FreeRVal();
                FreeArgs(nargs);
            }
        }

        protected void CheckParameterException(int argIndex)
        {
            this.cg.cs.AppendLine("if (argv[{0}].IsException())", argIndex);
            this.cg.cs.AppendLine("{");
            this.cg.cs.AddTabLevel();
            for (var j = 0; j < argIndex; j++)
            {
                this.cg.cs.AppendLine("JSApi.JS_FreeValue(ctx, argv[{0}]);", j);
            }

            this.cg.cs.AppendLine("throw new System.Exception(ctx.GetExceptionString());");
            this.cg.cs.DecTabLevel();
            this.cg.cs.AppendLine("}");
        }

        // 回填 ref/out 参数
        protected void _WriteBackParameters(int nargs, ParameterInfo[] parameters)
        {
            for (int pIndex = 0, pCount = parameters.Length; pIndex < pCount; pIndex++)
            {
                var parameter = parameters[pIndex];
                var pType = parameter.ParameterType;

                if (!pType.IsByRef || Binding.Values.IsContextualType(pType))
                {
                    continue;
                }

                var refValVar = $"refVal{pIndex}";
                this.cg.cs.AppendLine("var {0} = Values.js_read_wrap(ctx, argv[{1}]);", refValVar, pIndex);

                this.cg.cs.AppendLine("if ({0}.IsException())", refValVar);
                using (this.cg.cs.CodeBlockScope())
                {
                    FreeRVal();
                    FreeArgs(nargs);
                    this.cg.cs.AppendLine("throw new System.Exception(ctx.GetExceptionString());");
                }

                var getter = this.cg.bindingManager.GetScriptObjectGetter(pType, "ctx", refValVar, parameter.Name);
                this.cg.cs.AppendLine("if (!{0})", getter);
                using (this.cg.cs.CodeBlockScope())
                {
                    var argTypeStr = this.cg.bindingManager.GetCSTypeFullName(parameter.ParameterType);

                    FreeRVal();
                    FreeArgs(nargs);
                    this.cg.cs.AppendLine("JSApi.JS_FreeValue(ctx, {0});", refValVar);
                    this.cg.WriteParameterException(CodeGenerator.NameOfDelegates, delegateName, argTypeStr, pIndex);
                }
                this.cg.cs.AppendLine("JSApi.JS_FreeValue(ctx, {0});", refValVar);
            }
        }

        private void CheckReturnValue(int nargs)
        {
            this.cg.cs.AppendLine("if (rval.IsException())");
            this.cg.cs.AppendLine("{");
            this.cg.cs.AddTabLevel();
            FreeArgs(nargs);
            this.cg.cs.AppendLine("throw new System.Exception(ctx.GetExceptionString());");
            this.cg.cs.DecTabLevel();
            this.cg.cs.AppendLine("}");
        }

        private void FreeRVal()
        {
            this.cg.cs.AppendLine("JSApi.JS_FreeValue(ctx, rval);");
        }

        private void FreeArgs(int nargs)
        {
            for (var i = 0; i < nargs; i++)
            {
                this.cg.cs.AppendLine("JSApi.JS_FreeValue(ctx, argv[{0}]);", i);
                // this.cg.cs.AppendLine("argv[{0}] = JSApi.JS_UNDEFINED;", i);
            }
        }

        public void Dispose()
        {
            this.cg.cs.DecTabLevel();
            this.cg.cs.AppendLine("}");
        }
    }
}
