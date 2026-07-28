using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.CompilerServices;

namespace QuickJS.Binding
{
    public class DelegateBindingInfo
    {
        public string name = null; // 绑定代码名
        public string regName = null; // js 注册名
        public string csName = null; // cs 代码名

        public Type declaringType;
        public Type delegateType;
        public bool readable; // 可读
        public bool writable; // 可写
        public bool isStatic; // 静态

        public bool isField;
        public MemberInfo fieldOrPropertyInfo;

        public DelegateBindingInfo(TypeBindingInfo typeBindingInfo, FieldInfo fieldInfo)
        {
            this.declaringType = typeBindingInfo.type;
            this.delegateType = fieldInfo.FieldType;
            this.readable = true;
            this.writable = !fieldInfo.IsInitOnly;
            this.isStatic = fieldInfo.IsStatic;
            this.csName = fieldInfo.Name;
            this.isField = true;
            this.fieldOrPropertyInfo = fieldInfo;

            do
            {
                if (this.isStatic)
                {
                    this.name = "BindStaticDelegate_" + fieldInfo.Name;
                }
                else
                {
                    this.name = "BindDelegate_" + fieldInfo.Name;
                }
            } while (false);

            this.regName = typeBindingInfo.bindingManager.GetNamingAttribute(typeBindingInfo.transform, fieldInfo);
        }

        public DelegateBindingInfo(TypeBindingInfo typeBindingInfo, PropertyInfo propertyInfo)
        {
            this.declaringType = typeBindingInfo.type;
            this.delegateType = propertyInfo.PropertyType;
            var propInfoGetMethod = propertyInfo.GetGetMethod(true);
            var propInfoSetMethod = propertyInfo.GetSetMethod(true);
            this.readable = propInfoGetMethod != null && propInfoGetMethod.IsPublic;
            this.writable = propInfoSetMethod != null && propInfoSetMethod.IsPublic;
            this.isStatic = (propInfoGetMethod ?? propInfoSetMethod).IsStatic;
            this.csName = propertyInfo.Name;
            this.isField = false;
            this.fieldOrPropertyInfo = propertyInfo;

            if (this.isStatic)
            {
                this.name = "BindStaticDelegate_" + propertyInfo.Name;
            }
            else
            {
                this.name = "BindDelegate_" + propertyInfo.Name;
            }

            this.regName = typeBindingInfo.bindingManager.GetNamingAttribute(typeBindingInfo.transform, propertyInfo);
        }
    }
}
