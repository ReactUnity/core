using System;
using System.IO;
using System.Collections.Generic;
using System.Reflection;
using System.Runtime.CompilerServices;

namespace QuickJS.Binding
{
    public struct PropertyBindingPair
    {
        public string getterName; // 绑定代码名
        public string setterName;

        public bool IsValid()
        {
            return this.getterName != null || this.setterName != null;
        }
    }

    public class PropertyBindingInfo
    {
        public PropertyBindingPair staticPair;

        public PropertyBindingPair instancePair;

        // public string getterName; // 绑定代码名
        // public string setterName;
        public string regName; // js 注册名
        public PropertyInfo propertyInfo;

        public readonly MethodInfo getMethod;

        public readonly MethodInfo setMethod;

        public bool isStatic => staticPair.IsValid();

        public Type propertyType => propertyInfo.PropertyType;

        public PropertyBindingInfo(TypeBindingInfo typeBindingInfo, PropertyInfo propertyInfo)
        {
            this.propertyInfo = propertyInfo;
            this.getMethod = propertyInfo.GetGetMethod(true);
            this.setMethod = propertyInfo.GetSetMethod(true);
            if (propertyInfo.CanRead && getMethod != null && getMethod.IsPublic)
            {
                if (getMethod.IsStatic)
                {
                    staticPair.getterName = "BindStaticRead_" + propertyInfo.Name;
                }
                else
                {
                    instancePair.getterName = "BindRead_" + propertyInfo.Name;
                }
            }

            if (propertyInfo.CanWrite && setMethod != null && setMethod.IsPublic)
            {
                if (setMethod.IsStatic)
                {
                    staticPair.setterName = "BindStaticWrite_" + propertyInfo.Name;
                }
                else
                {
                    instancePair.setterName = "BindWrite_" + propertyInfo.Name;
                }
            }

            this.regName = typeBindingInfo.bindingManager.GetNamingAttribute(typeBindingInfo.transform, propertyInfo);
        }
    }

}