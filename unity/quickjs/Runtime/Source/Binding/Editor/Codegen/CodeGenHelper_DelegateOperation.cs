using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Reflection;

namespace QuickJS.Binding
{
    public class DelegateOperationCodeGen : IDisposable
    {
        protected CodeGenerator cg;
        protected DelegateBindingInfo bindingInfo;

        public DelegateOperationCodeGen(CodeGenerator cg, DelegateBindingInfo bindingInfo)
        {
            this.cg = cg;
            this.bindingInfo = bindingInfo;

            this.cg.cs.AppendLine("var op = Values.js_parse_event_op(ctx, argv[0]);");
            var caller = this.cg.AppendGetThisCS(bindingInfo);
            var eventTypeName = this.cg.bindingManager.GetCSTypeFullName(bindingInfo.delegateType);

            this.cg.cs.AppendLine("switch(op)");
            using (this.cg.cs.CodeBlockScope())
            {
                if (this.bindingInfo.writable)
                {
                    if (this.bindingInfo.readable)
                    {
                        this.cg.cs.AppendLine("case Values.EVT_OP_ADD:");
                        using (this.cg.cs.CodeBlockScope())
                        {
                            this.cg.cs.AppendLine("{0} value;", eventTypeName);
                            var getter = this.cg.bindingManager.GetScriptObjectGetter(bindingInfo.delegateType, "ctx", "argv[1]", "value");
                            this.cg.cs.AppendLine("if (!{0})", getter);
                            using (this.cg.cs.CodeBlockScope())
                            {
                                this.cg.WriteParameterException(bindingInfo.declaringType, bindingInfo.csName, eventTypeName, 1);
                            }
                            this.cg.cs.AppendLine("{0}.{1} += value;", caller, bindingInfo.csName);
                            this.cg.cs.AppendLine("return JSApi.JS_UNDEFINED;");
                        }
                        this.cg.cs.AppendLine("case Values.EVT_OP_REMOVE:");
                        using (this.cg.cs.CodeBlockScope())
                        {
                            this.cg.cs.AppendLine("{0} value;", eventTypeName);
                            var getter = this.cg.bindingManager.GetScriptObjectGetter(bindingInfo.delegateType, "ctx", "argv[1]", "value");
                            this.cg.cs.AppendLine("if (!{0})", getter);
                            using (this.cg.cs.CodeBlockScope())
                            {
                                this.cg.WriteParameterException(bindingInfo.declaringType, bindingInfo.csName, eventTypeName, 1);
                            }
                            this.cg.cs.AppendLine("{0}.{1} -= value;", caller, bindingInfo.csName);
                            this.cg.cs.AppendLine("return JSApi.JS_UNDEFINED;");
                        }
                    }
                    this.cg.cs.AppendLine("case Values.EVT_OP_SET:");
                    using (this.cg.cs.CodeBlockScope())
                    {
                        this.cg.cs.AppendLine("{0} value;", eventTypeName);
                        var getter = this.cg.bindingManager.GetScriptObjectGetter(bindingInfo.delegateType, "ctx", "argv[1]", "value");
                        this.cg.cs.AppendLine("if (!{0})", getter);
                        using (this.cg.cs.CodeBlockScope())
                        {
                            this.cg.WriteParameterException(bindingInfo.declaringType, bindingInfo.csName, eventTypeName, 1);
                        }
                        this.cg.cs.AppendLine("{0}.{1} = value;", caller, bindingInfo.csName);
                        this.cg.cs.AppendLine("return JSApi.JS_UNDEFINED;");
                    }
                }
                if (this.bindingInfo.readable)
                {
                    this.cg.cs.AppendLine("case Values.EVT_OP_GET:");
                    using (this.cg.cs.CodeBlockScope())
                    {
                        this.cg.cs.AppendLine("var ret = {0}.{1};", caller, bindingInfo.csName);
                        var pusher = this.cg.AppendValuePusher(bindingInfo.delegateType, "ret");
                        this.cg.cs.AppendLine("return {0};", pusher);
                    }
                }
                this.cg.cs.AppendLine("default: throw new JSException(\"invalid event op\");");
            }
        }

        public virtual void Dispose()
        {
        }
    }
}
