using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Reflection;

namespace QuickJS.Binding
{
    public class PropertyGetterCodeGen : IDisposable
    {
        protected CodeGenerator cg;
        protected PropertyBindingInfo bindingInfo;

        public PropertyGetterCodeGen(CodeGenerator cg, PropertyBindingInfo bindingInfo)
        {
            this.cg = cg;
            this.bindingInfo = bindingInfo;

            Type callerType;
            var caller = this.cg.AppendGetThisCS(bindingInfo.getMethod, false, out callerType);

            this.cg.cs.AppendLine("var ret = {0}.{1};", caller, bindingInfo.propertyInfo.Name);
            var pusher = this.cg.AppendValuePusher(bindingInfo.propertyType, "ret");
            this.cg.cs.AppendLine("return {0};", pusher);
        }

        public virtual void Dispose()
        {
        }
    }

    public class PropertySetterCodeGen : IDisposable
    {
        protected CodeGenerator cg;
        protected PropertyBindingInfo bindingInfo;

        public PropertySetterCodeGen(CodeGenerator cg, PropertyBindingInfo propertyBindingInfo)
        {
            this.cg = cg;
            this.bindingInfo = propertyBindingInfo;

            var propertyInfo = this.bindingInfo.propertyInfo;
            var declaringType = propertyInfo.DeclaringType;
            Type callerType;
            var caller = this.cg.AppendGetThisCS(propertyBindingInfo.setMethod, false, out callerType);
            var propertyType = this.cg.bindingManager.GetCSTypeFullName(propertyInfo.PropertyType);

            this.cg.cs.AppendLine("{0} value;", propertyType);
            var getter = this.cg.bindingManager.GetScriptObjectGetter(propertyInfo.PropertyType, "ctx", "arg_val", "value");
            this.cg.cs.AppendLine("if (!{0})", getter);
            using (this.cg.cs.CodeBlockScope())
            {
                this.cg.WriteParameterException(declaringType, propertyInfo.Name, propertyType, 0);
            }
            this.cg.cs.AppendLine("{0}.{1} = value;", caller, propertyInfo.Name);
            if (declaringType.IsValueType && !propertyBindingInfo.setMethod.IsStatic)
            {
                // 非静态结构体属性修改, 尝试替换实例
                var js_rebind_this = this.cg.bindingManager.GetRebindOperation(callerType);
                this.cg.cs.AppendLine($"{js_rebind_this}(ctx, this_obj, ref {caller});");
            }
            this.cg.cs.AppendLine("return JSApi.JS_UNDEFINED;");
        }

        public virtual void Dispose()
        {
        }
    }
}
