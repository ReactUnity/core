using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Reflection;

namespace QuickJS.Binding
{
    public class EventOperationCodeGen : IDisposable
    {
        protected CodeGenerator cg;
        protected EventBindingInfo bindingInfo;

        public EventOperationCodeGen(CodeGenerator cg, EventBindingInfo bindingInfo)
        {
            this.cg = cg;
            this.bindingInfo = bindingInfo;

            var eventInfo = this.bindingInfo.eventInfo;
            var declaringType = eventInfo.DeclaringType;

            this.cg.cs.AppendLine("var op = Values.js_parse_event_op(ctx, argv[0]);");
            var caller = this.cg.AppendGetThisCS(bindingInfo);
            var eventTypeName = this.cg.bindingManager.GetCSTypeFullName(eventInfo.EventHandlerType);
            this.cg.cs.AppendLine("{0} value;", eventTypeName);
            this.cg.cs.AppendLine("switch(op)");
            using (this.cg.cs.CodeBlockScope())
            {
                this.cg.cs.AppendLine("case Values.EVT_OP_ADD:");
                using (this.cg.cs.IndentBlockScope())
                {
                    var getter = this.cg.bindingManager.GetScriptObjectGetter(eventInfo.EventHandlerType, "ctx", "argv[1]", "value");
                    this.cg.cs.AppendLine("if (!{0})", getter);
                    using (this.cg.cs.CodeBlockScope())
                    {
                        this.cg.WriteParameterException(declaringType, eventInfo.Name, eventTypeName, 1);
                    }
                    this.cg.cs.AppendLine("{0}.{1} += value;", caller, eventInfo.Name);
                    this.cg.cs.AppendLine("break;");
                }
                this.cg.cs.AppendLine("case Values.EVT_OP_REMOVE:");
                using (this.cg.cs.IndentBlockScope())
                {
                    var getter = this.cg.bindingManager.GetScriptObjectGetter(eventInfo.EventHandlerType, "ctx", "argv[1]", "value");
                    this.cg.cs.AppendLine("if (!{0})", getter);
                    using (this.cg.cs.CodeBlockScope())
                    {
                        this.cg.WriteParameterException(declaringType, eventInfo.Name, eventTypeName, 1);
                    }
                    this.cg.cs.AppendLine("{0}.{1} -= value;", caller, eventInfo.Name);
                    this.cg.cs.AppendLine("break;");
                }
                this.cg.cs.AppendLine("default: throw new JSException(\"invalid event op\");");
            }
            if (declaringType.IsValueType && !eventInfo.GetAddMethod().IsStatic)
            {
                // 非静态结构体属性修改, 尝试替换实例
                var js_rebind_this = this.cg.bindingManager.GetRebindOperation(bindingInfo.declaringType);
                this.cg.cs.AppendLine($"{js_rebind_this}(ctx, this_obj, ref {caller});");
            }
            this.cg.cs.AppendLine("return JSApi.JS_UNDEFINED;");
        }

        public virtual void Dispose()
        {
        }
    }
}
