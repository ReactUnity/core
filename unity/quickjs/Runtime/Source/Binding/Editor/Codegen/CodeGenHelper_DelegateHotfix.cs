using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Reflection;

namespace QuickJS.Binding
{
    public class HotfixDelegateCodeGen : IDisposable
    {
        protected CodeGenerator cg;

        private string GetSignature(HotfixDelegateBindingInfo delegateBindingInfo, int index, string arglist, out string sig)
        {
            sig = "_HotfixDelegate" + index;
            var str = "public delegate ";
            str += this.cg.bindingManager.GetCSTypeFullName(delegateBindingInfo.returnType) + " ";
            str += sig + "(";
            str += arglist;
            str += ");";
            return str;
        }

        public string GetCSArglistDecl(Type self, bool isStatic, string selfName, ParameterInfo[] parameters)
        {
            var arglist = this.cg.bindingManager.GetCSArglistDecl(parameters);
            var firstArgType = isStatic ? "Type" : "object";
            var firstArg = firstArgType + " " + selfName;

            return string.IsNullOrEmpty(arglist) ? firstArg : firstArg + ", " + arglist;
        }

        public HotfixDelegateCodeGen(CodeGenerator cg, HotfixDelegateBindingInfo delegateBindingInfo, int index)
        {
            this.cg = cg;

            var self_name = "_hotfix_this";
            var nargs = delegateBindingInfo.parameters.Length;
            var retName = this.cg.bindingManager.GetUniqueName(delegateBindingInfo.parameters, "ret");
            var firstArgument = typeof(ScriptDelegate) + " fn";
            var returnTypeName = this.cg.bindingManager.GetCSTypeFullName(delegateBindingInfo.returnType);
            var delegateName = CodeGenerator.NameOfHotfixDelegates + index;
            var arglist = GetCSArglistDecl(delegateBindingInfo.thisType, delegateBindingInfo.isStatic, self_name, delegateBindingInfo.parameters);
            string sig;
            var delegateSig = GetSignature(delegateBindingInfo, index, arglist, out sig);

            this.cg.cs.AppendLine(delegateSig);
            this.cg.cs.AppendLine("[UnityEngine.Scripting.Preserve]");
            this.cg.cs.AppendLine("[{0}(typeof({1}))]",
                this.cg.bindingManager.GetCSTypeFullName(typeof(JSDelegateAttribute)),
                sig);
            this.cg.bindingManager.Info("emitting delegate decl: {0}", sig);
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
                this.cg.cs.AppendLine("var argv = stackalloc JSValue[{0}];", nargs);
                for (var i = 0; i < nargs; i++)
                {
                    var parameter = delegateBindingInfo.parameters[i];
                    var pusher = this.cg.AppendValuePusher(parameter.ParameterType, parameter.Name);
                    this.cg.cs.AppendLine("argv[{0}] = {1};", i, pusher);
                    this.cg.cs.AppendLine("if (argv[{0}].IsException())", i);
                    using (this.cg.cs.CodeBlockScope())
                    {
                        for (var j = 0; j < i; j++)
                        {
                            this.cg.cs.AppendLine("JSApi.JS_FreeValue(ctx, argv[{0}]);", j);
                        }

                        this.cg.cs.AppendLine("throw new Exception(ctx.GetExceptionString());");
                    }
                }
                this.cg.cs.AppendLine("var this_obj = hotfix_push_classvalue(ctx, {0});", self_name);
                this.cg.cs.AppendLine("var rval = fn.Invoke(ctx, this_obj, {0}, argv);", nargs);
                this.cg.cs.AppendLine("JSApi.JS_FreeValue(ctx, this_obj);");
            }
            else
            {
                this.cg.cs.AppendLine("var this_obj = hotfix_push_classvalue(ctx, {0});", self_name);
                this.cg.cs.AppendLine("var rval = fn.Invoke(ctx, this_obj);");
                this.cg.cs.AppendLine("JSApi.JS_FreeValue(ctx, this_obj);");
            }

            if (delegateBindingInfo.returnType != typeof(void))
            {
                this.cg.cs.AppendLine($"{this.cg.bindingManager.GetCSTypeFullName(delegateBindingInfo.returnType)} {retName};");
                var getter = this.cg.bindingManager.GetScriptObjectGetter(delegateBindingInfo.returnType, "ctx", "rval", retName);
                this.cg.cs.AppendLine("var succ = {0};", getter);

                FreeArgs(nargs);
                CheckReturnValue();

                this.cg.cs.AppendLine("if (succ)");
                using (this.cg.cs.CodeBlockScope())
                {
                    this.cg.cs.AppendLine($"return {retName};");
                }
                this.cg.cs.AppendLine("else");
                using (this.cg.cs.CodeBlockScope())
                {
                    this.cg.cs.AppendLine($"throw new Exception(\"js exception caught\");");
                }
            }
            else
            {
                FreeArgs(nargs);
                CheckReturnValue();
            }
        }

        private void CheckReturnValue()
        {
            this.cg.cs.AppendLine("if (rval.IsException())");
            using (this.cg.cs.CodeBlockScope())
            {
                this.cg.cs.AppendLine("throw new Exception(ctx.GetExceptionString());");
            }
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
